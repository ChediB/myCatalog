(function(){
	'use strict';
var myapp=angular.module('myCatalogue');
myapp.controller('productController',['$scope', '$state', 'productService',productController] );
myapp.controller('productDetailsController',['$scope', '$state','$ionicLoading', 'productService',productDetailsController] );
  


	function productController($scope, $state, productService){
	
	$scope.products = [];
	$scope.wichproduct = $state.params.aId;
	
	productService.getAllProducts().success(function(data){
   		$scope.products=data;
   		console.log(data);
   	}).error(function(){ console.log("get all products error."); });
	
};
	function productDetailsController($scope, $state,$ionicLoading, productService){
	
	 $scope.show = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });
	
	productService.getProductDetail($state.params.aId).success(function(data){
   		$scope.product=data;
   		 console.log( data);
   		   $ionicLoading.hide();
   	}).error(function(){ console.log("get product error."); });
	
};

	})();