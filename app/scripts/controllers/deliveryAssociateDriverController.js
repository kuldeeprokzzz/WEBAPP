angular.module('inloopAppApp')
  .controller('deliveryAssociateDriverController', function ($scope,$timeout,$location,$interval,$stateParams,sharedProperties,completeModel,contractTaskService,jobService,tripService,manifestService) {

  	$scope.initialize = function(){
  		if(completeModel.getCompleteModel() != undefined){
  			var model = completeModel.getCompleteModel();
  		}

      $scope.model = model;
      $scope.cardType = sharedProperties.getContractTaskCardType();
      $scope.contractTaskType = sharedProperties.getContractTaskType();
      $scope.searchString = '';
      if($stateParams.viewType != undefined){
          $scope.viewType = $stateParams.viewType;
      }else{
          $scope.viewType = 'all';
      }

      if($scope.viewType == 'all'){
        $scope.searchType = sharedProperties.getContractTaskType().created.value + ',' +
                            sharedProperties.getContractTaskType().dispatched.value + ',' +
                            sharedProperties.getContractTaskType().arrived.value + ',' +
                            sharedProperties.getContractTaskType().checkedIn.value + ',' +
                            sharedProperties.getContractTaskType().assignedJob.value + ',' +
                            sharedProperties.getContractTaskType().returning.value;
        $scope.menu = 'ALL Drivers';
      }
      if($scope.viewType == 'arrived'){
        $scope.searchType = sharedProperties.getContractTaskType().arrived.value;
        $scope.menu = 'Arrived';
      }
      if($scope.viewType == 'checkedIn'){
        $scope.searchType = sharedProperties.getContractTaskType().checkedIn.value;
        $scope.menu = 'Checked In';
      }
      if($scope.viewType == 'inTransit'){
        $scope.searchType = sharedProperties.getContractTaskType().dispatched.value + ',' +
                            sharedProperties.getContractTaskType().returning.value;
        $scope.menu = 'In Transit'
      }
      if($scope.viewType == 'assigned'){
        $scope.searchType = sharedProperties.getContractTaskType().assignedJob.value;
        $scope.menu = 'Assigned'
      }

      contractTaskService.getTodaysContractTaskByDeliveryCenterIdAndStatus
      ($scope.model.profile.delivery_centreid,$scope.searchType)
      .then(function(response){
        if(response.status == 200){
          var arrivedCount = 0;
          var direct = {};
          if(response.data.length != 0){
            var arrivedDrivers = [];
            angular.forEach(response.data, function(value, key) {
              if(value.status == sharedProperties.getContractTaskType().arrived.value){
                arrivedDrivers.push(value);
                if(sharedProperties.getContractTaskType().arrived.value == value.status){
                  arrivedCount = arrivedCount + 1;
                  direct = value;
                }
              }
            });
            if(arrivedCount != 0){
                if(arrivedCount == 1){
                  $scope.selectDriver(direct);
                }
            }
              $scope.drivers = response.data;
              $scope.responseData = response.data;
          }else{
            $scope.errorMessage = "No driver to show yet. Try after some time.";  
          }
        }else{
          $scope.errorMessage = "Something went wrong. Try again !";
        }
      });

  	};

    $scope.callArrivedDrivers = function(){
      contractTaskService.getTodaysContractTaskByDeliveryCenterIdAndStatus
        ($scope.profile.delivery_centreid,$scope.searchType)
        .then(function(response){
          if(response.status == 200){
            if(response.data.length != 0){
              
            }else{
              $scope.errorMessage = "No driver to show yet. Try after some time.";  
            }
          }else{
            $scope.errorMessage = "Something went wrong. Try again !";
          }
        });
    }

    $scope.selectDriver = function(driver){
      $scope.model.driverToBeCheckedIn = driver;
      $scope.model.viewType = $scope.viewType;
      completeModel.saveCompleteModel($scope.model);
      $location.path('/deliveryAssociate/checkin');
    }

    $scope.searchDrivers = function(){
      if($scope.searchString != undefined){
        var searchResult = [];
        angular.forEach($scope.responseData, function(value, key) {
          if(JSON.stringify(value).search($scope.searchString) != -1){
            searchResult.push(value);
          }
        });
        $scope.drivers = searchResult;
      }else{
        $scope.drivers = $scope.responseData;
      }
    }

    /*$scope.$on('$locationChangeStart', function(event, next, current){            
      if( $location.path() == '/deliveryAssociate/checkin' 
        || $location.path() == 'deliveryAssociate/drivers/all' || $location.path() == 'deliveryAssociate/drivers/arrived'
        || $location.path() == 'deliveryAssociate/drivers/checkedIn' || $location.path() == 'deliveryAssociate/drivers/inTransit'
        || $location.path() == 'deliveryAssociate/drivers/assigned' || $location.path() == '/'){
      }else{
        event.preventDefault();
      }            
    });*/

  });