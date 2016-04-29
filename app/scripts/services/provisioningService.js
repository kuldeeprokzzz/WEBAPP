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

     this.getVehicleByProviderIdAndLicencePlateNumber = function(providerId,licenceNumber){

      return $http.get(sharedProperties.getUrl()+'/providers/'
        +providerId+'/vehicles?regNumber='+licenceNumber+'&wildcard=true')
        .then(function(response){
            return response;
        }, function(response){
            return response;
        });
     }

     this.getDeliveryCenterDetails = function(shipperId,deliveryCenterId){
    return $http({
            method: 'GET',
            url: sharedProperties.getUrl()+'/shippers/'+shipperId+'/deliveryCentres/'+deliveryCenterId,
            }).success(function(response){
                return response;
            }).error(function(response){
                return response;
            });

    }


}])




