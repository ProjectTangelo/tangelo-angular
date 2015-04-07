(function submissionDirectives(angular) {
  'use strict';

  var app = angular.module('submissionDirectives', ['tangeloSubmissionServices']);

  app.directive('lessonForm', ['submissionService', '$location', function lessonFrom(lessonService, $location) {
    return {
      restrict: 'A',
      link: function ($scope, iElem, iAttrs, controller) {
        var hasSubmit = false;
        $scope.lesson = {};

        $scope.submit = function submitLessonForm() {
          if (hasSubmit) return;
          hasSubmit = true;

          // Load the file
          $scope.lesson.file = iElem.find('#fileUpload').get(0).files[0];
          $scope.lesson.size = $scope.lesson.file.size;

          var reader = new FileReader();
          reader.onloadend = function () {
            // $scope.lesson.content = window.btoa(reader.result);
            $scope.lesson.content = reader.result;
            // console.log('Result: ' + $scope.lesson.content);
            // console.log('Result: ' + window.btoa($scope.lesson.content));
            lessonService.create($scope.lesson);

            // Redirects when done creating the files.
            $location.path('/lessons/');
          };

          // reader.readAsBinaryString( $scope.lesson.file );
          reader.readAsBinaryString($scope.lesson.file);
          // reader.readAsText( $scope.lesson.file );
          // console.log($scope.lesson.file);
          // console.log( $scope.lesson );
        }
      }
    }
  }]);

  app.directive('submissionList', ['submissionService', '$location', '$http', function lessonList(submissionService, $location, $http) {
    return {
      scope: {},
      templateUrl: 'app/common/submissions/templates/submission-list.html',
      restrict: 'E',
      replace: true,
      link: function ($scope, iElem, iAttrs, controller) {

        submissionService.getAll().then(function (data) {
          $scope.files = data.data;
          console.log('Scope Files: ' , $scope.files);
        });

        // TODO: Set this up to view a single file and its data.
        $scope.viewLesson = function viewLesson(file) {
          $location.path('/lessons/edit/' + file._id);
        };

        $scope.deleteLesson = function deleteLesson(file, elemID) {
          // console.log('Deleting file: ' + id + ' ID: ' + elemID);
          $(iElem).find('#' + elemID).remove();
          console.log('#' + elemID);
          $http.delete('/uploads/' + file._id).then(function (res) {
            // $location.path('/lessons');
          });
        };
      }
    };
  }]);

  app.directive('lessonEdit', ['submissionService', '$location', '$http', '$routeParams', '$sce', function lessonEdit(lessonService, $location, $http, $routeParams, $sce) {
    return {
      scope: {},
      templateUrl: 'app/common/lessons/templates/lessons-edit.html',
      restrict: 'E',
      replace: true,
      link: function ($scope, iElem, iAttrs, controller) {
        lessonService.get($routeParams._id).then(function (res) {
          var $e = $(iElem).find('.marked');
          $scope.lesson = marked(res.data);
          $e.html($scope.lesson);
        });
      }
    };
  }]);
})(angular);
