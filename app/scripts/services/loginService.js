inloopAppApp.service('loginService', ['sharedProperties','$http', function(sharedProperties, $http){
	
	this.getLoginToken = function(requestData){

		return $http({
	            method: 'POST',
	            url: 'http://core-dev.inloop.co.in/api/v1'+'/login',
	            headers: {
	                'Content-Type': 'application/json'
	            },
	            data: requestData
	        }).success(function (response) {
	            return response;
	        }).error(function (response) {
			    return response;
			});
       };

     this.getProfile = function(){
     	return $http({
     		method: 'GET',
     		url: 'http://core-dev.inloop.co.in/api/v1'+'/profiles/me',
     	}).success(function(response){
     		return response;
     	}).error(function(response){
     		return response;
     	});
     };

     this.getRoleType = function(){

     	return $http({
     		method: 'GET',
     		url: sharedProperties.getUrl()+'/roles',
     	}).success(function(response){
     		return response;
     	}).error(function(response){
     		return response;
     	});
     }
}])




