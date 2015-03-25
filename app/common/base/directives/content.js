(function contentDirectives(angular) {
  'use strict';

  var app = angular.module('contentDirectives', []);

  app.directive('contentBox', [function () {
    return {
      scope: {},
      replace: true,
      templateUrl: 'app/common/base/templates/solid-box.html',
      restrict: 'E',
      transclude: true,
      link: function ($scope, iElm, iAttrs, controller) {
        $.AdminLTE.boxWidget.activateOnce(iElm);
        $scope.title = iAttrs.title;
      }
    };
  }]);

  app.directive('statusBlock', [function () {
    return {
      scope: {},
      restrict: 'E',
      templateUrl: 'app/common/base/templates/status-block.html',
      replace: true,
      link: function ($scope, iElm, iAttrs, controller) {
        $scope.name = iAttrs.name;
        $scope.number = iAttrs.number;
        $scope.percent = iAttrs.percent;
        $scope.description = iAttrs.description;
      }
    };
  }]);

  // Directive for a sidebars
  app.directive('sidebar', [function () {
    return {
      restrict: 'E',
      templateUrl: 'app/common/base/templates/sidebar.html',
      replace: true,
      link: function ($scope, iElm, iAttrs, controller) {
      },
    };
  }]);

})(angular);
