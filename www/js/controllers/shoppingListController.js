(function(){
	'use strict';

angular.module('myCatalogue').controller('shoppingListController',function($scope,shoppingListService,$ionicLoading){
	$scope.products = [];
	$scope.shouldShowDelete = false;
	$scope.price = 0;

	$scope.show = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
	});

	$scope.calculatePrices = function(){
		$scope.price = 0;
		$scope.products.forEach(function(entry){
			$scope.price += parseFloat(entry.productPrice);
		});
	};

	$scope.deleteItem = function(item){
		var paramObject = {
         	action : "removeItem",
         	info : {
            	Owner : item.userId,
            	idProduct : parseInt(item.productId),
            	name : item.productName,
            	price : parseFloat(item.productPrice)
         	}
      	};
      	//console.log(item);
      	
      	shoppingListService.ShoppingList({action:"removeItem",info:item}).success(function(data){
			if(data=="success")
			{
				var index = $scope.products.indexOf(item);
				console.log("delete shopping list item : "+data.productName);
				$scope.products.splice(index,1);
				$scope.calculatePrices();	
			}
		});
	};
	shoppingListService.ShoppingList({action:"getList",info:{Owner:1}}).success(function(data){
	   	$ionicLoading.hide();
	   	$scope.products=data.data;
	   	$scope.calculatePrices();
	   	//console.log(data);
	}).error(function(){ console.log("get all products error.");});

});

})();
