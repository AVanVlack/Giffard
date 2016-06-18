
angular.module('Gifard', ['ngRoute', 'ngCookies', 'ngResource'])
  .config(['$routeProvider', '$locationProvider','$httpProvider',
    function($routeProvider, $locationProvider, $httpProvider) {
      $routeProvider
        .when('/login', {
          templateUrl: '/public/controllers/login/login.html',
          controller: 'LoginCtrl'
        })
        .when('/u', {
          templateUrl: '/public/controllers/profile/profile.html',
          controller: 'ProfileCtrl',
          authenticate: false
        })
        .when('/', {
          templateUrl: '/public/controllers/main/main.html',
          controller: 'MainCtrl'
        })
        .when('/settings', {
          templateUrl: '/public/controllers/settings/settings.html',
          controller: 'SettingsCtrl',
          authenticate: false
        })
        .when('/g', {
          templateUrl: '/public/controllers/gifView/gifView.html',
          controller: 'gifViewCtrl',
        })
        .when('/categories', {
          templateUrl: '/public/controllers/categories/categories.html',
          controller: 'categoriesCtrl'
        })
        .when('/upload', {
          templateUrl: '/public/controllers/upload/upload.html',
          controller: 'uploadCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });

        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');
      }
    ])

  .factory('authInterceptor', ['$rootScope', '$q', '$cookies', '$location', function ($rootScope, $q, $cookies, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookies.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookies.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        var deferred = $q.defer();
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookies.remove('token');
          return deferred.reject(response);
        }
        else {
          return deferred.reject(response);
        }
      }
    };
  }])

  .run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        console.log(loggedIn);
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  }])
