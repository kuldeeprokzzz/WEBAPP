angular.module('inloopAppApp')
  .controller('invitationController', function ($scope,$location,$interval,$stateParams,sharedProperties,completeModel,contractTaskService) {

  	$scope.initialize = function(){
  		$scope.firstName = "Kuldeep";
  		$scope.middleName = "Singh";
  		$scope.lastName = "Malik";
  		$scope.nameEditClicked = false;
  		$scope.numberEdit = false;
      $scope.showOTP = false;
      $scope.showNumberEdit = true;
    }

    $scope.clickEdit = function(){
    	$scope.nameEditClicked = true;
    };

    $scope.editNumber = function(){
    	$scope.numberEdit = true;
      $scope.showNumberEdit = false;
    }

    $scope.clickVeriyyMobile = function(){
      $scope.showOTP = true;
      $scope.showNumberEdit = false;
    }

  });