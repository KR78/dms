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
      }

      scope.getDeaneries = function getDeaneries() {
        
        // This will query /accounts and return a promise.
        Deaneries.customGET('').then(function(deaneries) {
          //console.log(users);
          scope.rowCollection = deaneries;
          scope.displayedCollection = [].concat(scope.rowCollection);
        });
      }

      scope.login = function login() {
        rootScope.user = [];
        var user = DMSRestangular.one('user').one('username', scope.formData
          .username).one('password', scope.formData.password).one(
          'format', 'json');
        // This will query /accounts and return a promise.
        user.customGET('').then(function(userObj) {
          localStorageService.set('dms_user', userObj);
          state.go('users');

        });
      }

    scope.setStatus = function setStatus(status) {
        scope.status = status;
        if (status == 'add') {
          scope.deaneryProfile = [];
        }
      }

      scope.newDeanery = function newdeanery() {
        deanery = {
              "deanery": {
                  "name":       scope.deaneryProfile.name,
                  "in_charge":  scope.deaneryProfile.in_charge,
                  "location":   scope.deaneryProfile.location
         }
        };
        console.log(deanery);
        Deaneries.post(deanery);

      }
        
      scope.updateDeanery = function updateDeanery() {
        updateddeanery = DMSRestangular.one('deaneries', deanery.id);
        deanery = {
              "utf8":"✓",
              "deanery": {
              "id":         deanery.id,
              "name":       scope.deaneryProfile.name,
              "in_charge":  scope.deaneryProfile.in_charge,
              "location":   scope.deaneryProfile.location
         }
        };
        console.log(deanery);
        updatedDeanery.put(deanery);
      }

      function getDeaneryCount() {
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