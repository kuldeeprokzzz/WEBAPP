inloopAppApp.service('invoiceService', ['sharedProperties','$http', function(sharedProperties, $http){
	


     this.getAllInvoicesByPayerIdAndStatus = function(payerId,status){

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




