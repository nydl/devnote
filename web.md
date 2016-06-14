<meta http-equiv="content-type" content="text/html; charset=UTF-8">

<link href="css/markdown.css" rel="stylesheet" />

<link href="css/prettify.css" rel="stylesheet" />

<script src="http://apps.bdimg.com/libs/jquery/2.0.3/jquery.min.js"></script>

<script src="js/prettify.js"></script>  

WEB前端设计
=========

>主要面向手机、微信的H5前端设计。  

## 相关资源 

- 前端资源网站：http://www.bootcss.com
- 前端资源加速库: http://www.bootcdn.cn
	稳定、快速、免费的开源项目 CDN 服务
	共收录了 2201 个开源项目
	<script src="http://cdn.bootcss.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="http://cdn.bootcss.com/fastclick/1.0.6/fastclick.min.js"></script>
- H5前端优化指南：https://isux.tencent.com/h5-performance.html
- 浅谈移动前端的最佳实践 http://www.cnblogs.com/yexiaochai/p/4219523.html
- h5移动端页面的适配问题 http://www.mamicode.com/info-detail-516462.html
- zeptojs: http://zeptojs.com

像这个页面的底部，我们一般用定位固定到最底部：position：fixed；但是当有输入框textarea时，但是点击textarea的文本框，下面的键盘会把底部顶上去，这就是一个小小的bug，我刚遇到这个问题时，从网上找了好多方法，试了好多方法，终于找到了一个解决方法，在代码中引入
```js
	<script>
    if (/ipad|iphone|mac/i.test(navigator.userAgent)){}
	</script>
```

## 解决手机 点击无效或延迟300ms问题

https://github.com/ftlabs/fastclick

### 为什么会有延迟

> 手机浏览器支持双击，点一下时，需等待300ms，看你是否再次点击。

### 兼容性

* Mobile Safari on iOS 3 and upwards
* Chrome on iOS 5 and upwards
* Chrome on Android (ICS)
* Opera Mobile 11.5 and upwards
* Android Browser since Android 2
* PlayBook OS 1 and upwards

### 使用

Include fastclick.js in your JavaScript bundle or add it to your HTML page like this:

```html
<script src="http://cdn.bootcss.com/fastclick/1.0.6/fastclick.min.js"></script>
```

```js
if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
}
```

如果使用 jQuery:

```js
$(function() {
	FastClick.attach(document.body);
});
```

## fetch 异步请求服务器

>最近把阿里一个千万级 PV 的数据产品全部由 jQuery 的 $.ajax 迁移到 Fetch，上线一个多月以来运行非常稳定。结果证明，对于 IE8+ 以上浏览器，在生产环境使用 Fetch 是可行的。

由于 Fetch API 是基于 Promise 设计，有必要先学习一下 Promise，推荐阅读 MDN Promise 教程。旧浏览器不支持 Promise，需要使用 polyfill es6-promise 。

本文不是 Fetch API 科普贴，其实是讲异步处理和 Promise 的。Fetch API 很简单，看文档很快就学会了。推荐 MDN Fetch 教程 和 万能的WHATWG Fetch 规范

### Why Fetch

XMLHttpRequest 是一个设计粗糙的 API，不符合关注分离（Separation of Concerns）的原则，配置和调用方式非常混乱，而且基于事件的异步模型写起来也没有现代的 Promise，generator/yield，async/await 友好。

Fetch 的出现就是为了解决 XHR 的问题，拿例子说明：

使用 XHR 发送一个 json 请求一般是这样：
```js
var xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.responseType = 'json';

xhr.onload = function() {
  console.log(xhr.response);
};

xhr.onerror = function() {
  console.log("Oops, error");
};

xhr.send();
```
使用 Fetch 后，顿时看起来好一点
```js
fetch(url).then(function(response) {
  return response.json();
}).then(function(data) {
  console.log(data);
}).catch(function(e) {
  console.log("Oops, error");
});
```

使用 ES6 的 箭头函数 后：
```js
fetch(url).then(response => response.json())
  .then(data => console.log(data))
  .catch(e => console.log("Oops, error", e))

```

现在看起来好很多了，但这种 Promise 的写法还是有 Callback 的影子，而且 promise 使用 catch 方法来进行错误处理的方式有点奇怪。不用急，下面使用 async/await 来做最终优化：

>注：async/await 是非常新的 API，属于 ES7，目前尚在 Stage 1(提议) 阶段，这是它的完整规范。使用 Babel 开启 runtime 模式后可以把 async/await 无痛编译成 ES5 代码。也可以直接使用 regenerator 来编译到 ES5。

需安装babel插件：
```
	"babel-plugin-syntax-async-functions": "^6.5.0",
	"babel-plugin-syntax-class-properties": "^6.8.0",
	"babel-plugin-syntax-object-rest-spread": "^6.5.0",
	"babel-plugin-transform-async-to-generator": "^6.3.13",
	"babel-plugin-transform-class-properties": "^6.9.0",
	"babel-plugin-transform-object-rest-spread": "^6.5.0",
	"babel-plugin-transform-regenerator": "^6.9.0",
	"babel-plugin-transform-strict-mode": "^6.5.2",
	"babel-polyfill": "^6.9.1",
	"babel-preset-es2015": "^6.9.0",
```

异步调用：

```js
try {
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
} catch(e) {
  console.log("Oops, error", e);
}
>// 注：这段代码如果想运行，外面需要包一个 async function
```

duang~~ 的一声，使用 await 后，写异步代码就像写同步代码一样爽。await 后面可以跟 Promise 对象，表示等待 Promise resolve() 才会继续向下执行，如果 Promise 被 reject() 或抛出异常则会被外面的 try...catch 捕获。

Promise，generator/yield，await/async 都是现在和未来 JS 解决异步的标准做法，可以完美搭配使用。这也是使用标准 Promise 一大好处。最近也把项目中使用第三方 Promise 库的代码全部转成标准 Promise，为以后全面使用 async/await 做准备。

另外，Fetch 也很适合做现在流行的同构应用，有人基于 Fetch 的语法，在 Node 端基于 http 库实现了 node-fetch，又有人封装了用于同构应用的 isomorphic-fetch。

注：同构(isomorphic/universal)就是使前后端运行同一套代码的意思，后端一般是指 NodeJS 环境。
总结一下，Fetch 优点主要有：

- 语法简洁，更加语义化
- 基于标准 Promise 实现，支持 async/await
- 同构方便，使用 isomorphic-fetch

Fetch 启用方法

先看一下 Fetch 原生支持率：
![image](https://raw.githubusercontent.com/nydl/devnote/master/img/web-fetch.png)

原生支持率并不高，幸运的是，引入下面这些 polyfill 后可以完美支持 IE8+ ：

1. 由于 IE8 是 ES3，需要引入 ES5 的 polyfill: es5-shim, es5-sham
2. 引入 Promise 的 polyfill: es6-promise
3. 引入 fetch 探测库：fetch-detector
4. 引入 fetch 的 polyfill: fetch-ie8
5. 可选：如果你还使用了 jsonp，引入 fetch-jsonp
6. 可选：开启 Babel 的 runtime 模式，现在就使用 async/await

Fetch polyfill 的基本原理是探测是否存在 window.fetch 方法，如果没有则用 XHR 实现。这也是 github/fetch 的做法，但是有些浏览器（Chrome 45）原生支持 Fetch，但响应中有中文时会乱码，老外又不太关心这种问题，所以我自己才封装了 fetch-detector 和 fetch-ie8 只在浏览器稳定支持 Fetch 情况下才使用原生 Fetch。这些库现在 每天有几千万个请求都在使用，绝对靠谱 ！

终于，引用了这一堆 polyfill 后，可以愉快地使用 Fetch 了。但要小心，下面有坑：

### Fetch 常见坑

- Fetch 请求默认是不带 cookie 的，需要设置 fetch(url, {credentials: 'include'})
- 服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。

竟然没有提到 IE，这实在太不科学了，现在来详细说下 IE

IE 使用策略

- 所有版本的 IE 均不支持原生 Fetch，fetch-ie8 会自动使用 XHR 做 polyfill。但在跨域时有个问题需要处理。

IE8, 9 的 XHR 不支持 CORS 跨域，虽然提供 XDomainRequest，但这个东西就是玩具，不支持传 Cookie！如果接口需要权限验证，还是乖乖地使用 jsonp 吧，推荐使用 fetch-jsonp。如果有问题直接提 issue，我会第一时间解决。

### Fetch 和标准 Promise 的不足

由于 Fetch 是典型的异步场景，所以大部分遇到的问题不是 Fetch 的，其实是 Promise 的。ES6 的 Promise 是基于 Promises/A+ 标准，为了保持 简单简洁 ，只提供极简的几个 API。如果你用过一些牛 X 的异步库，如 jQuery(不要笑) 、Q.js 或者 RSVP.js，可能会感觉 Promise 功能太少了。

### 没有 Deferred

Deferred 可以在创建 Promise 时可以减少一层嵌套，还有就是跨方法使用时很方便。
ECMAScript 11 年就有过 Deferred 提案，但后来没被接受。其实用 Promise 不到十行代码就能实现 Deferred：es6-deferred。现在有了 async/await，generator/yield 后，deferred 就没有使用价值了。

### 没有获取状态方法：isRejected，isResolved

标准 Promise 没有提供获取当前状态 rejected 或者 resolved 的方法。只允许外部传入成功或失败后的回调。我认为这其实是优点，这是一种声明式的接口，更简单。

### 缺少其它一些方法：always，progress，finally

always 可以通过在 then 和 catch 里重复调用方法实现。finally 也类似。progress 这种进度通知的功能还没有用过，暂不知道如何替代。

### 不能中断，没有 abort、terminate、onTimeout 或 cancel 方法

Fetch 和 Promise 一样，一旦发起，不能中断，也不会超时，只能等待被 resolve 或 reject。幸运的是，whatwg 目前正在尝试解决这个问题 whatwg/fetch#27

### 资源

- [传统Ajax已死，Fetch永生](https://github.com/camsong/blog/issues/2)
- [WHATWG Fetch 规范](https://fetch.spec.whatwg.org/)
- [Fetch API 简介](http://bubkoo.com/2015/05/08/introduction-to-fetch/)
- [教你驯服 async](http://pouchdb.com/2015/03/05/taming-the-async-beast-with-es7.html)
- [阮一峰介绍 async](http://www.ruanyifeng.com/blog/2015/05/async.html)

最后

Fetch 替换 XHR 只是时间问题，现在看到国外很多新的库都默认使用了 Fetch。

最后再做一个大胆预测：由于 async/await 这类新异步语法的出现，第三方的 Promise 类库会逐渐被标准 Promise 替代，使用 polyfill 是现在比较明智的做法。


## UI框架

### WeUI

目前中国的前端开发主要以 微信为主，因此，微信提供的 WeUI 成为前端 H5自然成为开发首选。  

WeUI和同 FrozenUI都属于 差不多的 WeUi了，也是一个比较专一的框架，WeUI应该说比FrozenUI前者更专一，话说连个官网都不搞，所有答疑都在 gitHub Issues 解决了，这个框架极其简单，体积当然就不用说了，模块也就 7 个左右，不过体量虽然小做的却不错，口碑看 star 就够了，框架从 16/1/23 发版至今 github star 超过 9K,不过也不排除用户没地方发泄所以都跑到 git 上来，哈哈。

我的感觉：还比较年轻、轻量级的，出了不少第三方的扩展，基于VUE的，React的都有，我比较喜欢那个jQuery WeUI：https://github.com/lihongxun945/jquery-weui，如果单纯做基于微信的开发，我会选择这个！


Github：https://github.com/weui/weui
DEMO：http://weui.github.io/weui/
Star：9,237

引用

<link rel="stylesheet" href="https://res.wx.qq.com/open/libs/weui/0.4.2/weui.css">
<link rel="stylesheet" href="http://cdn.bootcss.com/weui/0.4.2/style/weui.min.css">

vue 版本
https://github.com/airyland/vux
react 版本
https://github.com/weui/react-weui
weui.js
https://github.com/progrape/weui.js

总结：看完微信设计团队设计的这套 DEMO，二话不说如果要做微信公众，这个二话不说必然是首选了。框架不好的地方简而言之就是框架本身应该就没考虑过让用户用到非微信的场景之下。

### SUI Mobile

主页：http://m.sui.taobao.org/
自述：轻量、小巧、精美的UI库，方便迅速搭建手机H5应用，也非常适合开发跨平台Web App。
开发团队：阿里巴巴共享业务事业部UED团队
Github：https://github.com/sdc-alibaba/SUI-Mobile
Demo：http://m.sui.taobao.org/demos/
兼容：兼容到 iOS 6+ 以及 Android 4.0+
基于 Framework7 进行开发，并参考 Ratchet、Fastclick 开源库。适合上传开发！

1. 引用静态资源
我们提供了CDN地址可以直接使用，并且强烈建议使用我们的CDN而不是下载到本地。
```
<link rel="stylesheet" href="http://g.alicdn.com/msui/sm/0.6.2/css/sm.min.css">
<script type='text/javascript' src='http://g.alicdn.com/sj/lib/zepto/zepto.min.js' charset='utf-8'></script>
<script type='text/javascript' src='http://g.alicdn.com/msui/sm/0.6.2/js/sm.min.js' charset='utf-8'></script>
```
如果你用到了拓展包中的组件，还需要引用extend扩展包，为减少请求数，可以使用阿里CDN的combo功能：
```
<link rel="stylesheet" href="http://g.alicdn.com/msui/sm/0.6.2/css/??sm.min.css,sm-extend.min.css">
<script type='text/javascript' src='http://g.alicdn.com/msui/sm/0.6.2/js/??sm.min.js,sm-extend.min.js' charset='utf-8'></script>
```

2. 调试代码
如果你希望在开发环境下可以调试代码，那么你可以这样引用未压缩的版本
```
<link rel="stylesheet" href="//g.alicdn.com/msui/sm/0.6.2/css/sm.css">
<script type='text/javascript' src='//g.alicdn.com/sj/lib/zepto/zepto.js' charset='utf-8'></script>
<script type='text/javascript' src='//g.alicdn.com/msui/sm/0.6.2/js/sm.js' charset='utf-8'></script>
<!--如果你用到了拓展包中的组件，还需要引用下面两个-->
<link rel="stylesheet" href="//g.alicdn.com/msui/sm/0.6.2/css/sm-extend.css">
<script type='text/javascript' src='//g.alicdn.com/msui/sm/0.6.2/js/sm-extend.js' charset='utf-8'></script>
```

Framework7

基于手机的基础 html框架  
Full Featured HTML Framework For Building iOS & Android Apps   
http://framework7.io
https://github.com/nolimits4web/Framework7

- 聊天示例：https://github.com/BelinChung/HiApp


### Bootstrap

Bootstrap 最知名的ui框架，pc、手机同时兼顾，适合做网站，缺点是文件比较大。  
界面标准，时间长了难免觉得 Bootstrap 美的让人烦躁， 但好在它的每个版本都会有很大的改变，不会让人觉得自己做的网站会跟很多网站撞脸。Bootstrap 的用法及其简单( 这也可能就是 Bootstrap 作者阅攻城士无数，了解他们痛的结果 )，以至于是个小前端都可以快速上手，几乎没什么学习成本。

官网：http://getbootstrap.com/
Github：https://github.com/twbs/bootstrap/

总结：Bootstrap 最大的优势就是它非常流行，流行就代表你有问题就有很多人帮你解决问题，就代表装逼它就是利器，还有就是界面比较和谐，容易上手，关注它的童鞋应该发现最新 V4 版也开始支持 FlexBox 布局，这是非常好的升级体验。 劣势是 class 命名不够语义化，并且各种缩写，以至于我离了文档就是个菜，最近开始整混合 APP，选框架的时候首选就是它，但之前搞 PC 一直没注意，后来搞混合右键属性看它的时候，瞬间一阵凉风袭来，Bootstrap 好小，小到我只好选择别的框架。

### AUI

第三个是最近刚起来的AUI，虽然作者声称是专为APICloud开发者设计的一套UI框架，但实际它还是解决了很多移动前端开发的普遍问题，是主要面向混合开发的 CSS 框架。看起来作者比较猖狂，各种高级 CSS3 遍地使用，这让我也不得不去查查这些个 CSS3 的兼容性。不负众望果然选的都是兼容不错的属性，哈哈了一顿激动从前辈手上大胆认识了几个好东西，并且框架还提供了聊天界面、计数列表等组件，解决了很多复杂的让我骂娘的布局，现在可以直接拿走就用。

Github：https://github.com/liulangnan/aui
官网：http://www.auicss.com/

总结：这个框架对我来说有个优点就是纯 CSS 框架，自己以前也就用过 Pure，自己有点 JS 能力，如果不是复杂的效果，找个纯 CSS 框架自己随便改改就可以，而现在 CSS3 也已经能够做到动画，效率、质量、高效全兼顾，所以还是选择了这种 CSS 框架。有一点觉得不满的是这框架的文档真的好那什么，说好的高大上呢。

### Amaze UI

妹子UI，最初使用它是因为本尊遇到了一个爱纠结细节设计士，有一次她跟我的字体较上真了，结果一句顶万句的 BOOS 夸了她，我只好根据她的想法去解决，结果最后找到了Amaze UI 框架( 我不介意你叫我懒淫 )，按照官方的话说就是 "基于社区开源项目构建的一个跨屏前端框架，以移动优先，从小屏到大屏，最终实现所有屏幕适配，适应移动互联潮流" 。但其实我就是看中它能解决国内浏览器存在的跨屏适配和兼容性问题。

官网：http://amazeui.org/
Github：https://github.com/amazeui/amazeui
所属公司：云适配 Star：6710

总结：Amaze UI 总的来说就是加入更多符合中国市场特性的元素，框架对跨屏、适配都做了的比较好的处理并且准备一了一系列的常用的网页组件，为减少搞兼容、适配各种敲键盘的加班狗们的工作时间做了不小的贡献。，框架还对中文排版优化，兼容中国本土主流浏览器、轻量化，不仅适用于桌面端，还更更适合移动端、包含一些封装好的Widgets。不过自也就我感觉 Amaze UI 文档是否有点太那什么了，比如 “人们不会在乎jQuery的那点流量。”，说实的在这真没啥，不过我从来不会说出来( 哈哈 )，代码和设计上感觉没太多突出的点。

### Frozen UI

第三个是Frozen UI，有段时间看到 QQ 瞬间高大上了，后来四处打听，原来 QQ 客服端也用了 HTML 混合开发，其中QQ会员前端就是用的 Frozen UI，并且这套框架开源，欣喜若狂耐不住心里的寂寞直接上手三下五除二试了一遍就开始试用，初体验的就是基础样式效果简单色调清爽，有个比较活跃的社区所以组件什么的也比较丰富。

Github：https://github.com/frozenui/frozenui

官网：http://frozenui.github.io/

作者： QQVIP FD Team Star：1,067

总结：如果拿 Frozen UI 配合一些如 APICloud 用来做混合 APP 感觉就太酷了，或者原生的火鸡们拿去嵌套在应用中做前端开发，并且这个框架对 android 2.3 +、ios 4.0 + 做了兼容，或者拿来做 Web app 也是极好的选择，不过要是放在微信里比这更合适的 WeUI 框架更是首选了，劣势的话从 UI 层面就可以看到了，谁让它是出生在QQ会员前端的呢。

### 引用文件

- jquery-weui.min.css 54k
- jquery-weui.min.js 56k
- zepto.min.js 25k
- jquery.min.js 90k
- weui.min.css 36k
- weui.min.js 14k
- bootstrape.js 37k
- bootstrape.css 123k
- sm.min.css 90k
- sm.min.js 119k

### 方案
  
- 不使用扩展组件的，只需 weui.css + weui.js = 50k
  可使用 weui 中的 13 个基础组件
- 使用扩展组件的，需 weui.css + jquery-weui.css + jquery-weui.js = 146k
  增加了 12 个扩展组件，包括 下拉刷新、滚动加载
- bootstrape方案，需 bootstrape.js + bootstrape.css = 160k
  bootstrape方案适合做pc及手机，纯手机，微信H5，推荐 weui方案。  
  bootstrape 没有包括 weui 扩展组件，需要这些组件，还需要加载其它库！
- 使用 淘宝的 sui，90+119=209

## bootstrape

- 中文样式说明：http://v3.bootcss.com/css/

全屏编辑
 * 光标详细讲解: http://blog.csdn.net/fudesign2008/article/details/7568263

## css 伪元素

- http://www.w3cplus.com/css3/learning-to-use-the-before-and-after-pseudo-elements-in-css.html

- 伪元素，就是创建的虚假元素，在 dom 中并不存在，自然也就不会改变 dom 结构！  
- 伪元素由 css 控制，呈现在页面上,一般用于常规css无法实现的特殊效果。
- 伪元素如果没有设置“content”属性，伪元素是无用的。 
- content属性值为空，可以当做一个内容很少的盒子。像这样:
	#example:before {
		content: "";
		display: block;
		width: 100px;
		height: 100px;
	}	
	然而，你不可以完全的移除content属性，如果你移除了，伪元素将不会起作用。
:before :after 伪元素，在元素之前、之后增加内容，通过增加内容及样式，达到对元素控制的目的

注意这些添加不会改变文档内容，不会出现在 DOM 中，不可复制，仅仅是在 CSS 渲染层加入。  

你也许注意到，你也可以用两个冒号(::before 和 ::after) 写伪元素，这个我以前讨论过的。简短的解释是，对于这两种语法没有什么不同，仅仅一点的不同是，伪元素(双冒号)，css3中的伪类是（单冒号）

最后就语法而言。从技术上讲，你可以普遍的应用伪元素，不是放在特殊的元素上，像这样：

:before {
  content: "#";
}	
虽然上面是有效的，但是它十分的没用。代码会在DOM里的每个元素的内容之前插入散列符号。即使你删除了<body>标签和它的所有内容，你仍会在页面上看见两个散列符号：一个在<html>里，另一个在<body>标签里，浏览器会自动创建哪一个。
插入内容的特点

正如前面提及的，插入的内容在页面的源码里是不可见的。只能在css里可见

同时，插入的元素在默认情况下是内联元素（或者，在html5中，在文本语义的类别里）。因此，为了给插入的元素赋予高度，填充，边距等等，你通常必须显式地定义它是一个块级元素。

在这个例子中，我高亮的样式将被应用到元素里插入到目标元素内容的前面和后面。

还要注意的是典型的CSS继承规则适用于插入的元素。例如，你有字体系列黑体，宋体，无衬线字体应用到body元素里，然后伪元素会像其他元素一样继承这些字体系列。

同样的，伪元素不会继承没有自然继承自父元素(如 padding and margins)的样式。
注入的内容将是有关联的目标元素的子元素，但它会被置于这个元素的任何内容的“前”或“后”。

这会是对如何设计伪元素的一个简要的说明，看我下面文本编辑器的这幅图


比较有用的是以下几个值：
a::after { content: "↗"; }
a:after { content:"(" attr(href) ")"; }  
h1:before { content: url(logo.png); }  
h2:before { counter-increment: chapter; content: "Chapter " counter(chapter) ". " }
.clear-fix { *overflow: hidden; *zoom: 1; }  
.clear-fix:after { display: table; content: ""; width: 0; clear: both; }    


## HTML5文件上传功能开发

>在网上找了一下，基本都是 ajax 实现上传，其中一个是 中国好声音客户端的代码，看起来似乎不错，需要 zepto.js！

>另外是纯粹 代码，看起来也很简单！
鄢爽自己写的是哪种，发出来看下，可以完善下用起来！
fetch 本身也是封装了 XHR，不过是用 promise封装了，但是在浏览器里面，promise使用似乎有困难，这样，对我们价值就不大！

>如果不用 zepto最好，这样页面打开速度快！如果非要使用，只能选择zepto，不要 jquery！

>另外，https://github.com/mailru/FileAPI 这个库等以后有空研究下，文件比较大，但是功能很强大，可以直接在浏览器里面对图片进行处理，目前暂时不考虑。

### 资源

- [fileAPI](https://github.com/mailru/FileAPI):功能强大，历史悠久，不过文件有些大。

Javascript
Mar 18 2013
好久没写博客了，最近在做中国好声音移动端项目的前端开发，之前完全没有接触过移动端项目的前端，所以还算是一个新人，要学的东西还有很多，特别是html5的一系列新的接口，确实方便了很多。
/*
**upload js
**author dongli
**date 2013.03.13
**1.获取上传文件大小，对上传文件的验证
**2.二次异步上传
**3.显示上传百分比,上传速度
*/
(function(doc){
	//缓存变量
	var uploadBtn = $('#file'),
		submitBtn = $('.submit'),
		error_type = $('#error'),
		error_problem = $('#error2'),
		abort = $('#abort'),
		warnsize = $('#warnsize'),
		progress_info = $('#progress_info'),
		progress = $('#progress'),
		progress_percent = $('#progress_percent'),
		b_transfered = $('#b_transfered'),
		speed = $('#speed'),
		remaining = $('#remaining'),
		upload_response = $('#upload_response');

	//定义变量
	var maxFileSize = 0,
		totalFileSize = 0,
		uploadedFileSize = 0,
		preloadedFileSize = 0,
		isSelected = 0;

	//controller控制层
	var controller = {
		//时间格式转换
		secondsToTime : function(secs){ 
		    var hr = Math.floor(secs / 3600);
		    var min = Math.floor((secs - (hr * 3600))/60);
		    var sec = Math.floor(secs - (hr * 3600) -  (min * 60));

		    if (hr < 10) {hr = "0" + hr; } 
		    if (min < 10) {min = "0" + min;}
		    if (sec < 10) {sec = "0" + sec;}
		    if (hr) {hr = "00";}
		    return hr + ':' + min + ':' + sec;
		},
		//数据格式转换
		bytesToSize : function(bytes){
			var sizes = ['Bytes', 'KB', 'MB'];
			if (bytes == 0) return 'n/a';
			var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
			return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
		},
		//隐藏提示信息
		hideTips : function(){
			error_type.hide();
			error_problem.hide();
			abort.hide();
			warnsize.hide();
		},
		fileSelect : function(){
			// $('').appendTo('#upload_photo');
			controller.hideTips();
			var uFile = document.getElementById('file').files[0];
			totalFileSize = uFile.size;
			//对上传文件类型进行判断
			var uType = uFile.name.toString().split('.')[uFile.name.toString().split('.').length - 1];
			var rFilter = /^(wmv|rm|rmvb|flv|avi|mov)$/i;
			if (! rFilter.test(uType)) {
			    error_type.show();
			    return false;
			}
			//对上传文件大小进行判断
			// if(totalFileSize > maxFileSize){
			// 	warnsize.show();
			// 	return false;
			// }
			isSelected = 1;
		},
		uploadData : function(){
			if(isSelected){
				$.ajax({
					type : 'post',
					url : '/i/video/upload/query/',
					data : {
						'size' : totalFileSize,
						'title' : $('input[name="title"]').val(),
						'desc' : $('input[name="desc"]').val(),
						'priv' : $('#pp_upload').attr('checked') ? 0 : 3
					},
					success : function(r){
						console.log(r);
						controller.uploadFile(r);
					},
					error : function(){
						error_problem.show();
						return false;
					}
				})
			}
			else
				return false;
		},
		uploadFile : function(r){
			var oXHR = new XMLHttpRequest();
			var vFD = new FormData(document.getElementById('upload_photo'));
			vFD.append('type',4);
			vFD.append('id',r.id);
			vFD.append('size',totalFileSize);     
			vFD.append('outType',3);     
			oXHR.upload.addEventListener('progress', controller.uploadProgress, false);//文件上传百分比的事件
			oXHR.addEventListener('load', controller.uploadFinish, false);//文件上传完成事件
			oXHR.addEventListener('error', controller.uploadError, false);//文件上传的错误事件
			oXHR.addEventListener('abort', controller.uploadAbort, false);//文件上传的异常事件
			oXHR.open('POST', r.vto);
			oXHR.send(vFD);

			progress_info.show();
			timer = setInterval(controller.uploadSpeed, 500);
		},
		uploadProgress : function(e){
			if (e.lengthComputable) {
			    var iPercentComplete = Math.round(e.loaded * 100 / e.total);

			    uploadedFileSize = e.loaded;
			    progress_percent.html(iPercentComplete.toString() + '%');
			    progress.css('width',iPercentComplete.toString() + '%');
			    b_transfered.html(controller.bytesToSize(e.loaded));
			    //到100%时等待完成
			    if (iPercentComplete == 100) {
			        upload_response.html("处理中，请等待...").show();
			    }
			} else {
			    progress.html('unable to compute');
			}
		},
		uploadSpeed : function(){
			var uploadNow = uploadedFileSize;
			var uploadDiff = uploadNow - preloadedFileSize;
			//当前上传量和之前上传量比较没有变化即返回
			if (uploadDiff == 0)
			    return false;
			preloadedFileSize = uploadNow;
			//Interval设置为500毫秒，所以要*2按1秒计算时间和速度
			uploadDiff *= 2;
			//剩余量除1秒内上传量即为剩余秒数
			var secondsRemaining = (totalFileSize - preloadedFileSize) / uploadDiff;
			var iSpeed = uploadDiff.toString() + 'B/s';
			if (uploadDiff > 1024 * 1024) {
			    iSpeed = (Math.round(uploadDiff * 100/(1024*1024))/100).toString() + 'MB/s';
			} else if (uploadDiff > 1024) {
			    iSpeed =  (Math.round(uploadDiff * 100/1024)/100).toString() + 'KB/s';
			}
			speed.html(iSpeed);
			remaining.html('|' + controller.secondsToTime(secondsRemaining));
		},	
		uploadFinish : function(){
			// upload_response.html(e.target.responseText).show();
			console.log(event.target.responseText);
			progress_percent.html('100%');
			progress.css('width','100%');
			remaining.html('| 00:00:00');
			upload_response.html("上传成功！").show();
			clearInterval(timer);
		},
		uploadError : function(){
			error_problem.show();
			clearInterval(timer);
		},
		uploadAbort : function(){
			abort.show();
			clearInterval(timer);
		}
	};

	//事件绑定
	var bindEvents = function(){
		uploadBtn.change(function(){
			controller.fileSelect();
		});
		submitBtn.click(function(){
			controller.uploadData();
			return false;
		});
	};

	//事件调用
	bindEvents();
})(document)

### 网上另一个例子

<!DOCTYPE html>
<html>
<head>
    <title>Upload Files using XMLHttpRequest - Minimal</title>
    <script type="text/javascript">
      function fileSelected() {
        var file = document.getElementById('fileToUpload').files[0];
        if (file) {
          var fileSize = 0;
          if (file.size > 1024 * 1024)
            fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
          else
            fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
          document.getElementById('fileName').innerHTML = 'Name: ' + file.name;
          document.getElementById('fileSize').innerHTML = 'Size: ' + fileSize;
          document.getElementById('fileType').innerHTML = 'Type: ' + file.type;
        }
      }
      function uploadFile() {
        var fd = new FormData();
        fd.append("fileToUpload", document.getElementById('fileToUpload').files[0]);
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", uploadProgress, false);
        xhr.addEventListener("load", uploadComplete, false);
        xhr.addEventListener("error", uploadFailed, false);
        xhr.addEventListener("abort", uploadCanceled, false);
        xhr.open("POST", "upload.do");//修改成自己的接口
        xhr.send(fd);
      }
      function uploadProgress(evt) {
        if (evt.lengthComputable) {
          var percentComplete = Math.round(evt.loaded * 100 / evt.total);
          document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
        }
        else {
          document.getElementById('progressNumber').innerHTML = 'unable to compute';
        }
      }
      function uploadComplete(evt) {
        /* 服务器端返回响应时候触发event事件*/
        alert(evt.target.responseText);
      }
      function uploadFailed(evt) {
        alert("There was an error attempting to upload the file.");
      }
      function uploadCanceled(evt) {
        alert("The upload has been canceled by the user or the browser dropped the connection.");
      }
    </script>
</head>
<body>
  <form id="form1" enctype="multipart/form-data" method="post" action="Upload.aspx">
    <div class="row">
      <label for="fileToUpload">Select a File to Upload</label><br />
      <input type="file" name="fileToUpload" id="fileToUpload" onchange="fileSelected();"/>
    </div>
    <div id="fileName"></div>
    <div id="fileSize"></div>
    <div id="fileType"></div>
    <div class="row">
      <input type="button" onclick="uploadFile()" value="Upload" />
    </div>
    <div id="progressNumber"></div>
  </form>
</body>
</html>

### 文件上传
/*
 * zxxFile.js 基于HTML5 文件上传的核心脚本 http://www.zhangxinxu.com/wordpress/?p=1923
 * by zhangxinxu 2011-09-12
*/

var ZXXFILE = {
	fileInput: null,				//html file控件
	dragDrop: null,					//拖拽敏感区域
	upButton: null,					//提交按钮
	url: "",						//ajax地址
	fileFilter: [],					//过滤后的文件数组
	filter: function(files) {		//选择文件组的过滤方法
		return files;	
	},
	onSelect: function() {},		//文件选择后
	onDelete: function() {},		//文件删除后
	onDragOver: function() {},		//文件拖拽到敏感区域时
	onDragLeave: function() {},	//文件离开到敏感区域时
	onProgress: function() {},		//文件上传进度
	onSuccess: function() {},		//文件上传成功时
	onFailure: function() {},		//文件上传失败时,
	onComplete: function() {},		//文件全部上传完毕时
	
	/* 开发参数和内置方法分界线 */
	
	//文件拖放
	funDragHover: function(e) {
		e.stopPropagation();
		e.preventDefault();
		this[e.type === "dragover"? "onDragOver": "onDragLeave"].call(e.target);
		return this;
	},
	//获取选择文件，file控件或拖放
	funGetFiles: function(e) {
		// 取消鼠标经过样式
		this.funDragHover(e);
				
		// 获取文件列表对象
		var files = e.target.files || e.dataTransfer.files;
		//继续添加文件
		this.fileFilter = this.fileFilter.concat(this.filter(files));
		this.funDealFiles();
		return this;
	},
	
	//选中文件的处理与回调
	funDealFiles: function() {
		for (var i = 0, file; file = this.fileFilter[i]; i++) {
			//增加唯一索引值
			file.index = i;
		}
		//执行选择回调
		this.onSelect(this.fileFilter);
		return this;
	},
	
	//删除对应的文件
	funDeleteFile: function(fileDelete) {
		var arrFile = [];
		for (var i = 0, file; file = this.fileFilter[i]; i++) {
			if (file != fileDelete) {
				arrFile.push(file);
			} else {
				this.onDelete(fileDelete);	
			}
		}
		this.fileFilter = arrFile;
		return this;
	},
	
	//文件上传
	funUploadFile: function() {
		var self = this;	
		if (location.host.indexOf("sitepointstatic") >= 0) {
			//非站点服务器上运行
			return;	
		}
		for (var i = 0, file; file = this.fileFilter[i]; i++) {
			(function(file) {
				var xhr = new XMLHttpRequest();
				if (xhr.upload) {
					// 上传中
					xhr.upload.addEventListener("progress", function(e) {
						self.onProgress(file, e.loaded, e.total);
					}, false);
		
					// 文件上传成功或是失败
					xhr.onreadystatechange = function(e) {
						if (xhr.readyState == 4) {
							if (xhr.status == 200) {
								self.onSuccess(file, xhr.responseText);
								self.funDeleteFile(file);
								if (!self.fileFilter.length) {
									//全部完毕
									self.onComplete();	
								}
							} else {
								self.onFailure(file, xhr.responseText);		
							}
						}
					};
		
					// 开始上传
					xhr.open("POST", self.url, true);
					xhr.setRequestHeader("X_FILENAME", file.name);
					xhr.send(file);
				}	
			})(file);	
		}	
			
	},
	
	init: function() {
		var self = this;
		
		if (this.dragDrop) {
			this.dragDrop.addEventListener("dragover", function(e) { self.funDragHover(e); }, false);
			this.dragDrop.addEventListener("dragleave", function(e) { self.funDragHover(e); }, false);
			this.dragDrop.addEventListener("drop", function(e) { self.funGetFiles(e); }, false);
		}
		
		//文件选择控件选择
		if (this.fileInput) {
			this.fileInput.addEventListener("change", function(e) { self.funGetFiles(e); }, false);	
		}
		
		//上传按钮提交
		if (this.upButton) {
			this.upButton.addEventListener("click", function(e) { self.funUploadFile(e); }, false);	
		} 
	}
};

### 一个依赖 zepto 的例子

div class="camera-area">
   <form enctype="multipart/form-data" method="post">
    <input type="file" name="fileToUpload" class="fileToUpload" accept="image/*" capture="camera"/>
     <div class="upload-progress"><span></span></div>
    </form>
   <div class="thumb"></div>
 </div>

 已经封装好的upload.js，依赖zepto

(function($) {
 $.extend($.fn, {
  fileUpload: function(opts) {
   this.each(function() {
    var $self = $(this);
    var doms = {
     "fileToUpload": $self.find(".fileToUpload"),
     "thumb": $self.find(".thumb"),
     "progress": $self.find(".upload-progress")
    };
    var funs = {
     //选择文件，获取文件大小，也可以在这里获取文件格式，限制用户上传非要求格式的文件
     "fileSelected": function() {
      var files = (doms.fileToUpload)[0].files;
      var count = files.length;
      for (var index = 0; index < count; index++) {
       var file = files[index];
       var fileSize = 0;
       if (file.size > 1024 * 1024)
        fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
       else
        fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
      }
      funs.uploadFile();
     },
     //异步上传文件
     uploadFile: function() {
      var fd = new FormData();//创建表单数据对象
      var files = (doms.fileToUpload)[0].files;
      var count = files.length;
      for (var index = 0; index < count; index++) {
       var file = files[index];
       fd.append(opts.file, file);//将文件添加到表单数据中
       funs.previewImage(file);//上传前预览图片，也可以通过其他方法预览txt
      }
      var xhr = new XMLHttpRequest();
      xhr.upload.addEventListener("progress", funs.uploadProgress, false);//监听上传进度
      xhr.addEventListener("load", funs.uploadComplete, false);
      xhr.addEventListener("error", opts.uploadFailed, false);
      xhr.open("POST", opts.url);
      xhr.send(fd);
     },
     //文件预览
     previewImage: function(file) {
      var gallery = doms.thumb;
      var img = document.createElement("img");
      img.file = file;
      doms.thumb.html(img);
      // 使用FileReader方法显示图片内容
      var reader = new FileReader();
      reader.onload = (function(aImg) {
       return function(e) {
        aImg.src = e.target.result;
       };
      })(img);
      reader.readAsDataURL(file);
     },
     uploadProgress: function(evt) {
      if (evt.lengthComputable) {
       var percentComplete = Math.round(evt.loaded * 100 / evt.total);
       doms.progress.html(percentComplete.toString() + '%');
      }
     },
     "uploadComplete": function(evt) {
      alert(evt.target.responseText)
     }
    };
    doms.fileToUpload.on("change", function() {
     doms.progress.find("span").width("0");
     funs.fileSelected();
    });
   });
  }
 });
})(Zepto);

调用方法：
$(".camera-area").fileUpload({
    "url": "savetofile.php",
    "file": "myFile"
   });
PHP部分：

<?php
if (isset($_FILES['myFile'])) {
  // Example:
  writeLog($_FILES);
  move_uploaded_file($_FILES['myFile']['tmp_name'], "uploads/" . $_FILES['myFile']['name']);
  echo 'successful';
}
function writeLog($log){
  if(is_array($log) || is_object($log)){
    $log = json_encode($log);
  }
  $log = $log."\r\n";
 
  file_put_contents('log.log', $log,FILE_APPEND);
}
?>

### base64

之前的移动端上传的方法，有些朋友测试说微信支持不是很好，还有部分安卓机也不支持，其实我已经有了另一个方法，但是例子还没整理出来，而联系我的很多朋友需要，所以就提前先发出来了，并且做一个简单的说明，就不做一个demo了。

<!doctype html> 
<html> 
<head> 
<meta charset="utf-8"> 
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"> 
<title>图片压缩</title> 
<style> 
body { margin:0; padding:0; } 
html { font-size:62.5%; } 

.imgzip { padding:1em; } 
.imgzip .itm { padding-bottom:1em; word-break:break-all; font-size:1.2rem; line-height:1.5em; } 
.imgzip .itm .tit { margin-bottom:.5em; background-color:#e71446; color:#FFF; padding:.5rem 1rem; border-radius:3px; } 
.imgzip .itm .cnt { padding:1rem; } 
.imgzip .itm .cnt img { display:block; max-width:100%; } 
.imgzip textarea { width:100%; height:20em; } 
</style> 
</head> 

<body> 
<script src="http://code.jquery.com/jquery-1.8.3.js"></script> 
<input type="file" accept="image/*;capture=camera" class="input"> 
<div class="imgzip"></div> 
<script> 
document.addEventListener('DOMContentLoaded', init, false); 

function init() { 
var u = new UploadPic(); 
u.init({ 
input: document.querySelector('.input'), 
callback: function (base64) { 
$.ajax({ 
url:"{:U('upload')}", 
data:{str:base64,type:this.fileType}, 
type:'post', 
dataType:'json', 
success:function(i){ 
alert(i.info); 
} 
}) 
}, 
loading: function () { 

} 
}); 
} 

function UploadPic() { 
this.sw = 0; 
this.sh = 0; 
this.tw = 0; 
this.th = 0; 
this.scale = 0; 
this.maxWidth = 0; 
this.maxHeight = 0; 
this.maxSize = 0; 
this.fileSize = 0; 
this.fileDate = null; 
this.fileType = ''; 
this.fileName = ''; 
this.input = null; 
this.canvas = null; 
this.mime = {}; 
this.type = ''; 
this.callback = function () {}; 
this.loading = function () {}; 
} 

UploadPic.prototype.init = function (options) { 
this.maxWidth = options.maxWidth || 800; 
this.maxHeight = options.maxHeight || 600; 
this.maxSize = options.maxSize || 3 * 1024 * 1024; 
this.input = options.input; 
this.mime = {'png': 'image/png', 'jpg': 'image/jpeg', 'jpeg': 'image/jpeg', 'bmp': 'image/bmp'}; 
this.callback = options.callback || function () {}; 
this.loading = options.loading || function () {}; 

this._addEvent(); 
}; 

/** 
* @description 绑定事件 
* @param {Object} elm 元素 
* @param {Function} fn 绑定函数 
*/ 
UploadPic.prototype._addEvent = function () { 
var _this = this; 

function tmpSelectFile(ev) { 
_this._handelSelectFile(ev); 
} 

this.input.addEventListener('change', tmpSelectFile, false); 
}; 

/** 
* @description 绑定事件 
* @param {Object} elm 元素 
* @param {Function} fn 绑定函数 
*/ 
UploadPic.prototype._handelSelectFile = function (ev) { 
var file = ev.target.files[0]; 

this.type = file.type 

// 如果没有文件类型，则通过后缀名判断（解决微信及360浏览器无法获取图片类型问题） 
if (!this.type) { 
this.type = this.mime[file.name.match(/\.([^\.]+)$/i)[1]]; 
} 

if (!/image.(png|jpg|jpeg|bmp)/.test(this.type)) { 
alert('选择的文件类型不是图片'); 
return; 
} 

if (file.size > this.maxSize) { 
alert('选择文件大于' + this.maxSize / 1024 / 1024 + 'M，请重新选择'); 
return; 
} 

this.fileName = file.name; 
this.fileSize = file.size; 
this.fileType = this.type; 
this.fileDate = file.lastModifiedDate; 

this._readImage(file); 
}; 

/** 
* @description 读取图片文件 
* @param {Object} image 图片文件 
*/ 
UploadPic.prototype._readImage = function (file) { 
var _this = this; 

function tmpCreateImage(uri) { 
_this._createImage(uri); 
} 

this.loading(); 

this._getURI(file, tmpCreateImage); 
}; 

/** 
* @description 通过文件获得URI 
* @param {Object} file 文件 
* @param {Function} callback 回调函数，返回文件对应URI 
* return {Bool} 返回false 
*/ 
UploadPic.prototype._getURI = function (file, callback) { 
var reader = new FileReader(); 
var _this = this; 

function tmpLoad() { 
// 头不带图片格式，需填写格式 
var re = /^data:base64,/; 
var ret = this.result + ''; 

if (re.test(ret)) ret = ret.replace(re, 'data:' + _this.mime[_this.fileType] + ';base64,'); 

callback && callback(ret); 
} 

reader.onload = tmpLoad; 

reader.readAsDataURL(file); 

return false; 
}; 

/** 
* @description 创建图片 
* @param {Object} image 图片文件 
*/ 
UploadPic.prototype._createImage = function (uri) { 
var img = new Image(); 
var _this = this; 

function tmpLoad() { 
_this._drawImage(this); 
} 

img.onload = tmpLoad; 

img.src = uri; 
}; 

/** 
* @description 创建Canvas将图片画至其中，并获得压缩后的文件 
* @param {Object} img 图片文件 
* @param {Number} width 图片最大宽度 
* @param {Number} height 图片最大高度 
* @param {Function} callback 回调函数，参数为图片base64编码 
* return {Object} 返回压缩后的图片 
*/ 
UploadPic.prototype._drawImage = function (img, callback) { 
this.sw = img.width; 
this.sh = img.height; 
this.tw = img.width; 
this.th = img.height; 

this.scale = (this.tw / this.th).toFixed(2); 

if (this.sw > this.maxWidth) { 
this.sw = this.maxWidth; 
this.sh = Math.round(this.sw / this.scale); 
} 

if (this.sh > this.maxHeight) { 
this.sh = this.maxHeight; 
this.sw = Math.round(this.sh * this.scale); 
} 

this.canvas = document.createElement('canvas'); 
var ctx = this.canvas.getContext('2d'); 

this.canvas.width = this.sw; 
this.canvas.height = this.sh; 

ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, this.sw, this.sh); 

this.callback(this.canvas.toDataURL(this.type)); 

ctx.clearRect(0, 0, this.tw, this.th); 
this.canvas.width = 0; 
this.canvas.height = 0; 
this.canvas = null; 
}; 
</script> 
</body> 
</html>
复制代码

这个也是把图片转成了base64去传送，个人不建议去用js改变图片的大小，建议裁切缩放还是PHP来做吧。

this.maxWidth = options.maxWidth || 800; 
this.maxHeight = options.maxHeight || 600; 
this.maxSize = options.maxSize || 3 * 1024 * 1024; 
this.input = options.input; 
this.mime = {'png': 'image/png', 'jpg': 'image/jpeg', 'jpeg': 'image/jpeg', 'bmp': 'image/bmp'};
复制代码

这一部分是对上传图片的配置，应该可以看懂，可以自己去改

$.ajax({ 
url:"{:U('upload')}", 
data:{str:base64,type:this.fileType}, 
type:'post', 
dataType:'json', 
success:function(i){ 
alert(i.info); 
}
复制代码



这部分是上传以后ajax发送base64码到php,
base64码带有图片的说明字符串，所以得用正则去掉，然后base64解码保存到图片的文件中。并且返回地址即可



原文来自：http://a3147972.blog.51cto.com/2366547/1554698

### 读取裁剪图片上传

https://segmentfault.com/a/1190000000754560


### 七牛 package.json

{
  "private": true,
  "engines": {
    "node": ">=5.0 <6",
    "npm": ">=3.3 <4"
  },
  "dependencies": {},
  "devDependencies": {
    "assets-webpack-plugin": "^3.3.0",
    "autoprefixer": "^6.3.1",
    "babel-cli": "^6.5.1",
    "babel-eslint": "^4.1.8",
    "babel-jest": "^6.0.1",
    "babel-loader": "^6.2.2",
    "babel-plugin-react-transform": "^2.0.0",
    "babel-plugin-transform-runtime": "^6.5.0",
    "babel-preset-es2015": "^6.5.0",
    "babel-preset-react": "^6.5.0",
    "babel-preset-stage-0": "^6.5.0",
    "babel-runtime": "5.8.35",
    "bluebird": "^3.2.2",
    "bootstrap-material-design": "^0.5.8",
    "browser-sync": "^2.11.1",
    "codemirror": "^5.12.0",
    "css-loader": "^0.23.1",
    "csscomb": "^3.1.8",
    "del": "^2.2.0",
    "echarts": "^3.0.2",
    "eslint": "^1.10.3",
    "eslint-config-airbnb": "^5.0.0",
    "eslint-plugin-react": "^3.16.1",
    "expect": "^1.14.0",
    "extend": "^3.0.0",
    "file-loader": "^0.8.5",
    "gaze": "^0.5.2",
    "halogen": "^0.1.10",
    "history": "^1.17.0",
    "isomorphic-style-loader": "0.0.8",
    "istanbul-instrumenter-loader": "^0.2.0",
    "jasmine": "^2.4.1",
    "jest-cli": "^0.8.2",
    "jquery": "^2.2.0",
    "jscs": "^2.9.0",
    "json-loader": "^0.5.4",
    "karma": "^0.13.21",
    "karma-babel-preprocessor": "^6.0.1",
    "karma-chrome-launcher": "^0.2.2",
    "karma-cli": "^0.1.2",
    "karma-coverage": "^0.5.3",
    "karma-jasmine": "^0.3.7",
    "karma-mocha": "^0.2.2",
    "karma-phantomjs-launcher": "^1.0.0",
    "karma-sourcemap-loader": "^0.3.7",
    "karma-spec-reporter": "0.0.24",
    "karma-webpack": "^1.7.0",
    "less": "^2.6.0",
    "less-loader": "^2.2.2",
    "lodash": "3.10.1",
    "mkdirp": "^0.5.1",
    "mocha": "^2.4.5",
    "moment": "^2.11.2",
    "ncp": "^2.0.0",
    "nprogress": "^0.2.0",
    "phantomjs-polyfill": "0.0.1",
    "phantomjs-prebuilt": "^2.1.4",
    "postcss": "^5.0.14",
    "postcss-import": "^8.0.2",
    "postcss-loader": "^0.8.0",
    "postcss-scss": "^0.1.3",
    "precss": "^1.4.0",
    "raw-loader": "^0.5.1",
    "react": "^0.14.7",
    "react-bootstrap": "^0.28.3",
    "react-codemirror": "^0.2.5",
    "react-dom": "^0.14.7",
    "react-jade": "^2.5.0",
    "react-router": "^1.0.3",
    "react-transform-catch-errors": "^1.0.2",
    "react-transform-hmr": "^1.0.2",
    "react-with-context": "^1.0.2",
    "redbox-react": "^1.2.2",
    "replace": "^0.3.0",
    "style-loader": "^0.13.0",
    "tcomb-form": "^0.8.2",
    "url-loader": "^0.5.7",
    "webpack": "^1.12.14",
    "webpack-hot-middleware": "^2.6.4",
    "webpack-middleware": "^1.4.0",
    "wkc-react-jade-loader": "^0.1.0"
  },
  "scripts": {
    "lint": "eslint src tools || jscs src tools",
    "csslint": "csscomb src/components --lint --verbose",
    "csscomb": "csscomb src/components --verbose",
    "test": "karma  start --single-run  --browsers PhantomJS",
    "testwatch": "karma  start",
    "clean": "babel-node tools/run clean",
    "copy": "babel-node tools/run copy",
    "bundle": "babel-node tools/run bundle",
    "build": "babel-node tools/run build",
    "release": "babel-node tools/run build --release",
    "start": "babel-node tools/run start",
    "profile": "babel-node   ./node_modules/.bin/webpack  --config tools/webpack.config.js --colors --profile --display-modules  --display-error-details",
    "fix": "jscs  -x src || eslint  --fix src"
  }
}
wangkechunwangkechun 2楼•3 个月前
这个是基于angular和gulp的。

{
  "name": "hello world",
  "version": "0.0.0",
  "dependencies": {
    "angular-animate": "~1.5.0",
    "angular-cookies": "~1.5.0",
    "angular-touch": "~1.5.0",
    "angular-sanitize": "~1.5.0",
    "angular-messages": "~1.5.0",
    "angular-aria": "~1.5.0",
    "angular-marked": "~0.0.21",
    "jquery": "~2.1.4",
    "angular-ui-router": "~0.2.15",
    "bootstrap": "~3.3.5",
    "angular-bootstrap": "~0.13.4",
    "moment": "~2.10.6",
    "animate.css": "~3.4.0",
    "angular": "~1.5.0",
    "highcharts": "highcharts-release#~4.1.9",
    "angular-local-storage": "~0.2.3",
    "AngularJS-Toaster": "angularjs-toaster#~0.4.16",
    "lodash": "~3.10.1",
    "highcharts-ng": "~0.0.11",
    "angularjs-color-picker": "~0.6.11",
    "tinycolor": "~1.3.0",
    "ng-file-upload": "~10.1.0",
    "angular-progress-arc": "~1.0.0",
    "ng-clip": "~0.2.6",
    "highlightjs": "~9.0.0",
    "perfect-scrollbar": "~0.6.8",
    "angulartics-google-analytics": "~0.1.3",
    "morrisjs": "~0.5.1",
    "ui-select": "git@github.com:angular-ui/ui-select.git#~0.13.2",
    "angular-qr": "~0.2.0",
    "angular-file-saver": "~1.0.2"
  },
  "devDependencies": {
    "angular-mocks": "~1.5.0"
  },
  "overrides": {
    "bootstrap": {
      "main": [
        "less/bootstrap.less",
        "dist/fonts/glyphicons-halflings-regular.eot",
        "dist/fonts/glyphicons-halflings-regular.svg",
        "dist/fonts/glyphicons-halflings-regular.ttf",
        "dist/fonts/glyphicons-halflings-regular.woff",
        "dist/fonts/glyphicons-halflings-regular.woff2"
      ]
    },
    "moment": {
      "main": [
        "moment.js",
        "locale/zh-cn.js"
      ]
    }
  },
  "resolutions": {
    "angular": "~1.5.0",
    "angular-local-storage": "~0.2.3",
    "jquery": "~2.1.4",
    "angulartics": "~1.0.0"
  }
}

