angular.module('AngularScaffold.Services').factory('HomeService', ['$http',
	function($http){
		$http.defaults.withCredentials = true;
		var baseUrl = 'http://localhost:8000/';
		return {
				GetUsers: function(){
					return $http.get(baseUrl + "v1/trabajos");
				},
				PostUser: function(payload){
					return $http.post(baseUrl + "v1/trabajo", payload);
				}
	    };
}]);
