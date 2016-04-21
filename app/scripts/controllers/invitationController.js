angular.module('inloopAppApp')
  .controller('invitationController', function ($scope,$location,$interval,$stateParams,sharedProperties,completeModel,contractTaskService) {

  	$scope.initialize = function(){
  		if(completeModel.getCompleteModel() != undefined){
  			var model = completeModel.getCompleteModel();
  		}
    }

    $scope.clickEdit = function(){

      

    };

  });