angular.module('inloopAppApp')
  .controller('driverVehiclePairingController', function ($scope,$location, $stateParams,sharedProperties,completeModel,provisioningService) {

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


  });