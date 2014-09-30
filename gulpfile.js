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
	gulpif = require('gulp-if'),

	imagemin = require('gulp-imagemin'),
	pngcrush = require('imagemin-pngcrush'),

	connect = require('gulp-connect'),

	pkg = require('./package.json'),

	banner = ['/**',
  ' * <%= pkg.author %>',
  ' * <%= pkg.name %> v<%= pkg.version %>',
  ' */',
  ''].join('\n');

var config = {
	image: {
		minimize: true // https://github.com/sindresorhus/gulp-imagemin
	},
	css: {
		minify: false 	// TODO: DO NOT WORK WITH MIXIN
						//.inlineblock (display: inline-block removed after minification).
						// NEED SOME FIX!
	},
	server: {
		copy: true, // Copy to local server
		path: 'c:/WebServers/home/localhost/warproject'
	}
};


/********************************
*********************************
			TASKS
*********************************
*********************************/

gulp.task('help', help);
gulp.task('connectToDevServer', connectToDevServer);

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

/* Help */

function help(){
	console.log(command.help());
}

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
		.pipe(gulpif(config.server.copy, gulp.dest(config.server.path)))
		.pipe(notify(getNotifySettings('Processed html')))
		.pipe(connect.reload());

}

function buildLess() {
	return gulp.src('src/css/main.less')
		.pipe(less())
		.pipe(gulp.dest('src/css'))
		.pipe(gulpif(config.server.copy, gulp.dest(config.server.path + '/src/css')))
		.pipe(notify(getNotifyDetailedSettings('Builded LESS')))
		.pipe(connect.reload());
}

function processCss() {
	gulp.src([
			'src/css/normalize.css',
			'src/css/main.css',
		]).pipe(plumber())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(concatCss("bundle.css"))
		.pipe(gulpif(config.css.minify, minifyCss()))
		.pipe(rename('bundle.min.css'))
		.pipe(header(banner, { pkg : pkg } ))
		.pipe(gulp.dest('css'))
		.pipe(gulpif(config.server.copy, gulp.dest(config.server.path + '/css')))
		.pipe(notify(getNotifyDetailedSettings('Processed css')))
		.pipe(connect.reload());
}

function processJs() {
	
	gulp.src([
			'src/js/plugins/jquery.mousewheel.js',
			'src/js/plugins/pxgradient-1.0.3.js',
			'src/js/namespace.js',
			'src/js/plugins/jstools.js',
			'src/js/eventlist.js',
			'src/js/state.js',
        	'src/js/controls/popup.zamerschik.js',
        	'src/js/controls/popup.installment.js',
        	'js/controls/popup.callback.js',
			'src/js/controls/button.js',
			'src/js/controls/menu.js',
			'src/js/controls/slider.js',
			'src/js/app.js',
			'src/js/main.js'
		]).pipe(plumber())
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
		.pipe(uglify())
		.pipe(concat('app.min.js'))
		.pipe(header(banner, { pkg : pkg } ))
		.pipe(gulp.dest('js'))
		.pipe(gulpif(config.server.copy, gulp.dest(config.server.path + '/js')))
		.pipe(notify(getNotifyDetailedSettings('Processed js')))
		.pipe(connect.reload());
}

function processImages() {
	gulp.src('src/img/**/*.*')
		.pipe(plumber())
		.pipe(gulp.dest('img'))
		.pipe(gulpif(config.image.minimize, imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngcrush()]
		})))
		.pipe(gulpif(config.image.minimize, gulp.dest('img')))
		.pipe(gulpif(config.server.copy, gulp.dest(config.server.path + '/img')))
		.pipe(notify(getNotifyDetailedSettings('Processed Images')))
		.pipe(connect.reload());
}

/* Copy only tasks */

function copyFonts() {
	gulp.src('src/css/fonts/**/*.*')
		.pipe(plumber())
		.pipe(gulp.dest('css/fonts'))
		.pipe(gulpif(config.server.copy, gulp.dest(config.server.path + '/css/fonts')))
		.pipe(notify(getNotifySettings('Copied Fonts')))
		.pipe(connect.reload());
}

function copyVendorJs() {

	gulp.src(['node_modules/jquery-mousewheel/jquery.mousewheel.js '])
		.pipe(gulp.dest('src/js/plugins/'))
		.pipe(gulpif(config.server.copy, gulp.dest(config.server.path + '/src/js/plugins/')))
		.pipe(notify(getNotifyDetailedSettings('Copied js plugins')));

	gulp.src(['src/js/vendor/*.js'])
		.pipe(gulp.dest('js/vendor'))
		.pipe(gulpif(config.server.copy, gulp.dest(config.server.path + '/js/vendor')))
		.pipe(notify(getNotifySettings('Copied vendor js')))
		.pipe(connect.reload());
}

function copyIE6() {
	gulp.src(['src/ie6/**/*'])
		.pipe(gulp.dest('ie6'))
		.pipe(gulpif(config.server.copy, gulp.dest(config.server.path + '/ie6')))
		.pipe(notify(getNotifySettings('Copied ie6 files')))
		.pipe(connect.reload());
}

function copyFavicon() {
	gulp.src(['src/favicon.ico'])
		.pipe(gulp.dest('./'))
		.pipe(gulpif(config.server.copy, gulp.dest(config.server.path)))
		.pipe(notify(getNotifySettings('Copied favicon')))
		.pipe(connect.reload());
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
	gulp.watch(['src/css/*.less', 'src/css/**/*.less', 'src/css/**/**/*.less'], ['buildLess']);
}

function watchCss() {
	gulp.watch('src/css/*.css', ['processCss']);
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
	gulp.watch('src/js/*.js', ['processScripts']);
}

function watch() {
	gulp.run(['watchHtml', 'watchImages', 'watchFonts', 'watchCss', 'watchJs', 'watchVendorJs', 'watchIE6', 'watchFavicon', 'watchLess']);
}

function notifyChanges(event){
	notify(event.path+' -> '+event.type);
}

function connectToDevServer() {
	connect.server({
		root: './src',
		livereload: true
	});
};