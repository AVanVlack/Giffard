/*jslint node: true */
'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');

var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);

app.use(favicon(process.cwd() + '/public/favicon.ico'))

//app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
//app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(cookieParser());
app.use(passport.initialize());

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port, function () {
	console.log('Node.js listening on port ' + port + '...');
});
