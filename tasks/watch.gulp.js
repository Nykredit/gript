'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload');

// Watches the source tree for changes
gulp.task('watch', function () {
    livereload.listen();

    watch('*.js', function () {
        gulp.start('eslint', function () {
            livereload.reload();
        });
    });
    watch(['!app/bower_components/**/*', 'app/**/*.js'], function () {
        gulp.start(['eslint', 'test'], function () {
            livereload.reload();
        });
    });
    watch(['!app/bower_components/**/*', '!app/**/*Test.ts', '!app/**/*.*test.ts', 'app/**/*.ts'], function () {
        gulp.start('inject-js', function () {
            livereload.reload();
        });
    });
    watch(['!app/bower_components/**/*', 'app/**/*Test.ts', 'app/**/*.*test.ts'], function () {
        gulp.start('test', function () {
            livereload.reload();
        });
    });
    watch('app/**/*.scss', function () {
        gulp.start('inject-styles', function () {
            livereload.reload();
        });
    });
    watch(['!app/bower_components/**/*', '!app/index.html', 'app/**/*.html'], function () {
        gulp.start('inject-partials', function () {
            livereload.reload();
        });
    });
    watch(['!app/bower_components/**/*', '!app/index.html', 'app/**/*.html'], function () {
        gulp.start('inject-partials', function () {
            livereload.reload();
        });
    });
    watch('bower.json', function () {
        gulp.start('inject-bower', function () {
            livereload.reload();
        });
    });
});
