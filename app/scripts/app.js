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
      templateUrl: "../views/billing.html",
      controller: 'accountPayableController',
    })
    .state('provisioning', {
      url: "/provisioning",
      templateUrl: "../views/provisioning.html",
    })
  })
  .config(function ($provide, $httpProvider,localStorageServiceProvider) {
  
  // Intercept http calls to add session token in the header.
  // this also checks for session expiry and log's out if session has expired
  $provide.factory('sessionInterceptor', function (localStorageService,$location) {
    return {
      
      request: function (config) {
        var model = localStorageService.get('completeModel');
        if(new Date() - new Date(model.loginTime) > model.tokenTime){
          localStorageService.clearAll();
          console.log('user session time out');
          $location.path('/');
        }
        if(config.url.indexOf('api') != -1){
          if(config.url.indexOf('login') != -1){
            config.headers['Authorization'] = 'Token 3562QEQQ%$&898921@';
            //completeModel.getCompleteModel().accessToken
          }
        }
        return config;
      },
    };
  });

  // Add the interceptor to the $httpProvider.
  $httpProvider.interceptors.push('sessionInterceptor');

});

  
