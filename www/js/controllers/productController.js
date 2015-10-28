angular.module('myCatalogue').controller('productController', function($scope, $state, productService){
	
	$scope.products = [];
	$scope.wichproduct = $state.params.aId;
	
	productService.getAllProducts().success(function(data){
   		$scope.products=data;
   		console.log(data);
   	}).error(function(){ console.log("get all products error."); });
	
});