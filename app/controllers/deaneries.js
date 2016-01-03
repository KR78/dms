// I am le Deaneries Controller
app.controller(
  "deaneriesCtrl", ['$scope', '$rootScope', '$filter', '$timeout',
    'DMSRestangular', '$state', 'localStorageService', 'MySessionService',
    function(scope, rootScope, filter, timeout, DMSRestangular, state,
      localStorageService, MySessionService) {

      getDeaneryCount();
      rootScope.user = MySessionService.getLoggedUser();
      var Deaneries = DMSRestangular.all('deaneries');

      scope.getDeanery = function getDeanery(newDeanery) {
        console.log(newDeanery);
        scope.DeaneryProfile = newDeanery;
        state.go('location.deaneries.view');
      };

      scope.getDeaneries = function getDeaneries() {
        var Deaneries = DMSRestangular.all('deaneries');
        // This will query /accounts and return a promise.
        Deaneries.customGET('').then(function(deaneries) {
          //console.log(users);
          scope.rowCollection = deaneries;
          scope.displayedCollection = [].concat(scope.rowCollection);
        });
        var Dioceses = DMSRestangular.all('dioceses');
        // This will query /accounts and return a promise.
        Dioceses.customGET('').then(function(dioceses) {
          //console.log(users);
          scope.rowCollection_ = dioceses;
          scope.displayedCollection_ = [].concat(scope.rowCollection_);
        });
      };

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

      scope.newDeanery = function newDeanery() {
        deanery = {
              "deanery": {
                  "name":           scope.deaneryProfile.name,
                  "diocese_id":   scope.deaneryProfile.diocese_id
         }
        };
        console.log(deanery);
        Deaneries.customPOST(deanery);

      };

      scope.delDeanery = function delDeanery(newDeanery){
        scope.deaneryProfile = newDeanery;
        deletedDeanery = DMSRestangular.one('deaneries', scope.deaneryProfile.id);
        deletedDeanery.remove();
      };

      scope.updateDeanery = function updateDeanery() {
        updatedDeanery = DMSRestangular.one('deaneries', scope.deaneryProfile.id);
        deanery = {
              "deanery": {
              "id":         scope.deaneryProfile.id,
              "name":       scope.deaneryProfile.name,
              "in_charge":  scope.deaneryProfile.in_charge,
              "location":   scope.deaneryProfile.location,
              "diocese_id":   scope.deaneryProfile.diocese_id
         }
        };
        console.log(deanery);
        updatedDeanery.customPUT(deanery);
      };

      scope.setStatus = function setStatus(status) {
        scope.status = status;
        if (status == 'add') {
          scope.deaneryProfile = [];
        }
      };

      function getDeaneryCount() {
        var Deaneries = DMSRestangular.all('deaneries');
        // This will query /accounts and return a promise.
        Deaneries.customGET('').then(function(deaneries) {
          // console.log(users);
          scope.records = deaneries.length;
          scope.recordsPerPage = 5;
          scope.pages = Math.ceil(scope.records / scope.recordsPerPage);
        });
      }
    }

    
  ]
);