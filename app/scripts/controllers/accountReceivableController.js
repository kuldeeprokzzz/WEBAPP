angular.module('inloopAppApp')
  .controller('accountReceivableController', function ($scope,$timeout,$stateParams,$location,sharedProperties,completeModel,contractTaskService,jobService,tripService,invoiceService) {

  	$scope.initialize = function(){
  		if(completeModel.getCompleteModel() != undefined){
  			$scope.model = completeModel.getCompleteModel();
  		}

/*      if($stateParams != undefined){
        if($stateParams.jobType != undefined){

        }
      }*/
    $scope.invoiceTypes = sharedProperties.getInvoiceType();
      $scope.createdCount = 0;
      $scope.createdTotalAmount = 0;
      $scope.createdTotalPackages = 0;
      $scope.submitAllInvoiceList = [];

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

    if($stateParams.message != undefined){
      $scope.errorMessage = $stateParams.message;
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
                          var item = {job:job,trip:tripDetails,tripData:tripData,contractTask: contractTask,invoice:invoice};
                          $scope.jobInvoiceTripList.push(item);
                          if(item.invoice.status != $scope.invoiceTypes.created.value){
                            $scope.submitAllInvoiceList.push(item);
                            $scope.createdCount = $scope.createdCount + 1;
                            $scope.createdTotalAmount = $scope.createdTotalAmount + item.invoice.total_amount;
                            $scope.createdTotalPackages = $scope.createdTotalPackages + item.job.number_of_packages;
                          }
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
          $scope.errorMessage = "No Jobs Found.!";
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
            $location.path('/accountReceivable/invoice/'+'ALL'+'/Invoice Submitted Successfully !');
          }else{
            $scope.errorMessage = "Unable to Submit Invoice. Try Again !";
          }
      });
      
    }

    $scope.submitAllInvoice = function(){
      $("#submitAllModal").modal("toggle");
    }

    $scope.submitAllInvoiceModal = function(){

      var submitCount = 0;

      angular.forEach($scope.submitAllInvoiceList, function(item, key) {
        invoiceService.updateInvoiceState(item.invoice.id,$scope.invoiceTypes.submitted.value,
          $scope.model.profile.username,$scope.model.profile.organizationId)
          .then(function(response){
            if(response.status == 201){
              submitCount = submitCount + 1;
              //$("#centerModal").modal("toggle");
              //location.path('/accountReceivable/invoice/'+'ALL'+'/Invoice Submitted Successfully !');
            }
            if(key + 1 == $scope.jobInvoiceTripList.length){
              $("#submitAllModal").modal("toggle");
              $timeout(function(){
              if(submitCount == $scope.jobInvoiceTripList.length){
                $location.path('/accountReceivable/invoice/'+'ALL'+'/All Invoices Submitted Successfully !');
              }else{
                $location.path('/accountReceivable/invoice/'+'ALL'+'/One or More Invoice Submission Falied. Please Submit again !');
              }
              }, 1000);
            }
        });        
      });
    }

      


});