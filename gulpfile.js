/*jslint node: true */
'use strict';

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    watchify = require('watchify'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    assign = require('lodash').assign,
    jasmine = require('gulp-jasmine');

gulp.task('styles', function() {
  return sass('src/styles/main.sass', {style: 'expanded'})
    .pipe(gulp.dest('build/assets/css'));
});

gulp.task('static', function() {
  gulp.src(['src/static/**/*']).pipe(gulp.dest('build'));
});

var bundle = browserify(assign(watchify.args, {
  entries: ['./src/js/main.js'],
  debug: true
}));

var bundle = bundle
    .transform(babelify)
    .transform(reactify);


function bundle_js(bundle) {
  return bundle
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/assets/js'));
}

var watchified_bundle;
function bundle_js_watchify() {
  // If we call watchify(bundle) more than once (on each run), memory leaks. If we
  // call it in global scope, all tasks never exit.
  if (!watchified_bundle) {
    watchified_bundle = watchify(bundle);
  }
  return bundle_js(watchified_bundle);
}

function bundle_js_once() {
  return bundle_js(bundle);
}

gulp.task('watch_js', bundle_js_watchify);
gulp.task('js', bundle_js_once);
bundle.on('update', bundle_js_watchify);
bundle.on('log', gutil.log);

gulp.task('watch', ['build'], function() {
  livereload.listen();
  gulp.watch('src/styles/**/*.sass', ['styles']);
  gulp.watch('src/static/**/*', ['static']);
  gulp.watch(['build/**']).on('change', livereload.changed);
});

gulp.task('build', ['static', 'js', 'styles']);

gulp.task('test', function() {
  return gulp.src('spec/**/*.js')
    .pipe(jasmine());
});
