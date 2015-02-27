(function userServicesModule (angular) {
	'use strict'

	var app = angular.module('tangeloUserServices', []);
	app.service('userService', ['$http', function($http){
		var toEdit = null;
		var users = [
			{
				'fname' : 'David',
				'lname' : 'Nuon',
				'email' : 'david@davidnuon.com',
				'username' : 'davidnuon',
				'type' : 'User'
			},
			{
				'fname' : 'Tyler',
				'lname' : 'Goodman',
				'username' : 'davidnuon',
				'email' : 'david@davidnuon.com',
				'type' : 'User'
			},
			{
				'fname' : 'Tifanny',
				'lname' : 'G',
				'username' : 'davidnuon',
				'email' : 'david@davidnuon.com',
				'type' : 'User'
			}
		];


		return  {
			get : function getUsers () {
				var url = '/users';
				return $http.get(url);
			},

			import : function importUsers (userlist) {
				console.log(userlist);
				if(userlist) {
					users = users.concat(userlist);
				}
			},

			add : function addUser (user) {
				var url = '/users';
				user.password_confirmed = user.password;
				url = url + '?' + jQuery.param(user);
				if(user) {
				 return $http.post(url)
				}
			},

			invokeEdit: function invokeEdit(user) {
				toEdit = user;
			},  

			getToEdit: function getInvokeEdit() {
				var out = toEdit;
				console.log(out);
				toEdit = null;
				return out;
			},
	
			update: function updateUser (_user) {
				var user = Object.create(_user);
				delete user.password;
				var url = '/users';
				
				console.log('god dammit typer', user);
				user.id = user._id
				url = url + '?' + jQuery.param(user);
				if(user) {
					return $http.put(url)
				}
			},

			getNodeById: function getNodeById (id) {
				if(id in users) {
					return users[id];
				}
			}
		}

	}])

})(angular);
