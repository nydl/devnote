<meta http-equiv="content-type" content="text/html; charset=UTF-8">

<link href="css/markdown.css" rel="stylesheet" />

<link href="css/prettify.css" rel="stylesheet" />

<script src="http://apps.bdimg.com/libs/jquery/2.0.3/jquery.min.js"></script>

<script src="js/prettify.js"></script>  

weui
====

>目前中国的前端开发主要以 微信为主，因此，微信提供的 WeUI 成为前端 H5自然成为开发首选。  

>WeUI和同 FrozenUI都属于 差不多的 WeUi了，也是一个比较专一的框架，WeUI应该说比FrozenUI前者更专一，话说连个官网都不搞，所有答疑都在 gitHub Issues 解决了，这个框架极其简单，体积当然就不用说了，模块也就 7 个左右，不过体量虽然小做的却不错，口碑看 star 就够了，框架从 16/1/23 发版至今 github star 超过 9K,不过也不排除用户没地方发泄所以都跑到 git 上来，哈哈。

>我的感觉：还比较年轻、轻量级的，出了不少第三方的扩展，基于VUE的，React的都有，我比较喜欢那个jQuery WeUI：https://github.com/lihongxun945/jquery-weui，如果单纯做基于微信的开发，我会选择这个！

## 官网

- Github：https://github.com/weui/weui
- DEMO：http://weui.github.io/weui/
- Star：9,237
- 引用
  <link rel="stylesheet" href="https://res.wx.qq.com/open/libs/weui/0.4.2/weui.css">
  <link rel="stylesheet" href="http://cdn.bootcss.com/weui/0.4.2/style/weui.min.css">

## 相关资源

- vue：https://github.com/airyland/vux
- react：https://github.com/weui/react-weui
- sketch：https://github.com/weui/weui-sketch
  矢量图标，可自行修改、增加
- todo示例：https://github.com/progrape/todo
- weui.js：https://github.com/progrape/weui.js
- jquery-weui：https://github.com/lihongxun945/jquery-weui
  在 weui基本库上做了扩展，增加了部分控件，与 weui 100% 兼容。
- router：https://github.com/progrape/router
  weui 示例中使用的 router，route自身也带有一个简单的图文列表示例

总结：看完微信设计团队设计的这套 DEMO，二话不说如果要做微信公众，这个二话不说必然是首选了。框架不好的地方简而言之就是框架本身应该就没考虑过让用户用到非微信的场景之下。


## 使用

说实话，weui的手册真心不直观，由于是纯css样式库，一般人拿到这个不知道如何使用！里面带的一个示例，使用了 router，一般人也看不明白，不知道到底是如何工作的！  

这样设计的目的，可能跟好的与其它库失配。


## todo示例

### 目录说明

```
├── dist                # 编译输出目录
├── package.json        # package.json
├── src
│   ├── app.js          # js 入口文件
│   ├── index.html      # html 入口文件
│   ├── lib             # 路由、工具等方法
│   ├── todo            # 程序主要逻辑文件
└── webpack.config.js
```

### 运行

```
git clone https://github.com/progrape/todo.git
cd todo
npm install
npm start
```

### 代码讲解

- 使用了 webpack 对所有文件打包，浏览时，全部下载到浏览器，在浏览器中运行。
- css 使用了 less库。
- 使用了 babel 库，对新的js语法进行支持
- ui框架当然是 weui
- 运行js库有 jquery、fastclick、weui
- weui.js 使用 js对weui调用做了封装

## router

### 使用

HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
    <title>example</title>
</head>
<body>
    <div id="container"></div>
    <script src="path/to/router.js"></script>
</body>
</html>
```

JavaScript

```javascript
var router = new Router({
    container: '#container'
});
var home = {
    url: '/',
    className: 'home',
    render: function (){
        return '<h1>home</h1>';
    }
};
var post = {
    url: '/post/:id',
    className: 'post',
    render: function (){
        var id = this.params.id;
        return '<h1>post</h1>';
    }
};
router.push(home).push(post).setDefault('/').init();
```

### 运行示例

```shell
git clone https://github.com/progrape/router
cd router
npm install
npm start
```

### API

#### Router([option])

参数 `option` 是可选的，下面是该参数可选的属性。

|属性       |类型   |默认值        |描述|
|--------       |---    |---            |---
|container      |String |'#container'   | `container` 容器的选择器
|enter          |String |'enter'        | 该页面出现时添加的类名，`enterTimeout` 为 0 时会被忽略
|enterTimeout   |Number |0              | 在这个时间之后移除添加的 `enter` 类名
|leave          |String |'leave'        | 该页面离开时添加的类名，`lieaveTimeout` 为 0 时会被忽略
|leaveTimeout   |Number |0              | 在这个时间之后移除该页面的 DOM


#### 实例方法

以下方法执行完毕后均返回实例本身。

##### push(route)

添加路由页面的配置。下面是 `route` 参数的属性。


|属性       |类型   |描述
|-----------|-------|---
|url        |String | 以 `/` 开头的 url，会体现在 hash，支持参数，如：`/user/:userId/post/:posdId`
|className  |String | 可选，该页面可以添加的额外类名，以便控制该页面下的样式
|render     |function| 页面渲染方法，支持同步和异步, 可以直接返回 html 字符串，可以返回 `promise` 对象，也可以接收 `callback` 参数
|bind       |function| 执行绑定事件的方法，`this` 指向当前页面容器

route 示例如下:

同步

```javascript
{
    url: '/home',
    className: 'home',
    render: function (){
        return '<button>home</button>';
    },
    bind: function (){
        $(this).on('click', 'button', function (){
            // do something
        });
    }
}
```

promise

```javascript
{
    url: '/home',
    className: 'home',
    render: function (){
        return new Promise(function (resolve, reject){
            resolve('<button>home</button>');
        });
    },
    bind: function (){
        $(this).on('click', 'button', function (){
            // do something
        });
    }
}
```

callback

```javascript
{
    url: '/home',
    className: 'home',
    render: function (callback){
        callback(null, '<button>home</button>');
    },
    bind: function (){
        $(this).on('click', 'button', function (){
            // do something
        });
    }
}
```

##### setDefault(url)

设置页面启动时默认跳转的 url。

##### init()

启动页面，在调用完 `push` 和 `setDefault` 方法后调用，主要完成 `hashchange` 的事件监听和跳转默认页面的工作。

## 引用文件

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

## 方案
  
- 不使用扩展组件的，只需 weui.css + weui.js = 50k
  可使用 weui 中的 13 个基础组件
- 使用扩展组件的，需 weui.css + jquery-weui.css + jquery-weui.js = 146k
  增加了 12 个扩展组件，包括 下拉刷新、滚动加载
- bootstrape方案，需 bootstrape.js + bootstrape.css = 160k
  bootstrape方案适合做pc及手机，纯手机，微信H5，推荐 weui方案。  
  bootstrape 没有包括 weui 扩展组件，需要这些组件，还需要加载其它库！
- 使用 淘宝的 sui，90+119=209

## jquery-weui

## weui.css 生成

克隆代码库，安装依赖，使用 gulp 自动生成 css文件

```
git clone https://github.com/weui/weui.git
cd weui
npm i
gulp
```

根据项目需要，选择 css，运行 gulp 重新生成 css文件！  
自己构建的css文件一般比较小，但是没法使用公共的 cdn 库，速度上不一定有优势！

```js
@import "./base/reset";

// icon font
@import "./icon/weui_icon_font";


// button
@import "./widget/weui_button/weui_button";

// cell
@import "./widget/weui_cell/weui_cell_global";

@import "./widget/weui_cell/weui_access";
@import "./widget/weui_cell/weui_check";
@import "./widget/weui_cell/weui_form";
@import "./widget/weui_cell/weui_switch";
@import "./widget/weui_cell/weui_uploader";

// msg
@import "./widget/weui_page/weui_msg";

// article
@import "./widget/weui_page/weui_article";

// tab
@import "./widget/weui_tab/weui_tab";

// progress
//@import "./widget/weui_progress/weui_progress";

// card
@import "./widget/weui_panel/weui_panel";

// media box
//@import "./widget/weui_media_box/weui_media_box";

// grid
@import "./widget/weui_grid/weui_grid";

// tips
//@import "./widget/weui_tips/weui_dialog";
//@import "./widget/weui_tips/weui_toast";
//@import "./widget/weui_tips/weui_mask";

//action sheet
//@import "./widget/weui_tips/weui_actionsheet";

//searchbar
//@import "./widget/weui_searchbar/weui_searchbar";
```

