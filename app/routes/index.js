/*jslint node: true */
'use strict';

var path = process.cwd();
var auth = require(path + '/app/config/auth.service.js');

module.exports = function (app, passport) {

	require(path + '/app/routes/user.js')(app, passport);

	app.route('/api/:id')
		.get(auth.isAuthenticated, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {failureRedirect: '/login'}),
		auth.setTokenCookie);

	app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(function(req, res){
		 res.send(404);
	 });

	app.route('/*')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});
};
