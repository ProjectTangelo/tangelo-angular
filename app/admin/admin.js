(function adminModule(angular) {

  'use strict';

  var app = angular.module('tangeloAdmin', [
    'demoServices',
    'tangeloNodeServices',
    'tangeloUserServices',
    'userDirectives',
    'contentDirectives',
    'tangeloLessonServices',
    'lessonDirectives'
  ]);

  app.controller('AdminHomeController', ['$scope', 'globalCounterService', function ($scope, globalCounterService) {
    $scope.counter = 0;
    $scope.globalCounter = globalCounterService.get();

    $scope.increment = function counterInc() {
      globalCounterService.inc();
      $scope.globalCounter = globalCounterService.get();
    };

  }]);

  app.controller('AdminUserController', ['$scope', 'userService', function ($scope, userService) {
    $scope.users = userService;
  }]);

  app.controller('AdminLessonController', ['$scope', 'userService', function ($scope, lessonService) {
    $scope.lessonService = lessonService;
  }])


})(angular);
