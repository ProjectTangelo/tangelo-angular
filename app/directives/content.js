(function contentDirectives (angular) {
  'use strict';

  var app = angular.module('contentDirectives', []);

  app.directive('contentBox',[function(){
  // Runs during compile
  return {
    scope: {},
    replace: true,
    templateUrl: 'tangelo-angular/app/tmpl/solid-box.html',
    restrict: 'E',
    transclude: true,
    link: function($scope, iElm, iAttrs, controller) {
        $.AdminLTE.boxWidget.activateOnce(iElm);
        $scope.title = iAttrs.title;
    }
  };
  }]);

  app.directive('statusBlock', [function(){
  // Runs during compile
  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'tangelo-angular/app/tmpl/status-block.html',
    replace: true,
    link: function($scope, iElm, iAttrs, controller) {
      $scope.name =  iAttrs.name;
      $scope.number =  iAttrs.number;
      $scope.percent =  iAttrs.percent;
      $scope.description =  iAttrs.description;
    }
  };
  }]);

  app.directive('acmCounter', [function(){
  // Runs during compile
  return {
    restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
    replace: true,
    templateUrl: 'tangelo-angular/app/tmpl/number-block.html',
    scope: {},
    transclude: true,

    link: function($scope, iElm, iAttrs, controller) {

        $scope.inc = Number(iAttrs.inc) || 0;
        $scope.counter = $scope.$parent.counter;
        $scope.name = iAttrs.name;

        $scope.$parent.$watch('counter',function(newVal, oldVal){
            $scope.counter = $scope.counter + $scope.inc;
        });
    }
  };
  }]);




})(angular);
