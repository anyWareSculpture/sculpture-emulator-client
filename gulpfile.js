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
var mocha = require('gulp-spawn-mocha');
var eslint = require('gulp-eslint');

var gulpUtils = require('./lib/shared/gulp-utils');

gulp.task('default', function(callback) {
  return runSequence('clean', 'lint', 'test', 'css', 'templates', 'build', callback);
});

gulp.task('build', function build(callback) {
  return runSequence('build-dependencies', 'build-app', 'build-index', callback);
});

gulp.task('build-dependencies', function buildDependencies() {
  return gulp.src(['src/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(iife({useStrict: false}))
    .pipe(concat('app.js'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(sourcemaps.write("sourcemaps"))
    .pipe(gulp.dest(gulpUtils.getDistPath()));
});

gulp.task('build-app', function buildApp() {
  return gulp.src(bowerFiles.ext('js').files)
    .pipe(sourcemaps.init())
    .pipe(concat('dependencies.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write("sourcemaps"))
    .pipe(gulp.dest(gulpUtils.getDistPath()));
});

gulp.task('build-index', function buildIndex() {
  return gulp.src('index.html')
    .pipe(gulp.dest(gulpUtils.getDistPath()));
});

gulp.task('templates', function templates() {
  return gulp.src('templates/**/*.html')
    .pipe(gulp.dest(gulpUtils.getDistPath('templates')));
});

gulp.task('css', function buildCSS() {
  return gulp.src('styles/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(gulpUtils.getDistPath('css')));
});

gulp.task('clean', function clean(callback) {
  gulpUtils.removeDistFiles(callback);
});

gulp.task('lint', function lint() {
  return gulp.src(["src/**/*.js", "test/**/*.js"])
    .pipe(eslint('lib/shared/.eslintrc'))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('test', function test() {
  return gulp.src('test/**/*-test.js', {read: false})
    .pipe(mocha({
      reporter: process.env.TRAVIS ? 'spec' : 'nyan',
      compilers: 'js:babel/register'
    }));
});
