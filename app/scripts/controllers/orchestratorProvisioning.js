angular.module('inloopAppApp')
  .controller('orchestratorProvisioning', function ($scope,$timeout,$stateParams,$location,sharedProperties,completeModel,provisioningService) {

    $scope.initialize = function(){
      if(completeModel.getCompleteModel() != undefined){
        $scope.model = completeModel.getCompleteModel();
      }

    if($stateParams.viewType != undefined){
        $scope.viewType = $stateParams.viewType;
    }else{
      $scope.viewType = 'shippers';
    }

    $scope.orchestratorProvisioningTabType = sharedProperties.getOrchestratorProvisioningTabType();

    //alert(JSON.stringify($scope.orchestratorProvisioningTabType));
    if($scope.viewType == $scope.orchestratorProvisioningTabType.shippers){
      provisioningService.getAllShippers().then(function(response){
        if(response.status == 200){
          if(response.data.length != 0){
            $scope.provisionedObjects = response.data
          }else{
            $scope.errorMessage = "No Shipper Provisioned yet !";
          }
        }else{
          $scope.errorMessage = "Something went wrong. try again !";
        }

        //alert(JSON.stringify($scope.provisionedObjects));
      });
    }else{
          if($scope.viewType == $scope.orchestratorProvisioningTabType.providers){
            provisioningService.getAllProviders().then(function(response){
              if(response.status == 200){
                if(response.data.length != 0){
                  $scope.provisionedObjects = response.data
                }else{
                  $scope.errorMessage = "No Provider Provisioned yet !";
                }
              }else{
                $scope.errorMessage = "Something went wrong. try again !";
              }
            });      
          }else{
            $location.path('/orchestrator/provisioning/'+$scope.orchestratorProvisioningTabType.shippers+'/');
          }  
    }
  }

  $scope.openInvitationModal = function(){
    $("#modalBasic").modal("toggle");
    
  };

});