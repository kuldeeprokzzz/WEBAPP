inloopAppApp.service('jobService', ['sharedProperties','$http', function(sharedProperties, $http){
	


     this.getTodaysJobsByDeliveryCenterIdShipperIdAndStatus = function(deliveryCenterId,shipperId,status){
     	
          var today = sharedProperties.getTodayDate();

          today = 'today'; // remove
          deliveryCenterId = 5; // remove
          return $http({
     		method: 'GET',
     		url: sharedProperties.getUrl()+'/jobs?job_date='+today+'&delivery_centreid='+deliveryCenterId+'&shippered='+shipperId+'&status='+status,
     	}).success(function(response){
     		return response;
     	}).error(function(response){
     		return response;
     	});
     };

     this.updateJobStateWithJobIdPerformedByAndType = function(jobId,performedBy,type){
          
          var currentTime = sharedProperties.getTodatUTCDateTime();

          var requestBody = {
                              "type": type,
                              "time": currentTime,
                              "performed_by": performedBy,
                            };

          return $http.post(sharedProperties.getUrl()+'/jobs/'+jobId+'/states',requestBody,{})
                  .then(function(response){
                      return response;
                  }, function(response){
                      return response;
                  });
     };

     this.updateJobWithJobIdContractTaskIdAndTripId = function(jobId,contractTaskId,tripId){
          
          var requestBody = {
                              "contract_taskid": contractTaskId,
                              "tripid": tripId,
                            };

          return $http.put(sharedProperties.getUrl()+'/jobs/'+jobId+'/',requestBody,{})
                  .then(function(response){
                      return response;
                  }, function(response){
                      return response;
                  });
     };



}])




