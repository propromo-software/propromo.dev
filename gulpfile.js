var gulp   = require('gulp');
var tsc    = require('gulp-tsc');
var shell  = require('gulp-shell');
var runseq = require('run-sequence');
var tslint = require('gulp-tslint');
var babel  = require('gulp-babel');

var paths = {
  tscripts : { src : ['src/**/*.ts'],
    dest: 'build'
  },
  jsscripts: {
    src: ['src/**/*.js'],
    dest: 'build'
  }
};

gulp.task('default', ['lint', 'buildrun']);

// ** Running ** //

gulp.task('run', shell.task([
  'node build/index.js'
]));

gulp.task('buildrun', function (cb) {
  runseq('build', 'run', cb);
});

// ** Watching ** //

gulp.task('watch', function () {
  gulp.watch(paths.tscripts.src, ['compile']);
});

gulp.task('watchrun', function () {
  gulp.watch(paths.tscripts.src, runseq('compile', 'run'));
});

// ** Compilation ** //

gulp.task('build', ['compile']);
gulp.task('compile', ['compile:typescript', 'compile:javascript']);
gulp.task('compile:typescript', function () {
  return gulp
  .src(paths.tscripts.src)
  .pipe(tsc({
    module: "commonjs",
    emitError: false
  }))
  .pipe(gulp.dest(paths.tscripts.dest));
});

gulp.task('compile:javascript', function () {
  return gulp
    .src(paths.jsscripts.src)
    .pipe(babel())
    .pipe(gulp.dest(paths.jsscripts.dest));
});

// ** Linting ** //

gulp.task('lint', ['lint:default']);
gulp.task('lint:default', function(){
      return gulp.src(paths.tscripts.src)
        .pipe(tslint())
        .pipe(tslint.report('prose', {
          emitError: false
        }));
});
