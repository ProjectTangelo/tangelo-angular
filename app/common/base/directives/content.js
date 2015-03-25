(function contentDirectives(angular) {
  'use strict';

  var app = angular.module('contentDirectives', []);

  app.directive('contentBox', [function () {
    // Runs during compile
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
    // Runs during compile
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

  app.directive('acmCounter', [function () {
    // Runs during compile
    return {
      restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
      replace: true,
      templateUrl: 'app/common/base/templates/number-block.html',
      scope: {},
      transclude: true,

      link: function ($scope, iElm, iAttrs, controller) {

        $scope.inc = Number(iAttrs.inc) || 0;
        $scope.counter = $scope.$parent.counter;
        $scope.name = iAttrs.name;

        $scope.$parent.$watch('counter', function (newVal, oldVal) {
          $scope.counter = $scope.counter + $scope.inc;
        });
      }
    };
  }]);

  // Directive for a sidebars
  app.directive('acmSidebar', [function () {
    // Recurse through a menu list and render a sidebar
    function render_menu(menu, root) {
      for (var idx in menu) {
        var item = menu[idx];
        var key = item.kind || 'item';

        // Collection of functions we're going to use to render each type of list item
        var render = {
          'header': function header_template(item) {
            var label = item.title;
            return '<li class="header">' + label + '</li>';
          },

          'item': function item_template(item) {
            var label = item.title;
            return '<li><a href="#">' + label + '</a></li>';
          }
        }

        root.append(render[key](item));

        // If we have a property called 'children', recurse
        if ('children' in item) {
          var sub_menu = $('<li class="treeview active"><ul class="treeview-menu menu-open"></ul></li>');
          var new_root = sub_menu.find('ul');
          root.append(sub_menu);
          render_menu(item.children, new_root);
        }
      }
    }

    return {
      restrict: 'E',
      templateUrl: 'app/common/base/templates/sidebar.html',
      replace: true,
      link: function ($scope, iElm, iAttrs, controller) {
        var $menuRoot = jQuery(iElm).find('.sidebar-menu');
        var menu = [];
        var root = $menuRoot;
        render_menu(menu, root);
      },
    };
  }]);

})(angular);
