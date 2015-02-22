(function userDirectives (angular) {
	'use strict'

	var app = angular.module('userDirectives', ['tangeloUserServices']);
	app.directive('userList', ['userService', function(userService){
		// Runs during compile
		return {
			scope: {}, 
		 	templateUrl: 'app/tmpl/user-list.html',
			restrict: 'E', 
			link: function($scope, iElm, iAttrs, controller) {
				$scope.users = userService.get();
			}
		};
	}]);
})(angular);