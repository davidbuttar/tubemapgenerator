var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var watchify = require("watchify");
var sourcemaps = require('gulp-sourcemaps');
var tsify = require("tsify");
var ts = require("gulp-typescript");
var jasmine = require('gulp-jasmine');

gulp.task("build-tests", function () {
    gulp.src(['src/**/*.ts'])
        .pipe(ts({
            noImplicitAny: true
        }))
        .pipe(gulp.dest('testdist/src'));

    gulp.src(['test/**/*.ts', 'typings/**.ts'])
        .pipe(ts({
            noImplicitAny: true
        }))
        .pipe(gulp.dest('testdist/test'));

});

var paths = {
    pages: ['app/*.html']
};

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("app"));
});

gulp.task("default", ["copy-html"], function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    }).plugin(tsify).bundle().pipe(source('bundle.js')).pipe(gulp.dest("app"));
});

gulp.task('test', ['build-tests'], function () {
    return gulp.src('testdist/test/*.js')
        .pipe(jasmine());
});

gulp.task('watch', function () {
    gulp.watch(['./src/**/*.ts', './test/**/*.ts'], ['build-tests', 'default']);
});