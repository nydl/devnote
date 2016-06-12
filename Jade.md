
<meta http-equiv="content-type" content="text/html; charset=UTF-8">

<link href="css/markdown7.css" media="all" rel="stylesheet" type="text/css" />

JADE
====

非常简洁、强大的html模版，express 内置标准模版！
虽然在上万行的测试效率方面比 ejs 低，但是，实际上模版文件一般也就几百行，
毫秒级别的差异可忽略不计！

但是，代码数要少好几倍！
强烈推荐！！！

语法：<http://naltatis.github.io/jade-syntax-docs/>
源码: <https://github.com/visionmedia/jade>

html 转换为jade
  http://html2jade.org/

jade转换为html
  Jade watcher
  
## 功能

- client-side support
- great readability
- flexible indentation
- block-expansion
- mixins
- static includes
- attribute interpolation
- code is escaped by default for security
- contextual error reporting at compile &amp; run time
- executable for compiling jade templates via the command line
- html 5 mode (the default doctype)
- optional memory caching
- combine dynamic and static tag classes
- parse tree manipulation via _filters_
- template inheritance
- block append / prepend
- supports [Express JS](http://expressjs.com) out of the box
- transparent iteration over objects, arrays, and even non-enumerables via `each`
- block comments
- no tag prefix
- filters
	- :stylus must have [stylus](http://github.com/LearnBoost/stylus) installed
	- :less must have [less.js](http://github.com/cloudhead/less.js) installed
	- :markdown must have [markdown-js](http://github.com/evilstreak/markdown-js), [node-discount](http://github.com/visionmedia/node-discount), or [marked](http://github.com/chjj/marked) installed
	- :cdata
	- :coffeescript must have [coffee-script](http://jashkenas.github.com/coffee-script/) installed
- [Emacs Mode](https://github.com/brianc/jade-mode)
- [Vim Syntax](https://github.com/digitaltoad/vim-jade)
- [TextMate Bundle](http://github.com/miksago/jade-tmbundle)
- [Coda/SubEtha syntax Mode](https://github.com/aaronmccall/jade.mode)
- [Screencasts](http://tjholowaychuk.com/post/1004255394/jade-screencast-template-engine-for-nodejs)
- [html2jade](https://github.com/donpark/html2jade) converter

	
	
## 示例
```jade
!!! 5
html
  head
    meta(charset='utf-8')
    title my jade template
  body
    h1 Hello #{name}
```
输出：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>my jade template</title>
  </head>
  <body>
    <h1>Hello Bob</h1>
  </body>
</html>		
```

## 标记
直接写标记，不需要 <>，不需要配套的结束标记，代码量少好几倍，更清晰更简短！
层次关系通过 空格实现，非常直观！

div 可省略
\#user
.user.user2

### 单行嵌套
  ul.nav
    li.active: a(href="#") Home
    li: a(href="#about") About
    li: a(href="#contact") Contact
		
	注意 : 及 ) 后的空格，如果没有空格，将得不到正确结果
	
### Doctypes

To add a doctype simply use !!!, or doctype followed by an optional value:

`!!!`
or
`doctype`
Will output the html 5 doctype, however:

`!!! transitional`
Will output the `transitional doctype`.

Doctypes are case-insensitive, so the following are equivalent:
```
doctype Basic
doctype basic
```
it's also possible to simply pass a doctype literal:
```
doctype html PUBLIC "-//W3C//DTD XHTML Basic 1.1//EN"
```
yielding:
```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML Basic 1.1//EN">
```

Below are the doctypes defined by default, which can easily be extended:
```
var doctypes = exports.doctypes = {
  '5': '<!DOCTYPE html>',
  'default': '<!DOCTYPE html>',
  'xml': '<?xml version="1.0" encoding="utf-8" ?>',
  'transitional': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
  'strict': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">',
  'frameset': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">',
  '1.1': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">',
  'basic': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML Basic 1.1//EN" "http://www.w3.org/TR/xhtml-basic/xhtml-basic11.dtd">',
  'mobile': '<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.2//EN" "http://www.openmobilealliance.org/tech/DTD/xhtml-mobile12.dtd">'
};
```
To alter the default simply change:
```
jade.doctypes.default = 'whatever you want';
```	
	
### 属性
	a(href='/login', title='View login page') Login
	注意 Login 之前的空格！

## 文本
通过 . 或 | 实现，注意 p. 中间不能有 空格  
注意，script、style 两个标记的文本不需要 | 符号，可直接写！

```
html
  body
    | <h1>Title</h1>
    | <p>foo bar baz</p>
```
或者：
```
html
  body.
    <h1>Title</h1>
    <p>foo bar baz</p>
```
注意，点前面不能有空格！

jade 空格	
|男&nbsp;&nbsp;&nbsp;&nbsp;	

		
## 变量

jade变量属于 js 代码的一种，jade 模版 不通过 代码标记-，也能智能识别 js 代码，
因此，代码中的变量，能自动转换为字符串！

任何模版都支持变量，一般都通过 = 来实现，jade则支持好几种：

- = 或 != 
		\- var foo = 'bar'
		= foo
		h1= foo	
	注意 =前面不能有空格！！！

	= 对 <> 会自动转码，确保一些html标记按原文输出，  
	!= 则 不会转码，内嵌的 html 标记将 按标记输出，相当于 能获得 标记效果！
		{"name": "Hello <em>World</em>"}
		li= name  <li>Hello &lt;em&gt;World&lt;/em&gt;</li>
		li!= name <li>Hello <em>World</em></li>
		
- 字符串嵌入变量引用 \#{} 或 !{}
	同时，与 = 一样的效果，undefined时， #{} 自动转换为 undefined字符串	
		a(href='/user/' + user.id)= user.name
      作为变量处理！
	等同：
		a(href='/user/#{user.id}')= user.name
      内嵌写法！
	如对 undefined变量显示空字符串，则需对变量进行判断！	
    a(href='/user/#{user.id?user.id:''}')= user.name
     
      

## 代码
Jade目前支持三种类型的可执行代码，第一种以-为前缀，不会被缓冲：

更加智能，书写非常流程，爽！不像其他 模版，需要前缀、后缀！

- 前缀\- 实现，如 \- var foo = 'bar'
- 智能推断，如 if, else if, else, until, while, unless 
  unless user.isAnonymous
    p You're logged in as #{user.name}
  
- = 对于 p textarea等 非 value 可直接使用 =
  如
    p=nick
    a=nick
    
    input#txNick.input-xlarge(type="text", name="txNick", value=nick)
    undefined 会输出空
    input#txShowName.input-xlarge(type="text", name="txAlias", value="#{alias}")
    undefined 会输出 undefined字符串！
    
- !=

- var foo = 'bar';
这可被用于条件或循环：

- for (var key in obj)
  p= obj[key]
由于Jade的缓冲技术，下面的代码是有效的：

- if (foo)
  ul
    li yay
    li foo
    li worked
- else
  p oh no! you are not in csser.com
  
如果 foo 未定义，会报错！
  
if typeof foo !== "undefined"
  
甚至详细的迭代循环：

- if (items.length)
  ul
    - items.forEach(function(item){
      li= item
    - })
任何你希望的都可以实现！

接下来我们转义了缓冲代码，用于缓冲返回值，以等号（=）作为前缀：

- var foo = 'bar'
= foo
h1= foo
输出： bar<h1>bar</h1>. 被'='缓冲的代码会默认经过转义以增强安全性，要输出为转义的值需要使用 !=：

p!= aVarContainingMoreHTML
一个允许使用"vanilla"Javascript的例外，是 - each 标记，其表现形式为：

- each VAL[, KEY] in OBJ
实现循环数组的例子：

- var items = ["one", "two", "three"]
- each item in items
  li= item
输出:

<li>one</li>
<li>two</li>
<li>three</li>
循环对象的键和值：

- var obj = { foo: 'bar' }
- each val, key in obj
  li #{key}: #{val}
这会输出 <li>foo: bar</li>

也可以进行嵌套循环：

- each user in users
  - each role in user.roles
    li= role
当一个属性为undefined，Jade会输出空串，例如：

textarea= user.signature
近期的Jade版本会输出空字符串而不是undefined：

<textarea></textarea>




## 迭代
所有模版都支持迭代，否则无法实现列表！

```
- var items = ["one", "two", "three"]
each item in items
  li= item
```
outputs:
```
<li>one</li>
<li>two</li>
<li>three</li>
```

iterating an array with index:
```
items = ["one", "two", "three"]
each item, i in items
  li #{item}: #{i}
```

outputs:
```
<li>one: 0</li>
<li>two: 1</li>
<li>three: 2</li>
```

iterating an object's keys and values:
```
obj = { foo: 'bar' }
each val, key in obj
  li #{key}: #{val}
```
would output `<li>foo: bar</li>`

Internally Jade converts these statements to regular JavaScript loops such as users.forEach(function(user){, 
so lexical scope and nesting applies as it would with regular JavaScript:
```
each user in users
  each role in user.roles
    li= role
```
You may also use for if you prefer:
```
for user in users
  for role in user.roles
    li= role
```

## 注释
注释通过 // 实现，如果不需要输出，则用 //-

## 过滤器
相当于插件，一般模版都不支持过滤器，比如 内置的 markdown过滤器，也就是说可以写入 markdown，输出 html！

:markdown
  # Markdown
  
  I often like including markdown documents in my jade templates.
:coffee
  console.log 'This is coffee script'
  
  
```
body
  :markdown
    Woah! jade _and_ markdown, very **cool**
    we can even link to [stuff](http://google.com)
```
输出：
```
<body><p>Woah! jade <em>and</em> markdown, very <strong>cool</strong> we can even link to <a href="http://google.com">stuff</a></p></body>
```

## 继承
一般模版没有继承。继承通过 `block` and `extends` 关键字实现。  
express 支持 jade 继承功能！
一般 内容模块会从 母版继承！

block 缺省时覆盖, 也可 prepend, or append blocks. 

## 包含 include
一个jade 文件可包含另外一个文件，包括 js、css、jade，缺省为 jade后缀！

```
html
  include includes/head
  body
    h1 My Site
    p Welcome to my super amazing site.
    include includes/foot
```

## 混入 mixin
插入 片段，类似 ejs 的 partials 功能，如果跨文件，则 需通过 include将独立文件包含进来！
ejs 则 不需要 包含，通过 名称约定完成，jade 更加灵活！


```
mixin book(name, price)
  li #{name} for #{price} €
  
ul#books
  +book("Book A", 12.99)
  +book("Book B", 5.99)
```

输出：
```	
<ul id="books">
  <li>Book A for 12.99 €</li>
  <li>Book B for 5.99 €</li>
</ul>
```


## 传值

Passing Variables to Your Templates via the Response Object
Variables can be passed down to a template as a parameter to the response object, but functions cannot. Here is an example showing how to set and access these variables.
```
var locals = { title: 'My page title', includes: {charting: true} };
app.render( 'mypage', locals );
```
Template File
```
<% if( locals.includes.charting ) { %>
<p>Charting is included</p>
<% } %>
<p>locals:<%- JSON.stringify(locals) %></p>
```

Functions cannot be passed down via the response object. That means there is no replacement for the template-initiated processing that dynamic helpers provided.
Another trick is to use middleware to add properties or methods to the request object then, on render, pass derived properties to the render method. This is how the connect-flash modules operates.
Passing Variables to Your Templates via the App Object
You can pass app-level variables to your templates by attaching properties or functions to app.settings. Although this is referred to as app.locals in the documentation, you can’t actually set app.locals.myvar to a value and see this in your template. I presume this is another case of documentation written for people who already understand the application, meaning it wasn’t written for me.
To set an app-level variable or function you either call app.set() or set a property of app.settings as shown below.
In app.js
```
app.set('tLaunch',new Date());
app.settings.appName = 'MyApp';    // Equivalent to using app.set(appName,'MyApp');
app.set('appVersion',function() { config.getAppVersion() });
```
To read the app-level variable in your template you reference settings.myvar. To call the function you call settings.myfunc(). Remember, you can’t pass any parameters to the function, so you can’t get request-specific data using this function.
Template File
```
<p>The time my app was launched:<%- settings.tLaunch.toString() %></p>
<p>App Name:<%- settings.appName %></p>
<p>App Version:<%- settings.appVersion() %></p>
```

app.locals
Application local variables are provided to all templates rendered within the application. This is useful for providing helper functions to templates, as well as app-level data.

app.locals.title = 'My App';
app.locals.strftime = require('strftime');
The app.locals object is a JavaScript Function, which when invoked with an object will merge properties into itself, providing a simple way to expose existing objects as local variables.

app.locals({
  title: 'My App',
  phone: '1-250-858-9990',
  email: 'me@myapp.com'
});

app.locals.title
// => 'My App'

app.locals.email
// => 'me@myapp.com'
By default Express exposes only a single app-level local variable, settings.

app.set('title', 'My App');
// use settings.title in a view


## radio select

      .control-group
        label.control-label(for="txSex") 性别
        .controls
          label.radio.inline
            input#txSex1.inline(type="radio", name="txSex", value="男", checked=sex=="男")
            | 男&nbsp;&nbsp;&nbsp;&nbsp;
          label.radio.inline
            input#txSex2.inline(type="radio", name="txSex", value="女", checked=sex=="女")
            女
      .control-group
        label.control-label(for="txType") 类别
        .controls
          select#txType(name="txType")
            option(value=1,selected=type==1) 个人
            option(value=2,selected=type==2) 企业
            option(value=3,selected=type==3) 群组
            option(value=4,selected=type==4) 公众
            
Boolean Attributes

Boolean attributes are mirrored by Jade, and accept bools, aka true or false. When no value is specified true is assumed.

input(type='checkbox', checked)
input(type='checkbox', checked=true)
input(type='checkbox', checked=false)
input(type='checkbox', checked=true.toString())
<input type="checkbox" checked="checked" />
<input type="checkbox" checked="checked" />
<input type="checkbox" />
<input type="checkbox" checked="true" />

            

## undefined 处理
  后台 render对象 与 jade模版引用的变量不一致，导致缺失的字段全部显示 undefined 字符串！
    input#txNick.input-xlarge(type="text", name="txNick", value=nick)
    undefined 会输出空
    input#txShowName.input-xlarge(type="text", name="txAlias", value="#{alias}")
    undefined 会输出 undefined字符串！
  
            