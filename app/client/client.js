(function clientModule(angular) {
  'use strict';

  var app = angular.module('tangelo', [
    'ngRoute',
    'tangeloNodeServices',
    'tangeloUserServices',
    'userDirectives',
    'contentDirectives',
    'editorServices',
  ]);

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    .when('/home', {
      templateUrl: 'app/client-partials/home.html',
      controller: 'ClientHomeController'
    })
    .when('/profile', {
      templateUrl: 'app/client-partials/profile.html',
      controller: 'ClientHomeController'
    })
    .when('/scratch', {
      templateUrl: 'app/client-partials/scratch.html',
      controller: 'ClientHomeController'
    })
    .when('/lesson', {
      templateUrl: 'app/client-partials/lesson.html',
      controller: 'ClientHomeController'
    })
    .otherwise({
      redirectTo: '/home'
    });
  }]);

  app.controller('ClientMainController', ['$scope', '$location', 'stratchService', function ($scope, $location, stratchService) {
    var current = '';

    $scope.showPanel = false;
    $scope.scratchText = {
      value: ''
    };
    $scope.panelChange = function (e) {
      stratchService.set($scope.scratchText.value);
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
  }])


})(angular);
