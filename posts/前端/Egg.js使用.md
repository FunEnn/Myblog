---
title: Egg.js使用
date: 2024-09-21 20:58:53
description: 笔记
tags:
 - NodeJs
---



[快速入门 - Egg](https://www.eggjs.org/zh-CN/intro/quickstart)

[薛定谔的Egg.js](https://mmdapl.github.io/egg-learning/)

## 开发环境搭建

安装项目：

```bash
mkdir egg-example && cd egg-example
npm init egg --type=simple
npm i
```

启动项目：

```bash
npm run dev
open http://localhost:7001
```

**保你使用的 npm 版本不低于 6.1.0。**

## 基础结构

```
egg-project
├── package.json
├── app.js (可选)
├── agent.js (可选)
├── app
|   ├── router.js
│   ├── controller
│   |   └── home.js
│   ├── service (可选)
│   |   └── user.js
│   ├── middleware (可选)
│   |   └── response_time.js
│   ├── schedule (可选)
│   |   └── my_task.js
│   ├── public (可选)
│   |   └── reset.css
│   ├── view (可选)
│   |   └── home.tpl
│   └── extend (可选)
│       ├── helper.js (可选)
│       ├── request.js (可选)
│       ├── response.js (可选)
│       ├── context.js (可选)
│       ├── application.js (可选)
│       └── agent.js (可选)
├── config
|   ├── plugin.js
|   ├── config.default.js
│   ├── config.prod.js
|   ├── config.test.js (可选)
|   ├── config.local.js (可选)
|   └── config.unittest.js (可选)
└── test
    ├── middleware
    |   └── response_time.test.js
    └── controller
        └── home.test.js
```

## 相关说明

- `app/router.js` 用于配置 URL 路由规则，具体参见 Router。
- `app/controller/**` 用于解析用户的输入，处理后返回相应的结果，具体参见 Controller。
- `app/service/**` 用于编写业务逻辑层，可选，建议使用，具体参见 Service。
- `app/middleware/**` 用于编写中间件，可选，具体参见 Middleware。
- `app/public/**` 用于放置静态资源，可选，具体参见内置插件 egg-static。
- `app/extend/**` 用于框架的扩展，可选，具体参见框架扩展。
- config/config.{env}.js` 用于编写配置文件，具体参见配置。
- config/plugin.js` 用于配置需要加载的插件，具体参见插件。
- test/** 用于单元测试，具体参见单元测试。
- `app.js 和 agent.js` 用于自定义启动时的初始化工作，可选，具体参见启动自定义。关于agent.js的作用参见Agent机制。

由内置插件约定的目录：

- `app/public/**` 用于放置静态资源，可选，具体参见内置插件 egg-static。
- `app/schedule/**` 用于定时任务，可选，具体参见定时任务。

若需自定义自己的目录规范，参见 Loader API

- `app/view/**` 用于放置模板文件，可选，由模板插件约定，具体参见模板渲染。
- `app/model/**` 用于放置领域模型，可选，由领域类相关插件约定，如 egg-sequelize或者egg-sequelize-plus

### 静态资源

Egg 内置了 [static](https://github.com/eggjs/egg-static) 插件，线上环境建议部署到 CDN，无需该插件。

static 插件默认映射 `/public/* -> app/public/*` 目录。

此处，我们把静态资源都放到 `app/public` 目录即可：



## 报错

### 安全威胁 csrf 的防范

[egg.js web 安全配置](https://zhuanlan.zhihu.com/p/340369624)

`config/config.default.js` 做好白名单配置

```javascript
exports.security = {
  csrf: {
    enable: false,
    ignoreJSON: true,
  },
  domainWhiteList: [ '*' ], // 配置白名单
};
```

## 部署到云服务器上

**1. 安装插件 `egg-view-ejs`**

`npm install egg-view-ejs --save`

上述的配置，指的是将 `view` 文件夹下的 `.html` 后缀的文件，识别为 `.ejs`。

**2. 启用插件**： 在 `config/plugin.js` 中启用该插件。

javascript

```javascript
exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
};
```

**3. 配置视图引擎**： 在 `config/config.default.js` 中配置视图引擎的选项。

```javascript
config.view = {
  defaultViewEngine: 'ejs',
  mapping: {
    '.html': 'ejs',
  },
};
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><%-title%></title>
</head>
<body>
<!-- 使用模板数据 -->
<h1><%-title%></h1>
</body>
</html>
```

```javascript
async index() {
  const { ctx } = this;
  // ctx.render 默认会去 view 文件夹寻找 index.html，这是 Egg 约定好的。
  await ctx.render('index.html', {
     title: '后台服务正常Running.',
   });
  const { id } = ctx.query;
  ctx.body = id;
}
```

模板通过 `<%-xx%>`关键字获取到传入的变量。

## egg-mysql 使用

`npm install egg-mgsql`

**`config/plugin.js` 添加插件配置：**

```javascript
'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  ejs: {
    enable: true,
    package: 'egg-view-ejs',
  },
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
};
```

**打开 `config/config.default.js` 添加 `mysql` 连接配置项**

```javascript
exports.mysql = {
  // 单数据库信息配置
  client: {
    // host
    host: 'localhost',
    // 端口号
    port: '3306',
    // 用户名
    user: 'xxx',
    // 密码
    password: 'xxx', // 初始化密码，没设置的可以不写
    // 数据库名
    database: 'xxx', // 我们新建的数据库名称
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
};
```

**修改 `service/home.js`**

```javascript
'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  async user() {
    const { ctx, app } = this;
    const QUERY_STR = 'id, name';
    let sql = `select ${QUERY_STR} from user`; // 获取 id 的 sql 语句
    try {
      const result = await app.mysql.query(sql); // mysql 实例已经挂载到 app 对象下，可以通过 app.mysql 获取到。
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}  
module.exports = HomeService;
```

**修改 `controller/home.js` 的 `user`**

```javascript
// 获取用户信息
async user() {
  const { ctx } = this;
  const result = await ctx.service.home.user();
  ctx.body = result;
}
```

**修改路由配置 `router.js`：**

```javascript
router.get('/user', controller.home.user);
```

## ctx

在 Egg.js 框架中，`ctx` 是一个核心概念，代表当前的请求上下文（Context）。它包含了处理当前 HTTP 请求所需的所有信息和方法。当一个 HTTP 请求到达 Egg.js 应用时，框架会为每个请求创建一个新的 `ctx` 实例。

`ctx` 实例包含了以下几类属性和方法：

1. **请求信息**：
   - `ctx.request`：包含请求相关的信息，如 HTTP 方法、请求头、请求体等。
   - `ctx.path`：请求的路径。
   - `ctx.method`：请求的 HTTP 方法。
   - `ctx.header` 或 `ctx.headers`：请求头。
2. **响应信息**：
   - `ctx.response`：用于设置响应相关的信息，如状态码、响应头、响应体等。
   - `ctx.status`：设置 HTTP 状态码。
   - `ctx.body`：设置响应体。
3. **路由和参数**：
   - `ctx.params`：路由参数。
   - `ctx.query`：查询字符串参数。
4. **辅助方法**：
   - `ctx.throw()`：用于抛出异常，触发错误处理。
   - `ctx.helper`：访问应用的助手方法。
5. **状态码和错误处理**：
   - `ctx.status`：设置响应的状态码。
   - `ctx.body`：设置响应的主体内容。
6. **应用和插件**：
   - `ctx.app`：访问应用实例，可以访问配置和服务。
   - `ctx.service`：访问服务层。
7. **会话和状态管理**：
   - `ctx.session`：访问会话信息。
   - `ctx.cookies`：操作 cookies。
8. **安全和认证**：
   - `ctx.isAuthenticated()`：检查用户是否认证。
   - `ctx.login()`：用户登录。
   - `ctx.logout()`：用户登出。

## app

在 Egg.js 框架中，`app` 是指应用实例，它在应用的生命周期内是唯一的，并且贯穿整个应用的流程。`app` 实例在启动时由框架创建，并在全局范围内可用。它提供了一种访问配置、插件、服务等的全局访问点。

`config/plugin.js` 中挂载的插件，可以通过 `app.xxx` 获取到，如 `app.mysql`、`app.jwt` 等。`config/config.default.js` 中抛出的属性，可以通过 `app.config.xxx` 获取到，如 `app.config.jwt.secret`。

`app` 实例包含以下特点：

1. **全局性**：`app` 是全局可访问的，无论是在控制器、服务、中间件还是定时任务中，都可以通过 `this.app` 访问到它。
2. **生命周期**：`app` 实例的生命周期与整个应用一致，从应用启动到应用停止。
3. **配置**：`app` 实例包含了应用的配置信息，这些配置可以在 `config` 目录下的文件中定义。
4. **插件**：`app` 实例注册了所有启用的插件，可以通过 `app.插件名` 的方式访问插件提供的功能。
5. **服务**：`app` 实例可以访问在 `app/service` 目录下定义的所有服务。
6. **模型**：在 Egg.js 中，`app` 实例也用于访问定义在 `app/model` 目录下的数据库模型。
7. **辅助方法**：`app` 实例提供了一些辅助方法，如 `app.ready()` 用于监听应用的启动事件。
8. **自定义属性**：你可以在 `app` 实例上添加自定义属性或方法，以便在应用的任何地方复用。
