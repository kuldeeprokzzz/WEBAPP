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
  .config(function ($stateProvider, $urlRouterProvider) {
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
    .state('driver', {
      url: "/driver",
      templateUrl: "../views/base.html",
      controller: 'roleManagerController',
    })
    .state('driver.driverCard', {
      url: "/driverCard",
        templateUrl: "../views/driver.html",
        controller: 'driverCardController',
      })
    .state('driver.vehiclePairing', {
      url: "/vehiclePairing",
      templateUrl: "../views/vehiclePairing.html",
      controller : 'driverVehiclePairingController',
    })
    .state('driver.onMyWay', {
      url: "/onMyWay",
      templateUrl: "../views/onMyWay.html",
      controller : 'driverOnMyWayController',
    })
    .state('driver.onMyWayDone', {
      url: "/onMyWayDone",
      templateUrl: "../views/IOTDetectedAndCheckedIn.html",
      controller : 'driverOnMyWayDoneController',
    })
    .state('driver.arrived', {
      url: "/arrived",
      templateUrl: "../views/IOTDetectedAndCheckedIn.html",
      controller : 'driverArrivedController',
    })
    .state('driver.checkedIn', {
      url: "/checkedIn",
      templateUrl: "../views/IOTDetectedAndCheckedIn.html",
      controller : 'driverCheckedInController',
    })
    .state('driver.jobs', {
      url: "/jobs/{jobType}",
      templateUrl: "../views/jobAssgined.html",
      controller : 'driverJobController',
    })
    .state('driver.returning', {
      url: "/returning",
      templateUrl: "../views/IOTDetectedAndCheckedIn.html",
      controller : 'driverReturningToCenterController',
    })
    .state('orchestrator', {
      url: "/orchestrator",
      templateUrl: "../views/base.html",
      controller: 'roleManagerController',
    })
    .state('orchestrator.provisioning', {
      url: "/provisioning/{viewType}/",
        templateUrl: "../views/orchestratorProvisioning.html",
        controller: 'orchestratorProvisioning',
      })
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
    .state('invitation', {
      url: "/invitation",
      templateUrl: "../views/invitation.html",
    })
    .state('validator', {
      url: "/validator",
      templateUrl: "../views/form-validator.html",
    })
    .state('tooltips', {
      url: "/tooltips",
      templateUrl: "../views/tooltips-popovers.html",
    })
    /*.state('driver', {
      url: "/driver",
      templateUrl: "../views/driver.html",
    })*/
    .state('onMyWay', {
      url: "/onMyWay",
      templateUrl: "../views/onMyWay.html",
    })
    .state('proceedToCenter', {
      url: "/proceedToCenter",
      templateUrl: "../views/proceedToCenter.html",
    })
    .state('jobAssigned', {
      url: "/jobAssigned",
      templateUrl: "../views/jobAssgined.html",
    })
    .state('navsNavbar', {
      url: "/navsNavbar",
      templateUrl: "../views/navsNavbar.html",
    })
    .state('driverCheckIn', {
      url: "/driverCheckIn",
      templateUrl: "../views/driverCheckIn.html",
    })
  })
  .config(function ($provide, $httpProvider,localStorageServiceProvider) {
  
  // Intercept http calls to add session token in the header.
  // this also checks for session expiry and log's out if session has expired
  $provide.factory('sessionInterceptor', function (localStorageService,$location) {
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
          if(config.url.indexOf('login') == -1){
            console.log('iamhere');
            config.headers['Authorization'] = 'Token '+model.accessToken;
          }
        }
      }
      }
        return config;
      },
    };
  });

  // Add the interceptor to the $httpProvider.
  $httpProvider.interceptors.push('sessionInterceptor');

});

  
