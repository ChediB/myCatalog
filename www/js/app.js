// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('myCatalogue', ['ionic','ngCordova'])

.run(function($ionicPlatform,$rootScope,$state) {
  $ionicPlatform.ready(function() {
    if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {
                    $ionicPopup.confirm({
                        title: "Internet Disconnected",
                        content: "The internet is disconnected on your device."
                    })
                    .then(function(result) {
                        if(!result) {
                            ionic.Platform.exitApp();
                        }
                    });
                }
            }
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      if(window.localStorage['user']=="" && toState.name!="login"){ //Assuming the AuthService holds authentication logic
        // User isn’t authenticated
        //console.log();
        $state.go("login");
        event.preventDefault(); 
      }
  });
})
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $stateProvider

  .state('app', {
      url: '/app',
      templateUrl: 'templates/sideMenu.html',
      abstract: true
  })
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller : "loginCtrl"
  })
  .state('app.AllProducts', {
    url: '/AllProducts',
    views: {
        'mainContent': {
          templateUrl: 'templates/getAllProducts.html',
          controller: 'productController'
          
        }
      }
  })
  .state('app.ProductDetail', {
    url: '/AllProducts/:aId',
    views: {
        'mainContent': {
          templateUrl: 'templates/productDetail.html',
          controller: 'productDetailsController'
        }
      }
  })
  .state('app.tabsLocations', {
    url: '/tabsLocations',
    views: {
        'mainContent': {
          templateUrl: 'templates/tabsLocations.html',
          abstract: true
        }
      }
  })
  .state('app.tabsLocations.map', {
    url: '/tabsLocationsMap',
    views: {
        'map-tab': {
          templateUrl: 'templates/locations.html',
          controller: 'locationsController'
        }
      }
  })
  .state('app.tabsLocations.listLocations', {
    url: '/TabsLocationsList',
    views: {
        'list-tab': {
          templateUrl: 'templates/listLocations.html',
          controller: 'locationsListController',
          
        }
      }
  })
.state('app.tabsLocations.listLocationsdetails', {
    url: '/TabsLocationsListDetails?longi&lat',
    views: {
        'list-tab': {
          templateUrl: 'templates/locationDetails.html',
          controller: 'locationsListDetailsController',
           
        }
      }
  })
.state('app.CodeBarScanner', {
    url: '/CodeBarScanner',
    views: {
        'mainContent': {
          templateUrl: 'templates/codebarscanner.html',
          controller: 'codebarscannersController'
        }
      }
  })
.state('app.shoppingList', {
  url: '/ShoppingList',
  views: {
    'mainContent': {
      templateUrl: 'templates/shoppingList.html',
      controller: 'shoppingListController'
    }
  }
})
  $urlRouterProvider.otherwise('/login');
   
});