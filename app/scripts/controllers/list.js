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

    $scope.getData = function()
    {
      lotoData.getData(function(getted, rows){
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
