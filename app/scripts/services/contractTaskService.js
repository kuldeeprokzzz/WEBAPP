inloopAppApp.service('contractTaskService', ['sharedProperties','$http', function(sharedProperties, $http){
	


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

}])


