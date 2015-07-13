app.controller("HomeCtrl", [ '$rootScope', '$scope' , function(rootScope, scope) {

      rootScope.title = 'DMS | Home';

    angular.extend(scope, {
      nairobi: {
        lat: -1.2833,
        lng: 36.8167,
        zoom: 12
      },
      layers: {
        baselayers: {
          mapbox_outdoors: {
            name: 'DMS Maps',
            url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
            type: 'xyz',
            layerOptions: {
              apikey: 'pk.eyJ1IjoidmljNzgiLCJhIjoiZjQ0MDNlMTVmYmNiYTFjY2Y2Mjk3ZTZmY2E0MDVhMTYifQ.qEquG4p4KKO2NY4ULPd7Lw',
              mapid: 'vic78.f679a5b4'
            }
          }
        }
      }
    });
}]);


