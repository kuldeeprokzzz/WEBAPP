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

      $scope.rolesTypes = sharedProperties.getRoles();
      $scope.roleId = model.profile.roleid;
  	};


  });