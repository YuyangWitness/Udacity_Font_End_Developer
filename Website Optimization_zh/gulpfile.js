/**
 * Created by yangyu on 21/05/2017.
 */
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const htmlminify = require("gulp-html-minify");
const cleanCSS = require('gulp-clean-css');

//压缩JS
gulp.task('uglifyJS', function() {
	gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});


//压缩CSS
gulp.task('minify-css', function() {
	return gulp.src('src/css/*.css')
		.pipe(cleanCSS())
		.pipe(gulp.dest('dist/css'));
});

//压缩HTML
gulp.task('build-html' , function(){
	return gulp.src("src/index.html")
		.pipe(htmlminify())
		.pipe(gulp.dest("dist"));
});