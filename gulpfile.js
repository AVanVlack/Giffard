'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon')
var browserSync = require('browser-sync');
var babel = require('gulp-babel');
var jade = require('gulp-jade');
var hint = require('gulp-jshint');
var changed = require('gulp-changed');

const DEST = 'dist/';

//build task.
gulp.task('default', function() {

});

//start server with live-update and babel.
gulp.task('serve', ['browser-sync'], function(){
  var templates = gulp.watch(['./public/**/*.jade'], ['jade']);
  var scripts = gulp.watch(['./app/**/*.js', './server.js'], ['babel']);
});

//build and send to heroku.
gulp.task('heroku', function(){

});

gulp.task('jade', function(){
  return gulp.src(['**/*.jade', '!./node_modules/**', '!./dist/**'])
  .pipe(changed(DEST))
  .pipe(jade())
  .pipe(gulp.dest(DEST))
})

gulp.task('babel', function(){
  return gulp.src(['**/*.js', '!./node_modules/**', '!./dist/**', '!gulpfile.js', '!.jshintrc'])
  .pipe(changed(DEST))
  .pipe(hint())
  .pipe(hint.reporter('default'))
  .pipe(babel())
  .pipe(gulp.dest(DEST))
})

gulp.task('copy-other', function(){
  return gulp.src(['public/**', '!public/**/*.jade', '!public/**/*.js'])
  .pipe(changed(DEST + '/public'))
  .pipe(gulp.dest(DEST + '/public'))
});

//start browser-sync
gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:8080",
        files: ["dist/public/**/*.*"],
        browser: "google chrome",
        port: 7000,
	});
});

//start nodemon
gulp.task('nodemon', function (cb) {

	var started = false;

	return nodemon({
		script: 'dist/server.js',
    watch: ['./dist/app', './dist/server.js']
	}).on('start', function () {
		if (!started) {
			cb();
			started = true;
		}
	});
});

//server - babel > nodemon
//front - jade > sass > browser-sync
