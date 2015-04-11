(function submissionDirectives(angular) {
  'use strict';

  var app = angular.module('submissionDirectives', ['tangeloSubmissionServices']);

  app.directive('subList', ['submissionService',
	function(submissionService) {
	    return {
	      scope: {},
	      templateUrl: 'app/common/submissions/templates/submission-client.html',
	      restrict: 'E',
	      replace: true,
	      link: function ($scope, iElem, iAttrs, controller) {
		$scope.reload = function () {
			submissionService.getAll().then(function (data) {
			  $scope.submissionContent = '';
			  $scope.files = data.data;
			  $scope.currentSubmission = $scope.files[0];
			});
		}

		$scope.reload();
	     $scope.loadSubmission = function () {
	$scope.submissionContent = $scope.currentSubmission.content;
	
	$scope.commentList = $scope.currentSubmission.feedback;
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

  app.directive('submissionComments', ['submissionCommentsService', '$location', '$http', '$routeParams', '$sce', 'submissionService', function lessonEdit(commentsService, $location, $http, $routeParams, $sce, subService) {
    return {
      scope: {},
      templateUrl: 'app/common/submissions/templates/submission-comments.html',
      restrict: 'E',
      replace: true,
      link: function ($scope, iElem, iAttrs, controller) {
	  var submissionID = $location.$$path.split('/');
	  submissionID = submissionID[submissionID.length - 1];
          subService.get(submissionID).then(function(data) {
		$scope.commentList = data.data.feedback;
	});

          $scope.sendComment = function sendComment (event) {
              commentsService.create({
			submission: submissionID, 
			content : $scope.commentText } )
		.then(function (data) { 
		console.log(data);
                $scope.commentText = '';

          subService.get(submissionID).then(function(data) {
		$scope.commentList = data.data.feedback;
	});
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
