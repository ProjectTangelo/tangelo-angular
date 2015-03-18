(function adminModule (angular) {
'use strict'

var app = angular.module('tangeloAdmin',
	['demoServices', 'tangeloNodeServices', 'tangeloUserServices',
	 'userDirectives', 'contentDirectives', 'editorServices']);

var current = '';

app.controller('ClientMainController', ['$scope','$location','stratchService', function($scope, $location, stratchService){

  $scope.showPanel = false;
  $scope.scratchText = {value:''};
  $scope.panelChange = function (e) {
  	stratchService.set($scope.scratchText.value);
  	var href = e.target.getAttribute('link');
  	if (href == current) {
  		$scope.showPanel = false;
  		current = '';
 		return;
  	} else {  		
  		current = href;
  	}


  	$location.path(href);
	$scope.showPanel = true;
  };
	
}]);

app.controller('ClientHomeController', ['$scope','globalCounterService',function($scope, globalCounterService){
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
