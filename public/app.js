import 'foundation-sites/dist/foundation.min.css';
import angular from 'angular';
import ngRoute from 'angular-route';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import controllers from './controllers/controllers';
import './style.scss';


angular.module('Gifard', [
  controllers.name
])

// angular.module('Gifard', [ngRoute, ngCookies, ngResource])
//   .config(routing)
//   .factory(authInterceptor)
//   .controller(MainCtrl)
//   .run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
//     // Redirect to login if route requires auth and you're not logged in
//     $rootScope.$on('$routeChangeStart', function (event, next) {
//       Auth.isLoggedInAsync(function(loggedIn) {
//         console.log(loggedIn);
//         if (next.authenticate && !loggedIn) {
//           $location.path('/login');
//         }
//       });
//     });
//   }])

//import './controllers/main/main.controller.js'
//import './controllers/main/main.jade'
