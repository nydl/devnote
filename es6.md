<meta http-equiv="content-type" content="text/html; charset=UTF-8">

<link href="css/markdown.css" rel="stylesheet" />

<link href="css/prettify.css" rel="stylesheet" />

<script src="http://apps.bdimg.com/libs/jquery/2.0.3/jquery.min.js"></script>

<script src="js/prettify.js"></script>  

ECMAScript 6
============

>js6 的发布，是程序界的一件大事，通过吸收其他高级语言的优点，修正js5长期以来的缺陷部分，将 js 一个脚本语言，正式升级为能抗衡一切其他语言的能力。  
无论在语义、功能、灵活等方面，全面超越无数其他高级语言，具备一统江湖的霸气。

相关资源

- ECMAScript 6入门 http://es6.ruanyifeng.com

## Class 类

### Class基本语法

js长期以来，原生语法中没有class，class虽然作为保留字，但是由于最初的js不过只是在6天内设计出的脚本语言，设计者没有时间完成class的设计，导致 js 使用者对 类 很少使用，也很少理解。

而类，是面向对象编程比不可少的部分，通过类封装业务逻辑，可减少代码污染，多实例，隔离逻辑，团队合作。  
不实用类，相当于将所有 代码作为全局静态函数使用，逻辑涉及的变量（属性），必须安实例存放在单独的变量中，相当于逻辑与变量不在一起，的确不便于封装和隔离。

js语言的传统方法是通过构造函数和原型来设计对象，比如：

```js
// 构造函数
function Point(x,y){
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

// 或者
Point.prototype = {
  toString: function () {
    return '(' + this.x + ', ' + this.y + ')';
  };
}

// 静态变量
Point.a = 'xx';

// 使用
var p = new Point(10, 20);
p.toString();
Point.a = 'yy'
```

new 会执行 构造函数产生性的对象实例，原型对象会赋值给新生成的对象实例，意味着函数是所有实例通过原型共享的，静态变量不需要new，异能直接使用。

这种写法跟传统的面向对象语言（比如C++和Java）差异很大，很容易让新学习这门语言的程序员感到困惑。

ES6提供了更接近传统语言的写法，引入了Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类。基本上，ES6的class可以看作只是一个语法糖，它的绝大部分功能，ES5都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。上面的代码用ES6的“类”改写，就是下面这样。

```js
//定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```

上面代码定义了一个“类”，可以看到里面有一个constructor方法，这就是构造方法，而this关键字则代表实例对象。也就是说，ES5的构造函数Point，对应ES6的Point类的构造方法。

Point类除了构造方法，还定义了一个toString方法。注意，定义“类”的方法的时候，前面不需要加上function这个关键字，直接把函数定义放进去了就可以了。另外，方法之间不需要逗号分隔，加了会报错。

ES6的类，完全可以看作构造函数的另一种写法。
```js
class Point{
  // ...
}

typeof Point // "function"
Point === Point.prototype.constructor // true
```

上面代码表明，类的数据类型就是函数，类本身就指向构造函数。

构造函数的prototype属性，在ES6的“类”上面继续存在。事实上，类的所有方法都定义在类的prototype属性上面。
```js
class Point {
  constructor(){
    // ...
  }

  toString(){
    // ...
  }

  toValue(){
    // ...
  }
}

// 等同于

Point.prototype = {
  toString(){},
  toValue(){}
};
```

在类的实例上面调用方法，其实就是调用原型上的方法。

## Module 模块

>ES6的Class只是面向对象编程的语法糖，升级了ES5的构造函数的原型链继承的写法，并没有解决不同js文件的引用问题，也就是模块化问题。Module功能就是为了解决这个问题而提出的。

## 快速上手

模块最大作用就是输入、输出，使用非常简单，只需记住其规定的语法即可：

```js
// 输出
var d = 10;
export [default] function/class/d //注意，default 在一个模块中只能一个，default 后面必须是变量，相当于给 default 赋值！
export {a,b,c} // 输出一组对象

// 输入
import d, {a,b,c} from './m' // 缺省输入不需要大括号，其他函数、变量需要大括号
import * as abc from './m'
```

## 详细说明

历史上，JavaScript一直没有模块（module）体系，无法将一个大程序拆分成互相依赖的小文件，再用简单的方法拼装起来。其他语言都有这项功能，比如Ruby的require、Python的import，甚至就连CSS都有@import，但是JavaScript任何这方面的支持都没有，这对开发大型的、复杂的项目形成了巨大障碍。

在ES6之前，社区制定了一些模块加载方案，最主要的有CommonJS和AMD两种。前者用于服务器，后者用于浏览器。ES6在语言规格的层面上，实现了模块功能，而且实现得相当简单，完全可以取代现有的CommonJS和AMD规范，成为浏览器和服务器通用的模块解决方案。

ES6模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS和AMD模块，都只能在运行时确定这些东西。比如，CommonJS模块就是对象，输入时必须查找对象属性。

```js
// CommonJS模块
let { stat, exists, readFile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat, exists = _fs.exists, readfile = _fs.readfile;
```

上面代码的实质是整体加载fs模块（即加载fs的所有方法），生成一个对象（_fs），然后再从这个对象上面读取3个方法。这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。

ES6模块不是对象，而是通过export命令显式指定输出的代码，输入时也采用静态命令的形式。
```
// ES6模块
import { stat, exists, readFile } from 'fs';
```

上面代码的实质是从fs模块加载3个方法，其他方法不加载。这种加载称为“编译时加载”，即ES6可以在编译时就完成模块加载，效率要比CommonJS模块的加载方式高。当然，这也导致了没法引用ES6模块本身，因为它不是对象。

由于ES6模块是编译时加载，使得静态分析成为可能。有了它，就能进一步拓宽JavaScript的语法，比如引入宏（macro）和类型检验（type system）这些只能靠静态分析实现的功能。

除了静态加载带来的各种好处，ES6模块还有以下好处。

- 不再需要UMD模块格式了，将来服务器和浏览器都会支持ES6模块格式。目前，通过各种工具库，其实已经做到了这一点。
- 将来浏览器的新API就能用模块格式提供，不再必要做成全局变量或者navigator对象的属性。
- 不再需要对象作为命名空间（比如Math对象），未来这些功能可以通过模块提供。
- 严格模式：ES6的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";。

严格模式主要有以下限制。

- 变量必须声明后再使用
- 函数的参数不能有同名属性，否则报错
- 不能使用with语句
- 不能对只读属性赋值，否则报错
- 不能使用前缀0表示八进制数，否则报错
- 不能删除不可删除的属性，否则报错
- 不能删除变量delete prop，会报错，只能删除属性delete global[prop]
- eval不会在它的外层作用域引入变量
- eval和arguments不能被重新赋值
- arguments不会自动反映函数参数的变化
- 不能使用arguments.callee
- 不能使用arguments.caller
- 禁止this指向全局对象
- 不能使用fn.caller和fn.arguments获取函数调用的堆栈
- 增加了保留字（比如protected、static和interface）
- 上面这些限制，模块都必须遵守。由于严格模式是ES5引入的，不属于ES6，所以请参阅相关ES5书籍，本书不再详细介绍了。

### export命令

模块功能主要由两个命令构成：export和import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。

一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量。下面是一个JS文件，里面使用export命令输出变量。
```
// profile.js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;
```

上面代码是profile.js文件，保存了用户信息。ES6将其视为一个模块，里面用export命令对外部输出了三个变量。

export的写法，除了像上面这样，还有另外一种。
```
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export {firstName, lastName, year};
```

上面代码在export命令后面，使用大括号指定所要输出的一组变量。它与前一种写法（直接放置在var语句前）是等价的，但是应该优先考虑使用这种写法。因为这样就可以在脚本尾部，一眼看清楚输出了哪些变量。

export命令除了输出变量，还可以输出函数或类（class）。
```
export function multiply(x, y) {
  return x * y;
};
```
上面代码对外输出一个函数multiply。

通常情况下，export输出的变量就是本来的名字，但是可以使用as关键字重命名。
```
function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
```

上面代码使用as关键字，重命名了函数v1和v2的对外接口。重命名后，v2可以用不同的名字输出两次。

需要特别注意的是，export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。

```
// 报错
export 1;

// 报错
var m = 1;
export m;
```

上面两种写法都会报错，因为没有提供对外的接口。第一种写法直接输出1，第二种写法通过变量m，还是直接输出1。1只是一个值，不是接口。正确的写法是下面这样。
```
// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};
```

上面三种写法都是正确的，规定了对外的接口m。其他脚本可以通过这个接口，取到值1。它们的实质是，在接口名与模块内部变量之间，建立了一一对应的关系。

同样的，function和class的输出，也必须遵守这样的写法。
```
// 报错
function f() {}
export f;

// 正确
export function f() {};

// 正确
function f() {}
export {f};
另外，export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。

export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);
```

上面代码输出变量foo，值为bar，500毫秒之后变成baz。

这一点与CommonJS规范完全不同。CommonJS模块输出的是值的缓存，不存在动态更新，详见下文《ES6模块加载的实质》一节。

最后，export命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，下一节的import命令也是如此。这是因为处于条件代码块之中，就没法做静态优化了，违背了ES6模块的设计初衷。
```
function foo() {
  export default 'bar' // SyntaxError
}
foo()
```

上面代码中，export语句放在函数之中，结果报错。

### import命令

>使用export命令定义了模块的对外接口以后，其他JS文件就可以通过import命令加载这个模块（文件）。
```
// main.js

import {firstName, lastName, year} from './profile';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}
```

上面代码的import命令，就用于加载profile.js文件，并从中输入变量。import命令接受一个对象（用大括号表示），里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块（profile.js）对外接口的名称相同。

如果想为输入的变量重新取一个名字，import命令要使用as关键字，将输入的变量重命名。
```
import { lastName as surname } from './profile';
注意，import命令具有提升效果，会提升到整个模块的头部，首先执行。

foo();

import { foo } from 'my_module';
```

上面的代码不会报错，因为import的执行早于foo的调用。

如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。
```
export { es6 as default } from './someModule';

// 等同于
import { es6 } from './someModule';
export default es6;
```

上面代码中，export和import语句可以结合在一起，写成一行。但是从可读性考虑，不建议采用这种写法，而应该采用标准写法。

另外，ES7有一个提案，简化先输入后输出的写法，拿掉输出时的大括号。
```
// 提案的写法
export v from 'mod';

// 现行的写法
export {v} from 'mod';
```

import语句会执行所加载的模块，因此可以有下面的写法。
```
import 'lodash';
```

上面代码仅仅执行lodash模块，但是不输入任何值。

模块的整体加载
除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面。

下面是一个circle.js文件，它输出两个方法area和circumference。
```
// circle.js

export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}
```

现在，加载这个模块。
```
// main.js

import { area, circumference } from './circle';

console.log('圆面积：' + area(4));
console.log('圆周长：' + circumference(14));
```

上面写法是逐一指定要加载的方法，整体加载的写法如下。
```
import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```


# EcmaScript6 全规范（含node）

[参考](https://github.com/ouvens/es6-code-style-guide)

* 一、类型规范
* 二、字符串模板
* 三、数组类型
* 四、解构类型
* 五、函数
* 六、arrow箭头函数
* 七、对象
* 八、类
* 九、模块
* 十、Iterators 和 Generators
* 十一、属性访问
* 十二、map + set + weakmap + weakset 数据结构
* 十三、promise、symbols、proxies
* 十四、统一码
* 十五、进制数支持
* 十六、不建议使用reflect对象和tail calls尾调用


## 一、类型规范
> 对于常量或不修改的变量声明使用const，对于只在当前作用域下有效的变量，应使用let，全局变量使用var。将所有 const 变量放在一起，然后将所有 let 变量放在一起

```javascript

const foo = 1;

let foo1 = 2;
let bar = foo;
bar = 9;
foo1 = 3;

console.log(foo, bar); // => 1, 9
console.log(foo, bar, str); // => 1, 9,'ouven'

```

>  const和let使用时注意，let 和 const 都是块作用域的

```javascript

// const and let only exist in the blocks they are defined in.
{
  let a = 1;
  const b = 1;
}
console.log(a); // ReferenceError
console.log(b); // ReferenceError

```

## 二、字符串
> 使用单引号 '

```javascript

// bad
var name = "Bob Parr";
 
// good
var name = 'Bob Parr';
 
// bad
var fullName = "Bob " + this.lastName;
 
// good
var fullName = 'Bob ' + this.lastName;

```

超过80个字符的字符串应该使用字符串连接换行
注：如果过度使用长字符串连接可能会对性能有影响。jsPerf & Discussion

```javascript

// bad
var errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';
 
// bad
var errorMessage = 'This is a super long error that \
was thrown because of Batman. \
When you stop to think about \
how Batman had anything to do \
with this, you would get nowhere \
fast.';
 
 
// good
var errorMessage = 'This is a super long error that ' +
  'was thrown because of Batman.' +
  'When you stop to think about ' +
  'how Batman had anything to do ' +
  'with this, you would get nowhere ' +
  'fast.';
  
```

> 编程构建字符串时，使用字符串模板而不是字符串连接

模板给你一个可读的字符串，简洁的语法与适当的换行和字符串插值特性。

```javascript

// bad
function sayHi(name) {
  return 'How are you, ' + name + '?';
}
 
// bad
function sayHi(name) {
  return ['How are you, ', name, '?'].join();
}
 
// good
function sayHi(name) {
  return `How are you, ${name}?`;
}
```

## 三、数组类型
> 使用字面量语法创建数组

```javascript
// bad
const items = new Array();
 
// good
const items = [];
```
> 如果你不知道数组的长度，使用 push

```javascript
const someStack = [];
 
// bad
someStack[someStack.length] = 'abracadabra';
 
// good
someStack.push('abracadabra');
```
> 使用 ... 来拷贝数组，不要使用 Array.from、Array.of等数组的新的内置API，Array新api用于适合的场景

```javascript
// bad
const len = items.length;
const itemsCopy = [];
let i;
 
for (i = 0; i < len; i++) {
  itemsCopy[i] = items[i];
}
 
// good
const itemsCopy = [...items];

// not good
const foo = [1,2,3];
const nodes = Array.from(foo);
```

## 四、解构 Destructuring
使用对象的多个属性时请建议使用对象的解构赋值，解构赋值避免了为这些属性创建临时变量或对象。即使转化成es5都是一样的

>  嵌套结构的对象层数不能超过3层

```javascript
// not good
let obj = {
  'one': [
    {
      'newTwo': [
        {
          'three': [
            'four': '太多层了，头晕晕'
          ]
        }
      ]
    }
  ]
};

// good
let obj = {
  'one': [
    'two',
    {
      'twoObj': '结构清晰'
    }
  ]
};
```
> 解构语句中统一不使用圆括号

```javascript
// not good
[(a)] = [11]; // a未定义
let { a: (b) } = {}; // 解析出错


// good
let [a, b] = [11, 22];
```
> 对象解构

对象解构元素与顺序无关
对象指定默认值时仅对恒等于undefined ( !== null ) 的情况生效

>  若函数形参为对象时，使用对象解构赋值

```javascript
// not good
function someFun(opt) {
  let opt1 = opt.opt1;
  let opt2 = opt.opt2;
  console.log(op1);
}


// good
function someFun(opt) {
  let { opt1, opt2 } = opt;
  console.log(`$(opt1) 加上 $(opt2)`);
}

function someFun({ opt1, opt2 }) {
  console.log(opt1);
}
```
>  若函数有多个返回值时，使用对象解构，不使用数组解构，避免添加顺序的问题

```javascript
// not good
function anotherFun() {
  const one = 1, two = 2, three = 3;
  return [one, two, three];
}
const [one, three, two] = anotherFun(); // 顺序乱了
// one = 1, two = 3, three = 2


// good
function anotherFun() {
  const one = 1, two = 2, three = 3;
  return { one, two, three };
}
const { one, three, two } = anotherFun(); // 不用管顺序
// one = 1, two = 2, three = 3
```
>  已声明的变量不能用于解构赋值（语法错误）

```javascript
// 语法错误
let a;
{ a } = { b: 123};
```

> 数组解构时数组元素与顺序相关

例如交换数组两个元素的值

```javascript
let x = 1;
let y = 2;

// not good
let temp;
temp = x;
x = y;
y = temp;


// good
[x, y] = [y, x]; // 交换变量
```
> 将数组成员赋值给变量时，使用数组解构

```javascript
const arr = [1, 2, 3, 4, 5];

// not good
const one = arr[0];
const two = arr[1];


// good
const [one, two] = arr;
```

> 函数有多个返回值时使用对象解构，而不是数组解构。

这样你就可以随时添加新的返回值或任意改变返回值的顺序，而不会导致调用失败。

```javascript

function processInput(input) {
    // then a miracle occurs
    return [left, right, top, bottom];
  }
 
  // the caller needs to think about the order of return data
  const [left, __, top] = processInput(input);
 
  // good
  function processInput(input) {
    // then a miracle occurs
    return { left, right, top, bottom };
  }
 
  // the caller selects only the data they need
  const { left, right } = processInput(input);
```

## 五、函数
>使用函数声明而不是函数表达式

函数声明拥有函数名，在调用栈中更加容易识别。并且，函数声明会整体提升，而函数表达式只会提升变量本身。这条规则也可以这样描述，始终使用箭头函数来代替函数表达式。

```javascript
// bad
const foo = function () {
};
 
// good
function foo() {
}
```
绝对不要在一个非函数块（if，while，等等）里声明一个函数，把那个函数赋给一个变量。浏览器允许你这么做，但是它们解析不同
注：ECMA-262 把 块 定义为一组语句，函数声明不是一个语句。阅读 ECMA-262 对这个问题的说明

```javascript
// bad
if (currentUser) {
  function test() {
    console.log('Nope.');
  }
}
 
// good
if (currentUser) {
  var test = function test() {
    console.log('Yup.');
  };
}
```
> 绝对不要把参数命名为 arguments, 这将会覆盖函数作用域内传过来的 arguments 对象

```javascript
// bad
function nope(name, options, arguments) {
  // ...stuff...
}
 
// good
function yup(name, options, args) {
  // ...stuff...
}
```
> 永远不要使用 arguments，使用 ... 操作符来代替

... 操作符可以明确指定你需要哪些参数，并且得到的是一个真实的数组，而不是 arguments 这样的类数组对象。

```javascript
// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}
 
// good
function concatenateAll(...args) {
  return args.join('');
}
```
> 使用函数参数默认值语法，而不是修改函数的实参

```javascript
// really bad
function handleThings(opts) {
  opts = opts || {};
}

// still bad
function handleThings(opts) {
  if (opts === void 0) {
    opts = {};
  }
}
 
// good
function handleThings(opts = {}) {
  // ...
}
```
## 六、箭头函数 Arrow Functions
> 当必须使用函数表达式时（例如传递一个匿名函数时），请使用箭头函数

箭头函数提供了更简洁的语法，并且箭头函数中 this 对象的指向是不变的，this 对象绑定定义时所在的对象，这通常是我们想要的。如果该函数的逻辑非常复杂，请将该函数提取为一个函数声明。

```javascript
// bad
"use strict";
var fn = function fn(v) {
  return console.log(v);
};
 
// good
var fn= (v=>console.log(v));
```
> 箭头函数总是用括号包裹参数，省略括号只适用于单个参数，并且还降低了程序的可读性

```javascript
// bad
[1, 2, 3].forEach(x => x * x);

// good
[1, 2, 3].forEach((x) => x * x);
```

> 立即执行的匿名函数

```javascript
// 函数表达式
// immediately-invoked function expression (IIFE)
// good，看起来就很厉害
(() => {
  console.log('Welcome to the Internet. Please follow me.');
})();
```

## 七、对象

> 使用对象字面量创建对象


```javascript
// bad
var item = new Object();
 
// good
var item = {};
```
> 不要使用保留字（reserved words）作为键，否则在 IE8 下将出错

```javascript
// bad
var superman = {
  class: 'superhero',
  default: { clark: 'kent' },
  private: true
};
 
// good
var superman = {
  klass: 'superhero',
  defaults: { clark: 'kent' },
  hidden: true
};
```

> 创建对象时使用计算的属性名，而不要在创建对象后使用对象的动态特性，这样可以在同一个位置定义对象的所有属性。

```javascript
function getKey(k) {
    return `a key named ${k}`;
  }
 
  // bad
  const obj = {
    id: 5,
    name: 'San Francisco'
  };
  obj[getKey('enabled')] = true;
 
  // good
  const obj = {
    id: 5,
    name: 'San Francisco',
    [getKey('enabled')]: true
  };
```

> 使用定义对象方法的简短形式

```javascript
// bad
const atom = {
  value: 1,
 
  addValue: function (value) {
    return atom.value + value;
  }
};
 
// good
const atom = {
  value: 1,
 
  addValue(value) {
    return atom.value + value;
  }
};
```

> 使用定义对象属性的简短形式，书写起来更加简单，并且可以自描述。这里和es5有些不同，需要注意下

```javascript
const lukeSkywalker = 'Luke Skywalker';
 
  // bad
  const obj = {
    lukeSkywalker: lukeSkywalker
  };
 
  // good
  const obj = {
    lukeSkywalker
  };
```


> 将所有简写的属性写在对象定义的最顶部，这样可以更加方便地知道哪些属性使用了简短形式。

```javascript
const anakinSkywalker = 'Anakin Skywalker';
const lukeSkywalker = 'Luke Skywalker';
 
// bad
const obj = {
  episodeOne: 1,
  twoJedisWalkIntoACantina: 2,
  lukeSkywalker,
  episodeThree: 3,
  mayTheFourth: 4,
  anakinSkywalker
};

// good
const obj = {
  lukeSkywalker,
  anakinSkywalker,
  episodeOne: 1,
  twoJedisWalkIntoACantina: 2,
  episodeThree: 3,
  mayTheFourth: 4
};
```

## 八、类
> 总是使用 class 关键字，避免直接修改 prototype，class 语法更简洁，也更易理解。

```javascript
// bad
function Queue(contents = []) {
  this._queue = [...contents];
}
Queue.prototype.pop = function() {
  const value = this._queue[0];
  this._queue.splice(0, 1);
  return value;
}
 
// good
class Queue {
  constructor(contents = []) {
    this._queue = [...contents];
  }
  pop() {
    const value = this._queue[0];
    this._queue.splice(0, 1);
    return value;
  }
}
```
> 类名与花括号须保留一个空格间距，类中的方法定义时，括号 ) 也须与花括号 { 保留一个空格间距

```javascript
// not good
class Foo{
  constructor(){
    // constructor
  }
  sayHi()    {
    // 仅保留一个空格间距
  }
}

// good
class Foo {
  constructor() {
    // constructor
  }
  sayHi() {
    // 仅保留一个空格间距
  }
}
```
> 定义类时，方法的顺序如下：

- constructor
- public get/set 公用访问器，set只能传一个参数
- public methods 公用方法，公用相关命名使用小驼峰式写法(lowerCamelCase)
- private get/set 私有访问器，私有相关命名应加上下划线 _ 为前缀
- private methods 私有方法

```javascript
// good
class SomeClass {
  constructor() {
    // constructor
  }

  get aval() {
    // public getter
  }

  set aval(val) {
    // public setter
  }

  doSth() {
    // 公用方法
  }

  get _aval() {
    // private getter
  }

  set _aval() {
    // private setter
  }

  _doSth() {
    // 私有方法
  }
}
```
> 如果不是class类，不使用new

```javascript
// not good
function Foo() {

}
const foo = new Foo();

// good
class Foo {

}
const foo = new Foo();
```

> 使用 extends 关键字来继承

这是一个内置的继承方式，并且不会破坏 instanceof 原型检查。

```javascript

// bad
  const inherits = require('inherits');
  function PeekableQueue(contents) {
    Queue.apply(this, contents);
  }
  inherits(PeekableQueue, Queue);
  PeekableQueue.prototype.peek = function() {
    return this._queue[0];
  }
 
  // good
  class PeekableQueue extends Queue {
    peek() {
      return this._queue[0];
    }
  }
```

## 九、模块
总是在非标准的模块系统中使用标准的 import 和 export 语法，我们总是可以将标准的模块语法转换成支持特定模块加载器的语法。

> 推荐使用import和export来做模块加载

```javascript
// bad
const AirbnbStyleGuide = require('./AirbnbStyleGuide');
module.exports = AirbnbStyleGuide.es6;
 
// ok
import AirbnbStyleGuide from './AirbnbStyleGuide';
export default AirbnbStyleGuide.es6;
 
// best
import { es6 } from './AirbnbStyleGuide';
export default es6;
```
> import / export 后面采用花括号{ }引入模块的写法时，建议在花括号内左右各保留一个空格

```javascript
// not good
import {lightRed} from './colors';
import { lightRed} from './colors';

// good
import { lightRed } from './colors';
```
> 不要使用通配符 * 的 import，这样确保了一个模块只有一个默认的 export 项

```javascript
// bad
import * as AirbnbStyleGuide from './AirbnbStyleGuide';
 
// good
import AirbnbStyleGuide from './AirbnbStyleGuide';
```
> 不要直接从一个 import 上 export

虽然一行代码看起来更简洁，但是有一个明确的 import 和一个明确的 export 使得代码行为更加明确。

```javascript
// bad
// filename es6.js
export default { es6 } from './airbnbStyleGuide';
 
// good
// filename es6.js
import { es6 } from './AirbnbStyleGuide';
export default es6;
```
> 多变量要导出时应采用对象解构形式

```javascript
// not good
export const a= 'a';
export const b= 'b';

// good
export const a= 'a';
export const b= 'b';

export default { a, b };
```
> 导出单一一个类时，确保你的文件名就是你的类名

```javascript

// file contents
class CheckBox {
  // ...
}
module.exports = CheckBox;
 
// in some other file
// bad
const CheckBox = require('./checkBox');
 
// bad
const CheckBox = require('./check_box');
 
// good
const CheckBox = require('./CheckBox');
```

> 导出一个默认小驼峰命名的函数时，文件名应该就是导出的方法名

```javascript
function makeStyleGuide() {
}
 
export default makeStyleGuide;
```

> 导出单例、函数库或裸对象时，使用大驼峰命名规则

```javascript
const AirbnbStyleGuide = {
  es6: {
  }
};
 
export default AirbnbStyleGuide;
```

## 十、Iterators 和 Generators

> Iterators。性能比较差，对于数组来说大致与Array.prototype.forEach相当，比不过原生的for循环，而且用起来比较麻烦，数组提供了for...of，对象提供了for...in，不推荐使用迭代器。

```javascript
const numbers = [1, 2, 3, 4, 5];

// bad
var iterator = numbers[Symbol.iterator]();  
var result = iterator.next();
let sum = 0;
while (!result.done) {
    sum += result.value;
    result = iterator.next();  
}  

// good
let sum = 0;
for (let num of numbers) {
  sum += num;
}
sum === 15;

// good
let sum = 0;
numbers.forEach((num) => sum += num);
sum === 15;

// best (use the functional force)
const sum = numbers.reduce((total, num) => total + num, 0);
sum === 15;
```

> generators。不推荐使用，或者非常谨慎地使用。

生成器不是用来写异步的，虽然确实有这样一个效果，但这仅仅是一种Hack。异步在未来一定是属于async和await这两个关键字的，但太多人眼里生成器就是写异步用的，这会导致滥用。暂时推荐用promise来实现异步。

## 十一、属性访问

> 使用点 . 操作符来访问常量属性

```javascript
const luke = {
  jedi: true,
  age: 28
};
 
// bad
const isJedi = luke['jedi'];
 
// good
const isJedi = luke.jedi;
```

> 使用中括号[] 操作符来访问变量属性

```javascript
var luke = {
  jedi: true,
  age: 28
};
 
function getProp(prop) {
  return luke[prop];
}
 
var isJedi = getProp('jedi');
```

## 十二、map + set + weakmap + weakset 数据结构

> 新加的集合类型，提供了更加方便的获取属性值的方法，可以检查某个属性是属于原型链上还是当前对象的，并用获取对象的set和get方法


> 但是，推荐使用weakmap和weakset，而不是map和set，除非必须使用。普通集合会阻止垃圾回收器对这些作为属性键存在的对象的回收，有造成内存泄漏的危险

```javascript
// not good, Maps
var wm = new Map();
wm.set(key, { extra: 42 });
wm.size === 1

// not good, Sets
var ws = new Set();
ws.add({ data: 42 });

// good, Weak Maps
var wm = new WeakMap();
wm.set(key, { extra: 42 });
wm.size === undefined

// good, Weak Sets
var ws = new WeakSet();
ws.add({ data: 42 });//因为添加到ws的这个临时对象没有其他变量引用它，所以ws不会保存它的值，也就是说这次添加其实没有意思

// not good
let object = {},
object.hasOwnProperty(key)

// good
let object = new WeakSet();
object.has(key) === true;
```

- 当你的元素或者键值有可能不是字符串时，推荐使用WeakMap和WeakSet。

```javascript
// bad
var obj = { 3:'value' };

// good
var ws = new WeakSet();
ws.add(3, 'value');
```

- 有移除操作的需求时，使用WeakMap和WeakSet。

```javascript
// bad
var obj = { 'key':'value' };
delete obj.key;

// good
var ws = new WeakSet();
ws.add('key', 'value');
ws.remove('key');
```

- 当仅需要一个不可重复的集合时，使用WeakSet优先于普通对象，而不要使用{foo: true}这样的对象。

```javascript
// bad
var obj = { 'key':'value' };

// good
var ws = new WeakSet();
ws.add('key', 'value');
```

- 当需要遍历功能时，使用WeakMap和WeakSet，因为其可以简单地使用for..of进行遍历，性能更高

```javascript
// bad
var obj = { key:'value', key1: 'value1' };
for(var key in obj){
}

// good
var ws = new WeakSet();
ws.add('key', 'value').add('key1', 'value1');
for(var key of ws){
}
```

## 十三、promise、symbols、proxies

> promise是一种异步处理模式。发promise申明和调用分开，推荐异步方式使用Promise。

```javascript

// not good
(new Promise(resolve, reject){})
    .then(cunction(){},function(){})
    .then();

// good
var promise = new Primise(function(resolve, reject){});
promise
    .then(function(){},function(){]})
    .then();

```

> symbol用于对象的键和私有属性，使用过于复杂，没有使用必要，容易扰乱外层作用域。总之不要使用

```javascript
// good
function MyClass(privateData) {
    let key = privateData;
}

//not good
const key = Symbol('key');
function MyClass(privateData) {
    this[key] = privateData;
}

const object = new MyClass("hello")
object['key'] === undefined //无法访问该属性，因为是私有的
```

> Proxy可以监听对象身上发生了什么事情，并在这些事情发生后执行一些相应的操作，没有特别要注意的，尽情用吧。


## 十四、不要使用统一码
> 字符串支持新的Unicode文本形式，也增加了新的正则表达式修饰符u来处理码位，但是一般不要这样处理，会减低程序可读性且处理统一码速度会降低

```javascript
// not good
'字符串'.length == 6

// 新加的：正则支持统一码'u'， 但仍建议不使用
// not good
'字符串'.match(/./u)[0].length == 6
'字符串'.codePointAt(0) == 0x20BB7

```

## 十五、进制数支持

> 加入对二进制(b)和八进制(o)字面量的支持。该特性可以使用

```javascript
// ok
0b111110111 === 503 // true
0o767 === 503 // true
```

## 十六、不建议使用reflect对象和tail calls尾调用
> 没有使用的必要性

(继续完善)

[源规范](https://ouvens.github.io/frontend-javascript/2015/11/24/es6-code-style-for-node.html)

参考：
http://bubkoo.com/2015/04/05/javascript-style-guide/?utm_source=tuicool

https://github.com/gf-rd/es6-coding-style#%E5%A3%B0%E6%98%8E

https://github.com/ES-CN/es6features/blob/master/README.md?utm_source=tuicool&utm_medium=referral
