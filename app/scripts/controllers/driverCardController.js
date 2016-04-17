angular.module('inloopAppApp')
  .controller('driverCardController', function ($scope,$location, $stateParams,sharedProperties,completeModel,provisioningService) {

  	$scope.initialize = function(){
  		if(completeModel.getCompleteModel() != undefined){
  			var model = completeModel.getCompleteModel();
  		}

/*      if($stateParams != undefined){
        if($stateParams.jobType != undefined){

        }
      }*/
      $scope.model = model;
      $scope.name  = model.profile.roleIdtemp;
      $scope.rolesTypes = sharedProperties.getRoles();
      $scope.name = model.profile.first_name + model.profile.middle_name + model.profile.last_name;
      $scope.organisationName = model.profile.organization_name;
      $scope.licencePlateNumber = "";
      

  	};

    $scope.onlicencePlateKeyPress = function(){
      if($scope.licencePlateNumber != undefined){
        if($scope.licencePlateNumber.length == 3){
          provisioningService.getVehicleByProviderIdAndLicencePlateNumber
          ($scope.model.profile.organizationid,$scope.licencePlateNumber)
          .then(function(response){
            if(response.status == 200){
              if(response.data.length != 0){
                $scope.model.vehicle = response.data[0];
                completeModel.saveCompleteModel($scope.model);
                $location.path('driver/vehiclePairing');
              }else{
                $scope.errorMessage = "No vehicle found";
              }
            }else{
              $scope.errorMessage = "Something went wrong. Try again !";
            }
          });
        }
        if($scope.licencePlateNumber.length > 4){
          $scope.licencePlateNumber = "";
        }

      }
    }


  });