(function lessonDirectives(angular) {
  'use strict';

  var app = angular.module('lessonDirectives', ['tangeloLessonServices']);

  app.directive('lessonForm', ['lessonService', '$location', function lessonFrom(lessonService, $location) {
    return {
      restrict: 'A',
      link: function ($scope, iElem, iAttrs, controller) {
        var hasSubmit = false;
        $scope.lesson = {};

        $scope.submitNew = function() {
            if( hasSubmit ) return;
            hasSubmit = true;

            // Load the file
            // $scope.lesson.file = iElem.find('#fileUpload').get(0).files[0];
            // console.log( angular.element( document.querySelector( '#theLessonForm' ) ).get(0) );
            // angular.element( document.querySelector( '#theLessonForm' ) ).get(0).serialize();
            //
            // $scope.lesson = iElem.find('form').serialize();
            // console.log($scope.lesson)
            console.log( $scope.lesson );
            lessonService.create($scope.lesson);

            console.log('Hey thar')
            // Redirects when done creating the files.
            $location.path('/lessons/');
        }

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

  app.directive('lessonList', ['lessonService', '$location', '$http', function lessonList(lessonService, $location, $http) {
    return {
      scope: {},
      templateUrl: 'app/common/lessons/templates/lesson-list.html',
      restrict: 'E',
      replace: true,
      link: function ($scope, iElem, iAttrs, controller) {

        // $http.get('/uploads?{}').success(function (data) {
        $http.get('/file').success(function (data) {
          $scope.files = data;
          console.log('Scope Files: ' + $scope.files);
        });

        // TODO: Set this up to view a single file and its data.
        $scope.viewLesson = function viewLesson(file) {
          $location.path('/lessons/edit/' + file._id);
        };

        $scope.deleteLesson = function deleteLesson(file, elemID) {
          // console.log('Deleting file: ' + id + ' ID: ' + elemID);
          $(iElem).find('#' + elemID).remove();
          console.log('#' + elemID);
          $http.delete('/file/' + file._id).then(function (res) {
            // $location.path('/lessons');
          });
        };
      }
    };
  }]);

  app.directive('lessonEdit', ['lessonService', '$location', '$http', '$routeParams', '$sce', function lessonEdit(lessonService, $location, $http, $routeParams, $sce) {
    return {
      scope: {},
      templateUrl: 'app/common/lessons/templates/lessons-edit.html',
      restrict: 'E',
      replace: true,
      link: function ($scope, iElem, iAttrs, controller) {
        lessonService.get($routeParams._id).then(function (res) {
          var $e = $(iElem).find('.marked');
          var contentType = res.headers('content-type');

          switch( contentType.split('/')[0] ) {
            case "image":
                // res.data is the image data.
                // contentType is the mime type of the file.
                // $e is the div that the content should go into. You can append elements to it.
                $e.append('<img src="data:' + contentType + ';base64,' + res.data + '" />');
                break;

            case "text/markdown":
            case "text":
            case "application":
                $scope.lesson = marked(res.data);
                $e.html($scope.lesson);
                break;
          }
        });
      }
    };
  }]);
})(angular);
