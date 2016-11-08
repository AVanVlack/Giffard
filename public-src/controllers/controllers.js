import angular from 'angular';
import main from './main/main';
import gifView from './gifView/gifView';
import categories from './categories/categories'
import profile from './profile/profile'
import settings from './settings/settings'
import upload from './upload/upload'

export default angular.module('app.components', [
  main.name,
  gifView.name,
  categories.name,
  profile.name,
  settings.name,
  upload.name
]);
