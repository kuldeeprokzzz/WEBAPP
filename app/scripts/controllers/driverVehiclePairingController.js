angular.module('inloopAppApp')
  .controller('driverVehiclePairingController', function ($scope,$location, $stateParams,sharedProperties,completeModel,provisioningService,contractTaskService,provisioningService) {

  	$scope.initialize = function(){
  		if(completeModel.getCompleteModel() != undefined){
  			var model = completeModel.getCompleteModel();
  		}

/*      if($stateParams != undefined){
        if($stateParams.jobType != undefined){

        }
      }*/
      $scope.model = model;
      $scope.licencePlateNumber  = model.vehicle.regNumber;
      $scope.vehicleName = model.vehicle.make + " " + model.vehicle.model;
  	  $scope.vehicleImage = model.vehicle.vehicleImage;
    };

    $scope.driveDifferentVehicle = function(){
      $scope.model.vehicle = undefined;
      completeModel.saveCompleteModel($scope.model);
      $location.path('/driver/driverCard');
    }

    $scope.submitDriveThisVehicle = function(){
      contractTaskService.getTodayContractTaskByVehicleLicencePlate($scope.licencePlateNumber)
      .then(function(response){
        if(response.status == 200){
          if(response.data.length != 0){
            $scope.model.contractTask = response.data[0];
            provisioningService.getDeliveryCenterDetails($scope.model.profile.organizationid,$scope.model.contractTask.delivery_centreid)
              .then(function(response){
                if(response.status == 200){
                  $scope.model.deliveryCentre = response.data;
                  contractTaskService.updateDriverToContractTask($scope.model.contractTask.id,$scope.model.profile.id)
                  .then(function(response){
                    if(response.status == 200){
                      completeModel.saveCompleteModel($scope.model);
                      $location.path('/driver/onMyWay');              
                    }else{
                      $scope.errorMessage = "Some thing went wrong. Please try again.";
                    }
                  });
                }else{
                  $scope.errorMessage = "Some thing went wrong. Please try again.";
                }
            });
          }else{
            $scope.errorMessage = "Selected vehicle not assigned for delivery today. Please contact your Manager.";
          }
        }else{
          $scope.errorMessage = "Some thing went wrong. Please try again.";
        }
      });
    }
  });