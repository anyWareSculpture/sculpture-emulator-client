var es = require('event-stream');

var gulp = require('gulp');

var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var addsrc = require('gulp-add-src');
var iife = require("gulp-iife");
var runSequence = require('run-sequence');
var bowerFiles = require('bower-files')();
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

var gulpUtils = require('./lib/shared/gulp-utils');

gulp.task('default', function(callback) {
  return runSequence('clean', 'lint', 'test', 'css', 'build', callback);
});

gulp.task('build', function build(callback) {
  return runSequence('build-dependencies', 'build-app', callback);
});

gulp.task('build-dependencies', buildDependencies);
function buildDependencies() {
  return gulp.src(['src/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(iife({useStrict: false}))
    .pipe(concat('app.js'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(sourcemaps.write("sourcemaps"))
    .pipe(gulp.dest(gulpUtils.getDistPath()));
}

gulp.task('build-app', buildApp);
function buildApp() {
  return gulp.src(bowerFiles.ext('js').files)
    .pipe(sourcemaps.init())
    .pipe(concat('dependencies.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write("sourcemaps"))
    .pipe(gulp.dest(gulpUtils.getDistPath()));
}

gulp.task('css', buildCSS);
function buildCSS() {
  return gulp.src('styles/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(gulpUtils.getDistPath('css')));
}

gulp.task('clean', function clean(callback) {
  gulpUtils.removeDistFiles(callback);
});

gulp.task('lint', function lint() {
  // stub
});

gulp.task('test', function test() {
  // stub
});
