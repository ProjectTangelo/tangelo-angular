// should this be a service?
(function scratchService(angular) {
  'use strict';

  var app = angular.module('tangeloScratchServices', []);

  app.service('scratchService', [function scratchService() {
    var value = '';

    return {
      get: function get() {
        return value;
      },

      set: function set(n) {
        value = n;
      },
    }
  }]);

})(angular);
