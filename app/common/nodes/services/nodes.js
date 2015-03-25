(function nodeServiceModule (angular) {
	'use strict'

	var app = angular.module('tangeloNodeServices', []);
	app.service('nodeService', [function(){
		var nodes = [];

		return  {
			get : function getNodes () {
				return nodes; 
			},

			add : function addNode (node) {
				if(node) {
					nodes.push(node);
				}
			}, 

			getNodeById: function getNodeById (id) {
				if(id in nodes) {
					return nodes[id];
				}
			}
		}

	}])

})(angular);