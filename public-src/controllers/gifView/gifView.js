import angular from 'angular';
import uiRouter from 'angular-ui-router';
import gifViewCtr from './gifView.controller';
//import homeComponent from './home.component';

let gifViewModule = angular.module('gifView', [
  uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {

  $stateProvider
    .state('gifView', {
      url: '/g',
      controller: gifViewCtr,
      template: require('./gifView.jade')
    });
})

export default gifViewModule;
