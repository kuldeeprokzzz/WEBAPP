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
      $scope.vehicleName = model.vehicle.color+" "+model.vehicle.make + " " + model.vehicle.model;
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
            provisioningService.getDeliveryCenterDetails($scope.model.contractTask.shipperid,$scope.model.contractTask.delivery_centreid)
              .then(function(response){
                if(response.status == 200){
                  $scope.model.deliveryCentre = response.data;
                  contractTaskService.updateDriverToContractTask($scope.model.contractTask.id,$scope.model.profile.id,
                    $scope.model.profile.first_name+" "+$scope.model.profile.last_name,$scope.model.profile.image)
                  .then(function(response){
                    if(response.status == 200){
                      //$scope.model.contractTask = response.data;
                      //completeModel.saveCompleteModel($scope.model);
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