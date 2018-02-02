(function(angular) {
  /********************************************************************
  rutas Module
  ********************************************************************/
  var rutas = angular.module('rutasModule',[]);

  rutas.controller('rutasCtrl', ['$scope', function($scope) {
    console.log('joder estoy en RUTAS controller');

  }]);

})(angular);
