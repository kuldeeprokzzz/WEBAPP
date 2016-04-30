inloopAppApp.service('contractTaskService', ['sharedProperties','$http', function(sharedProperties, $http){
	
    this.getTodayContractTaskByVehicleLicencePlate = function(vehicleRegNumber){
    return $http({
            method: 'GET',
            url: sharedProperties.getUrl()+'/contract_tasks/?vehicle_regNumber='+vehicleRegNumber+'&task_date=today',
            // +sharedProperties.getTodayDate()
            // Replace "today" in date parameter with sharedProperties.getTodayDate() on production
            }).success(function(response){
                return response;
            }).error(function(response){
                return response;
            });

    }

    this.updateDriverToContractTask = function(contractTaskId,driverId,driverName,driverImage){
    return $http({
            method: 'PUT',
            url: sharedProperties.getUrl()+'/contract_tasks/'+contractTaskId,
            data : {
              driverid : driverId,
              driver_name : driverName,
              driver_image : driverImage
            },
            }).success(function(response){
                return response;
            }).error(function(response){
                return response;
            });
    }

    this.updataContractStateToDispatchedWithoutOdometer = function(contractTaskId,username,lat,long){
    
    var requestBody = {
                  "type": sharedProperties.getContractTaskType().dispatched.value,
                  "time": sharedProperties.getTodatUTCDateTime(),
                  "performed_by": username,
                  "location": {
                    "longitude":lat,
                    "latitude": long
                  },
                };



    return $http({
            method: 'POST',
            url: sharedProperties.getUrl()+'/contract_tasks/'+contractTaskId+'/states/',
            headers: { token : sharedProperties.getAuthToken()},
            data: requestBody,
            }).success(function(response){
                return response;
            }).error(function(response){
                return response;
            });
    }


    this.updataContractStateToDispatched = function(contractTaskId,username){
    
    var requestBody = {
                  "type": sharedProperties.getContractTaskType().dispatched.type,
                  "time": sharedProperties.getTodatUTCDateTime(),
                  "location": {
                    "longitude":77.59369,
                    "latitude": 12.97194
                  }, 
                  "odometer": undefined,
                  "performed_by": username,
                };



    return $http({
            method: 'POST',
            url: sharedProperties.getUrl()+'/contract_tasks/'+contractTaskId+'/states/',
            headers: { token : sharedProperties.getAuthToken()},
            data: requestBody,
            }).success(function(response){
                return response;
            }).error(function(response){
                return response;
            });
    }


     this.getTodaysContractTaskByDeliveryCenterIdAndStatus = function(deliveryCenterId,status){
     	
          var today = sharedProperties.getTodayDate();

          today = 'today'; // remove
          deliveryCenterId = 5; // remove
          return $http({
     		method: 'GET',
     		url: sharedProperties.getUrl()+'/contract_tasks/?status='+status+'&delivery_centreid='+deliveryCenterId+'&task_date='+today,
     	}).success(function(response){
     		return response;
     	}).error(function(response){
     		return response;
     	});
     };


     this.updateContractTaskStateToAssignedJob = function(lat,lon,odometer,contractTaskId,performedBy,jobId,tripId){
          
          var currentTime = sharedProperties.getTodatUTCDateTime();
          var requestBody = {
                              "type": sharedProperties.getContractTaskType().assignedJob.value,
                              "time": currentTime,
                              "location": {
                                             "longitude": lon,
                                             "latitute": lat,
                                          },
                              "odometer": odometer,
                              "contract_taskid": contractTaskId,
                              "performed_by": performedBy,
                              "jobid": jobId,
                              "tripid": tripId,
                             };

          return $http.post(sharedProperties.getUrl()+'/contract_tasks/'+contractTaskId+'/states',requestBody,{})
        .then(function(response){
            return response;
        }, function(response){
            return response;
        });
     };


     this.getContractTaskById = function(contractTaskId){
      
      return $http({
        method: 'GET',
        url: sharedProperties.getUrl()+'/contract_tasks/'+contractTaskId,
      }).success(function(response){
        return response;
      }).error(function(response){
        return response;
      });
     };


    this.updataContractStateToReturning = function(contractTaskId,username,jobId,tripId){
        
        var requestBody = {
                              'type': sharedProperties.getContractTaskType().returning.type, 
                              'time': sharedProperties.getTodatUTCDateTime(),
                              'location': {
                                  'longitude': undefined,
                                  'latitude': undefined,
                              },
                              'odometer': undefined,
                              'performed_by': username,
                              'jobid':jobId,
                              'tripid':tripId,
                          };

        return $http({
                method: 'POST',
                url: sharedProperties.getUrl()+'/contract_tasks/'+contractTaskId+'/states/',
                headers: { token : sharedProperties.getAuthToken()},
                data: requestBody,
                }).success(function(response){
                    return response;
                }).error(function(response){
                    return response;
                });
        }

        this.updateContractTaskStateToCheckedIn = function(odometer,contractTaskId,performedBy){
 


          var currentTime = sharedProperties.getTodatUTCDateTime();
          var requestBody = {
                              "type": sharedProperties.getContractTaskType().checkedIn.value,
                              "time": currentTime,
                              "location": {
                                             "longitude": undefined,
                                             "latitute": undefined
                                          },  // location to be determined from Dataglen platform
                              "odometer": parseFloat(odometer),
                              "performed_by": performedBy
                             };
                             console.log(JSON.stringify(requestBody));
        return $http.post(sharedProperties.getUrl()+'/contract_tasks/'+contractTaskId+'/states',requestBody,{})
        .then(function(response){
            return response;
        }, function(response){
            return response;
        });
     };

     this.updateContractTaskStateToCompleted = function(lat,lon,odometer,contractTaskId,performedBy,jobId,tripId){
          
          var currentTime = sharedProperties.getTodatUTCDateTime();
          var requestBody = {
                              "type": sharedProperties.getContractTaskType().completed.value,
                              "time": currentTime,
                              "location": {
                                             "longitude": lon,
                                             "latitute": lat,
                                          },
                              "odometer": odometer,
                              "contract_taskid": contractTaskId,
                              "performed_by": performedBy,
                              "jobid": jobId,
                              "tripid": tripId,
                             };

          return $http.post(sharedProperties.getUrl()+'/contract_tasks/'+contractTaskId+'/states',requestBody,{})
        .then(function(response){
            return response;
        }, function(response){
            return response;
        });
     };

}])


