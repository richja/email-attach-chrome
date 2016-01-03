var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	zip = require('gulp-zip');

var files = [
	'icon16.png',
	'icon48.png',
	'icon128.png',
	'cstyle.css',
	'manifest.json'
];

// compress js files
gulp.task('uglify', function () {
	return gulp.src('content.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

// move rest of files to dist dir
gulp.task('move', function () {
	return gulp.src(files)
		.pipe(gulp.dest('dist'));
});

// zip them all
gulp.task('zip', ['uglify','move'], function () {
	return gulp.src('dist/*')
		.pipe(zip('email.zip'))
		.pipe(gulp.dest('./'));
});

gulp.task('default', ['uglify','move','zip']);