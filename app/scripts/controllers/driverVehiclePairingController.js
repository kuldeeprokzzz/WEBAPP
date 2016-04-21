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
          response.data = [{
    "id": 13,
    "providerid": 0,
    "provider_name": "Bangalore Public School",
    "vehicleid": 1,
    "vehicle_regNumber": "KA04RS8854",
    "vehicle_make": "TATA ACE",
    "driverid": 0,
    "driver_name": "Aarav Banerjee",
    "driver_image": "http://54.169.251.56/media/drivers/aarav.png",
    "delivery_centreid": 5,
    "delivery_centre_name": "Domino's Pizza",
    "status": "CREATED",
    "card_type": "CREATED",
    "latest_state": {
      "id": 0,
      "type": "CREATED",
      "time": "2016-03-30T08:20:00+0530",
      "location": {
        "longitude": 77.59369,
        "latitute": 12.97194
      },
      "odometer": 0,
      "performed_by": "+919912123456"
    },
    "shipper_name": "string"
  }];
          if(response.data.length != 0){
            $scope.model.contractTask = response.data[0];
            contractTaskService.updateDriverToContractTask(response.data[0].id,$scope.model.profile.id)
            .then(function(response){
              if(response.status == 200){
                
              }else{
                $scope.errorMessage = "Some thing went Wrong. Try again !";
              }
            });
            provisioningService.getDeliveryCenterDetails($scope.model.profile.organizationid,$scope.model.contractTask.delivery_centreid)
                .then(function(response){
                  if(response.status == 200){
                    $scope.model.deliveryCentre = response.data;
                    completeModel.saveCompleteModel($scope.model);
                    $location.path('/driver/onMyWay');
                  }
            });
          }else{
            $scope.errorMessage = "No Task for this vehicle today. Drive different vehicle.";
          }
        }
      });
    }
  });