import angular from 'angular';
import uiRouter from 'angular-ui-router';
import profileCtrl from './profile.controller';
//import homeComponent from './home.component';

let profileModule = angular.module('profile', [
  uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {

  $stateProvider
    .state('profile', {
      url: '/profile',
      controller: profileCtrl,
      template: require('./profile.jade')
    });
})

export default profileModule;
