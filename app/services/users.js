(function userServicesModule (angular) {
	'use strict'

	var app = angular.module('tangeloUserServices', []);
	app.service('userService', [function(){
		var users = [
			{
				'fname' : 'David', 
				'lname' : 'Nuon', 
				'email' : 'david@davidnuon.com',
				'type' : 'User'
			},
			{
				'fname' : 'Tyler', 
				'lname' : 'Goodman', 
				'email' : 'david@davidnuon.com',
				'type' : 'User'
			},
			{
				'fname' : 'Tifanny', 
				'lname' : 'G', 
				'email' : 'david@davidnuon.com',
				'type' : 'User'
			}	
		];

	
		return  {
			get : function getNodes () {
				return users; 
			},

			add : function addNode (node) {
				if(node) {
					users.push(node);
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