angular.module('inloopAppApp')
  .controller('driverOnMyWayDoneController', function ($scope,$location,$interval,$stateParams,sharedProperties,completeModel,contractTaskService) {

  	$scope.initialize = function(){
  		if(completeModel.getCompleteModel() != undefined){
  			var model = completeModel.getCompleteModel();
  		}

      $scope.model = model;
      $scope.deliveryCenter = model.deliveryCentre;
      $scope.contractTaskType = sharedProperties.getContractTaskType();      

  var deliveryCentreLatLong = {lat: $scope.deliveryCenter.latitude, lng: $scope.deliveryCenter.longitude};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: deliveryCentreLatLong,
    disableDefaultUI: true,
  });


map.set('styles', [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]);

var centerControlDiv = document.createElement('div');

 // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        //controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
       // controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.style.width = '212px';
       // controlUI.title = 'Click to proceed to the Delivery Center';
        centerControlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'Proceeding to the Center';
        controlUI.appendChild(controlText);

        // Setup the click event listeners: simply set the map to Chicago.

        //centerControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);

google.maps.event.trigger(map, "resize");


 if (!navigator.geolocation){
    alert('not present');
  }else{
  
  var markerArray = [];

  navigator.geolocation.getCurrentPosition(function(position){
  var latitude  = position.coords.latitude;
  var longitude = position.coords.longitude;
      

  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();

  directionsDisplay = new google.maps.DirectionsRenderer({
    polylineOptions: {
      strokeColor: "#394165"
    },
    suppressMarkers: true,
  });
  directionsDisplay.setMap(map);

  var start = new google.maps.LatLng(13.050070, 77.579983);
  //var end = new google.maps.LatLng(38.334818, -181.884886);
  var end = new google.maps.LatLng(12.954063, 77.700146);
  var request = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      directionsDisplay.setMap(map);
      var myRoute = response.routes[0].legs[0];
      var iconBase = 'http://localhost:9000';
      markerArray[0] = new google.maps.Marker({
        position: start,
        map: map,
        icon: iconBase + '/images/circle.png',
      });
      markerArray[1] = new google.maps.Marker({
        position: end,
        map: map,
        icon: iconBase + '/images/star.png'
      });
      markerArray[0].setMap(map);
      markerArray[0].setPosition(start);
      markerArray[1].setMap(map);
      markerArray[1].setPosition(end);
    } else {
      alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
    }
  });



    }, function(){
      alert('unable to get youn location, please check GPS and Browser setting and reload again ');
    });
    
  }



  $interval(function(){
    contractTaskService.getContractTaskById($scope.model.contractTask.id)
    .then(function(response){
      if(response.status == 200){
        $scope.model.contractTask = response.data;
        completeModel.saveCompleteModel($scope.model);
        if(response.data.status == $scope.contractTaskType.arrived.value){
          $location.path('/driver/arrived');
        }
        if(response.data.status == $scope.contractTaskType.checkedIn.value){
          $location.path('/driver/checkedIn');
        }
        if(response.data.status == $scope.contractTaskType.assignedJob.value){
          $location.path('/driver/jobs/toDeliver');
        }
      }
    });
  }, 6000);

  	};

    $scope.showPath = function(){

    }

        $scope.$on('$locationChangeStart', function(event, next, current){            
          if($location.path() == $scope.model.lastPath || $location.path() == '/driver/arrived' || $location.path() == '/driver/checkedIn' || $location.path() == '/driver/jobs/toDeliver'){
          }else{
            event.preventDefault();
          }            
        });



  });