<meta http-equiv="content-type" content="text/html; charset=UTF-8">

<link href="css/markdown7.css" media="all" rel="stylesheet" type="text/css" />

<link rel="stylesheet" href="css/prettify.css" />

<script src="js/jquery-2.0.0.min.js"></script>

<script src="js/prettify.js"></script>  

WebStorm
========

node.js 开发最好的IDE系统！

网址：http://www.jetbrains.com/webstorm/  
插件：http://plugins.jetbrains.com/webStorm

WebStorm是作为JS开发IDE存在的，并且支持流行的Node.js以及JQuery等js框架。 毫无疑问非他莫属，跨平台，强大的代码提示，支持Nodejs调试，此外还支持vi编辑模式，这点我很喜欢。 而Node.js简单说就是一个JS类库并且配备有Google的V8 js引擎来解析和执行js脚本。 那WebStorm+Node.js这样一个组合，用来开发基于Node.js平台的应用是最方便不过的了，并且可以知道WebStorm这个IDE环境对js的支持是灰常强大的，有智能提示、断点调试、查看源码等等功能。

安装node
--------

-	iojs网址(node分离的版本): https://iojs.org/en/index.html  
-	最新版本相关文件：https://iojs.org/dist/v2.0.1/
-	相关中间件：https://github.com/koajs
-	例子：
	-	https://github.com/koajs/examples
	-	https://github.com/koajs/workshop
	-	https://github.com/koajs/kick-off-koa
-	windows版本：iojs-v1.7.1-x64.msi  
-	苹果版本：iojs-v1.7.1-darwin-x64.tar.gz  
-	源代码：iojs-v1.7.1.tar.gz，源代码webstorm需要，用于开发时提示
-	直接运行，按缺省方式安装！
-	如果以前安装有node.js 请卸载，如果安装有旧版本iojs，无需卸载，直接安装即可覆盖。
-	安装完毕，会自动将 node、iojs、npm加入路径！
-	在命令行执行 iojs -v 可看到 安装的版本号。

安装webstorm
------------

1.	下载最新版本，webstorm版本更新非常快！
2.	运行安装，如以前安装过旧版本，安装新版本会自动卸载旧版本
3.	安装时，提示是否删除项目加载历史
4.	提示是否删除设置和插件，一般更新安装选择保留原设置及插件，避免重新配置
5.	安装路径，如：C:\Program Files (x86)\JetBrains\WebStorm
6.	创建桌面快捷，作为 js、html、css的缺省编辑器
7.	提示修改缺省浏览器设置，选择允许修改
8.	第一次运行，提示是否导入旧版本的设置，如：C:\Users\Walter.WebStorm9
9.	注册，WebStorm 11 注册码

由于最新jetbrains发布了IntelliJ IDEA 15. PyCharm 5.PhpStorm10.WebStorm 11等各个版本，但是改变了注册方法。原先的注册码包括注册机都已经不能使用了。

现在有个比较简单的注册方法.注册时选择“License server”输入“http://15.idea.lanyus.com/”点击“OK”即可快速激活JetBrains系列产品

设置
----

1.	在使用 webstorm 的时候，推荐使用黑色的主题，看起来更加的纯净，也会让使用者更加的专注书写代码。 第一次启动，IDE Settings 选择 Darcula主题即可。 也可以在菜单配置选项中设置：在 Appearance 的右边菜单里，选择 Theme > Darcula主题即可。 IDE Settings 指的是 webstorm 的全局配置。
2.	Editor 颜色字体中，配色选择 monokia， Sublime text 3 里面带的配色。
3.	白色太晃眼，将白色调暗  
	Default Text： F8F8F2 -》 A7A7A7  
	Line Number：F8F8F2 -》 A7A7A7  
	Console Standard output：FFFFFF-》 A7A7A7  
	Console system output：E4E4FF -》 A7A7A7
4.	键盘选择缺省键盘
5.	字体选择 Courier New 或 Consolas，Size：16
6.	代码风格
	-	通用tab size：2， Indent：2， Continuation：2  
	-	js/TypeScript/CoffeeScript tab size：2， Indent：2， Continuation：2
	-	Comment at first column 不选，注释不置顶
	-	Blank Lins Keep 中 Maximum Blank Lines InCode：1，最大空行为1行
7.	File Encoding文件编码全部设置为 UTF-8，如果现有项目不是该编码，请先转换为该编码！  
	File Encodings IDE Encoding: UTF-8  
	Project Encoding: UTF-8  
	Default encoding for properties files：UTF-8
8.	Packages 第三方包 一般安装在 C:\Users\Xxx\AppData\Roaming\npm\node_modules 全局路径！ 一些包文件安装在 C:\Users\Xxx 路径，如： C:\Users\Xxx.node-gyp
9.	安装插件 如：markdown 等
10.	js 语言版本，缺省一般为 ECMAScript 5.1，后面支持该js版本的浏览器版本。 纯后台程序可选择 ECMAScript 6，选择6时会提示需要转换，如果后台运行，无需转换，如果前端运行，由于绝大多数浏览器不支持 6版本，因此需要转换。
11.	js后台代码为减少差错，一般需勾选 Strict 严格模式，避免常犯的错误。
12.	Libraries，请勾选 ECMAScript 6，Node.js v1.7.1 Core Modules(不同安装版本不同)
13.	Node.js and NPM中，框架源代码设置。 Source of Node.js Core Modules，请下载源代码，保存到项目路径，在该选项中选择该文件即可！
14.	项目安装包列表。 Node.js and NPM中全局包及的确项目包的版本及最新版本列表，点击更新可更新。 在该页面也可安装、协助包，一般还是通过 npm install、npm uninstall 来安装、卸载更方便。

创建项目
--------

1.	创建项目会自动创建 .idea 目录，保存项目信息。
2.	创建项目向导提供四种选项：
	1.	Web server is installed locally, source files are located under its document root.
	2.	Web server is installed locally, source files are located elsewhere locally.
	3.	Web server is on a remote host, files are accessible via network share or mounted drive.
	4.	Web server is on a remote host, files are accessible via FTP/SFTP/FTPS.
	5.	Source files are in a local directory, no Web server is yet configured.
3.	一般选择5，下一步，提示选择项目路径，选择项目文件目录，点击鼠标右键，设置项目根目录即可。

项目运行与调试
--------------

1.	第一次运行项目，需点击右上角，Edit configurations，
2.	点击添加，选择 Node.js
3.	输入Name，执行程序，如：C:\Program Files\iojs\node.exe 要执行的代码文件，如：start.js
4.	可以选择该名称，随时执行或调试该文件。点击执行或调试，会在下面弹出执行或调试窗口。
5.	调试窗口有执行结果输出，运行错误等，可在该窗口单步跟踪。
6.	对于js 6，会提示 File Watcher，如Babel、Traceur compiler,自动将 js 6 转换为 js 5，对于后台代码，无需转换，选择忽略。  
	 可在 Suppressed File Watchers中设置。

常用快捷键
----------

1.	搜索 双击 Shift
2.	通过文件名称打开文件 ctl+shift+N
3.	打开最近的文件 ctl+E
4.	打开导航条 Alt+Home

File Watcher
------------

-	自动将 CoffeeScript 等转换为 js文件，如将 jade文件转换为 html文件，可配置 File Watcher自动完成转换，避免通过命令行手动转换。
-	File Watcher在Settings->Tools->File Watchers 中添加、删除、修改
-	在Code->Inspect Code中可对项目代码规范化进行检查
-	如 jade的自动转换设置如下：
-	安装jade到全局环境`npm install -g jade`
	-	手动转换：`jade --watch --out public jade`
	-	Program: `c:\Users\Walter\AppData\Roaming\npm\jade.cmd`
	-	Arguments: `$FileName$ --out $ProjectFileDir$\public\$FileDirPathFromParent(jade)$`
	-	Working directory: `$FileDir$`

WebStorm功能
------------

请参见： https://www.jetbrains.com/webstorm/features/

### TypeScript（微软在js之上设计的语言，与Coffee 类似）.

You can now enjoy TypeScript syntax highlighting, on-the-fly error detection, and code completion. WebStorm 6 provides streamlined experience for the full development cycle with new languages such as TypeScript,

### CoffeeScript and Dart. Here's what's available already:

-	Automatic compilation/transpilation of these higher-level languages into those recognized by the browsers on all platforms supported by the IDE. This also applies to modern CSS extensions such as LESS and Sass.
-	Full-featured debugging of CoffeeScript, TypeScript or Dart with the help of source maps. If you have a minified JS, you can debug it with source maps as well.

### Sass

-	custom function definition, completion and renaming support
-	highlighting for incorrect @-keyword
-	support of nested properties, and more LESS support now includes code insight for mixins and many other improvements.

### Google Dart

The editor also supports inlining Dart script blocks into HTML files. For older versions of the IDE you can use this Dart plugin.

### LESS

```
support now includes code insight for mixins and many other improvements.
```

### CoffeeScript

now has its own code formatter options and in the editor support for deconstructed parameters and parameters with @ prefix is added.

### Core Web Development

Live Edit, introduced in the previous release, is now easier to get started with and it also supports HTML5 live editing.

WebStorm 6 also introduces improvements for HTML and CSS coding: a re-designed HTML structure view, with special support for HTML5, and Emmet snippets in the editor. If you're looking to level-up your HTML and CSS coding speed, WebStorm's got your back.

![](nodehtml5outline.png)

### Zen支持

![](nodeemmet.png)

### JS Lib

We’ve also revised our approach to handling JavaScript libraries, allowing JS developers to work transparently with minimized and compiled files stored in the project tree. The IDE smartly uses them for code completion and navigation only when needed and ignores them the rest of the time.

![](nodejs_libraries_thumb.png)

### validation

WebStorm equips you with the most powerful code validation tools. You can now validate your JS against Google Closure Linter (new to WebStorm 6), JSHint, JSLint, and our own custom inspections. WebStorm can also automatically pick up the latest version of JSHint for you and, now it understands .jshintrc files if your project has them.

### HTTP server

WebStorm 6 includes a built-in HTTP server for static files. You can view your code in a browser instantly or debug it without setting up your own server.

### REST Client

WebStorm now integrates REST Client to let you test RESTful web services right from the IDE. Simply invoke different requests over HTTP (e.g. GET, POST, PUT and others) to RESTful APIs with various parameters and get response and response headers.

### IDE Improvements

WebStorm 6 has been re-designed with a fresh IDE look and feel. To explore the darker side of coding, turn your lights down and try out our new native dark UI theme, Darcula.

Last but not least, if you're a happy owner of a new MacBook, feast your eyes on a set of new Retina-adapted icons.

![](nodewebstorm_darcula.png)

Generating a Project from a Framework
-------------------------------------

During project creation, WebStorm can generate a project stub for developing Web applications. The project structure is set up and some sources are generated based on external templates and frameworks downloaded upon your request.

WebStorm generates project stubs based on the following templates:

-	HTML5 Boilerplate, Twitter Bootstrap, and Foundation for client-side application stubs.
-	Express and Node Boilerplate for the server-side applications using Node.js. Generating such application stubs requires that Node.js is supported in WebStorm:
	-	The Node.js plugin is enabled. The plugin is bundled with WebStorm and activated by default. If it is not, enable the plugin in the Plugins page of the Settings dialog box (File | Settings | Plugins). The Node.js framework is downloaded and installed on your computer.
-	Dart applications. Generating Dart application stubs requires that Dart is supported in WebStorm: the Dart plugin is enabled. The plugin is bundled with WebStorm and activated by default. If it is not, enable the plugin. The Dart SDK is available on your computer.

2013-02-12 Node 后端开发指引 http://vistaswx.com/blog/article/nodejs-dev

常用的webstorm快捷键
--------------------

## WebStorm MAC苹果系统快捷键

```js
快捷键	作用
command + / 或 + Shift + /	注释（// 或者/*…*/ ）
/\*\* 回车自动添加函数注释，带函数参数 
command + d	副本当前行或选中的区块
command + f	查找当前文档
command + g	跳转到文档的某一行某一列
command + p	显示参数信息
command + r	替换当前文档
command + w	选中当前单词、行、区块等
command + y	删除整行
command + mouseover	显示主要信息
command + [	移动光标到代码块前
command + ]	移动光标到代码块尾
command + +	折叠区块
command + -	展开区块
command + ->	光标移到行尾
command + <-	光标移到行头
快捷键	作用
command + option + t	将代码以某种格式包括起来
command + option + l	将代码格式化
快捷键	作用
command + shift + u	切换大小写
command + shift + [	选中到代码块前
command + shift + ]	选中到代码块尾
command + shift + +	折叠所有区块
command + shift + -	展开所有区块
快捷键	作用
shift + return	在任意位置换行
shift + F6	高级修改，可快速修改光标所在的标签、变量、函数等
control + shift + f	find in path
control + shift + j	合并行
control + shift + r	replace in path
快捷键	作用
option + delete	delete to word start
option + fn + delete	delete to word end
option + ->	以单词为单位移动光标
option + <-	以单词为单位移动光标
```

## WebStorm Windows系统快捷键

```
Ctrl+/ 或 Ctrl+Shift+/	注释（// 或者/*…*/ ）
Shift+F6	重构-重命名
Ctrl+X	删除行
Ctrl+D	复制行
Ctrl+G

查找行
Ctrl+Shift+Up/Down	代码向上/下移动。
F2 或Shift+F2	高亮错误或警告快速定位
写代码，按Tab	生成代码
选中文本，按Ctrl+Shift+F7	高亮显示所有该文本，按Esc高亮消失。
Ctrl+B	快速打开光标处的类或方法
Ctrl+E	最近打开的文件
Alt+F1	查找代码所在位置
Ctrl+Alt+L	格式化代码
Ctrl+R	替换文本
Ctrl+F	查找文本
Ctrl+P	方法参数提示

Webstorm默认配置下的常用快捷键
查找/代替
快捷键
说明
ctrl+shift+N	 通过文件名快速查找工程内的文件（必记）
ctrl+shift+alt+N	 通过一个字符快速查找位置（必记）
ctrl+F	 在文件内快速查找代码
F3	 查找下一个
shift+F3	 查找上一个
ctrl+R	 文件内代码替换
ctrl+shift+R	 指定目录内代码批量替换
ctrl+shift+F	 指定目录内代码批量查找
ctrl+R	 文件内代码替换
界面操作
快捷键
说明
ctrl+shift+A	 快速查找并使用编辑器所有功能（必记）
alt+[0-9]	 快速拆合功能界面模块
ctrl+shift+F12	 最大区域显示代码（会隐藏其他的功能界面模块）
alt+shift+F	 将当前文件加入收藏夹
ctrl+alt+s	 打开配置窗口
ctrl+tab	 切换代码选项卡（还要进行此选择，效率差些）
alt+<-或->	 切换代码选项卡
快捷键
说明
ctrl+shift+N	 通过文件名快速查找工程内的文件（必记）
ctrl+shift+alt+N	 通过一个字符快速查找位置（必记）
ctrl+F	 在文件内快速查找代码
F3	 查找下一个
shift+F3	 查找上一个
ctrl+R	 文件内代码替换
ctrl+shift+R	 指定目录内代码批量替换
ctrl+shift+F	 指定目录内代码批量查找
ctrl+R	 文件内代码替换
界面操作
快捷键
说明
ctrl+shift+A	 快速查找并使用编辑器所有功能（必记）
alt+[0-9]	 快速拆合功能界面模块
ctrl+shift+F12	 最大区域显示代码（会隐藏其他的功能界面模块）
alt+shift+F	 将当前文件加入收藏夹
ctrl+alt+s	 打开配置窗口
ctrl+tab	 切换代码选项卡（还要进行此选择，效率差些）
alt+<-或->	 切换代码选项卡
ctrl+F4	 关闭当前代码选项卡
代码编辑
快捷键
说明
ctrl+D	 复制当前行
ctrl+W	 选中单词
ctrl+<-或->	 以单词作为边界跳光标位置
alt+Insert	 新建一个文件或其他
ctrl+alt+L	 格式化代码
shift+tab/tab	 减少/扩大缩进（可以在代码中减少行缩进）
ctrl+Y	 删除一行
shift+enter	 重新开始一行（无论光标在哪个位置）
导航
快捷键
说明
esc	 进入代码编辑区域
alt+F1	 查找代码在其他界面模块的位置，颇为有用
ctrl+G	 到指定行的代码
ctrl+]/	 光标到代码块的前面或后面
alt+up/down	 上一个/下一个方法
建议配置版本控制快捷键
快捷键
说明
ctrl+C	 提交代码
ctrl+p	 向远程版本库推送更新
ctrl+G	 到指定行的代码
ctrl+]/	 光标到代码块的前面或后面
alt+up/down	 上一个/下一个方法
```

