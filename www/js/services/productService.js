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
       		url: "http://www.nao-secretary.com/mycatalogue/getProduct.php",
       		data: {
       			idProduct : id
       		}
     	};
      	return $http(req);
	};

	return productFactory;
});