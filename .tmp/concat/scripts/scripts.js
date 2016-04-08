'use strict';

/**
 * @ngdoc overview
 * @name inloopAppApp
 * @description
 * # inloopAppApp
 *
 * Main module of the application.
 */
var inloopAppApp= angular
  .module('inloopAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'LocalStorageModule'
  ])
  .config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('webApp');
  }])
  .config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('login', {
      url: "/",
      templateUrl: "../views/login.html",
      controller : 'MainCtrl'
    })
    /*.state('state1.list', {
      url: "/list",
      templateUrl: "partials/state1.list.html",
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      }
    })*/
    .state('loadManager', {
      url: "/loadManager",
      templateUrl: "../views/base.html",
      controller: 'roleManagerController',
    })
    .state('loadManager.job', {
      url: "/job/{jobType}/{message}",
        templateUrl: "../views/jobs.html",
        controller: 'loadManagerController',
      })
    .state('accountReceivable', {
      url: "/accountReceivable",
      templateUrl: "../views/base.html",
      controller: 'roleManagerController',
    })
    .state('accountReceivable.invoice', {
      url: "/invoice/{invoiceType}/{message}",
      templateUrl: "../views/billing.html",
      controller: 'accountReceivableController',
    })
    .state('accountPayable', {
      url: "/accountPayable",
      templateUrl: "../views/base.html",
      controller: 'roleManagerController',
    })
    .state('accountPayable.invoice', {
      url: "/invoice/{invoiceType}/{message}",
      templateUrl: "../views/accountPayableInvoice.html",
      controller: 'accountPayableController',
    })
    .state('provisioning', {
      url: "/provisioning",
      templateUrl: "../views/provisioning.html",
    })
  }])
  .config(["$provide", "$httpProvider", "localStorageServiceProvider", function ($provide, $httpProvider,localStorageServiceProvider) {
  
  // Intercept http calls to add session token in the header.
  // this also checks for session expiry and log's out if session has expired
  $provide.factory('sessionInterceptor', ["localStorageService", "$location", function (localStorageService,$location) {
    return {
      
      request: function (config) {
        var model = localStorageService.get('completeModel');
        if(model != undefined){
          if(model != ''){
        if(new Date() - new Date(model.loginTime) > model.tokenTime){
          localStorageService.set('completeModel',undefined);
          console.log('user session time out');
          $location.path('/');
        }
        if(config.url.indexOf('api') != -1){
          if(config.url.indexOf('login') != -1){
            config.headers['Authorization'] = 'Token 3562QEQQ%$&898921@';
            //completeModel.getCompleteModel().accessToken
          }
        }
      }
      }
        return config;
      },
    };
  }]);

  // Add the interceptor to the $httpProvider.
  $httpProvider.interceptors.push('sessionInterceptor');

}]);

  

inloopAppApp.service('sharedProperties',["$location", "$filter", function($location,$filter){
 
  
        this._baseURL = 'http://54.169.251.56:10010/api/v1';
          
        this._authToken = '';

        this._roles = {

            shipperAccountPayableManager: {
                                                "id": 1,
                                                "name": "Accounts Payable Manager",
                                                "organizationType": "SHIPPER",
                                                "redirectURL": "shipper:accounts-payables-profiling"
                                              },
                        shipperFleetManager : {
                                                "id": 2,
                                                "name": "Fleet Manager",
                                                "organizationType": "SHIPPER",
                                                "redirectURL": "shipper:shipper-fleet-manager-profiling"
                                              },
                   shipperDeliveryAssociate : {
                                                "id": 3,
                                                "name": "Delivery Associate",
                                                "organizationType": "SHIPPER",
                                                "redirectURL": "shipper:delivery-associate-profiling"
                                              },
                               shipperAdmin : {
                                                "id": 4,
                                                "name": "Admin",
                                                "organizationType": "SHIPPER",
                                                "redirectURL": "core:shipper-view"
                                              },

           providerAccountReceivableManager : {
                                                "id": 5,
                                                "name": "Accounts Receivable Manager",
                                                "organizationType": "PROVIDER",
                                                "redirectURL": "provider:accounts-receivables-profile"
                                               },
                        providerFleetManager : {
                                                "id": 6,
                                                "name": "Fleet Manager",
                                                "organizationType": "PROVIDER",
                                                "redirectURL": "provider:fleet-manager-profile"
                                                },
                                providerDriver : {
                                                    "id": 7,
                                                    "name": "Driver",
                                                    "organizationType": "PROVIDER",
                                                    "redirectURL": "provider:driver-profile"
                                                  },
                                providerAdmin : {
                                                    "id": 8,
                                                    "name": "Admin",
                                                    "organizationType": "PROVIDER",
                                                    "redirectURL": "core:provider-view"
                                                  },

                orchestratorOperationManager : {
                                                    "id": 9,
                                                    "name": "Operations Manager",
                                                    "organizationType": "ORCHESTRATOR",
                                                    "redirectURL": "orchestrator:operations-manager-profiling"
                                                  },
                orchestratorProvisioningManager : {
                                                    "id": 10,
                                                    "name": "Provisioning Manager",
                                                    "organizationType": "ORCHESTRATOR",
                                                    "redirectURL": "core:orchestrator-view"
                                                  },
                orchestratorTransactionManager : {
                                                    "id": 11,
                                                    "name": "Transactions Manager",
                                                    "organizationType": "ORCHESTRATOR",
                                                    "redirectURL": "orchestrator:transactions-manager-profiling"
                                                  },

                shipperLoadingManager : {
                                            "id": 12,
                                            "name": "Loading Manager",
                                            "organizationType": "SHIPPER",
                                            "redirectURL": "shipper:loading-manager-profiling"
                                          },

                providerNotVerifiedAdmin : {
                                            "id": 13,
                                            "name": "Not Verified Admin",
                                            "organizationType": "PROVIDER",
                                            "redirectURL": "provider:not-verified-provider-profiling"
                                          },

                shipperNotVerifiedAdmin : {
                                            "id": 14,
                                            "name": "Not Verified Admin",
                                            "organizationType": "SHIPPER",
                                            "redirectURL": "shipper:not-verified-shipper-profiling"
                                          }
            };       

/*        this._contractStatusType = {

            onWay : {id : 0,type : 'ON_WAY'},
            checkedIn : {id : 1,type : 'CHECKED_IN'},
            returning : {id : 2,type : 'RETURNING'}
            
        };*/

        this._invoiceType = {
            created :   {
                            "key": "CREATED",
                            "value": "GENERATED"
                          },
            submitted : {
                            "key": "SUBMITTED",
                            "value": "SUBMITTED"
                          },
            approved :   {
                            "key": "APPROVED",
                            "value": "APPROVED"
                          },
            paid :   {
                        "key": "PAID",
                        "value": "PAID"
                      },
            archieved : {
                            "key": "ARCHIEVED",
                            "value": "ARCHIEVED"
                          }
        };

        this._contractTaskType = {
            created : {
                        "key": "CREATED",
                        "value": "CREATED"
                      },
            dispatched : {
                            "key": "DISPATCHED",
                            "value": "DISPATCHED"
                         },
            arrived : {
                        "key": "ARRIVED",
                        "value": "ARRIVED"
                      },
            checkedIn : {
                            "key": "CHECKED_IN",
                            "value": "CHECKED_IN"
                        },
            assignedJob : {
                            "key": "ASSIGNED_JOB",
                            "value": "ASSIGNED_JOB"
                          },
            returning : {
                            "key": "RETURNING",
                            "value": "RETURNING"
                        },
        };

        this._jobTypes = {

            unassigned : {
                            "key": "UNASSIGNED",
                            "value": "UNASSIGNED"
                         },
            assigned :   {
                            "key": "ASSIGNED",
                            "value": "ASSIGNED"
                         },
            completed :  {
                            "key": "COMPLETED",
                            "value": "COMPLETED"
                         }
        }

        this._cardType = {
            blankCard : { type : 'CREATED', text : 'CREATED'},
            yellowCard : { type : 'DISPATCHED_ARRIVED', text : 'ARRIVED'},
            orangeCard : {type : 'RETURNING_ARRIVED' , text : 'ARRIVED'},
            greenCard : { type : 'CHECKED_IN' , text : 'CHECKED IN' },
            blueCard : { type : 'ASSIGNED_JOB' , text : 'JOB ASSIGNED' },
        }

        this._daMenu = {
            drivers : { name : 'DRIVERS',
                        items : {
                            all : 'All',
                            available : 'Available',
                            assigned : 'Assigned',
                            returning : 'Dispatched',
                        }
                    },
            jobs : { name : 'JOBS', 
                     items : {
                        unassigned : 'Unassigned',
                        assigned : 'Assigned',
                        completed : 'Completed',
                     }},
        }

        this._lmMenu = {
            drivers : { name : 'DRIVERS',
                        items : {
                            all : 'All',
                            available : 'Available',
                            assigned : 'Assigned',
                            returning : 'Dispatched',
                        }
                    },
            jobs : { name : 'JOBS', 
                     items : {
                        unassigned : 'Unassigned',
                        assigned : 'Assigned',
                        completed : 'Completed',
                     }},
        }

        this._tripType = {
            created : {
                        "key": "CREATED",
                        "value": "CREATED"
                      },
            loadingStart : {
                                "key": "LOADING_START",
                                "value": "LOADING_START"
                            },
            tripStart  : {
                            "key": "TRIP_START",
                            "value": "TRIP_START"
                         },
            tripEnd : {
                        "key": "TRIP_END",
                        "value": "TRIP_END"
                      },
        };

        this._packageType = {
            new : 'NEW',
            delivered : 'DELIVERED',
            damaged : 'DAMAGED', 
            incorrectAddress : 'INCORRECT_ADDRESS',
            notAvailable : 'NOT_AVAILABLE', 
            returned : 'RETURNED',
            rescheduled : 'RESCHEDULED',
        };

        this.getTodayDate = function(){
            return $filter('date')(new Date(),'yyyy-MM-dd');
        }

        this.getTodatUTCDateTime = function(){
            return $filter('date')(new Date(),'yyyy-MM-ddTHH:mm:ssZ');
        }

        this.getTimeFromUTCDateTime = function(date){
            return $filter('date')(date,'hh:mm a');
        }

        this.getUrl = function(){
            return this._baseURL;
        };

        this.getAuthToken = function(){
            return this._authToken;
        };

        this.setAuthToken = function(token){
            this._authToken = token;
        };
        
        this.setPath = function (path) {
            return $location.path(path);
        };

        this.getContractStatusType = function(){
            return this._contractStatusType;
        };

        this.getContractTaskType = function(){
            return this._contractTaskType;
        };

        this.getJobsTypes = function(){
            return this._jobTypes;
        }

        this.getCardTypes = function(){
            return this._cardType;
        }

        this.getdaMenu = function(){
            return this._daMenu;
        }
        this.getLmMenu = function(){
            return this._lmMenu;
        }
        this.getRoles = function(){
            return this._roles;
        }
        this.getTripTypes = function(){
            return this._tripType;
        }
        this.getPackageType = function(){
            return this._packageType;
        }
        this.getInvoiceType = function(){
            return this._invoiceType;
        }
}]); 

inloopAppApp.service('completeModel',["localStorageService", "$location", function(localStorageService,$location){
 
  
        this._completeModel = undefined;


        // this function gets complete model, in case it doesnt find one
        // it tries to retrieve it from local storage, if it fails there also
        // it just redirects to login page
        this.getCompleteModel = function(){  
            if(this._completeModel != undefined){
                return this._completeModel;
            }else{
                var localModel = localStorageService.get('completeModel');
                if(localModel != undefined){
                    this._completeModel = localModel;
                    return this._completeModel;
                }else{
                    $location.path('/');
                }
            }
        }

        // saves complete model into loca storage
        this.saveCompleteModel = function(param){
            this._completeModel = param;
            localStorageService.set('completeModel',param);
        }


}]); 

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





inloopAppApp.service('contractTaskService', ['sharedProperties','$http', function(sharedProperties, $http){
	


     this.getTodaysContractTaskByDeliveryCenterIdAndStatus = function(deliveryCenterId,status){
     	
          var today = sharedProperties.getTodayDate();

          today = 'today'; // remove
          deliveryCenterId = 5; // remove
          return $http({
     		method: 'GET',
     		url: sharedProperties.getUrl()+'/contract_tasks/?status='+status+'&delivery_centreid='+deliveryCenterId+'&task_date='+today,
     	}).success(function(response){
     		return response;
     	}).error(function(response){
     		return response;
     	});
     };


     this.updateContractTaskStateToAssignedJob = function(lat,lon,odometer,contractTaskId,performedBy,jobId,tripId){
          
          var currentTime = sharedProperties.getTodatUTCDateTime();
          var requestBody = {
                              "type": sharedProperties.getContractTaskType().assignedJob.value,
                              "time": currentTime,
                              "location": {
                                             "longitude": lon,
                                             "latitute": lat,
                                          },
                              "odometer": odometer,
                              "contract_taskid": contractTaskId,
                              "performed_by": performedBy,
                              "jobid": jobId,
                              "tripid": tripId,
                             };

          return $http.post(sharedProperties.getUrl()+'/contract_tasks/'+contractTaskId+'/states',requestBody,{})
        .then(function(response){
            return response;
        }, function(response){
            return response;
        });
     };


     this.getContractTaskById = function(contractTaskId){
      
      return $http({
        method: 'GET',
        url: sharedProperties.getUrl()+'/contract_tasks/'+contractTaskId,
      }).success(function(response){
        return response;
      }).error(function(response){
        return response;
      });
     };

}])



inloopAppApp.service('jobService', ['sharedProperties','$http', function(sharedProperties, $http){
	


     this.getTodaysJobsByDeliveryCenterIdShipperIdAndStatus = function(deliveryCenterId,shipperId,status){
     	
          var today = sharedProperties.getTodayDate();

          today = 'today'; // remove
          deliveryCenterId = 5; // remove
          return $http({
     		method: 'GET',
     		url: sharedProperties.getUrl()+'/jobs?job_date='+today+'&delivery_centreid='+deliveryCenterId+'&shippered='+shipperId+'&status='+status,
     	}).success(function(response){
     		return response;
     	}).error(function(response){
     		return response;
     	});
     };

     this.updateJobStateWithJobIdPerformedByAndType = function(jobId,performedBy,type){
          
          var currentTime = sharedProperties.getTodatUTCDateTime();

          var requestBody = {
                              "type": type,
                              "time": currentTime,
                              "performed_by": performedBy,
                            };

          return $http.post(sharedProperties.getUrl()+'/jobs/'+jobId+'/states',requestBody,{})
                  .then(function(response){
                      return response;
                  }, function(response){
                      return response;
                  });
     };

     this.updateJobWithJobIdContractTaskIdAndTripId = function(jobId,contractTaskId,tripId){
          
          var requestBody = {
                              "contract_taskid": contractTaskId,
                              "tripid": tripId,
                            };

          return $http.put(sharedProperties.getUrl()+'/jobs/'+jobId+'/',requestBody,{})
                  .then(function(response){
                      return response;
                  }, function(response){
                      return response;
                  });
     };

     this.getAllJobsByShipperIdAndStatus = function(shipperId,status){

      return $http({
        method: 'GET',
        url: sharedProperties.getUrl()+'/jobs?shippered='+shipperId+'&status='+status,
      }).success(function(response){
        return response;
      }).error(function(response){
        return response;
      });
     };

    this.getJobDetailByJobId = function(jobId){

      return $http({
        method: 'GET',
        url: sharedProperties.getUrl()+'/jobs/'+jobId,
      }).success(function(response){
        return response;
      }).error(function(response){
        return response;
      });
     };


}])





inloopAppApp.service('tripService', ['sharedProperties','$http', function(sharedProperties, $http){
	


     

     this.createNewTripForJob = function(vehicleId,driverId,contractTaskId,jobId,odometerDeviceId){
          
          var currentTime = sharedProperties.getTodatUTCDateTime();

          var requestBody = {
                              "vehicleid": vehicleId,
                              "driverid": driverId,
                              "contract_taskid": contractTaskId,
                              "jobid": jobId,
                              "odometer_deviceid":odometerDeviceId, 
                              "status": sharedProperties.getTripTypes.created.value, 
                              "trip_date": currentTime,
                            };

          return $http.post(sharedProperties.getUrl()+'/trips',requestBody,{})
                  .then(function(response){
                      return response;
                  }, function(response){
                      return response;
                  });
     };

     this.getTripDetailsbyId = function(tripId){
          
      return $http({
        method: 'GET',
        url: sharedProperties.getUrl()+'/trips/'+tripId,
      }).success(function(response){
        return response;
      }).error(function(response){
        return response;
      });
     };

     this.getTripDataByTripId = function(tripId){

      return $http({
        method: 'GET',
        url: sharedProperties.getUrl()+'/trips/'+tripId+'/tripdata',
      }).success(function(response){
        return response;
      }).error(function(response){
        return response;
      });
     };

     this.getTripStatesByTripId = function(tripId){

      return $http({
        method: 'GET',
        url: sharedProperties.getUrl()+'/trips/'+tripId+'/states',
      }).success(function(response){
        return response;
      }).error(function(response){
        return response;
      });
     };

}])





inloopAppApp.service('invoiceService', ['sharedProperties','$http', function(sharedProperties, $http){
	


     this.getAllInvoicesByPayerIdAndStatus = function(payerId,status){


      return $http({
     		method: 'GET',
     		//url: sharedProperties.getUrl()+'/invoices/?payerid='+payerId+'&status='+status,
               url: sharedProperties.getUrl()+'/invoices/',  // Delete later
     	}).success(function(response){
     		return response;
     	}).error(function(response){
     		return response;
     	});
     };

     this.getAllInvoicesByPayeeIdAndStatus = function(payeeId,status){


      return $http({
        method: 'GET',
        //url: sharedProperties.getUrl()+'/invoices/?payeeid='+payeeId+'&status='+status,
               url: sharedProperties.getUrl()+'/invoices/',  // Delete later
      }).success(function(response){
        return response;
      }).error(function(response){
        return response;
      });
     };

     this.updateInvoiceState = function(invoiceId,state,performedBy,organizationId){

          var currentTime = sharedProperties.getTodatUTCDateTime();
          var requestBody = {
                                "invoiceid": invoiceId,
                                "type": state,
                                "time": currentTime,
                                "performed_by": performedBy,
                                "organizationid": organizationId,
                                "remarks": "string"
                              };

          return $http.post(sharedProperties.getUrl()+'/invoices/'+invoiceId+'/states',requestBody,{})
        .then(function(response){
            return response;
        }, function(response){
            return response;
        });
     };
}])





'use strict';

/**
 * @ngdoc function
 * @name inloopAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the inloopAppApp
 */
angular.module('inloopAppApp')
  .controller('MainCtrl', ["$scope", "$location", "sharedProperties", "completeModel", "loginService", function ($scope,$location,sharedProperties,completeModel,loginService) {
    
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
						
					
					}
				});
			}
		});
	}    


}]);

angular.module('inloopAppApp')
  .controller('roleManagerController', ["$scope", "$stateParams", "sharedProperties", "completeModel", "jobService", function ($scope, $stateParams,sharedProperties,completeModel,jobService) {

  	$scope.initialize = function(){
  		if(completeModel.getCompleteModel() != undefined){
  			var model = completeModel.getCompleteModel();
  		}

/*      if($stateParams != undefined){
        if($stateParams.jobType != undefined){

        }
      }*/

      $scope.roleId = model.profile.roleIdtemp;
      $scope.rolesTypes = sharedProperties.getRoles();
      

  	};


  }]);
angular.module('inloopAppApp')
  .controller('headerController', ["$scope", "$location", "$stateParams", "sharedProperties", "completeModel", "jobService", function ($scope,$location, $stateParams,sharedProperties,completeModel,jobService) {

  	$scope.initialize = function(){
  		if(completeModel.getCompleteModel() != undefined){
  			var model = completeModel.getCompleteModel();
  		}

/*      if($stateParams != undefined){
        if($stateParams.jobType != undefined){

        }
      }*/

      $scope.roleId = model.profile.roleIdtemp;
      $scope.rolesTypes = sharedProperties.getRoles();
      $scope.username = model.profile.first_name;
      $scope.image = model.profile.image;
      

  	};

    $scope.logOut = function(){
      completeModel.saveCompleteModel(undefined);
      $location.path('/');
    }


  }]);
angular.module('inloopAppApp')
  .controller('sectionController', ["$scope", "$stateParams", "sharedProperties", "completeModel", "jobService", function ($scope, $stateParams,sharedProperties,completeModel,jobService) {

  	$scope.initialize = function(){
  		if(completeModel.getCompleteModel() != undefined){
  			var model = completeModel.getCompleteModel();
  		}

/*      if($stateParams != undefined){
        if($stateParams.jobType != undefined){

        }
      }*/

      $scope.roleId = model.profile.roleIdtemp;
      $scope.rolesTypes = sharedProperties.getRoles();
      $scope.jobsTypes = sharedProperties.getJobsTypes();

  	};


  }]);
angular.module('inloopAppApp')
  .controller('loadManagerController', ["$scope", "$stateParams", "sharedProperties", "completeModel", "contractTaskService", "jobService", "tripService", function ($scope, $stateParams,sharedProperties,completeModel,contractTaskService,jobService,tripService) {

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


  }]);
angular.module('inloopAppApp')
  .controller('accountPayableController', ["$scope", "$timeout", "$stateParams", "$location", "sharedProperties", "completeModel", "contractTaskService", "jobService", "tripService", "invoiceService", function ($scope,$timeout,$stateParams,$location,sharedProperties,completeModel,contractTaskService,jobService,tripService,invoiceService) {

    $scope.initialize = function(){
      if(completeModel.getCompleteModel() != undefined){
        $scope.model = completeModel.getCompleteModel();
      }

/*      if($stateParams != undefined){
        if($stateParams.jobType != undefined){

        }
      }*/
    $scope.invoiceTypes = sharedProperties.getInvoiceType();
      $scope.createdCount = 0;
      $scope.createdTotalAmount = 0;
      $scope.createdTotalPackages = 0;
      $scope.approveAllInvoiceList = [];

    if($stateParams.invoiceType != undefined){
      if($stateParams.invoiceType == 'ALL'){
        $scope.invoiceType = $scope.invoiceTypes.submitted.value+','+
                             $scope.invoiceTypes.approved.value+','+
                             $scope.invoiceTypes.paid.value+','+
                             $scope.invoiceTypes.archieved.value;
      }else{
        $scope.invoiceType = $stateParams.invoiceType;
      }
    }

    if($stateParams.message != undefined){
      $scope.errorMessage = $stateParams.message;
    }

    console.log($scope.invoiceType);
    $scope.payeeId = $scope.model.profile.organizationid;

    

    invoiceService.getAllInvoicesByPayeeIdAndStatus
    ($scope.payeeId,$scope.invoiceType)
    .then(function(response){
      if(response.status == 200){
        if(response.data.length != 0){

          $scope.jobInvoiceTripList = [];

          angular.forEach(response.data, function(value, key) {
            var invoice = value;

            contractTaskService.getContractTaskById(invoice.contract_tasks[0]).then(function(response){
              if(response.status == 200){
                var contractTask = response.data;
                //var jobId = response.data.jobid;
                var jobId = 119 + key;
                var tripId = 1 + key;
                jobService.getJobDetailByJobId(jobId).then(function(response){
                if(response.status == 200){
                  var job = response.data;
                  //var tripId = response.data.trips[0];
                  tripService.getTripDetailsbyId(tripId).then(function(response){
                    if(response.status == 200){
                      var tripDetails = response.data;
                      tripService.getTripDataByTripId(tripId).then(function(response){
                        if(response.status == 200){
                          var tripData = response.data;
                          tripService.getTripStatesByTripId(tripId).then(function(response){
                            if(response.status == 200){
                              var item = {job:job,trip:tripDetails,tripData:tripData,contractTask: contractTask,invoice:invoice,tripStates : response.data};
                              $scope.jobInvoiceTripList.push(item);
                              if(item.invoice.status == $scope.invoiceTypes.submitted.value){
                                $scope.approveAllInvoiceList.push(item);
                                $scope.createdCount = $scope.createdCount + 1;
                                $scope.createdTotalAmount = $scope.createdTotalAmount + item.invoice.total_amount;
                                $scope.createdTotalPackages = $scope.createdTotalPackages + item.job.number_of_packages;
                              }
                             //console.log(JSON.stringify($scope.jobInvoiceTripList));

                            }
                          });
                        }
                      });
                    }
                  });
                }
              });    
            }
          });
          });
        }else{
          $scope.errorMessage = "No Jobs Found.!";
        }
      }else{
        $scope.errorMessage = "Some thing went wrong. Try Again !";
      }
    });

console.log(JSON.stringify($scope.jobInvoiceTripList));

    }

    
    $scope.approveInvoice = function(item){
      $scope.invoiceTobeApproved = item;
      $("#centerModal").modal("toggle");
    }

    $scope.approveModalInvoice = function(){
      var item = $scope.invoiceTobeApproved;
      invoiceService.updateInvoiceState(item.invoice.id,$scope.invoiceTypes.approved.value,
        $scope.model.profile.username,$scope.model.profile.organizationId)
        .then(function(response){
          if(response.status == 201){
            $("#centerModal").modal("toggle");
            $location.path('/accountPayable/invoice/'+'ALL'+'/Invoice Approved Successfully !');
          }else{
            $scope.errorMessage = "Unable to Approve Invoice. Try Again !";
          }
      });
      
    }

    $scope.approveAllInvoice = function(){
      $("#approveAllModal").modal("toggle");
    }

    $scope.approveAllInvoiceModal = function(){

      var submitCount = 0;

      angular.forEach($scope.approveAllInvoiceList, function(item, key) {
        invoiceService.updateInvoiceState(item.invoice.id,$scope.invoiceTypes.approved.value,
          $scope.model.profile.username,$scope.model.profile.organizationId)
          .then(function(response){
            if(response.status == 201){
              submitCount = submitCount + 1;
              //$("#centerModal").modal("toggle");
              //location.path('/accountReceivable/invoice/'+'ALL'+'/Invoice Submitted Successfully !');
            }
            if(key + 1 == $scope.jobInvoiceTripList.length){
              $("#approveAllModal").modal("toggle");
              $timeout(function(){
              if(submitCount == $scope.jobInvoiceTripList.length){
                $location.path('/accountPayable/invoice/'+'ALL'+'/All Invoices Approved Successfully !');
              }else{
                $location.path('/accountPayable/invoice/'+'ALL'+'/One or More Invoice not  Approved. Please Try again !');
              }
              }, 1000);
            }
        });        
      });
    }

      


}]);
angular.module('inloopAppApp')
  .controller('accountReceivableController', ["$scope", "$timeout", "$stateParams", "$location", "sharedProperties", "completeModel", "contractTaskService", "jobService", "tripService", "invoiceService", function ($scope,$timeout,$stateParams,$location,sharedProperties,completeModel,contractTaskService,jobService,tripService,invoiceService) {

  	$scope.initialize = function(){
  		if(completeModel.getCompleteModel() != undefined){
  			$scope.model = completeModel.getCompleteModel();
  		}

/*      if($stateParams != undefined){
        if($stateParams.jobType != undefined){

        }
      }*/
    $scope.invoiceTypes = sharedProperties.getInvoiceType();
      $scope.createdCount = 0;
      $scope.createdTotalAmount = 0;
      $scope.createdTotalPackages = 0;
      $scope.submitAllInvoiceList = [];

    if($stateParams.invoiceType != undefined){
      if($stateParams.invoiceType == 'ALL'){
        $scope.invoiceType = $scope.invoiceTypes.created.value+','+
                             $scope.invoiceTypes.submitted.value+','+
                             $scope.invoiceTypes.approved.value+','+
                             $scope.invoiceTypes.paid.value+','+
                             $scope.invoiceTypes.archieved.value;
      }else{
        $scope.invoiceType = $stateParams.invoiceType;
      }
  	}

    if($stateParams.message != undefined){
      $scope.errorMessage = $stateParams.message;
    }

    console.log($scope.invoiceType);
    $scope.payerId = $scope.model.profile.organizationid;

    

    invoiceService.getAllInvoicesByPayerIdAndStatus
    ($scope.payerId,$scope.invoiceType)
    .then(function(response){
      if(response.status == 200){
        if(response.data.length != 0){

          $scope.jobInvoiceTripList = [];

          angular.forEach(response.data, function(value, key) {
            var invoice = value;

            contractTaskService.getContractTaskById(invoice.contract_tasks[0]).then(function(response){
              if(response.status == 200){
                var contractTask = response.data;
                //var jobId = response.data.jobid;
                var jobId = 119 + key;
                var tripId = 1 + key;
                jobService.getJobDetailByJobId(jobId).then(function(response){
                if(response.status == 200){
                  var job = response.data;
                  //var tripId = response.data.trips[0];
                  tripService.getTripDetailsbyId(tripId).then(function(response){
                    if(response.status == 200){
                      var tripDetails = response.data;
                      tripService.getTripDataByTripId(tripId).then(function(response){
                        if(response.status == 200){
                          var tripData = response.data;
                          tripService.getTripStatesByTripId(tripId).then(function(response){
                            if(response.status == 200){
                              var item = {job:job,trip:tripDetails,tripData:tripData,contractTask: contractTask,invoice:invoice,tripStates : response.data};
                              $scope.jobInvoiceTripList.push(item);
                              if(item.invoice.status == $scope.invoiceTypes.submitted.value){
                                $scope.approveAllInvoiceList.push(item);
                                $scope.createdCount = $scope.createdCount + 1;
                                $scope.createdTotalAmount = $scope.createdTotalAmount + item.invoice.total_amount;
                                $scope.createdTotalPackages = $scope.createdTotalPackages + item.job.number_of_packages;
                              }
                             // console.log(JSON.stringify($scope.jobInvoiceTripList));
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });    
            }
          });
          });
        }else{
          $scope.errorMessage = "No Jobs Found.!";
        }
      }else{
        $scope.errorMessage = "Some thing went wrong. Try Again !";
      }
    });



    }

    
    $scope.submitInvoice = function(item){
      $scope.invoiceTobeSubmitted = item;
      $("#centerModal").modal("toggle");
    }

    $scope.submitModalInvoice = function(){
      var item = $scope.invoiceTobeSubmitted;
      invoiceService.updateInvoiceState(item.invoice.id,$scope.invoiceTypes.submitted.value,
        $scope.model.profile.username,$scope.model.profile.organizationId)
        .then(function(response){
          if(response.status == 201){
            $("#centerModal").modal("toggle");
            $location.path('/accountReceivable/invoice/'+'ALL'+'/Invoice Submitted Successfully !');
          }else{
            $scope.errorMessage = "Unable to Submit Invoice. Try Again !";
          }
      });
      
    }

    $scope.submitAllInvoice = function(){
      $("#submitAllModal").modal("toggle");
    }

    $scope.submitAllInvoiceModal = function(){

      var submitCount = 0;

      angular.forEach($scope.submitAllInvoiceList, function(item, key) {
        invoiceService.updateInvoiceState(item.invoice.id,$scope.invoiceTypes.submitted.value,
          $scope.model.profile.username,$scope.model.profile.organizationId)
          .then(function(response){
            if(response.status == 201){
              submitCount = submitCount + 1;
              //$("#centerModal").modal("toggle");
              //location.path('/accountReceivable/invoice/'+'ALL'+'/Invoice Submitted Successfully !');
            }
            if(key + 1 == $scope.jobInvoiceTripList.length){
              $("#submitAllModal").modal("toggle");
              $timeout(function(){
              if(submitCount == $scope.jobInvoiceTripList.length){
                $location.path('/accountReceivable/invoice/'+'ALL'+'/All Invoices Submitted Successfully !');
              }else{
                $location.path('/accountReceivable/invoice/'+'ALL'+'/One or More Invoice Submission Falied. Please Submit again !');
              }
              }, 1000);
            }
        });        
      });
    }

      


}]);
'use strict';

/**
 * @ngdoc function
 * @name inloopAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the inloopAppApp
 */
angular.module('inloopAppApp')
  .controller('AboutCtrl', ["$scope", function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
