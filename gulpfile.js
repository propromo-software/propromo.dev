const gulp = require('gulp');
const tsc = require('gulp-tsc');
const shell = require('gulp-shell');
const tslint = require('gulp-tslint');
const babel = require('gulp-babel');

const paths = {
  tscripts: { src: ['src/**/*.ts'], dest: 'build' },
  jsscripts: { src: ['src/**/*.js'], dest: 'build' },
  staticFiles: { src: ['src/templates/**/*'], dest: 'build/templates' },
  staticAssets: { src: ['src/static/**/*'], dest: 'build/static' }
};

function defaultTask(cb) {
  gulp.series('lint', buildrunTask)(cb);
}

// ** Running ** //

function runTask(cb) {
  shell.task([
    'node build/index.js'
  ])();
  cb();
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
  gulp.series(compileTypescriptTask, compileJavascriptTask, copyStaticTask)(cb);
}

function compileTask(cb) {
  gulp.series(compileTypescriptTask, compileJavascriptTask, copyStaticTask)(cb);
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

function copyStaticTask(cb) {
  return gulp.parallel(
    copyStaticFiles,
    copyStaticAssets
  )(cb);
}

function copyStaticFiles() {
  return gulp
    .src(paths.staticFiles.src)
    .pipe(gulp.dest(paths.staticFiles.dest));
}

function copyStaticAssets() {
  return gulp
    .src(paths.staticAssets.src)
    .pipe(gulp.dest(paths.staticAssets.dest));
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
