var es = require('event-stream');

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require("babelify");
var through = require('through2');

var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var addsrc = require('gulp-add-src');
var iife = require("gulp-iife");
var runSequence = require('run-sequence');
var bowerFiles = require('bower-files')();
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var mocha = require('gulp-spawn-mocha');
var eslint = require('gulp-eslint');
var codecov = require('gulp-codecov.io');
var notify = require("gulp-notify");

var gulpUtils = require('@anyware/gulp-utils');

gulp.task('default', function(callback) {
  return runSequence('clean', 'lint', 'test', 'css', 'images', 'build', callback);
});

/* This task will only work from a Travis like CI environment */
gulp.task('submit-coverage', function submitCoverage() {
  return gulp.src('coverage/lcov.info')
    .pipe(codecov());
});

gulp.task('watch', ['watchJS', 'watchCSS', 'watchImages']);

gulp.task('watchJS', function() {
  gulp.watch(['bower_components/**/*.js', 'index.html'], ['build']);
  gulp.watch(['src/**/*.js{,x}'], ['build-app']);
});

gulp.task('watchTests', function watchTests() {
  gulp.watch(['src/**/*.js{,x}', 'test/**/*.js{,x}'], ['lint', 'test']);
});

gulp.task('watchCSS', function() {
  gulp.watch(['styles/**/*.scss'], ['css']);
});

gulp.task('watchImages', function() {
  gulp.watch(['images/*.png', 'images/*.jpg', 'images/*.gif'], ['images']);
});

gulp.task('build', function build(callback) {
  return runSequence('build-dependencies', 'build-app', 'build-index', callback);
});

gulp.task('build-app', function buildDependencies() {
  var browserified = through.obj(function (file, enc, next){
    browserify(file.path, {
      debug: true,
      extensions: ['.jsx']
    }).transform(babelify.configure({
      stage: 0
    })).bundle(function(err, res){
      // assumes file.contents is a Buffer
      if (err) {
        throw err;
      }
      file.contents = res;
      next(null, file);
    });
  });

  return gulp.src(['src/emulator-app.js'])
    .pipe(browserified)
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(iife({useStrict: false}))
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(gulpUtils.getDistPath()))
    .pipe(notify("Build app done!"));
});

gulp.task('build-dependencies', function buildApp() {
  return gulp.src(bowerFiles.ext('js').files)
    .pipe(sourcemaps.init())
    .pipe(concat('dependencies.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(gulpUtils.getDistPath()));
});

gulp.task('build-index', function buildIndex() {
  return gulp.src('index.html')
    .pipe(gulp.dest(gulpUtils.getDistPath()));
});

gulp.task('css', function buildCSS() {
  return gulp.src('styles/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(gulpUtils.getDistPath('css')));
});

gulp.task('images', function distImages() {
  return gulp.src('images/*.png')
    .pipe(gulp.dest(gulpUtils.getDistPath('images')));
});

gulp.task('clean', function clean(callback) {
  gulpUtils.removeDistFiles(callback);
});

gulp.task('lint', function lint() {
  return gulp.src(["src/**/*.js{,x}", "test/**/*.js{,x}"])
    .pipe(eslint('node_modules/@anyware/coding-style/.eslintrc'))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('test', function test() {
  return gulp.src('test/**/*-test.js{,x}', {read: false})
    .pipe(mocha({
      reporter: process.env.TRAVIS ? 'spec' : 'nyan',
      compilers: 'js:babel/register'
    }));
});
