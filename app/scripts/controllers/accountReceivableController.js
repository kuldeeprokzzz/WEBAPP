angular.module('inloopAppApp')
  .controller('accountReceivableController', function ($scope, $stateParams,sharedProperties,completeModel,contractTaskService,jobService,tripService,invoiceService) {

  	$scope.initialize = function(){
  		if(completeModel.getCompleteModel() != undefined){
  			$scope.model = completeModel.getCompleteModel();
  		}

/*      if($stateParams != undefined){
        if($stateParams.jobType != undefined){

        }
      }*/
    $scope.invoiceTypes = sharedProperties.getInvoiceType();

    if($stateParams.invoiceType != undefined){
      if($stateParams.invoiceType == 'ALL'){
        $scope.invoiceType = $scope.invoiceTypes.created.value+','+
                             $scope.invoiceTypes.submitted.value+','+
                             $scope.invoiceTypes.approved.value+','+
                             $scope.invoiceTypes.paid.value+','+
                             $scope.invoiceTypes.archieved.value;
      }else{
        $scope.invoiceType = $stateParams.invoiceType;
      }
  	}

    console.log($scope.invoiceType);
    $scope.payerId = $scope.model.profile.organizationid;

    

    invoiceService.getAllInvoicesByPayerIdAndStatus
    ($scope.payerId,$scope.invoiceType)
    .then(function(response){
      if(response.status == 200){
        if(response.data.length != 0){

          $scope.jobInvoiceTripList = [];

          angular.forEach(response.data, function(value, key) {
            var invoice = value;

            contractTaskService.getContractTaskById(invoice.contract_tasks[0]).then(function(response){
              if(response.status == 200){
                var contractTask = response.data;
                //var jobId = response.data.jobid;
                var jobId = 119 + key;
                var tripId = 1 + key;
                jobService.getJobDetailByJobId(jobId).then(function(response){
                if(response.status == 200){
                  var job = response.data;
                  //var tripId = response.data.trips[0];
                  tripService.getTripDetailsbyId(tripId).then(function(response){
                    if(response.status == 200){
                      var tripDetails = response.data;
                      tripService.getTripDataByTripId(tripId).then(function(response){
                        if(response.status == 200){
                          var tripData = response.data;
                          $scope.jobInvoiceTripList.push({job:job,trip:tripDetails,tripData:tripData,contractTask: contractTask,invoice:invoice});
                         console.log(JSON.stringify($scope.jobInvoiceTripList));
                        }
                      });
                    }
                  });
                }
              });    
            }
          });
          });
        }else{
          $scope.errorMessage = "Some thing went wrong. Try Again !";
        }
      }else{
        $scope.errorMessage = "Some thing went wrong. Try Again !";
      }
    });

      $scope.submitAllInvoiceList = [];

      angular.forEach($scope.jobInvoiceTripList, function(item, key) {
        if(item.invoice.status == $scope.invoiceTypes.created.value){
          $scope.submitAllInvoiceList.push(item);
        }
      });

      alert($scope.submitAllInvoiceList.length);
    }

    
    $scope.submitInvoice = function(item){
      $scope.invoiceTobeSubmitted = item;
      $("#centerModal").modal("toggle");
    }

    $scope.submitModalInvoice = function(){
      var item = $scope.invoiceTobeSubmitted;
      invoiceService.updateInvoiceState(item.invoice.id,$scope.invoiceTypes.submitted.value,
        $scope.model.profile.username,$scope.model.profile.organizationId)
        .then(function(response){
          if(response.status == 201){
            $("#centerModal").modal("toggle");
            location.path('/accountReceivable/invoice/'+'ALL'+'/Invoice Submitted Successfully !');
          }else{
            $scope.errorMessage = "Unable to Submit Invoice. Try Again !";
          }
      });
      
    }

    $scope.submitAllInvoice = function(){
      $("#submitAllModal").modal("toggle");
    }

    $scope.submitAllInvoiceModal = function(){

      var submittedCount = 0;

      angular.forEach($scope.submitAllInvoiceList, function(item, key) {
        invoiceService.updateInvoiceState(item.invoice.id,$scope.invoiceTypes.submitted.value,
          $scope.model.profile.username,$scope.model.profile.organizationId)
          .then(function(response){
            if(response.status == 201){
              submittedCount = submittedCount + 1;
              //$("#centerModal").modal("toggle");
              //location.path('/accountReceivable/invoice/'+'ALL'+'/Invoice Submitted Successfully !');
            }
            if(key == $scope.jobInvoiceTripList.length){
              $("#submitAllModal").modal("toggle");
              if(submittedCount == $scope.jobInvoiceTripList.length){
                location.path('/accountReceivable/invoice/'+'ALL'+'/All Invoices Submitted Successfully !');
              }else{
                location.path('/accountReceivable/invoice/'+'ALL'+'/One or More Invoice Submission Falied. Please Submit again !');
              }
            }
        });        
      });
    }

      


});