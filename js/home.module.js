(function(angular) {
  /********************************************************************
  home Module
  ********************************************************************/
  var home = angular.module('homeModule',[]);

  home.controller('homeCtrl', ['$scope',function($scope) {
    console.log('Joder estoy HOME controller');
  }]);

})(angular);
