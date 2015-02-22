(function adminModule (angular) {

var app = angular.module('tangeloAdmin', ['demoServices']);

app.controller('AdminHomeController', ['$scope','globalCounterService',function($scope, globalCounterService){
  $scope.counter = 0;
  $scope.globalCounter = globalCounterService.get();

  $scope.increment = function counterInc() {
      globalCounterService.inc();
      $scope.globalCounter = globalCounterService.get();
  };

}]);

})(angular);


