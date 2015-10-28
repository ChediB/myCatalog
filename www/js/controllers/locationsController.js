(function(){
	'use strict';
var myapp=angular.module('myCatalogue');
myapp.controller('locationsController',['$cordovaLaunchNavigator','$scope','$ionicLoading','locationsService',locationsController ]);

			function locationsController($cordovaLaunchNavigator,$scope,$ionicLoading,locationsService)
  		{ 
  			  
  var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
                 };
            
   $scope.show = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });
  				locationsService.getAllLocations().then(function (data){
	//console.log(data[0]);

     
			//navigator.geolocation.getCurrentPosition(success, error, options);
		
			var  myLatlng = new google.maps.LatLng(36.782235,10.161130);
        var mapOptions = {
          center: myLatlng,
          zoom: 09,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        	
       var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < data.length; i++) {  
    	console.log(data[i]);
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(data[i].longitude, data[i].latitude),
        map: map
      });
     
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(data[i].name);
          infowindow.open(map, marker);

        }
      })(marker, i));

      google.maps.event.addListener(marker, 'dblclick', (function(marker, i) {
        return function() {
         
    var destination = [data[i].longitude,data[i].latitude];
    var start = null;
    $cordovaLaunchNavigator.navigate(destination, start).then(function() {
      console.log("Navigator launched");
    }, function (err) {
      console.error(err);
    });
  
            
        }
      })(marker, i));
    }
        $scope.map = map;
           $ionicLoading.hide();
 
  				});
  				google.maps.event.addDomListener(window, 'load');
  		};
	 
	myapp.controller('locationsListController',['$cordovaLaunchNavigator','$scope','$ionicLoading','locationsService',locationsListController ]);
 function locationsListController($cordovaLaunchNavigator,$scope,$ionicLoading,locationsService)
      { 

        $scope.show = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });
     
        var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
                 };
    $scope.doRefresh = function() {
    locationsService.getAllLocations().then(function (data){
        $scope.locations=data;
     })
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  };
          locationsService.getAllLocations().then(function (data){
        $scope.locations=data;
        $ionicLoading.hide();
    
 $scope.goTo=function(x)
     {
           var destination = [x.longitude,x.latitude];
    var start = null;
    $cordovaLaunchNavigator.navigate(destination, start).then(function() {
      console.log("Navigator launched");
    }, function (err) {
      console.error(err);
    });
     };
   
           
         });
    };

  myapp.controller('locationsListDetailsController',['$location','$cordovaLaunchNavigator','$scope','$ionicLoading','$stateParams',locationsListDetailsController ]);
 function locationsListDetailsController($location,$cordovaLaunchNavigator,$scope,$ionicLoading,$stateParams)
 { console.log('test');
 
    var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
                 };
            
   $scope.show = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });
    
      var  myLatlng = new google.maps.LatLng($stateParams.longi,$stateParams.lat);
        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("mapp"),
            mapOptions);
          
       var infowindow = new google.maps.InfoWindow();

    var marker, i;

    
      marker = new google.maps.Marker({
        position: new google.maps.LatLng($stateParams.longi,$stateParams.lat),
        map: map
      });
    
        $scope.mapp = map;
           $ionicLoading.hide();
 
          google.maps.event.addDomListener(window, 'load');
    
     
 };
	})();
