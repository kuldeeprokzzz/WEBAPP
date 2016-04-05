inloopAppApp.service('invoiceService', ['sharedProperties','$http', function(sharedProperties, $http){
	


     this.getAllInvoicesByPayerIdAndStatus = function(payerId,status){


      return $http({
     		method: 'GET',
     		//url: sharedProperties.getUrl()+'/invoices/?payerid='+payerId+'&status='+status,
               url: sharedProperties.getUrl()+'/invoices/',  // Delete later
     	}).success(function(response){
     		return response;
     	}).error(function(response){
     		return response;
     	});
     };

     this.updateInvoiceState = function(invoiceId,state,performedBy,organizationId){

          var currentTime = sharedProperties.getTodatUTCDateTime();
          var requestBody = {
                                "invoiceid": invoiceId,
                                "type": state,
                                "time": currentTime,
                                "performed_by": performedBy,
                                "organizationid": organizationId,
                                "remarks": "string"
                              };

          return $http.post(sharedProperties.getUrl()+'/invoices/'+invoiceId+'/states',requestBody,{})
        .then(function(response){
            return response;
        }, function(response){
            return response;
        });
     };
}])




