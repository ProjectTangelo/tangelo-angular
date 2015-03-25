(function userDirectives(angular) {
  'use strict';

  var app = angular.module('userDirectives', ['tangeloUserServices']);
  app.directive('userList', ['userService', '$location', function (userService, $location) {
    // Runs during compile
    return {
      scope: {},
      templateUrl: 'app/common/users/templates/user-list.html',
      restrict: 'E',
      replace: true,
      link: function ($scope, iElm, iAttrs, controller) {
        $scope.invokeEdit = function startEdit(user) {
          $location.path('/users/edit/' + user._id);
        }

        userService.get().then(function (res) {
          $scope.users = res.data;
        });
      }
    };
  }]);

  app.directive('userImport', ['userService', '$location', function userCSVImport(userService, $location) {
    var importedUsers = [];
    return {
      scope: {},
      templateUrl: 'app/common/users/templates/users-csv-import.html',
      restrict: 'E',
      replace: true,
      link: function ($scope, iElm, iAttrs, controller) {
        $scope.imported = false;
        $scope.users = [];
        var holder = $(iElm)[0];

        holder.ondragover = function () {
          return false;
        };
        holder.ondragend = function () {
          return false;
        };
        holder.ondrop = function (e) {
          e.preventDefault();
          var file = e.dataTransfer.files[0],
            reader = new FileReader();
          reader.onload = function (event) {
            var content = event.target
            var data = content.result;

            // Robust CSV Parser right here y'all
            var parseUsers = atob(data.split(",")[1]).trim().split("\n").map(function (e) {
              var row = e.split(',');
              return {
                'fname': row[0],
                'lname': row[1],
                'username': row[2],
                'email': row[3],
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
        $scope.importUsers = function importUsers() {
          if (submitted) return;
          submitted = true;
          userService.import(importedUsers);
          $location.path('/users');
        }

      }
    };
  }]);


  app.directive('userAdd', ['userService', '$location', function userAdd(userService, $location) {
    return {
      restrict: 'A',
      link: function ($scope, iElm, iAttrs, controller) {
        var hasSubmit = false;
        $scope.user = {};
        $scope.submit = function submitUserAdd() {
          if (hasSubmit) return;
          hasSubmit = true;
          // console.log('ADD USER', $scope.user);
          userService.add($scope.user).then(function (res) {
            $location.path('/users');
          });
        }
      }
    }
  }])

  app.directive('userEdit', ['userService', '$location', '$routeParams', function userForm(userService, $location, $routeParams) {
    return {
      // scope: {}, // ;_;
      restrict: 'A',
      link: function ($scope, iElm, iAttrs, controller) {
        var hasSubmit = false;
        $scope.user = {};
        userService.get($routeParams._id).then(function (res) {
          delete res.data.password;
          $scope.user = res.data;
        });

        $scope.submit = function submitUserForm() {
          if (hasSubmit) return;
          hasSubmit = true;
          // console.log('UPDATE USER', $scope.user);
          userService.update($scope.user).then(function (res) {
            $location.path('/users');
          });
        }
      }
    };
  }]);

})(angular);
