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


	app.directive('userForm', ['userService', '$location', function userForm (userService, $location) {
		return {
			restrict: 'A', 
			link: function($scope, iElm, iAttrs, controller) {
				var hasSubmit = false;
				$scope.user = {};
				$scope.submit = function submitUserForm () {
					if(hasSubmit) return;
					hasSubmit = true; 
					userService.add($scope.user);
					$location.path('/users');
				}
			}
		}
	}])
})(angular);