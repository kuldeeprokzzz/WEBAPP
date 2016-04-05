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
  })
  
