angular.module('inloopAppApp')
  .controller('accountPayableController', function ($scope, $stateParams,sharedProperties,completeModel,contractTaskService,jobService,tripService,invoiceService) {

  	$scope.initialize = function(){
  		if(completeModel.getCompleteModel() != undefined){
  			$scope.model = completeModel.getCompleteModel();
  		}

/*      if($stateParams != undefined){
        if($stateParams.jobType != undefined){

        }
      }*/



    if($stateParams.invoiceType != undefined){
      if($stateParams.invoiceType == 'ALL'){
        $scope.invoiceType = '';
      }else{
        $scope.invoiceType = $stateParams.invoiceType;
      }
  	}

    console.log($scope.invoiceType);
    $scope.payerId = $scope.model.profile.organizationid;

    $scope.invoiceTypes = sharedProperties.getInvoiceType();

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
                         // console.log(JSON.stringify($scope.jobInvoiceTripList));
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
            location.path('/loadManager/job/'+'ALL'+'/Invoice Submitted Successfully !');
          }else{
            $scope.errorMessage = "Unable to Submit Invoice. Try Again !";
          }
      });
      
    }

      


});