(function(angular) {
  /********************************************************************
  contact Module
  ********************************************************************/
  var contact = angular.module('contactModule',[]);

  contact.controller('contactCtrl', ['$scope',function($scope) {
    console.log('Joder estoy en CONTACT controller');
    $scope.save = function(self) {
      console.log(self);
    };
  }]);

})(angular);
