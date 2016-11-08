/*jshint esversion: 6 */
'use strict';

let path = process.cwd();
const authRouter = require(path + '/app/routes/auth');
const userRouter = require(path + '/app/routes/user');
const imagesRouter = require(path + '/app/routes/images');
const gifRouter = require(path + '/app/routes/gifs');

module.exports = function (app) {
	app.use('/auth', authRouter);
	app.use('/gif', gifRouter);
	app.use('/api/user', userRouter);
	app.use('/image', imagesRouter);

	//fix token route in angular to /api/user/...

	/****** All other case routes ******/

	app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get((req, res) => res.sendStatus(404));

	app.route('/*')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		})
};
