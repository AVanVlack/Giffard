/*jslint node: true */
'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
const morgan = require('morgan')

var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);
app.use(morgan('dev'));
app.use(favicon('./public-src/favicon.ico'));
app.use('/public', express.static('./public'));

app.use(cookieParser());
app.use(passport.initialize());

routes(app);

var port = process.env.PORT || 8080;
app.listen(port, function () {
	console.log('Node.js listening on port ' + port + '...');
})
