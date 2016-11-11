import angular from 'angular';
import uiRouter from 'angular-ui-router';
import mainCtrl from './main.controller';
import tags from './tags.directive';
//import homeComponent from './home.component';

let homeModule = angular.module('main', [
  uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('main', {
      url: '/',
      controller: mainCtrl,
      controllerAs: 'main',
      template: require('./main.jade')
    });
})

.directive('tag', tags)

export default homeModule;
