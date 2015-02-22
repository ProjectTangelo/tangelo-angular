(function userServicesModule (angular) {
	'use strict'

	var app = angular.module('tangeloUserServices', []);
	app.service('userService', [function(){
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
				return users; 
			},

			import : function importUsers (userlist) {
				console.log(userlist);
				if(userlist) {
					users = users.concat(userlist);
				}
			},

			add : function addUser (user) {
				if(user) {
					users.push(user);
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