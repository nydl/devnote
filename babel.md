
<meta http-equiv="content-type" content="text/html; charset=UTF-8">

<link href="css/markdown7.css" media="all" rel="stylesheet" type="text/css" />

<link rel="stylesheet" href="css/prettify.css" />

<script src="http://apps.bdimg.com/libs/jquery/2.0.3/jquery.min.js"></script>

<script src="js/prettify.js"></script>  

# babel js编译器

>一款功能强大的js编译（转换）器，能将ES7、ES6编译（转换）为ES5、ES6。  
它的口号是：“Use next generation JavaScript, today.”  
怎么理解呢，对于 babel来说，低版本 js 就是汇编语言，不断增加的新功能 js 版就是高级语言，babel让你高效、很爽编写高级 js代码，最后由 babel 编译为低版本js语言。  

[官网](http://babeljs.io/)
[插件](http://babeljs.io/docs/plugins/)
[中文手册](https://github.com/thejameskyle/babel-handbook/blob/master/translations/zh-Hans/README.md)

听起来，是不是跟 coffee script、type script、xtend、dart 很像呢？是的，几乎一样，但是 babel 没有增加新的后缀，而是对现有js文件进行语法支持（编辑器），编译。

但是，babel 实在太强大了，强大得令 type script 失色！coffee script、dart 退出历史舞台。

强大的代价是复杂，似乎没有一个 node 库会像 babel这样复杂！
比如：

- 你以为跟其他编译器一样，安装个 babel就能过了，实际上不行。
- 还得在项目中安装插件
- 插件安装完毕，还需要一个 .babelrc 的文件，来指示如何转换
- 如果使用 eslint、gulp、webpack 等工具，还得安装响应库
- 插件有几十种，可自由组合自有的集合，除了插件外，又有 presets
- presets 有babel-preset-es2015，又有babel-preset-stage-x
- 你会被这些概念、选择搞得晕头转向
- 而其他编译器，只需安装一个工具，然后执行编译即可，如 tsc、javac等
- babel-register 无需编译，只要引用文件即可运行，适合开发快速运行
- babel-node node 替代品，无需编译运行，方便单步跟踪调试

## 为何要如此复杂

babel 6之前的版本，比较容易让人理解，就是一个工具，通过指令编译js代码而已。  
babel 6开始，babel演变为一个庞大的生态（语法提示、自动化构建、打包、测试、调试、加载），为了适应各种场景，让程序自己决定如何编译代码，babel将各种功能以插件的方式，让你自由组合。

将功能分拆为插件，可以自由组合的好处是，每个人都可以在一个局部方面增加自己的插件，所有人都可以扩展 js 语法，就将babel变成一个庞大的生态环境，babel发展的速度就会越来越快，打破传统一个程序语言版本需要四五年才能发布一版的困局（涉及无数代码的兼容性）。

问题来了，一个从没有接触过 babel的人，面对几十种插件，各种新名词，不同文档所说的不同安装方法，搞得不明所以，束手无策。  
其实babel本质上还是是一个转码工具，只是哪些代码需要编译，哪些不编译（node 本身也是支持 es6的），的确需要各种配置。  

## presets 预设

对于一般使用者来说，无需关心插件，只需使用 babel 已经打包好的预设库即可。

```
"babel-polyfill": "^6.9.1",       // 代码填充，也可译作兼容性补丁，提供 API编译
"babel-preset-es2015": "^6.9.0",  // 所有es6转es5插件集合
"babel-preset-react": "^6.5.0",   // react 语法转es5插件集合
"babel-preset-stage-0", // 草案
"babel-preset-stage-1",
"babel-preset-stage-2",
"babel-preset-stage-3"
// 注意 stage-4 预设是不存在的，因为它就是上面的 es2015 预设。

```

对于web前端开发，babel-preset-es2015 是必备选择，如果使用了 react，则毫无疑问， 需要 babel-preset-react。babel-polyfill则作为可选，跟普通node库一样，如果觉得有价值就装，否则可不装。

标准版本：  
`stage-0 > stage-1 > stage-2 > stage-3 > es2015`  
stage-0 是最初级、也是最新的版本，最终形成正式标准，这需要一个漫长的过程！

当然，可以自己选择插件，随意组合，不受预设限制！

安装 预设es2015包，从自有插件集合中删除重复插件：

```
"babel-plugin-transform-es2015-arrow-functions": "^6.5.2",
"babel-plugin-transform-es2015-destructuring": "^6.3.15",
"babel-plugin-transform-es2015-modules-commonjs": "^6.3.16",
"babel-plugin-transform-es2015-parameters": "^6.5.0",
"babel-plugin-transform-es2015-spread": "^6.5.2",
```

babel-preset-es2015预设集合：

```
check-es2015-constants
transform-es2015-arrow-functions
transform-es2015-block-scoped-functions
transform-es2015-block-scoping
transform-es2015-classes
transform-es2015-computed-properties
transform-es2015-destructuring
transform-es2015-duplicate-keys
transform-es2015-for-of
transform-es2015-function-name
transform-es2015-literals
transform-es2015-modules-commonjs
transform-es2015-object-super
transform-es2015-parameters
transform-es2015-shorthand-properties
transform-es2015-spread
transform-es2015-sticky-regex
transform-es2015-template-literals
transform-es2015-typeof-symbol
transform-es2015-unicode-regex
transform-regenerator
```

## 安装

- 将需要的babel包加入到项目配置文件
  package.json
  ``` js
  "devDependencies": {
    "babel-cli": "^6.5.1",
    "babel-plugin-syntax-async-functions": "^6.5.0",
    "babel-plugin-syntax-object-rest-spread": "^6.5.0",
    "babel-plugin-transform-async-to-generator": "^6.3.13",
    "babel-plugin-transform-object-rest-spread": "^6.5.0",
    "babel-plugin-transform-strict-mode": "^6.5.2",
    "babel-register": "^6.3.13",
    "babel-eslint": "^4.1.6",
    "babel-preset-es2015": "^6.9.0",
  }
  
  ```

- 在命令行执行：npm i 自动安装
- npm 修改npm服务器为淘宝镜像服务器，加快安装速度
  npm config set registry https://registry.npm.taobao.org
  npm config set disturl https://npm.taobao.org/dist
- 创建 .babelrc 文件，确定需要转换哪些语法，可自己组合搭配
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

## 使用

- 在项目配置文件中设置
  "scripts": {
    "build": "node_modules/.bin/babel src -d lib",
    "prepublish": "node_modules/.bin/babel src -d lib"
  },
- 批量编译：发布时，命令行运行 npm run build 即可生成转换后的代码
- IDE自动编译：在 webstorm 中调试代码，添加文件时，使用 babel-node 代替 标准 node
  比如 osx 上：
  /Users/way/.nvm/versions/node/v5.10.1/bin/node
  替换为：
  全局安装 babel-cli
  /Users/way/.nvm/versions/node/v5.10.1/bin/babel-node
  项目安装 babel-cli
  /Users/way/prj/koa/koastart/node_modules/.bin/babel-node
- 如果需要浏览器，在浏览器上先连一下调试端口，然后打开web端口，即可触发调试
- 

## babel 与 ES6的兼容性问题

- 箭头函数，babel不绑定参数，而ES6绑定
  ``` js
  // test babel bug
  function a(){
    return ()=>{
      console.log(...arguments);
    }
  }

  a(1)();
  ```

## 相关资源

- http://www.itnpc.com/news/web/145586447142569.html
- https://blog.jetbrains.com/webstorm/2015/05/ecmascript-6-in-webstorm-transpiling/#babelfilewatcher
- http://www.ruanyifeng.com/blog/2016/01/babel.html
- http://cnodejs.org/topic/565c65c4b31692e827fdd00c
