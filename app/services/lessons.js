(function lessonServicesModule(angular) {
	'use strict'

	var app = angular.module('tangeloLessonServices', []);

	app.service('lessonService', ['$http', function($http){
		var url = '/uploads/';

		return {
			getAll: function() {
				return $http.get( url );
			},

			get: function( userID ) {
				return $http.get( url + userID );
			},

			create: function( lesson ) {
				$http.post( url, lesson );
			}
		};
	}]);
})(angular);