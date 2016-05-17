
<meta http-equiv="content-type" content="text/html; charset=UTF-8">

<link href="css/markdown.css" rel="stylesheet" />

<link href="css/prettify.css" rel="stylesheet" />

<script src="http://apps.bdimg.com/libs/jquery/2.0.3/jquery.min.js"></script>

<script src="js/prettify.js"></script>  

VS Code
=======

最好用的跨平台文本编辑器，推荐使用。

## 特点

- 跨平台，开源，免费，启动非常快，目录作为项目管理，集成 git版本管理，使用 node 作为外部任务，能打开大文件，并且编辑不卡顿
- 是目前发现**最好用的编辑器**，之前使用的 Sublime、Pad ++ 等都不用了！
- 同步预览：拆分 md文件，在拆分的文件上点击右上角预览，或者使用 cmd+shift+v 切换到预览视图，即可同步预览。
- tab设置：编辑器似乎能跟踪每个文件的tab设置，如果一个文件开始设置tab自动转空格，用户设置tab改为不转空格，
  新的设置对原来编辑过的文件不起作用，非常神奇，不知道是bug还是一个特色功能。  
  需要变更 tab 设置，只能将原文件更名，新建一个，拷贝文本过来！

## Markdown 转 html
  
1. npm install -g marked
2. Create tasks.json  
	F1 and type in 'Configure Task Runner', press Enter to select it.
	Select Others.
	tasks.json :
  ```js  
	{
		// See http://go.microsoft.com/fwlink/?LinkId=733558
		// for the documentation about the tasks.json format
		"version": "0.1.0",
		"command": "echo",
		"isShellCommand": true,
		"args": ["Hello World"],
		"showOutput": "always"
	}

	we change the contents as follows:  
	{
		// See http://go.microsoft.com/fwlink/?LinkId=733558
		// for the documentation about the tasks.json format
		"version": "0.1.0",
		"command": "marked",
		"isShellCommand": true,
		"args": ["sample.md", "-o", "sample.html"],
		"showOutput": "always"
	}
	```
	Use ⌃Space to see the available settings.
3. Run the Build Task  
	As this is the only task in the file, you can execute it by simply pressing ⇧⌘B (Run Build Task).

## Markdown 批量转 html

1. 安装任务执行环境
	```js
	npm i -g gulp-cli
	npm i gulp -D
	npm i gulp-markdown -D
	
	```
2. 创建 Gulp 任务 gulpfile.js，也就是用js编写的类似 bat、cmd一样的批量处理执行脚本
	```js
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
	
	```
	运行 gulp markdown，所有md文件被批量转换到html目录！
3. 修改 tasks.json 文件，对 md 文件进行监视
	set a watch on the default Gulp task we just created.
	```js
	{
    "version": "0.1.0",
    "command": "gulp",
    "isShellCommand": true,
    "tasks": [{
			"taskName": "default",
			"isBuildCommand": true,
			"showOutput": "always",
			"isWatching": true
		}]
	}
	
	```
4. 运行 gulp Build 任务
	⇧⌘B (Run Build Task)，md文件修改后，自动转换为 html文件。  
	并且在状态栏左下角有个同步的圆形图标，点击可完成同步！ 
5. 停止 自动监视任务
	重新 ⇧⌘B，会弹出 “终止运行中的任务”，点击终止即可！
	或者 点击 F1，输入 >terminate Running Task，回车即可！

## 插件管理

- [**插件网址**：]https://marketplace.visualstudio.com/VSCode
- **已安装插件**：cmd+p，输入 ext+空格，即可浏览所安装的插件，点击 x 即可卸载
- **安装插件**：ext install xxx 安装插件
- **更新插件**：ext update 更新插件

## 推荐插件
	
- ext install beautify    
	js、css、html、json 格式化插件，推荐使用！
	按F1，在命令行输入 beautify，执行即可将当前文本自动格式化！	
- ext install vscode-eslint
	代码规范提示
- ext install JavaScriptSnippets
	js 关键字缩写
- ext install jshint
	js 输入提示
- [Markdown-TOC](https://github.com/AlanWalk/Markdown-TOC)
  
  