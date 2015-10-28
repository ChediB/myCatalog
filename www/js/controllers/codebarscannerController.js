(function(){
	'use strict';
var myapp=angular.module('myCatalogue');
myapp.controller('codebarscannersController',['$ionicPopup','$scope','$ionicLoading','$cordovaBarcodeScanner',codebarscannersController ]);
function codebarscannersController($ionicPopup,$scope,$ionicLoading,$cordovaBarcodeScanner)
  		{ 

  			 
  				$scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {

             var confirmPopup = $ionicPopup.confirm({
     title: 'Scan Result',
     template:'CodeBar Type: '+imageData.format+'<br>CodeBar Value: '+imageData.text+'<br><br> Do you want to Download it ?'
   });
   confirmPopup.then(function(res) {
     if(res) {
       console.log('Download');
     } else {
       console.log('Cancel');
     }
   });
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };
  		
  		};

})();