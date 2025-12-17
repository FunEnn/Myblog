---
title: NestJS 对比 Express
date: 2025-11-26 20:58:53
description: 笔记
tags:
 - NodeJs
---

[toc]

> 总结： 
> Express 是「最小化、无约束」的 HTTP 工具库；Nest 是「自带架构规范、依赖注入、全家桶」的企业级框架。 
> 二者可共存，也能渐进迁移。

## 1. 定位差异

| 维度     | Express.js                      | NestJS                                     |
| -------- | ------------------------------- | ------------------------------------------ |
| 官方定位 | Fast, unopinionated, minimalist | A progressive Node.js framework            |
| 抽象层级 | 微框架（micro-framework）       | 全栈企业级（opinionated）                  |
| 设计理念 | 无约束、自由拼装                | 强约束、分层、IoC、装饰器、Angular-style   |
| 核心依赖 | 自身 + 中间件生态               | 内置 DI 容器 + 可选 Express/Fastify 适配器 |

## 2. 代码风格对比

### 2.1 Express：回调链 + 无 DI(依赖注入)

```js
// app.js
const express = require('express');
const app = express();

app.get('/cats', (req, res) => {
  res.json({ data: ['tom', 'garfield'] });
});

app.listen(3000);
```

### 2.2 Nest：装饰器 + TypeScript + DI

```ts
// cats.controller.ts
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Get()
  findAll() {
    return { data: this.catsService.findAll() };
  }
}

// cats.service.ts
@Injectable()
export class CatsService {
  findAll() { return ['tom', 'garfield']; }
}
```

## 3. 架构支持

| 能力            | Express                    | Nest                                              |
| --------------- | -------------------------- | ------------------------------------------------- |
| 路由            | 手动 `app.get()`           | 装饰器 `@Get()` `@Post()` …                       |
| 分层            | 自己搭                     | 强制 Module/Controller/Service                    |
| 依赖注入        | 无                         | 内置 IoC 容器，可 Mock、可替换 Scope              |
| 单元测试        | 额外引入 supertest + sinon | 官方 `Test.createTestingModule`，零启动服务器测   |
| 微服务          | 社区插件                   | 官方 `@nestjs/microservices`（TCP/gRPC/Kafka…）   |
| GraphQL         | 社区中间件                 | 官方 `@nestjs/graphql`（Code First/Schema First） |
| Swagger/OpenAPI | 手写或第三方               | 官方 `@nestjs/swagger` 一键生成                   |
| Serverless      | 自己封装                   | 官方 `@nestjs/platform-serverless`                |
