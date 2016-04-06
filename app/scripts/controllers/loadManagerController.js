angular.module('inloopAppApp')
  .controller('loadManagerController', function ($scope, $stateParams,sharedProperties,completeModel,contractTaskService,jobService,tripService) {

  	$scope.initialize = function(){
  		if(completeModel.getCompleteModel() != undefined){
  			$scope.model = completeModel.getCompleteModel();
  		}

/*      if($stateParams != undefined){
        if($stateParams.jobType != undefined){

        }
      }*/

      $scope.jobsTypes = sharedProperties.getJobsTypes();
      $scope.contractTaskTypes = sharedProperties.getContractTaskType();
      $scope.jobType = $stateParams.jobType;
      $scope.message = $stateParams.message;
      $scope.deliveryCenterId = $scope.model.profile.delivery_centreid;
      $scope.shipperId = $scope.model.profile.organizationid;
      $scope.status = $stateParams.jobType;

      jobService.getTodaysJobsByDeliveryCenterIdShipperIdAndStatus
      ($scope.deliveryCenterId,$scope.shipperId,$scope.status)
      .then(function(response){
        if(response.status == 200){
          if(response.data.length != 0){
            $scope.jobs = response.data;
          }else{
            $scope.message = "No Job Found";
          }
        }else{
          $scope.message = "Something went wrong. Try Again !";
        }
      });
  	};

    $scope.submitAssignDriver = function(job){
     
      // getting list of all checked-in drivers
      contractTaskService.getTodaysContractTaskByDeliveryCenterIdAndStatus
      ($scope.deliveryCenterId,$scope.contractTaskTypes.checkedIn.value)
      .then(function(response){
        if(response.status == 200){
          if(response.data.length != 0){
            $scope.message = "";
            $scope.jobToBeAssigned = job;
            $scope.contractTasks = response.data;
            $("#centerModal").modal("toggle");
          }else{
            $scope.message = "No driver found to assign job, Try after Some Time !";
          }
        }else{
          $scope.message = "Something went wront. Try Again !";
        }
      });    
    };

      $scope.assignJobToDriver = function(contractTask){

        jobService.updateJobStateWithJobIdPerformedByAndType
        ($scope.jobToBeAssigned.id,$scope.model.profile.username,$scope.jobsTypes.assigned.value)
        .then(function(response){
          if(response.status == 200){
            tripService.createNewTripForJob(
              contractTask.vehicleid,contractTask.driverid,contractTask.id,
              $scope.jobToBeAssigned.id,contractTask.odometer_deviceid)
            .then(function(response){
              if(response.status == 200){
                var tripId = response.data.id;
                jobServiceupdateJobWithJobIdContractTaskIdAndTripId(
                  $jobToBeAssigned.id,contractTask.id,tripId)
                .then(function(response){
                  if(response.status == 200){
                    contractTaskService.updateContractTaskStateToAssignedJob(
                    contractTask.latest_state.location.latitude,contractTask.latest_state.location.latitude,
                    contractTask.latest_state.odometer,contractTask.id,$model.profile.username,job.id,tripId)
                    .then(function(response){
                      if(response.status == 200){
                        $("#centerModal").modal("toggle");
                        $location.path('/loadManager/job/'+sharedProperties.getJobsTypes().unassigned.value+'/Jon Assigned Successfully !');
                      }
                    });
                  }
                });
              }
            });         
          }
            
          $scope.message = "Something went wront. Assign job again !";
          $("#centerModal").modal("toggle");

        });
      };


    $scope.showDetails = function(job){
     
      // getting list of all checked-in drivers
      contractTaskService.getContractTaskById(job.contract_taskid)
      .then(function(response){
        if(response.status == 200){
          $scope.contractTask = response.data;
          $scope.contractTask.jobName = job.name;
          $("#detailsModal").modal("toggle");
        }else{
          $scope.message = "Unable to show details, Please try again !";
        }
      });
    };


  });