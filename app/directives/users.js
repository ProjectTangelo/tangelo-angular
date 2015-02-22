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


	app.directive('userForm', ['userService', function userForm (userService) {
		return {
			restrict: 'A', 
			link: function($scope, iElm, iAttrs, controller) {
				$scope.user = {};

				$scope.submit = function submitUserForm () {
					console.log($scope.user);
					userService.add($scope.user);
				}
			}
		}
	}])
})(angular);