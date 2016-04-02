'use strict';

/**
 * @ngdoc function
 * @name inloopAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the inloopAppApp
 */
angular.module('inloopAppApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
