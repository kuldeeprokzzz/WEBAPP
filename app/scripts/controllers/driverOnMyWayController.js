angular.module('inloopAppApp')
  .controller('driverOnMyWayController', function ($scope,$location, $stateParams,sharedProperties,completeModel,contractTaskService) {

  	$scope.initialize = function(){
  		if(completeModel.getCompleteModel() != undefined){
  			var model = completeModel.getCompleteModel();
  		}

/*      if($stateParams != undefined){
        if($stateParams.jobType != undefined){

        }
      }*/
      $scope.model = model;
      $scope.name  = model.profile.first_name +" " + model.profile.last_name;
      $scope.rolesTypes = sharedProperties.getRoles();
      $scope.vehicleName = model.vehicle.color+" "+model.vehicle.make + " " + model.vehicle.model;
      $scope.organisationName = model.profile.organization_name;
      $scope.licencePlateNumber = model.vehicle.regNumber;
      $scope.deliveryCenter = model.deliveryCentre;
      $scope.image = model.profile.image;

  var deliveryCentreLatLong = {lat: $scope.deliveryCenter.latitude, lng: $scope.deliveryCenter.longitude};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: deliveryCentreLatLong,
    disableDefaultUI: true,
  });


map.set('styles', [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]);

var centerControlDiv = document.createElement('div');

 // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#00a89f';
        controlUI.style.border = '2px solid #00a89f';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 4px 8px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '48px';
        controlUI.style.marginLeft = '-80%';
        controlUI.style.textAlign = 'center';
        controlUI.style.width = '260%';
        //controlUI.title = 'Click to proceed to the Delivery Center';
        centerControlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = 'white';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '20px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'On My May';
        controlUI.appendChild(controlText);

        // Setup the click event listeners: simply set the map to Chicago.
        controlUI.addEventListener('click', function() {

          contractTaskService.updataContractStateToDispatchedWithoutOdometer
          (model.contractTask.id,model.profile.username,$scope.latitude,$scope.longitude)
          .then(function(response){
            if(response.status == 201){
              $location.path('/driver/onMyWayDone');
            }else{
              $scope.errorMessage = "Something Went wrong. Try again !";
            }
          });
        });

        centerControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);

google.maps.event.trigger(map, "resize");


 if(!navigator.geolocation){
    alert('Location services not supported');
  }else{

  var markerArray = [];

  navigator.geolocation.getCurrentPosition(function(position){
  var latitude  = position.coords.latitude;
  var longitude = position.coords.longitude;

  $scope.latitude = latitude;
  $scope.longitude = longitude;
      

  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();

  directionsDisplay = new google.maps.DirectionsRenderer({
    polylineOptions: {
      strokeColor: "#394165",
      strokeWeight: 4
    },
    suppressMarkers: true,
  });
  directionsDisplay.setMap(map);

  var start = new google.maps.LatLng(latitude, longitude);
  //var end = new google.maps.LatLng(38.334818, -181.884886);
  var end = new google.maps.LatLng($scope.model.deliveryCentre.latitude,$scope.model.deliveryCentre.longitude);
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
      var iconBase = window.location.origin;

      var imageCircle = {
        url : iconBase + '/images/circle.png',
        scaledSize: new google.maps.Size(20.20, 20.20),
      };

      var imageStar = {
        url : iconBase + '/images/star.png',
        scaledSize: new google.maps.Size(30.8, 30.8),
      }
      
      markerArray[0] = new google.maps.Marker({
        position: myRoute.start_location,
        map: map,
        icon: imageCircle,
      });
      markerArray[1] = new google.maps.Marker({
        position: myRoute.end_location,
        map: map,
        icon: imageStar,
      });
      markerArray[0].setMap(map);
      markerArray[0].setPosition(myRoute.start_location);
      markerArray[1].setMap(map);
      markerArray[1].setPosition(myRoute.end_location);

      var stepDisplay = new google.maps.InfoWindow;

      google.maps.event.addListener(markerArray[0], 'click', function() {
        // Open an info window when the marker is clicked on, containing the text
        // of the step.
        stepDisplay.setContent("Your Location");
        stepDisplay.open(map, markerArray[0]);
      });

      google.maps.event.addListener(markerArray[1], 'click', function() {
        // Open an info window when the marker is clicked on, containing the text
        // of the step.
        stepDisplay.setContent("Delivery Center");
        stepDisplay.open(map, markerArray[1]);
      });
    } else {
      alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
    }
  });



    }, function(){
      alert('Unable to get your location, please check GPS and Browser settings and then reload');
    });
    
  }


  	};

        $scope.$on('$locationChangeStart', function(event, next, current){            
          if($location.path() == $scope.model.lastPath || $location.path() == '/driver/onMyWayDone'){
          }else{
            event.preventDefault();
          }            
        });
  });