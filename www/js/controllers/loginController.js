(function(){
	'use strict';

angular.module('myCatalogue').controller('loginCtrl',function($scope,$state,loginService,$ionicLoading,$ionicPopup){
	$scope.user = {};
	$scope.dologin = function() {
		$ionicLoading.show({
	      content: 'connecting...',
	      showBackdrop: false
		});
        //console.log("LOGIN user: " + $scope.user.username + " - PW: " + $scope.user.password);
    	loginService.Connect({action:"connect",info:$scope.user}).success(function(data){
    		//console.log(data);
    		$ionicLoading.hide();
    		if(data.message=="success")
    		{
    			window.localStorage['user'] = JSON.stringify(data);
    			$state.go('app.AllProducts');
    			//var post = JSON.parse(window.localStorage['post'] || '{}');
    		}else
    		{
    			var alertPopup = $ionicPopup.alert({
	                title: 'Login failed!',
	                template: 'Please check your credentials!',
	                buttons: [
				       	{
				         	text: '<b>Ok</b>',
				         	type: 'button-assertive'
				     	}
				    ]
	            });
	            alertPopup;
    		}
    	}).error(function(data) {
	        var alertPopup = $ionicPopup.alert({
	            title: 'Login failed!',
	            template: 'Please check your connection!'
	        });
    	});
    };

    $scope.dologout = function() {
        //console.log("LOGIN user: " + $scope.user.username + " - PW: " + $scope.user.password);
    	loginService.Connect({action:"disconnect",info:$scope.user}).success(function(data){
    		
    	});
    }
});

})();