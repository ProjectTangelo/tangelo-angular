(function userServicesModule(angular) {
  'use strict';

  var app = angular.module('tangeloUserServices', []);
  app.service('userService', ['$http', function ($http) {
    // var fixtures = [{
    //   'fname': 'David',
    //   'lname': 'Nuon',
    //   'email': 'david@davidnuon.com',
    //   'username': 'davidnuon',
    //   'type': 'User'
    // }, {
    //   'fname': 'Tyler',
    //   'lname': 'Goodman',
    //   'username': 'davidnuon',
    //   'email': 'david@davidnuon.com',
    //   'type': 'User'
    // }, {
    //   'fname': 'Tifanny',
    //   'lname': 'G',
    //   'username': 'davidnuon',
    //   'email': 'david@davidnuon.com',
    //   'type': 'User'
    // }];


    return {
      URI: '/user',
      get: function getUsers(id) {
        var url = this.URI;
        if (id) {
          url += '/' + id;
        }
        return $http.get(url);
      },

      import: function importUsers(userlist) {
        console.log(userlist);
        if (userlist) {
          users = users.concat(userlist);
        }
      },

      add: function addUser(user) {
        console.log(user);
        return $http.post(this.URI, user);
      },

      update: function updateUser(user) {
        // TODO - be less fucking retarded (don't have __v)
        delete user.__v;
        return $http.put(this.URI + '/' + user._id, user);
      },

      getNodeById: function getNodeById(id) {
        if (id in users) {
          return users[id];
        }
      }
    }
  }]);
})(angular);