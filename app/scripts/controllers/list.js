'use strict';

/**
 * @ngdoc function
 * @name lotoApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the lotoApp
 */
angular.module('lotoApp')
  .controller('ListCtrl', function ($scope, lotoData) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.fetchData = function() {
      lotoData.fetchData();
    };

  });
