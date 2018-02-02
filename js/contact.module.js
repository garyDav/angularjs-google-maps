(function(angular) {
  /********************************************************************
  contact Module
  ********************************************************************/
  var contact = angular.module('contactModule',[]);

  contact.controller('contactCtrl', ['$scope',function($scope) {
    console.log('Joder estoy en CONTACT controller');

    $scope.setGmapConfig(
      {
        lat: -19.04781836355251, // no es necesario colocar valores ya que se usará la ubicación actual (status:true), pero por buena práctica deberíamos hacerlo
        lng: -65.25945163544924, // no es necesario colocar valores ya que se usará la ubicación actual (status:true), pero por buena práctica deberíamos hacerlo
        status: true // true: Usa la ubicación actual | false: Usa lat y lng
      }
    );

    $scope.save = function(self) {
      console.log(self);
    };
  }]);

})(angular);
