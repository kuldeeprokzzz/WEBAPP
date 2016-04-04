inloopAppApp.service('loginService', ['sharedProperties','$http', function(sharedProperties, $http){
	
	this.getLoginToken = function(requestData){

		return $http({
	            method: 'POST',
	            url: sharedProperties.getUrl()+'/login',
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
     		url: sharedProperties.getUrl()+'/profiles/me',
               headers : {Authorization:'Token 3562QEQQ%$&898921@'},
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




