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
				model.tokenTime = response.data.expires;
				model.loginTime = new Date();

				loginService.getProfile().then(function(response){
					if(response.status == 200){

						model.profile = response.data;
						

						if($scope.username == 'loadM'){
						model.profile.roleIdtemp = sharedProperties.getRoles().shipperLoadingManager.id;
						completeModel.saveCompleteModel(model);
						$location.path('/loadManager/job/'+sharedProperties.getJobsTypes().unassigned.value+'/');
						}

						if($scope.username == 'accountR'){
						model.profile.roleIdtemp = sharedProperties.getRoles().providerAccountReceivableManager.id;
						completeModel.saveCompleteModel(model);
						$location.path('/accountReceivable/invoice/ALL/');
						}

						if($scope.username == 'accountP'){
						model.profile.roleIdtemp = sharedProperties.getRoles().shipperAccountPayableManager.id;
						completeModel.saveCompleteModel(model);
						$location.path('/accountPayable/invoice/ALL/');
						}
						// response.data.roleid == sharedProperties.getRoles().shipperLoadingManager.id
						if($scope.username == 'orchestrator'){
						model.profile.roleIdtemp = sharedProperties.getRoles().shipperAccountPayableManager.id;
						completeModel.saveCompleteModel(model);
						$location.path('/orchestrator/provisioning/shippers/');
						}
					
					}
				});
			}
		});
	}    


});
