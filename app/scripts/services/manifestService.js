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
                          "locations": {
                          "longitude": long,
                          "latitude": lat,
                          }
                        };

                        console.log(JSON.stringify(requestBody));
      return $http({
        method: 'POST',
        url: sharedProperties.getUrl()+'/manifest/'+manifestId+'/packages/'+packageId+'/states',
        data : requestBody,
      }).success(function(response){
        return response;
      }).error(function(response){
        return response;
      });
     };

}])