'use strict';
var gulp=require('gulp');
var browserSync = require('browser-sync').create();
var $=require('gulp-load-plugins')();
var app={
	srcPath:"src/",
	distPath:"dist/",
	proName:"itany"
}
gulp.task("html",function(){
	gulp.src(app.srcPath+"**/*.html")
		.pipe($.htmlmin({
			collapseBooleanAttributes:true,
			removeEmptyAttributes:true
		}))
		.pipe(gulp.dest(app.distPath))
		.pipe(browserSync.stream());
});

gulp.task("less",function(){
	gulp.src(app.srcPath+"**/*.less")
		.pipe($.less())
		.pipe($.concat(app.proName+".css"))
		.pipe(gulp.dest(app.distPath+"css"))
		.pipe($.cssmin())
		.pipe($.rename({suffix:".min"}))  //重名名并追加后缀
		.pipe(gulp.dest(app.distPath+"css"))
		.pipe(browserSync.stream());  //指定编译文件的目录（less编译后生成css文件）
		

});

gulp.task("js",function(){
	gulp.src(app.srcPath+"js/**/*.js")
		.pipe($.concat(app.proName+".js"))
		.pipe($.uglify())
		.pipe($.rename({suffix:".min"}))
		.pipe(gulp.dest(app.distPath+"js"))
		.pipe(browserSync.stream());
});

gulp.task("utilJs",function(){
	gulp.src(app.srcPath+"utilJs/**/*.js")
		.pipe(gulp.dest(app.distPath+"js/"))
		.pipe(browserSync.stream());
});

gulp.task("clean",function(){
	gulp.src("dist/")  //指定需要清除的目录   直接清除dist/下的所有文件
		.pipe($.clean()) 
		.pipe(browserSync.stream());
		
});

//任务合并
gulp.task("mytask",["html","less","js","utilJs"]);
//添加监视器
gulp.task("watch",["html","less","js","utilJs"],function(){
	gulp.watch(app.srcPath+"**/*.html",['html']);
	gulp.watch(app.srcPath+"**/*.less",['less']);
	gulp.watch(app.srcPath+"js/**/*.js",['js']);
	gulp.watch(app.srcPath+"utilJs/**/*.js",['utilJs']);
});
//浏览器同步静态服务器
gulp.task("by",['watch'],function(){
	browserSync.init({
		server:{
			baseDir:app.distPath
		},
	});
});
//gulp默认启动服务器，default 是gulp的默认启动任务
gulp.task("default",['watch'],function(){
	browserSync.init({
		server:{
			baseDir:app.distPath
		},
	});
});