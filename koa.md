KOA
===

类似express的框架，由 Express 同一作者 koa，致力于成为一个更小、更健壮、更富有表现力的 Web 框架。
支持async await es7语法，可以免除重复繁琐的回调函数嵌套，并极大地提升常用错误处理效率。
Koa 不在内核方法中绑定任何中间件，它仅仅提供了一个轻量优雅的函数库，使得编写 Web 应用变得得心应手。

**官方网站**: http://koajs.com  
**GitHub**：https://github.com/koajs/koa
**中文文档**：http://koajs.cn/  
**示例**: https://github.com/koajs/examples

作者
----

-	[TJ Holowaychuk](https://github.com/tj)
-	[Jonathan Ong](https://github.com/jonathanong)
-	[Julian Gruber](https://github.com/juliangruber)
-	[Yiyu He](https://github.com/dead-horse)

更多资源
-------

-	[API](docs/api/index.md) documentation
-	[Badgeboard](https://koajs.github.io/badgeboard) and list of official modules
-	[Examples](https://github.com/facebook/react-native/tree/master/Examples)
-	[Middleware](https://github.com/koajs/koa/wiki) list
-	[Wiki](https://github.com/koajs/koa/wiki)
-	[G+ Community](https://plus.google.com/communities/101845768320796750641)
-	[Reddit Community](http://reddit.com/r/koajs)
-	[Mailing list](https://groups.google.com/forum/#!forum/koajs)
-	[Guide](docs/guide.md)
-	[FAQ](docs/faq.md)
-	**#koajs** on freenode

开始使用
------

-	[Kick-Off-Koa](https://github.com/koajs/kick-off-koa) - An intro to koa via a set of self-guided workshops.
-	[Workshop](https://github.com/koajs/workshop) - A workshop to learn the basics of koa, Express' spiritual successor.
-	[Introduction Screencast](http://knowthen.com/episode-3-koajs-quickstart-guide/) - An introduction to   
  installing and getting started with Koa
- 安装koa 2.0
  `$ npm install koa`
- 示例
  -	下载示例并解压到指定路径
  -	进入该目录，运行 `npm install` 自动完成相关组件安装
  -	进入各个示例中，运行 node app 即可运行各种示例
- 需将webstorm 中的 js 设置为 6.0 或 jsx，否则报错
- koa2 使用了es7的语法，如 async、await，需要 Babel转换
- 使用 js 6后，webstorm会提示 一个 自动转换为 5 的 插件：
	File watcher 'Babel' is available for thie file. Description:'Transpiles ECMAScript 6 code to ECMAScript 5'
  这个插件在你修改文件时，会自动将es6、es7语法文件转换为es5或es6的文件。  
  会影响编码效率，一般项目比较大，文件多，不推荐使用，学习、测试可以使用。
  也可以通过tools手动添加。
-	运行服务端RN，`npm start`，npm 会在项目的 package.json 文件中寻找 scripts 区域中的start命令。  
	其实npm test和npm start是npm run test和npm run start的简写。事实上，你可以使用npm run来运行scripts里的任何条目。  
	使用npm run的方便之处在于，npm会自动把node_modules/.bin加入$PATH，这样你可以直接运行依赖程序和开发依赖程序，不用全局安装了。 只要npm上的包提供命令行接口，你就可以直接使用它们，方便吧。
  
## 示例代码
  
```js
var koa = require('koa');
var app = koa();

// logger

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

// response

app.use(function *(){
  this.body = 'Hello World';
});

app.listen(3000);
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
```js
var koa = require('koa');  
var app = koa();

app.use(ctx=>  
  ctx.body = 'Hello World';
);

app.listen(3000);  
```

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

### 形象示意图 
![onion.png](koa/koa-onion.png)

应用配置（Settings）
--------------------

应用的配置是 app 实例的属性。目前来说，Koa 的配置项如下：

-	**app.name** 应用名称
-	**app.env** 执行环境，默认是 NODE_ENV 或者 development 字符串
-	**app.proxy** 决定了什么 proxy header 参数会被加到信任列表中
-	**app.subdomainOffset** 被忽略的 .subdomains 列表
-	**app.jsonSpaces** 默认的 JSON 响应空间
-	**app.outputErrors** 是否输出错误堆栈 err.stack 到 stderr [当执行环境是 "test" 的时候为 false]

## 代码理解

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
  - 使用
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