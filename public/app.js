angular.module('GifsApp', ['ngRoute'])
  .config(['$routeProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider
        .when('/login', {
          templateUrl: '/public/controllers/login/login.html',
          controller: 'LoginCtrl',
        })
        .when('/profile', {
          templateUrl: '/public/controllers/profile/profile.html',
          controller: 'ProfileCtrl',
        })
        .otherwise({
          redirectTo: '/login'
        })
      }
    ]);
