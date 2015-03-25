(function demoServices (angular) {
  'use strict';

   var app = angular.module('demoServices', []);

   app.service('globalCounterService', [function globalCounterService() {
	  var value = 0;

	  return {
	    get: function get() {
	      return value;
	    },

	    set: function set(n) {
	      value = n;
	    },

	    inc: function inc() {
	      value++;
	    }
	  }
}]);

})(angular);