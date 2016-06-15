
<meta http-equiv="content-type" content="text/html; charset=UTF-8">

<link href="css/markdown7.css" media="all" rel="stylesheet" type="text/css" />

<link rel="stylesheet" href="css/prettify.css" />

<script src="http://apps.bdimg.com/libs/jquery/2.0.3/jquery.min.js"></script>

<script src="js/prettify.js"></script>  

# babel js编译器

>一款功能强大的js编译（转换）器，能将ES7、ES6编译（转换）为ES5、ES6。  
它的口号是：“Use next generation JavaScript, today.”  
怎么理解呢，对于 babel来说，低版本 js 就是汇编语言，不断增加的新功能 js 版就是高级语言，babel让你高效、很爽编写高级 js代码，最后由 babel 编译为低版本js语言。  

听起来，是不是跟 coffee script、type script、xtend、dart 很像呢？是的，几乎一样，但是 babel 没有增加新的后缀，而是对现有js文件进行语法支持（编辑器），编译。

但是，babel 实在太强大了，强大得令 type script 失色！coffee script、dart 退出历史舞台。

与 babel 能相提并论的，只有 type script，相比 babel，增加了 强类型，写代码相对没有js自由，已有数百万 js 代码库的类型定义，是个大问题，比较麻烦，不像 babel这样平滑，想用新语法可以，不想用也可以。

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
"babel-polyfill"        // 提供一些环境中不存在的函数
"babel-preset-es2015"   // es5 发布标准
"babel-preset-react"    // react 语法转es5插件集合
"babel-preset-stage-0", // 最新草案
"babel-preset-stage-1", 
"babel-preset-stage-2",
"babel-preset-stage-3"  // 第三阶段草案
// 注意 stage-4 预设是不存在的，因为它就是上面的 es2015 预设。

```

对于web前端开发，babel-preset-es2015 是必备选择，如果使用了 react，则毫无疑问， 需要 babel-preset-react。

如果使用了Promise、异步函数等，则需要 polyfill 运行库，提供一个 转换es5之后浏览器不支持的运行环境！  
这个库文件（polyfill.min.js，在安装模块polyfill中）大约 98k，不算小，影响打开速度，适合后台管理之类页面，不太适合手机页面。  
对于 react大量使用 异步及 promise来说，属于必选，spa单页应用需做好加载过度页面！

babel 对于后台、react native来说，体验是最好的，属于必选环境。  

其他插件可选，插件一般分为 语法（用于语法识别）和转换，基本上是对应的，比如异步函数，类静态属性的插件。

预设插件功能容量：  

`stage-0 > stage-1 > stage-2 > stage-3 > es2015`  

stage-0 是最初级、也是最新的版本，最终形成正式标准，这需要一个漫长的过程！

当然，可以自己选择插件，随意组合，不受预设限制！

## 配置文件示例

### 后台 .babelrc 文件示例：

```
{
  "plugins": [
    "syntax-object-rest-spread",
    "syntax-async-functions",
    "syntax-class-properties",
    "transform-es2015-arrow-functions",
    "transform-async-to-generator",
    "transform-es2015-modules-commonjs",
    "transform-es2015-destructuring",
    "transform-es2015-spread",
    "transform-object-rest-spread",
    "transform-es2015-parameters",
    "transform-strict-mode",
    "transform-class-properties"
  ]
}

```

后台的js 版本需设置为 es2015 或 JSX，主要增加了es2015不支持的异步函数，以及类静态属性等。

### 前端浏览器不使用异步函数 .babelrc 文件示例：

```
{
  "presets": ["es2015"],
  "plugins": [
    "syntax-object-rest-spread",
    "syntax-class-properties",
    "transform-object-rest-spread",
    "transform-strict-mode",
    "transform-class-properties"
  ]
}
```


### 前端浏览器使用异步函数 .babelrc 文件示例：

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

前端需加载 polyfill.min.js


### 安装 预设es2015包，从自有插件集合中删除重复插件：

```
"babel-plugin-transform-es2015-arrow-functions": "^6.5.2",
"babel-plugin-transform-es2015-destructuring": "^6.3.15",
"babel-plugin-transform-es2015-modules-commonjs": "^6.3.16",
"babel-plugin-transform-es2015-parameters": "^6.5.0",
"babel-plugin-transform-es2015-spread": "^6.5.2",
```

### babel-preset-es2015预设集合：

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

### stage-0 初级草案

```
└─┬ babel-preset-stage-0@6.5.0
  ├─┬ babel-plugin-transform-do-expressions@6.8.0
  │ └── babel-plugin-syntax-do-expressions@6.8.0
  ├─┬ babel-plugin-transform-function-bind@6.8.0
  │ └── babel-plugin-syntax-function-bind@6.8.0
  └─┬ babel-preset-stage-1@6.5.0
    ├─┬ babel-plugin-transform-class-constructor-call@6.8.0
    │ └── babel-plugin-syntax-class-constructor-call@6.8.0
    ├─┬ babel-plugin-transform-decorators@6.8.0
    │ ├─┬ babel-helper-explode-class@6.8.0
    │ │ └── babel-helper-bindify-decorators@6.8.0
    │ └── babel-plugin-syntax-decorators@6.8.0
6.8.0
    │ └── babel-plugin-syntax-export-extensions@6.8.0
    └─┬ babel-preset-stage-2@6.5.0
      ├── babel-plugin-syntax-trailing-function-commas@6.8.0
      └─┬ babel-preset-stage-3@6.5.0
        └─┬ babel-plugin-transform-exponentiation-operator@6.8.0
          ├─┬ babel-helper-builder-binary-assignment-operator-visitor@6.8.0
          │ └── babel-helper-explode-assignable-expression@6.8.0
          └── babel-plugin-syntax-exponentiation-operator@6.8.0

```

## 安装

- [详细安装说明](http://babeljs.io/docs/setup/)
  babel不仅仅只是一个转换工具，涉及到数十种环境的安装。
- 命令行客户端工具（CLI）：`npm install -S babel-cli`
- 注册器：`npm install babel-register`
- webpack: `npm install -S babel-loader babel-core`
- 批量安装，将需要的babel包加入到项目配置文件，babel 及 eslint语法静态检查包！
  package.json

  ```js
  "devDependencies": {
    "babel-cli": "^6.10.1",
    "babel-plugin-syntax-async-functions": "^6.8.0",
    "babel-plugin-syntax-class-properties": "^6.8.0",
    "babel-plugin-syntax-object-rest-spread": "^6.5.0",
    "babel-plugin-transform-async-to-generator": "^6.8.0",
    "babel-plugin-transform-class-properties": "^6.9.0",
    "babel-plugin-transform-regenerator": "^6.9.0",
    "babel-plugin-transform-regenerator": "^6.9.0",
    "babel-plugin-transform-object-rest-spread": "^6.5.0",
    "babel-plugin-transform-strict-mode": "^6.5.2",
    "babel-plugin-transform-es2015-arrow-functions": "^6.5.2",
    "babel-plugin-transform-es2015-destructuring": "^6.3.15",
    "babel-plugin-transform-es2015-modules-commonjs": "^6.3.16",
    "babel-plugin-transform-es2015-parameters": "^6.5.0",
    "babel-plugin-transform-es2015-spread": "^6.5.2",
    "babel-register": "^6.3.13",
    "babel-eslint": "^6.0.4",
    "eslint": "^2.9.0",
    "eslint-config-airbnb": "^9.0.1",
    "eslint-plugin-import": "^1.8.0",
    "eslint-plugin-jsx-a11y": "^1.2.0",
    "eslint-plugin-react": "^5.1.1",
  }

  ```

- npm 修改npm服务器为淘宝镜像服务器（10分钟自动与国外同步），加快安装速度，如果已经设置过，则无需重新设置！
  npm config set registry https://registry.npm.taobao.org
  npm config set disturl https://npm.taobao.org/dist
  查看 npm config list，可以看是否设置正确，否则 npm 从国外下载，非常慢！
- 在命令行执行：npm i ，将批量安装所有包。
- 创建 .babelrc 文件，确定需要转换哪些语法，可自己组合搭配
  ``` js  
  {
    "plugins": [
      "syntax-object-rest-spread",
      "syntax-async-functions",
      "syntax-class-properties",
      "transform-es2015-arrow-functions",
      "transform-async-to-generator",
      "transform-es2015-modules-commonjs",
      "transform-es2015-destructuring",
      "transform-es2015-spread",
      "transform-object-rest-spread",
      "transform-es2015-parameters",
      "transform-strict-mode",
      "transform-class-properties"
    ]
  }
  
  ```

## 使用

- 在项目配置文件 package.json 中设置，自动将源文件编译到目的路径
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
- 如果不想每次编译后调试，可使用 register，直接在 bable环境里面动态执行
- 生成 source map文件，方便单步跟踪调试。

## 与 webpack 集成

对于后端项目，由于 node 内置了 模块管理，使用 babel 可以独立完成编译，文件一般也不需要打包。   

对于前端项目来说，由于没有模块管理，需要借助 webpack完成模块管理及打包。  
babel 与 webpack 需要集成，使用 webpack打包时自动完成转换。

集成非常简单，只需安装 babel-core、 babel-loader 即可：  
`npm install --save-dev babel-loader babel-core`

然后在 webpack.config.js 中设置一行：
```js
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel', exclude: '/node_modules/'}
    ]
  },
```

该设置排除了 node_modules 路径，对所有js文件，使用了 babel 加载器，转换时，使用的配置文件还是 .babelrc！

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

## babel 与 浏览器的兼容性

http://www.tuicool.com/articles/nEJRri

Babel下的ES6兼容性与规范

原文  http://imweb.io/topic/561f9352883ae3ed25e400f5

主题 ECMAScript Babel

ES6标准发布后，前端人员也开发渐渐了解到了es6，但是由于兼容性的问题，仍然没有得到广泛的推广，不过业界也用了一些折中性的方案来解决兼容性和开发体系问题，但大家仍很疑惑，使用ES6会有哪些兼容性问题。

### 兼容性问题现状

针对ES6的新特性兼容性问题，目前解决的方案是使用语法解析转换工具将es6语法转化为大部分浏览器识别的es5语法，通用的转化方案有babel，traceur，jsx，typescript，es6-shim。当然es6在服务器端也存在兼容性问题，这里由于只考虑到浏览器端的开发，暂不讨论。下面有一些常用的解决方案和兼容es6的兼容性比较~

https://github.com/babel/babel/issues/596 (es6的兼容解决方案很多，这里只讨论最常用的几种) http://kangax.github.io/compat-table/es6/

考虑到解决方案的多样性，我么会着重考虑以下几个问题： 1，兼容性：是否能解决目前常见的所有语法兼容转换 2，易用性：能够很方便的接入到现有的开发构建体系中 3，通用性：业界有较大认可，目前没有很大问题 4，持续性：有较权威的团队维护，并能不断更新

综合四点，我们仍然考虑使用babel作为我们的兼容性解决方案。即使以后需要更换，只需要更换更换工具就可以了，原有代码的写法可以不动。 除了后面三点，我们可能比较关注babel处理es6时的兼容性问题。因为es6里面增加了较多的内容，转换为es5没有对应语法与之对应，所以使用时要尤为注意。为此也没有很好的方法进行判断，只能对于es6里的新增内容进行编译，判断是否可以转为es5语法。

### ES6新特性在Babel下的兼容性列表

ES6特性	兼容性
箭头函数	支持
类的声明和继承	部分支持，IE8不支持
增强的对象字面量	支持
字符串模板	支持
解构	支持，但注意使用方式
参数默认值，不定参数，拓展参数	支持
let与const	支持
for of	IE不支持
iterator, generator	不支持
模块 module、Proxies、Symbol	不支持
Map，Set 和 WeakMap，WeakSet	不支持
Promises、Math，Number，String，Object 的新API	不支持
export & import	支持
生成器函数	不支持
数组拷贝	支持
在es6的新特性中，复杂结构的仍然不支持对es5转换的兼容，具体兼容性可以从下面实例来看~

### 箭头操作符

箭头操作符可以简洁的描述一个函数
```
// ES6
var fn= (v=>console.log(v));
转换后

 // ES6
"use strict";

var fn = function fn(v) {
  return console.log(v);
};
```

>该用法可以放心使用。

### 类的声明和继承

```
//类的定义
class Animal {
  //ES6中新型构造器
  constructor(name) {
    this.name = name;
  }
  //实例方法
  sayName() {
    console.log('My name is '+this.name);
  }
}
//类的继承
class Programmer extends Animal {
  constructor(name) {
    //直接调用父类构造器进行初始化
    super(name);
  }
  program() {
    console.log("I'm coding...");
  }
}
//测试我们的类
var animal=new Animal('dummy'),
wayou=new Programmer('wayou');
animal.sayName();//输出 ‘My name is dummy’
wayou.sayName();//输出 ‘My name is wayou’
wayou.program();//输出 ‘I'm coding...’
```

转换后

```
//类的定义
'use strict';
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var Animal = (function () {
  //ES6中新型构造器
  function Animal(name) {
    _classCallCheck(this, Animal);
    this.name = name;
  }
  //类的继承
  //实例方法
  _createClass(Animal, [{
    key: 'sayName',
    value: function sayName() {
      console.log('My name is ' + this.name);
    }
  }]);
  return Animal;
})();
var Programmer = (function (_Animal) {
  _inherits(Programmer, _Animal);
  function Programmer(name) {
    _classCallCheck(this, Programmer);
    //直接调用父类构造器进行初始化
    _get(Object.getPrototypeOf(Programmer.prototype), 'constructor', this).call(this, name);
  }
  //测试我们的类
  _createClass(Programmer, [{
    key: 'program',
    value: function program() {
      console.log("I'm coding...");
    }
  }]);
  return Programmer;
})(Animal);
var animal = new Animal('dummy'),
  wayou = new Programmer('wayou');
animal.sayName(); //输出 ‘My name is dummy’
wayou.sayName(); //输出 ‘My name is wayou’
wayou.program(); //输出 ‘I'm coding...’
```

>转换过程使用了Object.defineProperty，在ie8下不兼容，除此外可以任意使用

### 1.3 增强的对象字面量

```
//通过对象字面量创建对象
var human = {
  breathe() {
    console.log('breathing...');
  }
};
var worker = {
  __proto__: human, //设置此对象的原型为human,相当于继承human
  company: 'freelancer',
  work() {
    console.log('working...');
  }
};
human.breathe();//输出 ‘breathing...’
//调用继承来的breathe方法
worker.breathe();//输出 ‘breathing...’
```

转换后

```
//通过对象字面量创建对象
'use strict';
var human = {
  breathe: function breathe() {
    console.log('breathing...');
  }
};
var worker = {
  __proto__: human, //设置此对象的原型为human,相当于继承human
  company: 'freelancer',
  work: function work() {
    console.log('working...');
  }
};
human.breathe(); //输出 ‘breathing...’
//调用继承来的breathe方法
worker.breathe(); //输出 ‘breathing...’
```

>这个可以任意使用

### 1.4 字符串模板

```
//产生一个随机数
var num=Math.random();
console.log(`your num is ${num}`);
```

转换后

```
//产生一个随机数
"use strict";

var num = Math.random();
console.log("your num is " + num);
```

### 解构

```
var [name,gender,age]=['wayou','male','secrect'];//数组解构
console.log('name:'+name+', age:'+age);//输出： name:wayou, age:secrect
```

转化后

```
'use strict';

var name = 'wayou';
var gender = 'male';
var age = 'secrect';
//数组解构
console.log('name:' + name + ', age:' + age); //输出： name:wayou, age:secrect
```

>此方法可以使用。但是尽量不要使用 var [a, b] = getVal(); 的方式，尽管getVal返回一个数组。因为此时会用到isArray，IE8上不能支持。

### 1.6 参数默认值，不定参数，拓展参数

参数默认值
```
function sayHello(age, name='dude'){
    console.log(`Hello ${name}`);
}
sayHello(12);
```

转换后
```
'use strict';

function sayHello(age) {
    var name = arguments.length <= 1 || arguments[1] === undefined ? 'dude' : arguments[1];

    console.log('Hello ' + name);
}
sayHello(12);
```

### 不定参数

```
//将所有参数相加的函数
function add(...x){
  return x.reduce((m,n)=>m+n);
}
//传递任意个数的参数
console.log(add(1,2,3));//输出：6
console.log(add(1,2,3,4,5));//输出：15
```

转换后
```
//将所有参数相加的函数
"use strict";
function add() {
  for (var _len = arguments.length, x = Array(_len), _key = 0; _key < _len; _key++) {
    x[_key] = arguments[_key];
  }
  return x.reduce(function (m, n) {
    return m + n;
  });
}
//传递任意个数的参数
console.log(add(1, 2, 3)); //输出：6
console.log(add(1, 2, 3, 4, 5)); //输出：15
```

### 扩展参数
```
var people=['Wayou','John','Sherlock'];
//sayHello函数本来接收三个单独的参数人妖，人二和人三
function sayHello(people1,people2,people3){
  console.log(`Hello ${people1},${people2},${people3}`);
}
//但是我们将一个数组以拓展参数的形式传递，它能很好地映射到每个单独的参数
sayHello(...people);//输出：Hello Wayou,John,Sherlock
//而在以前，如果需要传递数组当参数，我们需要使用函数的apply方法
sayHello.apply(null,people);//输出：Hello Wayou,John,Sherlock
```

转换后

```
'use strict';
var people = ['Wayou', 'John', 'Sherlock'];
//sayHello函数本来接收三个单独的参数人妖，人二和人三
function sayHello(people1, people2, people3) {
  console.log('Hello ' + people1 + ',' + people2 + ',' + people3);
}
//但是我们将一个数组以拓展参数的形式传递，它能很好地映射到每个单独的参数
sayHello.apply(undefined, people); //输出：Hello Wayou,John,Sherlock
//而在以前，如果需要传递数组当参数，我们需要使用函数的apply方法
sayHello.apply(null, people); //输出：Hello Wayou,John,Sherlock
```

>参数默认值，不定参数，拓展参数都可以完全使用

### let与const

let和const完全支持，将都会被转为var，但是要理解let、var、const的区别。

### for of

```
var someArray = [ "a", "b", "c" ];

for (v of someArray) {
    console.log(v);//输出 a,b,c
}
```

转换后
```
"use strict";

var someArray = ["a", "b", "c"];

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = someArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    v = _step.value;

    console.log(v); //输出 a,b,c
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator["return"]) {
      _iterator["return"]();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}
```

>这里IE下面没有throw，所以无法支持

### iterator, generator

```
var ids = {
  *[Symbol.iterator]: function () {
    var index = 0;

    return {
      next: function () {
        return { value: 'id-' + index++, done: false };
      }
    };
  }
};

```

转换后

```
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ids = _defineProperty({}, Symbol.iterator, function () {
  var index = 0;

  return {
    next: function next() {
      return { value: 'id-' + index++, done: false };
    }
  };
});

```

>不建议使用，转换后仍需要浏览器支持

### 模块 module、Proxies、Symbol

```
// point.js
module "point" {
  export class Point {
    constructor (x, y) {
      public x = x;
      public y = y;
    }
  }
}
```

>完全不支持，import也不支持，解析报错，所以建议不使用，使用原来的require

### Map，Set 和 WeakMap，WeakSet

>Map，Set 和 WeakMap，WeakSet在es5中都没有对应的类型与之对应，所以均不支持转换，由浏览器决定兼容性

### Promises、Math，Number，String，Object 的新API

>不做语法转换，由浏览器决定兼容性

### export & import

```
export function myModule(someArg) {
  return someArg;
}
```

转换后

```
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.myModule = myModule;

function myModule(someArg) {
  return someArg;
}
import * as baz from 'myModule';
```

转换后
```
'use strict';

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _myModule = require('myModule');

var baz = _interopRequireWildcard(_myModule);
```

>所以可以使用export和import等方法来进行模块的加载处理依赖，同时export使用到了defineProperty，IE8兼容性存在问题。

### 生成器函数

```
function* foo() { };
var bar = foo();
bar.next(); // Object {value: undefined, done: true}
```

转换后

```
"use strict";

var marked0$0 = [foo].map(regeneratorRuntime.mark);
function foo() {
  return regeneratorRuntime.wrap(function foo$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
      case "end":
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
};
var bar = foo();
bar.next(); // Object {value: undefined, done: true}
```
>regeneratorRuntime在IE下面不能支持，所以不建议使用。

ES6新特性用到的就这些，其它的基本由浏览器本身决定。这部分代码Babel会像处理es5代码一样，不进行加工处理。对于部分ES6的语法，Babel会解析抛错，即使不抛错也不进行处理，建议不使用。 

### 数组拷贝

```
const items = [1,2,3];
const itemsCopy = [...items];
```

转换后

```
"use strict";

var items = [1, 2, 3];
var itemsCopy = [].concat(items);
```

>可以使用

### ES6打包体系

使用babel处理了一部分ES6的兼容性转换问题，但是ES6的打包依然必须依赖目前通用的打包管理方案。目前流行的打包方案有以下几种 1，webpack+babel+browsify+gulp gulp负责构建、使用webpack打包、browsify管理组件，babel转换 这目前被说的最多的解决方案，因为github上一大堆例子，而且可以很简单的支持到react，但是这样不能形成一个完整的开发体系；另外过于统一，和所在团队使用的技术差异较大。

2，fis3 + babel + Qjs + lego 选择这样的方案一方面是因为团队目前的主要技术选型，另一方面则是每个工具的特有优势。目前这块仍在不断完善当中。

### async、await异步函数

转换后的代码在浏览器运行，报 regeneratorRuntime is not defined 错误！

这个在网上搜索，国内国外很多很多，乱七八糟的，实际上都没说明白。  

有的说需增加 "transform-runtime"，增加这个，需要很多 require，运行报错！

[runtime详细说明](http://babeljs.io/docs/plugins/transform-runtime/)

有的说转换是曾经 -- option runtime选项，实际上没有作用。 
    
最后在官网上看到，babel-browser项目已经终止，如果要在浏览器环境执行，需包含 polyfill文件！   
客户端 html文件需增加如下引用，该文件在安装模块的 polyfill目录下面，最号找到 cdn 镜像，加速加载。

```
<script src="lib/polyfill.min.js" charset="utf-8"></script>
```

国内外关于 异步函数的说明，没几个说的清楚！

- http://masnun.com/2015/11/11/using-es7-asyncawait-today-with-babel.html
- http://stackoverflow.com/questions/28708975/transpile-async-await-proposal-with-babel-js
- https://github.com/sindresorhus/gulp-traceur
- https://www.npmjs.com/package/gulp-traceur
- https://www.sitepoint.com/simplifying-asynchronous-coding-es7-async-functions/
- http://stackoverflow.com/questions/24645789/convenient-syntax-for-executing-asynchronous-functions-if-condition-is-met
- http://www.jbernier.com/how-to-get-es7-async-functions-with-babel
- http://stackoverflow.com/questions/33527653/babel-6-regeneratorruntime-is-not-defined-with-async-await
- http://quabr.com/28976748/regeneratorruntime-is-not-defined

### 小结

所以使用ES6这一方案来进行实际开发是否有一定的必要性仍需要进行考虑，因为es6的高等特性在es5中没有对应的特性去代替，即使能够代替也是使用一些复杂的自定义函数去做，而部分可转换实现的特性仍然较少，而且写起来确实很简洁，这也是es6的一大优势。

另外为了让Babel能在实际的开发中使用，我们也自己总结了一份关于ES6部分的规范：

https://github.com/ouvens/ecmaScript-2015-babel-rules


## 参考资源

- [官网](http://babeljs.io/)
- [插件](http://babeljs.io/docs/plugins/)
- [中文手册](https://github.com/thejameskyle/babel-handbook/blob/master/translations/zh-Hans/README.md)
- [node.js学习笔记之babel使用](http://www.itnpc.com/news/web/145586447142569.html)
- [ECMAScript 6 in WebStorm: Transpiling](https://blog.jetbrains.com/webstorm/2015/05/ecmascript-6-in-webstorm-transpiling/#babelfilewatcher)
- [Babel 入门教程](http://www.ruanyifeng.com/blog/2016/01/babel.html)
- [ES2015 & babel 实战：开发NPM模块](http://cnodejs.org/topic/565c65c4b31692e827fdd00c)
- [ES6 Babel Browserify Boilerplate](https://github.com/thoughtram/es6-babel-browserify-boilerplate)
