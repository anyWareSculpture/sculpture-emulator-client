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

var gulpUtils = require('./lib/shared/gulp-utils');

gulp.task('default', function(callback) {
  return runSequence('clean', 'lint', 'test', 'css', 'templates', 'build', callback);
});

gulp.task('watch', ['watchJS', 'watchTemplates', 'watchCSS']);

gulp.task('watchJS', function() {
  gulp.watch(['src/**/*.js'], ['lint']);
  gulp.watch(['bower_components/**/*.js', 'index.html'], ['build']);
  gulp.watch(['src/**/*.js'], ['build-app']);
});

gulp.task('watchTests', function watchTests() {
  gulp.watch(['src/**/*.js', 'test/**/*.js'], ['lint', 'test']);
});

gulp.task('watchTemplates', function() {
  gulp.watch(['templates/**/*.html'], ['templates']);
});

gulp.task('watchCSS', function() {
  gulp.watch(['styles/**/*.scss'], ['css']);
});

gulp.task('build', function build(callback) {
  return runSequence('build-dependencies', 'build-app', 'build-index', callback);
});

gulp.task('build-app', function buildDependencies() {
  var browserified = through.obj(function (file, enc, next){
    browserify(file.path, {
      debug: true,
      paths: ['./lib']
    }).transform(babelify).bundle(function(err, res){
      // assumes file.contents is a Buffer
      if (err) {
        throw new Error(err);
      }
      file.contents = res;
      next(null, file);
    });
  });

  return gulp.src(['src/**/*.js'])
    .pipe(browserified)
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(iife({useStrict: false}))
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(gulpUtils.getDistPath()));
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

gulp.task('templates', function templates() {
  return gulp.src('templates/**/*.html')
    .pipe(gulp.dest(gulpUtils.getDistPath('templates')));
});

gulp.task('css', function buildCSS() {
  return gulp.src('styles/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
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
