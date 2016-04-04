angular.module('inloopAppApp')
  .controller('accountPayableController', function ($scope, $stateParams,sharedProperties,completeModel,contractTaskService,jobService,tripService) {

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
      }
  	}

    jobService.getAllJobsByShipperIdAndStatus(shipperId,status)
    .then(function(response){
      if(response.status == 200){

      }
    });

    }

    

      


});