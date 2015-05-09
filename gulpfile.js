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
    .pipe(gulp.dest('dist/assets/css'));
});

var bundle = watchify(browserify(assign(watchify.args, {
  entries: ['./src/js/main.js'],
  debug: true
})));

bundle = bundle
  .transform(babelify)
  .transform(reactify);

function bundle_js() {
  return bundle
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/assets/js'));
}

gulp.task('js', bundle_js);
bundle.on('update', bundle_js);
bundle.on('log', gutil.log);

gulp.task('watch', function() {
  livereload.listen();
  gulp.start('js');
  gulp.watch('src/styles/**/*.sass', ['styles']);
  gulp.watch(['dist/**']).on('change', livereload.changed);
});

gulp.task('test', function() {
  return gulp.src('spec/**/*.js')
    .pipe(jasmine());
});
