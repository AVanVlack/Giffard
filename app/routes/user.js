/*jslint node: true */
'use strict';
var path = process.cwd();
var user = require(path + '/app/controllers/userController.js')

module.exports = function (app, passport) {
  app.route('/user/me').get(user.me);
};
