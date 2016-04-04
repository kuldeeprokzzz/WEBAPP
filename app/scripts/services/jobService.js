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

}])




