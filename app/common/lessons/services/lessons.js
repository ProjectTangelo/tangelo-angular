(function lessonServices(angular) {
  'use strict';

  var app = angular.module('tangeloLessonServices', []);

  app.service('lessonService', ['$http', function ($http) {
    // var url = '/uploads/';
    var url = '/file';

    var lessonToEdit;

    return {
      setToEdit: function (fileID) {
        lessonToEdit = $http.get('/uploads/' + userID);
      },

      getLessonToEdit: function () {
        return lessonToEdit;
      },

      getAll: function () {
        return $http.get(url);
      },

      get: function (userID) {
        return $http.get('/uploads/' + userID);
      },

      create: function (lesson) {
        $http.post(url, lesson);
      }
    };
  }]);
})(angular);
