inloopAppApp.service('tripService', ['sharedProperties','$http', function(sharedProperties, $http){
	


     

     this.createNewTripForJob = function(vehicleId,driverId,contractTaskId,jobId,odometerDeviceId){
          
          var currentTime = sharedProperties.getTodatUTCDateTime();

          var requestBody = {
                              "vehicleid": vehicleId,
                              "driverid": driverId,
                              "contract_taskid": contractTaskId,
                              "jobid": jobId, 
                              "odometer_deviceid":odometerDeviceId, 
                              "status": sharedProperties.getTripTypes.created.value, 
                              "trip_date": currentTime,
                            };

          return $http.post(sharedProperties.getUrl()+'/trips',requestBody,{})
                  .then(function(response){
                      return response;
                  }, function(response){
                      return response;
                  });
     };

     this.getTripDetailsbyId = function(tripId){
          
      return $http({
        method: 'GET',
        url: sharedProperties.getUrl()+'/trips/'+tripId,
      }).success(function(response){
        return response;
      }).error(function(response){
        return response;
      });
     };

     this.getTripDataByTripId = function(tripId){

      return $http({
        method: 'GET',
        url: sharedProperties.getUrl()+'/trips/'+tripId+'/tripdata',
      }).success(function(response){
        return response;
      }).error(function(response){
        return response;
      });
     };

}])




