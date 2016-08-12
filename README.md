# gulp入门教程
<h3>一、安装Node</h3>

首先，最基本也最重要的是，我们需要搭建node环境。访问 nodejs.org，下载完成后直接运行程序，就一切准备就绪。npm会随着安装包一起安装，稍后会用到它。
为了确保Node已经正确安装，我们执行几个简单的命令。

<pre>node -v<br/>npm -v</pre>

<h3>二、安装 gulp</h3>

npm 是 node 的包管理工具，可以利用它安装 gulp 所需的包。（在安装 node 时已经自动安装了 npm）
在命令行输入

<pre>npm install -g gulp </pre>

若一直没安装成功，请使用 cnpm 安装(npm的国内加速镜像)，

安装 cnpm，在命令行输入：

<pre>npm install -g cnpm --registry=https://registry.npm.taobao.org</pre>

使用 cnpm 安装模块

<pre>cnpm install [name]</pre>

安装完成后，你可以使用下面的命令查看gulp的版本号以确保gulp已经被正确安装。

<pre>gulp -v</pre>
接着我们要进去到项目的根目录再安装一遍

<pre>npm install gulp --save-dev</pre>

<h3>三、新建gulpfile.js文件</h3>

我们将要使用Gulp插件来完成我们以下任务：
<ul>
  <li>sass的编译（gulp-sass）</li>
  <li>自动添加css前缀（gulp-autoprefixer）</li>
  <li>压缩css（gulp-clean-css）</li>
  <li>js代码校验（gulp-jshint）</li>
  <li>合并js文件（gulp-concat）</li>
  <li>压缩js代码（gulp-uglifyjs）</li>
  <li>压缩图片（gulp-imagemin）</li>
  <li >自动刷新页面（gulp-livereload）</li>
  <li >图片缓存，只有图片替换了才压缩（gulp-cache）</li>
  <li >更改提醒（gulp-notify）</li>
  <li >文件重命名（gulp-rename）</li>
</ul>

安装这些插件需要运行如下命令：

<pre>npm install gulp-sass gulp-autoprefixer gulp-clean-css gulp-jshint gulp-concat gulp-uglifyjs gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache gulp-rename --save-dev
</pre>
更多插件可以看这里<a href="http://gulpjs.com/plugins/" target="_blank">gulpjs.com/plugins/</a>

接着我们要创建一个gulpfile.js在根目录下，gulp只有四个API： task，watch，src，和 dest
<ul>
  <li>task这个API用来创建任务，在命令行下可以输入 gulp test 来执行test的任务。</li>
  <li>watch这个API用来监听任务。</li>
  <li>src这个API设置需要处理的文件的路径，可以是多个文件以数组的形式[main.scss, vender.scss]，也可以是正则表达式/**/*.scss。</li>
  <li>dest这个API设置生成文件的路径，一个任务可以有多个生成路径，一个可以输出未压缩的版本，另一个可以输出压缩后的版本。</li>
</ul>


完整代码：

<pre>
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

</pre>

<h3>四、运行</h3>
可以运行单独的任务，例如
<pre>gulp default<br/>gulp watch</pre>
也可以运行整个任务
<pre>gulp</pre>

