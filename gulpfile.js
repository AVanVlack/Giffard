'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon')
var browserSync = require('browser-sync');
var babel = require('gulp-babel');
var jade = require('gulp-jade');
var hint = require('gulp-jshint');
var changed = require('gulp-changed');
var env = require('gulp-env');
var del = require('del');
var util = require('gulp-util');

const DEST = __dirname + '/dist/';
const WD = __dirname;
const exclude = ['!' + WD + '/{node_modules,node_modules/**,dist,dist/**,gulpfile.js,.jshintrc,.babelrc,.gitignore,data,data/**}']
const jsFiles = [WD + '/**/*.js'].concat(exclude);
const jadeFiles = [WD + '/**/*.jade'].concat(exclude);
const copyFiles = [WD + '/**/!(*.js|*.jade)', WD + '/.env'].concat(exclude);

//build task.
gulp.task('default', function() {

});

//start server with live-update and babel.
gulp.task('serve', ['browser-sync'], function(){
});

//build and send to heroku.
gulp.task('heroku', function(){

});

gulp.task('clean', function(){
  return del(DEST);
})

gulp.task('watch', function(){
  var templates = gulp.watch(jadeFiles, ['jade']);
  var scripts = gulp.watch(jsFiles, ['babel']);
});

gulp.task('jade', function(){
  return gulp.src(jadeFiles)
  .pipe(changed(DEST))
  .pipe(jade())
  .pipe(gulp.dest(DEST))
})

gulp.task('babel', function(){
  return gulp.src(jsFiles)
  .pipe(changed(DEST))
  .pipe(hint())
  .pipe(hint.reporter('default'))
  .pipe(babel())
  .pipe(gulp.dest(DEST))
  .on('error', util.log);
})

gulp.task('copy-other', function(){
  return gulp.src(copyFiles)
  .pipe(changed(DEST))
  .pipe(gulp.dest(DEST))
});

//start browser-sync
gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:8080",
        files: [DEST + 'public/'],
        browser: "google chrome",
        port: 7000,
	});
});

//start nodemon
gulp.task('nodemon', ['watch'], function (cb) {

	var started = false;

	return nodemon({
		script: 'server.js',
    watch: [DEST + '/app', DEST + '/server.js'],
    cwd: __dirname + '/dist/'
	}).on('start', function () {
		if (!started) {
			cb();
			started = true;
		}
	});
});

//todo
//clean and copy on serve
//add html to watch with jade
