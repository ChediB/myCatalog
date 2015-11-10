(function(){
	'use strict';
var myapp=angular.module('myCatalogue');
myapp.controller('codebarscannersController',['$state','$ionicPopup','$scope','$ionicLoading','$cordovaBarcodeScanner',codebarscannersController ]);
function codebarscannersController($state,$ionicPopup,$scope,$ionicLoading,$cordovaBarcodeScanner)
  		{ 

  			 
  				$scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {

              
        $state.go('app.ProductDetail', {aId: imageData.text});
    
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };
  		
  		};

})();