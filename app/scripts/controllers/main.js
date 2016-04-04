'use strict';

/**
 * @ngdoc function
 * @name inloopAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the inloopAppApp
 */
angular.module('inloopAppApp')
  .controller('MainCtrl', function ($scope,$location,sharedProperties,completeModel,loginService) {
    
    $scope.initialize =  function(){

    	$scope.username = '';
    	$scope.password = '';


    	/*loginService.getRoleType().then(function(response){
    		if(response.status == 200){
    			var roles = {};
    			var role = {};
				angular.forEach(response.data, function(value, key) {
				 role = {
				 	value.name : value;
				 }
				 roles.push(role);
				});
				alert(JSON.stringify(roles));
				sharedProperties.setRoles(response.data);
    		}
    	});*/
    }

	$scope.submitLogin = function(){

		var request = {
			username : $scope.username,
			password : $scope.password
		}

		loginService.getLoginToken(request).then(function(response){
			if(response.status == 200){
				var model = {};
				model.accessToken = response.data.token;
				model.tokenTime = response.data.expiry;

				loginService.getProfile().then(function(response){
					if(response.status == 200){

						if(true){
						model.profile = response.data;
						completeModel.saveCompleteModel(model);
						$location.path('/loadManager/job/'+sharedProperties.getJobsTypes().unassigned.value+'/');
						}

						// response.data.roleid == sharedProperties.getRoles().shipperLoadingManager.id

					
					}
				});
			}
		});
	}    


  });
