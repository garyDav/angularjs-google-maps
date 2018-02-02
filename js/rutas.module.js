(function(angular) {
  /********************************************************************
  rutas Module
  ********************************************************************/
  var rutas = angular.module('rutasModule',[]);

  rutas.controller('rutasCtrl', ['$scope', function($scope) {
    console.log('joder estoy en RUTAS controller');

    $scope.setGmapConfig(
      {
        lat: -19.04781836355251,
        lng: -65.25945163544924,
        status: false // true: Usa la ubicación actual | false: Usa lat y lng
      }
    );

    $scope.save = function(self) {
      console.log(self);
    };

  }]);

})(angular);
