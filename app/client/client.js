(function adminModule (angular) {

'use strict'

var app = angular.module('tangeloAdmin',
	['demoServices', 'tangeloNodeServices', 'tangeloUserServices',
	 'userDirectives', 'contentDirectives']);

app.controller('AdminHomeController', ['$scope','globalCounterService',function($scope, globalCounterService){
  $scope.counter = 0;
  $scope.globalCounter = globalCounterService.get();

  $scope.increment = function counterInc() {
      globalCounterService.inc();
      $scope.globalCounter = globalCounterService.get();
  };

}]);

app.controller('AdminUserController', ['$scope', 'userService', function($scope, userService){
	$scope.users = userService;
}])


})(angular);
