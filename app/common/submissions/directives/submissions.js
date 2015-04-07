(function submissionDirectives(angular) {
  'use strict';

  var app = angular.module('submissionDirectives', ['tangeloSubmissionServices']);

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
        $scope.viewSubmission = function viewSubmission(file) {
          $location.path('/submissions/view/' + file._id);
        };

        $scope.deleteSubmission = function deleteLesson(file, elemID) {
          // console.log('Deleting file: ' + id + ' ID: ' + elemID);
          $(iElem).find('#' + elemID).remove();
          console.log('#' + elemID);
          submissionService.delete(file._id).then(function (res) {
            // $location.path('/lessons');
          });
        };
      }
    };
  }]);

  app.directive('submissionComments', ['submissionCommentsService', '$location', '$http', '$routeParams', '$sce', function lessonEdit(commentsService, $location, $http, $routeParams, $sce) {
    return {
      scope: {},
      templateUrl: 'app/common/submissions/templates/submission-comments.html',
      restrict: 'E',
      replace: true,
      link: function ($scope, iElem, iAttrs, controller) {
          $scope.commentList = commentsService.get();

          $scope.sendComment = function sendComment (event) {
              commentsService.create({
                'name' : 'Administrator', 
                'date' : 'now',
                'comment': $scope.commentText
              }).then(function (data) { 
                $scope.commentText = '';
                $scope.commentList = commentsService.get();
              });
          }
      }
    };
  }]);

  app.directive('submissionView', ['submissionService', '$location', '$http', '$routeParams', '$sce', function lessonEdit(lessonService, $location, $http, $routeParams, $sce) {
    return {
      scope: {},
      templateUrl: 'app/common/submissions/templates/submission-view.html',
      restrict: 'E',
      replace: true,
      link: function ($scope, iElem, iAttrs, controller) {
        lessonService.get($routeParams._id).then(function (res) {
          $scope.submission = res.data;
        });
      }
    };
  }]);

})(angular);
