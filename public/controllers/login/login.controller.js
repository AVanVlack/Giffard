'use strict';

angular.module('Gifard')
  .controller('LoginCtrl',  ['$scope', 'Auth', function($scope, Auth){
    var user = Auth.getCurrentUser();
    console.log(user);
    $scope.me = 'Andrew';
  }]);
