'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon')
var browserSync = require('browser-sync');

//build task.
gulp.task('default', function() {

});

//start server with live-update and babel.
gulp.task('serve', ['browser-sync'], function(){
});

//build and send to heroku.
gulp.task('heroku', function(){

});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:8080",
        files: ["public/**/*.*"],
        browser: "google chrome",
        port: 7000,
	});
});

gulp.task('nodemon', function (cb) {

	var started = false;

	return nodemon({
		script: 'server.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true;
		}
	});
});

//server - babel > nodemon
//front - jade > sass > browser-sync
