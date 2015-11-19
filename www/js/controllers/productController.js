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
      $scope.Comment("get");
		$ionicLoading.hide();
	}).error(function(){ 
		console.log("GET PRODUCT DETAIL : connexion error");
		$ionicLoading.hide();
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


   $scope.Comment = function(action){
		var paramObject = {
         action : action,
         info : {
            time : "201519112015",
            idProduct : parseInt($scope.product.idProduct),
            idUser : 1,
            content : "this a hello"
         }
      };
      console.log(paramObject);
      productService.comment(paramObject).success(function(data){
         $scope.product.comments = data.data;
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