var gulp = require('gulp');
// 引入组件
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglifyjs');
// 检查脚本
gulp.task('lint', function() {
    return gulp.src('./src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
//压缩css
gulp.task('minify-css', function() {
    return gulp.src('./src/styles/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/styles'));
});

// 编译Sass
gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'));
});
// 合并，重命名,压缩JS
gulp.task('scripts', function() {
    return gulp.src(['./src/js/file1.js', './src/js/file2.js'])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest('./dist/js'));
});

// 压缩图片
gulp.task('images', function() {
    return gulp.src('./src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'))
});
// 默认任务
gulp.task('default', function() {
    gulp.run('lint', 'minify-css', 'sass', 'scripts', 'images');

    // 监听文件变化
    gulp.watch('./src/js/*.js', function() {
        gulp.run('lint', 'sass', 'minify-css', 'scripts', 'images');
    });
});
