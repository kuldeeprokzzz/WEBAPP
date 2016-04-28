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

/*    $scope.showCompleteDetails = function(job){
     
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
    };*/

    $scope.showCompleteDetails = function(job){
      $scope.invoiceTobeSubmitted = {};
      $scope.invoiceTobeSubmitted.job = job;
      contractTaskService.getContractTaskById(job.contract_taskid)
      .then(function(response){
        if(response.status == 200){
          $scope.invoiceTobeSubmitted.contractTask = response.data;
          tripService.getTripStatesByTripId(response.data.latest_state.tripid).then(function(response){
            if(response.status == 200){
              $scope.invoiceTobeSubmitted.tripStates = response.data;
              tripService.getTripDataByTripId($scope.invoiceTobeSubmitted.contractTask.latest_state.tripid).then(function(response){
                if(response.status == 200){
                  $scope.invoiceTobeSubmitted.tripData = response.data;
                  $scope.modalTripData = response.data;

                  
                  

                  $("#modalAll").modal("toggle");
                  google.maps.event.addDomListener(window, 'load', $scope.setMap());
                  google.maps.event.trigger(map, "resize");
                  $('#modalAll').on('shown', function () {
    google.maps.event.trigger(map, "resize");
    });

      $("#modalAll").on("shown.bs.modal", function () {
    google.maps.event.trigger(map, "resize");
});
                }else{
                  $scope.errorMessage = "Some thing went wrong. Please Try again";
                }
              });
            }else{
              $scope.errorMessage = "Some thing went wrong. Please Try again";
            }
          });
        }else{
          $scope.errorMessage = "Some thing went wrong. Please Try again";
        }
      });
    }

    $scope.setMap = function(){

      var locs = [["13.002418","77.677985"],
["13.002522","77.678219"],
["13.002894","77.678665"],
["13.002956","77.678941"],
["13.002749","77.679111"],
["13.002522","77.679302"],
["13.002667","77.679791"],
["13.002708","77.679961"],
["13.002894","77.680259"],
["13.003039","77.680471"],
["13.003164","77.680684"],
["13.003267","77.680939"],
["13.003474","77.681130"],
["13.003598","77.681321"],
["13.003516","77.681704"],
["13.003578","77.682002"],
["13.003661","77.682278"],
["13.003785","77.682512"],
["13.003950","77.682788"],
["13.004116","77.683022"],
["13.004261","77.683277"],
["13.004365","77.683511"],
["13.004510","77.683829"],
["13.004675","77.684084"],
["13.004779","77.684297"],
["13.004944","77.684488"],
["13.005048","77.684786"],
["13.005172","77.684913"],
["13.005214","77.685275"],
["13.005234","77.685572"],
["13.005400","77.685806"],
["13.005524","77.686061"],
["13.005648","77.686273"],
["13.005814","77.686507"],
["13.005938","77.686741"],
["13.006104","77.687017"],
["13.006249","77.687209"],
["13.006435","77.687464"],
["13.006456","77.687740"],
["13.006642","77.687952"],
["13.006705","77.688250"],
["13.006829","77.688505"],
["13.006994","77.688760"],
["13.006850","77.689121"],
["13.006580","77.689228"],
["13.006332","77.689376"],
["13.006145","77.689483"],
["13.005856","77.689589"],
["13.005669","77.689716"],
["13.005421","77.689780"],
["13.005234","77.689631"],
["13.005172","77.689398"],
["13.005110","77.689143"],
["13.004137","77.688484"],
["13.003888","77.688909"],
["13.003971","77.689100"],
["13.004157","77.689376"],
["13.004220","77.689631"],
["13.004406","77.689844"],
["13.004551","77.690099"]];

                  var start = new google.maps.LatLng(locs[0][0], locs[0][1]);
                  var end = new google.maps.LatLng(locs[locs.length-1][0], locs[locs.length-1][1]);
                  var bounds = new google.maps.LatLngBounds();

                  bounds.extend(start);

                  bounds.extend(end);

      var mapProp = {
                    // $scope.modalTripData.locations.latitude
                      center: bounds.getCenter(),
                      mapTypeId: google.maps.MapTypeId.ROADMAP,
                      disableDefaultUI: true,
                      zoom :14,
                  };


                  
                  var map = new google.maps.Map(document.getElementById("map"),mapProp);
                  map.set('styles',$scope.mapStyle);

                  var myTrip= new Array();
                  console.log('hi');
                  for (i = 0; i < locs.length; i++) {  
                    console.log(locs[i][1]);
                  myTrip.push(new google.maps.LatLng(locs[i][0],locs[i][1]));
                  }
                  var flightPath=new google.maps.Polyline({
                      path:myTrip,
                      strokeColor:"#394165",
                      strokeOpacity:0.8,
                      strokeWeight:4
                  });
                  flightPath.setMap(map); 
                  
                  var markerArray = [];
                  var iconBase = window.location.origin;

                  markerArray[1] = new google.maps.Marker({
                  position: start,
                  map: map,
                  icon: iconBase + '/images/circle.png',
                  });  
                  
                markerArray[0] = new google.maps.Marker({
                  position: end,
                  map: map,
                  icon: iconBase + '/images/star.png'
                  });

                markerArray[0].setMap(map);
                markerArray[0].setPosition(start);
                markerArray[1].setMap(map);
                markerArray[1].setPosition(end);

    }


  });