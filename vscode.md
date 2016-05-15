
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
  新的用户设置对原来编辑过的文件不起作用，非常神奇，不知道是bug还是一个特色功能。
	需要变更 tab 设置，只能将原文件更名，创建新文件，把内容拷贝过来！

## Markdown 转 html
  1. npm install -g marked
  2. Create tasks.json  
    F1 and type in 'Configure Task Runner', press Enter to select it.
    Select Others.
    tasks.json file in your workspace .vscode folder with the following content:  
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
    Use ⌃Space to see the available settings.
  3. Run the Build Task  
    As this is the only task in the file, you can execute it by simply pressing ⇧⌘B (Run Build Task).

## 第三方插件

- [**插件网址**：]https://marketplace.visualstudio.com/VSCode
- **已安装插件**：cmd+p，输入 ext+空格，即可浏览所安装的插件，点击 x 即可卸载
- **安装插件**：ext install xxx 安装插件
- **更新插件**：ext update 更新插件
- **推荐插件**：
	ext install beautify，js、css、html、json 美化，推荐！
		Run with F1 Beautify
		
	ext install vscode-eslint
	ext install JavaScriptSnippets
	ext install jshint
  
  