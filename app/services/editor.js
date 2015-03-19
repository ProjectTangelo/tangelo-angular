(function demoServices (angular) {
  'use strict';

   var app = angular.module('editorServices', []);

   app.service('stratchService', [function globalCounterService() {
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