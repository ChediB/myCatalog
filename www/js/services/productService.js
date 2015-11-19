angular.module("myCatalogue").factory('productService', function($http){
	var productFactory = {};
	
	productFactory.getAllProducts = function(){
		var req = {
       		method: 'GET',
       		url: "http://www.nao-secretary.com/mycatalogue/getProducts.php",
     	};
      	return $http(req);
	};

	productFactory.getProductDetail = function(id){
   
		var req = {
       		method: 'GET',
       		url: "http://www.nao-secretary.com/mycatalogue/getProduct.php?idProduct="+id,
       		data: {}
     	};
      	return $http(req);
	};

	productFactory.getProductComments = function(id){
   
		var req = {
       		method: 'GET',
       		url: "http://www.nao-secretary.com/mycatalogue/getProductComments.php?idProduct="+id,
       		data: {}
     	};
      	return $http(req);
	};

	//action : "add"/"remove"
	productFactory.comment = function(action, comment){
		var req = {
       		method: 'POST',
       		url: "http://www.nao-secretary.com/mycatalogue/comment.php",
       		data: {
       			"action":action,
       			"comment":comment
       		}
     	};
      	return $http(req);
	}


	//action : "add"/"remove"
	//type : "likes"/"dislikes"
	productFactory.interact = function(data){ 
		var req = {
       		method: 'POST',
       		url: "http://www.nao-secretary.com/mycatalogue/interact.php",
       		data: "data="+JSON.stringify(data)
   		};
      console.log(req.data);
      	return $http.post(req.url, req.data);
	}


	return productFactory;
});