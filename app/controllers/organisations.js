// I am le organisation Controller
app.controller(
  "organisationsCtrl", ['$scope', '$rootScope', '$filter', '$timeout',
    'DMSRestangular', '$state', 'localStorageService', 'MySessionService',
    function(scope, rootScope, filter, timeout, DMSRestangular, state,
      localStorageService, MySessionService) {

      getOrganisationCount();
      rootScope.user = MySessionService.getLoggedUser();
      var Organisations = DMSRestangular.all('organisations');

      scope.getOrganisation = function getOrganisation(newOrganisation) {
        console.log(newOrganisation);
        scope.OrganisationProfile = newOrganisation;
        state.go('location.organisations.view');
      };

      scope.getOrganisations = function getOrganisations() {
        // var organisations = DMSRestangular.all('organisations');
        // This will query /accounts and return a promise.
        Organisations.customGET('').then(function(organisations) {
          //console.log(users);
          scope.rowCollection = organisations;
          scope.displayedCollection = [].concat(scope.rowCollection);
        });

        

      scope.login = function login() {
        rootScope.user = [];
        var user = DMSRestangular.one('user').one('username', scope.formData
          .username).one('password', scope.formData.password).one(
          'format', 'json');
        // This will query /accounts and return a promise.
        user.customGET('').then(function(userObj) {
          localStorageService.set('meds_user', userObj);
          state.go('users');

        });
      };

      scope.newOrganisation = function newOrganisation() {
        organisation = {
              "organisation": {
                  "name":           scope.OrganisationProfile.name,
                  "description":   scope.OrganisationProfile.description,
         }
        };
        console.log(organisation);
        Organisations.customPOST(organisation);

      };

      scope.delOrganisation = function delOrganisation(newOrganisation){
        scope.organisationProfile = newOrganisation;
        deletedOrganisation = DMSRestangular.one('organisations', scope.OrganisationProfile.id);
        deletedOrganisation.remove();
      };

      scope.updateOrganisation = function updateOrganisation() {
        updatedOrganisation = DMSRestangular.one('organisations', scope.OrganisationProfile.id);
        organisation = {
              "organisation": {
              "id":         scope.OrganisationProfile.id,
              "name":       scope.OrganisationProfile.name,
              "description":  scope.OrganisationProfile.description,
         }
        };
        console.log(organisation);
        updatedOrganisation.customPUT(organisation);
      };

       scope.setStatus = function setStatus(status) {
        scope.status = status;
        if (status == 'add') {
          scope.OrganisationProfile = [];
        }
      };

      function getOrganisationCount() {
        // This will query /accounts and return a promise.
        Organisations.customGET('').then(function(organisations) {
          // console.log(users);
          scope.records = organisations.length;
          scope.recordsPerPage = 5;
          scope.pages = Math.ceil(scope.records / scope.recordsPerPage);
        });
      }
    }


  ]
);