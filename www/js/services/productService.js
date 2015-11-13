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
	//type : "like"/"dislike"
	productFactory.interact = function(action, type, interaction){ 
		var req = {
       		method: 'POST',
       		url: "http://www.nao-secretary.com/mycatalogue/interaction.php",
       		data: {
       			"action":action,
       			"type":type,
       			"interaction":interaction
       		}
   		};
      	return $http(req);
	}

	//action : "add"/"remove"
	productFactory.shoppingList = function(action, product){
		var req = {
       		method: 'POST',
       		url: "http://www.nao-secretary.com/mycatalogue/shoppingList.php",
       		data: {
       			"action":action,
       			"type":type,
       			"interaction":interaction
       		}
   		};
		return $http(req);
	} 

	return productFactory;
});