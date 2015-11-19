(function(){
	'use strict';

angular.module('myCatalogue').factory('shoppingListService',function($http){
	$http.defaults.headers.post["Content-Type"] = 
    "application/x-www-form-urlencoded; charset=UTF-8;";

	var shoppingFactory = {};
	
	//action : "getList"/"addItem"/"removeItem"
	shoppingFactory.ShoppingList = function(data){
		console.log("Shopping List Service : "+JSON.stringify(data));
		var req = {
       		url: "http://www.nao-secretary.com/mycatalogue/ShoppingList.php",
			data: "data="+JSON.stringify(data)
     	};
      	return $http.post(req.url,req.data);
	};

	

	return shoppingFactory;
});


})();