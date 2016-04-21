angular.module('inloopAppApp')
  .controller('deliveryAssociateDriverCheckInController', function ($scope,$timeout,$location,$interval,$stateParams,sharedProperties,completeModel,contractTaskService,jobService,tripService,manifestService) {

  	$scope.initialize = function(){
  		if(completeModel.getCompleteModel() != undefined){
  			var model = completeModel.getCompleteModel();
  		}

      $scope.model = model;
      $scope.cardType = sharedProperties.getContractTaskCardType();
      $scope.contractTaskType = sharedProperties.getContractTaskType();

      $scope.driver = $scope.model.driverToBeCheckedIn;

      $scope.odometer = $scope.model.contractTask.latest_state.odometer;

  	};

    $scope.addOdometerReading = function(){
      contractTaskService.updateContractTaskStateToCheckedIn
      ($scope.odometer,$scope.model.contractTask.id,$scope.model.profile.username)
      .then(function(response){
        if(response.status == 201){
          if($scope.model.contractTask.status == $scope.contractTaskType.returning.value){
            jobService.updateJobStateWithJobIdPerformedByAndType
            ($scope.model.contractTask.latest_state.jobid,$scope.model.profile.username
              ,sharedProperties.getJobsTypes().completed.value)
            .then(function(response){
              if(response.status == 201){
                tripService.updateTripStateToEndTrip($scope.model.contractTask.latest_state.tripid,
                  $scope.model.profile.username,$cope.odometer)
                .then(function(response){
                  if(response.status == 201){
                    $location.path('/deliveryAssociate/drivers/'+$scope.model.viewType);
                  }
                });
              }else{
                $scope.errorMessage = "Something went Again !";
              }
            });
          }else{
            $location.path('/deliveryAssociate/drivers/'+$scope.model.viewType);
          }
        }else{
          $scope.errorMessage = "Something went wrong. Try Again !";
        }
      });
    }

    $scope.backButton = function(){
      $location.path('/deliveryAssociate/drivers/'+$scope.model.viewType);
    }

  });