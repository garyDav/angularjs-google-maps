(function(angular) {
  var app = angular.module('mainApp',[
    'ngResource',
    'ngRoute',
    'ngTouch',
    'uiGmapgoogle-maps',
    'homeModule',
    'contactModule',
    'rutasModule'
  ]);

  app.config(['$routeProvider',function($routeProvider) {
    $routeProvider.
    when('/', {
      templateUrl: 'partial/home.html',
      controller: 'homeCtrl'
    }).
    when('/contact', {
      templateUrl: 'partial/contact.html',
      controller: 'contactCtrl'
    })
    .when('/rutas', {
      templateUrl: 'partial/rutas.html',
      controller: 'rutasCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
  }]);

  app.config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
    GoogleMapApi.configure({
      // v: '3.20',
      key: 'AIzaSyA8it686ZBtnGsZKnBeq5pxh3N25UC5Uws',
      language: 'es',
      libraries: 'places'
    });
  }]);

  app.controller('mainCtrl',['$scope', '$log', 'uiGmapGoogleMapApi', function($scope, $log, GoogleMapApi) {
    console.log('Mierda estoy en el puto controller principal');

    $scope.gmap = function( position = {latitude:-19.04781836355251,longitude:-65.25945163544924} ) {
      $scope.self = {
        address: '',
        lat: '',
        lng: ''
      };
      $scope.map = {
        center: position,
        zoom: 16,
        control: {},
        options: {
          scrollwheel: false
        }
      };
      $scope.marker = {
        id: 1,
        coords: position,
        options: {
          animation: 2,
          draggable: true
        },
        events: {
          mouseup: function( gMarker, eventName, model, latLngArg ) {
            var pos = {
              lat: latLngArg[0].latLng.lat(),
              lng: latLngArg[0].latLng.lng()
            };
            //console.log(pos);
            $scope.geocoder.geocode({'latLng': pos}, function(result, status) {
              console.log(status);
              if(status === 'OK') {
                $scope.$apply(function() {
                  $scope.self.address = result[0].formatted_address;
                  $scope.self.lat = pos.lat;
                  $scope.self.lng = pos.lng;
                });
              }
            });
          }
        }
      };
      $scope.searchbox = {
        template:'searchbox.tpl.html',
        events: {
          places_changed: function (searchBox) {
            console.log(searchBox);
            var places = searchBox.getPlaces();
            if (places.length == 0) {
              return;
            }
            var pos = {
              latitude: places[0].geometry.location.lat(),
              longitude: places[0].geometry.location.lng()
            };
            var address = places[0].formatted_address;
            $scope.marker.coords = pos;
            $scope.map.center = pos;
            $scope.self.address = address;
            $scope.self.lat = pos.latitude;
            $scope.self.lng = pos.longitude;
          }
        }
      };
      $scope.options = {
        scrollwheel: false
      };

      GoogleMapApi.then(function(maps) {
        console.log(maps);
        // HTML5 geolocation, busca la ubicación actual
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            };
            $scope.marker.coords = pos;
            $scope.map.center = pos;

            $scope.$apply(function() {
              $scope.self.lat = pos.latitude;
              $scope.self.lng = pos.longitude;
            });

            /*$scope.infoWindow.setPosition({lat:pos.latitude,lng:pos.longitude});
            $scope.infoWindow.setContent('<h4 style="margin:0;">Estás aquí</h4>');
            $scope.infoWindow.open(maps, $scope.marker);*/
          });
        } else {
          // Browser doesn't support Geolocation
          swal("Error de geolocalización", "¡Tu navegador no soporta geolocalización!", "error");
        }
        $scope.geocoder = new maps.Geocoder();
        $scope.infoWindow = new maps.InfoWindow();
        maps.visualRefresh = true;
      });
    };
  }]);

})(angular);
