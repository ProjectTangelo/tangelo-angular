(function lessonServicesModule(angular) {
  'use strict';

  var app = angular.module('tangeloLessonServices', []);

  app.service('lessonService', ['$http', function ($http) {
    var url = '/uploads/';

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

      create: function (lesson) {
        $http.post(url, lesson);
      }
    };
  }]);
})(angular);
