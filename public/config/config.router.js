
export default function routes($routeProvider, $locationProvider, $httpProvider) {
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
      templateUrl: require('../controllers/main/main.jade'),
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
      redirectTo: '/hey'
    });

  $locationProvider.html5Mode(true);
  $httpProvider.interceptors.push('authInterceptor');
}
