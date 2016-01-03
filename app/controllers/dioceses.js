// I am le Diocese Controller
app.controller(
  "diocesesCtrl", ['$scope', '$rootScope', '$filter', '$timeout',
    'DMSRestangular', '$state', 'localStorageService', 'MySessionService',
    function(scope, rootScope, filter, timeout, DMSRestangular, state,
      localStorageService, MySessionService) {

      getDioceseCount();
      rootScope.user = MySessionService.getLoggedUser();
      var Dioceses = DMSRestangular.all('dioceses');

      scope.getDiocese = function getDiocese(newDiocese) {
        console.log(newDiocese);
        scope.dioceseProfile = newDiocese;
        state.go('location.dioceses.view');
      };

      scope.getDioceses = function getDioceses() {
        // var Dioceses = DMSRestangular.all('dioceses');
        // This will query /accounts and return a promise.
        Dioceses.customGET('').then(function(dioceses) {
          //console.log(users);
          scope.rowCollection = dioceses;
          scope.displayedCollection = [].concat(scope.rowCollection);
        });

        var Archdioceses = DMSRestangular.all('archdioceses');
        // This will query /accounts and return a promise.
        Archdioceses.customGET('').then(function(archdioceses) {
          //console.log(users);
          scope.rowCollection_ = archdioceses;
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

      scope.newDiocese = function newDiocese() {
        diocese = {
              "diocese": {
                  "name":           scope.dioceseProfile.name,
                  "archdiocese_id":   scope.dioceseProfile.archdiocese_id
         }
        };
        console.log(diocese);
        Dioceses.customPOST(diocese);

      };

      scope.delDiocese = function delDiocese(newDiocese){
        scope.dioceseProfile = newDiocese;
        deletedDiocese = DMSRestangular.one('dioceses', scope.dioceseProfile.id);
        deletedDiocese.remove();
      };

      scope.updateDiocese = function updateDiocese() {
        updatedDiocese = DMSRestangular.one('dioceses', scope.dioceseProfile.id);
        diocese = {
              "diocese": {
              "id":         scope.dioceseProfile.id,
              "archdiocese_id":   scope.dioceseProfile.archdiocese_id,
              "name":       scope.dioceseProfile.name,
              "in_charge":  scope.dioceseProfile.in_charge,
              "location":   scope.dioceseProfile.location
         }
        };
        console.log(diocese);
        updatedDiocese.customPUT(diocese);
      };

       scope.setStatus = function setStatus(status) {
        scope.status = status;
        if (status == 'add') {
          scope.dioceseProfile = [];
        }
      };

      function getDioceseCount() {
        var Dioceses = DMSRestangular.all('dioceses');
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