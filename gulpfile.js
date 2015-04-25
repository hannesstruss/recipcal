var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    livereload = require('gulp-livereload'),
    del = require('del');

gulp.task('styles', function() {
  return sass('src/styles/main.sass', {style: 'expanded'})
    .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('src/styles/**/*.sass', ['styles']);
  gulp.watch(['dist/**']).on('change', livereload.changed);
});
