// I am le Navbar Controller
app.controller(
  "NavbarController", ['$scope', '$rootScope', '$filter', '$timeout',
    'DMSRestangular', '$state', 'localStorageService', 'MySessionService', '$auth', 'toastr', '$localStorage',
    function(scope, rootScope, filter, timeout, DMSRestangular, state,
      localStorageService, MySessionService, auth, toastr, localStorage) {


// I hangle the logout
     scope.handleSignOutBtnClick = function() {
        auth.signOut()
          .then(function(resp) { 
            // handle success response
          })
          .catch(function(resp) { 
            // handle error response
           console.log(resp.errors);
          });
      };
      

    }
  ]
);