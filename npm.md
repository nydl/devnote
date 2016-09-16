<meta http-equiv="content-type" content="text/html; charset=UTF-8">

<link href="css/markdown7.css" media="all" rel="stylesheet" type="text/css" />

<link rel="stylesheet" href="css/prettify.css" />

<script src="js/jquery-2.0.0.min.js"></script>

<script src="js/prettify.js"></script>

<!-- TOC depth:6 withLinks:1 updateOnSave:1 -->

-	[NPM是什么](#npm)
-	[我们需要了解什么](#)
-	[本地安装 vs 全局安装](#-vs-)
	-	[本地安装](#)
	-	[全局安装](#)
	-	[本地路径安装](#)
	-	[依赖项自动安装](#)
	-	[指定版本号安装](#)
	-	[安装其它指令](#)
	-	[卸载](#)
-	[npm包管理](#npm)
	-	[查看](#)
-	[npm发布](#npm)
-	[NPM配置](#npm)
	-	[设置proxy](#proxy)
	-	[查看proxy](#proxy)
	-	[删除proxy](#proxy)
	-	[查看所有配置](#)
-	[关于package.json](#packagejson)
	-	[package版本](#package)
		-	[常见版本声明形式](#)
		-	[版本书写要求](#)
-	[npm 自动化](#npm-)
	-	[script](#script)
	-	[构建javascript](#javascript)
	-	[监视 javascript](#-javascript)
	-	[构建CSS](#css)
	-	[监视CSS](#css)
	-	[序列化子任务](#)
	-	[并行子任务](#)
	-	[完整的package.json例子](#packagejson)
	-	[当事情变得非常复杂的时候](#)
-	[!/bin/bash](#binbash)
	-	[Windows](#windows)
	-	[总结](#)<!-- /TOC -->

![](git/nodenpm.png)

npm
===

NPM是什么
---------

NPM（node package manager），通常称为node包管理器。顾名思义，它的主要功能就是管理node包，包括：安装、卸载、更新、查看、搜索、发布等。

npm的背后，是基于couchdb的一个数据库，详细记录了每个包的信息，包括作者、版本、依赖、授权信息等。它的一个很重要的作用就是：将开发者从繁琐的包管理工作（版本、依赖等）中解放出来，更加专注于功能的开发。

npm官网：https://npmjs.org/

npm官方文档：https://npmjs.org/doc/README.html

我们需要了解什么
----------------

-	npm的安装、卸载、升级、配置
-	npm的使用：package的安装、卸载、升级、查看、搜索、发布
-	npm包的安装模式：本地 vs 全局
-	package.json：包描述信息
-	package版本：常见版本声明形式
-	npm包安装模式

本地安装 vs 全局安装
--------------------

在具体介绍npm包的管理之前，我们首先得来了解一下npm包的两种安装模式。

node包的安装分两种：本地安装、全局安装。两者的区别如下，后面会通过简单例子说明

###本地安装 指令：npm install|i pkg package会被下载到当前所在目录，也只能在当前目录下使用。 运行如下命令，就会在当前目录下安装grunt-cli（grunt命令行工具）

npm install grunt-cli 安装结束后，当前目录下回多出一个node_modules目录，grunt-cli就安装在里面。同时注意控制台输出的信息：`js
grunt-cli@0.1.9 node_modules/grunt-cli
├── resolve@0.3.1
├── nopt@1.0.10 (abbrev@1.0.4)
└── findup-sync@0.1.2 (lodash@1.0.1, glob@3.1.21)
` 简单说明一下：* grunt-cli@0.1.9：当前安装的package为grunt-cli，版本为0.19* node_modules/grunt-cli：安装目录* resolve@0.3.1：依赖的包有resolve、nopt、findup-sync，它们各自的版本、依赖在后面的括号里列出来

###全局安装 指令：npm install|i -g pkg package会被下载到到特定的系统目录下，安装的package能够在所有目录下使用。 上面已经安装了grunt-cli，然后你跑到其他目录下面运行如下命令

grunt 果断提示你grunt命令不存在，为什么呢？因为上面只是进行了本地安装，grunt命令只能在对应安装目录下使用。

-bash: grunt: command not found 如果为了使用grunt命令，每到一个目录下都得重新安装一次，那不抓狂才怪。肿么办呢？

很简单，采用全局安装就行了，很简单，加上参数-g就可以了

npm install -g grunt-cli 于是，在所有目录下都可以无压力使用grunt命令了。这个时候，你会注意到控制台输入的信息有点不同。主要的区别在于安装目录，现在变成了`/usr/local/lib/node_modules/grunt-cli`  
`/usr/local/lib/node_modules/` 也就是之前所说的全局安装目录啦。`
grunt-cli@0.1.9 /usr/local/lib/node_modules/grunt-cli
├── resolve@0.3.1
├── nopt@1.0.10 (abbrev@1.0.4)
└── findup-sync@0.1.2 (lodash@1.0.1, glob@3.1.21)
`

### 本地路径安装

指令：npm install|i 路径或zip包  
将包下载到本地后，指定路径即可安装

### 依赖项自动安装

指令：npm install|i  
在局部 package.json的路径，直接运行上述指令，则按package.json中指定的依赖项自动安装。

### 指定版本号安装

指令：npm install grunt-cli@"0.1.9"  
安装最新版本的grunt-cli  
不带版本号，安装最新版本

### 安装其它指令

npm install --help  
输出如下，有兴趣的童鞋可以了解下

-	npm install <tarball file>
-	npm install <tarball url>
-	npm install <folder>
-	npm install <pkg>
-	npm install <pkg>@<tag>
-	npm install <pkg>@<version>
-	npm install <pkg>@<version range>
-	卸载grunt-cli

### 卸载

比如卸载grunt-cli  
npm uninstall grunt-cli  
卸载0.1.9版本的grunt-cli  
npm uninstall grunt-cli@"0.1.9"

## link

- 进入该模块，使用 link指令，即可实现全局调用：cmd 使用管理员权限运行，否则link失败。
- 在该目录：C:\Program Files\iojs\node_modules\npm\node_modules\node-gyp，执行 link指令即可将该模块链接到全局路径
- 全局路径 C:\Users\walter\AppData\Roaming\npm\node_modules\node-gyp 有了该包，可全局调用！
- npm link 指定模块，如“coffee-script”，可将该全局模块链接到项目，而不是拷贝安装
- 链接的好处是，原模块更新后，link的模块，自动更新，如果是 拷贝安装，则原模块更新，拷贝安装的模块不会更新！


## npm link引起的Cannot find module 'jade'错误

在一个express3项目中，express模块是用npm link链向了全局目录下的express模块，jade还是在项目本地的node_modules中，在运行的时候出现 Cannot find module ‘jade’ 错误。

按说不管是用软链接指向全局目录的还是安装在本地模块目录的都应该能找到才对，怎么会出现模块找不到的问题呢，查了一下才发现，原来是express的模版引擎调用机制的问题，它会按自己所在目录的相对位置来查找模版引擎模块(如jade)，我们实际使用的express模块在全局目录，所以express会在全局目录里面找jade模块，找不到就会报错。

解决办法：

将express和模版引擎模块安装在同一个目录，或者都在全局目录，或者都在项目本地模块目录，这样就能正确调用了。

npm包管理
---------

npm的包管理命令是使用频率最高的，所以也是我们需要牢牢记住并熟练使用的。其实无非也就是几个动作：安装、卸载、更新、查看、搜索、发布等。

### 查看

npm ls：查看安装了哪些包  
运行如下命令，就可以查看当前目录安装了哪些package 输出如下`
/private/tmp/npm
└─┬ grunt-cli@0.1.9
  ├─┬ findup-sync@0.1.2
  │ ├─┬ glob@3.1.21
  │ │ ├── graceful-fs@1.2.3
  │ │ ├── inherits@1.0.0
  │ │ └─┬ minimatch@0.2.12
  │ │   ├── lru-cache@2.3.0
  │ │   └── sigmund@1.0.0
  │ └── lodash@1.0.1
  ├─┬ nopt@1.0.10
  │ └── abbrev@1.0.4
  └── resolve@0.3.1
` 输出如下，同样，如果是要查看package的全局安装信息，加上-g就可以

npm ls pkg：查看特定package的信息 运行如下命令，输出grunt-cli的信息

npm ls grunt-cli 输出的信息比较有限，只有安装目录、版本，如下：`
/private/tmp/npm
└── grunt-cli@0.1.9
` 如果要查看更详细信息，可以通过npm info pkg，输出的信息非常详尽，包括作者、版本、依赖等。  
npm info grunt-cli npm update pkg：package更新

更新：npm update grunt-cli 搜索：npm search pgk 输入如下命令  
npm search grunt-cli 返回结果如下  
`
npm http GET http://registry.npmjs.org/-/all/since?stale=update_after&startkey=1375519407838
npm http 200 http://registry.npmjs.org/-/all/since?stale=update_after&startkey=1375519407838
NAME                  DESCRIPTION                                        AUTHOR            DATE              KEYWORDS
grunt-cli             The grunt command line interface.                  =cowboy =tkellen  2013-07-27 02:24
grunt-cli-dev-exitprocess The grunt command line interface.              =dnevnik          2013-03-11 16:19
grunt-client-compiler Grunt wrapper for client-compiler.                 =rubenv           2013-03-26 09:15  gruntplugin
grunt-clientside      Generate clientside js code from CommonJS modules  =jga              2012-11-07 01:20  gruntplugin
`

npm发布
-------

这个命令我自己也还没实际用过，不误导大家，语法如下，也可参考官方对于package发布的说明https://npmjs.org/doc/developers.html：

npm publish <tarball> npm publish <folder>

NPM配置
-------

npm的配置工作主要是通过npm config命令，主要包含增、删、改、查几个步骤，下面就以最为常用的proxy配置为例。

### 设置proxy

内网使用npm很头痛的一个问题就是代理，假设我们的代理是 `http://proxy.example.com:8080`，那么命令如下：`js
npm config set proxy http://proxy.example.com:8080
` 由于npm config set命令比较常用，于是可以如下简写`
npm set proxy http://proxy.example.com:8080
`

### 查看proxy

设置完，我们查看下当前代理设置

npm config get proxy 输出如下：`
http://proxy.example.com:8080/
` 同样可如下简写：  
npm get proxy

### 删除proxy

代理不需要用到了，那删了吧`
npm delete proxy
`

### 查看所有配置

npm config list  
直接修改配置文件 有时候觉得一条配置一条配置地修改有些麻烦，就直接进配置文件修改了  
npm config edit

关于package.json
----------------

包的描述信息啦。假设当我们下载了node应用，这个node应用依赖于A、B、C三个包，如果没有package.json，我们需要人肉安装这个三个包（如果对版本有特定要求就更悲剧了）：* npm install A* npm install B* npm install C 有了package.json，一行命令安装所有依赖。

npm install package.json字段简介 字段相当多，但最重要的的是下面几个* name: package的名字（由于他会成为url的一部分，所以 non-url-safe 的字母不会通过，也不允许出现"."、"_"），最好先在 http://registry.npmjs.org/ 上搜下你取的名字是否已经存在* version: package的版本，当package发生变化时，version也应该跟着一起变化，同时，你声明的版本需要通过semver的校验（semver可自行谷歌）* dependencies: package的应用依赖模块，即别人要使用这个package，至少需要安装哪些东东。应用依赖模块会安装到当前模块的node_modules目录下。* devDependencies：package的开发依赖模块，即别人要在这个package上进行开发* 其他：参见官网

### package版本

在package.json里，你经常会在包名后看到类似"~0.1.0"这样的字符串，这就是包的版本啦。下面会列举最常见的版本声明形式，以及版本书写的要求。  

使用install --save时，会将该安装包写入 package.json中，并添加小尖尖（^）而不是小波浪（~）作为依赖版本的前缀。

#### 常见版本声明形式

1.	"~1.2.3"匹配中间的数字  
	`
	"~1.2.3" = ">=1.2.3 <1.3.0"
	"~1.2" = ">=1.2.0 <1.3.0"
	"~1" = ">=1.0.0 <1.1.0"
	`
2.	"1.x.x"匹配x位置数字  
	`
	"1.2.x" = ">=1.2.0 <1.3.0"
	"1.x.x" = ">=1.0.0 <2.0.0"
	"1.2" = "1.2.x"
	"1.x" = "1.x.x"
	"1" = "1.x.x"
	`
3.	"^1.x.x"匹配第一个数字  
	`
    "co": "^4.1.0",  = >=4 <5
    "koa": "^2.0.0",
	`


### 它们有什么区别呢？简单来说：

- ~会匹配最新的子版本（中间那个数字），比如~1.2.3会匹配所有的1.2.x版本，但不匹配到1.3.0及以上
- ^会匹配最新的主版本（第一个数字），比如^1.2.3将会匹配所有的1.x.x版本，2.0.0就缓缓飘过了。
- 附上版本控制的其他范围：  
	version 必须严格匹配到 version 版本
	>version 必须大于 version 的版本
	>=version 大于等于 version 的版本
	<version 小于
	<=version 小于等于
	~version “几乎相同的版本（Approximately equivalent to version）” 参见semver(7)
	^version “兼容的版本” 参见 semver(7)
	1.2.x 匹配1.2.0, 1.2.1, 之类., 但不匹配 1.3.0
	http://... 以URL地址作为依赖
	* 匹配任意版本
	"" (就是一个空白字符empty string) 同 *，任意版本
	version1 - version2 同 >=version1 <=version2.
	range1 || range2  range1 或者 range2 的任一版本.
	git... 以GIT地址作为依赖
	user/repo 以GitHub地址作为依赖
	tag 匹配一个以 tag 标记并发布的版本，参见 npm-tag(1)
	path/path/path 以本地地址作为依赖

	
#### 版本书写要求

	版本可以v开头，比如 v1.0.1（v只是可选）, 1.0.1-7，这里的7是所谓的“构建版本号”，不理是神马，反正版本大于1.0.1 1.0.1beta，或者1.0.1-beta，如果1.0.1后面不是 “连字符加数字” 这种形式，那么它是pre release 版本，即版本小于 1.0.1 根据b、c，有：0.1.2-7 > 0.1.2-7-beta > 0.1.2-6 > 0.1.2 > 0.1.2beta 写在后面

npm 自动化
----------

### script

npm 会在项目的`package.json`文件中寻找`scripts`区域，其中包括`npm test`和`npm start`等命令。

其实`npm test`和`npm start`是`npm run test`和`npm run start`的简写。事实上，你可以使用npm run来运行scripts里的任何条目。

使用`npm run`的方便之处在于，npm会自动把`node_modules/.bin`加入$PATH，这样你可以直接运行依赖程序和开发依赖程序，不用全局安装了。只要npm上的包提供命令行接口，你就可以直接使用它们，方便吧？当然，你总是可以自己写一个简单的小程序。

### 构建javascript

为了便于组织代码和利用npm上的包，写代码的时候往往使用`module.exports和require()。browserify`可以将这些一起打包成单一的脚本。使用`browserify`很简单，只需在package.json中加入一个['build-js']条目，类似这样：`
"build-js": "browserify browser/main.js > static/bundle.js"
` 如果是用于生产环境，还需要压缩一下。我们只需要将uglify-js加入devDependency，然后直接通过管道传递一下即可：`
"build-js": "browserify browser/main.js | uglifyjs -mc > static/bundle.js"
`

### 监视 javascript

为了能在修改文件之后自动重新生成javascript文件，只需将上面的browserify命令换成watchify并加上一些参数。`
"watch-js": "watchify browser/main.js -o static/bundle.js -dv"
` 这里加了-d和-v两个参数，这样就可以看到详细的调试信息。

### 构建CSS

用cat就可以搞定：`
"build-css": "cat static/pages/*.css tabs/*/*.css > static/bundle.css"
`

### 监视CSS

和上面用 watchify 监视 javascript 类似，我们用catw监视CSS文件的改动：`
"watch-css": "catw static/pages/*.css tabs/*/*.css -o static/bundle.css -v"
`

### 序列化子任务

很简单，npm run每个子任务，然后用&&连接起来就成。`
"build": "npm run build-js && npm run build-css"
`

### 并行子任务

类似地，我们用&并行子任务：`
"watch": "npm run watch-js & npm run watch-css"
`

### 完整的package.json例子

将上面提到的内容组合起来，package.json大致就是这个样子：`js
{
  "name": "my-silly-app",
  "version": "1.2.3",
  "private": true,
  "dependencies": {
    "browserify": "~2.35.2",
    "uglifyjs": "~2.3.6"
  },
  "devDependencies": {
    "watchify": "~0.1.0",
    "catw": "~0.0.1",
    "tap": "~0.4.4"
  },
  "scripts": {
    "build-js": "browserify browser/main.js | uglifyjs -mc > static/bundle.js",
    "build-css": "cat static/pages/*.css tabs/*/*.css",
    "build": "npm run build-js && npm run build-css",
    "watch-js": "watchify browser/main.js -o static/bundle.js -dv",
    "watch-css": "catw static/pages/*.css tabs/*/*.css -o static/bundle.css -v",
    "watch": "npm run watch-js & npm run watch-css",
    "start": "node server.js",
    "test": "tap test/*.js"
  }
}
` 生产环境下，只需运行`npm run build`。如果是本地开发，就用`npm run watch`。

你也可以坐下扩展。比方说，如果你希望在运行start前先运行build，那么你只需写上这么一行：`
"start": "npm run build && node server.js"
` 也许你想同时启动watcher？`
"start-dev": "npm run watch & npm start"
`

### 当事情变得非常复杂的时候

如果你发现在单个scripts条目中塞了一大堆命令，那你可以考虑重构一下，把一些命令放到别的地方，比如/bin。

你可以用任何语言编写这个脚本，比如bash、node或perl。只需要在脚本上加上合适的#!行。还有，别忘了chmod +x。`
#!/bin/bash
(cd site/main; browserify browser/main.js | uglifyjs -mc > static/bundle.js)
(cd site/xyz; browserify browser.js > static/bundle.js)
``
"build-js": "bin/build.sh"
`

### Windows

你可能会吃惊的是，相当多的类bash语法可以在Windows上工作。不过我们至少还需要让;和&可以正常工作。

James Halliday分享过一些在Windows兼容的经验，这些经验也适用于本文的主题，可以参考。此外要推荐下win-bash，这是一个很方便的Windows平台上的bash实现。

### 总结

James Halliday希望这个使用npm run的方式能吸引一部人对现有的前端自动化任务工具不满意的人。James Halliday比较偏好unix体系下的那些学习曲线陡峭的工具，比如git，或者类似 npm 这种在 bash 的基础上提供极简界面的工具。也就是说，不需要很多仪式化操作和配合的工具。非常简单的工具，已经足够胜任通常的任务。

如果你对npm run风格不感冒。你也许可以考虑下Makefiles，一个稳定而简单，不过多少有点怪异的替代品。
