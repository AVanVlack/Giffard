import 'foundation-sites/dist/foundation.min.css';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import controllers from './controllers/controllers';
import auth from './components/auth/service.auth';
import authInterceptor from './components/auth/interceptor.service';
import './style.scss';


angular.module('Giffard', [
  ngResource,
  ngCookies,
  uiRouter,
  controllers.name
])
.service('authInterceptor', authInterceptor)
.service('auth', auth)
.config(($locationProvider, $httpProvider) => {
  
  $locationProvider.html5Mode(true);
  $httpProvider.interceptors.push('authInterceptor');
})
.run(($rootScope, $location, auth) => {
  // Redirect to login if route requires auth and you're not logged in
  $rootScope.$on('$stateChangeStart', function (event, next) {
    console.log('routechange')
    auth.isLoggedInAsync(function(loggedIn) {
      if (next.authenticate && !loggedIn) {
        $location.path('/login');
      }
    });
  });
});
