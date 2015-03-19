(function lessonDirectives( angular ) {
	'use strict'

	var app = angular.module('lessonDirectives', ['tangeloLessonServices']);

	app.directive('lessonForm', ['lessonService', '$location', function lessonFrom( lessonService, $location ) {
		return {
			restrict: 'A',
			link: function( $scope, iElem, iAttrs, controller ) {
				var hasSubmit = false;
				$scope.lesson = {};

				$scope.submit = function submitLessonForm() {
					if( hasSubmit ) return;
					hasSubmit = true;

					// Load the file
					$scope.lesson.file = iElem.find('#fileUpload').get(0).files[0];
					$scope.lesson.size = $scope.lesson.file.size;
					lessonService.create( $scope.lesson );

					// $location.path('/lessons/');
					// console.log( $scope.lesson );
				}
			}
		}
	}])
})(angular);