
// Directive for a sidebars
app.directive('acmSidebar', [function(){
  // Recurse through a menu list and render a sidebar
  function render_menu(menu, root) {
    for(var idx in menu) {
      var item = menu[idx];
      var key = item.kind || 'item';

      // Collection of functions we're going to use to render each type of list item
      var render = {
        'header' : function header_template(item) {
          var label = item.title;
          return '<li class="header">' + label +'</li>';
        },

        'item' : function item_template (item) {
          var label = item.title;
          return '<li><a href="#">'+ label +'</a></li>';
        }
      }

      root.append(render[key](item));

      // If we have a property called 'children', recurse
      if('children' in item) {
          var sub_menu = $('<li class="treeview active"><ul class="treeview-menu menu-open"></ul></li>');
          var new_root = sub_menu.find('ul');
          root.append(sub_menu);
          render_menu(item.children, new_root);
      }
    }
  }

  return {
    restrict: 'E',
    templateUrl: 'app/tmpl/sidebar.html',
    replace: true,
    link: function($scope, iElm, iAttrs, controller) {
      var $menuRoot = jQuery(iElm).find('.sidebar-menu');
      var menu = [];
      var root = $menuRoot;
      render_menu(menu, root);
    },
  };
}]);
