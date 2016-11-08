import angular from 'angular';
import uiRouter from 'angular-ui-router';
import mainCtrl from './main.controller';
//import homeComponent from './home.component';

let homeModule = angular.module('home', [
  uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      controller: mainCtrl,
      template: require('./main.jade')
    });
})

export default homeModule;
