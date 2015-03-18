var app = angular.module('acmlan', ['ngRoute', 'tangeloAdmin']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'app/client-partials/home.html',
        controller: 'AdminHomeController'
      }).
      when('/profile', {
        templateUrl: 'app/client-partials/profile.html',
        controller: 'AdminHomeController'
      }).
      when('/scratch', {
        templateUrl: 'app/client-partials/scratch.html',
        controller: 'AdminHomeController'
      }).
      when('/lesson', {
        templateUrl: 'app/client-partials/lesson.html',
        controller: 'AdminHomeController'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);



$(function () {
  //Easy access to options
  var o = $.AdminLTE.options;

  //Activate the layout maker
  $.AdminLTE.layout.activate();

  //Enable sidebar tree view controls
  $.AdminLTE.tree('.sidebar');

  //Add slimscroll to navbar dropdown
  if (o.navbarMenuSlimscroll && typeof $.fn.slimscroll != 'undefined') {
    $(".navbar .menu").slimscroll({
      height: "200px",
      alwaysVisible: false,
      size: "3px"
    }).css("width", "100%");
  }


  //Activate Bootstrap tooltip
  if (o.enableBSToppltip) {
    $(o.BSTooltipSelector).tooltip();
  }

  if(o.enableFastclick && typeof FastClick != 'undefined') {
    FastClick.attach(document.body);
  }


});
