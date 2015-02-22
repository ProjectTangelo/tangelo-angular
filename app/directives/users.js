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

	app.directive('userImport', ['userService', function userCSVImport (argument) {
		return {
			scope: {}, 
		 	templateUrl: 'app/tmpl/users-csv-import.html',
			restrict: 'E', 
			replace: true,
			link: function($scope, iElm, iAttrs, controller) {
				$scope.imported = false;
 
			var holder = $(iElm)[0];

			holder.ondragover = function () {  alert(2); this.className = 'hover'; return false; };
			holder.ondragend = function () { this.className = ''; return false; };
			holder.ondrop = function (e) {
			  this.className = '';
			  e.preventDefault();

			  var file = e.dataTransfer.files[0], reader = new FileReader();
			  reader.onload = function (event) {
			    console.log(event.target);
			    holder.style.background = 'url(' + event.target.result + ') no-repeat center';
			  };
			  console.log(file);
			  reader.readAsDataURL(file);

			  return false;
			}

			console.log(holder);

			}
		};
	}])


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