<meta http-equiv="content-type" content="text/html; charset=UTF-8">

<link href="css/markdown.css" rel="stylesheet" />

<link href="css/prettify.css" rel="stylesheet" />

<script src="http://apps.bdimg.com/libs/jquery/2.0.3/jquery.min.js"></script>

<script src="js/prettify.js"></script>  

bower
=====

>Bower是一个客户端技术的软件包管理器，它可用于搜索、安装和卸载如JavaScript、HTML、CSS之类的网络资源。其他一些建立在Bower基础之上的开发工具，如YeoMan和Grunt，这个会在以后的文章中介绍。

>一个新的web项目开始，我们总是很自然地去下载需要用到的js类库文件，比如jQuery，去官网下载名为jquery-1.10.2.min.js文件，放到我们的项目里。当项目又需要bootstrap的时候，我们会重复刚才的工作，去bootstrap官网下载对应的类库。如果bootstrap所依赖的jQuery并不是1.10.2，而是2.0.3时，我们会再重新下载一个对应版本的jQuery替换原来的。

>包管理是个复杂的问题，我们要知道谁依赖谁，还要明确哪个版本依赖哪个版本。这些对于开发人员来说，负担过重了。bower作为一个js依赖管理的工具，提供一种理想包管理方式，借助了npm的一些思想，为我们提供一个舒服的开发环境。

##

- https://segmentfault.com/a/1190000002971135
- http://www.zhihu.com/question/24414899
- https://cnodejs.org/topic/5210b7a80a746c580b11e496

## 安装bower

使用npm，打开终端，输入：
  `npm install -g bower`
其中-g命令表示全局安装

作者：尤雨溪
链接：http://www.zhihu.com/question/24414899/answer/28021471
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

npm + Browserify

我这里想要指出，npm 其实是一个非常好的前端（对，没错，是前端）包管理方案，最主要的就是依靠 Browserify 这个神器。Browserify 最大的意义不是让你能在 npm 上发布前端的静态资源，而是实现前后端的代码共享。npm上有很多包是前后端通用的，比如我要找个现成的算法实现，什么 levenshtein distance 啊，perlin noise 啊，gaussian distribution 啊，A* 寻路啊，npm 上一搜一大把。常用的库如 jquery backbone 之类的，只要你想得到的基本上都有 npm 版本。需要什么直接 npm install 就可以用在浏览器端的项目里了，Component 和 Bower 在这方面跟 npm 完全没有可比性，spm 就更不提了。开发流程上来说也极其省心，项目用 CommonJS 写，不需要任何配置，给一个入口文件就行！还有一个官方工具 watchify，一行命令跑起，保存文件自动构建，连 grunt gulp 都不需要。

这个方案唯一的缺点，就是 npm 的树状依赖结构可能导致重复的模块和代码量的臃肿，需要跑一次 `npm dedupe` 来尽量压平依赖树。当然，实际情况中前端模块出现依赖同一模块的不兼容版本还是很少见的。