<meta http-equiv="content-type" content="text/html; charset=UTF-8">

<link href="css/markdown.css" rel="stylesheet" />

<link href="css/prettify.css" rel="stylesheet" />

<script src="http://apps.bdimg.com/libs/jquery/2.0.3/jquery.min.js"></script>

<script src="js/prettify.js"></script>  

最好的前端打包工具
===============

>无比强大的前端打包工具。  
通过智能分析页面引用的 js（循环引用）、css，打包为单一的 bundle.js。  

使用 webpack的好处

- 加载快：手机页面对并发http请求有限制，打包成一个文件，可加快加载速度。
- 嵌套：智能分析 js 等文件嵌套，自动安顺序打包。
- 压缩：如果足够智能，应该能只包含 引用的 函数，不用的函数自动排除（待验证）。
- 隔离：防止变量的互相污染。
- react 使用 webpack
- spa、webapp 都要使用 webpack

## 资源

- 官网 http://webpack.github.io/
- 文档 http://webpack.github.io/docs/ 
- 教程 http://webpack.github.io/docs/tutorials/getting-started/
- webpack实战 http://www.cnblogs.com/tugenhua0707/p/4793265.html
- gulp + webpack 构建多页面前端项目 http://www.open-open.com/news/view/1c51682
- 30分钟手把手教你学webpack实战   
  http://www.cnblogs.com/tugenhua0707/p/4793265.html#_labe1
- 基于ES6，使用React、Webpack、Babel构建模块化JavaScript应用
  http://www.csdn.net/article/2015-05-24/2824757-building-modular-javascript-applications-in-es6-with-react-webpack-and-babel
- webpack学习笔记，webpack http://www.bkjia.com/webzh/1041782.html
- webpack使用优化 http://www.open-open.com/lib/view/open1452487103323.html
- 淘宝npm https://npm.taobao.org/
- gulp & webpack 构建 - 踩坑集锦 http://www.jianshu.com/p/8412e925b0cf
- Webpack 入门指迷 https://segmentfault.com/a/1190000002551952

## 安装

项目安装：  
`npm i -D webpack`

项目安装保存到开发依赖中，便于 使用 `npm i` 一次性建立开发环境，非常方便，如果 npm 改为淘宝镜像，速度还是非常快。

全局安装：  
`npm i -g webpack`

使用 npm i 只能自动安装项目依赖库，全局库需手工安装，对于常用的全局工具，如 gulp、webpack、bable 等常用全局工具，可以全局安装，不用每个项目单独安装。

不推荐全局安装，全局库导致项目对环境依赖，不方便更换环境部署。同时，不同项目使用的库版本可能不一致，全局安装会导致兼容性问题。另外，一些 webpack 加载器安装时，会提示没有找到 webpack 而报警！

## 使用

webpack 是 react 的标准配置，将所有css、js、page打包成一个 bundle.js 文件，react本来就是将 html页面组件化，页面代码以js方式编写，特别适合 webpack 整体打包。一个bundle.js就相当于一个独立的 app 程序一样。  

这种方式的优点是运行时，不用再下载页面，切换非常快，缺点是第一次运行加载的 bundle.js 文件大，需要比较长的时间。

对于非spa单页模式的传统多页web应用，如果 只是将 webpack 用来实现 js 模块化，该如何操作呢？

js 模块化打包：

- 将前端 js 模块化，抽出一些共性代码作为模块，减少 单个 js 大小。使用 webpack智能分析后打包成一个 bundle.js 文件！
- 使用最新的 es6/7 的规范，提高编程效率。
- 对前端 js 进行 类封装，避免变量、函数污染与冲突。
- 打包后的文件，在 H5 浏览器中能正常执行，也就是说es6/7 要转换为 es5 版本。
- 实现该目的的关键是 webpack.config.js，以及 babel 编译库，webpack 一定会有一种方法与 babel 结合，来调用 babel 库实现 ja版本转换。
- 查找webpack说明，发现这个 转换就是 加载器，后面有专门介绍。
- 编译完成后，发现 js 全部模块化了，在html页面中无法直接使用，如果要在 html或其他地方使用，需在入口文件中使用 window 输出相关变量或函数！
- 不采用 window 输出，则需将 html 页面所有 js 放入入口js文件中，才能调用打包的变量或资源。

## webpack 配置文件

webpack.config.js

```js
/**
 * Created by way on 16/6/11.
 */
module.exports = {
  entry: {prodEdit: './src/js/prodEdit.js'},
  output: {
    // path: __dirname,
    path: '/Users/way/prj/koa/koastart/public/js/',
    // filename: 'bundle.js'
    filename: '[name].js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel', exclude: '/node_modules/'}
    ]
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: []
};

```

## 从html剥离的js文件示例

```js
/**
 * Created by way on 16/6/11.
 * 应用的入口脚本
 */
import Etb from './editTable';

const _etSpec = new Etb();
const _etDesc = new Etb();

window.editDesc = tx => {
  _etDesc.editCell(tx);
};

window.viewDesc = tx => {
  _etDesc.viewCell(tx);
};

window.editSpec = tx => {
  _etSpec.editCell(tx);
};

window.viewSpec = tx => {
  _etSpec.viewCell(tx);
};

// 重新加载规格数据
window.bindSpec = (tb, values) => {
  const names = ['SpecN1', 'SpecV1', 'SpecN2', 'SpecV2'];
  _etSpec.clearRow(tb);
  return _etSpec.addData(tb, names, values);
};

// 重新加载详情数据
window.bindDesc = (tb, values) => {
  const names = ['Desc'];
  _etDesc.clearRow(tb);
  return _etDesc.addData(tb, names, values);
};

window.clearDesc = tb => {
  _etDesc.clearRow(tb);
  _etDesc.addRow(tb, '~~请点这里输入文字,点底部图标插入图片~~');
};

// 插入图片
window.insImg = (tb, url) => {
  const txt = _etDesc.cutTxt();
  if (txt.trim())
    _etDesc.addTxt(tb, txt);
  _etDesc.addImg(tb, url);
};

window.kdDesc = evt =>_etDesc.keyDown(evt);
```

## babel-loader加载器

>babel加载器就是通过babel库实现js 6、7的代码转换为 js 5，浏览器能正常执行！  
>其实通过 babel 自己也能完成转换，但是 babel自身并没有 分析 js中的引用、关联与依赖，后台代码，由于 node.js本身自带的模块化管理可直接使用，因此，后台代码并不需要 模块工具，但是前端部分，只能使用 webpack 这种工具进行依赖分析打包，确保所有的js打包到一个文件，否则，页面代码会以为缺少 模块而无法运行。

安装babel-core、babel-preset-es2015、babel-loader加载器：  

`npm i babel-core babel-preset-es2015 babel-loader –D`

淘宝npm：https://npm.taobao.org/package/babel-loader

babel 加载器肯定需要 babel，这块还是 babel 的常规用法。  
babel 几个最常用的库：

```
"babel-polyfill": "^6.6.1",
"babel-preset-es2015": "^6.5.0",
"babel-preset-react": "^6.5.0",
```
babel-loader加载器使用 .babelrc 文件配置，这个配置文件，使用 bable编译时也有效！

```
{
  "presets": ["es2015"],
  "plugins": [
    "syntax-object-rest-spread",
    "syntax-async-functions",
    "syntax-async-generators",
    "syntax-class-properties",
    "transform-async-to-generator",
    "transform-object-rest-spread",
    "transform-regenerator",
    "transform-strict-mode",
    "transform-class-properties"
  ]
}
```

## 使用 gulp 集成 webpack 自动打包

安装 gulp 环境，具体请参见 我的 gulp 笔记。  
安装gulp webpack库： 

```
npm i webpack-stream -D
npm i vinyl-named -D
```

webpack-stream 详细说明：https://www.npmjs.com/package/webpack-stream
  这个库在 windows 上执行，好像报错！！！
淘宝镜像：https://npm.taobao.org/package/webpack-stream

修改 webpack.config.js，屏蔽 entry 项，使用 gulp的 gulp.src 替代 entry

```js
module.exports = {
  // entry: {prodEdit: './src/js/prodEdit.js'},
```

修改 gulpfile.js  

```js
var webpack = require('webpack-stream');
var named = require('vinyl-named');
var wpcfg = require('./webpack.config.js');

gulp.task('build', function () {
  
  gulp.src(['src/js/prodEdit.js', 'src/js/tool.js'])
    .pipe(named())
    .pipe(webpack(wpcfg))
    .pipe(tap(function(file, t){
      var contents = file.contents.toString();
      contents = contents.replace('${version}', pkg.version);
      file.contents = new Buffer(contents);
    }))
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest(dst+'js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(dst + 'js'));
}
```

gulp 自动生成 prodEdit.js、prodEdit.min.js, tool.tool.min.js，一个用于调试，一个是压缩的，用于生产环境！  

## 有了gulp和webpack，还需要bower吗？

不是同一个level的工具。  

- gulp是工具链，可以配合各种插件做js压缩，css压缩，less编译等工作
- webpack是文件打包工具，可以把项目的各种js文、css文件等打包合并成一个或多个文件
- bower是包管理器，用来管理你项目里的那些外部依赖的。
  所以是否还用bower，完全取决于你的需求。不要执着于是否用了gulp或者webpack

webpack是一个比browserify功能更强大的模块加载器。既然是模块加载器，当然就包括对各种各样模块的加载，包括SASS/LESS/CoffeeScript/png/jpg等，以及webpack对于node_module模块加载已经非常完善了。

那么，为什么还需要bower呢？由于前端开发很多第三方模块并非都以标准npm包形式存在，有一些非主流，或者各种原因没放到npm上的包，可以在bower找到。

基于这个原因，使用webpack时候，凭着能用npm就用（依赖加载更加方便，功能更加强大），不能用的时候使用bower声明第三方模块依赖，然后使用js/css加载方式进行加载。

值得一提的是，webpack官方也提供非常便利的方式加载bower模块（模块的主要文件，被声明在bower.json main属性里面）,通过配置后就可以很方便地沿用require来加载bower模块。

传送门：http://webpack.github.io/docs/usage-with-bower.html


## 多页面 js 规划

- 将项目中公共部分js剥离出来，一个页面加载，多个页面共用，避免每个页面单重复加载。
- 公共部分的js不宜过多，如果比较多，使用 gulp 合并打包，提高加载速度。
- 页面个性化部分，每个页面加载独立的个性化js，该js文件需写入 gulpfile，生成最终独立的 js 文件！
- 公共js部分，直接使用cdn加速器独立加载，使用 webpack的外部引用，引入模块使用。

## 外链

Example with library from CDN:
```js
<script src="https://code.jquery.com/jquery-git2.min.js"></script>

// the artifial module "jquery" exports the global var "jQuery"
externals: { jquery: "jQuery" }

// inside any module
var $ = require("jquery");

```

Example with library included in bundle:

```js
copy `jquery-git2.min.js` to your local filesystem

// make "jquery" resolve to your local copy of the library
// i. e. through the resolve.alias option
resolve: { alias: { jquery: "/path/to/jquery-git2.min.js" } }

// inside any module
var $ = require("jquery");
```

也可以使用插件

plugin ProvidePlugin
This plugin makes a module available as variable in every module. The module is required only if you use the variable.

Example: Make $ and jQuery available in every module without writing require("jquery").
```js
new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery"
})
```

## EXPORTING 输出

The file doesn’t export its value.

### exports-loader

`npm i exports-loader -D`

This loader exports variables from inside the file.

Examples:
The file sets a variable in the global context with var XModule = ....  
`var XModule = require("exports?XModule!./file.js")`

The file sets multiple variables in the global context with var XParser, Minimizer.
```
var XModule = require("exports?Parser=XParser&Minimizer!./file.js"); 
XModule.Parser; XModule.Minimizer`
```
The file sets a global variable with XModule = ....
```
require("imports?XModule=>undefined!exports?XModule!./file.js") (
  import to not leak to the global context
)
```
The file sets a property on window window.XModule = ....
```
require("imports?window=>{}!exports?window.XModule!./file.js")
```

## EXPOSING 暴露

There are cases where you want a module to export itself to the global context.
Don’t do this unless you really need this. (Better use the ProvidePlugin)

### expose-loader

This loader exposes the exports to a module to the global context.

`npm i expose-loader -D`

Example:
```
module: {
    loaders: [
        { test: /jquery\.js$/, loader: 'expose?$!expose?jQuery' }
    ]
}
```

Expose file.js as XModule to the global context
```
require("expose?XModule!./file.js")
Another Example:
   require('expose?$!expose?jQuery!jquery');
   ...
   $(document).ready(function() {
   console.log("hey");
   })
```   

By making Jquery available as a global namespace in our file containing Jquery code or the root file, it’s available to use Jquery everywhere in your project. This works very well if you plan to implement Bootstrap in your Webpack project.

Note: Using too much global name-spacing will make your app less efficient. If you are planning to use a lot of global namespaces, consider implementing something like Babel runtime to your project.

## 参考资源

- [webpack举例]https://github.com/ruanyf/webpack-demos
- [WebPack实例与前端性能优化](https://segmentfault.com/a/1190000004577578)
- [基于webpack的前端工程化开发之多页站点篇（一）](https://segmentfault.com/a/1190000004511992)
- [基于webpack的前端工程化开发之多页站点篇（二）](https://segmentfault.com/a/1190000004516832)
- [基于 Webpack 和 ES6 打造 JavaScript 类库](http://www.open-open.com/lib/view/open1452821009073.html)
- [webpack + gulp 在前端中的应用](https://segmentfault.com/a/1190000005129121)
- [gulp + webpack 构建多页面前端项目](http://www.open-open.com/news/view/1c51682)
- [gulp + webpack 构建多页面前端项目](http://www.07net01.com/2015/11/967593.html)
