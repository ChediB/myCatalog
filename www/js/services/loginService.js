(function(){
	'use strict';

angular.module('myCatalogue').factory('loginService',function($http){
	
	$http.defaults.headers.post["Content-Type"] = 
    "application/x-www-form-urlencoded; charset=UTF-8;";

	var userFactory = {};
	
	//action : "connect"/"disconnect"
	userFactory.Connect = function(data){
		//console.log("User Service : "+JSON.stringify(data));
		var req = {
       		url: "http://www.nao-secretary.com/mycatalogue/login.php",
			data: "data="+JSON.stringify(data)
     	};
      	return $http.post(req.url,req.data);
	};

	userFactory.Disconnect = function(data){
		//console.log("User Service : "+JSON.stringify(data));
		var req = {
       		url: "http://www.nao-secretary.com/mycatalogue/login.php",
			data: "data="+JSON.stringify(data)
     	};
      	return $http.post(req.url,req.data);
	};

	

	return userFactory;
});


})();