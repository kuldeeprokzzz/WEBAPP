angular.module('inloopAppApp')
  .controller('driverJobController', function ($scope,$timeout,$window,$location,$interval,$route,$state,$stateParams,sharedProperties,completeModel,contractTaskService,jobService,tripService,manifestService) {

  	$scope.initialize = function(){
  		if(completeModel.getCompleteModel() != undefined){
  			var model = completeModel.getCompleteModel();
  		}

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
            /*tripService.getTripDetailsbyId($scope.tripId)
            .then(function(response){*/
              if(response.status == 200){

                response.data =  {
    "id": 1,
    "vehicleid": 6,
    "driverid": 0,
    "contract_taskid": 15,
    "jobid": $scope.jobId,
    "odometer_deviceid": 1,
    "manifestid": 3
  };
                $scope.newCount = 0;
                $scope.manifestId = response.data.manifestid;
                manifestService.getManifestPackagesbyManifestId(response.data.manifestid)
                .then(function(response){
                  if(response.status == 200){
                    $scope.packages = [];
                    angular.forEach(response.data, function(value, key) {
                      if($scope.jobType == 'toDeliver' && value.latest_state.type == $scope.packagesType.new){
                        $scope.packages.push(value);
                        $scope.newCount = $scope.newCount + 1;
                      }
                      if($scope.jobType == 'delivered' && value.latest_state.type == $scope.packagesType.delivered){
                        $scope.packages.push(value);
                      }
                      if($scope.jobType == 'returning' && value.latest_state.type != $scope.packagesType.new && value.status != $scope.packagesType.delivered){
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
              $window.location.reload();
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
      }, 500);
    }

    $scope.ReturnToCenter = function(){
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
          || $location.path() == '/driver/returning' || $location.path() == '/'){
      }else{
        event.preventDefault();
      }            
    });

    $scope.endOfDay = function(){
      if(!navigator.geolocation){
        $scope.errorMessage = "Something went wrong. Try again !";
      }else{
        navigator.geolocation.getCurrentPosition(function(position){
          var latitude  = position.coords.latitude;
          var longitude = position.coords.longitude;

          tripService.updateTripStateToEndTrip
          ($scope.tripId,$scope.model.profile.username,undefined,longitude,latitude)
          .then(function(response){
            if(response.status == 201){
              jobService.updateJobStateWithJobIdPerformedByAndType
              ($scope.jobId,$scope.model.profile.username,sharedProperties.getJobsTypes().completed.value)
              .then(function(response){
                if(response.status == 201){
                  contractTaskService.updateContractTaskStateToCompleted
                  (latitude,longitude,undefined,$scope.model.contractTask.id,$scope.model.profile.username,$scope.jobId,$scope.tripId)
                  .then(function(response){
                    if(response.status == 201){
                      completeModel.saveCompleteModel(undefined);
                      $location.path('/');                      
                    }
                  });
                }
              });
            }
          });


        });
      }
    }


  });