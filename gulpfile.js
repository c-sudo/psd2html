// 引入 gulp
var gulp = require('gulp');

// 引入组件
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var csso = require('gulp-csso');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var browserSync = require('browser-sync').create();






// 检查脚本
gulp.task('lint', function() {

    return gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
gulp.task('clean', function(){

    return gulp.src('public/stylesheets/css/*.css', {read : false})
        .pipe(clean());
})
// 编译Sass
gulp.task('sass',['clean'], function() {

    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(csso())
        .pipe(rename(function(path){
            //path.basename += '.min';
            path.extname  = '.css'
        }))
        .pipe(rev())
        .pipe(gulp.dest('public/stylesheets/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('public/stylesheets/rev'));
});


gulp.task('rev', function(){

    return gulp.src(['public/stylesheets/rev/*.json', './views/page.ejs'])
        .pipe(revCollector({
            replaceReved : true
        }))
        .pipe(gulp.dest('./views/'));
});
// 合并，压缩文件
gulp.task('scripts', function() {

    //gulp.src('./js/*.js')
    //    .pipe(concat('all.js'))
    //    .pipe(gulp.dest('./dist'))
    //    .pipe(rename('all.min.js'))
    //    .pipe(uglify())
    //    .pipe(gulp.dest('./dist'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch('src/scss/main.scss', ['sass']);
    gulp.watch('public/stylesheets/rev/*', ['rev']);
});

//browersync
gulp.task('browserSync', function(){
   browserSync.init({
       proxy : 'localhost:3000'
   })
});
browserSync.watch('views/page.ejs').on("change", browserSync.reload);


// 默认任务
gulp.task('default', ['watch', 'lint', 'sass', 'browserSync'], function(){
    gulp.start('rev');
});
