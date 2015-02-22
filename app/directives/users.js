(function userDirectives (angular) {
	'use strict'

	var app = angular.module('userDirectives', ['tangeloUserServices']);
	app.directive('userList', ['userService', function(userService){
		// Runs during compile
		return {
			scope: {}, 
		 	templateUrl: 'app/tmpl/user-list.html',
			restrict: 'E',
			repalce: true, 
			link: function($scope, iElm, iAttrs, controller) {
				$scope.users = userService.get();
			}
		};
	}]);

	app.directive('userImport', ['userService', '$location', function userCSVImport (userService, $location) {
		var importedUsers = [];
		return {
			scope: {}, 
		 	templateUrl: 'app/tmpl/users-csv-import.html',
			restrict: 'E', 
			replace: true,
			link: function($scope, iElm, iAttrs, controller) {
				$scope.imported = false;
				$scope.users = [];
				var holder = $(iElm)[0];

				holder.ondragover = function () {  
					 return false; };
				holder.ondragend = function () { return false; };
 				holder.ondrop = function (e) {
  			  		e.preventDefault();
					  var file = e.dataTransfer.files[0], reader = new FileReader();
					  reader.onload = function (event) {
					    var content = event.target
					    var data = content.result;

					    // Robust CSV Parser right here y'all
					    var parseUsers = atob(data.split(",")[1]).trim().split("\n").map(function (e) {
					    	var row = e.split(',');
					    	return {
					    		'fname' : row[0],
					    		'lname' : row[1],
					    		'username' : row[2],
					    		'email' : row[3],
					    		'type': 'User'
					    	}
					    });
					    
					    importedUsers = parseUsers;
					    $scope.users = parseUsers;
					    $scope.imported = true;
					    $scope.$apply();
			  };

			  reader.readAsDataURL(file);
			  return false;
			}

			var submitted = false;
			$scope.importUsers = function importUsers () {
				if(submitted) return;
				submitted = true; 
				userService.import(importedUsers);
				$location.path('/users');
			}

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