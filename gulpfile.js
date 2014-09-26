'use strict';

/********************************
*********************************
			VARS
*********************************
*********************************/

var gulp = require('gulp'),
	header = require('gulp-header'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	processhtml = require('gulp-processhtml'),
	path = require('path'),
	autoprefixer = require('gulp-autoprefixer'),
	concatCss = require("gulp-concat-css"),
	minifyCss = require("gulp-minify-css"),
	less = require('gulp-less'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require("gulp-rename"),
	notify = require("gulp-notify"),
	plumber = require('gulp-plumber'),

	pkg = require('./package.json'),

	banner = ['/**',
  ' * <%= pkg.author %>',
  ' * <%= pkg.name %> v<%= pkg.version %>',
  ' */',
  ''].join('\n');


/********************************
*********************************
			TASKS
*********************************
*********************************/

gulp.task('default', ['build', 'watch']);

gulp.task('release', ['prepareProject', 'build']);
gulp.task('build', ['processStyles', 'processScripts', 'processHtml']);

gulp.task('processHtml', processHtml);

gulp.task('processScripts', processJs);
gulp.task('processStyles', ['buildLess', 'processCss']); // async: first, build LESS files then process css
gulp.task('buildLess', buildLess);
gulp.task('processCss', ['buildLess'], processCss);

gulp.task('prepareProject', ['processImages', 'copyFonts', 'copyVendorJs', 'copyIE6', 'copyFavicon']);
gulp.task('processImages', processImages);
gulp.task('copyFonts', copyFonts);
gulp.task('copyVendorJs', copyVendorJs);
gulp.task('copyIE6', copyIE6);
gulp.task('copyFavicon', copyFavicon);

gulp.task('watch', watch);
gulp.task('watchHtml', watchHtml);
gulp.task('watchImages', watchImages);
gulp.task('watchFonts', watchFonts);
gulp.task('watchCss', watchCss);
gulp.task('watchLess', watchLess);
gulp.task('watchJs', watchJs);
gulp.task('watchIE6', watchIE6);
gulp.task('watchFavicon', watchFavicon);
gulp.task('watchVendorJs', watchVendorJs);

/********************************
*********************************
			FUNCTIONS
*********************************
*********************************/

/* Helpers */

function getNotifySettings(message) {
	var date = new Date(),
		time = date.toTimeString().split(' ')[0];
	return {
		message: message +  " @ <%= options.time %>",
		onLast: true,
		templateOptions: {
			time: time
		}
	}
}

function getNotifyDetailedSettings(message) {
	var date = new Date(),
		time = date.toTimeString().split(' ')[0];
	return {
		message: message +  ": <%= file.relative %> @ <%= options.time %>",
		templateOptions: {
			time: time
		}
	}
}

/* Process something */

function processHtml() {
	gulp.src('src/index.html')
		.pipe(plumber())
		.pipe(processhtml('index.html'))
		.pipe(gulp.dest('./'))
		.pipe(notify(getNotifySettings('Processed html')));
}

function buildLess() {
	return gulp.src('src/css/main.less')
		.pipe(less())
		.pipe(gulp.dest('src/css'))
		.pipe(notify(getNotifyDetailedSettings('Builded LESS')));
}

function processCss() {
	gulp.src([
			'src/css/**/*.css'
		]).pipe(plumber())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(concatCss("bundle.css"))
		.pipe(minifyCss())
		.pipe(rename('bundle.min.css'))
		.pipe(header(banner, { pkg : pkg } ))
		.pipe(gulp.dest('css'))
		.pipe(notify(getNotifyDetailedSettings('Processed css')));
}

function processJs() {
	gulp.src([
			'src/js/main.js'
		]).pipe(plumber())
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
		.pipe(uglify())
		.pipe(concat('app.min.js'))
		.pipe(header(banner, { pkg : pkg } ))
		.pipe(gulp.dest('js'))
		.pipe(notify(getNotifyDetailedSettings('Processed js')));
}

function processImages() {
	gulp.src('src/img/**/*.*')
		.pipe(plumber())
		.pipe(gulp.dest('img'))
		// TODO: add some optimizer
		.pipe(notify(getNotifyDetailedSettings('Processed Images')));
}

/* Copy only tasks */

function copyFonts() {
	gulp.src('src/css/fonts/**/*.*')
		.pipe(plumber())
		.pipe(gulp.dest('css/fonts'))
		.pipe(notify(getNotifySettings('Copied Fonts')));
}

function copyVendorJs() {
	gulp.src(['src/js/vendor/*.js'])
		.pipe(gulp.dest('js/vendor'))
		.pipe(notify(getNotifySettings('Copied vendor js')));
}

function copyIE6() {
	gulp.src(['src/ie6/**/*'])
		.pipe(gulp.dest('ie6'))
		.pipe(notify(getNotifySettings('Copied ie6 files')));
}

function copyFavicon() {
	gulp.src(['src/favicon.ico'])
		.pipe(gulp.dest('./'))
		.pipe(notify(getNotifySettings('Copied favicon')));
}

/* Watch tasks */

function watchHtml() {
	gulp.watch('src/*.html', ['processHtml']);
}

function watchImages() {
	gulp.watch('src/img/*', ['processImages']);
}

function watchFonts() {
	gulp.watch('src/css/fonts/**/*.*', ['copyFonts']);
}

function watchLess() {
	gulp.watch('src/css/*.less', ['buildLess']);
}

function watchCss() {
	gulp.watch('src/css/*.css', ['copyCss']);
}

function watchVendorJs() {
	gulp.watch('src/js/vendor/*.js', ['copyVendorJs']);
}

function watchIE6() {
	gulp.watch('src/ie6/*', ['watchIE6']);
}

function watchFavicon() {
	gulp.watch('src/favicon.ico', ['watchFavicon']);
}

function watchJs() {
	gulp.watch('src/js/*.js', ['processJs']);
}

function watch() {
	gulp.run(['watchHtml', 'watchImages', 'watchFonts', 'watchCss', 'watchJs', 'watchVendorJs', 'watchIE6', 'watchFavicon', 'watchLess']);
}

function notifyChanges(event){
	notify(event.path+' -> '+event.type);
}