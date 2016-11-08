import angular from 'angular';
import uiRouter from 'angular-ui-router';
import settingsCtrl from './settings.controller';
//import homeComponent from './home.component';

let settingsModule = angular.module('settings', [
  uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {

  $stateProvider
    .state('settings', {
      url: '/settings',
      controller: settingsCtrl,
      template: require('./settings.jade')
    });
})

export default settingsModule;
