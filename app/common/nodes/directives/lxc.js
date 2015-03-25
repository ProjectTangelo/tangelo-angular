(function lxcPanel(angular) {
  'use strict'

  var app = angular.module('lxcDirectives', ['tangeloLXCServices']);
  app.directive('lxcPanel', ['lxcService', '$location', function (lxcService, $location) {
    // Runs during compile
    return {
      templateUrl: 'app/tmpl/lxc-panel.html',
      restrict: 'E',
      replace: true,
      link: function ($scope, iElm, iAttrs, controller) {
     	$scope.getInfo = function () {
		lxcService.get().then(function(d) {
			$scope.info = d.data;
		});
	}

	
     	$scope.stop = function () {
		lxcService.stop().then(function(d) {
			$scope.info = d.data;
		});
	}


     	$scope.start = function () {
		lxcService.start().then(function(d) {
			$scope.info = d.data;
		});
	}


     	$scope.free_mem = function () {
		lxcService.free_mem().then(function(d) {
			$scope.info = d.data;
		});
	}

       }
    };
  }]);

})(angular);
