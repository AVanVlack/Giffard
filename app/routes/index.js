/*jslint node: true */
'use strict';

var path = process.cwd();
// if (process.NODE_ENV == 'development') {
// 	path += '/dist'
// }
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var auth = require(path + '/app/config/auth.service.js');


module.exports = function (app, passport) {

	var clickHandler = new ClickHandler();

	app.route('/api/:id')
		.get(auth.isAuthenticated, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {failureRedirect: '/login'}),
		auth.setTokenCookie);

	// app.route('/logout')
	// 	.get(passport.logout)


	app.route('/api/:id/clicks')
		.get(auth.isAuthenticated, clickHandler.getClicks)
		.post(auth.isAuthenticated, clickHandler.addClick)
		.delete(auth.isAuthenticated, clickHandler.resetClicks);

	app.route('/*')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});
};
