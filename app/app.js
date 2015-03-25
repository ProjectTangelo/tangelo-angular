var app = angular.module('acmlan', ['ngRoute', 'tangeloAdmin']);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'app/admin/views/home.html',
      controller: 'AdminHomeController'
    })
    .when('/users', {
      templateUrl: 'app/admin/views/users.html',
      controller: 'AdminUserController'
    })
    .when('/users/add', {
      templateUrl: 'app/admin/views/users-add.html',
      controller: 'AdminUserController'
    })
    .when('/users/edit/:_id', {
      templateUrl: 'app/admin/views/users-edit.html',
      controller: 'AdminUserController'
    })
    .when('/users/import', {
      templateUrl: 'app/admin/views/users-import.html',
      controller: 'AdminUserController'
    })
    .when('/servers', {
      templateUrl: 'app/admin/views/servers.html',
      controller: 'AdminHomeController'
    })
    .when('/lessons', {
      templateUrl: 'app/admin/views/lessons.html',
      controller: 'AdminLessonController'
    })
    .when('/lessons/add', {
      templateUrl: 'app/admin/views/lessons-add.html',
      controller: 'AdminLessonController'
    })
    .when('/lessons/edit/:_id', {
      templateUrl: 'app/admin/views/lessons-edit.html',
      controller: 'AdminLessonController'
    })
    .otherwise({
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

  //Activate sidebar push menu
  if (o.sidebarPushMenu) {
    $.AdminLTE.pushMenu(o.sidebarToggleSelector);
  }

  //Activate Bootstrap tooltip
  if (o.enableBSToppltip) {
    $(o.BSTooltipSelector).tooltip();
  }

  if (o.enableFastclick && typeof FastClick != 'undefined') {
    FastClick.attach(document.body);
  }

  /*
   * INITIALIZE BUTTON TOGGLE
   * ------------------------
   */
  $('.btn-group[data-toggle="btn-toggle"]').each(function () {
    var group = $(this);
    $(this).find(".btn").click(function (e) {
      group.find(".btn.active").removeClass("active");
      $(this).addClass("active");
      e.preventDefault();
    });

  });
});
