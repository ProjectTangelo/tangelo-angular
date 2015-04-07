(function submissionServices(angular) {
  'use strict';

  var app = angular.module('tangeloSubmissionServices', []);

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
        console.log('foo');
        return $http.get(url);
      },

      get: function (userID) {
        return $http.get(url + userID);
      },

      create: function (lesson) {
        $http.post(url, lesson);
      }
    };
  }]);
})(angular);
