// I am le Login Controller
app.controller(
  "LoginCtrl", ['$scope', '$rootScope', '$filter', '$timeout',
    'DMSRestangular', '$state', 'localStorageService', 'MySessionService', '$auth', 'toastr', 
    function(scope, rootScope, filter, timeout, DMSRestangular, state,
      localStorageService, MySessionService, auth, toastr) {

    rootScope.title = 'DMS CPanel';
      
     scope.handleLoginBtnClick = function() {
          auth.submitLogin(scope.loginForm)
            .then(function(resp) { 
              // handle success response
            })
            .catch(function(resp) { 
              // handle error response
            console.log(resp.errors); //log any errors 
            });
        };
    
    }
  ]
);