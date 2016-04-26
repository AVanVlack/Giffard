'use strict';

angular.module('Gifard')
  .controller("ProfileCtrl", ['$scope', function($scope){
    $scope.getMe = function(){
      $scope.me = Auth.getCurrentUser();
    }
  }]);
