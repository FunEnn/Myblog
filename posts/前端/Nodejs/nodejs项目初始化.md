---
title: nodejs项目初始化
date: 2024-08-18 22:38:04
description: 笔记
tags:
 - NodeJs
---

[toc]

## 1、创建nodejs

> `npm init -y`

## 2、安装依赖库

1. **nodemon**

`nodemon` 是一个非常有用的工具，用于监视 Node.js 应用程序中的文件变化，并在检测到变化时自动重启应用程序。

> `npm install --save-dev nodemon` 或者 `npm i nodemon`

2. **dotenv**

`dotenv` 是一个 Node.js 库，用于从 `.env` 文件中加载环境变量。使用 `dotenv`，你可以在你的应用程序中轻松地访问这些环境变量，而不需要在代码中硬编码它们。

> `npm install dotenv`

3. **esm**

`esm` 是一个用于在 Node.js 中使用 ES 模块的包。

> `npm install esm`

4. **express**

`express` 是一个灵活的 Node.js Web 应用框架，提供了一系列强大的特性帮助你创建各种 Web 和移动设备应用。

> `npm install express`

使用示例：

```js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

5. **mongoose**

`mongoose` 是一个 MongoDB 对象建模工具，用于在 Node.js 应用中操作 MongoDB 数据库。它提供了一种直观、灵活的方式来定义数据模型，并提供了许多方法来查询、更新和删除数据。

> `npm install mongoose`

相关文章：

>[Mongoose基础入门]([Mongoose基础入门-CSDN博客](https://blog.csdn.net/u010142437/article/details/79218145))
>
>[使用 JavaScript 的 MongoDB — MongoDB 文档](https://www.mongodb.com/zh-cn/docs/languages/javascript/)

**配置package.json**

```json
{
  "name": "backend-blog",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node -r esm server.js",
    "dev": "nodemon -r esm server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "nodemon": "^3.1.4"
  },
  "dependencies": {
    "dotenv": "^16.4.5",
    "esm": "^3.2.25",
    "express": "^4.19.2",
    "mongoose": "^8.6.0"
  }
}

```

## 3、相关库

1. **bcryptjs**

`bcryptjs` 是一个用于 Node.js 的库，用于对密码进行哈希处理。它使用 bcrypt 算法，这是一种广泛使用的密码哈希算法，可以提供强大的安全性。

> `npm install bcryptjs`

2. **Multer**

Multer 是一个用于 Node.js 的中间件，用于处理 `multipart/form-data` 类型的表单数据，主要用于上传文件。

Multer 的主要功能包括：

1. **文件存储**：Multer 可以将上传的文件存储在内存或磁盘上。
2. **文件过滤**：Multer 允许你定义文件类型过滤器，只允许特定类型的文件上传。
3. **文件大小限制**：Multer 可以设置文件大小限制，防止上传过大的文件。

> `npm i multer`

3. **uuid**

UUID（Universally Unique Identifier，通用唯一识别码）是一种软件建构的标准，被广泛用于为对象创建全球唯一的标识符。

> `npm i uuid` 

4. **cors**

`cors` 是一个用于处理跨域资源共享（CORS）的 Node.js 中间件。CORS 是一种机制，它使用额外的 HTTP 头来告诉浏览器让运行在一个 origin（域）上的 Web 应用被准许访问来自不同源服务器上的指定的资源。

> `npm i cors`
