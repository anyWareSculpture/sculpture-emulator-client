var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var brfs = require('brfs');
var watchify = require('watchify');

var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var iife = require("gulp-iife");
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var mocha = require('gulp-spawn-mocha');
var eslint = require('gulp-eslint');
var codecov = require('gulp-codecov.io');
var notify = require("gulp-notify");
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

var gulpUtils = require('anyware/gulp-utils');

var browserSync = require('browser-sync').create();

gulp.task('default', function(callback) {
  return runSequence('clean', 'lint', 'test', 'images', 'build', callback);
});

/* This task will only work from a Travis like CI environment */
gulp.task('submit-coverage', function submitCoverage() {
  return gulp.src('coverage/lcov.info')
    .pipe(codecov());
});

gulp.task('watch', ['build-watch', 'build-index', 'images', 'collect-sounds'], function() {
  gulp.watch(['index.html'], ['build-index']);
});

gulp.task('watchTests', function watchTests() {
  gulp.watch(['src/**/*.js{,x}', 'test/**/*.js{,x}'], ['lint', 'test']);
});

gulp.task('build', function build(callback) {
  return runSequence('build-nowatch', 'build-index', 'images', 'collect-sounds', callback);
});

/*
  Creates a browserified stream of the given files and calls the passed bundle function.a
  if watch is true, will automatically watch and rebuild using the passed bundle function.

  The bundle function must take a stream as parameter and produce the appropriate output.
*/
function createBrowserifiedStream(files, watch, bundle) {
  var b = browserify({entries: files,
                      debug: true,
                      extensions: ['.jsx']
                     })
    .transform(babelify.configure({
      presets: ['react', 'es2015'],
      plugins: ['transform-class-properties']
    }))
    .transform(brfs);
  
  if (watch) {
    var w = watchify(b, {ignoreWatch: false});
    w.on('update', function() {
      console.log("Updating...");
      return bundle(b);
    });
  }
  return bundle(b);
}

/*
  Takes a browserify stream as input and produces a bundled output
*/
 function bundleApp(b) {
  return b.bundle()
    .on('error', function(err) {
      return notify().write(err);
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(iife({useStrict: false}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(gulpUtils.getDistPath()))
    .pipe(notify("Build app done!"))
    .pipe(browserSync.reload({stream: true, once: true}));
}

var browserify_files = ['src/emulator-app.js'];
gulp.task('build-nowatch', function() {
  return createBrowserifiedStream(browserify_files, false, bundleApp);
});

gulp.task('build-watch', function() {
  return createBrowserifiedStream(browserify_files, true, bundleApp);
});

var debug = require('gulp-debug');
gulp.task('build-app', function() {
  return gulp.src(['src/emulator-app.js'])
    .pipe(browserified)
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(iife({useStrict: false}))
// concat isn't necessary since browserified outputs a single file
//    .pipe(concat('app.js'))
    .pipe(rename('app.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(gulpUtils.getDistPath()))
    .pipe(notify("Build app done!"));
});

gulp.task('build-index', function buildIndex() {
  return gulp.src('index.html')
    .pipe(gulp.dest(gulpUtils.getDistPath()));
});

gulp.task('collect-sounds', function collectSounds() {
  return gulp.src(['node_modules/@anyware/sound-assets/**/*.wav'])
    .pipe(gulp.dest(gulpUtils.getDistPath('sounds')));
});

gulp.task('images', function distImages() {
  return gulp.src(['images/*.png', 'images/*.jpg', 'images/*.gif'])
    .pipe(gulp.dest(gulpUtils.getDistPath('images')));
});

gulp.task('clean', function clean(callback) {
  gulpUtils.removeDistFiles(callback);
});

gulp.task('lint', function lint() {
  return gulp.src(["src/**/*.js{,x}", "test/**/*.js{,x}"])
    .pipe(eslint('node_modules/anyware/.eslintrc'))
    .pipe(eslint.format());
});

gulp.task('test', function test() {
  return gulp.src('test/**/*-test.js{,x}', {read: false})
    .pipe(mocha({
      reporter: process.env.TRAVIS ? 'spec' : 'nyan',
      compilers: 'js:babel-register'
    }));
});

gulp.task('serve', ['watch'], function () {
  browserSync.init(null, {
    server: {
      baseDir: 'lib'
    },
    startPath: 'index.html',
    debugInfo: false,
    open: true,
    hostnameSuffix: ""
  });
});
