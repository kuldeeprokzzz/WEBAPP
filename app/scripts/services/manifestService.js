inloopAppApp.service('manifestService', ['sharedProperties','$http', function(sharedProperties, $http){

     this.getManifestPackagesbyManifestId = function(manifestId){
          
      return $http({
        method: 'GET',
        url: sharedProperties.getUrl()+'/manifests/'+manifestId+'/packages',
      }).success(function(response){
        return response;
      }).error(function(response){
        return response;
      });
     };

     this.updateManifestPackageState = function(manifestId,packageId,status,lat,long){
          
      var requestBody = {
                          "type": status,
                          "time": sharedProperties.getTodatUTCDateTime(),
                          "location": {
                          "longitude": long,
                          "latitude": lat,
                          },
                        };
      return $http({
        method: 'POST',
        url: sharedProperties.getUrl()+'/manifests/'+manifestId+'/packages/'+packageId+'/states',
        data : requestBody,
      }).success(function(response){
        return response;
      }).error(function(response){
        return response;
      });
     };

}])