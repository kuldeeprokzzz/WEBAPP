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

          response.data = [
  {
    "id": 2,
    "contractid": 12,
    "task_date": "2016-03-30",
    "shipperid": 1,
    "shipper_name": "Amazon Transport Services Ltd.",
    "providerid": 0,
    "provider_name": "Raheja Residency",
    "vehicleid": 1,
    "vehicle_regNumber": "KA19P8488",
    "vehicle_make": "TATA ACE",
    "driverid": 0,
    "driver_name": "Aarav Banerjee",
    "driver_image": "http://54.169.251.56/media/drivers/aarav.png",
    "delivery_centreid": 5,
    "delivery_centre_name": "Domino's Pizza",
    "card_type":"CREATED",
    "latest_state": {
      "id": 2,
      "time": "2016-04-19T01:32:31+0530",
      "location": {},
      "contract_taskid": 2,
      "performed_by": "+919912123456",
      "jobid": 123,
      "odometer":122345,
      "tripid": 2
    }
  },
  {
    "id": 0,
    "contractid": 12,
    "task_date": "2016-03-30",
    "shipperid": 1,
    "shipper_name": "Amazon Transport Services Ltd.",
    "providerid": 0,
    "provider_name": "Raheja Residency",
    "vehicleid": 1,
    "vehicle_regNumber": "KA02AB1924",
    "vehicle_make": "TATA ACE",
    "driverid": 0,
    "driver_name": "Ramlal Gupta",
    "driver_image": "http://54.169.251.56/media/drivers/ramlal.png",
    "delivery_centreid": 5,
    "delivery_centre_name": "Domino's Pizza",
    "status": "CHECKED_IN",
    "card_type":"ARRIVED_DISPATCHED",
    "latest_state": {
      "id": 1,
      "type": "CHECKED_IN",
      "time": "2016-03-30T08:20:00+0530",
      "location": {
        "longitude": 77.593691,
        "latitute": 12.971941
      },
      "odometer": 19012,
      "performed_by": "kvkumar"
    }
  },
  {
    "id": 1,
    "task_date": "2016-03-30",
    "contractid": 12,
    "shipperid": 1,
    "shipper_name": "Amazon Transport Services Ltd.",
    "providerid": 0,
    "provider_name": "Raheja Residency",
    "vehicleid": 1,
    "vehicle_regNumber": "KA04DS2328",
    "vehicle_make": "TATA ACE",
    "driverid": 0,
    "driver_name": "Harilal Pande",
    "driver_image": "http://54.169.251.56/media/drivers/harilal_pande.png",
    "delivery_centreid": 5,
    "delivery_centre_name": "Domino's Pizza",
    "status": "CHECKED_IN",
    "card_type":"ARRIVED_DISPATCHED",
    "latest_state": {
      "id": 4,
      "type": "CHECKED_IN",
      "time": "2016-03-30T08:20:00+0530",
      "location": {
        "longitude": 77.593691,
        "latitute": 12.971941
      },
      "odometer": 21355,
      "performed_by": "kvkumar"
    }
  },
  {
    "id": 4,
    "contractid": 12,
    "task_date": "2016-03-30",
    "providerid": 0,
    "provider_name": "Raheja Residency",
    "vehicleid": 1,
    "vehicle_regNumber": "KA03DS3231",
    "vehicle_make": "TATA ACE",
    "driverid": 0,
    "driver_name": "Murugan H",
    "driver_image": "http://54.169.251.56/media/drivers/murugan.png",
    "delivery_centreid": 5,
    "delivery_centre_name": "Domino's Pizza",
    "status": "DISPATCHED",
    "card_type":"ARRIVED_RETURNING",
    "latest_state": {
      "id": 0,
      "type": "DISPATCHED",
      "time": "2016-03-30T08:20:00+0530",
      "location": {
        "longitude": 77.59369,
        "latitute": 12.97194
      },
      "odometer": 13245,
      "performed_by": "+91955443566"
    },
    "shipper_name": "Amazon Transport Services Ltd."
  },
  {
    "id": 5,
    "contractid": 12,
    "task_date": "2016-03-30",
    "shipperid": 1,
    "shipper_name": "Amazon Transport Services Ltd.",
    "providerid": 0,
    "provider_name": "Raheja Residency",
    "vehicleid": 1,
    "vehicle_regNumber": "KA03HH5432",
    "delivery_centreid": 5,
    "delivery_centre_name": "Domino's Pizza",
    "vehicle_make": "MARUTI OMNI",
    "driverid": 0,
    "driver_name": "Kumar Prasad",
    "driver_image": "http://54.169.251.56/media/drivers/kumar_prasad.png",
    "status": "DISPATCHED",
    "card_type":"CHECKED_IN",
    "latest_state": {
      "id": 0,
      "type": "DISPATCHED",
      "time": "2016-03-30T08:20:00+0530",
      "location": {
        "longitude": 77.59369,
        "latitute": 12.97194
      },
      "odometer": 17334,
      "performed_by": "+91955479986"
    }
  },
  {
    "id": 6,
    "task_date": "2016-03-30",
    "contractid": 12,
    "shipperid": 1,
    "shipper_name": "Amazon Transport Services Ltd.",
    "providerid": 0,
    "provider_name": "Raheja Residency",
    "vehicleid": 1,
    "vehicle_regNumber": "KA04TD4588",
    "vehicle_make": "TATA ACE",
    "driverid": 0,
    "driver_name": "Deviprasad S",
    "driver_image": "http://54.169.251.56/media/drivers/deviprasad_h.png",
    "delivery_centreid": 5,
    "delivery_centre_name": "Domino's Pizza",
    "status": "ASSIGNED_JOB",
    "card_type":"ASSIGNED_JOB",
    "latest_state": {
      "id": 2,
      "type": "ASSIGNED_JOB",
      "time": "2016-03-30T08:20:00+0530",
      "location": {
        "longitude": 77.593691,
        "latitute": 12.971941
      },
      "odometer": 21356,
      "performed_by": "tngowda",
      "jobid": 88390,
    }
  },
  {
    "id": 7,
    "task_date": "2016-03-30",
    "contractid": 12,
    "shipperid": 1,
    "shipper_name": "Amazon Transport Services Ltd.",
    "providerid": 0,
    "provider_name": "Raheja Residency",
    "vehicleid": 1,
    "vehicle_regNumber": "KA04RS8854",
    "vehicle_make": "TATA ACE",
    "driverid": 0,
    "driver_name": "Girijaprasad Manglam",
    "driver_image": "http://54.169.251.56/media/drivers/girijaprasad.png",
    "delivery_centreid": 5,
    "delivery_centre_name": "Domino's Pizza",
    "status": "RETURNING",
    "card_type":"RETURNING",
    "latest_state": {
      "id": 2,
      "type": "RETURNING",
      "time": "26/02/2016 08:16:00",
      "location": {
        "longitude": 77.593691,
        "latitute": 12.971941
      },
      "odometer": 34239,
      "performed_by": "tngowda",
      "jobid": 12234455,
    }
  }
];


          if(response.data.length != 0){
            var arrivedDrivers = [];
            angular.forEach(response.data, function(value, key) {
              if(value.status == sharedProperties.getContractTaskType().arrived.value){
                arrivedDrivers.push(value);
              }
            });
            if(arrivedDrivers.length != 0){
                if(arrivedDrivers.length == 1){
                  $scope.selectDriver = arrivedDrivers[0];
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

    $scope.$on('$locationChangeStart', function(event, next, current){            
      if($location.path() == $scope.model.lastPath || $location.path() == '/deliveryAssociate/checkin' 
        || $location.path() == 'deliveryAssociate/drivers/all' || $location.path() == 'deliveryAssociate/drivers/arrived'
        || $location.path() == 'deliveryAssociate/drivers/checkedIn' || $location.path() == 'deliveryAssociate/drivers/inTransit'
        || $location.path() == 'deliveryAssociate/drivers/assigned' || $location.path() == '/'){
      }else{
        event.preventDefault();
      }            
    });

  });