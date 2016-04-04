angular.module('inloopAppApp')
  .controller('loadManagerController', function ($scope, $stateParams,sharedProperties,completeModel,jobService) {

  	$scope.initialize = function(){
  		if(completeModel.getCompleteModel() != undefined){
  			var model = completeModel.getCompleteModel();
  		}

/*      if($stateParams != undefined){
        if($stateParams.jobType != undefined){

        }
      }*/

      $scope.jobsTypes = sharedProperties.getJobsTypes();
      $scope.jobType = $stateParams.jobType;
      
      var deliveryCenterId = model.profile.delivery_centreid;
      var shipperId = model.profile.organizationid;
      var status = $stateParams.jobType;

      jobService.getTodaysJobsByDeliveryCenterIdShipperIdAndStatus
      (deliveryCenterId,shipperId,status)
      .then(function(response){
        if(response.status == 200){
          if(response.data.length != 0){
            $scope.jobs = response.data;
          }else{
            $scope.errorMessage = "No Job Found";
          }
        }else{
          $scope.errorMessage = "Something went wrong. Try Again !";
        }
      });
  	};


  });