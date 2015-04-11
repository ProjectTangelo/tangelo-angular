(function lxcPanel(angular) {
  'use strict'

  var app = angular.module('lxcDirectives', ['tangeloLXCServices']);


  app.directive('lxcCreate', ['lxcService', '$location', function (lxcService, $location) {
    // Runs during compile
    return {
      templateUrl: 'app/common/nodes/templates/lxc-create.html',
      restrict: 'E',
      replace: true,
      link: function ($scope, iElm, iAttrs, controller) {
	$scope.cname = '';
        $scope.create= function () {
          lxcService.create($scope.cname).then(function (d) {
	    $scope.cname = '';
            $scope.info = d.data;
          });
        }

        $scope.destroy= function () {
          lxcService.destroy($scope.dname).then(function (d) {
	    $scope.dname = '';
            $scope.info = d.data;
          });
        }

      }
    };
  }]);



  app.directive('lxcPanel', ['lxcService', '$location', function (lxcService, $location) {
    // Runs during compile
    return {
      templateUrl: 'app/common/nodes/templates/lxc-panel.html',
      restrict: 'E',
      replace: true,
      link: function ($scope, iElm, iAttrs, controller) {
        $scope.getInfo = function () {
          lxcService.get().then(function (d) {
            $scope.info = d.data;
          });
        }


        $scope.stop = function () {
          lxcService.stop().then(function (d) {
            $scope.info = d.data;
          });
        }



        $scope.get_running = function () {
          lxcService.get_running().then(function (d) {
            $scope.info = d.data;
          });
        }


        $scope.start = function () {
          lxcService.start().then(function (d) {
            $scope.info = d.data;
          });
        }


        $scope.free_mem = function () {
          lxcService.free_mem().then(function (d) {
            $scope.info = d.data;
          });
        }

      }
    };
  }]);

})(angular);
