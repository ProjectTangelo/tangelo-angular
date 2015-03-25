(function clientModule(angular) {
  'use strict';

  var app = angular.module('tangelo', [
    'ngRoute',
    'tangeloScratchServices',
    'tangeloNodeServices',
    'tangeloUserServices',
    'userDirectives',
    'contentDirectives',
  ]);

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    .when('/home', {
      templateUrl: 'app/client/views/home.html',
      controller: 'ClientMainController'
    })
    .when('/profile', {
      templateUrl: 'app/client/views/profile.html',
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

  app.controller('ClientMainController', ['$scope', '$location', 'scratchService', function ($scope, $location, scratchService) {
    var current = '';

    $scope.showPanel = false;
    $scope.scratchText = {
      value: ''
    };
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
