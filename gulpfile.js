
var gulp = require('gulp');
var markdown = require('gulp-markdown');

// 执行转换任务
gulp.task('markdown', function() {
	return gulp.src('**/*.md')
		.pipe(markdown())
		// 统一转换到 html 目录
		.pipe(gulp.dest('html'));
		// 原目录转换
		// .pipe(gulp.dest(function(f) {
		// 		return f.base;
		// }));	
});

// 缺省任务
gulp.task('default', function() {
	// 对所有 md 文件进行监视，发现修改自动执行 转换任务！
	gulp.watch('**/*.md', ['markdown']);
});