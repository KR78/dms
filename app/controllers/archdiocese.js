// I am le Archdiocese Controller
app.controller(
  "archdiocesesCtrl", ['$scope', '$rootScope', '$filter', '$timeout',
    'DMSRestangular', '$state', 'localStorageService', 'MySessionService',
    function(scope, rootScope, filter, timeout, DMSRestangular, state,
      localStorageService, MySessionService) {

      getArchdioceseCount();
      rootScope.user = MySessionService.getLoggedUser();

      var Archdioceses = DMSRestangular.all('archdioceses');

      scope.getArchdiocese = function getArchdiocese(newArchdiocese) {
        console.log(newArchdiocese);
        scope.ArchdioceseProfile = newArchdiocese;
        state.go('location.archdioceses.view');
      }

      scope.getArchdioceses = function getArchdioceses() {
        // This will query /accounts and return a promise.
        Archdioceses.customGET('').then(function(archdioceses) {
          //console.log(users);
          scope.rowCollection = archdioceses;
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
          scope.archdioceseProfile = [];
        }
      }

      scope.newArchdiocese = function newArchdiocese() {
        var archdiocese = {
              "archdiocese": {
                  "name":       scope.archdioceseProfile.name,
         }
        };
        console.log(archdiocese);
        Archdioceses.post(archdiocese);

      }

      scope.updateParish = function updateParish() {
        updatedArchdiocese = DMSRestangular.one('archdioceses', archdiocese.id);
        var archdiocese = {
              "utf8":"✓",
              "archdiocese": {
              "id":         archdiocese.id,
              "name":       scope.archdioceseProfile.name,
         }
        };
        console.log(archdiocese);
        updatedArchdiocese.put(archdiocese);
      }



      function getArchdioceseCount() {
        // This will query /accounts and return a promise.
        Archdioceses.customGET('').then(function(archdioceses) {
          // console.log(users);
          scope.records = archdioceses.length;
          scope.recordsPerPage = 5;
          scope.pages = Math.ceil(scope.records / scope.recordsPerPage);
        });
      }
    }

    
  ]
);