(function(angular) {
  var app = angular.module('mainApp',[
    'ngResource',
    'ngRoute',
    'ngTouch',
    'google-maps',
    'homeModule',
    'contactModule',
    'rutasModule'
  ]);

  app.controller('mainCtrl',['$scope',function($scope) {
    console.log('Mierda estoy en el puto controller principal');
    var markerId = 0;

    $scope.autentiaMarker = {
      latitude: -19.04781836355251,
      longitude: -65.25945163544924
    };

    $scope.map = {
  		center: {
        latitude: $scope.autentiaMarker.latitude,
    		longitude: $scope.autentiaMarker.longitude
  		},
  		zoom: 17,
  		markers: [],
  		control: {},
  		options: {
  			scrollwheel: false
  		}
  	};

  	function refresh(marker) {
      $scope.map.control = marker;
  	}

  	function create(latitude, longitude) {
  		var marker = {
  			options: {
  				animation: 1,
  				labelAnchor: "28 -1",
  				labelClass: 'markerlabel',
          draggable: true
  			},
  			latitude: latitude,
  			longitude: longitude,
  			id: ++markerId
  		};
  		return marker;
  	}

  	function invokeSuccessCallback(successCallback, marker) {
  		if (typeof successCallback === 'function') {
  			successCallback(marker);
  		}
  	}

  	function createByCoords(latitude, longitude, successCallback) {
  		var marker = create(latitude, longitude);
  		invokeSuccessCallback(successCallback, marker);
  	}

  	createByCoords(-19.04781836355251, -65.25945163544924, function (marker) {
  		marker.options.labelContent = 'Autentia';
      console.log(marker);
  		$scope.autentiaMarker = marker;
  		refresh(marker);
  	});



    function createByCurrentLocation(successCallback) {
    	if (navigator.geolocation) {
    		navigator.geolocation.getCurrentPosition(function (position) {
    			var marker = create(position.coords.latitude, position.coords.longitude);
    			invokeSuccessCallback(successCallback, marker);
    		});
    	} else {
    		alert('Unable to locate current position');
    	}
    }

    createByCurrentLocation(function (marker) {
    	marker.options.labelContent = 'You´re here';
    	$scope.map.markers.push(marker);
    	refresh(marker);
    });


  	$scope.map.markers.push($scope.autentiaMarker);

  }]);

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

})(angular);
