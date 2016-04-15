inloopAppApp.service('provisioningService', ['sharedProperties','$http', function(sharedProperties, $http){
	


     

    this.getAllShippers = function(){

      return $http.get(sharedProperties.getUrl()+'/shippers/')
        .then(function(response){
            return response;
        }, function(response){
            return response;
        });
     };

     this.getProfileById = function(){

      return $http.get(sharedProperties.getUrl()+'/shippers/')
        .then(function(response){
            return response;
        }, function(response){
            return response;
        });
     };


    
    this.getAllProviders = function(){

      return $http.get(sharedProperties.getUrl()+'/providers/')
        .then(function(response){
            return response;
        }, function(response){
            return response;
        });
     };


}])




