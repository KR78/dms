// I am le Diocese Controller
app.controller(
  "diocesesCtrl", ['$scope', '$rootScope', '$filter', '$timeout',
    'DMSRestangular', '$state', 'localStorageService', 'MySessionService',
    function(scope, rootScope, filter, timeout, DMSRestangular, state,
      localStorageService, MySessionService) {

      var Dioceses = DMSRestangular.all('dioceses');
      var diocese = {};

      getDioceseCount();
      rootScope.user = MySessionService.getLoggedUser();

      scope.getDiocese = function getDiocese(newDiocese) {
        console.log(newDiocese);
        scope.dioceseProfile = newDiocese;
        state.go('location.dioceses.view');
      }

      scope.getDioceses = function getDioceses() {
        
        // This will query /accounts and return a promise.
        Dioceses.customGET('').then(function(dioceses) {
          //console.log(users);
          scope.rowCollection = dioceses;
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

      scope.newDiocese = function newdiocese() {
        diocese = {
              "diocese": {
                  "name":       scope.dioceseProfile.name,
                  "in_charge":  scope.dioceseProfile.in_charge,
                  "location":   scope.dioceseProfile.location
         }
        };
        console.log(diocese);
        Dioceses.post(diocese);

      }
        
      scope.updateDiocese = function updateDiocese() {
        updatedDiocese = DMSRestangular.one('dioceses', diocese.id);
        diocese = {
              "utf8":"✓",
              "diocese": {
              "id":         diocese.id,
              "name":       scope.dioceseProfile.name,
              "in_charge":  scope.dioceseProfile.in_charge,
              "location":   scope.dioceseProfile.location
         }
        };
        console.log(diocese);
        updatedDiocese.put(diocese);
      }

       scope.setStatus = function setStatus(status) {
        scope.status = status;
        if (status == 'add') {
          scope.dioceseProfile = [];
        }
      }

      function getDioceseCount() {
        // This will query /accounts and return a promise.
        Dioceses.customGET('').then(function(dioceses) {
          // console.log(users);
          scope.records = dioceses.length;
          scope.recordsPerPage = 5;
          scope.pages = Math.ceil(scope.records / scope.recordsPerPage);
        });
      }
    }


  ]
);