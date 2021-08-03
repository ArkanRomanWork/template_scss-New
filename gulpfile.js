var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var browserSync = require('browser-sync');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var cache = require('gulp-cache');
var del = require('del');
var uglify = require('gulp-uglify');

gulp.task('sass', function(){
  return gulp.src('app/styles/index.scss')
  .pipe(sass())
  .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});

gulp.task('code', function() {
  return gulp.src('app/*.html')
  .pipe(browserSync.reload({ stream: true }))
});

gulp.task('scripts', function() {
  return gulp.src('app/js/*.js')
  .pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function() {
  gulp.watch('app/styles/**/*.scss', gulp.parallel('sass'));
  gulp.watch('app/*.html', gulp.parallel('code'));
  gulp.watch('app/js/*.js', gulp.parallel('scripts'));
});

gulp.task('run', gulp.parallel('sass', 'scripts', 'browser-sync', 'watch'));

gulp.task('clear', function () {
  return cache.clearAll();
});

gulp.task('clean', async function() {
  return del.sync('dist');
});

gulp.task('prebuild', function() {
  var buildCss = gulp.src('app/css/index.css')
  .pipe(cssnano())
  .pipe(gulp.dest('dist/css'))

  var buildFonts = gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))

  var buildJs = gulp.src('app/js/index.js')
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'))

  var buildImg = gulp.src('app/img/**/*')
  .pipe(gulp.dest('dist/img'));

  var buildHtml = gulp.src('app/*.html')
  .pipe(gulp.dest('dist'));
});

gulp.task('build', gulp.parallel('clean', 'prebuild'));
