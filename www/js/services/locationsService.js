(function(){
	'use strict';
angular.module("myCatalogue").factory('locationsService',['$http','$q',locationsService]);

		function locationsService($http,$q)

		{ 
			var currentLocationId;
				function getAllLocations() 
				{
					var deferred =$q.defer();

					$http.get("http://nao-secretary.com/mycatalogue/getOutlets.php")
					     .success(function(data){
					     	deferred.resolve(data);
					     })
					     .error(function()
					     {
					     		console.log("Http error request locationsService")
					     		deferred.reject();

					     });
					   return  deferred.promise;
				}

				return {
					
						getAllLocations: getAllLocations
						};
		};

 

})();