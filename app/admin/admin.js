(function adminModule(angular) {
  'use strict';

  var app = angular.module('tangelo', [
    'ngRoute',
    'tangeloLessonServices',
    'tangeloLXCServices',
    'tangeloNodeServices',
    'tangeloUserServices',
    'contentDirectives',
    'lessonDirectives',
    'lxcDirectives',
    'userDirectives',
  ]);

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'app/admin/views/home.html',
        controller: 'AdminHomeController'
      })
      .when('/users', {
        templateUrl: 'app/admin/views/users.html',
        controller: 'AdminUserController'
      })
      .when('/users/add', {
        templateUrl: 'app/admin/views/users-add.html',
        controller: 'AdminUserController'
      })
      .when('/users/edit/:_id', {
        templateUrl: 'app/admin/views/users-edit.html',
        controller: 'AdminUserController'
      })
      .when('/users/import', {
        templateUrl: 'app/admin/views/users-import.html',
        controller: 'AdminUserController'
      })
      .when('/servers', {
        templateUrl: 'app/admin/views/servers.html',
        controller: 'AdminHomeController'
      })
      .when('/lessons', {
        templateUrl: 'app/admin/views/lessons.html',
        controller: 'AdminLessonController'
      })
      .when('/lessons/add', {
        templateUrl: 'app/admin/views/lessons-add.html',
        controller: 'AdminLessonController'
      })
      .when('/lessons/edit/:_id', {
        templateUrl: 'app/admin/views/lessons-edit.html',
        controller: 'AdminLessonController'
      })
      .when('/submissions', {
        templateUrl: 'app/admin/views/lessons.html',
        controller: 'AdminLessonController'
      })
      .when('/submissions/view/:_id', {
        templateUrl: 'app/admin/views/lessons-edit.html',
        controller: 'AdminLessonController'
      })
      .otherwise({
        redirectTo: '/home'
      });
  }]);

  app.controller('AdminHomeController', ['$scope', function ($scope) {
  }]);

  app.controller('AdminUserController', ['$scope', 'userService', function ($scope, userService) {
    $scope.users = userService;
  }]);

  app.controller('AdminLessonController', ['$scope', 'userService', function ($scope, lessonService) {
    $scope.lessonService = lessonService;
  }]);

})(angular);
