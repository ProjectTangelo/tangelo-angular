(function userServicesModule(angular) {
  'use strict';

  var app = angular.module('tangeloLXCServices', []);
  app.service('lxcService', ['$http', function ($http) {
    return {
      URI: 'http://master.tangelo.work:5000',
      get: function getUsers(id) {
        var url = this.URI;
        return $http.get(url);
      },

      stop: function getUsers(id) {
        var url = this.URI + '/stop';
        return $http.get(url);
      },
      start: function getUsers(id) {
        var url = this.URI + '/start';
        return $http.get(url);
      },

      free_mem: function getUsers(id) {
        var url = this.URI + '/free_mem';
        return $http.get(url);
      }

    }
  }]);
})(angular);
