(function submissionServices(angular) {
  'use strict';

  var app = angular.module('tangeloSubmissionServices', []);

  app.service('submissionCommentsService', ['$http', '$q', function ($http, $q) {
      var comments = [];
      var url = '/feedback/'; // whats the name of this endpoint?

      var lessonToEdit;

      return {
        setToEdit: function (fileID) {
          lessonToEdit = $http.get(url + userID);
        },

        getLessonToEdit: function () {
          return lessonToEdit;
        },

        getAll: function () {
          return $http.get(url);
        },

        get: function (submission) {
          return $http.post(url + '/' + submission);
        },

        delete: function (userID) {
          return $http.delete(url + userID);
        },

        create: function (comment) {
          return $http.post(url, {
	    submission : comment.submission,
	    content : comment.content
	  });
        }
      };
    }]);


  app.service('submissionService', ['$http', function ($http) {
    var url = '/submission/';

    var lessonToEdit;

    return {
      setToEdit: function (fileID) {
        lessonToEdit = $http.get(url + userID);
      },

      getLessonToEdit: function () {
        return lessonToEdit;
      },

      getAll: function () {
        return $http.get(url);
      },

      get: function (userID) {
        return $http.get(url + userID);
      },

      delete: function (userID) {
        return $http.delete(url + userID);
      },

      create: function (lesson) {
        $http.post(url, lesson);
      }
    };
  }]);
})(angular);
