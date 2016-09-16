<meta http-equiv="content-type" content="text/html; charset=UTF-8">

<link href="css/markdown7.css" media="all" rel="stylesheet" type="text/css" />

Node.js
=======

服务端 JS 开发、运行平台

网址：https://nodejs.org/  
iojs网址：https://iojs.org  
V8引擎网址：http://code.google.com/p/v8/

V8引擎介绍
----------

Google 使用 V8 创建了一个用 C++ 编写的超快解释器，该解释器拥有另一个独特特征； 您可以下载该引擎并将其嵌入任何 应用程序。 V8 JavaScript 引擎并不仅限于在一个浏览器中运行。 因此，Node 实际上会使用 Google 编写的 V8 JavaScript 引擎，并将其重建为可在服务器上使用。 太完美了！

Node的应用领域不仅限于此。iSO应用公司Voxer利用Node创造更好的实时语音体验。Node帮助Voxer实现音频数据的即时传输时降低延迟。 Node的作用非常关键，因为音频需要即时性的，我们通过Node维护了大量的网络连接，而且延迟很低。这是一个显而易见的选择。 我们在做实时语音时尝试了三次。第一次基于性能原因使用了C++，但是它太复杂了，难以处理。接下来选择了Python。它自身非常不错，但是很不幸， Python虚拟机慢得令人抓狂。 所以我们走了另外一条路，在第三次尝试时选择了Node，现在是两全其美，一方面我们能够使用优秀的Javascript语言， 另一方面也可以使用高性能的V8引擎。

在社交网站LinkedIn最新发布的移动应用中，HTML5技术抢占前端开发，而Node则是该移动应用的后台基础。LinkedIn移动开发主管Kiran Prasad对媒体表示， 其整个移动软件平台都由Node构建而成： LinkedIn内部使用了大量的技术，但是在移动服务器这一块，我们完全基于Node。

使用它的原因
------------

1.	第一，是因为其灵活性。
2.	第二，如果你了解Node，就会发现它最擅长的事情是与其他服务通信。移动应用必须与我们的平台API和数据库交互。我们没有做太多数据分析。相比之前采用的Ruby on Rails技术，开发团队发现Node在性能方面提高很多。他们在每台物理机上跑了15个虚拟服务器（15个实例），其中4个实例即可处理双倍流量。容量评估基于负载测试的结果。 不过，Prasad也承认Node不是对所有任务都适合。他们的产品包含一个推荐引擎，需要处理大量的数据，Node就不能胜任。在被问到对于像Node这样新的技术，LinkedIn团队是否担心其不够成熟、无法应用到企业级产品中呢？Prasad表示的确存在顾虑，不过他在加入LinkedIn之前就已经对Node比较了解。
3.	我们对许多潜在的平台做了分析，包括Ruby、Node、Java、Scala等，我们一直在使用它并观察其表现。这就是我们技术选型的方式， 未来将继续尝试新技术，没有人会因为尝试新东西而遭受厄运。  
	追求新技术会给开发人员更多的发展机会，看看Node社区里，许多人是从Rails社区转移过来的。

Node.js--服务端 js
------------------

深入了解 js之后，发现确实非常强大，语言非常优美，可以说完全集合了 C++、Java等的优点， C# 4里面大量模仿了 js语法， 如 var，匿名函数，=> 表达式等， 从而证明 js的强大！但是也保留了动态脚本语言的灵活、便捷性，非常纳闷的是，为何没人将js作为一个独立的程序语言，来实现客户端、服务器端程序开发！ 华文的 IVR系统，就是使用js，动态解析执行的，使用了 JAVA js 解释运行引擎！ 我的IVR系统，则是 自己定义的一套 语法，后台 自己用 C++做的解释执行引擎！ Node.js 正是这样的一个运行类库，支持 js对各个类的调用！ 使用了 Google的 V8 js执行引擎，Node.js支持各种插件和模块，从而可实现各种特定用途的独立程序！ v8引擎是所有js引擎中最快的引擎，V8 比 Internet Explorer 的 JScript 、Firefox 中的 SpiderMonkey 以及 Safari 中的 JavaScriptCore 要快上数倍。 V8 在第一次执行 JavaScript 代码的时候会将其直接编译为本地机器码， 而不是使用中间字节码的形式，因此也没有解释器的存在。 属性访问由内联缓存代码来完成，这些代码通常会在运行时由 V8 修改为合适的机器指令。 JS 调用的是 V8插件，V8插件都是C++编写的，因此，真正的执行速度是非常快的！ V8支持垃圾回收，这是 JAVA、C#对 C++最大的改进 绝大部分系统崩溃，都是 指针越界和内存泄露导致，垃圾回收，解决 指针越界和内存泄露问题， 从而对编程者要求降低，程序的稳定性得到增强！

Node.js 比如创建 一个 WebServer： var http = require('http');

```
http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World\n');
}).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');
```

类似 PHP，一个脚本语言，js 更强大，更灵活，更方便！ 个人 一直不喜欢 PHP 语言，太多的 $，没有美感！ PHP运行还需要 Apache， Node.js = PHP + Apache Node.js = Python

编译C++插件
-----------

-	编译C++插件需要安装C++编译器，windows一般需安装 Visual Studio C++ 2012/2013
-	有的C++代码需要支持库（Visual C++ Redistributable Packages for Visual Studio 2013 ）
	-	如：msvcp120.dll，msvcr120.dll的引用
	-	64位：vcredist_x64.exe
	-	32位：vcredist_x86.exe
	-	arm：vcredist_arm.exe
-	及python 2.7，目前最新版本是2.7.10，不能使用3
-	python 2.7下载网址：https://www.python.org/downloads/
-	安装时，选择将python加到 path，方便执行
-	需使用 node-gyp生成 node的 v8插件，node.js 是由 v8解析执行的，在解析执行中，就可以通过v8插件识别js指令！
	-	如果安装了多个版本的 python，则需指定路径 `npm config set python /path/to/executable/python2.7`
	-	node-gyp 需安装 Visual Studio C++ 2012/2013 c++编译器，
	-	npm i zmq 就可以直接安装成功，npm 会自动调用 node-gyp，不需要额外安装 node-gyp
	-	binding.gyp 该文件由node-gyp使用，旨在为我们的插件生成适当的build文件。
-	node-gyp Node.js native addon build tool
	-	https://github.com/nodejs/node-gyp
	-	为支持 iojs提取下载库文件的辅助插件，现在无用！ https://github.com/mafintosh/node-gyp-install

它对什么有好处？ 正如您此前所看到的，Node 非常适合以下情况： 在响应客户端之前，您预计可能有很高的流量，但所需的服务器端逻辑和处理不一定很多。Node 表现出众的典型示例包括：

```
RESTful API
    提供 RESTful API 的 Web 服务接收几个参数，解析它们，组合一个响应，并返回一个响应（通常是较少的文本）给用户。
    这是适合 Node 的理想情况，因为您可以构建它来处理数万条连接。它仍然不需要大量逻辑；
    它本质上只是从某个数据库中查找一些值并将它们组成一个响应。由于响应是少量文本，入站请求也是少量的文本，
    因此流量不高，一台机器甚至也可以处理最繁忙的公司的 API 需求。

Twitter 队列
    想像一下像 Twitter 这样的公司，它必须接收 tweets 并将其写入数据库。
    实际上，每秒几乎有数千条 tweet 达到，数据库不可能及时处理高峰时段所需的写入数量。

    Node 成为这个问题的解决方案的重要一环。如您所见，Node 能处理数万条入站 tweet。
    它能快速而又轻松地将它们写入一个内存排队机制（例如 memcached），另一个单独进程可以从那里将它们写入数据库。

    Node 在这里的角色是迅速收集 tweet，并将这个信息传递给另一个负责写入的进程。
    想象一下另一种设计（常规 PHP 服务器会自己尝试处理对数据库本身的写入）：
    每个 tweet 都会在写入数据库时导致一个短暂的延迟，因为数据库调用正在阻塞通道。
    由于数据库延迟，一台这样设计的机器每秒可能只能处理 2000 条入站 tweet。
    每秒处理 100 万条 tweet 则需要 500 个服务器。相反，Node 能处理每个连接而不会阻塞通道，
    从而能够捕获尽可能多的 tweets。一个能处理 50,000 条 tweet 的 Node 机器仅需 20 台服务器即可。

电子游戏统计数据
    如果您在线玩过《使命召唤》这款游戏，当您查看游戏统计数据时，
    就会立即意识到一个问题：要生成那种级别的统计数据，必须跟踪海量信息。
    这样，如果有数百万玩家同时在线玩游戏，而且他们处于游戏中的不同位置，
    那么很快就会生成海量信息。
    Node 是这种场景的一种很好的解决方案，
    因为它能采集游戏生成的数据，对数据进行最少的合并，然后对数据进行排队，
    以便将它们写入数据库。使用整个服务器来跟踪玩家在游戏中发射了多少子弹看起来很愚蠢，
    如果您使用 Apache 这样的服务器，可能会 有一些有用的限制；
    但相反，如果您专门使用一个服务器来跟踪一个游戏的所有统计数据，
    就像使用运行 Node 的服务器所做的那样，那看起来似乎是一种明智之举。
```

```

入门手册 http://nodebeginner.org/index-zh-cn.html http://www.nodebeginner.org/index-zh-cn.html

安装node
--------

- node.js https://nodejs.org/en/download/
- windows 版本，下载 node-v5.0.0-x64.msi，安装，如果之前安装过 iojs，可卸载
- iojs
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
	- iojs 已经与node言归于好合并了，卸载 iojs，重新安装
-	直接运行，按缺省方式安装！
-	如果以前安装有node.js 请卸载，如果安装有旧版本iojs，无需卸载，直接安装即可覆盖。
-	安装完毕，会自动将 node、iojs、npm加入路径！
-	在命令行执行 iojs -v 可看到 安装的版本号。

安装 直接从 官网下载 Node.js 安装程序， 支持 Windows、Linux、Apple 三种操作系统

```

如果你想长期做 node 开发, 或者想快速更新 node 版本, 或者想快速切换 node 版本, 那么在非 Windows(如 osx, linux) 环境下, 请使用 nvm 来安装你的 node 开发环境, 保持系统的干净.

如果你使用 Windows 做开发, 那么你可以使用 nvmw 来替代 nvm https://github.com/creationix/nvm https://github.com/hakobera/nvmw https://github.com/coreybutler/nvm-windows

mac os系统，先安装 brew，使用 brew 安装 nvm，安装完毕，需按提示将 export NVM_IDR=~/.nvm source $(brew --prefix nvm)/nvm.sh 写入 .bash_profile（mac中 ~/.bashrc , ~/.profile , 或者 ~/.zshrc都不对） 文件，才能运行 nvm指令！

nvm ls 已经安装的版本 nvm ls-rmote 服务器上的有效版本 nvm install 安装哪个版本 nvm use 使用哪个版本

如果不设置，每次重启计算机，都需要设置 按项目设置不同的版本：  
 如果每个项目要用到不同版本的 node，那么就在你的项目目录下用 .nvmrc 设置缺省的 nvm use 版本号， 然后在 package.json 的各个 script 入口代码加上 nvm use 即可。 这项执行 start/test 等脚本前就会先 use 一下。 Example: nvm install v0.10.24 Install a specific version number nvm install iojs-v1.0.3 nvm use 0.10 Use the latest available 0.10.x release nvm run 0.10.24 myApp.js Run myApp.js using node v0.10.24 nvm alias default 0.10.24 Set default node version on a shell

Note: to remove, delete or uninstall nvm - just remove ~/.nvm, ~/.npm and ~/.bower folders

系统缺省：.bash_profile 中设置 nvm alias default stable/0.10.x

```

```

Windows 会自动 将程序安装在

```

C:\Program Files\nodejs 目录！ 全局模块安装在 C:\Users\Walter\AppData\Roaming\npm

```

```
程序目录会有 一个 node.exe 文件 和 npm.cmd 文件，
node 文件，就可执行 js 脚本了，类似 java！
npm 能实现 模块安装！
```

上述两个目录 会自动加到 系统 的 Path 路径，方便 执行！ 如果没有自动加载，请手工加载！ 如果Path中已经有了，但是不生效，请手工修改 path，保存下，确保 node 所在 path生效！

更新 版本，请 下载新版本，直接安装即可！

查看版本： 再 输入 指令 node -v 版本 npm -v 版本

```
如果上诉两个命令出错，请打开系统环境变量Path，加入 node.js 路径，再试。

cmd 命令行下，执行 node，启动 node shell
> process.versions
返回 安装node 版本信息：
{ node: '0.6.13',
    v8: '3.6.6.24',
    ares: '1.7.5-DEV',
    uv: '0.6',
    openssl: '0.9.8r' }
>
```

运行 代码 node xxx.js

```

```

下载 Node 源代码 node-v5.0.0.tar.gz 并 放入 Node项目文件夹，比如 为 Node专门建立的 项目目录： C:\Users\Walter\Prjs\node

使用 cnpm 加速 npm
------------------

同理 nvm , npm 默认是从国外的源获取和下载包信息, 不慢才奇怪. 可以通过简单的 ---registry 参数, 使用国内的镜像 http://r.cnpmjs.org : 如： $ npm --registry=http://r.cnpmjs.org install koa

但是毕竟镜像跟官方的 npm 源还是会有一个同步时间差异, 目前 cnpm 的默认同步时间间隔是 15 分钟. 如果你是模块发布者, 或者你想马上同步一个模块, 那么推荐你安装 cnpm cli:

$ npm --registry=http://r.cnpmjs.org install cnpm -g 通过 cnpm 命令行, 你可以快速同步任意模块:

$ cnpm sync koa connect mocha 呃, 我就是不想安装 cnpm cli 怎么办? 哈哈, 早就想到你会这么懒了, 于是我们还有一个 web 页面:

例如我想马上同步 koa, 直接打开浏览器: http://cnpmjs.org/sync/koa

或者你是命令行控, 通过 open 命令打开:

$ open http://cnpmjs.org/sync/koa 如果你安装的模块依赖了 C++ 模块, 需要编译, 肯定会通过 node-gyp 来编译, node-gyp 在第一次编译的时候, 需要依赖 node 源代码, 于是又会去 node dist 下载, 于是大家又会吐槽, 怎么 npm 安装这么慢...

好吧, 于是又要提到 --disturl 参数, 通过七牛的镜像来下载:

$ npm --registry=http://r.cnpmjs.org --disturl=http://dist.u.qiniudn.com install microtime 再次要提到 cnpm cli, 它已经默认将 --registry 和 --disturl 都配置好了, 谁用谁知道 . 写到这里, 就更快疑惑那些不想安装 cnpm cli 又吐槽 npm 慢的同学是基于什么考虑不在本地安装一个 cnpm 呢?

github 好慢

好了, 看到这里大家应该对 node 和 npm 已经没有速度慢的问题了.

github 慢, 或者说是它的资源 host 被堵而已, 大家可以通过简单的 hosts 映射解决:

185.31.16.184 github.global.ssl.fastly.net

```

python 2.7 https://www.python.org/downloads/

```

这篇文章主要介绍了我个人使用的一些Node.js开发工具、开发包、框架等总结,需要的朋友可以参考下 开发工具

1.WebStorm，毫无疑问非他莫属，跨平台，强大的代码提示，支持Nodejs调试，此外还支持vi编辑模式，这点我很喜欢。 2.做些小型项目用Sublime Text。 3.Browserify：将你的nodejs模块应用到浏览器中 4.nvm:nodejs版本管理工具，你可能会用到多个nodejs版本（如v0.11.x支持generator的nodejs和stable的v0.10.x版本），用它可以方便切换

测试&自动化

1.mocha：一个简单、灵活有趣的 JavaScript 测试框架（类似的还有should，supretest） 2.gruntjs：迄今为止node世界中最流行的构建工具 3.gulp.js：宣称取代gruntjs的东东 4.node-inspector：nodejs代码调试神奇，结合浏览器Chrome-Debug，轻量，方便 5.node-dev：代码改了，还在不断的按Ctrl+C吗？快试试这个工具吧，使用fs.watch()监控项目目录，代码变化后，自动重启项目 6.pm2：替代node-forever的新秀

第三方开发包

1.Edge.js：让.NET和nodejs在同一进程中运行，相互调用（神器的东西啊） 2.Express，优秀的Web开发框架 3.moment，强大的日期处理库 4.cheerio，jQuery核心选择器的实现，可跑在server端，类似jsdom，但比jsdom轻量很多 5.async，异步处理 6.shortid，url友好的unique id 7.log4js，日志记录，稳健的系统离不开日志记录 8.colors，便于在console中输出不同颜色的文本（tinycolor，更轻量级的控制台颜色设置） 9.xmlrpc，方便xml远程过程调用，比如写metaweblog的时候可能会用到 10.commander：编写命令行应用必备，简化各种命令解析操作 11.koa:Express的接班人 12.chokidar：完善的文件、文件夹监控包，解决了fs.watch诸多不完善的地方，可以进行子目录的监控，相当方便 13.axon：消息、常见socket模式的上层实现，简化socket开发，TJ大神作品 14.cron：采用crontab语法的任务计划包 15.open：使用本地应用打开文件或者url 16.term-list：cli辅助选择操作 17.deepmerge: js对象深度合并 18.loadsh，underscore：js常用工具库，对象合并，排序算法，map，reduce等 19.iconv-lite:纯js实现的编码转换库，开发爬虫等场景会经常用到。 20.request: 更简单的发送http请求 21.needle：轻量级的http client模块，集成了iconv-lite，跟request类似 22.superagent：类似request，使用风格跟jQuery神似。 23.mobile-agent: 判断是手机浏览器的访问还是pc端的访问，对做web很有用哦。 24.is-type-of:js辅助库，判断对象的类型 15.http://nssm.cc/ 将 node 程序注册为windows 系统服务

Web框架&工具

1.StrongLoop 2.KeystoneJS 3.CompoundJS 3.Geddy

iconv需要依赖native库，这样一来，在一些不支持native模块安装的虚拟主机和windows平台上，我们还是无法安心处理GBK编码。 老外写了一个通过纯Javascript转换编码的模块 iconv-lite 可以实现window下的转换 ，通过npm可以安装此模块，bufferhelper是一个操作buffer的加强类，关于buffer的详细解析，请参考地址:http://www.infoq.com/cn/articles/nodejs-about-buffer 比如抓取baidu.com,

var http = require('http'), var url = require('url').parse('http://www.baidu.com/'); var iconv = require('iconv-lite'); var BufferHelper = require('bufferhelper');

http.get(url,function(res){ var bufferHelper = new BufferHelper(); res.on('data', function (chunk) { bufferHelper.concat(chunk); }); res.on('end',function(){ console.log(iconv.decode(bufferHelper.toBuffer(),'GBK')); }); })

Zen Coding
==========

Emmet (ex-Zen Coding) Emmet is a toolkit for high-speed HTML, XML, XSL (or any other structured code format) coding and editing. The core of this plugin is a powerful abbreviation engine which allows you to expand expressions—similar to CSS selectors—into HTML code. For example:

div#page>div.logo+ul#navigation>li*5>a

…can be expanded into:

<div id="page"> <div class="logo"></div> <ul id="navigation"> <li><a href=""></a></li> <li><a href=""></a></li> <li><a href=""></a></li> <li><a href=""></a></li> <li><a href=""></a></li> </ul></div> Read more about current Emmet syntax

在设置中 设置 Node 与 NPM，设置 Node.exe 安装路径，及 源代码！

运行 mongodb 必须要 3G以上 空间才能运行！！！ 如果 不能运行，请 删除 lock锁文件，再运行！

```

```

模块（Module）和包（Package）

模块的输出 require 可以包含一个目录，也可以包含一个模块， 每个包必须提供一个借口文件，如 index.js index.node，或 由 package.json 指定 require 对应的系统内置对象 exports，exports 实际上就是一个空对象 {}

```

```

''' exports.Hello = Hello， var Hello = require('./hello').Hello; 或者 module.exports = Hello, // 注意，必须 带 module！ var Hello = require('./hello'); '''

```

```

require module路径 Node 调用包时，首先从 package.json文件的 main 字段查找，main 不存在，会尝试寻找 index.js 或 index.node 作为包的接口。 node man 时，如果 man目录下面有个 index.js，则会 执行 该文件！

```
在进入路径查找之前有必要描述一下module path这个Node.js中的概念。对于每一个被加载的文件模块，创建这个模块对象的时候，
这个模块便会有一个paths属性，其值根据当前文件的路径计算得到。
我们创建modulepath.js这样一个文件，其内容为：
    console.log(module.paths);

我们将其放到任意一个目录中执行node modulepath.js命令，将得到以下的输出结果。
    [ '/home/jackson/research/node_modules',
    '/home/jackson/node_modules',
    '/home/node_modules',
    '/node_modules' ]
Windows下：
    [ 'c:\\nodejs\\node_modules', 'c:\\node_modules' ]

可以看出module  path的生成规则为：从当前文件目录开始查找node_modules目录；
然后依次进入父目录，查找父目录下的node_modules目录；依次迭代，直到根目录下的node_modules目录。

除此之外还有一个全局module path，是当前node执行文件的相对目录（../../lib/node）。
如果在环境变量中设置了HOME目录和NODE_PATH目录的话，
整个路径还包含NODE_PATH和HOME目录下的.node_libraries与.node_modules。其最终值大致如下：
[NODE_PATH，HOME/.node_modules，HOME/.node_libraries，execPath/../../lib/node]

简而言之，如果require绝对路径的文件，查找时不会去遍历每一个node_modules目录，其速度最快。其余流程如下：

从module path数组中取出第一个目录作为查找基准。
直接从目录中查找该文件，如果存在，则结束查找。如果不存在，则进行下一条查找。
尝试添加.js、.json、.node后缀后查找，如果存在文件，则结束查找。如果不存在，则进行下一条。
尝试将require的参数作为一个包来进行查找，读取目录下的package.json文件，取得main参数指定的文件。
尝试查找该文件，如果存在，则结束查找。如果不存在，则进行第3条查找。
如果继续失败，则取出module path数组中的下一个目录作为基准查找，循环第1至5个步骤。
如果继续失败，循环第1至6个步骤，直到module path中的最后一个值。
如果仍然失败，则抛出异常。
整个查找过程十分类似原型链的查找和作用域的查找。所幸Node.js对路径查找实现了缓存机制，否则由于每次判断路径都是同步阻塞式进行，会导致严重的性能消耗。
```

包结构 前面提到，JavaScript缺少包结构。CommonJS致力于改变这种现状，于是定义了包的结构规范 （http://wiki.commonjs.org/wiki/Packages/1.0 ）。而NPM的出现则是为了在CommonJS规范的基础上， 实现解决包的安装卸载，依赖管理， 版本管理等问题。require的查找机制明了之后，我们来看一下包的细节。

```
一个符合CommonJS规范的包应该是如下这种结构：

一个package.json文件应该存在于包顶级目录下
二进制文件应该包含在bin目录下。
JavaScript代码应该包含在lib目录下。
文档应该在doc目录下。
单元测试应该在test目录下。
由上文的require的查找过程可以知道，Node.js在没有找到目标文件时，会将当前目录当作一个包来尝试加载，所以在package.json文件中最重要的一个字段就是main。而实际上，这一处是Node.js的扩展，标准定义中并不包含此字段，对于require，只需要main属性即可。但是在除此之外包需要接受安装、卸载、依赖管理，版本管理等流程，所以CommonJS为package.json文件定义了如下一些必须的字段：

name。包名，需要在NPM上是唯一的。不能带有空格。
description。包简介。通常会显示在一些列表中。
version。版本号。一个语义化的版本号（http://semver.org/ ），通常为x.y.z。该版本号十分重要，常常用于一些版本控制的场合。
keywords。关键字数组。用于NPM中的分类搜索。
maintainers。包维护者的数组。数组元素是一个包含name、email、web三个属性的JSON对象。
contributors。包贡献者的数组。第一个就是包的作者本人。在开源社区，如果提交的patch被merge进master分支的话，就应当加上这个贡献patch的人。格式包含name和email。如：
"contributors": [{
        "name": "Jackson Tian",
        "email": "mail @gmail.com"
    }, {
        "name": "fengmk2",
        "email": "mail2@gmail.com"
}],
bugs。一个可以提交bug的URL地址。可以是邮件地址（mailto:mailxx@domain），也可以是网页地址（http://url）。
licenses。包所使用的许可证。例如：
"licenses": [{
        "type": "GPLv2",
        "url": "http://www.example.com/licenses/gpl.html",
}]
repositories。托管源代码的地址数组。
dependencies。当前包需要的依赖。这个属性十分重要，NPM会通过这个属性，帮你自动加载依赖的包。安装时，也会自动下载安装！
以下是Express框架的package.json文件，值得参考。

{
        "name": "express",
        "description": "Sinatra inspired web development framework",
        "version": "3.0.0alpha1-pre",
        "author": "TJ Holowaychuk
除了前面提到的几个必选字段外，我们还发现了一些额外的字段，如bin、scripts、engines、devDependencies、author。这里可以重点提及一下scripts字段。包管理器（NPM）在对包进行安装或者卸载的时候需要进行一些编译或者清除的工作，scripts字段的对象指明了在进行操作时运行哪个文件，或者执行拿条命令。如下为一个较全面的scripts案例：

"scripts": {
        "install": "install.js",
        "uninstall": "uninstall.js",
        "build": "build.js",
        "doc": "make-doc.js",
        "test": "test.js",
}
如果你完善了自己的JavaScript库，使之实现了CommonJS的包规范，那么你可以通过NPM来发布自己的包，为NPM上5000+的基础上再加一个模块。

npm publish <folder>
命令十分简单。但是在这之前你需要通过npm adduser命令在NPM上注册一个帐户，以便后续包的维护。NPM会分析该文件夹下的package.json文件，然后上传目录到NPM的站点上。用户在使用你的包时，也十分简明：

npm install <package>
甚至对于NPM无法安装的包（因为某些奇怪的网络原因），可以通过github手动下载其稳定版本，解压之后通过以下命令进行安装：

npm install <package.json folder>
只需将路径指向package.json存在的目录即可。然后在代码中require('package')即可使用。

Node.js中的require内部流程之复杂，而方法调用之简单，实在值得叹为观止。更多NPM使用技巧可以参见http://www.infoq.com/cn/articles/msh-using-npm-manage-node.js-dependence。
```

Node.js模块与前端模块的异同 通常有一些模块可以同时适用于前后端，但是在浏览器端通过script标签的载入JavaScript文件的方式与Node.js不同。Node.js在载入到最终的执行中，进行了包装，使得每个文件中的变量天然的形成在一个闭包之中，不会污染全局变量。而浏览器端则通常是裸露的JavaScript代码片段。所以为了解决前后端一致性的问题，类库开发者需要将类库代码包装在一个闭包内。以下代码片段抽取自著名类库underscore的定义方式。

```
(function () {
        // Establish the root object, `window` in the browser, or `global` on the server.
        var root = this;
        var _ = function (obj) {
                        return new wrapper(obj);
                };
        if (typeof exports !== 'undefined') {
                if (typeof module !== 'undefined' && module.exports) {
                        exports = module.exports = _;
                }
                exports._ = _;
        } else if (typeof define === 'function' && define.amd) {
                // Register as a named module with AMD.
                define('underscore', function () {
                        return _;
                });
        } else {
                root['_'] = _;
        }
}).call(this);
首先，它通过function定义构建了一个闭包，将this作为上下文对象直接call调用，以避免内部变量污染到全局作用域。续而通过判断exports是否存在来决定将局部变量_绑定给exports，并且根据define变量是否存在，作为处理在实现了AMD规范环境（http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition）下的使用案例。仅只当处于浏览器的环境中的时候，this指向的是全局对象（window对象），才将_变量赋在全局对象上，作为一个全局对象的方法导出，以供外部调用。

所以在设计前后端通用的JavaScript类库时，都有着以下类似的判断：

if (typeof exports !== "undefined") {
        exports.EventProxy = EventProxy;
} else {
        this.EventProxy = EventProxy;
}
即，如果exports对象存在，则将局部变量挂载在exports对象上，如果不存在，则挂载在全局对象上。

对于更多前端的模块实现可以参考国内淘宝玉伯的seajs（http://seajs.com/），或者思科杜欢的oye（http://www.w3cgroup.com/oye/）。

参考文献
http://www.commonjs.org
http://npmjs.org/doc/README.html
http://www.infoq.com/cn/articles/msh-using-npm-manage-node.js-dependence
http://nodejs.org/docs/latest/api/modules.html
关于作者
田永强，新浪微博@朴灵，前端工程师，现职于SAP，从事Mobile Web App方面的研发工作，对NodeJS持有高度的热情，寄望打通前端JavaScript与NodeJS的隔阂，将NodeJS引荐给更多的前端工程师。兴趣：读万卷书，行万里路。个人Github地址:http://github.com/JacksonTian。
```

```

js压缩 uglifyjs 安装 UglifyJS 这里我们安装最新的版本，具体版本可在npm官网查看，uglify-js版本页面。 ！！！ 对中文符号支持有问题，不知道新版本是否修正！

```

npm install uglify-js -g 然后等待命令完成，这个过程时间可能有点长。 如果出错请删除 C:\Users\Administrator\AppData\Roaming\npm 内相关内容 C:\Users\Administrator\AppData\Roaming\npm-cache 内相关内容 C:\Users\Administrator 下的错误信息文件 然后再次运行

也可从官网直接下载，解压

修改配置

```
上述安装后自动生成的配置文件是不可直接使用的，我们需要手工去修改。
打开C:\Users\Administrator\AppData\Roaming\npm\uglifyjs.cmd
内容为：
:: Created by npm, please don't edit manually.
"%~dp0\.\node_modules\uglify-js\bin\uglifyjs"   %*
修改为：
:: Created by npm, please don't edit manually.
@IF EXIST "%~dp0"\"node.exe" (
    "%~dp0"\"node.exe"  "%~dp0\.\node_modules\uglify-js\bin\uglifyjs" %*
) ELSE (
    node  "%~dp0\.\node_modules\uglify-js\bin\uglifyjs" %*
)
```

D:\1Prjs\Tools\uglifyjs 生成 鼠标右键指令，点击即可执行！

五、使用uglifyjs对javascript进行压缩美化

```
压缩：
uglifyjs f.js > f.min.js
美化：
uglifyjs -b f.min.js > f.b.js
```

```

代码调试 Eclipse 安装 V8 调试插件即可 远程调试！ 网上 搜索下，参照安装设置即可！

iis 集成 iisnode 的優點

```

修改 .js 不用重新啓動 node 程序（iisnode 會自動 watch *.js） 與 IIS 共享相同連接埠（80 port）

```

URL Rewrite

IIS URL Rewrite 2.0 enables Web administrators to create powerful rules to implement URLs that are easier for users to remember and easier for search engines to find. By using rule templates, rewrite maps, .NET providers, and other functionality integrated into IIS Manager, Web administrators can easily set up rules to define URL rewriting behavior based on HTTP headers, HTTP response or request headers, IIS server variables, and even complex programmatic rules. In addition, Web administrators can perform redirects, send custom responses, or stop HTTP requests based on the logic expressed in the rewrite rules.

第三方库安装 node.js 安装程序已经内置了 npm 模块 使用该模块可非常方便安装 第三方插件库！

```

非常 类似 java！ 安装其实就是拷贝，发布时，无需安装，直接拷贝第三方包即可运行（需按目录安装，而不是全局安装）！

npm install name or file path 会自动 安装在 当前项目下！

npm install -g name or file path 全局安装，会安装到 系统 AppData 下面 C:\Users\Administrator\AppData\Roaming\npm\node_modules

一般推荐 本地项目安装

输入name，必须 在 npm网站注册，否则，只能下载后，通过目录安装！ file path: .\clusterplus

卸载 npm uninstall

npm help install 帮助

npm install -h 简要帮助

npm是 Node.js 的模块依赖管理工具。作为开发者使用的工具，主要解决开发 Node.js 时会遇到的问题。 如同 RubyGems 对于 Ruby 开发者和 Maven 对于 Java 开发者的重要性，npm 对与 Node.js 的开发者和社区的重要性不言而喻。 本文包括五点：package.json 、npm 的配置、npm install 命令、npm link 命令和其它 npm 命令。

package.json

npm命令运行时会读取当前目录的 package.json 文件和解释这个文件，这个文件基于 Packages/1.1 规范。 在这个文件里你可以定义你的应用名称( name )、应用描述( description )、关键字( keywords )、版本号( version )、 应用的配置项( config )、主页( homepage )、作者( author )、资源仓库地址( repository )、bug的提交地址( bugs )， 授权方式( licenses )、目录( directories )、应用入口文件( main )、命令行文件( bin )、应用依赖模块( dependencies )、 开发环境依赖模块( devDependencies )、运行引擎( engines )和脚本( scripts )等。

对于开发者而言，开发和发布模块都依赖于他对这个文件 package.json 所包含的意义的正确理解。 我们下面用一个本文共用的例子来说明：

\{ "name": "test", "version": "0.1.0", "description": "A testing package", "author": "A messed author messed@example.com", "dependencies": { "express": "1.x.x", "ejs": "0.4.2", "redis": ">= 0.6.7" }, "devDependencies": { "vows": "0.5.x" }, "main": "index", "bin": { "test": "./bin/test.js" }, "scripts": { "start": "node server.js", "test": "vows test/*.js", "preinstall": "./configure", "install": "make && make install" }, "engines": { "node": "0.4.x" } } 这个例子里我们定义了应用的入口文件( main )为 index ，当其他应用引用了我们的模块 require('test') 时， 这个 main 的值 index.js 文件被调用。脚本( scripts )使用hash 表定义了几个不同的命令。 script.start 里的定义的 node server.js 会在 npm start 时被调用，同样的 npm test 调用时对应的 scripts.test 里定义的命令被调用。 在有些 native 模块需要编译的话，我们可以定义预编译和编译的命令。 本例中还定义了应用依赖模块( dependencies )和开发环境依赖模块( devDependencies )。 应用依赖模块会在安装时安装到当前模块的 node_modules 目录下。开发环境依赖模块主要时在开发环境中用到的依赖模块， 用命令 npm 的命令 install 或 link 加上参数 —dev 安装到当前模块的 node_modules 目录下。

大家也注意到 package.json 里的版本号有些是 >= 0.6.7 有些是 1.x.x，这有什么区别？ npm 使用于语义化的版本识别来进行版本管理。并不是所有的模块都会提供向后兼容性， 有时候某些模块因为某些原因导致不向后兼容。所以我们需要定义一些规则来保证模块能够在某些特定的版本中可用， 并且保证能用最新的版本，因为那些版本总是修改了一些 bug 或提升了性能等。我们来看一下版本定义的字段：

0.4.2

主版本( 0 ) 副版本( 4 ) 补丁版本( 2 ) 在上面 package.json 的定义里我们确信模块在所有的 Nodejs 0.4及以上和0.5以下版本里都能运行。依赖模块 redis 在所有大于或等于0.6.7的版本上都能运行，依赖模块 ejs 只能确保运行在0.4.2版本里，依赖模块 express 确保能够兼容大于或等于1.0.0并且小于2.0.0。

npm 的配置

npm 拥有很多默认配置。你可以使用这些默认的配置，也可以修改这些默认的配置，甚至可以在环境变量或命令行下修改这些配置。配置的权重是如下顺序定义的：

命令行，使用—为前缀的参数。比如 —foo bar，设定变量 foo 的值为" bar “。—foo 后不带值的参数，设定 foo 的值为 true 。 环境变量，所有 npm*config* 为前缀的环境变量。比如 npm_config_foo = bar ，设定变量 foo 为 “ bar "。 用户定义。所有的变量存储在 $HOME/.npmrc 文件里的变量。 全局。所有 $PREFIX/etc/npmrc 文件里的变量。$PREFIX 变量可通过 npm prefix -g 获取，一般默认是 /usr/local。 内置的配置。通过安装时运行 ./configure 所定义的变量。可通过命令curl http://npmjs.org/install.sh | env npm_config_foo=bar sh 设置。 使用配置能给我们带来很大的灵活性。比如我们使用 npm install 时，对默认的资源库地址 https://registry.npmjs.org/ 不是很满意，我们可以使用下面的命令来更改资源库地址。

npm --registry "an other registry" install express

或者下面的命令
==============

env npm_config_registry="an other registry" npm install express 或是对 npm 默认的 vi 编辑器不满意，直接命令 npm set editor mate 。npm 的配置可通过命令 npm config ls 获取。这个命令是获取修改后的配置，要获取包括默认配置的全部配置加上 -l 参数。值得注意的是，开发者通过 npm config set registry "an other registry" 的方式修改 registry 这个属性值，一定要明白这个修改这个值所带来的负面效应。一旦设置了 registry 这个值，当你要 publish 一个模块，会把模块发布到修改后的资源库里，而不是原始默认的资源库。其他的资源库是原始默认的资源库的一个复制品，定时从默认的资源库取资源。一般来说，没有把其新家的模块同步到默认的资源库的能力。这样会导致发生你的模块在修改后的资源库里能够找到，而在其它的资源库里找不到的事情。

npm install命令

安装模块只需要 npm install express connect 命令给我们带来了很大的方便。安装模块的路径分两种：

全局路径，也就是带上参数 -g 的安装模式。这个命令会把模块安装在 $PREFIX/lib/node_modules 下，可通过命令 npm root -g 查看全局模块的安装目录。 package.json 里定义的bin会安装到 $PREFIX/bin 目录下，如果模块带有 man page 会安装到 $PREFIX/share/man 目录下。 本地路径，不带 -g 参数的。从当前目录一直查找到根目录/下有没有 node_modules 目录，有模块安装到这个目录下的 node_modules 目录里，如果没有找到则把模块安装到当前目录 node_modules 目录下。package.josn 定义的 bin 会安装到 node_modules/.bin 目录下，man page 则不会安装。 我们需要选择什么样的安装方式呢？全局模式可以让你不用担心找不到模块，如果不需要还是尽量避免全局模式。

如果我们只是 require('pkg') 一个模块，我们不需要使用全局模式。 如果我们需要在命令行中调用，我们需要使用全局模式。因为这个安装把 package.josn里 bin 下的定义安装到 $PATH 目录下。 有些模块我们既需要在命令行中调用又想 require('pkg') ，比如 Coffee-script 。那么我们可以使用全局模式安装，然后使用下一段要讲的命令 npm link 把它链接到本地的 node_modules 目录下。

不要担心 package.josn 里 script 中定义的命令会不会因为不是全局安装而不能运行。比如在例子里定义的 devDependencies 的 vows 。在调用 npm test 时 npm 会把 node_modules/.bin 目录放到环境变量 $PATH 的最前面。

npm link命令

对开发者而言，这算是最有价值的命令。假设我们开发了一个模块叫 test ，然后我们在 test-example 里引用这个模块 ，每次 test 模块的变动我们都需要反映到 test-example 模块里。不要担心，有了 npm link 命令一切变的非常容易。

首先我们需要把 test 链接到全局模式下：

cd ~/work/node/test # 进入test模块目录 npm link # 创建链接到$PREFIX/lib/node_modules 那么 test 的模块将被链接到 $PREFIX/lib/node_modules 下，就像我的机器上 $PREFIX 指到 /usr/local ，那么 /usr/local/lib/node_modules/test 将会链接到 ~/work/node/test 下。执行脚本 bin/test.js 被链接到 /usr/local/bin/test 上。

接下来我们需要把 test 引用到 test-example 项目中来：

cd ~/work/node/test-example # 进入test-example模块目录 npm link test # 把全局模式的模块链接到本地 npm link test 命令会去 $PREFIX/lib/node_modules 目录下查找名叫 test 的模块，找到这个模块后把 $PREFIX/lib/node_modules/test 的目录链接到 ~/work/node/test-example/node_modules/test 这个目录上来。

现在任何 test 模块上的改动都会直接映射到 test-example 上来。再比如假设我们开发很多应用，每个应用都用到 Coffee-script ：

npm install coffee-script -g # 全局模式下安装coffee-script cd ~/work/node/test # 进入开发目录 npm link coffee-script # 把全局模式的coffee-script模块链接到本地的node_modules下 cd ../test-example # 进入另外的一个开发目录 npm link coffee-script # 把全局模式的coffee-script模块链接到本地 npm update coffee-script -g # 更新全局模式的coffee-script，所有link过去的项目同时更新了。 就像你看到，npm link 对于开发时一个模块被多个模块引用时非常有用。windows 的用户会想，我这儿没有 UNIX 下的 link 工具怎么办？别担心只要你的 Node.js 支持 fs.symlink 就可用到这个特性。

其它 npm 命令

npm 命令里还有很多有用的命令。npm explore . -- git pull origin master ，更新当前的 git 资源库。npm edit . ，编辑当前模块的所有依赖模块。npm docs coffee-script ，打开 coffee-script 模块的文档。npm outdated coffee-script ，查看 coffee-script 是否有新版本。npm submodule . ，你可以要求你的依赖模块是从 git 资源库安装的，而不是从 registry 安装。因为作者的 git 资源库总是最新的版本，registry 上的是模块作者发布上去的稳定版本。甚至你可以用 npm 来编程。

var npm = require('npm'); npm.load({}, function (err) { if (err) return commandFailed(err); npm.on("log", function (message) { if (arg) console.log(message) }) var requirements = JSON.parse(fs.readFileSync('config/requirements.json')); npm.commands.install(requirements, function (err, data) { if (err) return commandFailed(err); }); }); 做为 Node.js 的开发者工具，npm 已经为我们想到很多的应用场景。这也是 Node.js 社区一致推荐它为开发者模块依赖管理工具。

```

运行容器 NodeWatcher 自动重启，类似 看门狗，如果 js文件变化，也会自动重新加载 重新加载，可能会导致 正在运行的逻辑中断！

```

node还需支持 多 CPU并发，与 资源 连接池

单线程模式，一个耗时比较多的操作时，对于后面的排队者来说，会带来比较大的等待和延迟 多线程由于系统自动切片分配CPU执行，因此，可以平均分配执行，前后排队都能获得比较平均的响应 弊端是，并发比较大时，由于需要 切换CPU，会导致每个请求的处理耗时增加，相当于为了照顾后面的客人， 会怠慢前面的客人。 如果 让最前面的客人全部办理完成，再为后面客人服务，除非处理足够快，否则，越是后面的客人， 等待时间越长！ 因此，node不适合写入 数据库等耗时的工作，应该 使用缓存如 Redis保存数据，来减少等待！ 可另外编写一个程序，由 Redis 写入 数据库！

```

Windows服务注册方法： Windows NT Resource Kit 提供了2个小工具可以帮助我:

```

Instrsrv.exe installs and removes system services from Windows NT.

Srvany.exe allows any Windows NT application to run as a service.

Instsrv.exe可以给系统安装和删除服务，Srvany.exe可以让程序以服务的方式运行。下面我来说具体安装过程。

1、将Instsrv.exe和Srvany.exe放置到某目录下，下面用%path%代替路径

2、打开CMD，输入以下内容，其中ServerName为你要创建的服务名称

%path%\instsrv ServerName %path%\srvany.exe

3、打开regedit注册表编辑器，找到以下目录

HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\<ServerName>

4、鼠标右键单击<ServerName>，创建一个”项”，名称为”Parameters”

5、鼠标左键单击”Parameters”，在右边点击鼠标右键，创建一个”字符串值”(REG_SZ)，名称为”Application”，数值数据里填写你要执行的程序完整路径。

6(可选)、鼠标左键单击”Parameters”，在右边点击鼠标右键，创建一个”字符串值”(REG_SZ)，名称为”DependOnService”，数值数据里填写该服务依存的服务名称。不知道依存是什么的，你可以保持继续不知道，我不解释。

7、打开services.msc服务控制面板，找到<ServerName>，鼠标右键-属性-登陆，勾选”允许服务与桌面交互”(一般你要运行的程序都是有界面的吧)。 恩，一般这样就可以了。

```

Html 模版 如果 要替代 Php+Apache，必须 有一个 html 模版，由 js 来融合 模版 和 数据，才能 生成客户端页面！ Express支持许多模板引擎，常用的有：

```

Haml haml 的实现 Jade haml.js 接替者，同时也是Express的默认模板引擎 EJS 嵌入JavaScript模板 CoffeeKup 基于CoffeeScript的模板引擎 jQuery Templates 的NodeJS版本

```

JS 与 C++ Lib的互相调用 1、数据传递 对象、数组、指针等数据传递

```

2、函数指针，回调

3、内存回收

4、

```

编译 Google利用ClouserComplier提供了系列编译指令,让JS更好的实现OO编程

调试 Eclipse 调试

中文文档 http://cnodejs.org/cman/ http://nodejs.org/docs/latest/api/index.html

Web框架： express.js（expressjs.com） node.js上目前最好的网站服务器框架，尤其特别合适做REST协议。

部署 Virtual Host 支持 通常情况下，我们不会在一个 IP 上只部署一个网站。在使用 node.js 时，可以使用 connect 提供的 vhost 支持 Virtual Host，但是，这也限制了服务器只能用 node.js，而不能同时使用其他的服务，例如再安装一个 PHP 服务之类。 这时就可以使用 nginx 的反向代理来解决了，用户在访问网站时，请求先到 nginx 进行处理，如果是 node.js 站点的话，将请求转发到 node.js 的服务，然后再将 node.js 服务的结果返回给用户。 在 nginx 中设置反向代理很简单，一句 proxy_pass 就可以搞定： server { listen 80; server_name example.com;

```

```
    location / {
            proxy_pass http://localhost:9000;
    }
```

\} 在添加了 Virtual Host 之后，就可以把一些静态资源，例如 CSS、JavaScript 之类的文件，直接交给 nginx 来处理，而不是什么请求都需要到 node.js 这一层去处理，也省去反向代理这一关的消耗。

```

框架

```

YUI3 kissy 淘宝 一次编写，前后端运行

```

语法 markdown.js node.js中的markdown解析器， 什么是markdown?? 用过GitHub的朋友应该知道，readme.md文件 prettify.js google-code-prettify, 提供在线的语法高亮支持，支持语法包括C-like, Java, Python, shell等大多

```

InfoQ：你们选用Node.js的主要原因是什么？ 日常工作中会有哪些好处？

TJ（Express）：大概在一年前， 当我开始做Express的时候我对Node产生了兴趣。 我希望用熟悉的语言、熟悉而简单的方式去定义Web应用。 我听说Node不久后就下载了源码、简单阅读了一下， 我喜欢它所引导的方向。用了几年Ruby之后， 我发现我越来越喜欢用JavaScript了。 Guillermo（Socket.IO）：用Node编写实时应用真的非常简单。我们选择Node的主要原因是， 在Node里你是司机， 它能让你只用几行代码就创建出一个自己的HTTP服务器。 传统堆栈都没有这种能力，比如常见的Apache+PHP， 因为PHP只能在请求完成时执行，而且要运行一小段时间， 才能生成响应并退出。

另一方面，不用牺牲性能和可伸缩性， Node的请求就可以延长一段时间，因为Node是个完全异步、单线程、单进程的框架。 Matthew（Geddy）：我选择Node.js是因为， 它是第一个可靠的服务器端JavaScript实现， 不以JVM为基础。 我在日常工作中编写了很多JavaScript代码， 一个很大的优点就是， 不需要针对客户端和服务器端在两种语言之间换来换去。 Astro（node-xmpp）：对IO操作比较多的应用， 我想控制它们的并发问题。典型的选择是线程编程，但这很昂贵。 Erlang和GHC把轻量级的绿色线程映射到了本地线程上（ 一个CPU内核有一个本地线程），以此来解决并发问题。 尽管有这一功能，开发人员仍要忍受同步问题、避免竞态条件。

异步编程时不用开发串行的“线程”代码，你会觉得这有些不自然。 但不处理那些麻烦的同步问题确实让我觉得轻松了很多。 一旦你理解了这个概念，就会习惯它带来的“阶梯效应”， 功能会逐层嵌套实现。 Peteris和James（StackVM）：不用刻意展开或编写C代码，Node.js就有非常棒的性能。Node. js没有任何需要担心的遗留代码，所有内容自底向上都是异步的。 还有很多库在尝试一些新的事情，比如websockets， 社区也非常活跃。 在浏览器和服务器端使用相同的语言让代码重用变得更为简单， 而且JavaScript语言很简单，能迅速完成原型。

InfoQ：你在项目或日常工作中使用其他的Node. js库或框架么？除了你自己的库，你觉得有没有其他的Node. js库或框架是特别有用、别的开发人员也应该去看一看的？

TJ（Express）：日常工作中我用了很多自己的库， 还有下面几个库， 我对这几个项目和它们的开发人员怀有深深的敬意：

Socket-IO http://github.com/LearnBoost/ Socket.IO （Guillermo Rauch） Formidable http://github.com/felixge/ node-formidable （Felixge） Less.js http://github.com/cloudhead/ less.js （Cloudhead） Redis客户端 http://github.com/fictorial/ redis-node-client （Fictorial） Guillermo（Socket.IO）：我们天天都用Node。除了Socket.IO，我支持Mongoose（http ://github.com/learnboost/ mongoose）和其他一些较小的组件， Mongoose是一个ORM框架，针对NoSQL、 面向文档的数据库MongoDB。 Matthew（Geddy）：Node-Jake是个类似于Make/ Rake的JavaScript构建工具：http://github.com/mde/node- jake

Logan是个小型的跨环境测试框架， 可以用它在浏览器里测试只能运行在Node.js中的代码（ 还有TheRubyRacer， 它把V8嵌套在一个Ruby进程中）：http://github.com/mde/logan Astro（node-xmpp）：有几个需要提一下。 第一个是Isaac Schlueter开发的包管理器npm。无论什么地方， 你都想拥有包管理器所带来的便利。

TJ Holowaychuk开发的ext.js相当有用： 它用很多方便的方法对基本的JavaScript类型进行了增强 ，所有人都会发现这很有用。

不要错过Senchalab的Connect Web框架。Node.js内置的HTTP支持是它的杀手锏， Connect想要达到Rack在Ruby世界中的水平。当然， 这并不像看起来的那么简单，因为它完全是异步的。 Peteris和James（StackVM）：借助Node包管理器npm（http://npmjs.org/）去使用、 发现其他开发人员编写的库是一种非常好的方式。 我们使用Socket.IO， 它对WebSocket进行了抽象， 还对尚没有WebSocket的浏览器提供了应变方案， 以支持WebSocket式的通信。 我们也一直在尝试基于Socket.IO的node- compress，以便加快把数据传输到浏览器的速度。 InfoQ：如果一个团队要开始使用Node.js， 他们需要留心哪些陷阱？有提示或“最佳实践”么？

TJ（Express）：一般来说都有环境问题。 我认为Git是必需的，其他SCM都让我觉得不太满意， 实际是有点儿反感。搭建一个持续集成的服务器， 哪怕像CIJoe（http://github.com/ defunkt/cijoe）那么简单，那也是必需的； 还有就是测试、测试、再测试！我着重强调测试， 我所有的Node项目都用“Expresso”（http:// github.com/visionmedia/ expresso）进行测试，“Expresso” 项目支持代码覆盖率报告， 能让你很明确地知道哪些代码没有覆盖到， 这些简单的步骤应该能让项目不停向前滚动。 Guillermo（Socket.IO）：我的建议是：

对JavaScript语言要有非常强烈、近乎狂热的求知欲。 深刻理解保证网站运转的各个层面。这意味着要理解底层的知识（ 熟知HTTP、协议和网络通常会有较大的帮助）。 对于某些功能，试着“忘记”其他语言实现它们的方式，学习用“ Node”的方式去实现它们（ 比如在Java里用线程去解决的问题， 你可以用Node以不同的方法去轻松解决） Matthew（Geddy）：Node. js仍然处于发展初期，所以仍然会有API的变化， 这会破坏代码。要准备好修改代码， 或者用Geddy或Express等框架， 框架的作者会屏蔽Node的变化，保证API的一致性。 Astro（node-xmpp）：尽管JavaScript的语法微不足道，看过用大括号划分程序代码的任何人都能看懂， 但基于原型的遗留系统一开始还是会造成混乱。 一定要告诉你的伙伴会有什么样的影响。

要是你仍然觉得基于类的遗留系统更容易使用， 那你可能需要找一个处理方式类似于用JavaScript处理遗留Ruby的库。 Peteris和James（StackVM）：阻塞I/O可能是需要留意的最大陷阱， 因为整个程序等到调用完成之后才会执行其他操作。 只在初始化时使用少量的阻塞调用， 尤其是在编写注重性能的网络服务时。异步I/ O和事件驱动编程需要的思维方式和大多数编程都不太相同。 拥抱它吧。 InfoQ：根据你的经验， JavaScript代码库规模如何像项目那样变得越来越大？ 你用的工具有哪些？你觉得工具对现实中的Node. js项目支持得怎样？

TJ（Express）：我觉得这完全由开发人员来决定。 JavaScript过去曾是一门“丑陋”的语言， 但现在已经不是了。我觉得行内注释非常重要， 有助于创建可见的空白，而且不会让代码看起来混乱不堪。 至于整个项目的组织，把逻辑块分布到单独文件中绝不会有错， 对任何语言来说这都是通用的做法。

Node采用了CommonJS的模块模式， 这其实是我在语言中使用过的最喜欢的组织工具。最典型的，大多数环境都包含一个扁平的名字空间， 所以在现实中你仍然要随时处理名字空间的冲突， 而CommonJS的模块系统就很好地避免了冲突。 Guillermo（Socket.IO）：让JavaScript同时在服务器、客户端上运行是很让人兴奋的。 随着招聘变得越来越容易， 整个团队可以处理同一应用的很多不同方面， 我觉得这对公司来说特别重要。 Node也为专业环境中的开发提供了很多工具：

简单却强大的模块系统（基于CommonJS） 很多测试框架（Expresso、Vows等） Matthew（Geddy）：在服务器端， JavaScript现在和Ruby、Python一样， 已经有很多工具了—— CommonJS模块提供了让代码保持模块化的机制。Node- Jake等构建工具能让你的构建和打包自动化， 以可预测的方式进行。

客户端的JavaScript还需要再多做一点儿工作。 但JavaScript对象能很自然地封装功能， 而且JavaScript很久以前就有了在客户端进行“ 大规模编程”的最佳实践。 Facebook等大公司创建了他们自己的框架， 但Dojo或YUI等更复杂的工具包则需要更多这样的支持。 Astro（node-xmpp）：我推荐在大型项目中使用静态类型。

我也很喜欢测试驱动开发；不知道Node. js社区是否已经选择了测试库的事实标准。 Peteris和James（StackVM）：Node. js有一个模块系统，它对项目的可伸缩性大有裨益， 但大型软件项目不论用什么语言，一般都有更多的Bug， 而且比小型项目更难测试。对于StackVM， 我们将功能分解为可重用、开源的模块， 以此来尽可能长久地避免大型代码库的这种缺陷。到目前为止， 这种方法让StackVM的主要代码库更为灵活， 对支持库进行单独测试也更容易。 社区里使用我们模块的人已经为我们提出了很多Bug。 现在对Node. js来说最有用的工具也许是Node包管理器npm。 使用npm，我们能轻松使用其他程序员编写的库， 我们也可以很容易地和Node.js社区分享我们自己的模块。

```
## node 组件

- https://github.com/request/request
	最好用的客户端库，微信上传没有问题！
	非常简单直观！！！
- https://github.com/form-data/form-data
	不支持微信！！！
  var form = new FormData();
  form.append('access_token', token);
  form.append('type', type);
  form.append('media', fs.createReadStream('D:/pai/bin/uploads/haibao.jpg'));

  form.submit(url, function(err, rsp) {
    if ( err ) {
      log.error('uploadMedia err:' + err.message);
      cb( err);
    }
    else {
      rsp.on('data', function (data) {
        log.debug('uploadMedia rsp status:%s data:%s',
          rsp.statusCode, data);
        cb( null, JSON.parse(data).media_id);
      });

      rsp.on('end',function(){
        console.log("media_id:end.");
      });

      rsp.on('error',function(e){
        console.error("error:"+e);
      });

    }
  });
	
	提示 media data missing！！！

	form.pipe(request);

  request.on('data', function (data) {
    log.debug('uploadMedia rsp data:%s',
      data);
    cb( null, JSON.parse(data).media_id);
  });
	会出现 socket hung up 吊死！
	跟 formstream 一样！
- pai测试使用的 https://github.com/tomas/needle
	微信上传文件报错！！！
  var data = {
    access_token: token,
    type: type,
    media: {
      file: 'D:/pai/bin/uploads/haibao.jpg',
      content_type: 'image/jpg'
    }
  };


  needle.post(url, data, {timeout:30000, multipart: true}, function(err, rsp, data) {
    if ( err ) {
      log.error('uploadMedia err:' + err.message);
      cb(err);
    }
    else {
      log.debug('uploadMedia data:%s', data);
      cb(null, JSON.parse(data).media_id);
    }
  });
		
	提示 media data missing！！！
	
- web框架 https://github.com/strongloop/express
- express 中间件
	- http://expressjs.com/resources/middleware.html
	- https://github.com/expressjs
- 经典服务端接收组件 https://github.com/felixge/node-formidable
- 接收`multipart/form-data` https://github.com/expressjs/multer
multy-node https://github.com/kriszyp/multi-node

资源池 generic-pool是一个通用连接池，node和php不同，php每次和db通信，都需要先建立连接然后执行程序，最后释放这个连接。node是可以事先建立一个池子，然后根据需要生成连接放入这个池中，当node要和db通信时则去池子中拿连接，用完以后不释放，而是将这个连接归还到池中，我们也可以设定这个池子的的最大连接数和闲置连接超时释放的时间。 1、可以不必为建立连接和释放连接消耗更多的响应时间，一个连接在高并发下可以被高度重用。 2、有队列机制，当池子中连接都用完了，其他请求在排队时，有一些紧急的任务需要插队，我们可以很方便的做到这点。 https://github.com/coopernurse/node-pool

```

他的示例代码是为mysql提供连接池，我就不贴上来了，我们来为redis做一个简单的链接池，并测试下。先简单介绍下他的几个参数：

name : name of pool (string, optional) create : function that returns a new resource should call callback() with the created resource destroy : function that accepts a resource and destroys it max : maximum number of resources to create at any given time idleTimeoutMillis : max milliseconds a resource can go unused before it should be destroyed (default 30000) reapIntervalMillis : frequency to check for idle resources (default 1000), priorityRange : int between 1 and x - if set, borrowers can specify their relative priority in the queue if no resources are available. see example. (default 1) log : true/false or function - If a log is a function, it will be called with log strings Else if log is true, verbose log info will be sent to console.log() Else internal log messages be ignored (this is the default)

英文好的朋友很容易就看懂了上面的这些说明，我为英文和我一样比较差的朋友简单翻译一下，省的他们再去google翻译了。

name：连接池的名字，例如“mysql”，主要是用作日志上的区分，一个名字而已 create：一个函数，和db建立连接的函数，必须要把创建好的db连接示例传入到callback函数中 destroy：摧毁和这个db连接的函数 idleTimeoutMillis：为每个连接设置一个超时时间 reapIntervalMillis：检查闲置连接的频率 priorityRange：1-X的整数，当没有连接时，可以为1-X这几个应用开辟绿色通道，让他们插队。 log：日志系统，true的话则是记录详细日志，开发时用，一般为false

下面我就贴一段redis连接池的代码：

var poolModule = require('./generic-pool.js'); var pool = poolModule.Pool({ name : 'redis', create : function(callback) { var client = require('redis').createClient(); //这里是创建redis连接实例的代码 callback(null, client); //创建完了以后，要把client传给callback，这里第一个参数看了源码得知是err，我们不必理会 }, destroy : function(client) { client.quit(); }, //当超时则释放连接 max : 10, //最大连接数 idleTimeoutMillis : 30000, //超时时间 log : true,  
 });

下面我可以利用他提供的几个方法，用连接池来操作redis：

var test_pool =function(){ pool.acquire(function(err, client) { client.set('test', 'xdy',function(err, reply){ console.log(reply+""); pool.release(client); }) }); pool.acquire(function(err, client) { client.set('test1', 'xdy',function(err, reply){ console.log(reply+""); pool.release(client); }) }); pool.acquire(function(err, client) { client.set('test2', 'xdy',function(err, reply){ console.log(reply+""); pool.release(client); }) }); } test_pool (); setTimeout(function(){ test_pool (); },500);

我们定义了一个test_pool的方法，定义了3个redis操作，使用pool的acquire方法来去连接池拿连接，在处理完毕以后，用pool的release方法将连接归还到连接池，我们打开日志，运行程序以后可以看到： 在test_pool()执行后，连接池创建了3个连接给test_pool，test_pool在redis操作完毕以后，归还连接，在500毫秒之后，test_pool再次去连接池拿连接操作redis，这时因为之前的连接没有超时，所以之前的3个连接又被拿出来处理第二次test_pool函数了。这样就做到了重用，不必每次去建立和释放连接，当30秒过后，连接会自动释放掉。

个人觉得我们还可以对这个连接池改写一下，再提高一下连接池在某些情况下的性能，为连接池增加一项配置，就是永不过期的连接数，这样我就可以在程序启动的时候预先放置好一些连接永不过期，如果大并发突然过来可以节约一点创建连接的时间，这种情况比较少，改写以后可能压力测试成绩会好一点。

具体压测数据，请关注我博客，我将会在和PHP对比压测文章内给出。 http://snoopyxdy.blog.163.com/blog/static/60117440201183101319257/

```

Redis https://github.com/mranney/node_redis/

示例 http://witcheryne.iteye.com/blog/1161232 文件上传

```

https://github.com/davglass/yui-express/ Example YUI 3 based View engine for ExpressJS — Read more http://express.davglass.com 源码

Email:snoopyxdy@163.com; qq:53822985

```

```

2013-02-01 1、trello 一个简单的项目列表跟踪管理应用，使用 Node开发的， 性能非常好！！！ yhfeng@lankey.net

```

2、Node相关工具 CoffeeScript MongoDB Markdown Stylus Jade Paas Saas

3、模版引擎 一个完善的模板引擎应该兼顾这几点：

```

语法简明 执行效率高 安全性 错误处理机制 多语言通用性

而市面上现有的模板引擎没有做到兼顾以上几点，比如Mustache支持多种语言，通用性不错，不过性能稍差，而且语法不支持高级特性，例如遍历的时候无法做if判断，也无法获得index索引值，jQuery tmpl依赖jQuery，缺乏可移植性，Kissy template虽然依赖Kissy, 不过性能和语法都值得推荐，doT/nTenjin 性能和灵活性都很不错，但是语法需要用原生的js来写，写好的模板代码可读性稍差。

鱼和熊掌不可兼得，语法的处理，安全性的输出过滤和错误处理机制的引入在一定程度上都会或多或少降低模板引擎的性能，因此就需要我们权衡。Juicer 在实现上首先将性能看做第一个重要的指标，毕竟性能好坏直接影响用户的感知，同时兼顾了安全性和错误处理机制（即便这样会导致性能的略微下降）。

首先来看下jsperf上同几个主流模板引擎的性能对比。

Jade 语法简洁 慢

ejs 非常接近 asp.net，不错的选择

doT 非常快，太多的 {}

Juicer 淘宝UED http://juicer.name/ 比 doT 快 分界符可定义！

artTemplate（1.7K） http://aui.github.com/artTemplate/ JavaScript Template Engine artTemplate 是新一代 javascript 模板引擎，它在 v8 中的渲染效率可接近 javascript 性能极限，在 chrome 下渲染效率测试中分别是知名引擎 Mustache 与 micro tmpl 的 25 、 32 倍。若作为后端模板引擎（Node.js）亦能在 CPU 与内存占用上保持优势。 比淘宝（kissyTemplate）、百度（baiduTemplate）的 都要快几十倍！ 比 Juicer 快一倍 http://aui.github.com/artTemplate/test/test-speed.html 非常小！ 支持 原生语法及 简约语法，分界符可定义

```

```

### TypeScript（微软在js之上设计的语言，与Coffee 类似）.

You can now enjoy TypeScript syntax highlighting, on-the-fly error detection, and code completion. WebStorm 6 provides streamlined experience for the full development cycle with new languages such as TypeScript,

### CoffeeScript and Dart. Here's what's available already:

-	Automatic compilation/transpilation of these higher-level languages into those recognized by the browsers on all platforms supported by the IDE. This also applies to modern CSS extensions such as LESS and Sass.
-	Full-featured debugging of CoffeeScript, TypeScript or Dart with the help of source maps. If you have a minified JS, you can debug it with source maps as well.

### Sass

```

stylesheets are even more awesome in WebStorm 6, with the following features added:

```

-	custom function definition, completion and renaming support
-	highlighting for incorrect @-keyword
-	support of nested properties, and more LESS support now includes code insight for mixins and many other improvements.

### Google Dart

```

is now supported out of the box, with no additional plugin installation needed.

```

The editor also supports inlining Dart script blocks into HTML files. For older versions of the IDE you can use this Dart plugin.

Dart
----

网址：http://www.dartlang.org/

2011年Google在丹麦奥胡斯（Aarhus）举行的“GOTO国际软件开发大会”预告将释出新网页编程语言Dart， 是一种类别式编程语言（class-based programming language），能够在所有浏览器都能够有高效能的执行效率。 2011年10月10日Google宣布推出DART的预览版。  
Google在dartlang.org公布Dart开发工具及源代码范例等内容，同时也提供相关虚拟机器平台。 目前Dart有两种方式执行：一是在原生的虚拟机器上，二是将Dart程式码转成Javascript，直接在Javascript引擎上执行。

### Dart VS Go

Dart is a web programming language, Go is not. I contributed to Go in its early phases, and the goal always seemed to be to create a general-purpose concurrent-friendly programming language with some interesting paradigms (i.e. pipes, garbage collection). Go was never intended to be purely a web programming language. It's also compiled to machine language (unlike Dart).

As a matter of fact, there were significant issues with the HTTP bindings until early last year when the Go team reorganized some of the codebase.

### Twitter Bootstrap vs Zurb Foundation

In the vast world of rapid prototyping CSS frameworks and toolkits, there are a ton of different options to choose from, but ever since Twitter’s Bootstrap hit the scene it seems like it has largely gobbled up this market. Is there room or reason for anything else?

Probably the two biggest responsive frameworks available today. But which is best?

![](nodeBootstrapVsFoundation.jpg)

Responsive design is all the rage today and it seems to be the way forward for creating a web site that works well on any device. Seeing how you are reading this article, you have probably already come to the same conclusion but you are stuck at a similar crossroad that I was at a couple of months ago. Zurb Foundation and Twitter Bootstrap seem to be the two frameworks which provide the best "all round" framework. Of course, there are other 'frameworks', which probably cater to those who like to make their job more difficult or are anal about 3rd party frameworks. For those individuals: GET OVER YOURSELF! I once had the same frame of mind. Once you realise that these frameworks are supported by 1000s of other web developers and thus tested on countless platforms, you will opt for a massively supported framework. Dare I coin the acronym: MSF?

Enough talk, lets get to the duel. Which is better and why? Let the games begin.

Why take my word? Good question. You don't have to take my word. But consider that I have been creating websites since 1996 and I have seen frameworks of all types come and ago. I was building websites in the days when 800x600 on Windows 98SE was the most popular platform and when mobiles where primarily for phoning people (and pagers existed). I've seen a lot. And recently I have experienced a lot of hurdles in regards to mobile support on both the custom built code front and the 3rd party CMS front. I have a good all round opinion when it comes to this stuff.

Syntax If you develop sites, syntax is a big deal. Which makes more since? Which is quicker to implement? Which won't fail you if you decide to drop it?

Winner: Twitter Bootstrap Why: It just feels like the way I code already. The css classes make sense and have short names. When working with Bootstrap I often think "god, why didn't I think of that already!?!"

Default Styling So, which looks better by default and which are you going to have to spend hours on end banging out fresh design elements?

Winner: Twitter Bootstrap Why: It feels more "now". Foundation is nice, but feels much more technical in its design. While bootstrap looks like the way I want my sites to look already.

Components Which framework provides the best 'batteries included' package?

Winner: Both Why: It really depends on what you are looking for. They both cover 99.9% of the components you are going to use everyday. So it's down to the specific elements you need. It depends on the project. Therefore, I can't really decide.

Design Flexibility Flexibility is extremely important if you don't want your site to look like everyone else's site.

Winner: Zurb Foundation Why: Foundation is much more stripped back in it's design styling and therefore is much more flexible. It also provides some nifty grid manipulation which I don't think Bootstrap does at the moment. If you are looking to customise the look of your project extremely, Foundation will be easier to override the default styling.

Support & Community You don't know everything and you never will. In times of need, the online community will save you from your boss or client getting really really angry at you. That is, if there is a community for your framework.

Winner: Twitter Bootstrap Why: When it comes to deadline hour and you are still trying to fix that bug, support and community matter. Hands down, Bootstrap appears to either been adopted by more users or has more people expressing problems and solutions for it. Therefore, It wins this. Its quicker to find solutions to common problems with bootstrap, which foundation seems a bit of a miss on alot of problems.

Conclusion I bet you want me to give you a strait answer. So here it is (sort of): 1. Choose Bootstrap if you like the way it looks, code the way it does and find yourself relying on QA sites and forums to fix problems.

1.	Choose Foundation if you have some pretty awesomely designed sites, don’t care too much about syntax and are a "know it all".

I've used both. It generally has come down to the web design at the end of the day for me. On some projects, the boostrap style is 'bang on', while on other projects I need the design flexibility of Foundation. But thats just my experience.

Cloud9 IDE Sencha Touch是这种开发框架当中功能最丰富的

You can use socket.io if you want. Have you use Apache to work with Sencha Touch? Basically just the same.

The modules I use are: ?Node.js (of course) ?nodemon (this will restart the server when a file has changed) ?forever (will keep the server running even after I close the terminal) ?mysql (for those needing access to MySQL) ?express (gives great routing support) ?underscore (give very useful JS utilities) ?hashlib (for those needing encryption) ?socket.io (for those needing server pushing)

2013-02-12 Node 后端开发指引 http://vistaswx.com/blog/article/nodejs-dev

```

1、用 NPM 来做项目管理和包维护 Node.js 的每个项目都应该有一个 package.json 配置文件。其中包含了这个项目或者库的信息和所依赖的库。一个相对完成的 package.json 文件像这样：

```

{ "name": "my-app", "version": "0.1.0", "private": true, "description": "My app and service", "main": "app.js", "scripts": { "start": "forever start app.js", "test": "mocha test" }, "dependencies": { "coffee-script": "=1.4.0", "express": "=3.0.6", "mocha": "=1.7.4", "underscore": "=1.4.3", "forever": "=0.10.0", "async": "", "grunt-beautify": "" }, "repository": "", "author": "Bruce Dou", "license": "BSD"}

这个文件可以在你的项目目录下执行 npm init 来按指引创建。注意其中的 scripts 部分，这里可以创建很多自定义命令。比如如此配置之后，npm start 会执行 forever start app.js 命令。

```

2、用 Grunt 来做代码格式修整、Lint 和其他自动化任务 Grunt 是一个命令行任务自动化工具。它包含了很多有用的插件。可以实现代码美化、自动化部署、自动生成 sprit、自动创建项目模板、自动压缩前端代码、自动编译 coffescript 等等你能想到的任务。假如你找不到自己需要的功能，还可以自己开发 Grunt 插件来实现。它的配置文件是位于项目根目录的 grunt.js 。一般项目都需要的功能是代码美化和 Lint，配置文件象这样：

```

module.exports = function (grunt) { // Project configuration. grunt.initConfig({ beautify: { files: ['grunt.js', '*.js', 'lib/*.js'] }, lint: { files: ['grunt.js', '*.js', 'lib/*.js'] },

```

beautifier: { options: { indentSize: 2 }, tests: { options: { indentSize: 4 } } }, jshint: { options: { curly: true, eqeqeq: true, immed: true, latedef: true, newcap: true, noarg: true, sub: true, undef: true, boss: true, eqnull: true, browser: true }, globals: { jQuery: true, Drupal: true, Backbone: true, \_: true, app: true } } }); grunt.loadNpmTasks('grunt-beautify'); //grunt.loadNpmTasks('grunt-contrib-uglify'); grunt.registerTask('default', 'beautify'); };

```

添加了配置文件之后可以在项目目录运行 grunt 命令自动执行任务串。grunt beautify 可以执行子任务。

```

3、js 语言扩展 CoffeeScript js 更简洁 CoffeeScript is a little language that compiles into JavaScript. Underneath all those awkward braces and semicolons, JavaScript has always had a gorgeous object model at its heart. CoffeeScript is an attempt to expose the good parts of JavaScript in a simple way.

```

```
npm install -g coffee-script
```

TypeScript 微软开发的扩展 http://www.typescriptlang.org/ http://typescript.codeplex.com/ 与 eclipse 开发的 java 扩展 Xtend 一样！！！

```
npm install -g typescript
tsc helloworld.ts
```

```

4、underscore underscore 是写 JavaScript 必不可少的库。提供了一些非常常用的方法，这些方法不仅使用方便，而且提高了代码的可读性。：

```

用 _.each 代替 for 循环，比如：

var contents = []; for(var i in msgs) { contents.push(msgs[i].content); }

可以改写为：

var contents = []; _.each(msgs, function(el) { contents.push(el.content); });

其他常用的方法还有:

_.map 用来对数组元素进行批量转换

_.reduce 用来将数组元素合并为结果

_.pluck 用来取对象数组中的子元素，返回包含对应子元素的新数组

_.filter 用来有选择性的取数组中的某些值，返回包含符合条件的值的新数组

_.mixin 用来增加自定义函数

_.chain 用来实现函数式编程:

_.chain([1,2,3]) .map(function(v) {return v * 2;}) .reduce(function(total, v) { total += v}, 0) .value();

```

5、Async Async.js 对常用的流程控制模式进行了封装，比如并行处理、Pipeline等等：

```

async.parallel 并行处理，整体等待最慢的函数返回，常用作多个后端请求的聚合或者并行处理：

... // construct call functions var callItems = []; function make_query_func(json) { return function (callback) { callBackService(json, callback); }; } _.each(messages, function (el, i) { callItems.push(make_query_func({ vmsg: messages[i].vmsg, cmsg: messages[i].cmsg })); }); // execute the call functions parallelly async.parallel(callItems, function (err, results) { main_cb(results); });

async.waterfall 可以用来将大量嵌套的函数顺序执行，前一个函数的结果作为下一个函数的参数。用它之后你的代码里将不会再出现过深的 callback 嵌套:

// old way ... var result = function(uid, callback) { get_user_ids(uid, function(err, user_ids) { get_content(user_ids, function(err, content) { content_clean(content, function(err, clean_content) { callback(err, clean_content); }); }); }); } // new way ... async.waterfall([get_user_ids, get_content, content_clean]);

```

6、开发 C++ addons 增强和扩展 Node.js 这意味着你不必担心某些逻辑的性能，也不必担心和其他框架的继承。因为所有语言或者开发栈都会提供 C/C++ 的接口。

7、Node.js 配置管理方式 有两种配置方式，config.js 或者 config.json 假如以 config.js 作为配置文件：

```

// config.js exports.config = {'a':'a val', 'b': 'b val'}; // app.js var config = require('./config').config;

如果以 config.json 作为配置文件：

// config.json {'a': 'a val', 'b': 'b val'} // app.js var config = JSON.parse(fs.readFileSync(process.cwd() + '/config.json'));

```

8、开发内部 Service 推荐的部件 进程统计信息，比如 uptime, memory usage, heap size, connection number, 处理的请求数量等等。这样便于和监控系统对接 RESTful apis，推荐以 RESTful JSON 格式作为内部通信协议，这其实对大部分应用完全足够，而且容易调试。 配置文件。将可能会发生变化的变量放到配置文件里。 Service Level Agreement。比如超过 100ms 的请求报错而不是继续等待返回信息。

9、Forever: Daemon 管理工具 既然 Node.js 是长时间运行的后台进程，缺不了进程管理工具。 Forever 就是为了实现对 Node.js 的 daemon 进程进行管理的工具。常用命令：

```

forever start app.js 启动进程 forever restart app.js 重启进程 forever list 列出后台进程，并且列出 log 文件，可以方便的及时查看 log 文件内容。

```

10、Node.js Cluster Node.js Cluster 是为了利用多核 CPU 的计算能力, 并且子进程可以共用同一个端口：

```

var cluster = require('cluster'); if (cluster.isMaster) { //start up workers for each cpu require('os').cpus().forEach(function() { cluster.fork(); }); } else { //load up your application as a worker require('./app.js'); }

```

11、JavaScript 开发常见问题： JavaScript 是传值还是传引用? 简单说：如果参数为一个对象则为传引用，如果参数为变量或者函数则为传值。

```

如何用 GDB 调试自己开发的 Node.js C++ addons？ gdb –args nodejs script.js

如何捕获 uncaughtException 并打印详细错误信息？ 在进程级别捕获异常:

process.on('uncaughtException', function (e) { console.trace('Error: '.red + e); console.trace(e.stack); //process.exit(); });

如何优雅结束进程？ Node.js 中对接收的 POSIX 信号做自定义操作很方便，进行进程结束前的清理工作：

process.on('SIGINT', function () { // wait connections to close process.exit(); console.log("gracefully shutting down from SIGINT (Crtl-C)".yellow); });

如何使用 Array 和 Object 对于列表类的信息，比如用户列表推荐使用 Object 而不是 Array：

var a = []; a[1000] = 1; //a is an Array which length is 1001

如何聚合多个后端服务并提供 SLA ? 用 Node.js 可以非常简单的实现对返回所用时间进行控制。 比如在之前例子代码 async.parallel 的请求中设置超时定时器。对多个处理进程并发请求取其中时间最短的结果， 这样可以保证返回时间都保持很短。

什么时候使用 process.nextTick() ? 重量使用 CPU 的函数中释放 CPU 给其他任务 将执行放到下一个 tick ，等待初始化

```

12、更多相关参考： http://nodejs.org/ https://npmjs.org/ http://coffeescript.org/ http://underscorejs.org/ http://nodejs.org/api/addons.html http://expressjs.com/ https://github.com/caolan/async http://howtonode.org/understanding-process-next-tick http://book.mixu.net/ch7.html http://gruntjs.com/

```

注：本文转载自http://blog.eood.cn/nodejs_dev，在这里感谢原作者的辛勤劳动！

```

```

测试 非常棒的幻灯片： http://html5ify.com/unittesting/slides/index.html#/

```

一篇文章 http://programus.github.com/blog/2012/05/26/coffee-mocha-coverage-node-under-windows/ 写了两个小模块，忽然想到要测试。最初找到了Jasmine，后来又发现了mocha。 经过一番比较斟酌，觉得既然配咖啡（Coffee），自然还是得摩卡（mocha）。所以最终决定使用mocha来做测试工具。 好吧，实际原因是在mocha的主页上看到它支持代码覆盖率检查。 后来经过各种折腾才总算搞定了这个覆盖率检查以及报告的查看问题。

其实，这一切在Linux上应该是非常简单的，但我手上只有Windows， 所以一波三折。介于网上相关的信息有些零散，并且不够傻瓜，这里做个总结，也算给自己留个笔记吧。

```

mocha mocha是针对JavaScript的一个测试工具。具体细节请自行参看主页。英文啃不动，请自行寻找辞典。

```

言归正传，mocha也是Node.JS的一个包，所以……对了，你很聪明，用NPM来解决！（什么？你没想到？没关系，跟我一样有前途。）

npm install -g mocha 因为mocha也是个需要执行命令的工具，所以我们继续加上-g。

```

这里顺便说一下-g什么时候用。如果所要安装的包是以命令的方式被使用，也就是会通过命令行调用其中已经做好的工具命令，就最好加上-g。这样，在命令行下随时可以使用那些命令。如果所要安装的包是需要在代码中被包含，也就是require('xxx')，则不要加-g，而且必须在你的程序所在的目录或者上级的某个目录下执行npm install。

跑题了，现在跑回来。验证mocha安装成功的方法……或许你已经猜到了，就是下面这个带有万能验证参数--version的命令。

mocha --version 至此，你已经可以写Coffee代码并进行测试了。执行

mocha --compilers coffee:coffee-script mocha就会自动运行test目录下的测试用例代码进行测试，并给出漂亮的结果报告。

对不起，我说早了。如果你写了测试用例，或者手快，从这个博客的下面的内容里复制了测试用例，那么运行上述命令后，十有八九是会出现类似下面这样的错误。

node.js:201 throw e; // process.nextTick error, or 'error' event on first tick ^ Error: Cannot find module 'chai' at Function._resolveFilename (module.js:332:11) at Function._load (module.js:279:25) at Module.require (module.js:354:17) at require (module.js:370:17) ........（以下省略若干行） 原因是我们缺少测试时必须的检验库（assertion library），下面就来说一下检验包的安装。（如果你没有写任何测试用例，上面的命令不会出错，但为了后面不折腾，还是跟着下面的内容安装一下为好。）

should.js / expect.js / chai

使用mocha进行测试，需要自备数据检验库。数据检验库的作用是用来验证期待值与实际值一致与否的。mocha支持的检验库有如下三种：

should.js：使用 被检验值.should.检验方法(期待值) 的语法进行验证。 expect.js：使用 expect(被检验值).to.检验方法(期待值) 的语法进行验证。 chai：支持以上两种语法和 assert.检验方法(被检验值, 期待值) 的语法。 在网上查找的结果发现should.js有诸多不便，又因为chai包罗万象，所以我决定采用chai来进行自己的测试。

安装方法在各个检验库的主页中都有所描述。而且，既然是基于Node.JS的库，自然需要祭出NPM这一神器。以chai为例，命令如下：

npm install chai 因为我们在测试用例代码中要引入这个库（或者说包），所以这里没有加-g参数。另外，执行此命令的目录要在项目的根目录下，这样就可以在项目下的任何目录的代码中引入它了。

安装成功后，会在目录下建一个名为node_modules的目录。这个目录是专门用来放各种依赖包的。要确认安装了哪些包，可以用

npm list 来查看。执行上面命令，如果你看到类似chai@1.0.1的内容，说明安装成功了。@后面是版本号。

另外，为了便于管理依赖包，也可以使用package.json文件进行记录和管理，然后使用不带参数的npm install命令自动安装所有缺失的包。

我们这个例子的package.json文件如下：

package.json github-source { "name": "coffee-mocha-nodejs-coverage-windows-example" , "version": "0.0.1" , "private": true , "dependencies": { "chai": "1.0.1" } } 其中dependencies中就记录了依赖的包和版本号。

装好了chai，测试应该就不成问题了。

然而！

然而我们的重点在于覆盖率如何得到。我最初就是卡在这里了。mocha的文档中虽然提到一个html-cov的reporter，但执行mocha --compiler coffee:coffee-script -R html-cov得到的覆盖率永远都是0%，而且所执行过的代码也没有标记。仔细看看文档，发现有这么一段话：

The library being tested should first be instrumented by node-jscoverage, this allows Mocha to capture the coverage information necessary to produce a single-page HTML report.

也就是说，要想导出覆盖率报告，那么被测试的代码必须是被node-jscoverage“蹂躏”过的。跟着链接看了一眼node-jscoverage，居然是个需要在Linux下面编译的东西。这可让我这个在Windows下忍辱负重的家伙如何是好？

没关系，node-jscoverage再强大，充其量不过是jscoverage的加强版。所以，我们直接去找它的本家jscoverage去。到下载页一瞧，本家果然够意思，已经有了编译好的Windows压缩包。那么现在说一下下一个需要安装的软件——

JSCoverage

仔细读读文档，会发现JSCoverage的工作原理是把你写好的JavaScript程序给加一层“壳”，加壳的程序的执行结果与原本的程序相同，但这层壳会在代码执行时记录执行过的代码，从而最终统计出代码覆盖率。

又跑题了，拉回来，继续说安装的事儿。在下载页的下半部分可以找到编译好的Windows执行程序。下载之，然后解压缩到一个适当的目录（为了减少未来的麻烦，不建议目录名中带有空格）。再接下来，为了可以在命令行中执行jscoverage，将可执行文件所在的目录加入环境变量的PATH里面。系统环境变量的修改，请参考这里的这个图。

做好上述工作后，在命令行窗口里执行我们的万能验证命令

jscoverage --version 什么？出错了？我没说修改了环境变量之后，需要重新打开新的命令行窗口才有效吗？没说？真的没说？那好吧，现在重新启动命令行窗口再试试。

组织代码

业务代码

至此，需要的软件都安装好了。下面就该写我们的代码了。为了今后处理方便，建议将代码写在lib目录下。原因？据说就是一种约定俗成（据说是因为从网上查到的，不是我说的）。

比如，我写了如下代码（一个问候者）：

lib/models/index.coffee github-source

class Greeter constructor: (@lang) -> if !@lang? @lang = 'en'

sayHello: (name) -> switch @lang when 'jp' # nameさん、こんにちは。 "#{if name? then "#{name}\u3055\u3093\u3001" else ""}\u3053\u3093\u306B\u3061\u306F\u3002" when 'zh' # name，你好！吃了没？ "#{if name? then "#{name}\uFF0C" else ""}\u4F60\u597D\uFF01\u5403\u4E86\u6CA1\uFF1F" else "Hello#{if name? then ", #{name}" else ""}!"

exports.Greeter = Greeter 放在lib/models下，并命名为index.coffee。命名为index，在引入模块的时候可以直接以目录名来引入。

测试用例代码

代码写好了，接下来写一下测试用例的代码。之前提过，mocha会自动处理test目录下的内容，所以测试用例代码我们都放在test目录下。

我们的Greeter类有两个函数：构造函数和sayHello()函数。而sayHello()函数的参数又是可选的。因此测试代码如下：

test/models.test.coffee github-source

Test suites for all models
==========================

chai = require 'chai' should = chai.should()

models = require('../req') 'models' Greeter = models.Greeter

langs = \[ 'zh' 'en' 'jp' ]

hellos = zh: '你好！吃了没？' en: 'Hello!' jp: 'こんにちは。'

hellosWithName = zh: name: '老舍' greet: '老舍，你好！吃了没？' en: name: 'Jack' greet: 'Hello, Jack!' jp: name: '武蔵' greet: '武蔵さん、こんにちは。'

describe 'Greeter', -> describe '#constructor()', -> it 'should have language set', -> new Greeter(l).lang.should.eql(l) for l in langs it 'should become default language, en', -> new Greeter().lang.should.eql('en')

describe '#sayHello()', -> it 'should greet without name', -> new Greeter(l).sayHello().should.eql(hellos[l]) for l in langs it 'should greet with name', -> new Greeter(l).sayHello(hellosWithName[l].name).should.eql(hellosWithName[l].greet) for l in langs 细心的人可能发现我最上面写的测试目标的部分和常规写法不太一样。通常会写作

models = require '../lib/models' 而我这里写成了

models = require('../req') 'models' 为什么呢？这就涉及到我为mocha的测试写的一个小工具——

测试辅助工具

这个工具其实很简单，没几行：

req.coffee github-source module.exports = (path)-> try require "./lib-cov/#{path}" catch e require "./lib/#{path}" 作用就是检查在./lib-cov目录下是否有我们所需的模块，如果有，则导入之，如果没有，则导入./lib下的响应模块。

刚才说过，要把代码组织到lib目录（因为req.coffee放在项目根目录下，.又是当前目录，所以这里的lib跟上文的./lib是一会儿事儿）下。我们又说过，JSCoverage计算覆盖率的做法是将代码加个壳，然后让测试程序调用加壳后的代码。这个加壳后的代码就被存储在lib-cov目录下（当然是可以自己指定的目录）。所以，使用这个req.coffee就可以让mocha在有lib-cov目录的情况下使用lib-cov下的内容进行测试，从而为生成覆盖率报告做好准备。

在网上搜索，可以看到大多数解决方案是让设置一个环境变量XXX_COV为1来达到上述目的。而且是以类似下面的样子，将其写到makefile里面

XXX_COV=1 mocha --compilers coffee:coffee-script -R html-cov > coverage.html 同时在测试代码中检查环境变量

models = require if process.env.XXX_COV then '../lib-cov/models' else '../lib/models' 但经试验，如上makefile中设定环境变量的语句在Windows下无效。故此追加了这样一个测试辅助工具。同时，在测试时保证每次生成完覆盖率报告都删除lib-cov目录，就可以正常使用了。

进行测试

到这里，我们的准备工作都基本完成了，下一步就是开始进行测试了。

比起上面的各种折腾，测试倒是显得非常容易。

单纯测试

先说一下单纯的测试。

其实上面也曾提到过，只需要执行如下一条命令，就可以得到结果：

mocha --compilers coffee:coffee-script 用这条命令测试Coffee的代码，不需要格外进行编译。（据说老版本的mocha里自动支持Coffee，不需要指定后面的一长串参数。）

测试后，应该会有如下输出：

.... ? 4 tests complete (6ms) 测试成功！

代码覆盖率报告

接下来说一下重头戏——如何产生代码覆盖率的报告。

mocha生成报告只需要指定相应的reporter即可。但前提是需要使用JSCoverage处理一下代码。

JSCoverage，顾名思义，只能处理JavaScript的代码，对CoffeeScript目前还是视而不见的。故而，我们首先要将CoffeeScript编译成JavaScript：

coffee -o lib-js -c lib 这条命令，会递归地将lib目录下的所有coffee代码编译成js文件，并以同样的目录结构存储到lib-js目录中。

比如，我的lib目录中的文件目前如下（使用tree /f命令生成的结果，根目录内容有部分删节）：

\coffee-mocha-nodejs-coverage-windows-example\lib └─models index.coffee 编译后的lib-js目录则如下：

\coffee-mocha-nodejs-coverage-windows-example\lib-js └─models index.js 当然，你也可以去掉-o lib-js的部分，将js文件编译到coffee文件的身边。我倾向于把他们分清楚，所以分了一下目录。

有了js文件，就可以使用JSCoverage了。命令如下：

jscoverage --no-highlight lib-js lib-cov 这样就将lib-js目录里的js文件处理好并放进了lib-cov目录。至于那个--no-highlight参数，是为了去掉代码高亮的。如果不去掉，控制高亮的HTML代码会在最终报告中被转义，导致代码严重不可读。（不服你自己试试就知道了。）

现在，我们生成覆盖率报告的材料都准备好了，执行最终的测试命令：

mocha --compilers coffee:coffee-script -R html-cov > coverage.html 结束后，打开coverage.html文件，就可以看到最终的报告了。

如果你的代码是从上面的博客内容中复制的，那么覆盖率应该是100%。覆盖率报告的样子应该与此大致相同：coverage.html

如果你对报告有所怀疑，可以将测试用例中的一部分it改成xit（xit代表此条不进行测试），然后再次运行上述命令试试看。

至此，我们实现了在Windows上使用mocha对基于Node.JS的服务器端CoffeeScript进行测试并通过JSCoverage生成覆盖率报告。

但是……

会不会觉得上面那么多命令，每次敲来敲去会让手指发疼，关节发麻，有腱鞘炎倾向？没关系，我们仍然有更好的解决方案——

使用make

make是Linux下面的著名命令。用来方便地批量地完成编译、安装等一系列工作。说实话，我对make也不是了解太多，虽然以前有所接触，但基本都是这次研究这个测试问题才开始真正学习了一些。

如果你要搜索mocha的覆盖率测试，估计很多结果中都提到了在makefile中如何动手脚的文章。由于不懂make到底是什么，被误导了不少，后来才明白，文中提到的makefile其实都是他们自己写的文件。有了那神奇的makefile，就可以用非常简单的命令来批量执行上面的各种或长或短的命令了。

安装make

我使用的是GNU Make for Windows。

为了使用Octopress这套博客系统，之前安装了Ruby，里面自带了make，所以我就没有安装。

如果你要独立安装make，可以到主页上寻找安装程序，然后安装之。再然后，用万能确认命令确认：

make --version 如果出错，很可能是环境变量的PATH没有设置好，手动设置一下即可。

撰写makefile

安装好make后，就需要撰写makefile了。这是个挺麻烦的事儿。因为很多Windows的命令都不被支持。好在你看到这篇文章时，已经有我这个大善人写好了一份现成的makefile了。你只需复制或者下载即可，内容如下：

makefile github-source REPORT_FILE=coverage.html RMJS=rmdir.js RMV=node $(RMJS) # change this if using linux or others BROWSE=start

all: | test-all coverage

use this to cross platform $(RMJS): @echo 'var f=require("fs"),t=require("path");var r=function(a){var b=f.readdirSync(a);for(var c=0;c<b.length;c++){var d=b[c];if(d!=="."&&d!=".."){d=t.join(a,d);if(f.statSync(d).isDirectory()){r(d)}else{try{f.unlinkSync(d)}catch(e){}}}}try{f.rmdirSync(a)}catch(e){}};try{r(process.argv[2])}catch(e){}' > $(RMJS)
==========================================================================================================================================================================================================================================================================================================================================================

use this to cross platform rmtools: @coffee -e "require('fs').unlink 'rmdir.js'"
================================================================================

test-all: @echo 'Testing...' @mocha --compilers coffee:coffee-script

compile-coffee: $(RMJS) @$(RMV) lib-js @echo 'CoffeeScript -> JavaScript compiling...' @coffee -o lib-js -c lib @$(RMV) -p

clean-compile: @$(RMV) -p

jscoverage: @jscoverage --no-highlight lib-js lib-cov

mocha-html-cov: @echo 'Testing and generating coverage report...' @mocha --compilers coffee:coffee-script -R html-cov > $(REPORT_FILE)

clean-coverage: @$(RMV) lib-js @$(RMV) lib-cov

open-coverage: @echo 'Openning report in your default browser...' @$(BROWSE) $(REPORT_FILE)

clean-report: @$(RMV) $(REPORT_FILE)

compile: | $(RMJS) compile-coffee rmtools

coverage: | $(RMJS) compile-coffee jscoverage mocha-html-cov clean-coverage rmtools open-coverage

clean: | $(RMJS) clean-compile clean-coverage clean-report rmtools

.PHONY: all test-all compile-coffee clean-compile jscoverage mocha-html-cov clean-coverage open-coverage clean-report compile coverage clean rmtoos 虽说我是个大善人，但毕竟也是第一次写makefile，如果你是懂行的，发现了不足之处，请一定留言告诉我。

这里，有几点简单说明一下。

一个是RMJS这个东西。这是一个递归删除目录的js文件，在makefile中通过echo命令将内容写到文件中，并在用完后删除。之所以这么做，是因为无论是Windows的rd命令还是Linux的rm命令（当然是for Windows版本）都无法很好地删除目录。Windows的rd命令的问题是，make貌似不识别它，即便识别了，也会在/s /q（静默递归删除）参数上出现错误。而rm命令的问题更有趣。其它目录都没有问题，但在编译Coffee的命令执行后，如果在编译期间创建了新的目录则会产生一个名为-p的目录。估计是内部使用了Linux下的mkdir -p命令造成的。当使用rm -rf -p来删除时，-p会被识别为rm命令的参数而导致失败。故而，制造了这个RMJS。同时还可以达到跨平台的目的。同样，删除文件也用的是coffee脚本完成的。

另一个是BROWSE，在Windows下start命令可以使用默认打开方式打开文件，所以将查看HTML报告的命令定义为start。基本来讲，这里的makefile是可以跨平台移植的，当移植到其他平台时，需要修改此命令的定义。

最后一点，也是最重要的一点：文件名必须是小写的makefile。如果大小写不对，会导致make无法识别。

使用make

那么，写好了这个makefile，怎么用呢？

只要到有makefile的目录下，执行make命令即可。

单纯的测试，执行：

make test-all 编译CoffeeScript，执行：

make compile 代码覆盖率报告，执行：

make coverage 先测试，然后出覆盖率报告：

make 清理现场（删除中间生成的目录、文件）：

make clean 全部内容

本文中提到的所有代码，都被提交到了GitHub上，工程名字叫coffee-mocha-nodejs-coverage-windows-example。（好吧，我知道名字长了点……）

有兴趣的话，可以到那里取得所有的代码。

开发环境
========

Aptana
------

Aptana是一个非常强大,开源,JavaScript-focused的AJAX开发IDE。Aptana是一个基于Eclipse的集成开发环境， 其最广为人知的是它非常强悍的JavaScript编辑器和调试器。去年Aptana吸收了Radrails项目， 添加了非常强大的Ruby on Rails支持。但是Aptana前进的脚步并未停止。随着苹果公司iPhone手机的发布， Aptana也推出了功能完备的iPhone集成开发功能，在Adobe公司的RIA产品AIR推出不久之后，Aptana就支持了AIR的开发环境。

它的特点包括：

-	JavaScript,JavaScript函数,HTML,CSS语言的Code Assist功能。 *Outliner(大纲)：显示JavaScript,HTML和CSS的代码结构。
-	代码语法错误提示。
-	支持Aptana UI自定义和扩展。
-	支持跨平台。
-	支持流行AJAX框架的Code Assist功能：AFLAX，Dojo，JQuery，MochiKit，Prototype，Rico，script.aculo.us，Yahoo UI。

可以说是Web2.0最全面，最强大的开发工具了!

Aptana Studio支持中文的方法 ：

在Windows 菜单 → Preferences → General → Content Types， 选择 Text ，在下方指定默认编码为UTF-8， 并在File associations下面添加文件类型，如 *.js 进行确认， 如果文档的编码不是UTF-8 就指定成相应的编码。不过还是建议使用 UTF-8 编码。 官方网站：http://www.aptana.com/

Ruby
====

下载网址：http://rubyinstaller.org/downloads/

Go
==

只需要你对C语言，Unix，Python有一点基础，我相信你会在30分钟左右读完并对Go语言有一些初步了解的。

我为什么喜欢Go语言

从2000年至今，也写了11年代码了，期间用过VB、Delphi、C#、C++、Ruby、Python，一直在寻找一门符合自己心意和理念的语言。我很在意写代码时的手感和执行的效率，所以在Go出现之前一直没有找到。在熟悉Go之后，我虽没有停下脚步，也去体验了D语言，但几乎立即就放弃了，它的设计还是太复杂。

就说说Go吧。它的好其实也就两个字——简洁！

看很多朋友的留言都觉得这些“少个括号、少个分号”之类的东西没什么意义，真的吗？问题是，既然可以没有，为什么非得有？既然能够少打一个字符，为什么多打了还挺开心？还觉得天经地义？这里简单一点，那里简单一点，总的来说是不是就简单了很多？这里的设计简洁一点，那里简洁一点，是否整体就是紧凑高效？

很多东西，要整体去体会，才能感觉到真正的强大。没有前面这些语法上的各种“看起来没什么用”的支持，怎么能做到后面提到的那些设计上的简洁？

我坚信，少就是多，简单就是强大，不能减一分的设计才是真正的好设计！

简洁的变量声明和赋值

拿最简单的声明变量和赋值来看，下面这一句完成了声明类型到赋值，最后还有那个常见的分号作为语句的结束。

var i int = 10;

这个一点都不简洁对吧？为什么非要有“var”？为什么不能自己推导变量类型？为什么结尾非要加上分号？这三个问题，我相信Go语言的设计者也问过，并且都针对性的给了改进。重新来过。

i := 10

怎么样？“:=”是声明并推导类型的语法糖，结尾的分号也省了，因为这里我换行了，编译器明白的。

还可以一次性声明并赋值多个变量。

i, j, k := 1, 2, 3

不同的类型也可以。

i, j, k := 1, 1.0, “hello”

如果要声明一堆变量，但暂时不赋值呢？可以这样。

var (

```

i, j int s string u, v, s = 2.0, 3.0, "bar"

```

\)

Go的设计者甚至觉得多打几个“var”都不应该！

简洁的if

有点意思了对吧？我学习一门新语言的时候，第一眼看变量类型和声明，第二眼就会去看逻辑控制的语法。现在来看看都有些什么？

if i > 10 {

```

println(“Greater then 10”)

```

\}

稀松平常啊，难道一个简单的if还能更简单？恩，的确是的。首先if后面的条件判断没有人逼你再加上括号了，仅仅是少了两次按键嘛，还有呢？还有！下面这个应该是很常见的if使用场景。

result := SomeMethod()

if result > 0 {

\}

很多时候result这个变量其实仅仅用于条件判断，完全可以在if之后就扔掉，所以Go有了这么个写法。

if result := SomeMethod(); result > 0 {

\}

这个表达式太常用了，真是谁写谁知道，每次我写着一行都会心里一爽。来看看纠结一点的if段。

if a {

} else if b {

} else if c {

} else {

\}

这种写法是可以的，但不是Go推荐的，理由是可以更简洁。比如强悍的switch。

强悍的switch

这是很大家熟知的switch用法，注意，没有break哦！Go里面case之间不会“下穿”。

switch tag { default: s3() case 0, 1, 2, 3: s1() case 4, 5, 6, 7: s2() } 神奇一点的switch，嘿嘿，与if异曲同工之妙。 switch x := f(); { // missing switch expression means "true" case x < 0: return -x default: return x } 还有这个，有了这个更加明确的写法，你真的还会if…else if…else if…else…吗？

switch { case x < y: f1() case x < z: f2() case x == 4: f3() } 条件判断舒服了，循环呢？

孤单的for

其实我一直不太明白，为什么一门语言里面要提供多个循环语法呢？for、while、do…while…都是不可替代的？用哪一个呢？似乎都是看个人爱好吧？可能大家随便就可以举个例子出来证明这三个东西存在的必要和细微的差别，但对于我来说，做同一件事情如果有多种方法其实就是设计上的冗余，会对使用者造成或多或少的困扰。来看看Go的循环吧。

for i := 0; i < 10; i++ {

\}

for a < b {

\}

for {

\}

看吧，一个for就搞定所有情况了。来看一个常用的遍历集合，一把来说会写成这样。

count := len(someArray)

for i := 0; i < count; i++ {

```

println(someArray[i])

```

\}

简化这个，Go给出了一个关键字“range”，先看用法。

for i, value := range someArray {

```

// i 是整型，代表下标

// value就是数组内值的类型

```

\}

range不单单可以用于数组，实际上它可以用于任何集合，比如map。

m := map[string]int{"mon":0, "tue":1, "wed":2, "thu":3, "fri":4, "sat":5, "sun":6} for i, s := range a { // type of i is int // type of s is string } 这里只是提到了几点最基本的语法场景，Go里面还有很多！

函数可以返回多个值

其实能够在一行多重赋值的语言挺多的，但一个函数能返回多个值的就很少了，比如在C#里面如果要返回两个int，通常会这么干。

public class TwoInts

\{

```

public int A;

public int B;

```

\}

public class Foo

\{

```

public TwoInts ReturnTwoInt();

```

\}

然后就可以 TwoInts ti = foo.CalcTwoInt() 觉得悲催吗？也许你都麻木了对吗？很多语言都是这么设计的。函数只能返回一个值最大的问题是会导致出现很多没必要的数据结构。上面就体现了这个冗余，当然，你说可以用out关键字让函数返回，但这个语法用起来就不是那么安全了。而这个问题在Go里面解决起来太容易了，因为Go的函数可以返回多个值！

func returnTwoInt() (int, int) {

\}

a, b := returnTwoInt()

我对Go的好感就是从这里萌芽的，这让我的库里面从此少了很多数据结构！这无形中就能降低设计的复杂度。

函数内部声明的对象指针可以安全的返回

func ReturnPointer() *Object1 {

```

obj := new Object1()

obj.A = “hello”

return obj

```

\}

Go的垃圾回收器会处理好这种情况的，放心啦！

异常处理？defer是啥？能吃吗？

为什么异常处理那么复杂？多少人可以安全的实现下面这个逻辑？以下是伪代码。

File f = File.Read(“c:\\text.txt”)

f.Write(xxx)

f.Close()

我相信，有经验的码农们脑子里面瞬间出现了各种版本的try…catch…finally…，还有各种各样的书写规范，比如“catch”里面的逻辑不能在抛异常之类的东西。其实想想，我们的要求很简单，打开一个文件，然后保证它在最后被关闭。仅此而已，为什么做这么简单的一件事情非要那么复杂？看看人家Go是怎么做的！

func SaveSomething() {

```

if f, err := os.Open(“c:\\text.txt”); err == nil {

```

//各种读写

defer f.Close()

```

\}

```

\}

凡是加了defer的函数，都会在当前函数(这里就是SaveSomething)执行完毕之后执行。就算“//各种读写”时发生异常f.Close也会坚定的在SaveSomething退出时被执行。有了这个，释放点资源，关闭个把句柄这种小事再也无足挂齿！

接口再也不用“实现”了

从我接触OO思想一来，凡是有接口的语言，都以不同的方式要求类“实现”接口，这样的方式我一直都认为是天经地义的，直到我遇见了Go。

type Speaker interface {

```

Say()

```

\}

上面定义了一个接口，只有一个方法，Say，不需要参数，也没有返回值。Go里面，任何拥有某个接口所定义所有方法的东西，都默认实现了该接口。这是一句拥有太多内涵的话，足矣对设计思路产生重大的影响。比如下面这个方法，它接受一个类型为Speaker的参数。

func SaySomething(s Speaker) {

```

s.Say()

```

\}

那么所有拥有Say()方法的东西都可以往里扔。

在Go的世界里，所有的东西都默认实现了interface{}这个接口。有了这个概念，即使没有泛型也能有效的降低设计复杂度。

多线程还能更简单点吗？

要写多线程，你要懂Thread，懂各种锁，懂各种信号量。在各类系统里面，“异步”逻辑通常代表“困难”。这是Go最强劲的部分，你见过比下面这个还简单的异步代码吗（以下代码摘自Go的官方范例）？

func IsReady(what string, minutes int64) { time.Sleep(minutes * 60*1e9); fmt.Println(what, "is ready") } go IsReady("tea", 6); go IsReady("coffee", 2); fmt.Println("I'm waiting....");

执行的结果是，打印: I'm waiting.... (right away) coffee is ready (2 min later) tea is ready (6 min later)

Go语言内置了“go”这个语法，任何go的方法，都将会被异步执行。那异步方法之前传递消息呢？用channel呗。意如其名，就是一个管道，一个往里写，另外一个等着读。

ch := make(chan int) //创建一个只能传递整型的管道

func pump(ch chan int) { for i := 0; ; i++ { ch <- i } //往管道里写值 }

func suck(ch chan int) { for { fmt.Println(<-ch) } //这里会等着直到有值从管道里面出来 }

go pump(ch) //异步执行pump

go suck(ch) //异步执行suck

嘿嘿，然后你就看到控制台上输出了一堆数字。

Sublime Text
============

使用介绍、全套快捷键及插件推荐

开篇：如果说Notepad++是一款不错Code神器，那么Sublime Text应当称得上是神器滴哥。Sublime Text最大的优点就是跨平台， Mac和Windows均可完美使用；其次是强大的插件支持，几乎无所不能。

开始使用Sublime Text：

Sublime Text有Dev版本，推荐使用，下载地址，一般推荐下载便携版本（Portable version），这样拿来拿去很方便，也不用安装，而且插件和主体在一个目录下，便携。

相关阅读：

大前端推荐使用的前端开发工具 推荐轻量级开发软件 Notepad++ 及其两款超强辅助插件 Sublime Text快捷键：

Ctrl+Shift+P：打开命令面板 Ctrl+P：搜索项目中的文件 Ctrl+G：跳转到第几行 Ctrl+W：关闭当前打开文件 Ctrl+Shift+W：关闭所有打开文件 Ctrl+Shift+V：粘贴并格式化 Ctrl+D：选择单词，重复可增加选择下一个相同的单词 Ctrl+L：选择行，重复可依次增加选择下一行 Ctrl+Shift+L：选择多行 Ctrl+Shift+Enter：在当前行前插入新行 Ctrl+X：删除当前行 Ctrl+M：跳转到对应括号 Ctrl+U：软撤销，撤销光标位置 Ctrl+J：选择标签内容 Ctrl+F：查找内容 Ctrl+Shift+F：查找并替换 Ctrl+H：替换 Ctrl+R：前往 method Ctrl+N：新建窗口 Ctrl+K+B：开关侧栏 Ctrl+Shift+M：选中当前括号内容，重复可选着括号本身 Ctrl+F2：设置/删除标记 Ctrl+/：注释当前行 Ctrl+Shift+/：当前位置插入注释 Ctrl+Alt+/：块注释，并Focus到首行，写注释说明用的 Ctrl+Shift+A：选择当前标签前后，修改标签用的 F11：全屏 Shift+F11：全屏免打扰模式，只编辑当前文件 Alt+F3：选择所有相同的词 Alt+.：闭合标签 Alt+Shift+数字：分屏显示 Alt+数字：切换打开第N个文件 Shift+右键拖动：光标多不，用来更改或插入列内容 鼠标的前进后退键可切换Tab文件 按Ctrl，依次点击或选取，可需要编辑的多个位置 按Ctrl+Shift+上下键，可替换行 Sublime Text 设置：

Setting User 以下是浩子使用的 { "font_face": "courier new", "font_size": 9.0, "highlight_line": true, "scroll_past_end": false, "tab_size": 4, "theme": "Soda Dark.sublime-theme", "word_wrap": true } Sublime Text插件：

建议先启用Package Control，作用是安装插件时很方便，启用方法：菜单栏 – View – Show Console，贴入以下代码并回车，然后重启Sublime。如果你所在的网络无法启用，则无法使用，手动搜索下载去吧（话说你的网也被封了？）。

import urllib2,os;pf='Package Control.sublime-package';ipp=sublime.installed_packages_path();os.makedirs(ipp) if not os.path.exists(ipp) else None;open(os.path.join(ipp,pf),'wb').write(urllib2.urlopen('http://sublime.wbond.net/'+pf.replace(' ','%20')).read()) 开始安装一些非常实用的插件吧，Ctrl+Shift+P（菜单 – Tools – Command Paletter），输入 install 选中Install Package并回车，输入或选择你需要的插件回车就安装了（注意左下角的小文字变化，会提示安装成功），安装其它插件也是这个方法，非常快速。

ZenCoding 不得不用的一款前端开发方面的插件，Write less , show more.安装后可直接使用，Tab键触发，Alt+Shift+W是个代码机器。 Alignment 代码对齐，如写几个变量，选中这几行，Ctrl+Alt+A，哇，齐了。 Prefixr 写 CSS可自动添加 -webkit 等私有词缀，Ctrl+Alt+X触发。 Tag Html格式化，右键Auto-Format Tags on Ducument。 Clipboard History 剪贴板历史记录，显示更多历史复制，Ctrl+Shift+V触发。 SideBarEnhancements 侧栏右键功能增强，非常实用 Theme – Soda 完美的编码主题，用过的都说好，Setting user里面添加”theme”: “Soda Dark.sublime-theme” GBK to UTF8 将文件编码从GBK转黄成UTF8，菜单 – File里面找 SFTP 直接编辑 FTP 或 SFTP 服务器上的文件，绝对FTP浮云 WordPress 集成一些WordPress的函数，对于像我这种经常要写WP模版和插件的人特别有用 PHPTidy 整理排版PHP代码 YUI Compressor 压缩JS和CSS文件

crypto
======

crypto.createHash(algorithm)

创建并返回一个hash对象，它是一个指定算法的加密hash，用于生成hash摘要。

参数algorithm可选择系统上安装的OpenSSL版本所支持的算法。 例如：'sha1', 'md5', 'sha256', 'sha512'等。在近期发行的版本中，openssl list-message-digest-algorithms会显示这些可用的摘要算法。

hash.update(data)

更新hash的内容为指定的data。当使用流数据时可能会多次调用该方法。

hash.digest(encoding='binary')

计算所有传入数据的hash摘要。参数encoding（编码方式）可以为'hex', 'binary' 或者'base64'。

一般 都使用 hex crypto.createHash('md5').update(acct + dbpwd + tm).digest('hex') 注意，每次 都要 crypto.createHash('md5')， update 可多次调用，用于 流buffer！

var crypto = require('crypto');  
var md5 = crypto.createHash('md5');  
md5.update('参数组合结果');  
var result = md5.digest('hex');  
console.log('result =====',result);

主要问题是中文编码不一致，如是英文，加密结果与sign一致。为了解决这个问题需要用到node的buff模块。

[python] view plaincopyprint? var Buffer = require('buffer').Buffer  
var buf = new Buffer(1024);  
var len = buf.write('参数组合结果',0);  
var result = buf.toString('binary', 0, len);//这里要用binary才可以使结果与sign一致,还可以用uft8,ascii  
console.log('result=======',result);

进行如上处理后，可以使参数加密结果与sign一致，达到验证的目的。

关于回调 除非需要用到异步函数数据，如 依赖其执行结果是否成功，返回的对象等， 否则，可不使用回调，后台服务程序错误等直接写入日志，有回调没回调差不多！

模块之间引用 var parent = module.parent.exports

app.VERB(path, [callback...], callback) The app.VERB() methods provide the routing functionality in Express, where VERB is one of the HTTP verbs, such as app.post(). Multiple callbacks may be given, all are treated equally, and behave just like middleware, with the one exception that these callbacks may invoke next('route') to bypass the remaining route callback(s). This mechanism can be used to perform pre-conditions on a route then pass control to subsequent routes when there is no reason to proceed with the route matched.

The following snippet illustrates the most simple route definition possible. Express translates the path strings to regular expressions, used internally to match incoming requests. Query strings are not considered when peforming these matches, for example "GET /" would match the following route, as would "GET /?name=tobi".

app.get('/', function(req, res){ res.send('hello world'); }); Regular expressions may also be used, and can be useful if you have very specific restraints, for example the following would match "GET /commits/71dbb9c" as well as "GET /commits/71dbb9c..4c084f9".

app.get(/^\/commits\/(\w+)(?:..\(\w+))?$/, function(req, res){ var from = req.params[0]; var to = req.params[1] || 'HEAD'; res.send('commit range ' + from + '..' + to); }); Several callbacks may also be passed, useful for re-using middleware that load resources, perform validations, etc.

app.get('/user/:id', user.load, function(){ // ... }) These callbacks may be passed within arrays as well, these arrays are simply flattened when passed:

var middleware = [loadForum, loadThread];

app.get('/forum/:fid/thread/:tid', middleware, function(){ // ... })

app.post('/forum/:fid/thread/:tid', middleware, function(){ // ... }) app.all(path, [callback...], callback) This method functions just like the app.VERB() methods, however it matches all HTTP verbs.

This method is extremely useful for mapping "global" logic for specific path prefixes or arbitrary matches. For example if you placed the following route at the top of all other route definitions, it would require that all routes from that point on would require authentication, and automatically load a user. Keep in mind that these callbacks do not have to act as end points, loadUser can perform a task, then next() to continue matching subsequent routes.

app.all('*', requireAuthentication, loadUser); Or the equivalent:

app.all('*', requireAuthentication) app.all('*', loadUser); Another great example of this is white-listed "global" functionality. Here the example is much like before, however only restricting paths prefixed with "/api":

app.all('/api/*', requireAuthentication);

app.locals Application local variables are provided to all templates rendered within the application. This is useful for providing helper functions to templates, as well as app-level data.

app.locals.title = 'My App'; app.locals.strftime = require('strftime'); The app.locals object is a JavaScript Function, which when invoked with an object will merge properties into itself, providing a simple way to expose existing objects as local variables.

app.locals({ title: 'My App', phone: '1-250-858-9990', email: 'me@myapp.com' });

app.locals.title // => 'My App'

app.locals.email // => 'me@myapp.com' By default Express exposes only a single app-level local variable, settings.

app.get('title'); // => undefined

app.set('title', 'My Site'); app.get('title'); // => "My Site"

app.set('title', 'My App'); // use settings.title in a view app.render(view, [options], callback) Render a view with a callback responding with the rendered string. This is the app-level variant of res.render(), and otherwise behaves the same way.

app.render('email', function(err, html){ // ... });

app.render('email', { name: 'Tobi' }, function(err, html){ // ... });

NodeJS 都有哪些方式可以保证 node 进程的稳定性？
-----------------------------------------------

方案一，使用第三方模块

这类的模块不少，使用前需要仔细阅读使用说明，github 上作者写的很详细。推荐两个模块：forever 和 cluster

方案二，使用 node 原生 cluster 模块实现

csser 使用的就是这种方式，因为代码并不多，我也不需要过多的功能，关键代码

if (cluster.isMaster) { for (var i = 0; i < cpuNum; i++) { cluster.fork(); }

```

cluster.on('death', function(worker) { process.nextTick(function () { cluster.fork(); }); });

```

} else { var app = express.createServer(); boot(app); csser.io(app); }

function boot(app) { //~ 启动应用 csser.boot(app); //~ 启动服务器 app.listen(3000); }; 当 node 进程 death 之后，我使用 process.nextTick 来延迟启动，主要考虑到，如果用户发现了 csser 的这个漏洞，如果它一直请求该地址，会让 CPU 飙升（进程启动时非常耗费 CPU 资源），面对恶意访问者可能让 csser 无法访问。 process.nextTick 使用后，不会造成短时间内的服务器资源大量消耗，但会让 node 主进程也死掉，所以我又加了一层保险，以保证 502 不那么久，用的 crontab，每分钟检查 node 进程是否存在，不存在则启动它。

经常查看系统日志，找到程序中的漏洞，修补掉，让程序稳定运行，这应该是必须去做的，如此往返，漏洞越来越少。

cluster&forever

cluster & forever

虽然 nodejs 原生已经提供了 cluster 模块，大部分情况下可以满足我们的基本需求，但这两个模块 cluster 和 forever 都提供了更强大的功能。

cluster 及 forever 都能让你的 nodejs 应用的管理更加方便，比如启动、重启、停止你的应用。

他们也都可以保证应用的稳定性，如果你的 nodejs 程序存在错误而使进程关闭了，cluster 或 forever 都能自动重启他们，以保证 nodejs 应用零宕机。

Github 地址

https://github.com/nodejitsu/forever

https://github.com/LearnBoost/cluster

### node_redis

node_redis

是为 NodeJS 而写的 Redis client，它支持所有 Redis 命令。

使用方法

var redis = require("redis"), client = redis.createClient();

client.on("error", function (err) { console.log("Error " + err); });

client.set("string key", "string val", redis.print); client.hset("hash key", "hashtest 1", "some value", redis.print); client.hset(["hash key", "hashtest 2", "some other value"], redis.print); client.hkeys("hash key", function (err, replies) { console.log(replies.length + " replies:"); replies.forEach(function (reply, i) { console.log(" " + i + ": " + reply); }); client.quit(); }); Github 地址

https://github.com/mranney/node_redis

### html2jade

html2jade 模块可以方便的转换现有的 HTML 到 Jade 格式。

目前仅支持 OS X 和 Linux 平台。

使用方法

抓取 URL 并转换源码

html2jade http://twitter.com // 会输出到终端控制台 html2jade http://twitter.com > twitter.jade // 输出到 twitter.jade 文件 转换现有 HTML 文件 html2jade mywebpage.html # 输出到 mywebpage.jade html2jade public/*.html # 转换所有 .html 文件到 .jade Github 地址

https://github.com/donpark/html2jade

node-canvas

node-canvas

NodeJS 的 Canvas 实现，基于 Cairo。可以像浏览器端一样做图片处理：

var Canvas = require('../lib/canvas') , Image = Canvas.Image , fs = require('fs');

var img = new Image;

img.onerror = function(err){ throw err; };

img.onload = function(){ var w = img.width / 2 , h = img.height / 2 , canvas = new Canvas(w, h) , ctx = canvas.getContext('2d');

ctx.drawImage(img, 0, 0, w, h, 0, 0, w, h);

var out = fs.createWriteStream(\__dirname + '/crop.jpg');

var stream = canvas.createJPEGStream({ bufsize : 2048, quality : 80 });

stream.pipe(out); };

img.src = \__dirname + '/images/squid.png'; Github 地址：

https://github.com/LearnBoost/node-canvas

### mailer

NodeJS 邮件发送模块，支持定制基于 Mustache 的模板正文。

使用方法

var email = require("../lib/node_mailer");

for(var i = 0; i < 10; i++){

```

email.send({ host : "localhost", // smtp server hostname port : "25", // smtp server port ssl: true, // for SSL support - REQUIRES NODE v0.3.x OR HIGHER domain : "localhost", // domain used by client to identify itself to server to : "marak.squires@gmail.com", from : "obama@whitehouse.gov", subject : "node_mailer test email", body: "Hello! This is a test of the node_mailer.", authentication : "login", // auth login is supported; anything else is no auth username : "my_username", // username password : "my_password" // password }, function(err, result){ if(err){ console.log(err); } });

```

\} Github 地址

https://github.com/Marak/node_mailer

### gbk 处理

```

某网站返回的内容使用了GBK的编码。但是nodejs里只支持Unicode的解码。找了一个Iconv库，觉得不错， 实现了将GBK编码的buffer转换成为UTF8的buffer，然后调用一下toString变可获得UTF8的字符串了。不错。代码如下：

安装 npm install iconv

```

### 代码重用困难

```

由于 代码 不按常规流程执行，很多是在异步完成，因此代码重用比较困难 除非做很多 小 函数！

```

5、Async

```

```

### 如何在DOS窗口中显示UTF-8字符

如何在DOS窗口中显示UTF-8字符 作者：终南 <> 在中文Windows系统中，如果一个文本文件是UTF-8编码的，那么在CMD.exe命令行窗口（所谓的DOS窗口）中不能正确显示文件中的内容。 在默认情况下，命令行窗口中使用的代码页是中文或者美国的，即编码是中文字符集或者西文字符集。 如果想正确显示UTF-8字符，可以按照以下步骤操作： 1、打开CMD.exe命令行窗口 2、通过 chcp命令改变代码页，UTF-8的代码页为65001 gbk 936 chcp 65001 执行该操作后，代码页就被变成UTF-8了。但是，在窗口中仍旧不能正确显示UTF-8字符。 3、修改窗口属性，改变字体 在命令行标题栏上点击右键，选择"属性"->"字体"，将字体修改为True Type字体"Lucida Console"，然后点击确定将属性应用到当前窗口。 这时使用type命令就可以显示UTF-8文本文件的内容了： type filename.txt 4、通过以上操作并不能完全解决问题，因为显示出来的内容有可能不完全。可以先最小化，然后最大化命令行窗口，文件的内容就完整的显示出来了。

更改cmd代码页，修正中文显示 执行以下相应的命令： chcp 437/* 英文 */ chcp 932/* 日文 */ chcp 936/* 简体中文 */ chcp 949/* 韩文 */ chcp 950/* 繁体中文 */ chcp 65001 UTF-8 如果cmd的默认代码页属性修改不了，那么修改注册表： 1 win R打开运行，输入regedit打开注册表编辑器。 2 找到 [HKEY_CURRENT_USER\Console\%SystemRoot%_system32_cmd.exe] 3 修改"CodePage"=dword:000003a8 【注】十六进制"000003a8"或十进制"936"，表示“936 (ANSI/OEM - 简体中文 GBK)”。

~I - 删除任何引号(")，扩充 %I %~fI - 将 %I 扩充到一个完全合格的路径名 %~dI - 仅将 %I 扩充到一个驱动器号 %~pI - 仅将 %I 扩充到一个路径 %~nI - 仅将 %I 扩充到一个文件名 %~xI - 仅将 %I 扩充到一个文件扩展名 %~sI - 扩充的路径只含有短名 %~aI - 将 %I 扩充到文件的文件属性 %~tI - 将 %I 扩充到文件的日期/时间 %~zI - 将 %I 扩充到文件的大小 %~$PATH:I - 查找列在路径环境变量的目录，并将 %I 扩充到找到的第一个完全合格的名称。如果环境变

量未被定义，或者没有找到文件，此组合键会扩充空字符串

可以组合修饰符来得到多重结果:

%~dpI - 仅将 %I 扩充到一个驱动器号和路径 %~nxI - 仅将 %I 扩充到一个文件名和扩展名 %~fsI - 仅将 %I 扩充到一个带有短名的完整路径名 %~dp$PATH:i - 查找列在路径环境变量的目录，并将 %I 扩充到找到的第一个驱动器号和路径。 %~ftzaI - 将 %I 扩充到类似输出线路的 DIR

在以上例子中，%I 和 PATH 可用其他有效数值代替。%~ 语法用一个有效的 FOR 变量名终止。选取类似

%I 的大写变量名比较易读，而且避免与不分大小写的组合键混淆。

### 示例

node.js jade express 开发的轻博客  
http://cnodejs.net/

开源代码  
https://github.com/cnodejs/nodeclub

Session
-------

cookieSession() Provides cookie-based sessions, and populates req.session. This middleware takes the following options:

key cookie name defaulting to connect.sess secret prevents cookie tampering cookie session cookie settings, defaulting to { path: '/', httpOnly: true, maxAge: null } proxy trust the reverse proxy when setting secure cookies (via "x-forwarded-proto") app.use(express.cookieSession()); To clear a cookie simply assign the session to null before responding:

req.session = null

req.sessionID

Chrome浏览器查看cookies
-----------------------

打开chrome浏览器-工具设置-选项-高级设置-内容设置-所有cookie和网站数据，即可看到cookies数据列表

cookie分两种：'永久'cookie和session cookie:（打开ie->tools->internet options->security->custom level看看） 在asp中，当访问一个建立和使用了cookie的页面（语法见楼上）时，这些cookie就被当作头信息传到当前浏览器窗口中。窗口中页面不断变换，但他们的生命不朽（于是这些网页都可以读取此cookie变量了（当然要有毒取权）。从而解决了web的无状态问题），只有这个浏览器窗口关闭才会结束。他们被称为session cookie. 但是，当且仅当页面设置了expires时,这些cookie变量便会保存到你的硬盘上。这就是‘永久’cookie.看看这个例子:你登陆到一个网站，它把你的用户名和密码用COOKIE存放到你自己的硬盘上。你后来关了机回去睡了一觉。然后再上此网站。它会先读取你的COOKIE,自动登陆上去。你就不用再输入用户名，密码了。(当然了，'永久'COOKIE只有建立它的网站或域才读的到) ‘永久’cookie会一直保存到用EXPIRES指定的日子，然后轻轻地死去。

session

lib/middleware/session.js Setup session store with the given options.

Session data is not saved in the cookie itself, however cookies are used, so we must use the cookieParser() middleware before session().

Examples

connect.createServer( connect.cookieParser() , connect.session({ secret: 'keyboard cat' }) ); Options

key cookie name defaulting to connect.sid store Session store instance fingerprint Custom fingerprint generating function cookie Session cookie settings, defaulting to { path: '/', httpOnly: true, maxAge: 14400000 } secret Secret string used to compute hash

var hour = 3600000; req.session.cookie.expires = new Date(Date.now() + hour); req.session.cookie.maxAge = hour;

```

```

<!--  如何存储Session信息，InProc 设置为将Session存储在进程内，20分钟空闲，会话关闭
            默认情况下，使用Cookie 存储，cookieless="true" 通过URL存储来标识哪些请求属于特定的会话
-->

<sessionState mode="InProc" stateConnectionString="tcpip=127.0.0.1:42424" sqlConnectionString="data source=127.0.0.1;Trusted_Connection=yes" cookieless="false" timeout="20" />

```

```

Cookie
------

网站开发肯定会用到Cookie的对吧，可以将信息保存在客户端的好东西。那么在express中如何获取和设置呢？

直接上例子，跟着代码，看着注释走一遍就明白了

1 var express = require('http://www.cnblogs.com/') 2 , app = module.exports = express(); 3 4 5 //设置网站favicon.icon，放在这里是为了不让这种请求记录在日志中 6 app.use(express.favicon()); 7 8 //这个logger是个middleware，格式化console中请求日志的 9 if ('test' != process.env.NODE_ENV) 10 app.use(express.logger(':method :url')); 11 12 //这个cookieParser是express提供的一个分析Cookie信息，并将信息保存在req.cookie中的中间件 13 //如想通过req.cookie获得cookie的值，一定要加这句 14 app.use(express.cookieParser('my secret here')); 15 16 //这个bodyParser()也是express提供的一个中间件，支持urlencoded，multipart,json三种表单格式 17 //相当于 18 //app.use(express.json()); 19 //app.use(express.urlencoded()); 20 //app.use(express.multipart()); 21 app.use(express.bodyParser()); 22 23 24 25 //设置缺省响应 26 app.get('/', function(req, res){ 27 //直接通过req.cookies.key获取对应cookies中记录的value值 28 if (req.cookies.remember) { 29 res.send('Remembered :). Click to <a href="/forget">forget</a>!.'); 30 } else { 31 res.send('<form method="post"><p>Check to <label>' 32 + '<input type="checkbox" name="remember"/> remember me</label> ' 33 + '<input type="submit" value="Submit"/>.</p></form>'); 34 } 35 }); 36 37 app.get('/forget', function(req, res){ 38 //输入key值，清除对应的value值 39 res.clearCookie('remember'); 40 res.redirect('back'); 41 }); 42 43 app.post('/', function(req, res){ 44 var minute = 60000; 45 //输入key值,value值,第三个参数为cookie的设置 46 //例如:res.cookie('name', 'laodoujiao', { domain: '.cnblog.com', path: '/admin', secure: true,expires: new Date(Date.now() + 900000), httpOnly: true,maxAge:900000 }); 47 //注意maxAge这个参数，这是为了方便设置cookie的过期时间而设置的一个简易参数，已毫秒为单位 48 if (req.body.remember) res.cookie('remember', 1, { maxAge: minute }); 49 res.redirect('back'); 50 }); 51 52 if (!module.parent){ 53 app.listen(3000); 54 console.log('Express started on port 3000'); 55 }

FormsAuthentication.SetAuthCookie

Understanding Array.prototype.slice.apply(arguments) in JavaScript

12/11/2010 § 10 Comments

If you are a JavaScript developer soon or later you’ll bump into this guy: Array.prototype.slice.apply(arguments) and you’ll ask yourself..what the hell is that??

Well, it’s not that hard to understand actually, it’s just ugly. Anyway, “Array” is the JS class Array, with “Array.prototype” you get its prototype. I assume you know about the prototype, the key concept in JavaScript.

“slice” is a method in JavaScript that “selects a part of an array, and returns the new array.” (W3CSchool). It can have two arguments : start_index(required), end_index. So given:

var a = ["a", "b", "c"]; a.slice(1,2);

It return ["b"], so an array containing the element between index ’1′ and index ’2′ in the Array “a”.

var a = ["a", "b", "c"]; a.slice(1);

It return ["b", "c"], so an array containing the elements between index ’1′ and last index in the a, which is an Array.

So “a” is an Array of course, what about “arguments” variable?

Ok, arguments, you know, it’s the implicit JS variable created when you invoke a function, containing the arguments of a function. You’re expecting this variable to be an Array, right? Well, it’s not, it’s similar, but it’s still an object, so:

function f () { return arguments; }

given this function f, launching f("1", "2") instanceof Array

you’ll get FALSE! That means we can’t apply a bunch of stuff we normally do with an Array, such as push, pop, slice..but I need those methods, so what can I do?

There you go Array.prototype.slice.apply(arguments) converts arguments into an ARRAY.

Here we use one of the methods to call a function in JavaScript, the APPLY method, you can learn more about how to call a function in JS here. So we apply the slice function to the first argument of the apply function(in this case “arguments”) and we know that the slice() method returns always an Array. We got our Array!

So now Array.prototype.slice.apply(f("1", "2")) instanceof Array

it’ll return TRUE!

PS: In ECMAScript5, we won’t need to use “Array.prototype.slice.apply(arguments)” anymore, but we can easily use arguments.slice()!

node.js操作Cookie

通过node.js建立了一个完整的网站不是一件容易的事，这涉及读取页面模板，从数据库中抽出数据构建成新的页面返回给客户端。但光是这样还不行，我们还要设置首部，在chrome中如果CSS没有设置正确的Content-Type，会不起作用的。此处理还要考虑访问量，要设置缓存，缓存不单单是把东西从内存中读入读出就行，这样会撑爆电脑内存的，这用LRU算法（最近最少用的数据会清空出内存）。基于Cookie与数据库与URL重写，我们发展出一个session机制用于在多个action中通信。对于不同的请求交由不同的action来处理，就要发展出路由机制与MVC系统，等等。我信后写这些东西一点点写出来，揭示newland.js中遇到的种种问题与解决方案。如果什么都贪图方便，直接上框架，对我们语言学习是非常不利的。

本文正如标题所说，是操作Cookie。下面是一个完整的例子：

var http = require('http'); http.createServer(function (req, res) { // 获得客户端的Cookie var Cookies = {}; req.headers.cookie && req.headers.cookie.split(';').forEach(function( Cookie ) { var parts = Cookie.split('='); Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim(); }); console.log(Cookies) // 向客户端设置一个Cookie res.writeHead(200, { 'Set-Cookie': 'myCookie=test', 'Content-Type': 'text/plain' }); res.end('Hello World\n'); }).listen(8000);

console.log('Server running at http://127.0.0.1:8000/'); 如果去掉其中几句，就是官方给出的例子，除了表明返回一个页面多简单外，一点用也没有。

var http = require('http');

http.createServer(function (req, res) { res.writeHead(200, {'Content-Type': 'text/plain'}); res.end('Hello World\n'); }).listen(8000);

console.log('Server running at http://127.0.0.1:8000/'); 我们通过http.createServer的回调来处理所有请求与响应，因此什么有用的东西都在它们上面。Cookie位于req对象的headers对象上，为一个字符串，通常为了方便我们将它们转换成一个对象。

写入一个Cookie其实就是在首部设置一个键值对，上面是简单方式，它实际上可以这样：

res.writeHead(200, { 'Set-Cookie': ["aaa=bbb","ccc=ddd","eee=fff"], 'Content-Type': 'text/plain' }); 但真正使用时，我们的Cookie并非这样简单的的格式：

Set-Cookie: =[; =][; expires=][; domain=][; path=][; secure][; HttpOnly]

HttpOnly 属性： 这是微软对Cookie做的扩展。如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。

var http = require('http'); http.createServer(function (req, res) { // 获得客户端的Cookie var Cookies = {}; req.headers.cookie && req.headers.cookie.split(';').forEach(function( Cookie ) { var parts = Cookie.split('='); Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim(); }); console.log(Cookies) // 向客户端设置一个Cookie res.writeHead(200, { 'Set-Cookie': 'SSID=Ap4GTEq; Expires=Wed, 13-Jan-2021 22:23:01 GMT;HttpOnly ', 'Content-Type': 'text/html' }); res.end('Hello World\n<script>console.log(document.Cookie)</script>'); }).listen(8000);

console.log('Server running at http://127.0.0.1:8000/'); 然后多刷几次页面，我们发现我们还能在控制台看到SSID=Ap4GTEq这个属性，但在前端我们看不到它（当然在firebug中能看到）。

Secure属性： 当设置为true时，表示创建的 Cookie 会被以安全的形式向服务器传输，也就是只能在 HTTPS 连接中被浏览器传递到服务器端进行会话验证，如果是 HTTP 连接则不会传递该信息，所以不会被窃取到Cookie 的具体内容。同上，在客户端我们也无法在document.Cookie找到被设置了Secure=true的Cookie键值对。Secure属性是防止信息在传递的过程中被监听捕获后信息泄漏，HttpOnly属性的目的是防止程序获取Cookie后进行攻击。我们可以把Secure=true看成比HttpOnly更严格的访问控制。

path属性： 指定可访问Cookie的目录。例如："userId=320; path=/shop";就表示当前Cookie仅能在shop目录下使用。

domain属性： 指定可访问Cookie的主机名.主机名是指同一个域下的不同主机，例如：www.google.com和gmail.google.com就是两个不同的主机名。默认情况下，一个主机中创建的Cookie在另一个主机下是不能被访问的， 但可以通过domain参数来实现对其的控制，其语法格式为："name=value; domain=CookieDomain";以google为例，要实现跨主机访问，可以写为： "name=value;domain=.google.com";这样，所有google.com下的主机都可以访问该Cookie。

Expires属性：指定过期时间，格式为"name=value;; expires=GMT_String"; 其中GMT_String是以GMT格式表示的时间字符串，超过这个时间，Cookie将消失，不可访问。例如：如果要将Cookie设置为10天后过期，可以这样实现：

//获取当前时间 var date=new Date(); var expireDays=10; //将date设置为10天以后的时间 date.setTime(date.getTime()+expireDays*24*3600*1000); //将userId和userName两个Cookie设置为10天后过期 res.writeHead(200, { 'Set-Cookie': "userId=828; userName=hulk; expire="+date.toGMTString(); 'Content-Type': 'text/html' }); Max-Age属性： 个人感觉这个东西比Expires更好用，本来就是用于代替Expires，由于市面上的书你抄我，我抄你，都在抄旧知识，导致Expires还在使用。Max-Age的值 可以为正数，表示此Cookie从创建到过期所能存在的时间，以秒为单位，此Cookie会存储到客户端电脑，以Cookie文件形式保存，不论关闭浏览器或关闭电脑，直到时间到才会过期。 可以为负数，表示此Cookie只是存储在浏览器内存里，只要关闭浏览器，此Cookie就会消失。maxAge默认值为-1。 还可以为0，表示从客户端电脑或浏览器内存中删除此Cookie。

Cookie面向的主要是服务器，localstorage面向的是页面端js。页面所需的业务数据可以放在localstorage里，但是认证相关的信息还是需要放在Cookie里的。

Cookie的限制

一、浏览器允许每个域名所包含的 Cookie 数：

Microsoft 指出 Internet Explorer 8 增加 Cookie 限制为每个域名 50 个，但 IE7 似乎也允许每个域名 50 个 Cookie（《Update to Internet Explorer’s Cookie Jar》）。 Firefox 每个域名 Cookie 限制为 50 个。 Opera 每个域名 Cookie 限制为 30 个。 Safari/WebKit 貌似没有 Cookie 限制。但是如果 Cookie 很多，则会使 header 大小超过服务器的处理的限制，会导致错误发生。 二、当很多的 Cookie 被设置，浏览器如何去响应。除 Safari（可以设置全部Cookie，不管数量多少），有两个方法：

最少最近使用（least recently used (LRU)）的方法：当 Cookie 已达到限额，自动踢除最老的 Cookie ，以使给最新的 Cookie 一些空间。 Internet Explorer 和 Opera 使用此方法。 Firefox 很独特：虽然最后的设置的 Cookie 始终保留，但似乎随机决定哪些 Cookie 被保留。似乎没有任何计划（建议：在 Firefox 中不要超过 Cookie 限制）。 三、不同浏览器间 Cookie 总大小也不同：

Firefox 和 Safari 允许 Cookie 多达 4097 个字节, 包括名（name）、值（value）和等号。 Opera 允许 Cookie 多达 4096 个字节, 包括：名（name）、值（value）和等号。 Internet Explorer 允许 Cookie 多达 4095 个字节, 包括：名（name）、值（value）和等号。 注：多字节字符计算为两个字节。在所有浏览器中，任何 Cookie 大小超过限制都被忽略，且永远不会被设置。

最后让我们看看newland.js是怎么处理cookie的。

newland.js有个重要的对象叫httpflow，其实就是我的操作流flow的子类，它劫持了所有清求与响应。当一个请求过来时，框架就会new一个httpflow去处理它们。它有个patch方法，用于为操作流添加一些有用属性与方法，而不像express.js那样直接在原生对象上改。实现express.js现在的做法有点像Prototype.js，加之node.js的版本现在还没有到1.0，因此API改动还很频繁的。express.js的行为无异走钢线。而把操作移到一个自定义对象就安全多了。

// 源马见https://github.com/RubyLouvre/newland/blob/master/system/mvc.js http.createServer(function(req, res) { var flow = new Flow()//创建一个流程对象，处理所有异步操作，如视图文件的读取、数据库连接 flow.patch(req, res) services.forEach(function(fn){ fn(flow);//将拦截器绑到流程对象上 }); //... }) 此外，httpflow还劫持res.writeHead，res.setHeader，目的为实现多次调用setCookie时而不相互覆盖。

// 源马见https://github.com/RubyLouvre/newland/blob/master/system/httpflow.js patch: function(req, res){ this.res = res; this.req = req; this.originalUrl = req.url; this.params = {}; this.session = new Store(this) this.flash = function(type, msg){ //。。。。。 } var flow = this; var writeHead = res.writeHead; var setHeader = res.setHeader; flow._setHeader = setHeader; res.writeHead = function(){ flow.fire('header'); writeHead.apply(this, arguments); this.writeHead = writeHead;//还原 } res.setHeader = function(field, val){ var key = field.toLowerCase() if ( 'set-cookie' == key ) { var array = typeof val == "string" ? [val] : val; array.forEach(function(str){ var arr = str.split("="); flow.addCookie(arr[0], arr[1]) }) } else{ if ('content-type' == key && this.charset) { val += '; charset=' + this.charset; } setHeader.call(this, field, val); } } } 此外操作流还有两个有用的方法来添加或移除Cookie。

// 源马见https://github.com/RubyLouvre/newland/blob/master/system/httpflow.js addCookie: function(name, val, opt){ if(!this.resCookies){ this.resCookies = {}; this.resCookies[name] = [val, opt] this.bind("header", function(){ var array = [] for(var i in this.resCookies){ var arr = this.resCookies[i]; array.push( Cookie.stringify(i, arr[0], arr[1] ) ) } this._setHeader.call(this.res, "Set-Cookie",array) }) }else{ this.resCookies[name] = [val, opt] } return this; }, removeCookie: function(name){ var cookies = Array.isArray(name) ? name : [ name ]; cookies.forEach(function(cookie){ this.addCookie(cookie,"", 0) },this); return this; }, 实质上，经过上面的代码，我们就好方便多次添加或删除Cookie。个人认为用setHeader来操作（即使它已经被偷龙转凤还是不怎么好用），大家还是用addCookie, removeCookie来干吧。这些操作会在用户第一次调用当前的res.whireHead生效！

flow.addCookie("ACookie","xxxxxxxxxx"); flow.addCookie("BCookie","yyyyyyyyy"); flow.addCookie('rememberme', 'yes', { expires: 0, httpOnly: true })

//链式写法，同名cookie前者会覆盖后者的，前端只生成“aaa=2; bbb=1” flow.addCookie("aaa",1).addCookie("aaa",2).addCookie("bbb",1).addCookie("bbb",1)

flow.res.setHeader("Set-Cookie","user=aaa")

flow.removeCookie("oldCookie") //传入一个字符串数组，同时删除多个cookie flow.removeCookie(["myCookie","uuer","newCookie"]) 如果你想查看从客户端来的cookie，那么直接看flow.cookie好了，它会在途中调用一个get_cookie的服务，将原始的字符始形式转换为一个对象。

Cookie知识整理

IE应用服务器JSPSSOSocket Cookie整理

最近在项目中需要用到Cookie来实现从一个域名到另外一个域名的免登。于是需要了解整理一下Cookie的相关知识。 由于HTTP协议是无状态的协议（虽然Socket连接是有状态的，但每次用HTTP协议进行数据传输后就关闭的Socket连接，因此，HTTP协议并不会保存上一次的状态），因此，如果要保存某些HTTP请求过程中所产生的数据，就必须要有一种类似全局变量的机制保证数据在不同的HTTP请求之间共享，所以要用到Cookie来标识用户状态。

一，设置Cookie Cookies分为[内存Cookie]（临时Cookie，在浏览器关闭的时候消失），和[硬盘Cookie]（写到客户端的硬盘中）。 每个Cookie有一个超时时间，内存Cookie只写到客户端的内存中，其超时时间为任何负数。如下可以定义一个内存Cookie： Cookie cookie = new Cookie("key","value"); cookie.setMaxAge(-1);  
response.addCookie(cookie); 对于硬盘Cookie，可以对其进行超时时间的设置，以秒为单位，如下定义一个硬盘Cookie： Cookie cookie = new Cookie("key","value"); cookie.setMaxAge(3600); //在此定义了Cookie的有效时间为一个小时。  
response.addCookie(cookie);

永久Cookie在任意新开启的IE窗口都可以生成Cookie。而临时Cookie由于只保存在当前IE窗口，因此，在新开启的IE窗口，是不能生成Cookie字段的，也就是说，新窗口和旧窗口是不能共享临时Cookie的。使用重定向机制弹出的新窗口也无法和旧窗口共享临时Cookie。但在同一个窗口可以。如在一个IE窗口输入http://localhost:8080/test/first.jsp，向内存写入一个临时Cookie后，在同一个IE窗口输入http://localhost:8080/test/second.jsp，浏览器在向服务端发送HTTP请求时，自动将当前浏览器的临时Cookie(也就是first.jsp所创建的Cookie)和永久Cookie作为HTTP请求头的Cookie字段值发送给服务端。但是如果新启一个IE窗口，由于新IE窗口没有这个临时Cookie，因此，second.jsp只发送了保存在硬盘上的永久Cookie。

设置Cookie的时候还有其他参数可以设置 ●path，设置哪些目录下的应用可以访问改Cookie。如下设置： Cookie cookie = new Cookie("key","value"); cookie.setPath("/test/test2"); //在此定义了/test/test下的应用可以访问该Cookie。 response.addCookie(cookie); path的默认值是"./"为当前路径。 ●Domain，设置Cookie生成的域。如下： Cookie cookie = new Cookie("key","value"); cookie.setDomain(".channel.alisoft.com"); //在此定义了Cookie生成在哪个域下面 response.addCookie(cookie); 这个参数必须以"."开始。

下面说下怎么通过setDomain的方法实现Cookie的跨域访问： A机所在的域：home.aaa.com,A有应用appInA。 B机所在的域：bbb.com，B有应用appInB. 1）在appInA下面设置cookie的时候，增加cookie.setDomain(".bbb.com");这样在appInB下面就可以取到cookie。 2）输入url访问appInB的时候，必须输入域名才能解析。比如说在A机器输入：http://bbb.com:8080/appInB,可以获取appInB在客户端设置的cookie，而B机器访问本机的应用，输入：http://localhost:8080/appInB则不可以获得cookie。 3）设置了cookie.setDomain(".bbb.com");，还可以在默认的home.aaa.com下面共享。 4）问题：怎么设置多个域？在多个域下共享。网上找了很久都没有找到真正能用的方法，估计要用其他技术实现了。

二，读取Cookie 读取Cookie可以按照下面的语句进行： Cookie[] cookies = request.getCookies(); 然后用for语句查找你想要的Cookie。 该方法可以读取当前路径以及"直接父路径"的所有Cookie对象，如果没有任何Cookie的话，则返回null

三，删除Cookie Cookie cookie = new Cookie("key", null); cookie.setMaxAge(0); 设置为0为立即删除该Cookie cookie.setPath("/test/test2"); 删除指定路径上的Cookie，不设置该路径，默认为删除当前路径Cookie response.addCookie(cookie);

cookie session 保存
-------------------

maxAge: -1 只是保存在浏览器内存中 0 删除，大于0 则是过期的毫秒数！

app.use(express.session({ // session支持 //secret: cfg.session.secret, // 用于计算 hash cookieParser 已经设置，这里似乎可不再设置了 key: "pai.sid", // 缺省 使用 sid 作为key，更好，避免多登录冲突！ cookie: { maxAge: -1 } // -1不保存到客户端硬盘，0 清除，>0保存到硬盘 { path: '/', httpOnly: true, maxAge: 14400000 } 4 小时 设置会保存到硬盘 //cookie: { path: '/', httpOnly: true }, //4 小时 设置会保存到硬盘 //store: sessionStore 存储在内存中 }));

Max-Age属性： 个人感觉这个东西比Expires更好用，本来就是用于代替Expires，由于市面上的书你抄我，我抄你，都在抄旧知识，导致Expires还在使用。Max-Age的值 可以为正数，表示此Cookie从创建到过期所能存在的时间，以秒为单位，此Cookie会存储到客户端电脑，以Cookie文件形式保存，不论关闭浏览器或关闭电脑，直到时间到才会过期。 可以为负数，表示此Cookie只是存储在浏览器内存里，只要关闭浏览器，此Cookie就会消失。maxAge默认值为-1。 还可以为0，表示从客户端电脑或浏览器内存中删除此Cookie。

Cookie面向的主要是服务器，localstorage面向的是页面端js。页面所需的业务数据可以放在localstorage里，但是认证相关的信息还是需要放在Cookie里的。

Cookie的限制

一、浏览器允许每个域名所包含的 Cookie 数：

Microsoft 指出 Internet Explorer 8 增加 Cookie 限制为每个域名 50 个，但 IE7 似乎也允许每个域名 50 个 Cookie（《Update to Internet Explorer’s Cookie Jar》）。 Firefox 每个域名 Cookie 限制为 50 个。 Opera 每个域名 Cookie 限制为 30 个。 Safari/WebKit 貌似没有 Cookie 限制。但是如果 Cookie 很多，则会使 header 大小超过服务器的处理的限制，会导致错误发生。 二、当很多的 Cookie 被设置，浏览器如何去响应。除 Safari（可以设置全部Cookie，不管数量多少），有两个方法：

最少最近使用（least recently used (LRU)）的方法：当 Cookie 已达到限额，自动踢除最老的 Cookie ，以使给最新的 Cookie 一些空间。 Internet Explorer 和 Opera 使用此方法。 Firefox 很独特：虽然最后的设置的 Cookie 始终保留，但似乎随机决定哪些 Cookie 被保留。似乎没有任何计划（建议：在 Firefox 中不要超过 Cookie 限制）。 三、不同浏览器间 Cookie 总大小也不同：

Firefox 和 Safari 允许 Cookie 多达 4097 个字节, 包括名（name）、值（value）和等号。 Opera 允许 Cookie 多达 4096 个字节, 包括：名（name）、值（value）和等号。 Internet Explorer 允许 Cookie 多达 4095 个字节, 包括：名（name）、值（value）和等号。 注：多字节字符计算为两个字节。在所有浏览器中，任何 Cookie 大小超过限制都被忽略，且永远不会被设置

中间件
------

// 自定义中间件，处理单次提醒消息及全局变量！ app.use(function(req, res, next) { if ( !req.flash ) req.flash = utils.flash;

```

res.locals.flashInfo = req.flash('info');

//res.locals.error = req.flash('error').toString(); j //res.locals.success = req.flash('success').toString(); //res.locals.user = req.session ? req.session.user : null; next();

```

});

express 使用了 connect组件，该组件实际上就是将所有插入的（use）处理模块， 按顺序，执行而已，主要三个参数： req、res、next， 该函数被 connect 异步调用，next决定是否继续往下执行！

use可使用第三方的模块，也可以use 自己的模块！

用户登录信息
------------

-	用户标识一般写入客户端cookie
-	通过用户标识，加载用户数据到全局缓存，通过id可读取！
-	session跟全局内存一样容易丢失，用session与全局缓存没什么太大差别！
-	全局缓存可基于这个app访问，每个页面请求，只不是系统的事件回调！
-	可将缓存的user对象赋给 req，方便在各个处理函数中访问
-	如果全局缓存中没有改用户，则自动加载，这样服务端重启，用户无需重新登录！
-	用户标识需使用对称加密算法加密，并给定期限
-	如果无期限，则只在浏览器内存，不写硬盘，比较安全， 有期限则会写入硬盘，一般给 24小时固定期限，这样用户24小时内能持续工作！ 也可以给用户选择 记住登录，一周内自动登录！ 或者给 4小时的 浮动期限，每次访问给4小时 maxAge，4小时内没访问，则自动过期， 再访问，需输入重新登录！

ar crypto = require('crypto'); //加密 function encrypt(str, secret) { var cipher = crypto.createCipher('aes192', secret); var enc = cipher.update(str, 'utf8', 'hex'); enc += cipher.final('hex'); return enc; } //解密 function decrypt(str, secret) { var decipher = crypto.createDecipher('aes192', secret); var dec = decipher.update(str, 'hex', 'utf8'); dec += decipher.final('utf8'); return dec; }

var crypto = require( 'crypto' ); var cipher = crypto.createCipheriv('aes-256-cbc', DATA_CRYPT_KEY, DATA_CRYPT_IV); var crypted = cipher.update(JSON.stringify(result),'utf8','hex'); crypted += cipher.final('hex');

res.send(crypted);

cookie运行解决方案

1、多数的服务器会使用session复制的方法：当session的值被改变时，将它复制到其它机器上。这个方案又有两种具体的实现 ，一种是广播的方式，缺点：当访问量增大的时候 ，带宽增大，而且随着机器增加，网络负担成指数级上升，不具备高度可扩展性 ；另一种是TCP-ring的方式，也就是把集群中所有的服务器看成一个环，A->B->C->D->A，首尾相接，缺点：一是配置复杂；二是每增添/减少一台机器时，ring都需要重新调整，这将成为性能瓶颈；三是要求前端的Load Balancer具有相当强的智能，才能将用户请求分发到正确的机器上。

2、将session保存在单一的数据源中，这个数据源可被集群中所有的机器所共享 ，但带来的问题就是性能问题了。

解决方案:是把session以Cookie的形式保存在客户端。

优点：极高的扩展性和可用性

通过良好的编程，控制保存在cookie中的session对象的大小。 通过加密和安全传输技术（SSL），减少cookie被破解的可能性。 只在cookie中存放不敏感数据，即使被盗也不会有重大损失。 控制cookie的生命期，使之不会永远有效。偷盗者很可能拿到一个过期的cookie。 缺点：

Cookie数量和长度的限制。每个domain最多只能有20条cookie，每个cookie长度不能超过4KB，否则会被截掉。 安全性问题。如果cookie被人拦截了，那人就可以取得所有的session信息。即使加密也与事无补，因为拦截者并不需要知道cookie的意义，他只要原样转发cookie就可以达到目的了。 有些状态不可能保存在客户端。例如，为了防止重复提交表单，我们需要在服务器端保存一个计数器。如果我们把这个计数器保存在客户端，那么它起不到任何作用。

cookieSession() Provides cookie-based sessions, and populates req.session. This middleware takes the following options:

key cookie name defaulting to connect.sess secret prevents cookie tampering cookie session cookie settings, defaulting to { path: '/', httpOnly: true, maxAge: null } proxy trust the reverse proxy when setting secure cookies (via "x-forwarded-proto") app.use(express.cookieSession()); To clear a cookie simply assign the session to null before responding:

req.session = null

写入 cookie 的过期时间时在GMT或UTC时间格式上的兼容问题

express 写入 cookie时，将过期时间转换UTC 格式及时区！ if (opt.expires) pairs.push('Expires=' + opt.expires.toUTCString());

从北京时间转换成GMT/UTC时间有8个小时的时间差。计算方法为：

UTC时间 + 时间差(+8) = 本地时间

兼容问题为：

在 web 浏览器中写入cookie的过期时间的实现是不同的。 Google chrome 浏览器会把转换成GMT/UTC后的时间写入cookie的过期时间，  
而IE和FF浏览器还是把本地时间写入cookie的过期时间，

expires 如果使用 getTime() 加上需要保存的时间 toUTCString() 无论在 chrome还是 ie都没有问题！ 如果 getTime 后 + 8小时，变成当前时区时间，保存时，toUTCString 会转换为标准时区时间， toUTCString 不仅转换格式，同时还会转换时区，设置过期时间，需考虑时区！

写入cookie的函数JS代码如下： function setCookie(key, val, expires, domain, path, secure){ if (!path) path = '/';

```

document.cookie = key + '=' + encodeURIComponent(val) + (expires ? '; expires=' + expires : '') + (domain ? '; domain=' + domain : '') + (path ? '; path=' + path : '') + (secure ? '; secure' : '');

```

\}

写入cookie的代码如下：

var dat = new Date(); var maxAge = 毫秒数; setCookie('bookInfoCounts', counts, new Date(Date.now() + maxAge).toUTCString());

express 代码： res.cookie = function(name, val, options){ options = utils.merge({}, options); var secret = this.req.secret; var signed = options.signed; if (signed && !secret) throw new Error('connect.cookieParser("secret") required for signed cookies'); if ('number' == typeof val) val = val.toString(); if ('object' == typeof val) val = 'j:' + JSON.stringify(val); if (signed) val = 's:' + sign(val, secret); if ('maxAge' in options) { options.expires = new Date(Date.now() + options.maxAge); options.maxAge /= 1000; } if (null == options.path) options.path = '/'; this.set('Set-Cookie', cookie.serialize(name, String(val), options)); return this; };

不设置 expires，ie、chrome 都显示浏览器关闭失效，但是另外打开ie，chrome查看 cookie还是有效， 说明相同浏览器共享了进程！ 这意味着，如果用 a账户登录系统，在开另外一个浏览器，用b账户登录系统，对于浏览器生命周期的cookie， 还是会干扰的，b账户会冲掉a账户！

如果希望在同一台计算机上同时登录两个账户，必须使用不同的浏览器，如 ie64位、ie32位、chrome、firefox！

express 4
---------

New features in 4.x removed bundled middleware

None of the middleware from connect is bundled with express (or exposed on the express module). Any middleware you want to use should be installed and listed in your apps package.json. This allows for feature fixes and faster updates to middleware without affecting express core.

See middleware modules for a list of modules for old connect middleware.

Migrating from 3.x to 4.x Overview Express 4 no longer has connect as a dependency. This means that ALL of the bundled middleware (except static) is no longer available on the express module. Each of these middlewares is available as modules referenced below. This change was made to allow for these middleware to receive fixes, updates, and releases without impacting express release cycles and vice versa.

bodyParser body-parser cookieParser cookie-parser favicon static-favicon session express-session others documented here https://github.com/senchalabs/connect#middleware

中间件需单独安装！！！ express 和 中间件已经剥离了，除了 express.static。

npm install cookie-parser

Middleware

These middleware and libraries are officially supported by the Connect/Express team:

body-parser - previous bodyParser, json, and urlencoded. You may also be interested in: body co-body raw-body compression - previously compress connect-timeout - previously timeout cookie-parser - previously cookieParser cookie-session - previously cookieSession csurf - previousy csrf errorhandler - previously error-handler express-session - previously session method-override - previously method-override morgan - previously logger response-time - previously response-time serve-index - previousy directory serve-static - previously static static-favicon - previously favicon vhost - previously vhost

在4.x各个模块需要单独安装，然后require，可以使用npm install --save xxxx，这样可以自动把模块保存到你的package.json里，

http://jser.me/2014/03/18/express4.x%E6%96%B0%E7%89%B9%E6%80%A7%E4%BB%A5%E5%8F%8A%E5%A6%82%E4%BD%95%E4%BB%8E3.x%E5%8D%87%E7%BA%A7%E5%88%B04.x.html

express4.x新特性以及如何从3.x升级到4.x 距离我写expressx2.x升级3.x已经过去一年多的时间了，这期间express发展很迅速，已经是nodejs社区事实上的web框架之王。最近express发布了4.0.0-rc3，其中又有了一些改变，下面我们来看看有哪些改变，以及如何从3.x升级到4.x。

移除内置中间件 4.x版本不再依赖Connect，之前内置的所有中间件除了static都被分离为单独的模块了，也就是如果你的3.x的代码是：

app.configure(function() { app.use(express.static(\__dirname + '/public')); app.use(express.logger('dev')); app.use(express.bodyParser()); app.use(express.methodOverride()); }); 在4.x各个模块需要单独安装，然后require，可以使用npm install --save xxxx，这样可以自动把模块保存到你的package.json里，4.x的代码示例：

var app = express(); var express = require('express'); var morgan = require('morgan'); //logger模块的这个新名字真是神奇 var bodyParser = require('body-parser'); var methodOverride = require('method-override');

app.use(express.static(\__dirname + '/public')); app.use(morgan('dev')); app.use(bodyParser()); app.use(methodOverride()); 下面是3.x的内置模块和4.x模块的对照表，你可以发现，模块名有点混乱，有的是把驼峰改成了连字符，有的是反过来的，有的前缀express，有的是没有，真不知道怎么命名的，这个应该好好跟grunt或者gulp学习一下。

3.x 4.x bodyParser body-parser compress compression cookieSession cookie-session logger morgan cookieParser cookie-parser session express-session favicon static-favicon response-time response-time error-handler errorhandler method-override method-override timeout connect-timeout vhost vhost csrf csurf directory serve-index static serve-static 强化的路由功能 4.x提供了一个更棒的Router对象和route接口，可以更方便的把路由分解成单独的文件

不要再手动执行app.use(app.routers), app.use和app[get|post]混用的时候，将会按照它们调用的顺序执行

例如有一个3.x的代码

app.use(cookieParser()); app.use(bodyParser()); app.use(app.router); // 这行要干掉

// 在路由之后执行 app.use(function(req, res, next); // 错误处理的中间件 app.use(function(err, req, res, next) {});

//正常的路由挂载 app.get('/' ...); app.post(...); 换成了4.x的：

app.use(cookieParser()); app.use(bodyParser());

//正常的路由挂载, 这里和app.use混用的时候 //如果需要中间件调用之前处理就必须use之前挂载 app.get('/' ...); app.post(...);

// 在路由之后执行 app.use(function(req, res, next); // 错误处理的中间件 app.use(function(err, req, res, next) {}); 4.x更方便的路由, app.route方法会返回一个Route实例，它可以继续使用所有的HTTP方法，并且它还有一个all方法，可以在所有的HTTP方法上生效

app.route('/users') .get(function(req, res, next) {}) .post(function(req, res, next) {}) Router 对象 这是4.x里新增加的一个对象，它有点像迷你版的app对象，它没有views和setting，但是包含所有的路由接口，比如 .use, .route, .param, .get。

它可以帮助我们更好组织代码，假如项目里有个routes/people.js

var people = express.Router();

people.use(function(req, res, next) { });

people.get('/', function(req, res, next) { }); 可以把它挂在 /people下，所有的/people/*处理都会由people.js里的Router来处理了

app.use('/people', require('./routes/people').people); 更多关于Router的内容可以看文档

删除app.configure方法 这个方法使用还是比较多的，如果你用来判断环境的代码，比如3.x下的

app.configure('development', function() { // configure stuff here }); 在4.x下，这个方法完全没有了，你需要换成

var env = process.env.NODE_ENV || 'development'; if ('development' == env) { // configure stuff here } 删除express.createServer() 这个在3.x的时代就已经废弃了，直接使用 express()就行了

删除res.charset 使用res.set('content-type')或者res.type()来设置默认的charset，使用res.setHeader时不会再默认加charset了

req.accepted改为req.accepts 有几个相关的方法都改名了

req.accepts() req.acceptsEncodings() req.acceptsCharsets() req.acceptsLanguages() req.params的改变 这个属性现在是一个对象，不再是一个数组

res.locals 不再是一个方法，现在它就是一个纯对象，只用来数据

req.is 去掉了，可以使用type-is模块

总结 总的来说，改动还是挺大的，如果你想升级，最好留有足够的时间来把你的代码调整为4.x的。

如果发现这篇文章里有什么错误，欢迎留言反馈。

喜欢看英文的朋友，可以直接看下面的文章：

Migrating from 3.x to 4.x New features in 4.x 文章地址： express4.x新特性以及如何从3.x升级到4.x

我们知道，HTTP 协议是以 ASCII 码传输，建立在 TCP/IP 协议之上的应用层规范。规范把 HTTP 请求分为三个部分：状态行、请求头、消息主体。类似于下面这样：<method> <request-url> <version><headers>

<entity-body></entity-body></headers></version></request-url></method> 协议规定 POST 提交的数据必须放在消息主体（entity-body）中，但协议并没有规定数据必须使用什么编码方式。实际上，开发者完全可以自己决定消息主体的格式，只要最后发送的 HTTP 请求满足上面的格式就可以。

但是，数据发送出去，还要服务端解析成功才有意义。一般服务端语言如 php、python 等，以及它们的 framework，都内置了自动解析常见数据格式的功能。服务端通常是根据请求头（headers）中的 Content-Type 字段来获知请求中的消息主体是用何种方式编码，再对主体进行解析。所以说到 POST 提交数据方案，包含了 Content-Type 和消息主体编码方式两部分。下面就正式开始介绍它们。

application/x-www-form-urlencoded

这应该是最常见的 POST 提交数据的方式了。浏览器的原生 form 表单，如果不设置 enctype 属性，那么最终就会以 application/x-www-form-urlencoded 方式提交数据。请求类似于下面这样（无关的请求头在本文中都省略掉了）：

POST http://www.example.com HTTP/1.1 Content-Type: application/x-www-form-urlencoded;charset=utf-8

title=test&sub%5B%5D=1&sub%5B%5D=2&sub%5B%5D=3 首先，Content-Type 被指定为 application/x-www-form-urlencoded；其次，提交的数据按照 key1=val1&key2=val2 的方式进行编码，key 和 val 都进行了 URL 转码。大部分服务端语言都对这种方式有很好的支持。例如 PHP 中，$_POST['title'] 可以获取到 title 的值，$_POST['sub'] 可以得到 sub 数组。

很多时候，我们用 Ajax 提交数据时，也是使用这种方式。例如 JQuery 和 QWrap 的 Ajax，Content-Type 默认值都是「application/x-www-form-urlencoded;charset=utf-8」。

multipart/form-data

这又是一个常见的 POST 数据提交的方式。我们使用表单上传文件时，必须让 form 的 enctyped 等于这个值。直接来看一个请求示例：

POST http://www.example.com HTTP/1.1 Content-Type:multipart/form-data; boundary=----WebKitFormBoundaryrGKCBY7qhFd3TrwA

------WebKitFormBoundaryrGKCBY7qhFd3TrwA Content-Disposition: form-data; name="text"

title ------WebKitFormBoundaryrGKCBY7qhFd3TrwA Content-Disposition: form-data; name="file"; filename="chrome.png" Content-Type: image/png

PNG ... content of chrome.png ... ------WebKitFormBoundaryrGKCBY7qhFd3TrwA-- 这个例子稍微复杂点。首先生成了一个 boundary 用于分割不同的字段，为了避免与正文内容重复，boundary 很长很复杂。然后 Content-Type 里指明了数据是以 mutipart/form-data 来编码，本次请求的 boundary 是什么内容。消息主体里按照字段个数又分为多个结构类似的部分，每部分都是以 --boundary 开始，紧接着内容描述信息，然后是回车，最后是字段具体内容（文本或二进制）。如果传输的是文件，还要包含文件名和文件类型信息。消息主体最后以 --boundary-- 标示结束。关于 mutipart/form-data 的详细定义，请前往 rfc1867 查看。

这种方式一般用来上传文件，各大服务端语言对它也有着良好的支持。

上面提到的这两种 POST 数据的方式，都是浏览器原生支持的，而且现阶段原生 form 表单也只支持这两种方式。但是随着越来越多的 Web 站点，尤其是 WebApp，全部使用 Ajax 进行数据交互之后，我们完全可以定义新的数据提交方式，给开发带来更多便利。

application/json

application/json 这个 Content-Type 作为响应头大家肯定不陌生。实际上，现在越来越多的人把它作为请求头，用来告诉服务端消息主体是序列化后的 JSON 字符串。由于 JSON 规范的流行，除了低版本 IE 之外的各大浏览器都原生支持 JSON.stringify，服务端语言也都有处理 JSON 的函数，使用 JSON 不会遇上什么麻烦。

JSON 格式支持比键值对复杂得多的结构化数据，这一点也很有用。记得我几年前做一个项目时，需要提交的数据层次非常深，我就是把数据 JSON 序列化之后来提交的。不过当时我是把 JSON 字符串作为 val，仍然放在键值对里，以 x-www-form-urlencoded 方式提交。

Google 的 AngularJS 中的 Ajax 功能，默认就是提交 JSON 字符串。例如下面这段代码：

var data = {'title':'test', 'sub' : [1,2,3]}; $http.post(url, data).success(function(result) { ... }); 最终发送的请求是：

POST http://www.example.com HTTP/1.1 Content-Type: application/json;charset=utf-8

{"title":"test","sub":[1,2,3]} 这种方案，可以方便的提交复杂的结构化数据，特别适合 RESTful 的接口。各大抓包工具如 Chrome 自带的开发者工具、Firebug、Fiddler，都会以树形结构展示 JSON 数据，非常友好。但也有些服务端语言还没有支持这种方式，例如 php 就无法通过 $_POST 对象从上面的请求中获得内容。这时候，需要自己动手处理下：在请求头中 Content-Type 为 application/json 时，从 php://input 里获得原始输入流，再 json_decode 成对象。一些 php 框架已经开始这么做了。

当然 AngularJS 也可以配置为使用 x-www-form-urlencoded 方式提交数据。如有需要，可以参考这篇文章。

text/xml

我的博客之前提到过 XML-RPC（XML Remote Procedure Call）。它是一种使用 HTTP 作为传输协议，XML 作为编码方式的远程调用规范。典型的 XML-RPC 请求是这样的：

POST http://www.example.com HTTP/1.1 Content-Type: text/xml

<!--?xml version="1.0"?-->

<methodcall> <methodname>examples.getStateName</methodname> <params> <param> <value><i4>41</i4></value>

\`\`\`

</params>\`\`\`

</methodcall> XML-RPC 协议简单、功能够用，各种语言的实现都有。它的使用也很广泛，如 WordPress 的 XML-RPC Api，搜索引擎的 ping 服务等等。JavaScript 中，也有现成的库支持以这种方式进行数据交互，能很好的支持已有的 XML-RPC 服务。不过，我个人觉得 XML 结构还是过于臃肿，一般场景用 JSON 会更灵活方便。

fs.createWriteStream('test.png').pipe(req); I should also mention that this all works so simply because there's no form parsing overhead involved. request simply sends the file with no multipart/form-data wrappers:

POST / HTTP/1.1 host: localhost:5000 content-type: application/octet-stream Connection: keep-alive Transfer-Encoding: chunked

<image data>... This means that a browser could not post a file to this URL. If that's a need, look in to formidable, which does streaming parsing of request-entities.

Node.js是单线程、异步非阻塞IO，但凡对Node.js有点了解的人都会说出这是Node的最大特点之一。但是怎么理解这个特点，或者说怎么能搞说服大家抛弃传统的Web应用架构而使用Node的架构呢？我想理解这所谓的单线程、异步非阻塞IO就显得异常重要。

今天我们就看一个Node.js中一个非常重要的概念Stream来简单的理解一下上述的几个特点。Stream，翻译成中文只有简单的一个“流”字，如果没有信息系统或者计算机技术背景的人根本不会有什么概念，但是你只要你对任何一种现代编程语言有所了解，都会对输入输出的“流”这个概念会有自己的理解，比如Java中的java.io.InputStream和java.io.OutputStream。我个人理解这个Node.js中的Stream与这些IO流没有什么本质的不同，只不过在Node.js这个架构中更加体现出流的特点，那么流的特点是什么呢？

流最大的特点就是我可以在它没有完全出现的时候能够使用它已经出现的部分。比如想我这个年纪，都有在中小学时代值日为班级打白开水的经历，我们要为全班打一大桶水，开水桶很大本来就需要等待很长时间，而你又很苦逼，打水的水龙头不是很灵水“流”很小，而更郁闷的是你刚刚下了体育课本来想假公济私一把自己可以马上喝到水。这个时候有两个选择，第一个是等把整个开水壶打满后和全班同学同乐，另外一个选择就是先用自己的茶缸不等开会桶满了的情况下自己先乐。我想百分之八十的像我这样非二三道杠的人都会选择第二个方案。这种情况与我们现在信息系统中的数据IO的情况很像，大部分情况或者说大部分系统架构只能采取第一种方式等待所有的数据（水）都准备好了之后才能处理这些数据，而Node.js就不同可以在数据没有完全准备好或者是说没有完全出现的情况下就开始异步处理数据。而这种需要异步处理数据的情况在大数据、实时响应和大量网络IO情况下尤为显的重要。

下面就让我们看一个具体点的例子：

复制代码 var http = require('http'), fs = require('fs'); var server = http.createServer(function(req, res) { fs.readFile(\__dirname + '/data.txt', function(err, data) { res.end(data); }); }); server.listen(8000); 复制代码

这个Node.js应用很简单，估计所有学习过Node的人都做过这样的练习，可以说是Node的Hello World了。这段代码没有任何问题，你使用node可以正常的运行起来，使用浏览器或者其他的http客户端都可以正常的访问运行程序主机的8000端口读取主机上的data.txt文件。但是这种方式隐含了一个潜在的问题，node会把整个data.txt文件都缓存到内存中以便响应客户端的请求（request），随着客户端请求的增加内存的消耗将是非常惊人的，而且客户端需要等待很长传输时间才能得到结果。让我们再看一看另外一种方式：

var http = require('http'), fs = require('fs'); var server = http.createServer(function(req, res) { var stream = fs.createReadStream(\__dirname + '/data.txt'); stream.pipe(res); }); server.listen(8000);

这里面有一个非常大的变化就是使用createReadStream这个fs的方法创建了stream这个变量，并由这个变量的pip方法来响应客户端的请求。使用stream这个变量就可以让node读取data.txt一定量的时候就开始向客户端发送响应的内容，而无需服务缓存以及客户端的等待。

这样就使我们对Node.js的stream有了点感觉了。流（Stream）可以定义为一个连续的数据流，并且可以在数据流入（出）的时候对这些数据进行异步操作。在Node.js中流既可以是可读的，也可以是可写的。一个可读的stream还是一个EventEmitter对象，当每一次接收到一定量的数据都会触发data事件。我们上边的例子中使用pipe方法将一个文件的内容发送给一个HTTP客户端。当stream到达文件的末尾时会触发一个end的事件，表明不会再有任何的data事件发生了。同时一个可读stream可以暂停并且继续。可写stream是接收数据流，这种类型的stream也继承了EventEmitter对象，并且实现了两个方法：write()和end()。第一个方法在写入缓存数据的时候触发，而且如果数据写入准确则返回值true，如果缓存满了（这种情况下数据会再次发送）。方法end()就会在stream结束的时候触发。

根据Stream的特点我们来做一个Steam类型的应用，这是一个简单的上传文件的应用。首先我们将创建一个客户端使用可读的stream读取一个文件并且将其pipe到一个特定的目标，另外在pipe结束的时候使用一个可写的stream实现一个服务将上传的数据进行保存。

首先我们先看一下客户端的代码，注释中有比较详细的解释。

复制代码 // 引入http和文件系统模块 var http = require('http'), fs = require('fs');

// 定义http请求 var options = { host : 'localhost', port : 8000, path : '/', method : 'POST' }; var req = http.request(options, function(res) { console.log(res.statusCode); });

// 创建一个可读的stream读取文件并把读取的内容通过pipe发送给请求 var readStream = fs.ReadStream(\__dirname + "/in.txt"); readStream.pipe(req);

// 当stream停止读取的时候通过对request调用end()方法断开链接 readStream.on('close', function() { req.end(); console.log("I finished."); }); 复制代码

我们再看一下服务端的代码。

复制代码 // 与客户端一样引入http和文件系统两个模块，并且使用一个可写的stream var http = require('http'), fs = require('fs'); var writeStream = fs.createWriteStream(\__dirname + "/out.txt");

// 为了响应客户端上传文件的请求，我们创建了一个server，数据请求通过request对象进入 // 服务将使用stream并将缓存写入输出文件 var server = http.createServer(function(req, res) { req.on('data', function(data) { writeStream.write(data); }); req.on('end', function() { writeStream.end(); res.statusCode = 200; res.end("OK"); }); }); server.listen(8000); 复制代码

通过上面的列子，大家应该对Node.js的流（stream）会更有感觉了。后面的时间里如果有机会我将继续深入的探讨一下stream的使用，特别是在请求的数据量巨大时，对数据分页或者分批处理的方法。

本文参考了以下内容：

http://jspro.com/nodejs/introduction-to-streams/

http://nodejs.org/api/stream.html

多线程
------

Node.js软肋之CPU密集型任务 http://blog.csdn.net/fbysss/article/details/24288629

http://news.chinaunix.net/opensource/2014/0407/3136341.shtml

原版本 https://github.com/xk/node-threads-a-gogo 中国人修改的版本 https://github.com/DoubleSpout/node-threads-a-gogo2

简单的多线程处理 https://github.com/lloyd/node-compute-cluster

process.nextTick()

在Node 0.8（及之前）的版本中，process.nextTick()中指定的函数通常会比其它任何I/O先被调用，然而并不能保证一定会这样。但很多开发人员（包括Node.js的内部团队）开始用process.nextTick实现“稍后再做，但要在任何真正的I/O执行之前”。然而在负载比较大时，因为I/O很多，可能导致nextTick被别的东西占先，从而引发一些很怪异的错误。所以在v.0.10之后，netxtTick的语义被改了，那些函数变成在每次从C++进入JavaScript的调用之后马上运行。也就是说，如果你的JavaScript代码调用了process.nextTick，只要代码即将运行完成时，在回到event loop之前那个回调就会被调用。

然而还有很多程序用递归调用process.nextTick，以免长期运行的任务抢占了I/O event loop。为了不把这些程序都搞垮，Node现在会输出一个废弃警告，提示你在这些任务中使用setImmediate。不过对我们这个例子来说，这两个版本之间的差异没有影响。

在Node.js中控制进程的API。

child_process.fork() Node.js中有管理子进程的child_process模块，可以用fork()方法创建新的子进程实例。这个子进程是用IPC通道添加的，可以通过.send(message)函数发送消息给它，用.on('message')监听它发送的消息。而在子进程中，可以用process.on('message',callback)监听父进程发送的消息，并通过process.send(message)向父进程发送消息。接下来我们fork()一个子进程，把计算斐波那契数列的任务交给它，这需要两个文件。

代码清单3. 主进程文件forkParent.js

var cp = require('child_process');

var child = cp.fork(\__dirname+'/forkChild.js');

child.on('message', function(m) { process.stdout.write(m.result.toString()); });

(function fiboLoop () { child.send({v:40}); process.nextTick(fiboLoop); })();

(function spinForever () { process.stdout.write("."); process.nextTick(spinForever); })(); 在主进程中用cp.fork()创建了子进程child，并用child.on('message', callback)监听子进程发来的消息，输出计算结果。现在的fiboLoop()也不再执行具体的计算操作，只是用child.send({v:40});不停的发消息给子进程。

代码清单4. 计算斐波那契数列的子进程文件forkChild.js

function fibo (n) { return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1; }

process.on('message', function(m) { process.send({ result: fibo(m.v) }); });

cluster

使用cluster模块可以充分利用多核CPU资源，在Node.js的0.6版被纳入核心模块，但目前（V0.10.26）仍处于实验状态。借助cluster模块，Node.js程序可以同时在不同的内核上运行多个”工人进程“，每个”工人进程“做的都是相同的事情，并且可以接受来在同一个TCP/IP端口的请求。相对于在Ngnix或Apache后面启动几个Node.js程序实例而言，cluster用起来更加简单便捷。虽然cluster模块繁衍线程实际上用的也是child_process.fork，但它对资源的管理要比我们自己直接用child_process.fork管理得更好。下面是用cluster实现的代码：

代码清单5. 用cluster繁衍工人进程计算斐波那契数列

function fibo (n) { return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1; }

var cluster= require('cluster');

if (cluster.isMaster) { cluster.fork(); } else { (function fiboLoop () { process.stdout.write(fibo(40).toString()); process.nextTick(fiboLoop); })(); }

(function spinForever () { process.stdout.write("."); process.nextTick(spinForever); })(); 代码很简单，如果是主进程，就fork()工人进程，这里也可以用循环遍历，根据CPU内核的个数繁衍相应数量甚至更多的进程；如果是工人进程，就执行fiboLoop。你可以自行用top查看一下资源占用情况，你会发现这种方式用得资源比上面那种方式要少。

虽然cluster模块可以充分利用资源，用起来也比较简单，但它只是解决了负载分配的问题。但其实做得也不是特别好，在0.10版本之前，cluster把负载分配的工作交给了操作系统，然而实践证明，最终负载都落在了两三个进程上，分配并不均衡。所以在0.12版中，cluster改用round-robin方式分配负载。详情请参见这里。

Fibers 和 Threads。 Fibers 又称纤程，可以理解为协同程序，类似py和lua都有这样的模型。使用Fibers可以避免对资源的互抢，减少cpu和内存的消耗，但是Fibers并不能够真正的并行执行，同一时刻只有一个Fibers在执行，如果在其中一个Fibers中执行过多的cpu操作或者写了个死循环，则整个主程序将卡死住。node中的异步事件循环模型就有点象这个。

Threads 又称线程，他可以在同一时刻并行的执行，他们共享主进程的内存，在其中某一时刻某一个threads锁死了，是不会影响主线程以及其他线程的执行。但是为了实现这个模型，我们不得不消耗更多的内存和cpu为线程切换的开销，同时也存在可能多个线程对同一内存单元进行读写而造成程序崩溃的问题。

高性能nodejs静态文件模块ifile前瞻  
http://snoopyxdy.blog.163.com/blog/static/60117440201351491216850/

2013-06-14 22:26:28| 分类： node | 标签：ifile nodejs静态文件 nodejsstatic node静态文件服务器 |举报|字号 订阅 前不久刚写了一个iroute的nodejs路由模块，可以用于http/https的框架或者应用中，当然也可以轻松整合到express框架里，将比express自带的原生路由在10000并发，1000个路由的压力下响应速度提升4-5倍。 详情请参阅：http://snoopyxdy.blog.163.com/blog/static/6011744020135504449275/

跨平台模块tagg2，让nodejs多线程支持  
http://snoopyxdy.blog.163.com/blog/static/6011744020134186614267/

推荐OpenResty — Nginx全能插件版 2012-05-07 08:59:15

csv 处理 https://github.com/wdavidw/node-csv

有需要从前端操作服务器执行shell命令的需求

建立一个process.js文件

var process = require('child_process'); //直接调用命令 exports.createDir = function (){process.exec('D: && cd testweb && md mydir', function (error, stdout, stderr) { if (error !== null) { console.log('exec error: ' + error); } }); } //调用执行文件 exports.openApp = function(){ process.execFile('D:/testweb/aaa.bat',null,{cwd:'D:/'}, function (error,stdout,stderr) { if (error !== null) { console.log('exec error: ' + error); } }); } 这里的命令是写死的，如果需要动态调用就把命令写成批处理文件（linux写shell脚本）

也可以使用process.exec('test.bat',...) 和 process.exec('sh test',...)执行文件

express获取参数有三种方法：官网介绍如下

Checks route params (req.params), ex: /user/:id Checks query string params (req.query), ex: ?id=12 Checks urlencoded body params (req.body), ex: id= 1、例如：127.0.0.1:3000/index，这种情况下，我们为了得到index，我们可以通过使用req.params得到，通过这种方法我们就可以很好的处理Node中的路由处理问题，同时利用这点可以非常方便的实现MVC模式； 2、例如：127.0.0.1:3000/index?id=12，这种情况下，这种方式是获取客户端get方式传递过来的值，通过使用req.query.id就可以获得，类似于PHP的get方法；

3、例如：127.0.0.1：300/index，然后post了一个id=2的值，这种方式是获取客户端post过来的数据，可以通过req.body.id获取，类似于PHP的post方法；

Edge.js：让.NET和Node.js代码比翼齐飞 http://www.cnblogs.com/shanyou/p/3325249.html 通过Edge.js项目，你可以在一个进程中同时运行Node.js和.NET代码。在本文中，我将会论述这个项目背后的动机，并描述Edge.js提供的基本机制。随后将探讨一些Edge.js应用场景，它在这些场景中可以为你开发Node.js程序提供帮助。

HTTP协议之multipart/form-data请求分析

普通的form上传字符串如：txt1=hello&txt2=world，非常简单，浏览器会对内容进行url编码， 服务器端需进行解码！ 内容类型为： Content-Type:application/x-www-form-urlencoded 这种方式只能传递普通字符串参数，当然也可以强行 使用 Content-Type: application/octet-stream，传递 二进制数据， 服务器端自行解析 请求体即可。 该方式只能传送一个包体，包体相关内容要么在http 头中增加，要么包含在包体中，扩展性不好！ multipart/form-data是普通 form post的扩展，使用它可实现类似普通 form上传 多个字符参数一样，传递多个字符参数或二进制数据！ 多段内容，使用边界分割即可！ 每段内容，可使用如下扩展参数进行数据说明 Content-Disposition: form-data;name="pic"; filename="photo.jpg" Content-Type: application/octet-stream Content-Transfer-Encoding: binary name 为 input组件的 name，一般也命名为 fildname，如果是文件组件，则会由 filename字段， 不同浏览器 filename可能不同，有的 带路径，有的不带路径！

二进制数据，可以无需编码直接放入分割区域内，后台服务器自行解析， 通过名称标识，可传送多个二进制文件，后台通过名称获取不同的二进制数据！

根据http/1.1 rfc 2616的协议规定，我们的请求方式只有OPTIONS、GET、HEAD、POST、PUT、DELETE、TRACE等，那为为何我们还会有multipart/form-data请求之说呢？这就要从头来说了。

http协议大家都知道是规定了以ASCII码传输，建立在tcp、ip协议之上的应用层规范，规范内容把http请求分为3个部门：状态行，请求头，请求体。所有的方法、实现都是围绕如何运用和组织这三部分来完成的。换句话来说就是万变不离其中，只要我们了解了http请求的组成部分后，自然就可以应变任何实际工作中的需求和问题了。

关于状态行，请求头，请求体等三部分的具体内容，大家可以参考官方的协议文档http://www.faqs.org/rfcs/rfc2616.html，这里主要分析multipart/form-data请求具体是怎么一回事。

既然http协议本身的原始方法不支持multipart/form-data请求，那这个请求自然就是由这些原始的方法演变而来的，具体如何演变且看下文：

1、multipart/form-data的基础方法是post，也就是说是由post方法来组合实现的

2、multipart/form-data与post方法的不同之处：请求头，请求体。

3、multipart/form-data的请求头必须包含一个特殊的头信息：Content-Type，且其值也必须规定为multipart/form-data，同时还需要规定一个内容分割符用于分割请求体中的多个post的内容，如文件内容和文本内容自然需要分割开来，不然接收方就无法正常解析和还原这个文件了。具体的头信息如下：

[html] view plaincopyprint?Content-Type: multipart/form-data; boundary=${bound}

Content-Type: multipart/form-data; boundary=${bound} //其中${bound} 是一个占位符，代表我们规定的分割符，可以自己任意规定，但为了避免和正常文本重复了，尽量要使用复杂一点的内容。如：--------------------56423498738365

4、multipart/form-data的请求体也是一个字符串，不过和post的请求体不同的是它的构造方式，post是简单的name=value值连接，而multipart/form-data则是添加了分隔符等内容的构造体。具体格式如下:

[html] view plaincopyprint?--${bound}  
Content-Disposition: form-data; name="Filename"

HTTP.pdf  
--${bound}  
Content-Disposition: form-data; name="file000"; filename="HTTP协议详解.pdf"  
Content-Type: application/octet-stream

%PDF-1.5  
file content  
%%EOF

--${bound}  
Content-Disposition: form-data; name="Upload"

Submit Query  
--${bound}--

--${bound} Content-Disposition: form-data; name="Filename"

HTTP.pdf --${bound} Content-Disposition: form-data; name="file000"; filename="HTTP协议详解.pdf" Content-Type: application/octet-stream

%PDF-1.5 file content %%EOF

--${bound} Content-Disposition: form-data; name="Upload"

Submit Query --${bound}--其中${bound}为之前头信息中的分割符，如果头信息中规定为123，那么这里也要为123,；可以很容易看出，这个请求体是多个相同的部分组成的：每一个部分都是以--加分隔符开始的，然后是该部分内容的描述信息，然后一个回车，然后是描述信息的具体内容；如果传送的内容是一个文件的话，那么还会包含文件名信息，以及文件内容的类型。上面的第二个小部分其实是一个文件体的结构，最后会以--分割符--结尾，表示请求体结束。

综上，可以知道要发送一个multipart/form-data的请求，其实任何支持post请求的工具或语言都可以支持，只是自己要稍微包装一下便可。

POST上传文件 最早的HTTP POST是不支持文件上传的，给编程开发带来很多问题。但是在1995年，ietf出台了rfc1867,也就是《RFC 1867 -Form-based File Upload in HTML》，用以支持文件上传。所以Content-Type的类型扩充了multipart/form-data用以支持向服务器发送二进制数据。因此发送post请求时候，表单<form>属性enctype共有二个值可选，这个属性管理的是表单的MIME编码：

①application/x-www-form-urlencoded(默认值) ②multipart/form-data 其实form表单在你不写enctype属性时，也默认为其添加了enctype属性值，默认值是enctype="application/x- www-form-urlencoded".

通过form表单提交文件操作如下：

<form method="post"action="http://w.sohu.com/t2/upload.do" enctype=”multipart/form-data”>

         <inputtype="text" name="desc">

         <inputtype="file" name="pic">

 </form>

浏览器将会发送以下数据：

POST /t2/upload.do HTTP/1.1

User-Agent: SOHUWapRebot

Accept-Language: zh-cn,zh;q=0.5

Accept-Charset: GBK,utf-8;q=0.7,*;q=0.7

Connection: keep-alive

Content-Length: 60408

Content-Type:multipart/form-data; boundary=ZnGpDtePMx0KrHh_G0X99Yef9r8JZsRJSXC

Host: w.sohu.com

--ZnGpDtePMx0KrHh_G0X99Yef9r8JZsRJSXC

Content-Disposition: form-data;name="desc"

Content-Type: text/plain; charset=UTF-8

Content-Transfer-Encoding: 8bit

[......][......][......][......]...........................

--ZnGpDtePMx0KrHh_G0X99Yef9r8JZsRJSXC

Content-Disposition: form-data;name="pic"; filename="photo.jpg"

Content-Type: application/octet-stream

Content-Transfer-Encoding: binary

[图片二进制数据]

--ZnGpDtePMx0KrHh_G0X99Yef9r8JZsRJSXC--

我们来分析下数据，第一个空行之前自然还是HTTP header，之后则是Entity，而此时的Entity也比之前要复杂一些。根据RFC 1867定义，我们需要选择一段数据作为“分割边界”（ boundary属性），这个“边界数据”不能在内容其他地方出现，一般来说使用一段从概率上说“几乎不可能”的数据即可。 不同浏览器的实现不同，例如火狐某次post的 boundary=---------------------------32404670520626 ， opera为boundary=----------E4SgDZXhJMgNE8jpwNdOAX ，每次post浏览器都会生成一个随机的30-40位长度的随机字符串，浏览器一般不会遍历这次post的所有数据找到一个不可能出现在数据中的字符串，这样代价太大了。一般都是随机生成，如果你遇见boundary值和post的内容一样，那样的话这次上传肯定失败，不过我建议你去买彩票，你太幸运了。Rfc1867这样说明{A boundary is selected that does not occur in any of the data. (This selection is sometimes done probabilisticly.)}。

选择了这个边界之后，浏览器便把它放在Content-Type 里面传递给服务器，服务器根据此边界解析数据。下面的数据便根据boundary划分段，每一段便是一项数据。(每个field被分成小部分，而且包含一个value是"form-data"的"Content-Disposition"的头部；一个"name"属性对应field的ID,等等，文件的话包括一个filename)

IE和Chrome在filename的选择策略上有所不同，前者是文件的完整路径，而后者则仅仅是文件名。 数据内容以两条横线结尾，并同样以一个换行结束。在网络协议中一般都以连续的CR、LF（即\r、\n，或0x0D、Ox0A）字符作为换行，这与Windows的标准一致。如果您使用其他操作系统，则需要考虑它们的换行符。 另外Content-length 指的是所用数据的长度。

https://github.com/tjanczuk/edge 调用 .net 实现多任务

c# 5 vs 2012, net framework 4.5 异步编程，有了新关键字async和await，编写异步代码和同步时已经很接近了。

### 80 端口被系统占用解决办法

停掉IIS的命令:iisreset -stop

重新启动IIS的命令:iisreset -restart World Wide Web Publishing Service netstat -ano 查看 端口占用 占用80端口程序：迅雷，BT等下载软件。\**音乐等。 端口说明：80端口是为HTTP（HyperText Transport Protocol，超文本传输协议）开放的，这是上网冲浪使用最多的协议，主要用于在WWW（World Wide Web，万维网）服务上传输信息的协议。 命令格式：Netstat －a －e －n －o －s 　　－a表示显示所有活动的TCP连接以及计算机监听的TCP和UDP端口。 　　－e表示显示以太网发送和接收的字节数、数据包数等。 　　－n表示只以数字形式显示所有活动的TCP连接的地址和端口号。 　　－o表示显示活动的TCP连接并包括每个连接的进程ID（PID）。 　　－s表示按协议显示各种连接的统计信息，包括端口号。 PID（进程控制符）英文全称为Process Identifier，它也属于电工电子类技术术语。 　　PID就是各进程的身份标识,程序一运行系统就会自动分配给进程一个独一无二的PID。进程中止后PID被系统回收，可能会被继续分配给新运行的程序。

80端口 可以看到pid 4 的被NT kernel & System 占用 该进程是Http.sys。
它是http API的驱动组件，Http栈服务器。如果该端口被Http.sys占用，说明一些正在使用http.sys的应用程序在运行。 这就是阻止Apache运行的原因，因为Http.sys占用着80端口。 我们提供了一种应用程序的机制来帮助控制端口共享，但是我需要调查导致你遇到这种困难的是什么特殊应用程序。 如果你能提供给我们“netsh http show servicestate”这条命令的输出结果，我就能找出是哪个应用程序在使用Http.sys。

然后通过 pid 在任务管理器中查看是哪个任务，比如 Sql Server 的Report server 会自动占用 80端口，  
将 该 服务关闭，改为禁用，就好了！

如果不想使用 iis，可以禁用 http，设置如下：  
一种方法（不推荐）： 打开RegEdit: 找到HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\HTTP 找到一个DWORD值Start，将3改为4或0 重启电脑， System进程将不会占用80端口


另外一种方法（推荐）：

停用 World Wide Web Publishing Service 服务，自动改为 手动！

1.	net stop http Web management service Print spooler Web 部署代理服务 IIS Admin Service  
	注意：sql server reporting services 也会占用 80端口！

	在查看一下netstat -ano，80端口被释放

2.	Sc config http start= disabled 禁止 http 自动启动！

原文：

some application is running which is using http.sys to listen on port 80. This is preventing Apache from using port 80. We offer a mechanism for applications to help control port sharing but I’ll need to look into the specific application that’s causing you this conflict. If you can give us the output of following command “netsh http show servicestate”, then it will allow me to find out which application is using http.sys. Since you have disabled http.sys, please follow these steps listed below before running the command:

1.	sc config http start= demand
2.	Reboot
3.	Run the command (netsh http show servicestate) as administrator

After you have run this command, you can disable http.sys as follows:

1.	net stop http
2.	Sc config http start= disabled
