
<meta http-equiv="content-type" content="text/html; charset=UTF-8">

<link href="css/markdown.css" rel="stylesheet" />

<link href="css/prettify.css" rel="stylesheet" />

<script src="http://apps.bdimg.com/libs/jquery/2.0.3/jquery.min.js"></script>

<script src="js/prettify.js"></script>  

KOA
===

>所有系统所必须的服务端框架，为手机、网页等前端提高接口、网页服务。  
>深受全世界知名互联网公司青睐，如 淘宝、Uber等。  
>类似express的框架，由 Express 同一作者 Tj创立，致力于更小、更健壮、更富有表现力的 Web 框架。
支持async await es7语法，可以免除重复繁琐的回调函数嵌套，并极大地提升常用错误处理效率。
Koa 不在内核方法中绑定任何中间件，它仅仅提供了一个轻量优雅的函数库，使得编写 Web 应用变得得心应手。

>本文以KOA为基础，讲解所有相关的后台技术，掌握这些技术以后，就能成为后端大牛！  
>前端工程师也可以下载服务端框架，在自己计算机上部署一个服务端，方便调试前端手机、网页，提高工作效率。有时间也可以了解一下后端服务系统，一不小心变成全栈工程师，就不得了啦！

## 目录

- [网站](#网站)
- [更多资源](#更多资源)
- [开始使用](#开始使用)
- [项目配置](#项目配置)
- [项目配置文件](#项目配置文件)
- [示例代码](#示例代码)
- [静态文件服务](#静态文件服务)
- [路由](#路由)
  - [创建路由](#创建路由)
  - [示例代码](#示例代码)
- [jade模板](#jade模板)
- [参数设置](#参数设置)
  - [参数存放](#参数存放)
  - [config/app.js 参数文件举例](#configappjs-参数文件举例)
  - [配置文件使用示例](#配置文件使用示例)
- [用户逻辑层封装](#用户逻辑层封装)
- [MongoDB 数据库](#mongodb-数据库)
  - [model 中存放数据模型](#model-中存放数据模型)
- [日志](#日志)
- [部署运行](#部署运行)
  - [无中断重启](#无中断重启)
  - [级联概念](#级联概念)
  - [代码示例：](#代码示例)
  - [示例解析](#示例解析)
  - [级联调用形象示意图](#级联调用形象示意图)
- [代码解析](#代码解析)
  - [app.listen(...)](#applisten)
  - [app.callback()](#appcallback)
  - [app.use(function)](#appusefunction)
  - [app.keys=](#appkeys)
- [中间件](#中间件)

<div id='网站'/>
## 网站
**官方网站**: http://koajs.com  
**GitHub**：https://github.com/koajs/koa
**中文文档**：http://koajs.cn/  
**KOA实战**:http://book.apebook.org/minghe/koa-action/index.html
**示例**: https://github.com/koajs/examples

<div id='更多资源'/>
## 更多资源

-	[接口文档](https://github.com/koajs/koa/tree/master/docs/api/index.md)
-	[官方模块列表](https://koajs.github.io/badgeboard)
-	[中间件列表](https://github.com/koajs/koa/wiki)
-	[Wiki](https://github.com/koajs/koa/wiki)
-	[Reddit Community](http://reddit.com/r/koajs)
-	[邮件列表](https://groups.google.com/forum/#!forum/koajs)
-	[使用指南](https://github.com/koajs/koa/tree/master/docs/guide.md)
-	[FAQ](https://github.com/koajs/koa/tree/master/docs/faq.md)
-	[Kick-Off-Koa](https://github.com/koajs/kick-off-koa) 
  An intro to koa via a set of self-guided workshops.
-	[Workshop](https://github.com/koajs/workshop) 
  A workshop to learn the basics of koa, Express' spiritual successor.
-	[Introduction Screencast](http://knowthen.com/episode-3-koajs-quickstart-guide/)
   An introduction to installing and getting started with Koa

<div id='开始使用'/>
## 开始使用

- 安装git，[git安装请参见 git笔记](https://github.com/nydl/devnote/blob/master/git.md)
  一般安默认选项提示安装，最后选择路径时，选择最后一个。  
  安装完毕 命令行中 输入 `git --version` 可以看到 安装的 版本，如果看不到，说明安装有问题！  
  如果已安装，无需重复安装。
- 克隆 koastart项目
  进入命令行（windows系统win+r键），切换到 d 盘，在d盘创建一个 prj 目录，用了存放项目文件，操作示意：
    
  ```js
  d:  
  cd /  
  mkdir prj   
  cd prj   
  // 将项目克隆到 d盘 prj目录下的 koastart 路径！
  clone https://github.com/nydl/koastart.git koastart
  
  ```
- 安装最新的 node.js，如果已经安装，跳过！
  测试：在命令行下面 输入 `node -v`，如果能看到node的版本，说明安装正确。  
  node 版本更新非常快，2015年5月18日的最新版本是 6.10，尽量使用最新的稳定版本。
- npm镜像：npm 修改npm服务器为淘宝镜像服务器，加快安装速度，这个只需执行一次，之前执行过了，跳过！    
  - npm config set registry https://registry.npm.taobao.org  
  - npm config set disturl https://npm.taobao.org/dist
- 安装第三方库：`npm i`，注意，一定要在 koastart 这个路径执行！！！
- 编译代码：`npm run build`，注意，一定要在 koastart这个路径执行！！！
  该命令生成 在 lib 目录下生成可执行代码！
- 运行文件：`node lib/app`，提示 koa 服务运行，服务端口3000，说明运行成功！
  注意，一定要在 koastart 这个路径执行！！！
- 通过浏览器访问服务：http://127.0.0.1:3000 或 http://127.0.0.1:3000/koa.html，  
  如果能看到内容，恭喜你，koa web服务搭建成功，可以开始你的成长之旅！


## 手机访问自己的服务端

- 相当于将你的计算机作为服务器，在开发、调试手机、微信页面时，非常方便，不用专门的服务器
- 确保手机与计算机在同一网络（如：连接同一个无线网）
- windows 需使用 windows + r键打开命令行，输入 `ipconfig` 指令查看本机ip地址
- mac 苹果系统需使用 `ifconfig | grep inet` 指令获得本机地址
- 在手机浏览器或微信中访问你的计算机，如： `http://xxx.xxx.xxx.xxx:3000`，xxx部分就是前面查到的计算机ip地址
- 把 html文件放入 public目录，访问时，可指定文件，如： `http://xxx.xxx.xxx.xxx:3000/test.html`
- 如果使用了模板，则需要后台修改相关代码，使用模板对应的引擎，使用模板与数据结合，生成页面。

## 项目配置

- koa 2.0 需要使用 Babel，需要安装 Babel转换器
  - 使用了es7的语法，如 async、await
- 强烈推荐使用 web storm 编辑项目
- web storm 设置：
  - js 版本：JSX Harmoney，最大限度支持新语法
  - ESLint：Java Script 的 代码质量工具中开启 ESLint,提供代码编写规范检查
    eslint 库路径设置，如：/Users/way/prj/koa/koastart/node_modules/eslint
  - Babel自动转换：使用 js 6后，webstorm会提示 一个 自动转换为 5 的 插件：
    File watcher 'Babel' is available for thie file. Description:'Transpiles ECMAScript 6 code to ECMAScript 5'
    这个插件在你修改文件时，会自动将es6、es7语法文件转换为es5或es6的文件。  
    建议不要使用，会影响编码效率，学习、测试可以使用，涉及多个文件引用时，引用文件如果采用了新语法，会报错。
    也可以通过tools手动添加。
-	js编译：`npm run build`，npm 会在项目的 package.json 文件中寻找 scripts 区域中的命令。  
	其实npm test和npm start是npm run test和npm run start的简写。事实上，你可以使用npm run来运行scripts里的任何条目。  
	使用npm run的方便之处在于，npm会自动把node_modules/.bin加入$PATH，这样你可以直接运行依赖程序和开发依赖程序，不用全局安装了。 只要npm上的包提供命令行接口，你就可以直接使用它们，方便吧。
- webstorm 调试：
  - 添加调试文件时，使用 babel-node 代替 标准 node
    比如 osx 上：
    /Users/way/.nvm/versions/node/v5.10.1/bin/node
    替换为：
    /Users/way/.nvm/versions/node/v5.10.1/bin/babel-node
  - 编译时带"-s"生成 Source Maps，运行js时，可对编译前的代码进行调试！
    "build": "node_modules/.bin/babel src -d lib -s",
- 如果浏览器提示错误，在浏览器上先连一下调试端口，然后打开web端口，即可触发调试
  
## 项目配置文件

>所有项目配置文件已经在 clone时自动下载到你的计算机，无需另外设置，列在这里，有兴趣的同学可以看看。

- package.json 项目配置参考文件：
  ```js
  {
    "name": "koastart",
    "version": "0.1.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "lint": "node_modules/.bin/eslint ./src",
      "test": "node_modules/.bin/eslint ./src",
      "build": "node_modules/.bin/babel src -d lib",
      "prepublish": "node_modules/.bin/babel src -d lib"
    },
    "author": "",
    "license": "MIT",
    "private": true,
    "dependencies": {
      "filesize-parser": "^1.3.1",
      "fs-promise": "^0.5.0",
      "jsrsasign": "^5.0.11",
      "koa": "^2.0.0",
      "koa-bodyparser": "^3.0.0",
      "koa-router": "^7.0.0",
      "koa-send": "^3.2.0",
      "mysql": "^2.10.2",
      "nodemailer": "^2.3.0",
      "progress": "^1.1.8",
      "qiniu": "^6.1.9",
      "read": "^1.0.7",
      "request": "^2.69.0",
      "sequelize": "^3.19.3",
      "uid-safe": "^2.0.0",
      "umzug": "^1.9.0"
    },
    "devDependencies": {
      "babel-cli": "^6.8.0",
      "babel-eslint": "^6.0.4",
      "babel-plugin-syntax-async-functions": "^6.5.0",
      "babel-plugin-syntax-object-rest-spread": "^6.5.0",
      "babel-plugin-transform-async-to-generator": "^6.3.13",
      "babel-plugin-transform-es2015-arrow-functions": "^6.5.2",
      "babel-plugin-transform-es2015-destructuring": "^6.3.15",
      "babel-plugin-transform-es2015-modules-commonjs": "^6.3.16",
      "babel-plugin-transform-es2015-parameters": "^6.5.0",
      "babel-plugin-transform-es2015-spread": "^6.5.2",
      "babel-plugin-transform-object-rest-spread": "^6.5.0",
      "babel-plugin-transform-strict-mode": "^6.5.2",
      "babel-register": "^6.3.13",
      "eslint": "^2.9.0",
      "eslint-config-airbnb": "^9.0.1",
      "eslint-plugin-import": "^1.8.0",
      "eslint-plugin-jsx-a11y": "^1.2.0",
      "eslint-plugin-react": "^5.1.1",
      "sequelize-cli": "^2.3.1"
    }
  }
  
  ```
- .babelrc 转换配置文件
  ``` js
  {
    "plugins": [
      "syntax-object-rest-spread",
      "syntax-async-functions",
      "transform-es2015-arrow-functions",
      "transform-async-to-generator",
      "transform-es2015-modules-commonjs",
      "transform-es2015-destructuring",
      "transform-es2015-spread",
      "transform-object-rest-spread",
      "transform-es2015-parameters",
      "transform-strict-mode"
    ]
  }

  ```
- .eslintrc 转换配置文件
  ``` js
  {
    "extends": "eslint-config-airbnb/base",
    "parser": "babel-eslint",
    "env": {
      "browser": true,
      "node": true,
      "mocha": true
    },
    "rules": {
      // Disable for console/alert
      "no-console": 0,
      "no-alert": 0,

      "indent": [2, 2, {"SwitchCase": 1}]
    },
    "plugins": [
      "import"
    ],
    "settings": {
      "import/parser": "babel-eslint",
      "import/resolve": {
        "moduleDirectory": ["node_modules", "src"]
      }
    },
    "globals": {
      "__DEV__": true,
      "__OPTION__": true
    }
  }
  ```

<div id='示例代码'/>  
## 示例代码

- Hello World
  ```js
  var koa = require('koa');  
  var app = koa();

  app.use(ctx=>  
    ctx.body = 'Hello World';
  );

  app.listen(3000);  
  ```
- 插入中间件并等待后续执行
  ```js
  var koa = require('koa');
  var app = koa();

  // logger 中间件
  app.use(async (ctx,next)=>{
    const start = new Date();
    await next();
    const ms = new Date - start;
    console.log(`logger: ${ctx.method} ${ctx.url} - ${ms}ms`);
  });

  // response
  app.use(ctx =>{
    ctx.body = 'Hello World！';
  });

  app.listen(3000);
  ```
  
<div id='日志'/> 
## 日志

>系统内置的 console.log、console.warn、console.error在简单程序时，可以输出控制台，但是在大型系统设计时，console就不够用，需要更强大的日志功能，比如常用的安日期存储日志、分离错误日志、专用日志服务器、可配置的日志级别，在调试时输出所有日志，投产后只输出错误日志等。

常用日志目前有两种，使用的人都非常多：

- [winston](https://github.com/winstonjs/winston)
  5000多 star，人气最高，功能强大，使用相对稍复杂
- [log4js](https://github.com/nomiddlename/log4js-node)
  1400多 star，使用简单，一般项目足够使用。  
  安装：`npm install log4js -S`
- [log4js各种示例](https://github.com/nomiddlename/log4js-node/tree/master/examples)
- [log4js完整示例](https://github.com/nomiddlename/log4js-example)

### log4js 功能

- 彩色控制台输出 stdout or stderr
- 替代了 console.log functions (optional)
- 基于大小的文件滚动输出
- 邮件输出
- GELF 输出
- hook.io 输出
- Loggly appender
- Logstash UDP 网络输出
- 多处理器输出 (多工作进程时有用)
- connect/express 服务的标准日志中间件
- 可设置日志消息的模板
- 针对不同的日志类别，可设置不同的日志级别 (比如一部分日志级别为 DEBUG, 另外的只输出 ERRORS)

## log4js 使用

- 跟踪：logger.trace('Entering cheese testing');
  一般用于详细跟踪执行过程，投产需关闭
- 调试：logger.debug('Got cheese.');
  特定部分的调试信息，投产需关闭  
- 信息：logger.info('Cheese is Gouda.');
  普通日志信息，提示作用，投产可关闭可打开
- 告警：logger.warn('Cheese is quite smelly.');
  告警信息，投产需打开
- 错误：logger.error('Cheese is too ripe!');
  错误信息，投产需打开
- 致命错误：logger.fatal('Cheese was breeding ground for listeria.');
  会引起崩溃的严重错误，投产需打开
  
## log4js.json 配置文件

- appenders 是日志输出数组，可配置多个日志输出
- type 是输出类型，有控制台、文件、日期文件等
- pattern 日期后缀模板
- replaceConsole 替换cosole输出
- 加入 console 会将 console.log 记录到日志文件
- category 类别，实际上就是名称，一般可以不设置。
  如果设置了，需要`const log = log4js.getLogger(category);`使用。  
  如果没有设置，为全局输出，对所有类别均适用，比如 `const log = log4js.getLogger('modualname');`，没有找到匹配的名称，则自动匹配没有设置 category的输出！
- level 等级：ALL TRACE DEBUG INFO WARN ERROR FATAL OFF，控制输出级别，设置 ERROR，只输出 ERROR、FATAL、
- "[all]" 针对所有没有设置 category 的全局输出的级别代称。

### log4js.json配置文件举例：

```js
{
  "appenders": [
    {
      "type":"console"
    },
    {
      "type": "file",
      "filename": "log/all.log",
      "maxLogSize": 104857600,
      "numBackups": 3
    },
    {
      "type": "logLevelFilter",
      "level": "ERROR",
      "appender": {
        "type": "file",
        "filename": "log/err.log",
        "maxLogSize": 104857600,
        "numBackups": 3
      }
    },
    {
      "type": "logLevelFilter",
      "level": "ERROR",
      "appender": {
        "type": "dateFile",
        "filename": "log/err/err",
        "alwaysIncludePattern": true,
        "pattern": "-yyMMdd.log"
      }
    },
    {
      "type": "dateFile",
      "filename": "log/hour/hour",
      "alwaysIncludePattern": true,
      "pattern": "-yyMMddhh.log"
    },
    {
      "category": "http",
      "type": "dateFile",
      "filename": "log/http/http",
      "alwaysIncludePattern": true,
      "pattern": "-yyMMdd.log"
    }
  ],

  "replaceConsole": true,
  "levelOpt": "ALL TRACE DEBUG INFO WARN ERROR FATAL OFF",
  "levels": {
    "http": "ALL",
    "[all]": "INFO"
  }
}

```

### 实际代码

```js
// 引用 第三方日志库，需安装好
import log4js from 'log4js';
/*
 * 创建日志目录
 */
try {
  if (!fs.existsSync('./log'))
    fs.mkdirSync('./log');

  if (!fs.existsSync('./log/err'))
    fs.mkdirSync('./log/err');

  if (!fs.existsSync('./log/hour'))
    fs.mkdirSync('./log/hour');

  if (!fs.existsSync('./log/http'))
    fs.mkdirSync('./log/http');
} catch (e) {
  console.error('Create log directory exp: %s', e.message);
}

// 获得日志输出，找不到index，则匹配所有没有命名的全局输出
const log = log4js.getLogger('index');
// 日志配置加载，每隔 300秒检查设置变更！
log4js.configure('./config/log4js.json', { reloadSecs: 300 });

// 测试
console.log('start log...'); // 等同于 info
log.trace('Entering cheese testing');
log.debug('Got cheese.');
log.info('Cheese is Gouda.');
log.warn('Cheese is quite smelly.');
log.error('Cheese is too ripe!');
log.fatal('Cheese was breeding ground for listeria.');

```

### 分离 app 中的日志到 index

app保留中间件部分，启动服务及日志部分放入index文件。  
原来的运行 `node lib/app` 需改为 `node lib/`，node默认会找该目录下的 index.js文件。

<div id='静态文件服务'/>  
## 静态文件服务

- [koa-send](https://github.com/koajs/send) tj参与的文件发送基本库
  支持自动压缩等，代码不多，功能强大
- [koa-static](https://github.com/koajs/static) tj参与的文件服务中间件
- [send](https://github.com/pillarjs/send) tj参与的早期文件发送基本库
  代码很多，express 使用的基本库
- [serve-static](https://github.com/expressjs/serve-static) express常用的文件服务中间件
  封装到 koa 2.0 代码示例:
  ```js
  import serveStatic from 'serve-static';
  function wrapServeStatic(serve) {
    return ctx => {
      const urlBackup = ctx.req.url;
      ctx.req.url = '/' + (ctx.params.pathname || '');
      return new Promise(resolve => {
        serve(ctx.req, ctx.res, resolve);
      }).then(() => {
        ctx.req.url = urlBackup;
      });
    };
  }
  
  // koa-serve-static 封装的
  function serveStatic(root, options) {
    const fn = serveStatic(root, options);
    return (ctx, next) => {
      return new Promise((resolve, reject) => {
        // hacked statusCode
        if (ctx.status === 404) ctx.status = 200
        // unnecessary response by koa
        ctx.respond = false
        // 404, serve-static forward non-404 errors
        // force throw error
        fn(ctx.req, ctx.res, reject)
      })
    }
  }
  ```
- 封装 koa-send示例，测试通过 
  ```js
  import Koa from "koa";
  const app = new Koa();
  import send from "koa-send";

  const resolve = require('path').resolve;
  const assert = require('assert');

  function staticFile(root, opts) {
    opts = opts || {};

    assert(root, 'root directory is required to serve files');

    // options
    //debug('static "%s" %j', root, opts);
    opts.root = resolve(root);

    if (opts.index !== false)
      opts.index = opts.index || 'index.html';

    return async (ctx, next)=>{
      console.log(ctx.url, ctx.path, opts.root, ctx.request.body);

      if (ctx.method == 'HEAD' || ctx.method == 'GET') {
        if (await send(ctx, ctx.path, opts)) return;
      }
      await next();
    };
  }

  app.use(staticFile('./public'));
  ```  

<div id='路由'/> 
## 路由

- [koa-router](https://github.com/alexmingoia/koa-router) 人气最高的路由中间件
- Express风格， 使用 `app.get`, `app.put`, `app.post`, 等. 
  ```js
  .get|put|post|patch|delete|del|all(path, middleware, [...]) ⇒ Router

  router
    .get('/', next => {
      this.body = 'Hello World!';
    })
    .post('/users', next => {
      // ...
    })
    .put('/users/:id', next => {
      // ...
    })
    .del('/users/:id', next => {
      // ...
    });  
  ```
- 匹配具体路径的中间件，用于路由集合：`router.routes ⇒ function`
- 匹配路由参数：`.param(param, middleware) ⇒ Router`
- 匹配所有操作：`.all([path], middleware, [...]) ⇒ Router`
- 前置中间件处理
  ```js
  语法：.use([path], middleware, [...]) ⇒ Router

  示例：
  // 路由处理之前，执行的中间件
  router.use(session(), authorize());
  // 符合/user路径时，执行用户授权检查中间件
  router.use('/user', userAuth());
  // 符合/user路径时，执行子路由匹配！
  router.use('/user', userRouter.routes());

  ```
- 重定向    
  ```js
  outer.redirect(source, destination, code) ⇒ Router  
  router.redirect('/login', 'sign-in');

  ```
- 多重路由：对一个路径，多个顺连的处理函数
  ```js
  router.get(
    '/users/:id',
    (ctx, next) => {
      ctx.user = await User.findOne(this.params.id);
      await next();
    },
    ctx => {
      console.log(ctx.user);
      // => { id: 17, name: "Alex" }
    }
  );  

  ```
- 路由嵌套：路由处理可以是另一个子路由，注意子路由是基于父路由的！
  ```js
  userRt.post('/reg', next => {...}); // responds to "/user/reg"
  userRt.get('/get', next => {...});  // responds to "/user/get"
  forums.use('/user', userRt.routes(), posts.allowedMethods());

  ```
- ES7 async/await 支持.
- Named URL parameters.
- Named routes with URL generation.
- Responds to `OPTIONS` requests with allowed methods.
- 支持 `405 Method Not Allowed` and `501 Not Implemented`.
- Multiple routers.

### 创建路由
new Router([opts])
| Param | Type | Description |
| --- | --- | --- |
| [opts] | <code>Object</code> |  |
| [opts.prefix] | <code>String</code> | prefix router paths |

### 示例代码

app.js 中加载路由中间件
```js
// 加载路由中间件,处理路由匹配,无法匹配的,回到静态文件处理,静态文件找不到的,返回不存在错误!
app.use(router.routes());
```

route 目录下面增加 index.js文件：
```js
import Router from 'koa-router';

const rt = new Router();

// 首页
rt.get('/', ctx => {
  ctx.render( 'h1 Hello, #{name}！', { name: 'Route!' }, { fromString: true }, false);
});

export default rt;
```

访问 http://localhost:3000/ 就能看到 Hello Route！

### 增加子路由

在大型系统中，一般会将路由分解到不同的文件中，而不是集中写在一个总路由中。

修改  route/index.js
``` js
import userRouter from './user';

// 用户子路由处理
rt.use('/user', userRouter.routes());
```

增加 route/user.js
``` js
import Router from 'koa-router';
const log = require('log4js').getLogger('route/user');

const rt = new Router();

// 返回用户注册页面
rt.get('/reg', ctx => {
  log.warn('enter user/reg page.');
  ctx.render('h1 Hello#{name}!', { name: 'user reg！' }, { fromString: true }, false);
});

export default rt;
```

访问 http://localhost:3000/user/reg 就能看到 Hello user reg！

<div id='jade模板'/> 
## jade模板

>jade 已经更名为pug，不是解析最快（毫秒差距无足轻重），但是是最简洁、层次最清晰的模板   

- [consolidate](https://github.com/tj/consolidate.js) tj写的几十种模板库！
- [koa-react-view](https://github.com/koajs/static) react模板库
- [koa-views](https://github.com/queckezz/koa-views) 封装了consolidate，支持 koa 2
- [pug](https://github.com/pugjs/pug) jade 更名为 pug
- [koa-pug](https://github.com/chrisyip/koa-pug) pug koa的封装
- [jade官网](http://jade-lang.com)
- [html2jade 转换代码库，用于程序内部使用](https://github.com/donpark/html2jade)
- [html2jade 网页在线转换（推荐）](http://html2jade.org)
- [jade2html2jade双向转换（中文会自动转码）](http://jumplink.github.io/jade2html2jade/) 
- 示例代码：
  ``` js
  import Koa from 'koa';
  import Pug from 'koa-pug';

  const app = new Koa();

  // jade 模板
  const pug = new Pug({
    app, // equals to pug.use(app) and app.use(pug.middleware)
    viewPath: './views',
    debug: process.env.NODE_ENV === 'development' });

  pug.locals.title = 'Koa Demo';

  app.use(ctx => {
    ctx.render( 'h1 Hello, #{title} #{name}', { name: 'Pug' }, { fromString: true }, false);
  });

  console.log('koa start on port 3003');
  app.listen(3003);
  ```

<div id='参数存放'/> 
## 参数设置

任何程序都需要一些参数设置文件来设置参数，程序运行时，能根据参数工作，这样在环境等变化时，就不需要修改代码，只需修改参数配置即可。  

### 参数存放

- 参数一般分为两种，一种是存在文件里面，一种是存在数据库里面。  
- 存在文件里面，程序启动时加载，运行过程中，文件变化，需重启程序。  
  - 文件配置一般统一存放在 专门的 config 目录，统一管理。  
  - 参数文件可使用 json 或 js文件，json是纯数据，不支持 备注，而 js支持备注，推荐 使用 js 作为参数配置文件
  - 一般都会有 app.js，作为应用基本配置文件，请注意，这个文件在 config目录下面，不要与 src、lib、bin下面的 app.就是搞混了。
- 存在数据库中，需要编写程序，实现自动加载、更新
  - 由于是自己的代码控制，在参数变化时，设置刷新标记，在不影响业务时，实现参数重新加载。  
  - 一般会吧常用参数存放在内存中，触发或自动定时更新。
  - 数据库参数通过远程可修改，而文件参数需登录到服务器才能修改
  - 建议尽量使用数据库方式存储参数，一些隐秘的、基本的、不经常变化的存在文件里面。
  - 数据库一般有个参数字典表，可设置为 code 名称，表示 参数代码。

### config/app.js 参数文件举例

```js
export default {
  app: {
    host: 'paiapp.com', // 域名 或 ip地址，登记时需要返回给登记者
    port: 3000, // 4502-4534  silverlight
    debug: true    // 调试环境还是生产环境
  },
  theme: {
    name: 'default'
  },
  session: {
    secret: '546gsfqwerqe4tgfghfghdfujtrt',
    expires: 1200, // 服务端session有效期，单位秒，空闲超时强制清除，客户端最好5分钟一次登记！超时20分钟不活动，判断为离线，个人聊天时无需精确状态消息，在close中不广播离线状态，在这里广播 离线状态？
    checktime: 60  // 多长时间 检查一次，单位秒
  },
  log: {
    level: 'ALL' /* OFF FATAL ERROR WARN INFO DEBUG TRACE ALL */
  },
  // mongodb 数据库
  db: {
    conn: 'mongodb://localhost/pai',
    poolSize: 5
  },
  // 缓存服务器
  redis: { 
    host: 'localhost',
    port: 6379, // 6379在是手机按键上MERZ对应的号码，而MERZ取自意大利歌女Alessia Merz的名字
    password: ''
  },
  upfile: {
    maxSize: 20 // 上传最大文件大小，单位兆数，默认10兆，大约500万条政策数据
  }
};

```

### 配置文件使用示例

```js
import cfg from '../../config/app.js';

// 缺省连接池为 5个
const conn = mongoose.createConnection(
  cfg.db.conn,
  {server: {poolSize: cfg.db.poolSize}}
);

```

## MongoDB 数据库

>Mongoose 是 MongoDB数据库node.js下的ODM(Object Document Mapper，对象文档映射)。    
以对象方式，提供数据校验、关联、连接池等各种更高级功能。

- 安装：npm i mongoose -S
- 安装原生驱动：npm install mongodb --save
- 原生驱动是基于字符串方式的文档模型操作，灵活但是容易出错，在密集写入场景可使用。
- mongoose 在原生驱动上做了封装，密集操作时，性能上比原生操作慢一点点，但更健壮，推荐在常规场景使用。
- mongoose详细操作请参见专门的[mongoose 使用说明](https://github.com/nydl/devnote/blob/master/mongoose.md)
- mongoDB详细说明请参见专门的[mongoDB 使用说明](https://github.com/nydl/devnote/blob/master/mongoDB.md)

### 数据模型定义

model中增加了两个文件：db.js 和 user.js，一个是管理数据库连接，一个是管理用户数据。

db.js 封装了数据库连接的创建与获取，代码如下：
```js
const mongoose = require('mongoose');
import cfg from '../../config/app.js';

// 缺省连接池为 5个
const conn = mongoose.createConnection(
  cfg.db.conn,
  {server: {poolSize: cfg.db.poolSize}}
);

conn.on('error', err => console.log(err));

export default conn;

```

user.js 定义了数据库中 users表（mongodb 称之为文档，不叫表，我们习惯还是叫表）的字段，注意，mongodb里面存储的表名会自动加“s”，比如 user，数据库里面就是 users。
```js
 const mongoose = require('mongoose');
const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

/**
 * User 模型定义
 * name: { type: String, index: true }
 */
const userSchema = schema({
  // pai号，目前暂定为 8 位
  pid: { type: String, required: true, unique: true }, // pai号，必须有值，必须唯一，重复无法插入
  mobile: {type: String, required: true, unique: true}, // 手机号，企业、群组没有手机，可设置为固定电话，或者创办人手机前加 G，避免手机重复
  email: {type: String, sparse: true, unique: true},  // 邮箱，稀疏索引，支持多个无值都能插入，有值必须唯一，不能填空，不能null

  unitId: Number,   // 单位 Id，自增长索引，可选
  unitOid: ObjectId, // 单位ObjectId
  unitPid: String,  // 单位 pid

  rid: {type: String},     // 第三方系统id号，如 马蜂窝的 uid
  from: {type: String},    // 用户来源，比如 mfw 表示马蜂窝

  name: {type: String, index: true}, // 真实姓名，用于朋友之间显示的名称
  alias: String,    // 别名，类似微信的备注名称，可修改好友的名称为别名
  nick: String,     // 昵称，用于陌生人显示的名称
  mark: String,     // 个性签名，微博、QQ、微信在名字后面显示 sign api接口的 sign 冲突
  sex: String,      // 性别，男、女，企业、群组无
  password: String, // md5 编码

  // 类别 0：待定，作为普通个人用户处理 1：普通个人 2：企业用户 3：群组，群组依附于会员存在 4：公众，包括 个人、媒体、企业等需社会化营销的用户
  type: Number,     // 普通、企业 的分享，是否可向公众 转发、关注，从而产生粉丝，类似轻微博，粉丝只能看到用户通讯录之外的粉丝和关注，对通讯录进行保护
  verify: Boolean,  // 实名认证、验证，坐过飞机的，自动通过认证
  rating: Number,   // 等级  星级  可建立梦幻的、值得骄傲的，代表身份的等级制，包括 分享数量、粉丝数量、转发数量等
  tag: [],          // 标签，如 明星,记者,机票出票

  imei: String,     // 手机设备串号，可用于绑定
  ip: String,       // 当前计算机IP地址，一般是变化的
  pcid: String,     // 计算机设备号，如 cpuid，硬盘id，网卡mac地址等用于标识当前计算机设备，用于绑定登录

  icon: String,     // 用户图标
  url: String,      // 用户工作网址
  host: String,     // 登记、归属主机
  unitNo: String,   // 邀请码，单位号，用于识别所属主机及单位，用于所动该用户单位
  status: Number,   // 用户状态 0：新用户待定 1：确认 2：复核 3：删除 4：过期

  // pai状态 0：未登记（未登录） 离线 1：登记 上线（一般用于登录状态判断） 2:在线（普通空闲状态） 3：忙碌 4：免打扰 5：隐身 6：离开
  // 离线后第一次登录，状态填1，成功登录后，根据上次状态判断，如上次为隐身，则进入隐身，否则 进入 2 在线状态，这样方便统计用户登录情况
  // 状态说明，如 打字中，就餐等。。。
  // 工作状态 0:缺席（未上岗） 1：上岗（开始上班，类似登录） 2:就绪（可分派业务） 3:忙碌（电话会话） 4:暂停（不分派业务） 5：外呼 6：离席
  // 工作状态说明，如 离席 会议、就餐等。。。state: {type: Array, default: [0, '', 0, '']},

  friend: [],      // 好友，安装了pai
  contact: [],      // 联系人，一个人一般都有100-1000的联系人，这些都是需要转化pai用户的目标

  group: [],       // 加入的群组
  member: [],       // 群组成员，对群组用户有效

  // 订阅别人，关注别人，用于主动获取订阅者、关注者状态
  sub: {
    sta: [],       // 状态订阅者，有时只需要状态
    all: [],       // 所有关注，微博的 关注
    msg: [],       // 消息分享订阅者
    pic: []       // 相册订阅者
  },
  // 被别人订阅，被关注
  subed: {
    sta: [],       // 状态订阅者
    all: [],       // 所有订阅者，微博的粉丝
    msg: [],       // 分享订阅者
    pic: []       // 相册订阅者
  },

  desc: String,     // 个人简介
  notes: String,    // 备注
  remark: String,   // 内部备注，内部可见
  sellId: ObjectId, // 推荐者、销售员UserId
  sellPid: String,   // 销售员pid
  seller: String,   // 销售员名称

  serviceId: ObjectId,  // 客服Id
  servicePid: String,  // 客服名称
  servicer: String,  // 客服名称

  adminId: ObjectId, // 管理人id
  adminPid: String,
  admin: String,    // 管理人名称，公众、群组用户 需设置管理员，方便联系

  addUserId: ObjectId, // 创建用户, ObjectId 唯一，不可被修改！
  addPid: String, // 创建用户
  addUser: String, // 创建用户
  addTime: {type: Date, default: Date.now}, // 创建时间

  upUserId: ObjectId, // 更新用户
  upPid: String, // 更新用户
  upUser: String, // 更新用户
  upTime: Date  // 更新时间
});

// 通过 require db.conn 来返回指定的数据库 User 模型
export default function userM(conn) {
  // 定义 model
  mongoose.model('user', userSchema);
  // 获取 model
  return (conn || mongoose).model('user');
}

```

### 写入数据

我们来写个测试代码，向 数据库中的 users表 插入一条记录：

```js
/**
 * Data generation
 */
import conn from './db';
function add(pid) {
  const UserM = userM(conn);

  UserM.create({
    pid: pid,
    name: 'test',
    showName: 'test',
    Sex: '男',
    mobile: '13900000001',
    unitNo: '0086.11112222',
    status: 1,
    upTime: new Date('2016/05/16 23:00:00'),
  }, err => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('create data!');
    }
  });
}

/**
 * Test
 */
add('88880003');
```

### 查看写入的数据

- 启动 mongodb 数据库服务，如何启动，请参见 mongoDB文档
- 打开命令行，使用 mongo 来查看数据，执行指令如下：
  ```js
  mongo // mongodb 客户端工具
  use pai // 切换数据库
  db.users.find() // 列出所有users表记录
  db.users.find().count() // users表记录数量
  
  ``` 

## 用户逻辑封装

>用户数据库表（mongodb 称之为文档，不叫表，我们习惯还是叫表）定义完毕，并且通过 mongoose 生成了 对象模型 model，接下来我们需要封装一个用户类，将所有用户操作数据库以及用户相关逻辑存放在这个用户类中，方便统一管理。  
>为了易懂，这个文件还是取名为 user.js，目录为 base，属于基本业务部分。  
注意，user.js 已经出现了3次，分别在 model、route、base，分别代表 数据模型、业务逻辑、路由交互。  
上述三层外，页面 view 属于视图层，用于界面呈现，运行在客户端计算机或手机。  
工具 utils 则是各种工具库。  
最大的 工具库 则是通过 那npm 安装的 node_modules 目录，里面有大量的 第三方代码库。 

### 使用 babel 支持 类静态属性
 
类封装，需要用到 类的静态属性、静态方法等，静态方法在 es5/6中已经得到支持，静态属性还没有，需要安装 babel 转换插件及语法库支持！

安装：
```js
npm i -D babel-plugin-syntax-class-properties
npm i -D babel-plugin-transform-class-properties

```
启用：在 .babelrc中的 "plugins" 增加
```js
"syntax-class-properties",
"transform-class-properties"

```

- 类的定义：`export default class User {}`
- 静态属性定义，用户类型：
  ```js
  static types = {
    person: 0,
    vip: 1,
    group: 2,
    sub: 3,
    pub: 4,
    corp: 5
  };

  ```
- 类的构造函数：
  ```js
  // 构造函数,实例赋值一般放在这里
  constructor() {
  }
  
  ``` 
- 只读属性定义
  ```js
  // 属性存取器,获取数据模型
  static get model() {
    return userM(conn);
  }

  ```
- 静态函数
  ```js
  static getModel() {
    return userM(conn);
  }

  ```

### async 与 await

ES7的标准，将异步回调转为 await 类似同步方式调用，直接等待异步执行结果返回。  
最大的好处是可以像传统 C#、Java那样写流程，不用无限嵌套回调，避免很多差错，逻辑表达更加清晰明了！  
原来的回调对错误处理非常弱智和痛苦，异步方式，只需在函数最后做总得错误处理，错误处理能力更强大，代码更简洁。

### 使用迭代生成数据库中不存在的用户id
  
使用了 async 异步方法，访问数据库时，使用了 await，让程序等待到数据库返回查询结果，注意，findOne返回的是 promise，需要执行 exec()直接返回查询数据，与之前的回调函数不同，之前需要通过回调函数嵌套。  
新的写法属于 es7规范，大大简化了 异步函数调用，基本与 标准的 C#、JAVA一致了，容易懂。
  
```js
  static _newPidCnt = 0;
  static async newPid() {
    // 随机生成 八位 pai号
    let pid = _.random(10000000, 99999999); // Math.floor(Math.random() * 99999999);
    const rs = await User.model.findOne({pid}, 'pid').exec();
    if (rs) {
      User._newPidCnt ++;
      log.warn('newPid:%s exists! try:%d', pid, User._newPidCnt);
      pid = await newPid();
    }

    return pid;
  }

```

### 用户注册

同样使用了异步函数，不使用回调，使用 await等待结果，直接返回数据。  
先查找数据库，看用户手机是否已经注册，没有注册，生成唯一的 8位用户ID，写入数据库！

```js
  /**
   * 用户注册
   * @param user
   * @returns {null}
   */
  static async reg(user) {
    let rt = null;
    let pid = '';

    try {
      if (!user.mobile)
        return null;

      let cdt = null;
      if (user.email) {
        cdt = {
          $or: [{
            mobile: user.mobile
          }, {
            email: user.email
          }]
        };
      } else {
        cdt = {
          mobile: user.mobile
        };
      }

      // 手机、邮箱必须唯一
      // UserM.findOne(cdt, 'pid', (err, u) => {
      const rs = await User.model.findOne(cdt, 'pid').exec();
      if (rs)
        rt = util.format('{"act":"user.reg", "rc":403, "mobile":"%s", "err":"用户存在！"}', rs.mobile);
      else {
        // 随机生成 八位 pai号
        pid = await User.newPid();
        if (pid) {
          user.pid = pid;
          const us = await User.model.create(user);

          if (us) {
            log.trace('regUser user:%s', JSON.stringify(us));
            rt = util.format('{"act":"user.reg", "rc":200, "pid":"%s", "mobile":"%s", "email":"%s"}',
              pid, us.mobile, us.email);
          }
        }
      }
    } catch (e) {
      log.error('user.reg exp:%s', e.message);
      rt = util.format('{"act":"user.reg", "rc":500, "pid":"%s", "mobile":"%s", "email":"%s", ' +
        '"err":"%s"}', pid, user.mobile, user.email, err.message);
    }

    log.debug('user.reg rc:%s', rt);

    return rt;
  }

```

### 测试注册用户

```js
function test() {
  let rt = null;

  try {
    const us = {
      name: 'test',
      showName: 'test',
      Sex: '男',
      mobile: '13900000008',
      unitNo: '0086.11112222',
      status: 1,
      upTime: new Date('2016/05/16 23:00:00')
    };

    rt = User.reg(us);
  } catch (e) {
    log.error('test exp:%s', e.message);
  }

  return rt;
}

console.log(test());

```  
  
### 增加子路由

// 注册用户，post
rt.post('/api/reg', user.reg);
- 实现用户注册接口




## 部署运行

- [nodemon](https://github.com/remy/nodemon/)
  开发时使用，自动监控文件变化，自动重新加载
  c:\program>nodemon d:/js/node/app.js 
  监视的是c:\program这个启动目录，而不是d:/js/node这个目录
- [pm2](https://github.com/Unitech/pm2)
  生产时使用
- [supervisor](https://github.com/petruisfan/node-supervisor)
  逐渐被 nodemon 替代
- [forever](https://github.com/foreverjs/forever) 
  逐渐被 pm2 替换
  
### 无中断重启

由于node是单线程工作（多线程可实现线程的单独加载），运行时所有代码已经加载到通用内存，修改代码后，需关闭服务，重新加载新代码执行。  
不仅仅是代码，包括一些配置参数修改了，也需重启服务，所以建议参数不要放入config文件，统一放到数据库中，通过后台刷新标记进行动态加载。

重启服务可能会影响正在运行的业务，比如一个用户正在支付，重启就打断了支付流程。  
结合 nginx 反向代理，部署多套 node，可以实现业务无中断重启。  
该原理就是重启前，与 nginx协商好，停止分配连接，等当前连接处理完毕，即可重启。重启后，再通知 nginx 分发连接，进行处理。
理论上需要部署多台 node 服务器，如果只有一台，可以在一台上部署两套 node，两个端口，分别使用 一半的 cpu 来处理。

pm2 等工具实际上多进程运行工具，如果每个进程使用一套内存代码，理论上可以实现类似的功能，就是多个进程在处理完当前请求后，自动加载新的代码，这样一个个进程单独更新，实现无终端重启。

我们用 express.js 服务来举例，koa 也是类似的！

```js
app = express.createServer() 
... 
app.listen(31337) 
```

对服务的做如下调整（示意代码，真实代码待后续测试成功补上）：

```js
app = express.createServer() ... 
gracefullyClosing = false 
app.use (req, res, next) -> 
return next() unless gracefullyClosing 
res.setHeader "Connection", "close" 
res.send 502, "Server is in the process of restarting"

httpServer = app.listen(31337) 
process.on 'SIGTERM', -> gracefullyClosing = true 

``` 

nginx 反向代理服务设置如下（示意代码）：

```js
upstream silly_face_society_upstream {
  server 127.0.0.1:61337;
  server 127.0.0.1:61338;
  keepalive 64;
}
```


   


运行测试
--------

`
$ make test
`

应用（Application）
-------------------

一个 Koa Application（以下简称 app）由一系列中间件组成。按照编码顺序在栈内依次执行，从这个角度来看，Koa app 和其他中间件系统（比如 Ruby Rack 或者 Connect/Express ）没有什么太大差别，不过，从另一个层面来看，Koa 提供了一种基于底层中间件编写「语法糖」的设计思路，这让设计中间件变得更简单有趣。

在这些中间件中，有负责内容协商（content-negotation）、缓存控制（cache freshness）、反向代理（proxy support）与重定向等等功能的常用中间件（详见 中间件 章节），但如前所述， Koa 内核并不会打包这些中间件。

让我们先来看看 Koa 极其简单的 Hello World 应用程序：


级联调用（Cascading）
------------------

### 级联概念

Koa 中间件以一种非常传统的方式级联起来，类似 connect，你可能会非常熟悉这种写法，就像流水线一样，对web请求进行一级级处理。

在以往的 Node 开发中，由于其异步性，导致每个执行结果都要使用回调，当一个结果需要等待另一个结果是，就会导致非常深的回调嵌套。  
频繁使用回调不太便于展示复杂的代码逻辑，在 Koa 中，我们可以写出真正具有表现力的中间件。与 Connect 实现中间件的方法相对比，Koa 的做法不是简单的将控制权依次移交给一个又一个的中间件直到程序结束，Koa 执行代码的方式有点像回形针，用户请求通过中间件，遇到 await next() 关键字时，会被传递到下一个符合请求的路由（downstream），在 await next() 捕获不到下一个中间件时，逆序返回继续执行代码。

简单来说，就是将以前嵌套的回调函数，不再嵌套，直接在同一层编写，系统在 await 等待结果后继续执行后续代码，等同于回调，效果一样，只是语义更加自然，更加易懂。  
  
下边这Hello World 范例演示了这种平铺型级联模式。  
一开始，用户的请求通过 x-response-time 中间件和 logging 中间件，这两个中间件记录了一些请求细节，然后「穿过」response 中间件一次，最终结束请求，返回 「Hello World」。

当程序运行到 await next() 时，代码流会暂停执行这个中间件的剩余代码，转而切换到下一个被定义的中间件执行代码，等待对方交回控制权，这样切换控制权的方式，被称为 downstream，当没有下一个中间件执行 downstream 的时候，代码将会逆序执行 upstream。

### 代码示例：

```js
/**
 * Created by way on 16/5/10.
 */

const Koa = require('koa');
const app = new Koa();

async function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

// uses async arrow functions
app.use(async (ctx, next) => {
  try {
/*
    if (__DEV__) {
      console.log(ctx.url, ctx.request.body);
    }
*/
    console.log('(1) 进入路由');
    const start = new Date();
    await next(); // 执行并等待下一个中间件
    console.log('(5) 再次进入 x-response-time 中间件，记录2次通过此中间件的时间');
    const ms = new Date() - start;
    ctx.set('X-Response-Time', ms + 'ms');
    console.log(`enter: ${ctx.method} ${ctx.url} - ${ms}ms`);
    console.log('(6) 返回 ctx.body');
  } catch (err) {
    ctx.body = { message: err.message };
    ctx.status = err.status || 500;
  }
});


// logger
app.use(async (ctx,next) => {
  console.log('(2) 进入 logger 中间件');
  const start = new Date();
  await next(); // 执行并等待下一个中间件,如果不等待结果,直接 在最后调用 next()即可!
  console.log('(4) 再次进入 logger 中间件，记录2次通过此中间件的时间');
  const ms = new Date() - start;
  console.log(`logger: ${ctx.method} ${ctx.url} - ${ms}ms`);
});


// response
app.use(async ctx => {
  console.log('(3) 进入 response 中间件，没有下一个next,开始返回');
  //const user = await User.getById(ctx.session.userid); // await instead of yield
  await delay(200);
  ctx.body = `Hello Koa!`;
});

app.listen(3000);

```

### 示例解析

在上方的范例代码中，中间件以此被执行的顺序已经在注释中标记出来。可以尝试运行一下这个范例，并打印记录下各个环节的输出与耗时。  
「级联」这个词许多人也许在 CSS 中听说过，如果你不能理解为什么在这里使用这个词，可以将这种路由结构想象成 LESS 的继承嵌套书写方式：

```js
.middleware1 {
  // (1) do some stuff
  .middleware2 {
    // (2) do some other stuff
    .middleware3 {
      // (3) NO next await !
      // ctx.body = 'hello world'
    }
    // (4) do some other stuff later
  }
  // (5) do some stuff lastest and return
}
```

上方的伪代码中标注了中间件的执行顺序，看起来是不是有点像 ruby 执行代码块（block）时 yield 的表现了？也许这能帮助你更好的理解 koa 运作的方式。

### 级联调用形象示意图 
![onion.png](https://raw.githubusercontent.com/nydl/devnote/master/img/koa-onion.png)

应用配置（Settings）
--------------------

应用的配置是 app 实例的属性。目前来说，Koa 的配置项如下：

-	**app.name** 应用名称
-	**app.env** 执行环境，默认是 NODE_ENV 或者 development 字符串
-	**app.proxy** 决定了什么 proxy header 参数会被加到信任列表中
-	**app.subdomainOffset** 被忽略的 .subdomains 列表
-	**app.jsonSpaces** 默认的 JSON 响应空间
-	**app.outputErrors** 是否输出错误堆栈 err.stack 到 stderr [当执行环境是 "test" 的时候为 false]

## 代码解析

### app.listen(...)

用于启动一个服务的快捷方法，以下范例代码在 3000 端口启动了一个空服务：

```js
var koa = require('koa');
var app = koa();
app.listen(3000);

app.listen 是 http.createServer 的简单包装，它实际上这样运行：

http.createServer(app.callback()).listen(3000);
```

如果有需要，你可以在多个端口上启动一个 app，比如同时支持 HTTP 和 HTTPS：

```js
http.createServer(app.callback()).listen(3000);  
http.createServer(app.callback()).listen(3001);  
```

### app.callback()

返回一个可被 http.createServer() 接受的程序实例，也可以将这个返回函数挂载在一个 Connect/Express 应用中。

### app.use(function)

将给定的 function 当做中间件加载到应用中。

### app.keys=

设置一个签名 Cookie 的密钥。这些参数会被传递给 KeyGrip 如果你想自己生成一个实例，也可以这样：

```js
app.keys = ['im a newer secret', 'i like turtle'];  
app.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256');  
```

注意，签名密钥只在配置项 signed 参数为真是才会生效：

```js
this.cookies.set('name', 'tobi', { signed: true });  
```

错误处理（Error Handling）
--------------------------

除非应用执行环境被配置为 "test"，Koa 都将会将所有错误信息输出到 stderr，和 Connect 一样，你可以自己定义一个「错误事件」来监听 Koa app 中发生的错误：

```js
app.on('error', function(err){  
  log.error('server error', err);
});
```

当任何 req 或者 res 中出现的错误无法被回应到客户端时，Koa 会在第二个参数传入这个错误的上下文：

```js
app.on('error', function(err, ctx){  
  log.error('server error', err, ctx);
});
```

如果任何错误有可能被回应到客户端，比如当没有新数据写入 socket 时，Koa 会默认返回一个 500 错误，并抛出一个 app 级别的错误到日志处理中间件中。

## 中间件

- koa2 使用了 Promise模式，全面支持 async、await，对原 generator不再支持。
- 部分中间件升级可支持 2.0，安装中间件时要注意看，是否支持 koa2
- 否则需要自己就行封装，可对express中间件进行封装，示例如下：
  https://github.com/ucms/ucms-plugin-file-store/blob/master/src/index.js
- 或者使用koa提供的 koa-convert 对之前的koa中间件进行封装调用
  - 安装 `$ npm install koa-convert`
  - 使用示例：
  
  ``` js
  const Koa = require('koa') // koa v2.x
  const convert = require('koa-convert')
  const app = new Koa()

  app.use(modernMiddleware)

  app.use(convert(legacyMiddleware))

  app.use(convert.compose(legacyMiddleware, modernMiddleware))

  function * legacyMiddleware (next) {
    // before
    yield next
    // after
  }

  function modernMiddleware (ctx, next) {
    // before
    return next().then(() => {
      // after
    })
  }
  
  ```
  
  