(function(){
	'use strict';
var myapp=angular.module('myCatalogue');
myapp.controller('productController',['$scope', '$state', 'productService',productController] );
myapp.controller('productDetailsController',['$scope', '$state','$ionicLoading', 'productService','shoppingListService',productDetailsController] );
  


function productController($scope, $state, productService){
	$scope.products = [];
	$scope.wichproduct = $state.params.aId;
	
	productService.getAllProducts().success(function(data){
   		$scope.products=data;
   		console.log(data);
   	}).error(function(){ console.log("get all products error."); });
	
};

function productDetailsController($scope, $state,$ionicLoading, productService, shoppingListService){
	
   $scope.product = {};
   
   $scope.liked = false;
   $scope.disliked = false;
	
   $scope.show = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
	});

   productService.getProductDetail($state.params.aId).success(function(data){
		$scope.product=data;
      $scope.interact("likes","get");
		$ionicLoading.hide();
	}).error(function(){ 
		console.log("GET PRODUCT DETAIL : Switch to offline mode");
		$scope.product={
				"id":1,
				"name":"Product1",
				"price":21,
				"likes":[2,5,23,4],
				"dislikes":[1],
				"image":"img/ionic.png",
				"description":"Hi, this is a description of the product"
			};
		$ionicLoading.hide();
	});

	productService.getProductComments($state.params.aId).success(function(data){
		$scope.product.comments = data;
	}).error(function(){
		console.log("GET COMMENTS OF THE PRODUCT : Switch to offline mode");
		$scope.product.comments = [
			{
				"id":1,
				"owner":1,
				"image":"img/ionic.png",
				"timeStamp":20151113,
				"body":"this is a really good product"
			},
			{
				"id":2,
				"owner":3,
				"image":"img/ionic.png",
				"timeStamp":20151115,
				"body":"Yes ! I like it two"
			}
		];
	});

	$scope.interact = function(type, action){
		var paramObject = {
         action : action,
         type : type,
         info : {
            userId : 1,
            productId : parseInt($scope.product.idProduct)
         }
      };
      productService.interact(paramObject).success(function(data){
			console.log(data);
         $scope.product.likes = data.likes;
         $scope.product.dislikes = data.dislikes;
         $scope.checkInteraction(1);
		});
	};

   $scope.checkInteraction = function(idUser){
      $scope.liked = false
      $scope.product.likes.forEach(function(entry){
         if(entry.userId==idUser)$scope.liked=true;
      });

      $scope.disliked = false
      $scope.product.dislikes.forEach(function(entry){
         if(entry.userId==idUser)$scope.disliked=true;
      });
   }


   $scope.Comment = function(comment){
		productService.interact("add",comment,$scope.product.id).success(function(){
			$scope.product.comments = data;
		});
	};

   $scope.addItem = function(){
      var paramObject = {
         action : "addItem",
         info : {
            Owner : 1,
            idProduct : parseInt($scope.product.idProduct),
            name : $scope.product.name,
            price : parseFloat($scope.product.price)
         }
      };
      //console.log(paramObject);
      shoppingListService.ShoppingList(paramObject).success(function(data){
         console.log("add Item response : "+data);
      })
   }



};

	



})();