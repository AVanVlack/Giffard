import angular from 'angular';
import main from './main/main';
import gifView from './gifView/gifView';
import categories from './categories/categories'

export default angular.module('app.components', [
  main.name,
  gifView.name,
  categories.name
]);
