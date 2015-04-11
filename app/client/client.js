(function clientModule(angular) {
  'use strict';

  var app = angular.module('tangelo', [
    'ngRoute',
    'tangeloScratchServices',
    'tangeloNodeServices',
    'tangeloLessonServices',
    'tangeloUserServices',
    'userDirectives',
    'contentDirectives',
     'submissionDirectives' 
  ]);

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    .when('/home', {
      templateUrl: 'app/client/views/home.html',
      controller: 'ClientMainController'
    })
    .when('/submissions', {
      templateUrl: 'app/client/views/submissions.html',
      controller: 'ClientMainController'
    })
    .when('/scratch', {
      templateUrl: 'app/client/views/scratch.html',
      controller: 'ClientMainController'
    })
    .when('/lesson', {
      templateUrl: 'app/client/views/lesson.html',
      controller: 'ClientMainController'
    })
    .otherwise({
      redirectTo: '/home'
    });
  }]);

  app.controller('ClientMainController', ['$scope', '$location', 'scratchService', 'lessonService', '$sce', function ($scope, $location, scratchService, lessonService, $sce) {
    var current = '';

    $scope.showPanel = false;
    $scope.scratchText = {
      value: ''
    };

    $scope.loadLesson = function () {
        lessonService.get($scope.currentLesson._id).then(function (data) {
          $scope.lessonBuffer = $sce.trustAsHtml(marked(data.data));
        });
    };

    lessonService.getAll().then(function (data) {
        $scope.allLessons = data.data;
        $scope.currentLesson = $scope.allLessons[0];
        $scope.loadLesson();
    })

    $scope.panelChange = function (e) {
      scratchService.set($scope.scratchText.value);
      var href = e.target.getAttribute('link');
      if (href == current) {
        $scope.showPanel = false;
        current = '';
        return;
      }
      else {
        current = href;
      }


      $location.path(href);
      $scope.showPanel = true;
    };
  }]);

  app.controller('AdminUserController', ['$scope', 'userService', function ($scope, userService) {
    $scope.users = userService;
  }]);


})(angular);
