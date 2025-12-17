---
title: Nestjs入门
date: 2025-11-26 20:58:53
description: 笔记
tags:
 - NodeJs
---



[toc]

NestJS 基于 Express、socket.io 封装的 nodejs 后端开发框架

## 1、安装

- **Node.js**：版本 ≥20（推荐使用最新 LTS 版本）
- **包管理器**：npm（Node.js 自带）、yarn 或 pnpm

### 创建项目脚手架

```bash
npm i -g @nestjs/cli
nest new project-name
```

### 运行应用程序

```bash
npm run start:dev
```

### 快速生成 `CRUD` 模块

`nest g resource user `  生成一个基础的 CRUD 功能

```bash
nest g mo <name>        # 生成 module
nest g co <name>        # 生成 controller
nest g s <name>         # 生成 service
nest g gu <name>        # 生成 guard
nest g pi <name>        # 生成 pipe
nest build              # 生产编译
nest start:prod         # 生产运行
```

## 2、核心文件简要概述

| 文件                     | 描述                                                         |
| ------------------------ | ------------------------------------------------------------ |
| `app.controller.ts`      | 一个具有单个路由的基本控制器。                               |
| `app.controller.spec.ts` | 控制器的单元测试。                                           |
| `app.module.ts`          | 应用程序的根模块。                                           |
| `app.service.ts`         | 一个具有单个方法的基本服务。                                 |
| `main.ts`                | 应用程序的入口文件，它使用核心函数 `NestFactory` 来创建 Nest 应用程序实例。 |

##  3、控制器

1. **路由** 

   `@Controller()`：将指定一个可选的路径前缀，这样，我们就不需要为文件中的每个路由重复该路径部分。

2. **路由参数**

   `@Get(':id')`：当需要接收**动态数据**作为请求的一部分时，可以在路由路径中添加路由参数**标记**来捕获 URL 中的动态值。

   `@Param()`：用于修饰方法参数，使得**路由**参数可以在方法内部通过该装饰参数的属性进行访问。

3. **路由通配符**

   `@Get('abcd/*')`：路由路径 `'abcd/*'` 将匹配 `abcd/`、`abcd/123`、`abcd/abc` 等路径。在基于字符串的路径中，连字符（`-`）和点号（`.`）会按字面意义解析。

4. **请求对象**

   `@Req()`：需要访问客户端的**请求**详细信息时，可以通过在处理程序签名中使用 `@Req()` 装饰器来指示 Nest 注入请求对象。

5. **资源**

   `@Get()`、`@Post()`、`@Put()`、`@Delete()`、`@Patch()`、`@Options()` 以及 `@Head()`。此外，`@All()` 可定义处理所有这些方法的端点。

6. **状态码**

   `@HttpCode(...)`：响应的默认**状态码**通常为 **200**，但 POST 请求除外，其默认状态码为 **201**

7. **响应头**

   `@Header('Cache-Control', 'no-store')`

8. **重定向**

   `@Redirect()`：接收两个可选参数：`url` 和 `statusCode`。若省略 `statusCode`，其默认值为 `302`（`Found`）。

## 4、模块

`@Module()` 装饰器采用单个对象，其属性描述模块：

|             |                                                              |
| ----------- | ------------------------------------------------------------ |
| providers   | 将由 Nest 注入器实例化并且至少可以在该模块中共享的提供程序   |
| controllers | 此模块中定义的必须实例化的控制器集                           |
| imports     | 导出此模块所需的提供程序的导入模块列表                       |
| exports     | 这个模块提供的 providers 的子集应该在导入这个模块的其他模块中可用。你可以使用提供器本身或仅使用其令牌（provide 值） |

每个模块自动成为**共享模块** 。一旦创建，它就可以被任何模块重复使用。假设我们想在多个其他模块之间共享 `CatsService` 的实例。为此，我们首先需要通过将该提供者添加到模块的 `exports` 数组来**导出** `CatsService`，如下所示：

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
 controllers: [CatsController],
 providers: [CatsService],
 exports: [CatsService]
})
export class CatsModule {}
```

## 5、中间件

- **本质**：在请求到达控制器之前，对 `req` / `res` 进行拦截、加工、终止或放行。
- **接口**：必须实现 `NestMiddleware` 的 `use(req, res, next)` 方法。
- **注册位置**：只能在**模块类**的 `configure(consumer: MiddlewareConsumer)` 方法里绑定，可精细控制**路由**与**HTTP 方法**。

示例：

```ts
import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';

@Module({
 imports: [CatsModule],
})
export class AppModule implements NestModule {
 configure(consumer: MiddlewareConsumer) {
   consumer
     .apply(LoggerMiddleware)
     .forRoutes({ path: 'cats', method: RequestMethod.GET });
 }
}
```

>**警告**
>
>使用 `express` 适配器时，NestJS 应用默认会注册 `body-parser` 包中的 `json` 和 `urlencoded` 中间件。这意味着如果你想通过 `MiddlewareConsumer` 自定义该中间件，就需要在使用 `NestFactory.create()` 创建应用时将 `bodyParser` 标志设为 `false` 来禁用全局中间件。

## 6、守卫（Guard）—— 鉴权 / 权限

必须实现 `CanActivate` 接口。
示例：简易 JWT 守卫（伪代码）

```ts
@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request.headers.authorization === 'Bearer valid-token';
  }
}
```

使用：

- 方法/`@UseGuards(JwtAuthGuard)`
- 全局：`app.useGlobalGuards(new JwtAuthGuard())`

------

## 7、拦截器（Interceptor）—— 响应包装 / 日志 / 缓存

实现 `NestInterceptor` 接口。
示例：统一包装响应格式

```ts
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, { data: T }> {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(map(data => ({ data })));
  }
}
```

全局注册：

```ts
app.useGlobalInterceptors(new TransformInterceptor())
```

此后所有正常响应都会变成

```json
{ "data": ...原始内容 }
```

## 8、最简使用示例

**1. 生成 cats 模块**

```bash
nest g resource cats
# 交互选择 REST + 不生成 CRUD → 回车即可
```

目录结构（自动生成）：

```
src
└── cats
    ├── cats.controller.ts
    ├── cats.module.ts
    └── cats.service.ts
```

**2. 代码编写**

**cats.service.ts**

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  private readonly cats = ['tom', 'garfield', 'mimi'];

  findAll(): string[] {
    return this.cats;
  }
}
```

**cats.controller.ts**

```ts
import { Controller, Get } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll() {
    return { data: this.catsService.findAll() };
  }
}
```

浏览器 / Postman 访问
http://localhost:3000/cats
返回：

```json
{ "data": ["tom", "garfield", "mimi"] }
```

**3. 单元测试**

**cats.controller.spec.ts**（放在 `src/cats/` 下）

```ts
import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

describe('CatsController', () => {
  let controller: CatsController;
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    controller = module.get<CatsController>(CatsController);
    service = module.get<CatsService>(CatsService);
  });

  it('should return cat array', () => {
    jest.spyOn(service, 'findAll').mockReturnValue(['mock-cat']);
    expect(controller.findAll()).toEqual({ data: ['mock-cat'] });
  });
});
```

跑测试：

```bash
npm test cats.controller.spec.ts
```
