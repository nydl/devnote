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