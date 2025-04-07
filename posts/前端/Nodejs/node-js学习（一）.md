---
title: node.js学习（一）
date: 2024-07-21 20:58:53
description: 笔记
tags:
 - NodeJs
---

[toc]

### 1、初始Node

#### 1.1：Node.js概述

（1）什么是NodeJS
Node.js是一个基于 Chrome V8引擎的JavaScript运行环境

（2）Node.js中的JavaScript运行环境
NodeJs中分为两部分，一部分是V8引擎为了解析和执行JS代码。另一部分是内置API，内置API提供了一些能力，让我们JS能调用这些API完成一些后端执行的事情。

> 注：浏览器是JavaScript的前端运行环境，Node.js是JavaScript的后端的运行环境。
>
> Node.js中**无法调用DOM和BOM等浏览器内置API**。

#### 1.2：Node.js的安装

查看nodeJS版本号，`node -v`

#### 1.3：使用Node运行JS代码

①：打开终端

②：切换到所要执行的js文件目录（也可以直接在文件目录下输入cmd回车，或者在改目录下按住Shtft鼠标右键，打开powerShell命令行工具）

②：输入 node 要执行的js文件名字.js

### 2、fs模块读写操作文件

#### 2.1：什么是fs文件系统模块

fs 模块是Node.js官方提供的、用来操作文件的模块。它提供了一系列的方法和属性，用来满足用户对文件的操作需求。

示例：

- fs.readFile()方法，用于读取指定文件中的内容。
- fs.writeFile()方法，用于向执行的文件中写入内容

如果要在javascript代码中使用fs模块来操作文件，则需要使用如下的方式先导入它：

```js
const fs = require('fs')
```

#### 2.2：读取指定文件中的内容

##### （1）fs.readFile()的语法格式

使用fs.readFile()方法，可以读取指定文件中的内容。

```js
fs.readFile(path[, options], callback)
```

- path：必选参数，字符串，表示文件路径。
- options：可选参数，表示以什么编码格式来读取文件。
- callback：必选参数，文件读取完成后，通过回调函数拿到读取的结果。

示例：

```js
// 1．导入fs模块，来操作文件
const fs = require("fs")
// 2.调用fs.readFile()方法读取文件
// 	参数1:读取文件的存放路径
// 	参数2:读取文件时候采用的编码格式，一般默认指定utf8
// 	参数3:回调函数，拿到读取失败和成功的结果 err dataStr
fs.readFile('./test/readFile.txt', 'utf8', function(err, dataStr){
	// 打印失败的结果
	console.log(err)
	console.log("<--------------------------------------------->")
	// 打印成功的结果
	console.log(dataStr)
})
```

> 如果读取成功，那么err的值就是null，dataStr的值就是文件的内容
>
> 读取失败时err会返回错误对象，dataStr会返回undefined

#### 2.3：向指定的文件中写入文件内容

##### （1）fs.writeFile()的语法格式

使用fs.writeFile()方法，可以向指定的文件中写入内容。

```js
fs.writeFile(file, data[, options], callback)
```

- file∶必选参数，需要指定一个**文件路径的字符串**，表示文件的存放路径。

- data：必选参数，表示要写入的内容。

- options：可选参数，表示以什么格式写入文件内容，默认值是utf8。

- callback：必选参数，文件写入完成后的回调函数。

示例：

```js
// 1．导入fs文件系统模块
const fs = require("fs")
// 2.调用fs.writeFile()方法，写入文件内容
// 	参数1:读取文件的存放路径
// 	参数2:data：表示要写入的内容。
// 	参数3:表示以什么格式写入文件内容，默认值是utf8。
// 	参数4:文件写入完成后的回调函数。
fs.writeFile('./test/writeFile.txt', "HolleWorld", 'utf8', function(err){
	// 打印失败的结果
	console.log(err)
})
```

> 如果文件写入成功则err为null
>
> 如果文件写入失败，则err，的值等于一个错误对象。

#### 2.4：fs模块-路径动态拼接问题

**相对路径**
在使用 fs 模块操作文件时，如果提供的操作路径是以/或…/开头的相对路径时，很容易出现路径动态拼接错误的问题。
原因：代码在运行的时候，会以执行node命令时所处的目录，动态拼接出被操作文件的完整路径。

最终呈现的路径就是执行node命令时的目录+代码中写的路径，所以在不同路径下执行js文件效果都不一样

**绝对路径**
移植性差

**解决办法**
__dirname：表示当前js文件所处的目录

示例：

```js
const fs = require("fs")

fs.writeFile(__dirname + '/test/writeFile.txt', "HolleWorld", 'utf8', function(err){
	// 打印失败的结果
	console.log(err)
})
```

### 3、path模块处理路径

#### 3.1：什么是path路径模块

path模块是Node.js官方提供的、用来处理路径的模块。它提供了一系列的方法和属性，用来满足用户对路径的处理需求。

例如:

- path.join()方法，用来将多个路径片段拼接成一个完整的路径字符串

- path.basename()方法，用来从路径字符串中，将文件名解析出来

如果要在JavaScript 代码中，使用path模块来处理路径，则需要使用如下的方式先导入它：
```js
const path = require('path')
```

#### 3.2：路径拼接

##### （1）path.join()的语法格式

使用path.join()方法，可以讲多个路径片段拼接为一个完整的路径字符串。

```js
path.join([...paths])
```

- …paths 路径片段的序列

示例：

```js
const path = require('path')

const pathStr = path.join('/a', '/b/c', '../', './d', 'e')
console.log(pathStr) //  输出\a\b\d\e

const pathStr2 = path.join(__dirname, './files/1212.txt')
console.log(pathStr2)
```

> 凡是涉及到路径拼接的操作，都要使用path.join()方法进行处理。不要直接使用＋进行字符串的拼接。

#### 3.3：获取路径中的文件名

##### （1）path.basename()的语法格式

使用path.basename()方法，可以获取路径中的最后一部分。

```js
path.basename(path[, ext])
```

- path ：必选参数，表示一个路径的字符串

- ext ：可选参数，表示文件扩展名

返回值：表示路径中的最后一部分

示例：

使用path.basename()方法，可以从一个文件路径中，获取到文件的名称部分:

```js
const path = require('path')

const fpath = '/a/b/c/index.html'
var fullName = path.basename( fpath)
console.log(fullName)  // index.html

var namewithoutExt = path.basename(fpath, ".html" )
console.log(namewithoutExt) // index
```

#### 3.4：获取路径中的文件扩展名

##### （1）path.extname()的语法格式

使用path.extname()方法，可以获取路径中的扩展名部分。

```js
path.extname(path)
```

- path：必选参数，表示一个路径的字符串

返回：返回得到的扩展名字符串

示例：

```js
const path = require('path')

const fpath = '/a/b/c/index.html'
const fext = path.extname(fpath)
console.log(fext) // .html
```

### 4、使用Http模块写一个Web服务器

#### 4.1：什么是http模块

http模块是Node,js官方提供的、用来创建web服务器的模块。通过 http模块提供的 http.createServer()方法，就能方便的把一台普通的电脑，变成一台Web服务器，从而对外提供Web资源服务。

如果要希望使用http模块创建Web服务器，则需要先导入它:

```js
const http = require('http')
```

#### 4.2：创建最基本的web服务器

##### （1）创建Web服务器步骤

①导入http模块

②创建web 服务器实例

③为服务器实例绑定request事件，监听客户端的请求

④启动服务器

**步骤一：导入http模块**

```js
const http = require('http')
```

**步骤二：创建web服务器实例**

调用 http.createServer()方法，即可快速创建一个Web服务器实例：

```js
const server = http.createServer()
```

**步骤三：为服务器实例绑定request事件**

为服务器实例绑定request事件，即可监听客户端发送过来的网络请求:

```js
// 使用服务器实例的.on()方法，为服务器绑定一个request事件
server.on( 'request', (req,res) => {
	// 只要有客户端来请求我们自己的服务器，就会触发request 事件，从而调用这个事件处理函数
    console.log( 'Someone visit our web server.' )
})
```

**步骤四：启动服务器**

调用服务器实例的.listen()方法，即可启动当前的web 服务器实例:

```js
// 调用server.listen(端口号，cb回调）方法，即可启动web 服务器
server.listen(80, () =>{
	console.log('http server running at http://127.0.0.1')
})
```

##### （2）创建Web服务器示例：

```js
// 导入http模块
const http = require('http')
// 创建web 服务器实例
const server = http.createServer()
// 为服务器实例绑定request事件，监听客户端的请求
server.on( 'request', (req,res) => {
	// 只要有客户端来请求我们自己的服务器，就会触发request 事件，从而调用这个事件处理函数
    console.log( 'Someone visit our web server.' )
})

// 启动服务器
server.listen(8080, () =>{
	console.log('http server running at http://127.0.0.1:8080')
})
```

##### （3）req请求对象

只要服务器接收到了客户端的请求，就会调用通过server.on()为服务器绑定的request事件处理函数。

如果想在事件处理函数中，访问与客户端相关的数据或属性，可以使用如下的方式:

```js
const http = require('http')
const server = http.createServer()

server.on( 'request', (req) =>{
    // req是请求对象，它包含了与客户端相关的数据和属性，例如:3 ll req.url是客户端请求的URL地址
    // req.method是客户端的 method请求类型
    const str = `Your request url is ${req.url}，and request method is ${req.method}`
    console.log(str)
})

server.listen(8080, () =>{
	console.log('http server running at http://127.0.0.1:8080')
})
```

##### （4）res响应对象

在服务器的request事件处理函数中，如果想访问与服务器相关的数据或属性，可以使用如下的方式:

```js
const http = require('http')
const server = http.createServer()

server.on( 'request', (req, res) =>{
    // req.method是客户端的 method请求类型
    const str = `Your request url is ${req.url}，and request method is ${req.method}`
    console.log(str)
    // 调用 res.end()方法，向客户端响应一些内容
    res.end(str)
})

server.listen(8080, () =>{
	console.log('http server running at http://127.0.0.1:8080')
})
1
```

##### （5）解决中文乱码问题

当调用res.end()方法，向客户端发送中文内容的时候，会出现乱码问题，此时，需要手动设置内容的编码格式:

```js
server.on('request', (req,res) => {
	//发送的内容包含中文
	const str =`您请求的url地址是${req.url}，请求的 method类型是${req.method}`
	// 为了防止中文显示乱码的问题，需要设置响应头Content-Type 的值为 text/html; charset=utf-8
	res.setHeader( 'Content-Type',  'text/html; charset=utf-8')
	// 把包含中文的内容，响应给客户端
    res.end(str)
})
```

4.5：根据不同的url响应不同的html内容
（1）核心实现步骤：
①：获取请求的url地址

②：设置默认的响应内容为404 Not found

③：判断用户请求的是否为 / 或 /index.html 首页

④：判断用户请求的是否为 /about.html 关于页面

⑤：设置 Content-Type 响应头，防止中文乱码

⑥：使用 res.end() 把内容响应给客户端
（2）动态响应内容

```js
server.on( 'request', function(req,res) {
    const url = req.url			// 1．获取请求的url地址
	let content = '<h1>404 Not found!</h1>'// 2．设置默认的内容为404 Not found
    if (url === '/' || url === '/index.html') {
		content = '<h1>首页</h1>'		// 3．用户请求的是首页
	}else if (url === '/about.html'){
		content = '<h1>关于页面</h1>'	// 4．用户请求的是关于页面
	}
	res.setHeader ( 'Content-Type','text/html; charset=utf-8')		// 5．设置Content-Type响应头,防止中文乱码
	res.end(content)		// 6．把内容发送给客户端
})
```

