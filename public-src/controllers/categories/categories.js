import angular from 'angular';
import uiRouter from 'angular-ui-router';
import categoriesCtrl from './categories.controller';


let categoriesModule = angular.module('categories', [
  uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {

  $stateProvider
    .state('categories', {
      url: '/categories',
      controller: categoriesCtrl,
      template: require('./categories.jade')
    });
})

export default categoriesModule;
