'use strict';

/**
 * @ngdoc function
 * @name lotoApp.controller:ForecastCtrl
 * @description
 * # ForecastCtrl
 * Controller of the lotoApp
 */
angular.module('lotoApp')
  .controller('ForecastCtrl', function ($scope, $filter, lotoData) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'smart-table'
    ];

    $scope.rowCollection = [
        {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
        {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
        {firstName: 'Francoise', lastName: 'Frere', birthDate: new Date('1955-08-27'), balance: 42343, email: 'raymondef@gmail.com'}
    ];

    $scope.getters={
        firstName: function (value) {
            //this will sort by the length of the first name string
            return value.firstName.length;
        }
    }

    $scope.hoges = [{id:0, val:12 }, {id:1, val:11}];
    $scope.rows = [];

    $scope.clearData = function()
    {
      $scope.rows = null;  
    };
    
    $scope.getData = function()
    {
      lotoData.getForecast(function(getted, rows){
        if(getted){
          $scope.rows = rows;
        }
        $scope.refreshData();
      });
    };
    
    $scope.refreshData = function(){
        // 強制的にデータを反映
        if(!$scope.$$phase){
//            $scope.$apply(function () {
//                $scope.target = 'value';
//            });
            $scope.$apply();
        }
    };
  });
