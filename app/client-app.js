var app = angular.module('acmlan', ['ngRoute', 'tangeloAdmin']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'app/client-partials/home.html',
        controller: 'ClientHomeController'
      }).
      when('/profile', {
        templateUrl: 'app/client-partials/profile.html',
        controller: 'ClientHomeController'
      }).
      when('/scratch', {
        templateUrl: 'app/client-partials/scratch.html',
        controller: 'ClientHomeController'
      }).
      when('/lesson', {
        templateUrl: 'app/client-partials/lesson.html',
        controller: 'ClientHomeController'
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
