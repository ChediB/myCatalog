(function(){
	'use strict';

angular.module('myCatalogue').controller('shoppingListController',function($scope,$state,shoppingListService,$ionicLoading){
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
		//console.log("int : "+parseInt(item.shoppinglistId));
		$ionicLoading.show({
	      content: 'Loading...',
	      showBackdrop: false
		});
		var paramObject = {
         	action : "removeItem",
         	info : {
            	id : parseInt(item.shoppinglistId),
            	Owner : parseInt(item.userId)
         	}
      	};
      	//console.log(item);
      	
      	shoppingListService.ShoppingList(paramObject).success(function(data){
			//console.log(data);
			$ionicLoading.hide();
			if(data.message=="success")
			{
				$scope.products = data.data;
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
