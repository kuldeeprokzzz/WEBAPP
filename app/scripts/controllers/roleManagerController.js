angular.module('inloopAppApp')
  .controller('roleManagerController', function ($scope, $stateParams,sharedProperties,completeModel,jobService) {

  	$scope.initialize = function(){
  		if(completeModel.getCompleteModel() != undefined){
  			var model = completeModel.getCompleteModel();
  		}

/*      if($stateParams != undefined){
        if($stateParams.jobType != undefined){

        }
      }*/

      $scope.roleId = model.profile.roleIdtemp;
      $scope.rolesTypes = sharedProperties.getRoles();
      

  	};


  });