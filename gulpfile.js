var gulp = require('gulp');
var tsc = require('gulp-tsc');
var shell = require('gulp-shell');
var tslint = require('gulp-tslint');
var babel = require('gulp-babel');

var paths = {
  tscripts: { src: ['src/**/*.ts'], dest: 'build' },
  jsscripts: { src: ['src/**/*.js'], dest: 'build' },
};

function defaultTask(cb) {
  gulp.series('lint', buildrunTask)(cb);
}

// ** Running ** //

function runTask() {
  return shell.task([
    'node build/index.js'
  ]);
}

function buildrunTask(cb) {
  gulp.series('build', runTask)(cb);
}

// ** Watching ** //

function watchTask() {
  gulp.watch(paths.tscripts.src, compileTask);
}

function watchrunTask() {
  gulp.watch(paths.tscripts.src, gulp.series(compileTask, runTask));
}

// ** Compilation ** //

function buildTask(cb) {
  gulp.series(compileTypescriptTask, compileJavascriptTask)(cb);
}

function compileTask(cb) {
  gulp.series(compileTypescriptTask, compileJavascriptTask)(cb);
}

function compileTypescriptTask() {
  return gulp
    .src(paths.tscripts.src)
    .pipe(tsc({
      module: "commonjs",
      emitError: false
    }))
    .pipe(gulp.dest(paths.tscripts.dest));
}

function compileJavascriptTask() {
  return gulp
    .src(paths.jsscripts.src)
    .pipe(babel())
    .pipe(gulp.dest(paths.jsscripts.dest));
}

// ** Linting ** //

function lintTask() {
  return gulp.src(paths.tscripts.src)
    .pipe(tslint())
    .pipe(tslint.report('prose', {
      emitError: false
    }));
}

exports.default = defaultTask;
exports.lint = lintTask;
exports.compile = compileTask;
exports.build = buildTask;
exports.buildrun = buildrunTask;
exports.watch = watchTask;
exports.watchrun = watchrunTask;
