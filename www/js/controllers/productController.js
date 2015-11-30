(function(){
	'use strict';
var myapp=angular.module('myCatalogue');
myapp.controller('productController',['$scope', '$state', 'productService',productController] );
myapp.controller('productDetailsController',['$scope', '$state','$ionicLoading', '$ionicPopup', 'productService','shoppingListService',productDetailsController] );
  


function productController($scope, $state, productService){
	$scope.products = [];
   $scope.shoppingList = [];
	$scope.wichproduct = $state.params.aId;
	
	productService.getAllProducts().success(function(data){
   		$scope.products=data;
   		console.log(data);
   	}).error(function(){ console.log("get all products error."); });
	
};

function productDetailsController($scope, $state, $ionicLoading, $ionicPopup, productService, shoppingListService){
	
   $scope.product = {};
   
   $scope.liked = false;
   $scope.disliked = false;
   $scope.shopCount = 0;
   $scope.shopped = false;
   $scope.newComment = {content : ""};
	
   $scope.show = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
	});

   productService.getProductDetail($state.params.aId).success(function(data){
		$scope.product=data;
      $scope.interact("likes","get");
      $scope.Comment("get");
      $scope.getItem();
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
      var user = JSON.parse(window.localStorage['user']);
      //console.log(user);
      var paramObject = {
         action : action,
         info : {
            time : new Date().toJSON(),
            idProduct : parseInt($scope.product.idProduct),
            idUser : parseInt(user.idUser),
            content : $scope.newComment.content,
            fullName : user.fullName
         }
      };
      //console.log(paramObject);
      productService.comment(paramObject).success(function(data){
         //console.log("get Comments response : "+data);
         console.log(data);
         $scope.product.comments = data.data;
		});
	};

   $scope.newComment = function(){
      var confirmPopup = $ionicPopup.confirm({
         title: 'New comment',
         scope: $scope,
         templateUrl: 'templates/COMMENTpop.html',
         buttons: [
            { text: 'Cancel' },
            {
              text: 'OK',
              type: 'button-assertive',
              onTap: function() {
                  $scope.Comment("add");
              }
            }
          ]
      });
   }

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

      shoppingListService.ShoppingList(paramObject).success(function(data){
         //console.log($scope.product.idProduct);
         //console.log(data);
         $scope.shoppingList = data.data;
         Bought($scope.shoppingList, $scope.product.idProduct);
      })
   }

   $scope.getItem = function(){
      var paramObject = {
         action : "getList",
         info : {
            Owner : 1,
            idProduct : parseInt($scope.product.idProduct),
            name : $scope.product.name,
            price : parseFloat($scope.product.price)
         }
      };
      //console.log(paramObject);
      shoppingListService.ShoppingList(paramObject).success(function(data){
         $scope.shoppingList = data.data;
         console.log(data);
         Bought($scope.shoppingList, $scope.product.idProduct);
      })
   }

  var Bought = function(shoppingList, productId){
      $scope.shopCount = 0;
      shoppingList.forEach(function(shop) {
         if(parseInt(shop.productId) == productId){
            $scope.shopCount++;
         }
      });
      if($scope.shopCount>0)$scope.shopped = true;
      else $scope.shopped = false;
  }


};

	



})();