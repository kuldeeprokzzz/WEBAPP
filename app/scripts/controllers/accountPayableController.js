angular.module('inloopAppApp')
  .controller('accountPayableController', function ($scope,$timeout,$stateParams,$location,sharedProperties,completeModel,contractTaskService,jobService,tripService,invoiceService) {

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
      $scope.approveAllInvoiceList = [];

    if($stateParams.invoiceType != undefined){
      if($stateParams.invoiceType == 'ALL'){
        $scope.invoiceType = $scope.invoiceTypes.submitted.value+','+
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
    $scope.payeeId = $scope.model.profile.organizationid;

    

    invoiceService.getAllInvoicesByPayeeIdAndStatus
    ($scope.payeeId,$scope.invoiceType)
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
                          tripService.getTripStatesByTripId(tripId).then(function(response){
                            if(response.status == 200){
                              var item = {job:job,trip:tripDetails,tripData:tripData,contractTask: contractTask,invoice:invoice,tripStates : response.data};
                              $scope.jobInvoiceTripList.push(item);
                              if(item.invoice.status == $scope.invoiceTypes.submitted.value){
                                $scope.approveAllInvoiceList.push(item);
                                $scope.createdCount = $scope.createdCount + 1;
                                $scope.createdTotalAmount = $scope.createdTotalAmount + item.invoice.total_amount;
                                $scope.createdTotalPackages = $scope.createdTotalPackages + item.job.number_of_packages;
                              }
                             //console.log(JSON.stringify($scope.jobInvoiceTripList));

                            }
                          });
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

console.log(JSON.stringify($scope.jobInvoiceTripList));

    }

    
    $scope.approveInvoice = function(item){
      $scope.invoiceTobeApproved = item;
      $("#centerModal").modal("toggle");
    }

    $scope.approveModalInvoice = function(){
      var item = $scope.invoiceTobeApproved;
      invoiceService.updateInvoiceState(item.invoice.id,$scope.invoiceTypes.approved.value,
        $scope.model.profile.username,$scope.model.profile.organizationId)
        .then(function(response){
          if(response.status == 201){
            $("#centerModal").modal("toggle");
            $location.path('/accountPayable/invoice/'+'ALL'+'/Invoice Approved Successfully !');
          }else{
            $scope.errorMessage = "Unable to Approve Invoice. Try Again !";
          }
      });
      
    }

    $scope.approveAllInvoice = function(){
      $("#approveAllModal").modal("toggle");
    }

    $scope.approveAllInvoiceModal = function(){

      var submitCount = 0;

      angular.forEach($scope.approveAllInvoiceList, function(item, key) {
        invoiceService.updateInvoiceState(item.invoice.id,$scope.invoiceTypes.approved.value,
          $scope.model.profile.username,$scope.model.profile.organizationId)
          .then(function(response){
            if(response.status == 201){
              submitCount = submitCount + 1;
              //$("#centerModal").modal("toggle");
              //location.path('/accountReceivable/invoice/'+'ALL'+'/Invoice Submitted Successfully !');
            }
            if(key + 1 == $scope.jobInvoiceTripList.length){
              $("#approveAllModal").modal("toggle");
              $timeout(function(){
              if(submitCount == $scope.jobInvoiceTripList.length){
                $location.path('/accountPayable/invoice/'+'ALL'+'/All Invoices Approved Successfully !');
              }else{
                $location.path('/accountPayable/invoice/'+'ALL'+'/One or More Invoice not  Approved. Please Try again !');
              }
              }, 1000);
            }
        });        
      });
    }

      


});