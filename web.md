<meta http-equiv="content-type" content="text/html; charset=UTF-8">

<link href="css/markdown.css" rel="stylesheet" />

<link href="css/prettify.css" rel="stylesheet" />

<script src="http://apps.bdimg.com/libs/jquery/2.0.3/jquery.min.js"></script>

<script src="js/prettify.js"></script>  

WEB前端设计
=========

全局安装

gulp-cli `npm install -g gulp-cli`  
webpack
grunt-cli
eslint
marked
react-native-cli

less
regenerator
typescript
typings



>主要面向手机、微信的H5前端设计。  

1 http://ehire.51job.com/Candidate/ResumeView.aspx?hidUserID=346397956&hidEvents=23&hidKey=ee30c7ab76a18eef6dd20ce9e8155b21

2 http://ehire.51job.com/Candidate/ResumeView.aspx?hidUserID=347793963&hidEvents=23&hidKey=7e843a50870f874991f0b842c8513d5c

3 http://ehire.51job.com/Candidate/ResumeView.aspx?hidUserID=344511766&hidEvents=23&hidKey=b1921157367128abb798bd58daf5ccf9

4 http://ehire.51job.com/Candidate/ResumeView.aspx?hidUserID=347727591&hidEvents=23&hidKey=873f4186929bb1915be31dcbdf182dc6

5 http://ehire.51job.com/Candidate/ResumeView.aspx?hidUserID=335916530&hidEvents=23&hidKey=c1d7be0c0eb8885e9b80d93572ce527c

6 http://ehire.51job.com/Candidate/ResumeView.aspx?hidUserID=329400501&hidEvents=23&hidKey=3a7eee1b867de443a9e85e1f9b219362

7 http://ehire.51job.com/Candidate/ResumeView.aspx?hidUserID=334083113&hidEvents=23&hidKey=22ad480393cbf72521f7fe9289b15c65

8 http://ehire.51job.com/Candidate/ResumeView.aspx?hidUserID=328783826&hidEvents=23&hidKey=5be45fa6aa6405bcab11887f1f778697

9 http://ehire.51job.com/Candidate/ResumeView.aspx?hidUserID=28484926&hidEvents=23&hidKey=75d76e02ccf5e8dbcc603d7be3b06fc6

10 http://ehire.51job.com/Candidate/ResumeView.aspx?hidUserID=338545301&hidEvents=23&hidKey=30f2f0e73d74d00941d7e997d0379671

11 http://ehire.51job.com/Candidate/ResumeView.aspx?hidUserID=326732746&hidEvents=23&hidKey=841ad4269535fcd4892752d58411aadd


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

- 微信jssdk http://res.wx.qq.com/open/js/jweixin-1.0.0.js

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
jquery
https://github.com/lihongxun945/jquery-weui

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
<!--如果你用到了拓展包中的组件，还需要引用下面-->
<link rel="stylesheet" href="//g.alicdn.com/msui/sm/0.6.2/css/sm-extend.css">

<script type='text/javascript' src='//g.alicdn.com/sj/lib/zepto/zepto.js' charset='utf-8'></script>
<script type='text/javascript' src='//g.alicdn.com/msui/sm/0.6.2/js/sm.js' charset='utf-8'></script>
<!--如果你用到了拓展包中的组件，还需要引用下面-->
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

第三个是最近刚起来的AUI，虽然作者声称是专为APICloud开发者设计的一套UI框架，但实际它还是解决了很多移动前端开发的普遍问题，是主要面向混合开发的 CSS 框架。看起来作者比较猖狂，各种高级 CSS3 遍地使用，这让我也不得不去查查这些个 CSS3 的兼容性。不负众望果然选的都

是兼容不错的属性，哈哈了一顿激动从前辈手上大胆认识了几个好东西，并且框架还提供了聊天界面、计数列表等组件，解决了很多复杂的让我骂娘的布局，现在可以直接拿走就用。

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


## 图片压缩

http://www.gbtags.com/gb/share/2991.htm
https://github.com/mhbseal/html5ImgCompress
https://github.com/Lzccug/ImageCompression
https://github.com/mailru/FileAPI



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

## ajax 跨域

一个资源会发起一个跨域HTTP请求(Cross-site HTTP request), 当它请求的一个资源是从一个与它本身提供的第一个资源的不同的域名时 。

比如说，域名A(http://domaina.example)的某 Web 应用程序中通过<img>标签引入了域名B(http://domainb.foo)站点的某图片资源(http://domainb.foo/image.jpg)，域名A的那 Web 应用就会导致浏览器发起一个跨站 HTTP 请求。在当今的 Web 开发中，使用跨站 HTTP 请求加载各类资源（包括CSS、图片、JavaScript 脚本以及其它类资源），已经成为了一种普遍且流行的方式。

正如大家所知，出于安全考虑，浏览器会限制脚本中发起的跨站请求。比如，使用 XMLHttpRequest 对象发起 HTTP 请求就必须遵守同源策略。 具体而言，Web 应用程序能且只能使用 XMLHttpRequest 对象向其加载的源域名发起 HTTP 请求，而不能向任何其它域名发起请求。为了能开发出更强大、更丰富、更安全的Web应用程序，开发人员渴望着在不丢失安全的前提下，Web 应用技术能越来越强大、越来越丰富。比如，可以使用 XMLHttpRequest 发起跨站 HTTP 请求。（这段描述跨域不准确，跨域并非浏览器限制了发起跨站请求，而是跨站请求可以正常发起，但是返回结果被浏览器拦截了。最好的例子是CSRF跨站攻击原理，请求是发送到了后端服务器无论是否跨域！注意：有些浏览器不允许从HTTPS的域跨域访问HTTP，比如Chrome和Firefox，这些浏览器在请求还未发出的时候就会拦截请求，这是一个特例。）

隶属于 W3C 的 Web 应用工作组( Web Applications Working Group )推荐了一种新的机制，即跨源资源共享（Cross-Origin Resource Sharing (CORS)）。这种机制让Web应用服务器能支持跨站访问控制，从而使得安全地进行跨站数据传输成为可能。需要特别注意的是，这个规范是针对API容器的。比如说，要使得 XMLHttpRequest 在现代浏览器中可以发起跨域请求。浏览器必须能支持跨源共享带来的新的组件，包括请求头和策略执行。同样，服务器端则需要解析这些新的请求头，并按照策略返回相应的响应头以及所请求的资源。这篇文章适用于网站管理员、服务器端程序开发人员以及前端开发人员。对于服务器端程序开发人员，还可以阅读补充材料 cross-origin sharing from a server perspective (with PHP code snippets) 。



- 跨域资源共享 http://www.cnblogs.com/yuzhongwusan/p/3677955.html
- HTTP访问控制(CORS) https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS

跨域访问需在服务返回页面的 Header 中添加如下参数：  
Access-Control-Allow-Origin: *

云服务器一般都支持 跨域设置  

如 腾讯云的设置：

- Allow-Origin 许可的访问来源，支持一条规则中匹配多个来源域名，每行填写一行域名。
  例如：http://image.qq.com 或 http://*.qq.com
  也支持单条通配符 * 这样将许可所有来源的请求。当 Origin 配置许可所有来源时，Allow-Credentials 选项不可以勾选为 True。
- Allow-Method 指明资源可以被请求的方式有哪些（一个或者多个）。
  例如：PUT 和 POST
- Allow-Credentials 为 True 时，响应带凭证（HTTP Cookies 和验证信息）的请求，否则响应会被忽略。
  当来源 Origin 不限时（即配置为 *）则不应当勾选该选项。
- Allow-Headers(可选) 在发送 OPTIONS 请求时告知服务端，接下来的请求可以使用哪些自定义的 HTTP 请求头部。
  例如：x-cos-meta-md5
- Expose-Headers(可选) 设置浏览器可以接收到的来自服务器端的自定义头部信息。
  例如：x-cos-acl
- Max-Age 设置 OPTIONS 请求得到结果的有效期。
  例如：600

当配置了 Allow-Origin 为 * 时，试图发出一个 GET 请求和得到的回应情况。
  <
  GET /resources/public-data/ HTTP/1.1
  Host: bar.other
  Connection: keep-alive
  Referer: http://foo.example/examples.html
  Origin: http://foo.example
  >
  HTTP/1.1 200 OK
  Connection: Keep-Alive
  Access-Control-Allow-Origin: *
  [data]


CORS其实出现时间不短了，它在维基百科上的定义是：跨域资源共享（CORS ）是一种网络浏览器的技术规范，它为Web服务器定义了一种方式，允许网页从不同的域访问其资源。而这种访问是被同源策略所禁止的。CORS系统定义了一种浏览器和服务器交互的方式来确定是否允许跨域请求。 它是一个妥协，有更大的灵活性，但比起简单地允许所有这些的要求来说更加安全。

        而W3C的官方文档目前还是工作草案，但是正在朝着W3C推荐的方向前进。

        简言之，CORS就是为了让AJAX可以实现可控的跨域访问而生的。

以往的解决方案

        以前要实现跨域访问，可以通过JSONP、Flash或者服务器中转的方式来实现，但是现在我们有了CORS。

        CORS与JSONP相比，无疑更为先进、方便和可靠。

        1、 JSONP只能实现GET请求，而CORS支持所有类型的HTTP请求。

        2、 使用CORS，开发者可以使用普通的XMLHttpRequest发起请求和获得数据，比起JSONP有更好的错误处理。

        3、 JSONP主要被老的浏览器支持，它们往往不支持CORS，而绝大多数现代浏览器都已经支持了CORS（这部分会在后文浏览器支持部分介绍）。

详细内容

        要使用CORS，我们需要了解前端和服务器端的使用方法。

        1、  前端

        以前我们使用Ajax，代码类似于如下的方式：

 

var xhr = new XMLHttpRequest();  
xhr.open("GET", "/hfahe", true);  
xhr.send();  
 

        这里的“/hfahe”是本域的相对路径。

        如果我们要使用CORS，相关Ajax代码可能如下所示：

 

var xhr = new XMLHttpRequest();  
xhr.open("GET", "http://blog.csdn.net/hfahe", true);  
xhr.send();  
 

        请注意，代码与之前的区别就在于相对路径换成了其他域的绝对路径，也就是你要跨域访问的接口地址。

        我们还必须提供浏览器回退功能检测和支持，避免浏览器不支持的情况。

function createCORSRequest(method, url) {  
  var xhr = new XMLHttpRequest();  
  if ("withCredentials" in xhr) {  
    // 此时即支持CORS的情况  
    // 检查XMLHttpRequest对象是否有“withCredentials”属性  
    // “withCredentials”仅存在于XMLHTTPRequest2对象里  
    xhr.open(method, url, true);  
   
  } else if (typeof!= "undefined") {  
   
    // 否则检查是否支持XDomainRequest，IE8和IE9支持  
    // XDomainRequest仅存在于IE中，是IE用于支持CORS请求的方式  
    xhr = new XDomainRequest();  
    xhr.open(method, url);  
   
  } else {  
   
    // 否则，浏览器不支持CORS  
    xhr = null;  
   
  }  
  return xhr;  
}  
   
var xhr = createCORSRequest('GET', url);  
if (!xhr) {  
  throw new Error('CORS not supported');  
}  
        现在如果直接使用上面的脚本进行请求，会看到浏览器里控制台的报错如下：

错误显示的很明显，这是因为我们还未设置Access-Control-Allow-Origin头。

        2、  服务器

        服务器端对于CORS的支持，主要就是通过设置Access-Control-Allow-Origin来进行的。如果浏览器检测到相应的设置，就可以允许Ajax进行跨域的访问。

        HTTP 头的设置方法有很多，http://enable-cors.org/这篇文章里对各种服务器和语言的设置都有详细的介绍，下面我们主要介绍Apache和PHP里的设置方法。

        Apache：Apache需要使用mod_headers模块来激活HTTP头的设置，它默认是激活的。你只需要在Apache配置文件的<Directory>, <Location>, <Files>或<VirtualHost>的配置里加入以下内容即可：

 

Header set Access-Control-Allow-Origin *  
 

        PHP：只需要使用如下的代码设置即可。

 

<?php  
 header("Access-Control-Allow-Origin:*");  
 

        以上的配置的含义是允许任何域发起的请求都可以获取当前服务器的数据。当然，这样有很大的危险性，恶意站点可能通过XSS攻击我们的服务器。所以我们应该尽量有针对性的对限制安全的来源，例如下面的设置使得只有http://blog.csdn.net这个域才能跨域访问服务器的API。

 

Access-Control-Allow-Origin: http://blog.csdn.net  
 

浏览器支持情况



        上图为各浏览器对于CORS的支持情况（绿色为支持，数据来源：http://caniuse.com/cors），看起来相当乐观。主流浏览器都已基本提供对跨域资源共享的支持，所以，CORS才会在国外使用的如此普遍。

        上文曾经提到，IE8和IE9在某种程度上可以通过XDomainRequest来提供同样功能的支持。

使用案例

        目前国外支持CORS的平台有很多，例如：



 

        Google APIClient Library for JS

        Google CloudStorage



 

        Face.com API

未来

        从所有的浏览器都支持来看，CORS将成为未来跨域访问的标准解决方案。无论是自己服务器间的跨域访问，还是开放平台为第三方提供API，都将采用这种统一的解决方案，因为它简单、高效，受到所有主流浏览器的支持。它非常重要，也会让我们的网络变得更加开放。

参考文章

        IE10中的CORS forXHR

        USING CORS

        原创文章，转载请注明：来自蒋宇捷的博客（http://blog.csdn.net/hfahe）

## XMLHttpRequest 2

XMLHttpRequest 对象用于通过 js 与服务器交换数据，浏览器的Ajax实际上都是借助XMLHttpRequest实现的。  
2.0 在 1.0 的基础上增加了更多的数据类型，最重要的就是文件、二进制上传的支持。

XMLHttpRequest 对象是开发者的梦想，因为您能够：

- 在不重新加载页面的情况下更新网页
- 在页面已加载后从服务器请求数据
- 在页面已加载后从服务器接收数据
- 在后台向服务器发送数据
- 所有现代的浏览器都支持 XMLHttpRequest 对象。

参考

- http://www.zhangxinxu.com/wordpress/2013/10/understand-domstring-document-formdata-blob-file-arraybuffer/

### get方法

xmlhttp.open("GET",url,true);
xmlhttp.send(null);

### post方法

xhr.open('POST', url, true);
// xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.send(data);
  
### 同步还是异步

为什么使用 Async=true ？
我们的实例在 open() 的第三个参数中使用了 "true"。
该参数规定请求是否异步处理。
True 表示脚本会在 send() 方法之后继续执行，而不等待来自服务器的响应。
onreadystatechange 事件使代码复杂化了。但是这是在没有得到服务器响应的情况下，防止代码停止的最安全的方法。
通过把该参数设置为 "false"，可以省去额外的 onreadystatechange 代码。如果在请求失败时是否执行其余的代码无关紧要，那么可以使用这个参数。

### DOMString和Document数据类型

XMLHttpRequest由于就两个数据类型：DOMString和Document，且并不是100%听话。为了顺应时代的潮流，XMLHttpRequest升级到2.0，增加了一下新的数据类型：

- FormData
- Blob
- File
- ArrayBuffer

也就是在XMLHttpRequest Level 2背景下，我们Ajax可以发送任意这些类型的数据。

### DOMString

实际上，在JavaScript中，DOMString就是String。规范解释说DOMString指的是UTF-16字符串，而JavaScript正是使用了这种编码的字符串，因此，在Ajax中，DOMString就等同于JS中的普通字符串。

大家应该都与XMLHttpRequest中数据返回属性之responseText打过交道吧，这厮就是与DOMString数据类型发生关系的，表明返回的数据是常规字符串。

### Document

如果单纯看Document对象，则解释很多，在这里，我们只要关注下图标注的这一个：responseXML

可以看到，实际上就是XMLHttpRequest中数据返回属性之responseXML，也就是可以解析为XML的数据。因此，这里的Document数据类似你就可以近似看成XML数据类型。

### FormData对象

利用FormData对象，我们可以通过JavaScript用一些键值对来模拟一系列表单控件，我们还可以使用XMLHttpRequest的send()方法来异步的提交这个”表单”。比起普通的ajax, 使用FormData的最大优点就是我们可以异步上传一个二进制文件。

以上为官方口吻的解释，略抽象。我们应该都用过jQuery，其中有个方法叫做serialize(), 作用就是表单序列化，也就是以查询字符串形式获得类表单post/get的数据给Ajax请求，例如：userid=123&username=zxx.

FormData对象的作用就类似于这里的serialize()方法，不过FormData是浏览器原生的，且支持二进制文件。


家臣之Blob数据对象
一个Blob对象就是一个包含有只读原始数据的类文件对象。Blob对象中的数据并不一定得是JavaScript中的原生形式。File接口基于Blob, 继承了Blob的功能，并且扩展支持了用户计算机上的本地文件。

创建Blob对象的方法有几种，可以调用Blob构造函数，还可以使用一个已有Blob对象上的slice()方法切出另一个Blob对象，还可以调用canvas对象上的toBlob方法。

以上为MDN上官方口吻的解释。实际上，Blob是计算机界通用术语之一，全称写作：BLOB (binary large object)，表示二进制大对象。MySql/Oracle数据库中，就有一种Blob类型，专门存放二进制数据。

在实际Web应用中，Blob更多是图片二进制形式的上传与下载，虽然其可以实现几乎任意文件的二进制传输。

举个例子，使用Blob从服务器上GET某mm的图片（只要关心标红的部分）：

var xhr = new XMLHttpRequest();    
xhr.open("get", "mm1.jpg", true);
xhr.responseType = "blob";
xhr.onload = function() {
    if (this.status == 200) {
        var blob = this.response;  // this.response也就是请求的返回就是Blob对象
        var img = document.createElement("img");
        img.onload = function(e) {
          window.URL.revokeObjectURL(img.src); // 清除释放
        };
        img.src = window.URL.createObjectURL(blob);
        eleAppend.appendChild(img);    
    }
}
xhr.send();
您可以狠狠地点击这里：Blob获取图片并二进制显示demo

我们查看demo页面这个mm图片元素，会发现其URL地址既不是传统HTTP，也不是Base64 URL，而是Blob形式~如下截图示意：
图片blob地址示意
demo页面图片的blob格式的URL

这就是Blob在Web开发中非常重要的一个功能——创建Blob网址。上述代码涉及XMLHttpRequest 2一些重要知识点，以及window.URL相关技术，都是可以深入挖掘学习的部分，但，不是本文重点，以后有机会会细致阐述。

但是，并不是所有的图片都能以Blob形式请求，因为，毕竟是Ajax请求嘛，还是有一定的跨域限制。XMLHttpRequest 2虽然支持跨源资源共享(CORS)，但是，还是需要对Access-Control-Allow-Origin的设置，允许来自那个域名的这类请求，例如，允许本人的站点Blob请求你服务器上的图片资源，你可以设置：

Access-Control-Allow-Origin: http://zhangxinxu.com
要允许任何域向您提交请求，可以设置：

Access-Control-Allow-Origin: *
我们都知道CSS3的font-face属性，在Firefox浏览器下，如果字体文件跨域（包括跨子域），是显示不出来的，也是通过

Access-Control-Allow-Origin: *
设置解决。其实，本质是一样的。

由于权限原因，我的个人站点无法配置Access-Control-Allow-Origin，我测试了下，新浪微博的图片是无法二进制请求的，不过我的前东家，xiaomishu.com的图片都是可以Ajax请求并Blob显示的，悄悄告诉大家，是我当初动的手脚，(*^__^*) 嘻嘻……

属性
Blob对象有两个属性，参见下表：

属性名	类型	描述
size	unsigned long long(表示可以很大的数值)	Blob对象中所包含数据的大小。字节为单位。 只读。
type	DOMString	一个字符串，表明该Blob对象所包含数据的MIME类型。例如，上demo图片MIME类似就是”image/jpeg“. 如果类型未知，则该值为空字符串。 只读。
今天在微博上看到一个表单提交之前判断文件大小并作阻止的tip，实际上，就是使用的Blob对象的size属性。

构造函数
与FormData对象类似，Blob也有一个构造函数用法。语法如下：

Blob Blob(
  [可选] Array parts,
  [可选] BlobPropertyBag properties
);
例如：

var myBlob= new Blob(arrayBuffer);
其中，两个参数的含义是：

parts
一个数组，包含了将要添加到Blob对象中的数据。数组元素可以是任意多个的ArrayBuffer, ArrayBufferView(typed array), Blob, 或者DOMString对象。
properties
一个对象，设置Blob对象的一些属性。目前仅支持一个type属性，表示Blob的类型。
方法
Blob对象有个很重要的方法-slice()，作用是，可以实现文件的分割！

这个slice()有一段不堪回首的历史，不过现在大家不要关心。目前的slice()方法已经跟JS中数组啊，字符串的slice方法用法一致了。如下：

Blob slice(
  [可选] long long start,
  [可选] long long end,
  [可选] DOMString contentType
};
参数释义：

start
开始索引，可以为负数，语法类似于数组的slice方法。默认值为0.
end
结束索引，可以为负数，语法类似于数组的slice方法。默认值为最后一个索引。
contentType
新的Blob对象的MIME类型，这个值将会成为新的Blob对象的type属性的值，默认为一个空字符串。
显然，此方法返回的数据格式还是Blob对象，不过是指定范围复制的新的Blob对象。注意，如果start参数的值比源Blob对象的size属性值还大，则返回的Blob对象的size值为0，也就是不包含任何数据。

六、家臣之File对象
File顾名思意就是“文件”，通常而言，表示我们使用file控件(<input type="file">)选择的FileList对象，或者是使用拖拽操作搞出的DataTransfer对象。

这里的File对象也是二进制对象，因此，从属于Blob对象，Blob对象的一些属性与方法，File对象同样适合，且推荐使用Blob对象的属性与方法。

File对象自身也有一些属性与方法，但是，有些已经过时——不推荐使用，因此，当前很多HTML5 Ajax文件上传下载的教程中出现是属性和方法都是过时的，不要盲目Copy，请大家明辨！

属性

File.lastModifiedDate[只读]
文件对象最后修改的日期
File.name[只读]
文件对象的名称
File.fileName[只读] [过时不推荐使用]
文件对象的名称（请使用File.name代替）
File.fileSize[只读] [过时不推荐使用]
文件对象的大小（请使用Blob.size代替）
Blob.size[只读]
Blob对象包含数据的字节大小
Blob.type[只读]
一个字符串，表明该Blob对象所包含数据的MIME类型
方法

File.getAsBinary()[过时不推荐使用]
二进制形式返回文件数据（请使用FileReader对象的FileReader.readAsBinaryString()方法代替）
File.getAsDataURL()[过时不推荐使用]
返回文件data:URL编码字符串数据（请使用FileReader对象的FileReader.readAsDataURL()方法代替）
File.getAsText(string encoding)[过时不推荐使用]
以给定的字符串编码返回文件数据解释后的文本（请使用FileReader对象的FileReader.readAsText()方法代替）
Blob.size[只读]
Blob对象包含数据的字节大小
Blob.type[只读]
一个字符串，表明该Blob对象所包含数据的MIME类型。
上面有提到FileReader对象，这货是相当的有货，之前有人曾问我，如何将图片转换成Data base64 url格式，其中一个方法就是FileReader.readAsDataURL()方法（还有就是canvas元素的toDataURL()和toDataURLHD()方法），然与本文主旨无关，暂不赘述；如您有兴趣，页面底部有其相关知识点链接，可自行概览。

七、家臣之ArrayBuffer对象
//zxx:ArrayBuffer对象牵扯知识点非常多，这里仅接触肌肤，深入接触下次会专门再说下。

很术语的解释有：

ArrayBuffer表示二进制数据的原始缓冲区，该缓冲区用于存储各种类型化数组的数据。

ArrayBuffer是二进制数据通用的固定长度容器。

所谓术语，就是小白看不懂的解释语。我再用通俗语解释下，希望大家可以有点感性的认识：

术语中，提到“二进制”，我们脑中应该会出现01010111之类；提到“缓冲”，会联想到在线视频提前加载一部分视频的那个缓冲。但是，两个合起来，“二进制数据缓冲区”，脑补就不连贯了，焦虑产生~~

现在，听我的，上面概念全部扔掉。所谓ArrayBuffer就是个装着2进制数据的对象。或者想象成带了个名叫“缓冲”帽子的二进制数据。然后直接关联：ArrayBuffer ＝ 2进制。

上面＝表示关联，不是相等，诸位。

例如，我们设置Ajax请求的responseType为”arraybuffer“，我们去请求某mm图片，返回的response就是ArrayBuffer，就是个二进制对象。什么缓冲不缓冲的，千万别补脑这个。

如果还觉得概念抽象，可以看下面的具体认知：
大家可能玩过神器编辑器Sublime Text, 我们随便找张图片拖进去，会发现是类似下面这样子的代码：
Sublime Text图片16进制编码显示

Sublime Text以16进制的形式显示图片资源，ArrayBuffer的差别在于是二进制，因此，我们可以把ArrayBuffer的形体脑补成——上图的数字全是的0101 1000 1101之类的。Get it否？

上面提到的Blob对象也是二进制，那Blob和ArrayBuffer有啥区别呢？

Blob可以append ArrayBuffer数据，也就是Blob是个更高一级的大分类，类似领导的感觉。ArrayBuffer则是具有某种恶魔果实的尖兵。

ArrayBuffer存在的意义就是作为数据源提前写入在内存中，就是提前钉死在某个区域，长度也固定，万年不变。于是，当我们要处理这个ArrayBuffer中的二进制数据，例如，分别8位，16位，32位转换一遍，这个数据都不会变化，3种转换共享数据。

So，ArrayBuffer就是缓冲出来的打死不动的二进制对象。

注意，ArrayBuffer本身是不能读写的，需要借助类型化数组或DataView对象来解释原始缓冲区（宰割原始二进制数据）。

类型化数组
类型化数组(Typed Arrays)是JavaScript中新出现的一个概念，专为访问原始的二进制数据而生。

类型数组的类型有：

名称	大小 (以字节为单位)	说明
Int8Array

1

8位有符号整数

Uint8Array

1

8位无符号整数

Int16Array

2

16位有符号整数

Uint16Array

2

16位无符号整数

Int32Array

4

32位有符号整数

Uint32Array

4

32位无符号整数

Float32Array

4

32位浮点数

Float64Array

8

64位浮点数

本质上，类型化数组和ArrayBuffer是一样的。不过一个可读写（脱掉buffer限制），一个当数据源的命。

举一些代码例子，看看本质一致在何处：

// 创建一个8字节的ArrayBuffer  
var b = new ArrayBuffer(8);  
  
// 创建一个指向b的视图v1，采用Int32类型，开始于默认的字节索引0，直到缓冲区的末尾  
var v1 = new Int32Array(b);  
  
// 创建一个指向b的视图v2，采用Uint8类型，开始于字节索引2，直到缓冲区的末尾  
var v2 = new Uint8Array(b, 2);  
  
// 创建一个指向b的视图v3，采用Int16类型，开始于字节索引2，长度为2  
var v3 = new Int16Array(b, 2, 2);  
上面代码里变量的数据结构如下表所示：

变量	索引
 	字节（不可索引）
b=	0	1	2	3	4	5	6	7
 	类型数组
v1=	0	1
v2=	 	 	0	1	2	3	4	5
v3=	 	 	0	1	 	 
由于类型化数组直接访问固定内存，因此，速度很赞，比传统数组要快！因为普通Javascript数组使用的是Hash查找方式。同时，类型化数组天生处理二进制数据，这对于XMLHttpRequest 2、canvas、webGL等技术有着先天的优势。

DataView对象
DataView对象在可以在ArrayBuffer中的任何位置读取和写入不同类型的二进制数据。

用法语法如下：

var dataView = new DataView(DataView(buffer, byteOffset[可选], byteLength[可选]);
其中，buffer表示ArrayBuffer；byteOffset指缓冲区开始处的偏移量（以字节为单位）；byteLength指缓冲区部分的长度（以字节为单位）。

属性

buffer
表示ArrayBuffer
byteOffset
指缓冲区开始处的偏移量
byteLength
指缓冲区部分的长度
方法有很多，实际上，是有规律的，篇幅原因，也不是重点，就单纯露个脸：
getInt8, getUint8, getInt16, getUint16, getInt32, getUint32, getFloat32, getFloat64, setInt8, setUint8, setInt16, setUint16, setInt32, setUint32, setFloat32, setFloat64.

下面回到ArrayBuffer对象，ArrayBuffer对象自身也可以构造，跟上面的FormData, Blob对象类似，例如：

var buf = new ArrayBuffer(32);
语法为：

ArrayBuffer ArrayBuffer(length[可以很大数值]);
我们在控制台运行下new ArrayBuffer(32)，看看结果：
ArrayBuffer的属性和方法 张鑫旭-鑫空间-鑫生活

可以看到，其有一个byteLength属性，表示ArrayBuffer的长度，也可以说是大小；还有一个slice方法，语法如下：

ArrayBuffer slice(
  begin
  end[可选]
);
begin表示起始，end表示结束点。据说，Internet Explorer 10 以及iOS6-是没有该方法的。

综上，举个ArrayBuffer的实例吧，发送使用XMLhttpRequest发送ArrayBuffer数据：

function sendArrayBuffer() {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/server', true);
  xhr.onload = function(e) { ... };

  var uInt8Array = new Uint8Array([1, 2, 3]);

  xhr.send(uInt8Array.buffer);
}
使用了类型化数组，发送的是类型化数组(uInt8Array)的buffer属性，也就是ArrayBuffer对象。

over~

八、结束语
新技术层出不穷，我觉得吧，以后，行业的分支可能要更细了。比方说JS开发吧，可能就有JS UI交互开发工程师；JS Web开发工程师。因为，一个人想要完全hold住这么多的知识点，还真不是一般人能做到的。

刚开始写的时候，还想最后举个文件分割上传的例子，只可惜内容实在太多，加上去也会被湮没，于是作罢，决定有机会，专门讲下这个。还有FileReader可以独立讲一下，还有类型化数组也可以专门讲一下等。

学路漫漫，任重道远。文中若有致命的结论错误或疏忽的文字书写错误，都欢迎指正，不甚感谢。欢迎讨论，欢迎交流！

参考链接

https://developer.mozilla.org/zh-CN/docs/DOM/DOMString
https://developer.mozilla.org/en-US/docs/Web/API/document
https://developer.mozilla.org/zh-CN/docs/DOM/XMLHttpRequest/FormData
https://developer.mozilla.org/zh-CN/docs/DOM/Blob
https://developer.mozilla.org/en-US/docs/Web/API/File
https://developer.mozilla.org/en-US/docs/Web/API/FileReader
http://technet.microsoft.com/zh-cn/ie/br212474
https://developer.mozilla.org/en-US/docs/Web/API/ArrayBuffer
http://blog.csdn.net/hfahe/article/details/7421203
原创文章，转载请注明来自张鑫旭-鑫空间-鑫生活[http://www.zhangxinxu.com]
本文地址：http://www.zhangxinxu.com/wordpress/?p=3725


## FormData

通常我们提交（使用submit button）时，会把form中的所有表格元素的name与value组成一个queryString，提交到后台。这用jQuery的方法来说，就是serialize。但当我们使用Ajax提交时，这过程就要变成人工的了。因此，FormData对象的出现可以减少我们一些工作量。
FormData 可以很方便地将表单字段和它们的值建立成键和值对应的成对形式，然后通过 XMLHttpRequest 的 sent() 方法发送表格数据。

### 创建一个FormData对象

你可以先创建一个空的FormData对象,然后使用append()方法向该对象里添加字段,如下:

```js
var oMyForm = new FormData();

oMyForm.append("username", "Groucho");
oMyForm.append("accountnum", 123456); // 数字123456被立即转换成字符串"123456"

// fileInputElement中已经包含了用户所选择的文件
oMyForm.append("userfile", fileInputElement.files[0]);

var oFileBody = '<a id="a"><b id="b">hey!</b></a>'; // Blob对象包含的文件内容
var oBlob = new Blob([oFileBody], { type: "text/xml"});

oMyForm.append("webmasterfile", oBlob);

var oReq = new XMLHttpRequest();
oReq.open("POST", "http://foo.com/submitform.php");
oReq.send(oMyForm);

```

### FormData字段只有三种取值

- 字符串，数字等都会转为字符串
- file对象
- Blob对象

上面例子中，字段"userfile"和"webmasterfile"的值都包含了一个文件，通过 FormData.append()方法赋给字段"accountnum"的数字被自动转换为字符(字段的值可以是一个Blob对象,一个File对象,或者一个字符串,剩下其他类型的值都会被自动转换成字符串).

在上例中,我们创建了一个名为oMyForm的FormData对象,该对象中包含了名为"username", "accountnum", "userfile" 以及 "webmasterfile"的字段名,然后使用XMLHttpRequest的send()方法把这些数据发送了出去."webmasterfile"字段的值不是一个字符串,还是一个Blob对象.

### 使用HTML表单来初始化一个FormData对象

可以用一个已有的<form>元素来初始化FormData对象,只需要把这个form元素作为参数传入FormData构造函数即可:

```js
var newFormData = new FormData(someFormElement);
例如:

var formElement = document.getElementById("myFormElement");
var oReq = new XMLHttpRequest();
oReq.open("POST", "submitform.php");
oReq.send(new FormData(formElement));
```

你还可以在已有表单数据的基础上,继续添加新的键值对,如下:

```js
var formElement = document.getElementById("myFormElement");
formData = new FormData(formElement);
formData.append("serialnumber", serialNumber++);
oReq.send(formData);
```

你可以通过这种方式添加一些不想让用户编辑的固定字段,然后再发送.

### form的enctype属性

- application/x-www-form-urlencoded	
  默认属性，在发送前编码所有字符，实际测试，formdata没有使用这个值。
- multipart/form-data	
  不对字符编码。在使用包含文件上传控件的表单时，必须使用该值。formdata时，发现默认是这个值。
- text/plain	
  空格转换为 "+" 加号，但不对特殊字符编码。

发送文本form

```html
<form action="form_action.asp" enctype="text/plain">
  <p>First name: <input type="text" name="fname" /></p>
  <p>Last name: <input type="text" name="lname" /></p>
  <input type="submit" value="Submit" />
</form>
```


### 使用FormData对象发送文件

你还可以使用FormData来发送二进制文件.首先在HTML中要有一个包含了文件输入框的form元素:

```html
<form enctype="multipart/form-data" method="post" name="fileinfo">
  <label>Your email address:</label>
  <input type="email" autocomplete="on" autofocus name="userid" placeholder="email" required size="32" maxlength="64" /><br />
  <label>Custom file label:</label>
  <input type="text" name="filelabel" size="12" maxlength="32" /><br />
  <label>File to stash:</label>
  <input type="file" name="file" required />
</form>
<div id="output"></div>
<a href="javascript:sendForm()">Stash the file!</a>

```

然后你就可以使用下面的代码来异步的上传用户所选择的文件:

``` js
function sendForm() {
  var oOutput = document.getElementById("output");
  var oData = new FormData(document.forms.namedItem("fileinfo"));

  oData.append("CustomField", "This is some extra data");

  var oReq = new XMLHttpRequest();
  oReq.open("POST", "stash.php", true);
  oReq.onload = function(oEvent) {
    if (oReq.status == 200) {
      oOutput.innerHTML = "Uploaded!";
    } else {
      oOutput.innerHTML = "Error " + oReq.status + " occurred uploading your file.<br \/>";
    }
  };

  oReq.send(oData);
}
```

你还可以不借助HTML表单,直接向FormData对象中添加一个File对象或者一个Blob对象:
`data.append("myfile", myBlob);`

如果FormData对象中的某个字段值是一个Blob对象,则在发送http请求时,代表该Blob对象所包含文件的文件名的"Content-Disposition"请求头的值在不同的浏览器下有所不同,Firefox使用了固定的字符串"blob,"而Chrome使用了一个随机字符串.

你还可以使用jQuery来发送FormData,但必须要正确的设置相关选项:

```js
var fd = new FormData(document.getElementById("fileinfo"));
fd.append("CustomField", "This is some extra data");
$.ajax({
  url: "stash.php",
  type: "POST",
  data: fd,
  processData: false,  // 告诉jQuery不要去处理发送的数据
  contentType: false   // 告诉jQuery不要去设置Content-Type请求头
});
```

### 数据格式

使用 FormData发送数据，会发现与传统发送不一样，FormData提交格式的每个数据分三部分：

- 第一部分也就是第一行，表示“分界线(boundary)”
  二进制大文件分隔传输时候，就是使用这个分界线。在webkit核心中，使用“——WebKitFormBoundary”加16位随机Base64位编码的字符串作为分隔边界。根据Firebug的显示，Firefox中，似乎是使用很多个"-"加时间戳进行边界分隔的。这里的边界的作用比较单纯，可能就是把表单的这两个字段作为两个独立数据流传输。
- 第二部分也就是第二行，表示内容配置
  这里都是统一的form-data（因为是FormData对象格式提交的），然后紧跟着name键值。
- 第三部分就是第三行，表示传输的值
  如果为空，就是几个换行，后台看到的就是“\n\r\n\r”之类的。

在浏览器调试界面的 Headers或Post中可以看到发送的数据：

Request Headers：
Content-Type:multipart/form-data; boundary=----WebKitFormBoundarycJ8DqycKCKa14RtC

Request Payload：
------WebKitFormBoundarycJ8DqycKCKa14RtC
Content-Disposition: form-data; name="txTitle"

标题
------WebKitFormBoundarycJ8DqycKCKa14RtC
Content-Disposition: form-data; name="txSwipe"


------WebKitFormBoundarycJ8DqycKCKa14RtC
Content-Disposition: form-data; name="txName"

张三

### 后台数据获取

使用 body-parse，无法获取

FormData.delete
将一对键和值从 FormData 对象中删除。

formData.delete(username);
FormData.get
返回给定键的第一个值

formData.append('username', 'Justin');
formData.append('username', 'Chris');
formData.get(username);    // "Justin"
FormData.getAll
返回给定键的所有值

formData.append('username', 'Justin');
formData.append('username', 'Chris');
formData.get(username);    // ["Justin", "Chris"]
FormData.has
检查是否包含给定键，返回 true 或 false

formData.has(username);
FormData.set
设置给定键的值

formData.set(name, value);
formData.set(name, value, filename);


## 图像处理

大量使用的经典库 GM https://github.com/aheckmann/gm
  可写入文字
速度最快的库sharp https://github.com/lovell/sharp
  trim 切空白边
国人发布的库，使用简单 https://github.com/zhangyuanwei/node-images  
  不能写入文字！
人脸检测 https://github.com/peterbraden/node-opencv
  http://opencv.org/downloads.html
获取像素 https://github.com/scijs/get-pixels 
  nodejs读取图片像素 http://blog.csdn.net/dreamer2020/article/details/51678238
  Node.js 调用OpenCV 读取图像数据矩阵 http://www.cnblogs.com/thugasin/p/5181387.html


## 轮播图

### 参考

- [swipe](https://github.com/thebird/Swipe) 系统使用库，5705 star，很小，虽然比较旧，但是很实用！
- [weui 的 swiper](https://github.com/wechatui/swiper)功能不全！ 与 swipe类似！很小！
  商品详情使用的js库 45k https://github.com/jssor/slider
- sui 自带的 swiper，css、js 都非常大！
- 11628 star https://github.com/dimsemenov/PhotoSwipe
  100K以上！
- 8815 star https://github.com/nolimits4web/Swiper
  100K以上！

### 库

[swipe](https://github.com/thebird/Swipe) 系统使用库，5705 star，很小，虽然比较旧，但是很实用！
  修正了部分样式及初始化宽度
  图片做了居中处理，超出部分隐藏

### 页面

```html
      <!-- 轮播图 -->
      <div id='dvSwipe' class='swipe'>
        <div id='dvSwipeImg' class='swipe-wrap'>
        </div>
      </div>
```

### 样式

```css
// 轮播图
.swipe {
  overflow: hidden;
  visibility: hidden;
  position: relative;
  width: 100%;
  height: 100vw/1.5; // 默认高度
  margin:0 auto;
}
// 轮播图片套层
.swipe-wrap {
  overflow: hidden;
  position: relative;
  height:100%;
}

// 单张图片层,向左浮动
.swipe-wrap > div {
  float:left;
  height:100%;
  overflow: hidden;
  text-align: center;
  position: relative;
}
```

### 代码

```js
var swipeImg = ['img/meinv.jpg', 'img/lizhi.jpg', 'img/8.jpg'];

/**
 * 加载轮播图片
 */
function bindSwipImg(imgs) {
  const w = screen.width;
  const h =  parseInt(w) / WHR; // parseInt(w * 2 / 3);
  dvSwipe.style.width = w + 'px';
  dvSwipe.style.height = h + 'px';

  if (imgs) {
    for (let i = 0; i < imgs.length; i++) {
      const img = document.createElement('img');
      img.src = imgs[i];
      // img.width = window.screen.width; // device-width;
      img.height = h;
      img.width = h * img.naturalWidth / img.naturalHeight;
      const div = document.createElement('div');
      // div.width = window.screen.width; // device-width;
      div.appendChild(img);
      id('dvSwipeImg').appendChild(div);
    }
  } 
}

function startSwipe(imgs) {
  bindSwipImg(imgs);
  // alert(JSON.stringify(imgs));
  const sw = id('dvSwipe');
  window.swipe = new Swipe(sw, {
    // startSlide: 4,
    auto: 3000,
    continuous: true
    // disableScroll: true,
    // stopPropagation: true,
    // callback: function(index, element) {},
    // transitionEnd: function(index, element) {}
  });
}

function stopSwipe() {
  window.swipe.kill();
}
```

## 定位

position: 

- static 缺省静态定位，left、top、bottom、right 无效
- relative 相对定位，针对自己当前位置偏移 
- absolute 根据上层定位
- fixed 针对body定位

## 尺寸

getComputedStyle 获取当前元素所有最终使用的CSS属性值
三、getComputedStyle与style的区别
我们使用element.style也可以获取元素的CSS样式声明对象，但是其与getComputedStyle方法还有有一些差异的。

只读与可写
正如上面提到的getComputedStyle方法是只读的，只能获取样式，不能设置；而element.style能读能写，能屈能伸。
获取的对象范围
getComputedStyle方法获取的是最终应用在元素上的所有CSS属性对象（即使没有CSS代码，也会把默认的祖宗八代都显示出来）；而element.style只能获取元素style属性中的CSS样式。因此对于一个光秃秃的元素<p>，getComputedStyle方法返回对象中length属性值（如果有）就是190+(据我测试FF:192, IE9:195, Chrome:253, 不同环境结果可能有差异), 而element.style就是0。

## 下拉更新

实现类似今日头条的下拉更新。

网上搜索了，基本上都是用 [iScroll](http://iscrolljs.com/) 来实现！  
[github](https://github.com/cubiq/iscroll) star 7951，使用的人非常多！ 

另外一个方案是[jQuery weui](http://jqweui.com/extends#pull-to-refresh)原生实现了下拉更新。
https://github.com/lihongxun945/jquery-weui

由于整个UI框架采用了 sui，最终采用了 sui中的下拉刷新，不过没有使用整个 sm.js，而是将其中的相关代码摘出来，直接使用，整个文件大小不过几K而已！

原来版本使用了 300K 的css 及 js！  
优化后，不过 50K！


## 图片链接

将图片放入 a 标签内，实现图片链接。  

```js
        <div class="item" id="35341">
          <a class="img" hreft>
            <img id="img-3725850229" class="list_img lazy_load_img" style="min-height:190px" xzsrc="ok"
                 replacesrc="images/lazy_image.png" src="//image.xiaozhustatic1.com/12/6,0,67,7981,1800,1201,e673a649.jpg">
            <span class="nostar"></span>
            <span class="head">
              <img class="lazy_load_img" id="img-head-3725850229" xzsrc="ok" replacesrc="images/lazy_header.png"
                   src="//image.xiaozhustatic1.com/roundcrop/6/00,260,260,1,80,1/6,0,27,6452,281,281,c06a0c67.jpg">
            </span>
            <span class="price">¥<em>148</em>/晚</span>
          </a>
```

由于需要在图片上叠加更多元素，因此需要将a设置为 block 或 inline-block，相对定位，这样里面的元素可以使用绝对定位，控制位置。  
a 块状化后，会发现图片下面多了一行空白，影响元素定位。  
空白产生的原因是图片作为 inline元素，受vertical-align 和 line-height控制，而 vertical-align默认值是baseline, 也就是基线

对齐。而基线是什么，基线就是字母X（在这里实际是空白节点）的下边缘，而x除了有基线，还有高度，其高度底部比基线低，因此图片下面出现空白部分。  

去掉底部白边，只需将 line-height 设置为0 或 图片 block化即可。因为vertical-align对block元素无效。

```css
.item {
  position: relative;
  // margin-bottom: 80px;

  .img {
    position: relative;
    display: block; //table-cell;
    width: 100%;
    min-height: 190px;

    img {
      display: block;
    }

    .star, .nostar {
      position: absolute;
      background: url(../img/collect.png) no-repeat;
      width: 32px;
      height: 32px;
      top: 10px;
      right: 5px;
      z-index: 2;
    }

    .nostar {
      background: url(../img/no_collect.png) no-repeat;
      z-index: 2;
    }

    .price {
      position: absolute;
      left: 0px;
      bottom: 0px;
      text-align: center;
      padding: 0 12px;
      // background-color: #000;
      background-color: rgba(45,45,45,0.9);
      opacity: 0.8;
      height: 42px;
      line-height: 42px;
      display: inline-block;
      font-size: 14px;
      color: #fff;
      vertical-align: middle;
      em {
        font-size: 30px;
      }
    }

    .head {
      position: absolute;
      right: 10px;
      bottom: -28px;
      img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background-color: #fff;
        padding: 1px;
      }
    }
  }

```

## 水平居中

table-cell

flex box


## 垂直居中

flex box

margin:auto

transform: 

## 图标

http://ask.dcloud.net.cn/article/128

图标 icon mui
mui如何增加自定义icon图标

mui框架遵循极简原则，在icon图标集上也是如此，mui仅集成了原生系统中最常用的图标；其次，mui中的图标并不是图片，而是字体，至于为什么使用字体图标而不是图片，相信web开发者多少都有所了解，简单列举几条：


多个图标字体合成一个字体文件，避免每张图片都需要联网请求；

字体可任意缩放，而图片放大会失真、缩小则浪费像素；

可通过css任意改变颜色、设置阴影及透明效果；

http://iconfont.cn/
新浪账户登录
2152693077@weibo.oauth.com

在实际项目中，开发者难免会需要自定义图标，此时该如何操作呢？本文以阿里巴巴矢量图标库为例（同样的网站有很多，比如icomoon，欢迎热心用户分享其它平台的使用方法），介绍一种用户自定义图标的方法，假设我们要做一个电商项目，需要补充男装、女装、购物车三个图标，如下为分步实现操作；

登录

浏览器访问阿里巴巴矢量图标库官网，选择登录方式，可直接使用新浪微博账号登录；

搜索图标

在右上角搜索“男装”，会列出当前网站上的所有男装图标，如下：
image
选择自己喜欢的图标，点击，会添加到右上角的购物车中，如下：
image
同样的方式分别搜索选择女装、购物车图标，结果如下：
image
之后点击“存储为项目”，输入项目名字，例如“mui-icon-custom”，点击“存储”按钮后，会跳转到项目管理页面，如下图所示：
image

下载字体

点击“下载到本地”按钮，会将合并后的字体文件及自动生成的css全部下载，如下：
image

修改css

默认的css代码如下：

@font-face {font-family: "iconfont";
  src: url('iconfont.eot'); /* IE9*/
  src: url('iconfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('iconfont.woff') format('woff'), /* chrome、firefox */
  url('iconfont.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
  url('iconfont.svg#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

.icon-nanzhuang:before { content: "\e600"; }

.icon-nvzhuang:before { content: "\e601"; }

.icon-gouwuche:before { content: "\e602"; }
我们可稍作如下修改：


为保证和mui目录结构统一，建议将字体文件放在fonts目录下，这样我们需要修改@font-face下得url属性；

只兼容iOS和Android版本的话，我们仅需要ttf格式的字体即可，其它字体可以删除；同时，我们也仅需保留-webkit前缀语法，-moz前缀部分可以删除；

修改后的css代码如下：

    @font-face {font-family: "iconfont";
        src:url('../fonts/iconfont.ttf') format('truetype'); /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
    }

    .iconfont {
        font-family:"iconfont" !important;
        font-size:16px;
        font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
    }

    .icon-nanzhuang:before { content: "\e600"; }

    .icon-nvzhuang:before { content: "\e601"; }

    .icon-gouwuche:before { content: "\e602"; }
集成mui

将iconfont.css及iconfont.ttf两个文件分别拷贝到mui工程css及fonts目录下，然后即可在mui中引用刚生成的字体图标，我们以选项卡为例，代码如下：

    <nav class="mui-bar mui-bar-tab">
        <a class="mui-tab-item mui-active">
            <span class="mui-icon iconfont icon-nanzhuang"></span>
            <span class="mui-tab-label">男装</span>
        </a>
        <a class="mui-tab-item">
            <span class="mui-icon iconfont icon-nvzhuang"></span>
            <span class="mui-tab-label">女装</span>
        </a>
        <a class="mui-tab-item">
            <span class="mui-icon iconfont icon-gouwuche"></span>
            <span class="mui-tab-label">购物车</span>
        </a>
        <a class="mui-tab-item">
            <span class="mui-icon mui-icon-gear"></span>
            <span class="mui-tab-label">设置</span>
        </a>
    </nav>
主要代码：将mui默认的icon（如mui-icon-home）替换成iconfont icon-nanzhuang，修改后预览效果如下：

image

## 模板与动态内容

页面，都是由 html 及 数据组成，动态页面的动态一般体现在数据变化上。  
为了方便实现动态页面，一般的做法是做一个模板页面，里面的数据部分用特殊标记标记好，然后获得数据，数据与模板页面的标记替换，生成最终的显示页面显示。

模板与数据合成，可以在服务端完成，也可以在客户端完成。  
传统 xslt 与 xml的合成，效率非常低，在客户端非常慢，只能在服务端完成。

传统服务端合成

- asp、aspx、jsp、php 均是服务端合并模式，利用服务器的强大运算能力完成模板与数据的合并后，直接将html返回到客户端。 
- 优点是生成速度快，客户端无负载。  
- 缺点一，是服务器负载大
- 缺点二，是客户端需等待网络传送，网络不好，会等待，客户端体验不好，我们经常看到的页面加载等待就是这种。

客户端合成

- spa、react 等模式都是客户端合成，是目前比较流行的模式。
- 该模式流行的主要原因是 js 引擎得到优化，前端合成速度达到 毫秒级别。
- 优点是无需等待，点击直接出内容，达到原生应用体验。

模板一般分为字符串替换合成，和 dom 操作更新数据，实现动态内容。

模板的加载

- 对于前端应用，模板文件可使用 webpack 打包到js中，作为字符串变量处理，js文件会比较大，相当于 html 放到 js中。  
- 优点是快，缺点是加载的 js 文件会比较大，影响首次加载体验。
- 折中方案是 模板文件、数据都通过 ajax 获取后，在客户端合并。
  由于客户端大部分为手机，处理能力有限，需注意合成内容的运算量，尽量采用模块化。小范围合并，这种合并为毫秒级，基本不影响使用体验。
- 客户端合并，需选择轻巧的模板引擎。
- 模板文件不宜太复杂。
- 模板嵌套，可在 js 中 import 多个文件字符串变量，通过 占位符替换合并。或者 找到 该模板的 webpack loader，对 include 部分进行合并处理。

如果模板、数据都来自后台，为何不在后台直接合并呢？  

- 既然大量业务逻辑从后端移到前端，全部在前端完成更加自然。
- 后台基本上只提供各种 api接口，不再承担业务逻辑和视图。
- 数据与模板并不是完全同步，有时模板不变、数据变，有时数据不变、模板变，前端合成根据灵活。
- 对于比较小的模板（小于10K），可直接嵌入js中，避免异步加载。

常用的模板有：

- [artTemplate](https://github.com/aui/artTemplate#nodejs)，star 3508, 腾讯公司出品，速度笔记快，只有4K。
- [doT](https://github.com/olado/doT) star 2936 Docs:http://olado.github.com/doT/
- [jade]() 后台模板
- baiduTemplate:  http://baidufe.github.io/BaiduTemplate/
- juicer: http://juicer.name/或https://github.com/PaulGuo/Juicer/zipball/master#download
- tmpl：https://github.com/BorisMoore/jquery-tmpl
- handlebars:http://handlebarsjs.com/
  或 https://raw.github.com/wycats/handlebars.js/1.0.0-rc.4/dist/handlebars.js
- easyTemplate：https://github.com/qitupstudios/easyTemplate
- underscoretemplate: http://documentcloud.github.io/underscore/
- mustache:https://github.com/janl/mustache.js
- kissytemplate:https://github.com/ktmud/kissy

[模板速度测试](http://aui.github.io/artTemplate/test/test-speed.html)


### 使用 artTemplate 模板

安装 npm i art-template -D

在 post.js 中 

```js  
  import art from 'art-template/dist/template-debug'; // 调试
  import art from 'art-template/dist/template';
  import tpl from 'raw!../view/post.html'; // 读取原始文件为字符串
  
  const html = art.compile(tpl)(data); // 转换为 html
```

## lazy load

[Knot.js](https://github.com/callmecavs/knot.js) 40几行，实现浏览器环境的事件触发，es6语法，非常经典！
npm i knot.js --save
[layzr](https://github.com/callmecavs/layzr.js) star 4836，120几行，延迟加载，es6语法，看起来非常棒！
npm i layzr.js --save
[echo](https://github.com/toddmotto/echo) star 2916，130几行
[blazy](https://github.com/dinbror/blazy) star 1417
[lazysizes](https://github.com/aFarkas/lazysizes) star 5181

### layzr 使用

引用

import Layzr from './lib/layzr';
const _layzr = Layzr({
  normal: 'nor',
  retina: 'ret',
  srcset: 'set',
  threshold: 0
});

注册滚屏事件

_layzr.handlers(true);  // bind scroll and resize handlers

页面dom加载图片后，调用 update 更新跟踪图片列表
  _layzr.update();
检查当前是否可视，可视则将 nor 属性 更改为 src 属性，加载图片！  
  _layzr.check();

小猪使用的

$.fn.xzlazyload = function(options) {
    var objs = this;
    var gray_img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEXDw8PWKQJEAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==';
    var $window = $(window);
    var pxOffset = options.pxOffset ?  options.pxOffset : 30;
    var memorySaver = options.memorySaver ? true : false;
    var memorySaverOffset = $(window).height();
    var replaceImg = options.replaceImg ?  options.replaceImg : gray_img;
    var lastScrollTop = 0;
    var upShow = options.upShow ? true : false;
    var inViewZone = function (ele, extPxOffset) {
        if (!extPxOffset) extPxOffset = pxOffset;
        var scrollTop = $(window).scrollTop();
        var wHeight = $(window).height() ;
        var ele_top = scrollTop - ele.offset().top + wHeight;
        var ele_bottom =  (ele.offset().top + ele.height()) - scrollTop ;
        return ( (ele_top > 0 - extPxOffset && ele_top < wHeight + extPxOffset) || (ele_bottom > 0 - extPxOffset && ele_bottom < wHeight + extPxOffset) );
        //return ( (ele_top > 0 && ele_top < wHeight) || (ele_bottom > 0 && ele_bottom < wHeight) );
    }
    function update() {
        if (!upShow && document.body.scrollTop < lastScrollTop) return; 
        lastScrollTop = document.body.scrollTop;
        if (lastScrollTop % 2 == 0 && lastScrollTop > 5) return;
        objs.filter(':visible').each(function () {
            var me = $(this);
            var xzsrc = me.attr('xzsrc');
            var src = me.attr('src');
            if (  xzsrc && xzsrc != 'ok' && inViewZone(me)) {
                me.data('xzsrc',xzsrc);
                if (options.replaceImage) 
                me.attr('src', options.replaceImageSrc ? options.replaceImageSrc :gray_img);
                me.attr('xzsrc', 'ok');
                me.load(function () {
                    $(this).data('xzlazyload','ok');
                }).error(function () {
                    var mysrc = $(this).attr('src');
                    if ($(this).data('reload')) {
                        me.attr('src', me.attr('replacesrc') ? me.attr('replacesrc') : replaceImg);
                    } else {
                        $(this).attr('src', mysrc + '?' + Math.random());
                        $(this).data('reload',1)
                    }
                });
                me.attr('src', xzsrc);
            } else if ( memorySaver && xzsrc && xzsrc == 'ok' && inViewZone(me, pxOffset + memorySaverOffset)) {
                var org_src = me.data('xzsrc');
                if (org_src) {
                    me.attr('src', org_src);
                }
            } else if ( memorySaver && xzsrc && xzsrc == 'ok' && !inViewZone(me, pxOffset + memorySaverOffset)) {
                var replacesrc = me.attr('replacesrc');
                replacesrc = replacesrc? replacesrc : (options.replaceImageSrc ? options.replaceImageSrc : replaceImg);
                me.attr('src', replacesrc);
            } else if (options.replaceImage && !src){
                if (options.replaceImageSrc) {
                    me.attr('src', options.replaceImageSrc);
                } else {
                    me.attr('src', gray_img);
                }
            }
        });
    }

    $window.bind("resize", function() { 
        update(); 
    });
    $(window).on('scroll', function(){
        update(); 
    });
    update();
}


变量

## zepto 解析

var init = function (global, factory) {
  if (typeof define === 'function' && define.amd)
    define(function () {
      return factory(global)
    })
  else
    factory(global)
};

init(this, function (window) webpack 报错！
改为
init(typeof window !== "undefined" ? window : this, function (window) 

var Zepto = (function() {
  // 内部变量
  zepto = {},

  // 构造函数
  function Z(dom, selector) {
    var i, len = dom ? dom.length : 0
    for (i = 0; i < len; i++) this[i] = dom[i]
    this.length = len
    this.selector = selector || ''
  }

  zepto.Z = function(dom, selector) {
    return new Z(dom, selector)
  }

  zepto.init = function(selector, context) {
    var dom = zepto.qsa(document, selector)
    // create a new Zepto collection from the nodes found
    return zepto.Z(dom, selector)
  }

  // 实例化函数调用
  $ = function(selector, context){
    return zepto.init(selector, context)
  }

  $.fn = {
    constructor: zepto.Z,
    length: 0,
  }

  // 将 fn 赋给 Z的原型
  zepto.Z.prototype = Z.prototype = $.fn
  $.zepto = zepto

  return $
})();

// If `$` is not yet defined, point it to `Zepto`
window.Zepto = Zepto
window.$ === undefined && (window.$ = Zepto)

最后返回

return Zepto；

### 箭头函数 与 this

addClass: function(name)
  this 指针 有效
addClass: name => {
  this 指向 window！！！

<span name="txDesc" idx="0" style="-webkit-user-modify: read-only;">
![<div>
</div><div>我们都喜欢有鲜花和巧克力的生</div>](http://nuoya-10038118.image.myqcloud.com/test1472009063687)

![<div><br></div><div>我们都喜欢有鲜花和巧克力的生</div>](http://nuoya-10038118.image.myqcloud.com/test1472009063687)
</span>

### zepto 片段

  // Status bar classes
  if (device.statusBar) {
    classNames.push('with-statusbar-overlay');
  } else {
    removeClass(tags(document, 'html')[0], 'with-statusbar-overlay');
    // $('html').removeClass('with-statusbar-overlay');
  }

  // Add html classes
  if (classNames.length > 0)
    addClass(tags(document, 'html')[0], classNames.join(' '));
    // $('html').addClass(classNames.join(' '));

  const windowWidth = window.innerWidth; // ??? $(window).width();
  const windowHeight = window.innerHeight; // ??? $(window).height();
  container.trigger('refresh');

## webpack 模块引用

在一个包中，不管多少文件中，多次 import 或 require 一个模块，只会生成一个引用，其他的都指向这个引用。  
意味着，该模块的内部变量，只会初始化一次，被所有文件的所有引用共享！
意味着，输出模块函数时，不需要挂接到全局 $（jQuery、Zepto）的静态属性上！

如果要实现多实例独立变量，需输出 class 或 函数，函数中 返回一个新的实例，new 或 函数调用（比如 $('.xxx')）来实例化！！！
不需要多实例的模块，直接返回 函数集合即可，所有包共享该模块内部的变量！


## 安卓兼容性

  for (const r of rs) {
  好像不支持！！！

## 万象优图

http://web.image.myqcloud.com/photos/v2/10038118/nuoya/1368994575/[fileid]/

http://v2test-10000812.image.myqcloud.com/tencentyunRestAPITest?imageView2/0/w/400/h/300

http://nuoya-10038118.image.myqcloud.com/test1471935637672?imageView2/0/w/400/h/300

this 指针

请问大神href="javascript:xxx(this)"取到的this是windows对象？
请问大神<a href="javascript:xxx(this)"></a>为什么取到的this是windows对象？？
而onclick取到的就是a? 真的没搞懂
添加评论 分享

1
赞同反对，不会显示你的姓名
Dominator008Google Closure Compiler Committer
1 人赞同
记住JavaScript中的this永远指代函数的的调用者。
假设我们有：
<a href="javascript:xxx(this)" onclick="alert(this)"></a>
javascript:xxx(this)的调用者是全局，所以其中的this是全局this，在浏览器中就是window。
onclick可以理解为我们有一个对象：
var a = {
// ...
onclick: function() { alert(this) },
};
click事件发生时，浏览器做了如下操作：
a.onclick();
这样的话onclick的调用者是a，所以this就是a本身，而不是全局this。

## 图片压缩、裁剪

todo ???

ios img bug
图片裁剪 http://wow.techbrood.com/fiddle/2580
http://stackoverflow.com/questions/11929099/html5-canvas-drawimage-ratio-bug-ios/
Canvas blending now available on iOS7 and OSX Mavericks
http://blogs.adobe.com/webplatform/2013/11/01/canvas-blending-availability/

https://github.com/mhbseal/html5ImgCompress
http://www.zhangxinxu.com/wordpress/2010/05/图片旋转剪裁js插件兼容各浏览器/
HTML5 Canvas剪切（Clip)动画 http://www.108js.com/article/article3/30197.html?id=829
HTML5 本地裁剪图片并上传至服务器（老梗） https://segmentfault.com/a/1190000000754560
Canvas实例教程：图像移动、大小调整和裁剪 http://blog.csdn.net/iefreer/article/details/40740465
移动前端—图片压缩上传实践移动前端—图片压缩上传实践 http://www.open-open.com/lib/view/open1435407597794.html
图片上传，前端压缩，裁剪（支持手机端）：ImageCropper 
http://www.open-open.com/lib/view/open1442049394086.html
图片上传，前端压缩，裁剪（支持手机端） https://github.com/cpsa3/ImageCropper
裁剪实例 http://wow.techbrood.com/fiddle/2580

## 参考

https://zh.airbnb.com/getaways/Chengdu?destination=Seoul
http://m.xiaozhu.com/search.html?cityid=16&city=%25E5%25B9%25BF%25E5%25B7%259E&offset=1&step=15&st=2016-08-18&et=2016-08-19&
https://m.wanzhoumo.com/

## 图片

图片一般上传到第三方图片服务器，比如 七牛、腾讯、阿里，这些服务器一般提供在线动态图片处理功能！  
功能包括 自动修正 iPhone 拍照方向、宽高比裁剪、像素、压缩等，处理速度以毫秒计，无需自行处理。

比如 好奇心日报的图片 url

<img src="http://img.qdaily.com/article/article_show/20160905120928KlPWtHE7ZwuJUOpm.jpg?imageMogr2/auto-orient/thumbnail/!580x344r/gravity/Center/crop/580x344/quality/85/format/jpg/ignore-error/1" alt="">

换成腾讯万象优图

<img src="http://img.qdaily.com/article/article_show/20160905120928KlPWtHE7ZwuJUOpm.jpg?imageMogr2/auto-orient/thumbnail/!580x344r/gravity/Center/crop/580x344/quality/85/format/jpg/ignore-error/1" alt="">

好奇心日报的排版是非常不错的，这个图片 100K 左右，580x344 像素，显示非常清晰。宽高比为 1.686。  
在其app中，手机宽高比为 1.9，图片宽度满屏，看起来非常不错，既解决了大图显示问题，同时也兼顾了一屏尽量多行数问题。
在 iPhone6 plus 上量，宽度为 68.4，高度为 36mm，保持宽高比例不变，则图片高度为 218 px！
今日头条的高度为 35mm，宽度为 62.5，不是满屏，宽高比为 1.8

[H5图片规格参考](http://www.5icool.org/a/201511/a14570.html)

那么多手机屏幕尺寸，设计稿应该按照哪一个尺寸作为标准尺寸。现在已经有2K分辨率的手机屏幕了，设计稿是不是也要把宽高跟着最大分辨率来设计。显然不是。

请注意：（以下所有讨论内容和规范均将viewport设定为content=”width=device-width”的情况下） 也就是我们的H5页面前端代码里面必须包含


<meta content=”initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width” name=”viewport” />
<meta content=”telephone=no” name=”format-detection” />

根据目前市场流行的手机移动终端，统计他们的设备独立像素。
当前最流行的手机的所有尺寸大小规范： http://screensiz.es/phone     值得大家好好细看的智能手机尺寸图表。

iPhone6 plus 举例：
设备独立像素 414 x 736 物理像素：1242 x 2208 设备像素比：3 

H5的设计稿一般设计为 640x1136px即可。 既满足了显示需求，又能降低用户加载图片需要的带宽。

可以用各种分辨率的移动智能手机查看我们设计的H5页面时，当然，也会出现如下的情况，内容显示不全，甚至一些重要内容和按钮都会被遮挡。

第一：背景图片必须采用background-size:cover;来实现。

第二：我们在进行H5页面内容规划布局设计的时候，不能把重要内容放在太偏下的位置或者偏上，否则前端布局时可能出现内容显示不全的情况。

H5页面设计 H5页面制作 H5页面

通过对比可得：

除去将浏览器全屏显示的情况，几乎所有情况均会有顶部的状态栏和导航栏。

iPhone的设计标准，状态栏和导航栏的独立像素高度分别为40px和88px。

由于Android系统可以更改状态栏和导航栏的高度，这里可以取默认值为48px和100px（这些尺寸网上均可查）。

那么就会把网页内容往下挤，进入盲区（根据不同的布局方式可能挤出视口，即可视区域之下，）。取这两个系统者的最大值为148（48+100）,如下图5，设计稿要尽量保证单页下面没有重要内容。

H5页面设计 H5页面制作 H5页面

图5

那么在所有屏幕大小上把重要内容显示完全，就要注意市面上存在的小尺寸手机屏幕，现在绝大部分智能手机分辨率都在640x960px（iPhone4分辨率）之上，所以只要把重要内容放在上图5中的盲区之上即可。计算后的最安全高度为812（960-148=812）。

在此总结，一般情况下，以现有市场上流行的移动智能手机，单页翻转（非延伸向下的长页面）设计稿尺寸为640×1136，在高度为812处设置一条安全线（参考线），将重要的内容布局在这条安全线之上。


移动端H5页面的设计稿尺寸大小规范内容如下：

1、像素是没有宽高的（不要被Photoshop中的像素格欺骗），它只代表一个采样的色值。

2、任何图片作为数据信息被保存在存储盘中时，只有宽高像素数是有意义的，此时的ppi对于图片来说时没有任何意义，也并不能描述这个图片有多少英寸的宽度或者高度，而只有在被打印出来后才有ppi的意义，被打印出来才可以描述这张图片有多高多宽。

3、平时制作H5页面时设计原型时，产品经理出的原型稿建议屏宽为320px，用这个尺寸一是为了浏览方便（现在很多手机的屏宽达到1440px，用这个尺寸去模拟显然不现实），
4、制作设计稿时，设计师应该把原型稿上的所有尺寸进行2倍处理。这样设计稿在移动设备上预览便可保证清晰。而前端切片时，按照现在流行的做法，可以直接使用原型稿上的尺寸，也就是设计稿上的1/2。

5、一般情况下，H5页面设计稿做成640x1136px是最为稳妥的尺寸，在812px高度处增加一条安全线，重要内容在此线之上（网上有些文章说安全线是960px处，个人认为不太准确）。既保证了在移动设备上显示清晰，也保证了素材的最小尺寸。


最后在这里，推荐2个不错的图片压缩的工具。

1、腾讯智图（http://zhitu.isux.us/）

智图–图片智能自动优化平台,为你的图片智能选择合适的图片格式,为你压缩图片以便节省带宽优化体验,为你提供WebP图片让你的站点高大上

2、tinypng（手机APP设计必备图片压缩神器-TinyPNG），这里的图片压缩还是相当好用，可以节省用户不少带宽。


## 路由

当项目越来越大，页面越来越多的时候，需要使用路由来管理所有页面，实现页面之间的切换（导航）。

路由本质上是监控所有 url，识别内链时，改变 页面加载方式，缺省页面加载是跳转方式，一旦发生页面跳转，原来加载的文件失效，需要重新加载所有文件，导致页面加载缓慢。

通过路由，将页面跳转改为 ajax 动态加载，原来加载的js等文件全部有效，同时缓存加载的页面，这样页面加载、切换非常平滑，不会卡顿。

https://github.com/progrape/router

SPA 网页导航，一般使用 hash，也就是 url中的 # 号后面的部分。  
通过监控 hash的变化 hashchange，来实现页面导航。  
通过 history.pushState、history.replaceState 有 history.state，通过 href直接跳转的，没有 history.state。 不通过 hash，通过 state，监控 state变化 onpopstate 也可以实现导航。  

但是使用 history.pushState() 实现的路由，在微信上方的 Back 和使用“屏幕边缘左滑返回” 的效果完全不一样。  
当使用 Webview Back 时，所有的路由都很正常，但当通过屏幕边缘左滑返回时，路由失效了，直接退出了整个 webview。

我发现好像所有使用 pushState 实现路由的 web app 都有这个问题，但是使用原始的 locatin.hash & hashchange 做路由的却没有这个问题。

因此在微信里面，要实现屏幕边缘左滑返回，而不是退出，只能使用 hash 方案。

### hash

http://www.cnblogs.com/yeer/archive/2013/01/21/2869827.html

twitter改版一个显著变化，就是URL加入了"#!"符号。比如，改版前的用户主页网址为

　　http://twitter.com/username

改版后，就变成了

　　http://twitter.com/#!/username

在我印象中，这是主流网站第一次将"#"大规模用于直接与用户交互的关键URL中。这表明井号（Hash）的作用正在被重新认识。本文根据HttpWatch的文章，整理与井号有关的所有重要知识点。

一、#的涵义

#代表网页中的一个位置。其右面的字符，就是该位置的标识符。比如，

　　http://www.example.com/index.html#print

就代表网页index.html的print位置。浏览器读取这个URL后，会自动将print位置滚动至可视区域。

为网页位置指定标识符，有两个方法。一是使用锚点，比如<a name="print"></a>，二是使用id属性，比如<div id="print" >。

二、HTTP请求不包括#

#是用来指导浏览器动作的，对服务器端完全无用。所以，HTTP请求中不包括#。

比如，访问下面的网址，

　　http://www.example.com/index.html#print

浏览器实际发出的请求是这样的：

　　GET /index.html HTTP/1.1

　　Host: www.example.com

可以看到，只是请求index.html，根本没有"#print"的部分。


三、#后的字符

在第一个#后面出现的任何字符，都会被浏览器解读为位置标识符。这意味着，这些字符都不会被发送到服务器端。

比如，下面URL的原意是指定一个颜色值：
如果 http://www.example.com/?color=#fff  
http://example.com/?color=%23fff

改变#不触发网页重载

单单改变#后的部分，浏览器只会滚动到相应位置，不会重新加载网页。

比如，从

　　http://www.example.com/index.html#location1

改成

　　http://www.example.com/index.html#location2

浏览器不会重新向服务器请求index.html。

五、改变#会改变浏览器的访问历史

每一次改变#后的部分，都会在浏览器的访问历史中增加一个记录，使用"后退"按钮，就可以回到上一个位置。

这对于ajax应用程序特别有用，可以用不同的#值，表示不同的访问状态，然后向用户给出可以访问某个状态的链接。

值得注意的是，上述规则对IE 6和IE 7不成立，它们不会因为#的改变而增加历史记录。

六、window.location.hash读取#值

window.location.hash这个属性可读可写。读取时，可以用来判断网页状态是否改变；写入时，则会在不重载网页的前提下，创造一条访问历史记录。

七、onhashchange事件

这是一个HTML 5新增的事件，当#值发生变化时，就会触发这个事件。IE8+、Firefox 3.6+、Chrome 5+、Safari 4.0+支持该事件。

它的使用方法有三种：

　　window.onhashchange = func;

　　<body onhashchange="func();">

　　window.addEventListener("hashchange", func, false);

对于不支持onhashchange的浏览器，可以用setInterval监控location.hash的变化。

八、Google抓取#的机制

默认情况下，Google的网络蜘蛛忽视URL的#部分。

但是，Google还规定，如果你希望Ajax生成的内容被浏览引擎读取，那么URL中可以使用"#!" (被称为 hashbang ) ，Google会自动将其后面的内容转成查询字符串_escaped_fragment_的值。

比如，Google发现新版twitter的URL如下：

　　http://twitter.com/#!/username

就会自动抓取另一个URL：

　　http://twitter.com/?_escaped_fragment_=/username

通过这种机制，Google就可以索引动态的Ajax内容。

Seo 

http://isux.tencent.com/seo-for-single-page-applications.html

Google发现URL里有#!符号，例如example.com/#!/detail/1，于是Google开始抓取example.com/?_escaped_fragment_=/detail/1；    _escaped_fragment_这个参数是Google指定的命名，如果开发者希望把网站内容提交给Google，就必须通过这个参数生成静态页面。  根据上面的demo，我简单示例一下Google要抓取的页面的样子
:  http://119.28.4.22/?escapedfragment_=/detail/1   如此以来，就需要Server通过生成静态的内容以便Google抓取。     以下将简单介绍，单页架构，爬虫访问根目录时如果配置Server端的路由。    四、判断爬虫    当Google访问119.28.4.22/#!/detail/1 时，会自动转化成http://119.28.4.22/?_escaped_fragment_=/detail/1，以Nginx为例：   if ($args ~ _escaped_fragment_) { rewrite ^ /api; }   /api为后台服务的接口，已nodejs为例，代理设置如下：
 
upstream nodejs { 
server 127.0.0.1:3000; 
}   
location /api { 
proxy_set_header X-Request-URI $request_uri; 
proxy_set_header X-Real-IP $remote_addr; 
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; 

### 回退

如何判断页面切换是否回退？  

方案一：对每个页面使用 pushState保存一个索引到 state中，进入新页面，没有 state，索引 ++，记录最大索引。  
返回时，页面有 state，取出里面的 索引，与刚才记录的最大索引比较，如果小于或等于，则是返回，否则是切换新页面。

缺点：这种方案对于 设置 hash方式切换回原来的页面，由于没有使用 返回，虽然是同一个hash页面，但是作为新页面处理，history 不起作用，state 为 null，不作为返回处理。

方案二：对每个路由视图的上一个路由 lastRoute 进行记录，无论是 返回、还是 hash、href方式切换到 原来的视图，切换路由与lastRoute原路由进行比较，同一个，则是返回，删除当前路由的 lastRoute。

优点：就是支持 hash、href 方式返回，不仅仅只是返回按键返回。



## 事件

http://www.zhangxinxu.com/wordpress/2012/04/js-dom%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BA%8B%E4%BB%B6/
http://blog.csdn.net/jxst051665/article/details/3931598

应用中经常会遇到对事件的处理，一种是系统预定义的事件，dom上的各种变化、鼠标动作、手指动作等，需要对这些事件进行响应。  
如果做一些模块化开发，需要自定义的事件，并触发事件。

在 dom 上扩展自定义事件，使用标准的 addEventListener 设置事件响应函数。  
使用 addEventListener 要注意，不推荐 匿名函数，同一匿名函数在多次 addEventListener时，会多次触发，如用有名函数则不会，对同一名称函数，多次监听，只会触发一次。

removeEventListener 删除响应，注意，匿名函数没法删除，因为每个匿名函数在系统中都是独立存在，不是一个变量，可以理解系统为每个匿名函数设置了一个唯一的随机名称，强烈建议事件响应中不要使用匿名函数！

在实际使用中，很少对一个事件加载多个不同处理函数，如果有这种需求，可以在一个处理函数中连续处理。  
反而容易对同一个处理函数进行多次绑定，导致多次触发，引起错误。

kevent 对事件进行封装，一个 dom 对象的事件，只支持 一个 事件响应函数，重复加载时，自动卸载之前函数，添加新的函数，类似 dom.onEvent = fn，覆盖式加载响应函数。

如果需要加载多个，通过 muti 参数指定，缺省为覆盖式加载。

如果大家将一张网页看成一个form的话，大致上就成了一个web form的模型。在win form 下要想手动触发某一个对象的事件是很简单的，只要发送一条消息即可达成。(PostMessage) 但是网页并不是基于消息机制的，如果我们想在一张网页上写出一个类似于按键精灵的功能该如何实现呢？
为大家介绍js下的几个方法：
1. createEvent（eventType）
参数：eventType 共5种类型：
    Events ：包括所有的事件. 
          HTMLEvents：包括 'abort', 'blur', 'change', 'error', 'focus', 'load', 'reset', 'resize', 'scroll', 'select', 
                                    'submit', 'unload'. 事件
          UIEevents ：包括 'DOMActivate', 'DOMFocusIn', 'DOMFocusOut', 'keydown', 'keypress', 'keyup'.
                                  间接包含 MouseEvents. 
          MouseEvents：包括 'click', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup'. 
          MutationEvents:包括 'DOMAttrModified', 'DOMNodeInserted', 'DOMNodeRemoved', 
                                      'DOMCharacterDataModified', 'DOMNodeInsertedIntoDocument', 
                                      'DOMNodeRemovedFromDocument', 'DOMSubtreeModified'. 
2. 在createEvent后必须初始化，为大家介绍5种对应的初始化方法
  HTMLEvents 和 通用 Events：
            initEvent( 'type', bubbles, cancelable )
    UIEvents ：
                      initUIEvent( 'type', bubbles, cancelable, windowObject, detail )
    MouseEvents： 
                      initMouseEvent( 'type', bubbles, cancelable, windowObject, detail, screenX, screenY, 
                      clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, button, relatedTarget )
    MutationEvents ：
                      initMutationEvent( 'type', bubbles, cancelable, relatedNode, prevValue, newValue, 
                      attrName, attrChange ) 
3. 在初始化完成后就可以随时触发需要的事件了，为大家介绍targetObj.dispatchEvent(event)
    使targetObj对象的event事件触发
  需要注意的是在IE 5.5+版本上请用fireEvent方法，还是浏览兼容的考虑
4. 例子
    //例子1  立即触发鼠标被按下事件
    var fireOnThis = document.getElementById('someID');
        var evObj = document.createEvent('MouseEvents');
        evObj.initMouseEvent( 'click', true, true, window, 1, 12, 345, 7, 220, false, false, true, false, 0, null );
        fireOnThis.dispatchEvent(evObj);

  //例子2  考虑兼容性的一个鼠标移动事件
    var fireOnThis = document.getElementById('someID');
    if( document.createEvent ) 
    {
        var evObj = document.createEvent('MouseEvents');
        evObj.initEvent( 'mousemove', true, false );
        fireOnThis.dispatchEvent(evObj);
    }
  else if( document.createEventObject )
  {
      fireOnThis.fireEvent('onmousemove');
  }

## queryselectorall

返回 NodeList 
转换为数组
nodes = Array.prototype.slice.call(document.querySelectorAll(`[${sets.normal}]`));

queryselectorall 是基于全局的，不受调用者限制？？？
http://www.zhangxinxu.com/wordpress/2015/11/know-dom-queryselectorall/

## faskClick

中所周知，手机上的 click 有 300ms的延迟，为什么这么设计呢？ 因为它想看看你是不是要进行双击（double tap）操作。  
实际上，99.9%的时候，我们只是点击，不会 双击。

最知名的解决方案是[faskclick](https://github.com/ftlabs/fastclick)，star 13200。  
其文件大小为 31KB，为了解决一个点击的快速响应，加入 31KB代码，代价太大！

自己动手写了几行代码，对所有 link 增加 ontouchstart 事件，实现点击立刻响应。  
响应中做了 ev.preventDefault()，普遍反映的 点透（点击上面一层时，触发下面一层事件）问题，好像没有发现。  
代码如下：

```js
  /**
   * use ontouchstart replace onclick, implement faskclick!
   */
  bindLink() {
    try {
      const links = $.qus('a');
      links.forEach(link => {
        if (link.href && link.href.indexOf('javascript:') === -1) {
          link.ontouchstart = (ev) => {
            ev.preventDefault();
            if (!ev.touches.length)
              return;

            const hash = getHash(link.href);
            if (hash) {
              // alert(hash);
              location.hash = `!${hash}`;
            } else
              location.href = link.href;
          };
        }
      });
    } catch(e) {
      alert(`bindLink exp: ${e.message}`);
    }
  }
```

## 雪碧图

将小图片合并成一张大图片，减少下载次数！

npm i gulp-css-spriter -D

var spriter = require('gulp-css-spriter');


