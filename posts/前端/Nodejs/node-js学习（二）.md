---
title: node.js学习（二）
date: 2024-07-23 22:01:28
description: 笔记
tags:
 - NodeJs
---

[toc]

### 1、模块化

#### 1.1：模块化的基本概念

（1）什么是模块化
模块化是指解决一个复杂问题时，自顶向下逐层把系统划分成若干模块的过程。对于整个系统来说，模块是可组合、分解和更换的单元。

（2）编程领域中的模块化
编程领域中的模块化，就是遵守固定的规则，把一个大文件拆成独立并互相依赖的多个小模块。

把代码进行模块化拆分的好处:

- 提高了代码的复用性
- 提高了代码的可维护性
- 可以实现按需加载

#### 1.2：Node.js中的模块化

（1）Node.js中模块的分类
Node.js中根据模块来源的不同，将模块分为了3大类，分别是:

- 内置模块（内置模块是由Node.js 官方提供的，例如fs、path、http等）
- 自定义模块（用户创建的每个.js文件，都是自定义模块）
- 第三方模块（由第三方开发出来的模块，并非官方提供的内置模块，也不是用户创建的自定义模块，使用前需要先下载）

（2）加载模块
使用强大的require()方法，可以加载需要的内置模块、用户自定义模块、第三方模块进行使用。例如:

```js
// 1．加载内置的fs模块
const fs = require('fs')

// 2．加载用户的自定义模块
const custom = require('./custom.js')

// 3．加载第三方模块
const moment = require( 'moment' )
```

**（3）Node.js中的模块作用域**

**什么是模块作用域**

和函数作用域类似，在自定义模块中定义的变量、方法等成员，只能在当前模块内被访问，这种模块级别的访问限制，叫做模块作用域。

**模块作用域的好处**

防止了全局变量污染的问题

### 2、Express

>  Express是基于Node.js平台，快速、开放、极简的Web开发框架。
>
> 通俗的理解：Express的作用和Node.js 内置的 http模块类似，是专门用来创建Web服务器的。
>
> Express的本质：就是一个npm上的第三方包，提供了快速创建Web服务器的便捷方法。

使用Express,我们可以方便、快速的创建**Web 网站**的服务器或**API接口**的服务器。

#### 2.1 Express的基本使用

**（1）安装Express**

```
npm i express@4.17.1
```

**（2）创建基本的Web服务器**

```js
// 1．导入express
const express = require('express')
// 2．创建web服务器
const app = express()
// 3．调用app.listen(端口号，启动成功后的回调函数)，启动服务果
app.listen(80, () => {
	console.log( 'express server running at http://127.0.0.1')
})
```

**（3）监听GET请求**

通过app.get()方法，可以监听客户端的GET请求。

```js
// 参数1：客户端请求的URL地址
// 参数2：请求对应的处理函数
// 		req：请求对象(包含了与请求相关的属性与方法)
//		res：响应对象（包含了与响应相关的属性与方法)
app.get( '请求URL', function(req,res) {/*处理函数*/})
```

**（4）监听post请求**

通过app.post()方法，可以监听客户端的GET请求。

```js
// 参数1：客户端请求的URL地址
// 参数2：请求对应的处理函数
// 		req：请求对象(包含了与请求相关的属性与方法)
//		res：响应对象（包含了与响应相关的属性与方法)
app.post( '请求URL', function(req,res) {/*处理函数*/})
```

**（5）把内容响应给客户端**

通过res.send(方法，可以把处理好的内容，发送给客户端：

```js
app.get('/user', (req, res) =>{
    // 向客户端发送JSON对象
	res.send({ name:'zs', age: 20, gender: '男'})
})
app.post( '/user', (req,res) =>{
    // 向客户端发送文本内容
	res.send('请求成功')
})
```

示例：

```js
// 1．导入express
const express = require('express')
// 2．创建web服务器
const app = express()

// 监听客户端的 GET 和 POST 请求，并向客户端响应具体的内容
app.get('/user', (req, res) =>{
    // 调用express提供的res.sent()方法，向客户端发送JSON对象
	res.send({ name:'zs', age: 20, gender: '男'})
})
app.post( '/user', (req,res) =>{
    // 调用express提供的res.sent()方法，向客户端发送文本内容
	res.send('请求成功')
})

// 3．调用app.listen(端口号，启动成功后的回调函数)，启动服务果
app.listen(80, () => {
	console.log( 'express server running at http://127.0.0.1')
})
```

**（6）获取 URL中携带的查询参数**

通过req.query对象，可以访问到客户端通过查询字符串的形式，发送到服务器的参数：

```js
app.get( ' /', (req, res) => {
    // req.query 默认是一个空对象
    // 客户端使用?name=zs&age=20这种查询字符串形式，发送到服务器的参数
    // 可以通过req.query 对象访问到，例如:
	// req.query.name    req.query.age
    console.log(req.query)
})
```

示例：

```js
// 1．导入express
const express = require('express')
// 2．创建web服务器
const app = express()

// 通过req.query对象，可以访问到客户端发送过来的查询参数
// 注意默认情况下，req.query是一个空对象
app.get( '/', (req, res) => {
    console.log(req.query)
	res.send(req.query)
})

// 3．调用app.listen(端口号，启动成功后的回调函数)，启动服务果
app.listen(80, () => {
	console.log( 'express server running at http://127.0.0.1')
})
```

**（7）获取URL中的动态参数**

通过req.params对象，可以访问到URL中，通过**:符号**匹配到的**动态参数**：

```js
// URL地址中，可以通过:参数名的形式，匹配动态参数值
app.get( '/user/:id', (req, res) => {
	// req.params默认是一个空对象
	//里面存放着通过:动态匹配到的参数值
    console.log(req.params)
})
```

示例：

```js
const express = require('express')
const app = express()
// 这里的:id是一个动态参数
app.get( '/user/:id', (req, res) => {
	// req.params是动态匹配到的URL参数，默认也是一个空对象
    console.log(req.params)
	res.send(req.params)
})
app.listen(80, () => {
	console.log( 'express server running at http://127.0.0.1')
})
```

#### 2.2 Express托管静态资源

**（1）express.static()**

通过express.static()，我们可以非常方便地创建一个静态资源服务器,例如，通过如下代码就可以将public目录下的图片、CSS文件、JavaScript文件对外开放访问了：

```js
app.use(express.static('public'))
```

**（2）挂载路径前缀**

如果希望在托管的静态资源访问路径之前，挂载路径前缀，则可以使用如下的方式：

```js
app.use('./abcs', express.static('public'))
```

#### 2.3 Express路由

##### （1）Express的路由

在Express中，路由指的是客户端的请求与服务器处理函数之间的映射关系。

Express 中的路由分3部分组成，分别是请求的类型、请求的URL地址、处理函数，格式如下：

```js
app.METHOD(PATH, HANDLER)
```

- METHOD：请求类型，值可以使GET也可以是POST

- PATH：请求的URL地址

- HANDLER：服务器端的处理函数

示例：

```js
// 匹配GET请求，且请求 URL为/
app.get( '/', function (req,res) {
    res.send( 'Hello world! ')
})
// 匹配POST请求，且请求URL为/
app.post( '/', function (req,res){
	res.send('Got a POST request')
})
```

##### （2）路由的使用

示例：

```js
const express = require( 'express')	//创建web服务器，命名为app
const app = express()
// 挂载路由
app.get( '/', (req,res)=> { res.send( 'Hello world.')})
app.post( '/', (req,res) => { res.send( 'Post Request.')})
// 启动web服务器
app.listen(80, () => { console.log( 'server running at http://127.0.0.1')})
```

##### （3）模块化路由

1）模块化路由
为了方便对路由进行模块化的管理，Express 不建议将路由直接挂载到app 上，而是推荐将路由抽离为单独的模块。

将路由抽离为单独模块的步骤如下:

1. 创建路由模块对应的.js文件
2. 调用express.Router()函数创建路由对象
3. 向路由对象上挂载具体的路由
4. 使用module.exports向外共享路由对象
5. 使用app.use()函数注册路由模块

2）创建路由模块

```js
var express = require( 'express ')
// 1．导入express
var router = express.Router()
// 2．创建路由对象
router.get( '/user/list',function(req,res) { 			  //3．挂载获取用户列表的路由
    res.send( 'Get user list.')
})
router.post( '/user/add', function(req,res) {			 // 4．挂载添加用户的路由
    res.send('Add new user.')
})
module.exports = router									// 5．向外导出路由对象
```

##### （4）为路由模块添加前缀

类似于托管静态资源时，为静态资源统一挂载访问前缀一样

```js
// 1．导入路由模块
const userRouter = require( './router/user.js')
// 2．使用app.use()注册路由模块，并添加统一的访问前缀/api
app.use( '/api ', userRouter)
```

