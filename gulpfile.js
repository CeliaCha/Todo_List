var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var minify = require('gulp-clean-css');
var merge = require('merge-stream');
var reload = browserSync.reload;

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});


gulp.task('sass', function() {
	return gulp.src('assets/scss/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('dist/css'))
	.pipe(browserSync.stream())
});

gulp.task('uglify', function () {
    gulp.src('assets/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'))
    .pipe(browserSync.stream())
});

gulp.task('minify', function() {
	gulp.src('assets/scss/*.scss')
	.pipe(minify())
	.pipe(gulp.dest('dist/css'))
	.pipe(browserSync.stream())
});

gulp.task('serve', ['sass', 'minify', 'uglify'], function() {
    browserSync.init({
        server: './',
        open: true,
        notify: false
    });
		gulp.watch('assets/scss/*.scss',['sass','minify']);
		gulp.watch('assets/js/*.js', ['uglify']);
		gulp.watch('.html').on('change', browserSync.reload);

});

gulp.task('default', ['serve']);