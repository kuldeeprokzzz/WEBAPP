angular.module('inloopAppApp')
  .controller('driverJobController', function ($scope,$timeout,$location,$interval,$stateParams,sharedProperties,completeModel,contractTaskService,jobService,tripService,manifestService) {

  	$scope.initialize = function(){
  		if(completeModel.getCompleteModel() != undefined){
  			var model = completeModel.getCompleteModel();
  		}

      model.contractTask = {
'id': 2, 'contractid': 12,
'task_date': '2016-03-30',
'shipperid': 1, 'shipper_name':
'Amazon Transposrt Services.',
'providerid': 0, 'provider_name':
'GTrans Logistics Pvt. Ltd.',
'vehicleid': 1, 'vehicle_regNumber':
'KA19P8488', 'vehicle_make': 'TATA ACE', 'driverid': 0, 'driver_name':
'Aarav Banerjee', 'driver_image':
'http://54.169.251.56/media/drivers/aarav.png',
'delivery_centreid': 5, 'delivery_centre_name':
'Jakkur Delivery Centre', 'status': 'ASSIGNED_JOB',
'card_type': 'ASSIGNED_JOB',
'latest_state': {'id': 2, 'type': 'CHECKED_IN',
'time': '2016-03-28T07:54:57+0530','location': {
'longitude': 77.593691, 'latitude': 12.971941},
'odometer': 34239,'contract_taskid': 2,'performed_by':
'kvkumar', 'jobid':123,'tripid':2}};

      $scope.model = model;
      $scope.deliveryCenter = model.deliveryCentre;
      $scope.contractTaskType = sharedProperties.getContractTaskType();      
      $scope.jobId = model.contractTask.latest_state.jobid;
      $scope.tripId = model.contractTask.latest_state.tripid;
      $scope.packagesType = sharedProperties.getPackageType();

      if($stateParams.jobType != undefined){
          $scope.jobType = $stateParams.jobType;
      }else{
          $scope.jobType = 'toDeliver';
      }

      jobService.getJobDetailByJobId($scope.jobId)
      .then(function(response){
        if(response.status == 200){
            $scope.jobName = response.data.name;
            //tripService.getTripDetailsbyId($scope.tripId)
            //.then(function(response){
              response.data = {
    'id': 1,
    'vehicleid': 1,
    'driverid': 1,
    'contract_taskid': 2,
    'jobid': 119,
    'odometer_deviceid': 1,
    'manifestid': 1
  };
              if(response.status == 200){
                $scope.newCount = 0;
                $scope.manifestId = response.data.manifestid;
                manifestService.getManifestPackagesbyManifestId(response.data.manifestid)
                .then(function(response){
                  if(response.status == 200){
                    $scope.packages = [];
                    angular.forEach(response.data, function(value, key) {
                      if($scope.jobType == 'toDeliver' && value.status == $scope.packagesType.new){
                        $scope.packages.push(value);
                        $scope.newCount = $scope.newCount + 1;
                      }
                      if($scope.jobType == 'delivered' && value.status == $scope.packagesType.delivered){
                        $scope.packages.push(value);
                      }
                      if($scope.jobType == 'returning' && value.status != $scope.packagesType.new && value.status != $scope.packagesType.delivered){
                        $scope.packages.push(value);
                      }
                    });
                    if($scope.newCount == 0 && $scope.jobType == 'toDeliver'){
                      $("#modalBasic").modal("toggle");
                    }
                  }else{
                    $scope.errorMessage = "Something went wrong. Reload again !";
                  }
                });
              }else{
                $scope.errorMessage = "Something went wrong. Reload again !";
              }
            //});
        }else{
          $scope.errorMessage == "Something went wrong. Reload again !";
        }
      });
  	};

    $scope.openJobModal = function(package){
      $scope.package = package;
    }

    $scope.clickPackageType = function(status){
      if(!navigator.geolocation){
        $scope.errorMessage = "Something went wrong. Try again !";
      }else{
        navigator.geolocation.getCurrentPosition(function(position){
          var latitude  = position.coords.latitude;
          var longitude = position.coords.longitude;

          manifestService.updateManifestPackageState
          ($scope.manifestId,$scope.package.id,status,latitude,longitude)
          .then(function(response){
            if(response.status == 201){
              $location.path('/driver/jobs/toDeliver');
            }else{
              $scope.errorMessage = "Something went wrong. Try again !";
            }
          });
        }, function(){});
      }
    }

    $scope.confirmReturnToCenter = function(){
      $("#modalBasic").modal("toggle");
      $timeout(function(){
        contractTaskService.updataContractStateToReturning
        ($scope.model.contractTask.id,$scope.model.profile.username,$scope.jobId,$scope.tripId)
        .then(function(response){
          if(response.status == 201){
            $location.path('/driver/returning');
          }else{
            $scope.errorMessage = "Something went wrong. Try again !";
          }
        });
      }, 1000);
    }

    $scope.$on('$locationChangeStart', function(event, next, current){            
      if($location.path() == $scope.model.lastPath || $location.path() == '/driver/jobs/toDeliver'
          || $location.path() == '/driver/jobs/delivered' || $location.path() == '/driver/jobs/returning'
          || $location.path() == '/driver/returning'){
      }else{
        event.preventDefault();
      }            
    });


  });