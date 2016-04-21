angular.module('inloopAppApp')
  .controller('invitationController', function ($scope,$location,$interval,$stateParams,sharedProperties,completeModel,contractTaskService) {

  	$scope.initialize = function(){
  		$scope.firstName = "Kuldeep";
  		$scope.middleName = "Singh";
  		$scope.lastName = "Malik";
  		$scope.nameEditClicked = false;
  		$scope.numberEdit = false;
    }

    $scope.clickEdit = function(){
    	$scope.nameEditClicked = true;
    };

    $scope.editNumber = function(){
    	$scope.numberEdit = true;
    }

  });