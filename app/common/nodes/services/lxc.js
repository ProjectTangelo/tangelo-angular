(function userServicesModule(angular) {
  'use strict';

  var app = angular.module('tangeloLXCServices', []);
  app.service('lxcService', ['$http', function ($http) {
    return {
      URI: 'http://tangerine.tangelo.work:5000',
      get: function (id) {
        var url = this.URI;
        return $http.get(url);
      },


      get_running: function (id) {
        var url = this.URI + '/containers';
        return $http.get(url);
      },

      create: function (id) {
        var url = this.URI + '/create/'+id;
        return $http.get(url);
      },
      destroy: function (id) {
        var url = this.URI + '/destroy/' +id;
        return $http.get(url);
      },

      stop: function (id) {
        var url = this.URI + '/stop';
        return $http.get(url);
      },
      start: function (id) {
        var url = this.URI + '/start';
        return $http.get(url);
      },

      free_mem: function (id) {
        var url = this.URI + '/free_mem';
        return $http.get(url);
      }

    }
  }]);
})(angular);
