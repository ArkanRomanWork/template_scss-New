var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps');


var plumber = require('gulp-plumber');

gulp.task('styles', function () {
    return gulp.src('app/styles/scss/**/**.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
        }))
        .pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
        .pipe(sourcemaps.write('../maps/'))
        .pipe(gulp.dest('app/styles/css'))

});


var watch = require('gulp-watch');
gulp.task('watch', function () {
    gulp.watch('app/styles/scss/**/**.scss', ['styles']);

});

gulp.task('default', ['styles', 'watch']);
