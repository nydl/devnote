
<meta http-equiv="content-type" content="text/html; charset=UTF-8">

<link href="css/markdown.css" rel="stylesheet" />

<link href="css/prettify.css" rel="stylesheet" />

<script src="http://apps.bdimg.com/libs/jquery/2.0.3/jquery.min.js"></script>

<script src="js/prettify.js"></script>  

mongoose
========

>- 文档：<http://mongoosejs.com/docs/guide.html>  
>- 手册：<http://docs.mongodb.org/manual/>  
>- 接口：<http://mongoosejs.com/docs/api.html>


基础
====

前言：本学习参考文档仅供参考，如有问题，师请雅正

## 一、快速通道
### 1.1 名词解释
Schema ： 一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力
Model ： 由Schema发布生成的模型，具有抽象属性和行为的数据库操作对
Entity ： 由Model创建的实体，他的操作也会影响数据库
注意：
本学习文档采用严格命名方式来区别不同对象，例如：
```js
var PersonSchema;   //Person的文本属性
var PersonModel;    //Person的数据库模型
var PersonEntity;   //Person实体
```

Schema、Model、Entity的关系请牢记，Schema生成Model，Model创
造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。

### 1.2 准备工作
首先你必须安装MongoDB和NodeJS
在项目只能够创建一个数据库连接，如下:
```js
var mongoose = require('mongoose');    //引用mongoose模块
    var db = mongoose.createConnection('localhost','test'); //创建一个数据库连接
```

打开本机localhost的test数据库时，我们可以监测是否有异常
```js
db.on('error',console.error.bind(console,'连接错误:'));
    db.once('open',function(){
        //一次打开记录
    });
```

注意：成功开启数据库后，就可以执行数据库相应操作，假设以下代码都
在回调中处理

定义一个Schema
```js
var PersonSchema = new mongoose.Schema({
        name:String     //定义一个属性name，类型为String
    });
```

将该Schema发布为Model
```js
var PersonModel = db.model('Person',PersonSchema);
    //如果该Model已经发布，则可以直接通过名字索引到，如下：
    //var PersonModel = db.model('Person');
    //如果没有发布，上一段代码将会异常
```

用Model创建Entity
```js
var personEntity = new PersonModel({name:'Krouky'});
    //打印这个实体的名字看看
    console.log(personEntity.name); //Krouky
```

我们甚至可以为此Schema创建方法
```js
//为Schema模型追加speak方法
PersonSchema.methos.speak = function(){
		console.log('我的名字叫'+this.name);
}
var PersonModel = db.model('Person',PersonSchema);
var personEntity = new PersonModel({name:'Krouky'});
personEntity.speak();//我的名字叫Krouky
```

Entity是具有具体的数据库操作CRUD的
```js
personEntity.save();    //执行完成后，数据库就有该数据了
```

如果要执行查询，需要依赖Model，当然Entity也是可以做到的
```js
PersonModel.find(function(err,persons){
        //查询到的所有person
    });
```

注意：
具体的如何配置Schema、Model以及Model和Entity的相关操作，我们
会在后面进行

Model和Entity都有能影响数据库的操作，但仍有区别，后面我们也会做解释


## 二、新手指引

如果您还不清楚Mongoose是如何工作的，请参看第一章快速通道快速浏览他的用法吧


### 1. Schema——纯洁的数据库原型
#### 1.1 什么是Schema
我理解Schema仅仅只是一断代码，他书写完成后程序依然无法使用，更
无法通往数据库端
他仅仅只是数据库模型在程序片段中的一种表现，或者是数据属性模型

#### 1.2 如何定义Schema
```js
var BlogSchema = new Schema({
        title:String,
        author:String
        //new Schema()中传入一个JSON对象，该对象形如 xxx:yyyy ,
        //xxx是一个字符串，定义了属性，yyy是一个Schema.Type，定义了属性类型
    });
```

#### 1.3 什么是Schema.Type
Schema.Type是由Mongoose内定的一些数据类型，基本数据类型都在其
中，他也内置了一些Mongoose特有的Schema.Type，当然，你也可以自定义Schema.Type。
只有满足Schema.Type的类型才能定义在Schema内

#### 1.4 Schema.Types
NodeJS中的基本数据类型都属于Schema.Type，另外Mongoose还定义了
自己的类型

```js
//举例：
    var ExampleSchema = new Schema({
        name:String,
        binary:Buffer,
        living:Boolean,
        updated:Date,
        age:Number,
        mixed:Schema.Types.Mixed,   //该混合类型等同于nested
        _id:Schema.Types.ObjectId,  //主键
        _fk:Schema.Types.ObjectId,  //外键
        array:[],
        arrOfString:[String],
        arrOfNumber:[Number],
        arrOfDate:[Date],
        arrOfBuffer:[Buffer],
        arrOfBoolean:[Boolean],
        arrOfMixed:[Schema.Types.Mixed],
        arrOfObjectId:[Schema.Types.ObjectId]
        nested:{
            stuff:String,
        }
    });
```

####1.5 关于Buffer
Buffer和ArrayBuffer是Nodejs两种隐藏的对象，相关内容请查看NodeJS-API

####1.6 关于Mixed
Schema.Types.Mixed是Mongoose定义个混合类型，该混合类型如果未定义具体形式，用此。

如果定义具体内容，就直接使用{}来定义，一下两句等同
```js
var AnySchema = new Schema({any:{}});
var AnySchema = new Schema({any:Schema.Types.Mixed});
```

混合类型因为没有特定约束，因此可以任意修改，一旦修改了原型，则必须调用markModified()

```js
person.anything = {x:[3,4,{y:'change'}]}
            person.markModified('anything');//传入anything，表示该属性类型发生变化
            person.save();
```

####1.7 关于ObjectId
主键，一种特殊而且非常重要的类型，每个Schema都会默认配置这个属性，属性名为_id，除非自己定义，方可覆盖

```js
var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.Types.ObjectId;
    var StudentSchema = new Schema({}); //默认会有_id:ObjectId
    var TeacherSchema = new Schema({id:ObjectId}); //只有id:ObjectId
		//该类型的值由系统自己生成，从某种意义上几乎不会重复，生成过程比较复杂，有兴趣的朋友尅查看源码

```

####1.8 关于Array
Array在JavaScript编程语言中并不是数组，而是集合，因此里面可以存入不同的值，以下代码等价：

```js
var ExampleSchema1 = new Schema({array:[]});
    var ExampleSchema2 = new Schema({array:Array});
    var ExampleSchema3 = new Schema({array:

[Schema.Types.Mixed]});
    var ExampleSchema4 = new Schema({array:[{}]});
```

####1.9 附言
Schema不仅定义了文档结构和使用性能，还可以扩展插件、实例方法、静态方法、复合索引、文档生命周期钩子。

Schema还可以定义插件，并且插件具有良好的可拔插性，请有兴趣的读者继续往后阅读或者查阅官方资料。


2. Schema的扩展
####2.1 实例方法
有的时候，我们创造的Schema不仅要为后面的Model和Entity提供公共的
属性，还要提供公共的方法

下面例子比快速通道的例子更加高级，可以进行高级扩展：
```js
var PersonSchema = new Schema({name:String,type:String});
    //查询类似数据
    PersonSchema.methods.findSimilarTypes = function(cb){
        return this.model('Person').find({type:this.type},cb);
    }
```

使用如下：
```js
var PersonModel = mongoose.model('Person',PersonSchema);
    var krouky = new PersonSchema({name:'krouky',type:'前端工程师'});
    krouky.findSimilarTypes(function(err,persons){
        //persons中就能查询到其他前端工程师
    });
```

####2.2 静态方法
静态方法在Model层就能使用，如下：
```js
PersonSchema.statics.findByName = function(name,cb){
        this.find({name:new RegExp(name,'i'),cb});
    }
    var PersonModel = mongoose.model('Person',PersonSchema);
    PersonModel.findByName('krouky',function(err,persons){
        //找到所有名字叫krouky的人
    });
```

####2.3 索引
索引或者复合索引能让搜索更加高效，默认索引就是主键索引ObjectId
，属性名为_id， 索引会作为一个专题来讲解


####2.4 虚拟属性
Schema中如果定义了虚拟属性，那么该属性将不写入数据库，例如：
```js
var PersonSchema = new Schema({
        name:{
            first:String,
            last:String
        }
    });
    var PersonModel = mongoose.model('Person',PersonSchema);
    var krouky = new PersonModel({
        name:{first:'krouky',last:'han'}
    });
```

如果每次想使用全名就得这样
```js
console.log(krouky.name.first + ' ' + krouky.name.last);
```

显然这是很麻烦的，我们可以定义虚拟属性
```js
PersonSchema.virtual('name.full').get(function(){
        return this.name.first + ' ' + this.name.last;
    });
```
那么就能用krouky.name.full来调用全名了，反之如果知道full，也可以反解first和last

```js
PersonSchema.virtual('name.full').set(function(name){
        var split = name.split(' ');
        this.name.first = split[0];
        this.name.last = split[1];
    });
    var PersonModel = mongoose.model('Person',PersonSchema);
    var krouky = new PersonModel({});
    krouky.name.full = 'krouky han';//会被自动分解
    console.log(krouky.name.first);//krouky
```

####2.5 配置项

在使用new Schema(config)时，我们可以追加一个参数options来配置Schema的配置，形如：
```js
var ExampleSchema = new Schema(config,options);

//或者使用
var ExampleSchema = new Schema(config);
    ExampleSchema.set(option,value);
```

可供配置项有：safe、strict、capped、versionKey、autoIndex

##### 2.5.1 safe——安全属性（默认安全）
一般可做如下配置：
	new Schema({...},{safe:true});

当然我们也可以这样
	new Schema({...},{safe:{j:1,w:2,wtimeout:10000}});

j表示做1份日志，w表示做2个副本（尚不明确），超时时间10秒

##### 2.5.2 strict——严格配置（默认启用）
确保Entity的值存入数据库前会被自动验证，如果你没有充足的理由，请
不要停用，例子：
```js
var ThingSchema = new Schema({a:String});
    var ThingModel = db.model('Thing',SchemaSchema);
    var thing = new Thing({iAmNotInTheThingSchema:true});
    thing.save();//iAmNotInTheThingSchema这个属性将无法被存储如果取消严格选项，iAmNotInTheThingSchema将会被存入数据库
//该选项也可以在构造实例时使用，例如：
var ThingModel = db.model('Thing');
    var thing1 = new ThingModel(doc,true);  //启用严格
    var thing2 = new ThingModel(doc,false); //禁用严格
```

注意：strict也可以设置为throw，表示出现问题将会抛出错误

##### 2.5.3 shardKey
需要mongodb做分布式，才会使用该属性

##### 2.5.4 capped——上限设置
如果有数据库的批量操作，该属性能限制一次操作的量，例如：
new Schema({...},{capped:1024});    //一次操作上线1024条数据
当然该参数也可是JSON对象，包含size、max、autiIndexId属性
	new Schema({...},{capped:{size:1024,max:100,autoIndexId:true}});

##### 2.5.5 versionKey——版本锁
版本锁是Mongoose默认配置（__v属性）的，如果你想自己定制，如下：

	new Schema({...},{versionKey:'__someElse'});

此时存入数据库的版本锁就不是v属性，而是someElse，相当于是给版本锁取名字，
具体怎么存入都是由Mongoose和MongoDB自己决定，当然，这个属性你也可以去除

	new Schema({...},{versionKey:false});

除非你知道你在做什么，并且你知道这样做的后果

##### 2.5.6 autoIndex——自动索引
该内容将在索引章节单独讲解

###3. Documents
Document是与MongoDB文档一一对应的模型，Document可等同于Entity，具有属性和操作性

注意：Document的CRUD都必须经过严格验证的，参看2.5.2Schema的strict严格配置

#### 3.1 查询
查询内容过多，专题讲解

#### 3.2 更新
有许多方式来更新文件，以下是常用的传统方式：
```js
PersonModel.findById(id,function(err,person){
        person.name = 'MDragon';
        person.save(function(err){});
    });
```

这里，利用Model模型查询到了person对象，该对象属于Entity，可以
有save操作，如果使用Model操作，需注意：
```js
PersonModel.findById(id,function(err,person){
        person.name = 'MDragon';
        var _id = person._id;   //需要取出主键_id
        delete person._id;      //再将其删除
        PersonModel.update({_id:_id},person,function(err){});
        //此时才能用Model操作，否则报错
    });
```
update第一个参数是查询条件，第二个参数是更新的对象，但不能更新主键，这就是为什么要删除主键的原因,  
当然这样的更新很麻烦，可以使用$set属性来配置，这样也不用先查询，如果更新的数据比较少，可用性还是很好的：
```js
PersonModel.update({_id:_id},{$set:{name:'MDragon'}},function(err){});
```

需要注意，Document的CRUD操作都是异步执行，callback第一个参数必须是err，而第二个参数各个方法不一样，
update的callback第二个参数是更新的数量，如果要返回更新后的对象，则要使用如下方法
```js
Person.findByIdAndUpdate(_id,{$set:{name:'MDragon'}},function(err,person){
        console.log(person.name);   //MDragon
    });
```
类似的方法还有findByIdAndRemove，如同名字，只能根据id查询并作update/remove操作，操作的数据仅一条

#### 3.3 新增
如果是Entity，使用save方法，如果是Model，使用create方法
```js
//使用Entity来增加一条数据
    var krouky = new PersonModel({name:'krouky'});
    krouky.save(callback);
    //使用Model来增加一条数据
    var MDragon = {name:'MDragon'};
    PersonModel.create(MDragon,callback);
```

两种新增方法区别在于，如果使用Model新增时，传入的对象只能是纯净的JSON对象，不能是由Model创建的实体，
原因是：由Model创建的实体krouky虽然打印是只有{name:'krouky'}，但是krouky属于Entity，
包含有Schema属性和Model数据库行为模型。如果是使用Model创建的对象，传入时一定会将隐藏属性也存入数据库，
虽然3.x追加了默认严格属性，但也不必要增加操作的报错

#### 3.4 删除
和新增一样，删除也有2种方式，但Entity和Model都使用remove方法
删除文档

删除文档与创建文档类似，有俩参数：

Model.remove(conditions, callback);
需要注意的点：

删除语句调用后，如果不指定 callback 则返回 Query 对象，这点与更新文档方法 update 以及查询方法 find 是一样的，必须指定 callback 或者调用 run 或 exec 方法才能将指令传递给 MongoDB 数据库。

移除数据库中时间超过 3 天的动态：

var cond = {date: {$lt: +new Date() - 3*24*60*60*1000}};
FeedModel.remove(cond).run();


###4.Sub Docs
如同SQL数据库中2张表有主外关系，Mongoose将2个Document的嵌套叫做Sub-Docs（子文档），
简单的说就是一个Document嵌套另外一个Document或者Documents:
```js
var ChildSchema1 = new Schema({name:String});
    var ChildSchema2 = new Schema({name:String});
    var ParentSchema = new Schema({
        children1:ChildSchema1,     //嵌套Document
        children2:[ChildSchema2]    //嵌套Documents
    });
```

Sub-Docs享受和Documents一样的操作，但是Sub-Docs的操作都由父类去执行
```js
var ParentModel = db.model('Parent',parentSchema);
    var parent = new ParentModel({
        children2:[{name:'c1'},{name:'c2'}]
    });
    parent.children2[0].name = 'd';
    parent.save(callback);
```
parent在执行保存时，由于包含children2，他是一个数据库模型对象，因此会先保存chilren2[0]和chilren2[1]。  
如果子文档在更新时出现错误，将直接报在父类文档中，可以这样处理：
```js
ChildrenSchema.pre('save',function(next){
        if('x' === this.name) return next(new Error('#err:not-x'));
        next();
    });
    var parent = new ParentModel({children1:{name:'not-x'}});
    parent.save(function(err){
        console.log(err.message);   //#err:not-x
    });
```

#### 4.1 查询子文档
如果children是parent的子文档，可以通过如下方法查询到children
	var child = parent.children.id(id);

#### 4.2 新增、删除、更新
子文档是父文档的一个属性，因此按照属性的操作即可，不同的是在新增父类的时候，子文档是会被先加入进去的。  
其他：如果ChildrenSchema是临时的一个子文档，不作为数据库映射集合，可以这样：
```js
var ParentSchema = new Schema({
        children:{
            name:String
        }
    });
    //其实就是匿名混合模式
```

### 5.Model
#### 5.1 什么是Model
Model模型，是经过Schema构造来的，除了Schema定义的数据库骨架以外，还具有数据库行为模型，他相当于管理数据库属性、行为的类

#### 5.2 如何创建Model
你必须通过Schema来创建，如下：
```js
//先创建Schema
    var TankSchema = new Schema({
        name:'String',
        size:'String'   
    });
    //通过Schema创建Model
    var TankModel = mongoose.model('Tank',TankSchema);
```

#### 5.2 操作Model
该模型就能直接拿来操作，具体查看API，例如：
```js
var tank = {'something',size:'small'};
    TankModel.create(tank);
```

注意：你可以使用Model来创建Entity，Entity实体是一个特有Model具体
对象，但是他并不具备Model的方法，只能用自己的方法：
```js
//通过Model创建Entity
    var tankEntity = new TankModel('someother','size:big');
    tankEntity.save();
```

### 6.Query
查询是数据库中运用最多也是最麻烦的地方，这里对Query解读的并不完善，
仅仅是自己的一点领悟而已

#### 6.1 查询的方式
通常有2种查询方式，一种是直接查询，一种是链式查询（2种查询都是自己命
名的）>>

##### 6.1.1 直接查询
在查询时带有回调函数的，称之为直接查询，查询的条件往往通过API来
设定，例如：
```js
PersonModel.findOne({'name.last':'dragon'},'some select',function(err,person){
        //如果err==null，则person就能取到数据
    });
```
具体的查询参数，请查询API

##### 6.1.2 链式查询
在查询时候，不带回调，而查询条件通过API函数来制定，例如：
```js
var query = PersonModel.findOne({'name.last':'dragon'});
        query.select('some select');
        query.exec(function(err,pserson){
        //如果err==null，则person就能取到数据
    });
```

这种方式相对直接查询，分的比较明细，如果不带callback，则返回query，query没有执行的预编译查询语句，
该query对象执行的方法都将返回自己，只有在执行exec方法时才执行查询，而且必须有回调。

因为query的操作始终返回自身，我们可以采用更形象的链式写法：
```js
Person
        .find({ occupation: /host/ })
        .where('name.last').equals('Ghost')
        .where('age').gt(17).lt(66)
        .where('likes').in(['vaporizing', 'talking'])
        .limit(10)
        .sort('-occupation')
        .select('name occupation')
        .exec(callback);
```

### 7.Validation
数据的存储是需要验证的，不是什么数据都能往数据库里丢或者显示到客户端的，数据的验证需要记住以下规则：

- 验证始终定义在SchemaType中
- 验证是一个内部中间件
- 验证是在一个Document被保存时默认启用的，除非你关闭验证
- 验证是异步递归的，如果你的SubDoc验证失败，Document也将无法保存
- 验证并不关心错误类型，而通过ValidationError这个对象可以访问

#### 7.1 验证器

- required 非空验证
- min/max 范围验证（边值验证）
- enum/match 枚举验证/匹配验证
- validate 自定义验证规则

以下是综合案例：
```js
var PersonSchema = new Schema({
        name:{
            type:'String',
            required:true   //姓名非空
        },
        age:{
            type:'Nunmer',
            min:18,             //年龄最小18
            max:120         //年龄最大120
        },
        city:{
            type:'String',
            enum:['北京','上海']    //只能是北京、上海人
        },
        other:{
            type:'String',
            validate:[validator,err]    //validator是一个验证函数，err是验证失败的错误信息
        }
    });
```

#### 7.2 验证失败
如果验证失败，则会返回err信息，err是一个对象该对象属性如下：
```js
err.errors                    //错误集合（对象）
    err.errors.color            //错误属性(Schema的color属性)
    err.errors.color.message    //错误属性信息
    err.errors.path             //错误属性路径
    err.errors.type             //错误类型
    err.name                    //错误名称
    err.message                 //错误消息
```

一旦验证失败，Model和Entity都将具有和err一样的errors属性

### 8.Middleware中间件
#### 8.1 什么是中间件
中间件是一种控制函数，类似插件，能控制流程中的init、validate、save、remove方法

#### 8.2 中间件的分类
##### 8.2.1 Serial串行
串行使用pre方法，执行下一个方法使用next调用
```js
var schema = new Schema(...);
    schema.pre('save',function(next){
        //做点什么
        next();
    });
```

##### 8.2.2 Parallel并行
并行提供更细粒度的操作
```js
var schema = new Schema(...);
    schema.pre('save',function(next,done){
        //下一个要执行的中间件并行执行
        next();
        doAsync(done);
    });
```

#### 8.3 中间件特点
一旦定义了中间件，就会在全部中间件执行完后执行其他操作，使用中间件
可以雾化模型，避免异步操作的层层迭代嵌套

>
#### 8.4 使用范畴

- 复杂的验证
- 删除有主外关联的doc
- 异步默认
- 某个特定动作触发异步任务，例如触发自定义事件和通知

例如，可以用来做自定义错误处理
```js
schema.pre('save',function(next){
        var err = new Eerror('some err');
        next(err);
    });
    entity.save(function(err){
        console.log(err.message);   //some err
    });
```


 * mongoos 数据模型
 * ==============
 * Schema ： 一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力，相当于数据表的定义
 * Model  ： 由Schema发布生成的模型对象，具有抽象属性和行为的数据库操作，相当于类及静态方法
 * Entity ： 由new Model创建的实体，操作也会影响数据库，更多是单个 对象实例进行操作

## 数据库连接
 * 模型使用
 * ======
 * var conn = require('./models/db').conn
 *  , User = required('./models/user')(conn)
 *
 */

 var mongoose = require('mongoose')
  , config = require('../config');

var mongoose = require('mongoose')
  , conn = mongoose.createConnection(config.db.conn, {
    server : {poolSize : 10}
  });

/* 缺省连接池为 5个
var conn = mongoose.createConnection(
  config.db.conn, {
    server : {poolSize : 10}
  }
)
*/

conn.on('error', function (err) {
  console.log(err)
})

exports.conn = conn;

## 查询
```
  // m:136...  e:xxx@126.com  p:12345678，默认 p号
  /*
  User
    .find({ pid: user })
    .where('name.last').equals('Ghost')
    .where('age').gt(17).lt(66)
    .where('likes').in(['vaporizing', 'talking'])
    .limit(10)
    .sort('-occupation')
    .select('name occupation')
    .exec(callback);
  */

  User.findOne( {pid: acct}, function(err, u) {	
```

## 多条件，选择返回字段
```
    User.findOne({ $or:[{'mobile': acct},{'pid': acct},{'email': acct}] },
      'name password pid mobile unitNo host status', function (err, u) {
      if (err)
        return handleError(err);
      else if (!u) {
        return res.send( util.format('{"acct":"%s", "err":"用户不存在！"}', acct) );
      }
```
	
## 更新

```
  User.findOne( {pid: acct}, function(err, u) {
    if (!u) {
      req.session.alertInfo = '用戶不存在';
      return res.redirect('/');
    }

    u.name = req.body.txName;
    u.alias = req.body.txAlias;
    u.nick = req.body.txNick;
    u.sign = req.body.txSign;
    u.pid = req.body.txPid;
    u.mobile = req.body.txMobile;
    u.email = req.body.txEmail;
    u.unitNo = req.body.txUnitNo;
    u.host = req.body.txHost;
    u.notes = req.body.txNotes;

    u.save(function(err){
      if ( err ) {
        u.title = '用户明细';
        u.alertInfo = '用户保存出错！' + err;
        res.render( 'user', u );
      }
      else {
        u.title = '用户明细';
        u.alertInfo = '用户保存成功！'
        res.render( 'user', u );
      }
    });

    /* 使用 Model 更新
    var _id = u._id;   //需要取出主键_id
    delete u._id;      //再将其删除
    console.log( _id );

    //此时才能用Model操作，否则报错
    //update第一个参数是查询条件，第二个参数是更新的对象，但不能更新主键，这就是为什么要删除主键的原因
    User.update({_id:_id}, u, function(err){
    */

    /* 使用 $set 直接更新
    //当然这样的更新很麻烦，可以使用$set属性来配置，这样也不用先查询，如果更新的数据比较少，可用性还是很好的：
    var user = {
        name: req.body.txName
      , nick: req.body.txNick
      , password: req.body.txPwd
      , sex: req.body.txSex
      ,	mobile: req.body.txMobile
      ,	email: req.body.txEmail
      , unitNo: req.body.txUnitNo
    };

    User.update({_id: u._id},{$set: user },function(err){
      if ( err ) {
        res.render( 'user', u );
      }
      else
        res.render( 'user', u );
    });
    */
  });
```
	
	
在使用MongoDB的时候，经常会用到MongoDB的删除操作，以下是我在使用MongoDB删除操作的总结
 
首先是删除用户： db.removeUser("用户名")
 
其次是删除数据库： db.dropDataBase() ，这个操作会删除你当前正在使用的数据库。
 
然后是删除集合： db.集合名.drop()，这个操作十分方便，直接把整个集合删除掉。
 
还有就是删除指定集合内的文档：db.集合名.remove()，remove是用来从数据库中永久删除文档。如果没有指定参数，它会删除指定结合的所有文档。我们可以给它提供参数，以删除限定的文档，例如，假设要删除blog集合一个title为mongo的文档，我们可以执行以下操作：db.blog.remove({title:"mongo"})，这类语句经常会用到。
 
最后是在数据集中删除一条数据：db.linlin.remove(query)，适用于linlin数据集的删除操作。
 
数组及子对象操作：
 User.update( {pid: from}, {$addToSet:{'sub.sta': to}}, function(err){
 

注意 gogodb的update，如果 不用 $set，会覆盖 整条记录！
但是 mongoose的update 是局部更新！

var query = { name: 'borne' };
Model.update(query, { name: 'jason borne' }, options, callback)

// is sent as
Model.update(query, { $set: { name: 'jason borne' }}, options, callback)
This helps prevent accidentally overwriting all documents in your collection with { name: 'jason borne' }.

findOneAndUpdate 是 局部更新！

var query = { name: 'borne' };
Model.findOneAndUpdate(query, { name: 'jason borne' }, options, callback)

// is sent as
Model.findOneAndUpdate(query, { $set: { name: 'jason borne' }}, options, callback)


未设置值，则该 属性不被保存，与 传统数据库不一样，其只保存有值字段！
常用字段，可设置 缺省值，避免保存时再分配空间！

属性名称需全部小写，尽量短小


Mongoose嵌入文档操作

Mongoose 嵌入文档操作

使用 Mongoose 过程中首次遇到该问题，查了好久的资料没找到答案，如今碰巧解决了，即记录下来。

嵌入文档分为两种基本形式，分别为：

user: {  // 第一种
    email: String,
    username: String
}
user: [{  // 第二种
    email: String,
    username: String
}] 

注意，这里第二种嵌入文档的形式虽是这样，但实际编码中这样写存在着问题就是不能更新指定条件的数组成员，比如下面的代码会报错：
TestModel.update({'user.email': 'xianlihua@csser.com'}, {$set: {'user.$.username': '一回'}}, {multi: true}).run();
TypeError: Cannot call method 'path' of undefined 但在 MongoDB Shell 中完全执行正确。
所以正确的写法是先定义子模式，再用 Mongoose 模式嵌套方式定义 user 键：

var SubSchema = {
    email: String,
    username: String
};

// ...
user: [SubSchema]

	未读取 对象值问题！！！
		/**
		 * Test 模型定义
		 */
		var testSchema = Schema({
			pid: String
			, name: {
				first: String
				, last: String
			}
			, meta: {
				vot: Number,
				fav:  Number
			}
		})
  
	Test.findOne({pid: '88889999'}, function (err, t) {
		如果 t.meta 为 对象，直接在调试环境 看 t，都是一堆 undefined属性，
		实际上，通过 t.meta.vot t.meta.fav 是可以读到值的！
		
	！！！
	mongoose find 返回的 对象，不是纯粹的 对象，包含很多其他属性，
	数据库属性 被 封装在 _doc中，但是，通过 属性直接访问属性，
	mongoose做了 get封装，能直接读出 _doc 中的属性！
	
	如果 数据集中 包含了 对象，直接访问 该对象，会发现一堆 undefined 属性，
	但是，访问该对象的属性，照样能访问，说明 mongoose也做了 封装！
	
	如果 用该对象进行 for( var x in u.sub.sta)，会发现 这个对象不是纯粹的数组，
	会导致不停循环，实际上该数组只有一个 值！
	因此，保险起见，数据集中的对象，要用 toObject() 进行转换为纯粹的对象！

	如果 返回的 是 数组，则 不能对 数组 使用 toObject，要对 数组里面的 doc对象，使用 toObject
	
	
//This method accepts a few options. Instead of applying these options on a per-document basis
// we may declare the options here and have it applied to all of this schemas documents by default.
userSchema.set('toObject', { getters: true });

mongodb 中 undefined、null 处理

访问不存在的字段，其值为 undefined，会 显示在页面！
Number类型字段，填入空，存储是 null，而不是0

批量插入，一次不能超过16M，理想条数200左右


时区 与时间

mongodb 保存的日期类型，如果是 Date 类型，是否在保存时，根据计算机时区，
自动转换为标准时区日期？

其实js的时间均是标准时区时间，在字符串转换时，就已经做了自动转换，mongoose里面时间类型如果传入字符串，
也会自动转换为 Date类型，将按时区加、减时区，该功能是js的基本功能，不是mongoose的功能！
由于 '2013-08-10' 与 '2013/08/10'、'2013-08-10 10:00:00' 不一样，建议全部 转换为 / 格式统一处理！

所有字符串日期、时间转换为 js Date，都会自动减 8小时！
但是，Date 转换为 字符串时，并没有自动加 8 小时！
需要通过 一个函数，自动将 js 时间 加8小时转换为字符串，才能还原！

var d1 = new Date('2000-01-01');  带了时区，会早 8 个小时， 需统一 转换 / 格式，确保无时区，到数据库统一会减去当前时区
读取使用时，需还原为 当前时区！！！

  js 所有时间均基于标准时间，无时区，字符串时间转换时，会自动按当前时区转换为 标准时区，因此，需特别注意！
  比如中国为8时区，所有字符串日期（'2013-08-10' 除外）转换后，均会自动减8小时得到标准时间！
  如：
    var d = new Date('2013/08/10'); // 作为当前时区时间，utc会少8小时
    var d = new Date('2013/08/10 10:00:00'); // 作为当前时区时间，utc会少8小时
    var d = new Date('2013-08-10 10:00:00'); // 作为当前时区时间，utc会少8小时
    //var d = new Date('2013-08-10'); // 作为标准时区时间，utc不会少8小时，这是个例外！！！
    var d = new Date(); // 作为标准时区时间，utc不会少8小时
    var d = new Date( Date.now() + 600000 ); // 作为标准时区时间，utc不会少8小时
    req.flash('info', d.toUTCString());

    
  var tm1 = new Date( '2013/07/20' ); // 会自动减 8小时
  var tm2 = new Date( '2013-07-20' ); // 不会自动减8小时，比实际时刻会多8小时！！！
  tz = new Date().getTimezoneOffset() * 60000; // 时区，注意是 负数！
  tm1 = new Date(tm1.getTime() - tz); // utc 标准时间 还原为当前 计算机设置的时区时间！
  //var tm2 = new Date( '2013/07/20 10:00' );
  console.log( 't1:%d t2:%d td:%d tz:%d', tm1.getTime(), tm2.getTime(), tm1.getTime() - tm2.getTime(), tz);

  
  
Date 类型 写入 mongodb，会自动减去时区
读取时，需注意根据时区 还原！！！


稀疏索引


sparse 设置为 true，插入null时，还是出错，不能显示插入 null值，而是不存在！
不存在时，还是出错，发现索引不是稀疏的！
db.users.getIndexes()

发现 索引有问题，原来定义的索引，后来修改后，未更新，需 删除原索引！
db.users.dropIndex('email_1')

索引尽量不要变更，索引定义变更，必须删除原索引，插入后，会自动再插入索引
否则后面修改的不起作用！！！
后加入的索引，需 构建索引，如果数据量大，会花费大量的时间，需复制下线构建后上线！


可以看出，mongodb 太灵活，习惯传统数据库思维，会出很多问题！
也太随意了，不严谨，容易出错！

doc.field = undefined;
doc.save(callback);

null、空均会保存到 mongodb
undefined 是否会保存到 mondodb呢？







	