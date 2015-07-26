// I am le Services Controller
app.controller(
  "servicesCtrl", ['$scope', '$rootScope', '$filter', '$timeout',
    'DMSRestangular', '$state', 'localStorageService', 'MySessionService',
    function(scope, rootScope, filter, timeout, DMSRestangular, state,
      localStorageService, MySessionService) {
      var Services = DMSRestangular.all('services');
      getServiceCount();
      rootScope.user = MySessionService.getLoggedUser();

      scope.getService = function getService(newService) {
        console.log(newService);
        scope.service = newService;
        state.go('location.services.view');
      }

      scope.getServices = function getServices() {

        // This will query /accounts and return a promise.
        Services.customGET('').then(function(services) {
          // console.log(services[0]);
          scope.rowCollection = services;
          scope.displayedCollection = [].concat(scope.rowCollection);
        });
      }

      scope.delService = function delService(newService){
        scope.serviceProfile = newService;
        deletedService  = DMSRestangular.one('services', serviceProfile.id);
        deletedService.remove();
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

      scope.newService = function newService() {
        service = {
              "service": {
                  "name":       scope.serviceProfile.name,
                  "in_charge":  scope.serviceProfile.in_charge,
                  "location":   scope.serviceProfile.location
         }
        };
        console.log(service);
        services.post(service);

      }
        
      scope.updateService = function updateService() {
        updatedService = DMSRestangular.one('services', serviceProfile.id);
        service = {
              "service": {
              "id":         scope.serviceProfile.id,
              "name":       scope.serviceProfile.name,
              "in_charge":  scope.serviceProfile.in_charge,
              "location":   scope.serviceProfile.location
         }
        };
        console.log(service);
        updatedservice.put(service);
      }


      function getServiceCount() {
        // This will query /accounts and return a promise.
        Services.customGET('').then(function(services) {
          // console.log(users);
          scope.records = services.length;
          scope.recordsPerPage = 5;
          scope.pages = Math.ceil(scope.records / scope.recordsPerPage);
        });
      }

      
    }
  ]
);