KOA
===

类似express的框架，由 Express 同一作者 koa，致力于成为一个更小、更健壮、更富有表现力的 Web 框架。
支持async await es7语法，可以免除重复繁琐的回调函数嵌套，并极大地提升常用错误处理效率。
Koa 不在内核方法中绑定任何中间件，它仅仅提供了一个轻量优雅的函数库，使得编写 Web 应用变得得心应手。

**官方网站**: http://koajs.com  
**GitHub**：https://github.com/koajs/koa
**中文文档**：http://koajs.cn/  
**KOA实战**:http://book.apebook.org/minghe/koa-action/index.html
**示例**: https://github.com/koajs/examples


更多资源
-------

-	[接口文档](docs/api/index.md) documentation
-	[Badgeboard](https://koajs.github.io/badgeboard) and list of official modules
-	[示例](https://github.com/facebook/react-native/tree/master/Examples)
-	[中间件](https://github.com/koajs/koa/wiki) list
-	[Wiki](https://github.com/koajs/koa/wiki)
-	[G+ Community](https://plus.google.com/communities/101845768320796750641)
-	[Reddit Community](http://reddit.com/r/koajs)
-	[Mailing list](https://groups.google.com/forum/#!forum/koajs)
-	[使用指南](docs/guide.md)
-	[FAQ](docs/faq.md)
-	[Kick-Off-Koa](https://github.com/koajs/kick-off-koa) - An intro to koa via a set of self-guided workshops.
-	[Workshop](https://github.com/koajs/workshop) - A workshop to learn the basics of koa, Express' spiritual successor.
-	[Introduction Screencast](http://knowthen.com/episode-3-koajs-quickstart-guide/) - An introduction to   
  installing and getting started with Koa

开始使用
------

- koa 2.0 需要使用 Babel，需要安装 Babel转换器
  - 使用了es7的语法，如 async、await
- package.json 项目配置参考文件：
``` js
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
- npm镜像：npm 修改npm服务器为淘宝镜像服务器，加快安装速度
  npm config set registry https://registry.npm.taobao.org
  npm config set disturl https://npm.taobao.org/dist
- 安装第三方库： `$ npm i`
- 运行示例代码：
  -	下载示例并解压到指定路径
  -	进入该目录，运行 `npm install` 自动完成相关组件安装
  -	进入各个示例中，运行 node app 即可运行各种示例
- js版本：需将webstorm 中的 js 设置为 JSX Harmoney，最大限度支持新语法
- ESLint：Java Script 中开启 ESLint,提供代码编写规范检查
- Babel自动转换：使用 js 6后，webstorm会提示 一个 自动转换为 5 的 插件：
	File watcher 'Babel' is available for thie file. Description:'Transpiles ECMAScript 6 code to ECMAScript 5'
  这个插件在你修改文件时，会自动将es6、es7语法文件转换为es5或es6的文件。  
  建议不要使用，会影响编码效率，学习、测试可以使用，涉及多个文件引用时，引用文件如果采用了新语法，会报错。
  也可以通过tools手动添加。
-	批量转换：`npm run build`，npm 会在项目的 package.json 文件中寻找 scripts 区域中的命令。  
	其实npm test和npm start是npm run test和npm run start的简写。事实上，你可以使用npm run来运行scripts里的任何条目。  
	使用npm run的方便之处在于，npm会自动把node_modules/.bin加入$PATH，这样你可以直接运行依赖程序和开发依赖程序，不用全局安装了。 只要npm上的包提供命令行接口，你就可以直接使用它们，方便吧。
- webstorm调试：
  - 添加调试文件时，使用 babel-node 代替 标准 node
    比如 osx 上：
    /Users/way/.nvm/versions/node/v5.10.1/bin/node
    替换为：
    /Users/way/.nvm/versions/node/v5.10.1/bin/babel-node
  - 编译时带"-s"生成 Source Maps，运行js时，可对编译前的代码进行调试！
    "build": "node_modules/.bin/babel src -d lib -s",
- 如果浏览器提示错误，在浏览器上先连一下调试端口，然后打开web端口，即可触发调试
  
  
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
    ctx.body = 'Hello World';
  });

  app.listen(3000);
  ```

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

``` js
import Koa from 'koa'; // koa web 服务框架
import Router from 'koa-router';

const rt = new Router();
rt.get('/', next => {...});

app.use(rt.routes()).use(router.allowedMethods());
```

## jade模板

>jade 已经更名为pug，不是解析最快（毫秒差距无足轻重），但是是最简洁、层次最清晰的模板   

- [consolidate](https://github.com/tj/consolidate.js) tj写的几十种模板库！
- [koa-react-view](https://github.com/koajs/static) react模板库
- [koa-views](https://github.com/queckezz/koa-views) 封装了consolidate，支持 koa 2
- [pug](https://github.com/pugjs/pug) jade 更名为 pug
- [koa-pug](https://github.com/chrisyip/koa-pug) pug koa的封装
- [jade官网](http://jade-lang.com)
- [html2jade](https://github.com/donpark/html2jade) 转换库
- [html2jade web](http://html2jade.org) 在线转换
- [jade2html2jade](http://jumplink.github.io/jade2html2jade/) 双向转换
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