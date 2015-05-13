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

  app.controller('ClientMainController', ['$http', '$scope', '$location', 'scratchService', 'lessonService', '$sce', function ($http, $scope, $location, scratchService, lessonService, $sce) {
    var current = '';

    $scope.showPanel = false;
    $scope.scratchText = {
      value: ''
    };

    $scope.logout = function () {
        $http.get('/logout').then(function(res){
            document.location.href = '/';
        });
    };

    $scope.loadLesson = function () {
        lessonService.get($scope.currentLesson._id).then(function (res) {
        //   $scope.lessonBuffer = $sce.trustAsHtml(marked(data.data));
            var contentType = res.headers('content-type');

            switch( contentType.split('/')[0] ) {
              case "image":
                  var data = btoa(unescape(encodeURIComponent( res.data )))
                  $scope.lessonBuffer = $sce.trustAsHtml('<img width="100%" src="http://33.33.33.10/uploads/' + $scope.currentLesson._id + '" />');
                  break;

              case "text":
              case "application":
                  // This is just the application type. Used to check if it's markdown or not.
                  var justType = contentType.split(';')[0].split('/')[1];

                  if( justType === 'x-markdown' || justType === 'markdown')
                      $scope.lessonBuffer = $sce.trustAsHtml(marked(res.data));
                  else
                  $scope.lessonBuffer = $sce.trustAsHtml('<pre>' + res.data + '</pre>');
                  break;
            }
        });
    };

    lessonService.getAll().then(function (data) {
        $scope.allLessons = data.data;
        for( var i = 0; i < data.data.length; ++i )
        {
            $scope.allLessons[i].name = (i+1).toString();
        }
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
