---
title: AGENT占位符模板
date: 2026-03-24 22:38:04
description: 常用网址收藏
tags:
 - 工具
---

[toc]

## AGENTS.md 里应该写什么？

### 1. 项目上下文与架构 (Context & Architecture)

告诉 AI 你的代码是如何组织的。

- **技术栈细节：** 例如 “我们使用 Next.js 14 App Router，严禁使用 Pages Router”。
- **状态管理：** “使用 Zustand 进行状态管理，禁止引入 Redux”。
- **目录约定：** “UI 组件必须放在 `@/components/ui`，业务逻辑写在 `@/hooks`”。

### 2. 编码准则 (Coding Guidelines)

这是 AI 生成代码时必须遵循的“法律”。

- **类型安全：** “所有函数必须定义明确的 TypeScript 接口，禁止使用 `any`”。
- **样式规范：** “仅使用 Tailwind CSS 实用类，不要编写 `.module.css`”。
- **异步处理：** “始终使用 `try-catch` 包裹 API 请求，并使用自定义的 `AppError` 类处理异常”。

### 3. 常用模式与反模式 (Patterns & Anti-patterns)

- **模式：** “在处理表单时，参考 `@/forms/template.tsx` 的受控组件模式”。
- **禁止事项：** “禁止直接操作 DOM，禁止使用 `axios`（项目统一使用 `fetch` 封装）”。

### 4. 知识库锚点 (Knowledge Anchors)

引导 AI 关注项目中的核心文件。

- “在修改数据库架构前，必须先查看 `@/prisma/schema.prisma`”。
- “国际化字符串请统一添加到 `@/locales/zh-CN.json`”。

## 前端

> # [前端项目名称] - 开发指南
>
> > **说明**：[项目简要描述]
>
> ## 快速参考
>
> | 属性           | 值                |
> | :------------- | :---------------- |
> | **仓库路径**   | `[monorepo-path]` |
> | **核心技术 1** | [tech-1-version]  |
> | **核心技术 2** | [tech-2-version]  |
> | **核心技术 3** | [tech-3-version]  |
> | **构建工具**   | [build-tool]      |
> | **包管理器**   | [package-manager] |
>
> ## 目录结构
>
> ```
>[项目根目录]/
> ├── [目录1]/
>│   ├── [子目录1]/
> │   │   └── [文件1]
> │   ├── [子目录2]/
> │   │   └── [文件2]
> │   └── [文件3]
> ├── [目录2]/
> │   ├── [模块1]/
> │   │   └── [文件4]
> │   └── [模块2]/
> │       └── [文件5]
> ├── [配置文件1]
> ├── [配置文件2]
> └── package.json
> ```
> 
> ## 核心模块
> 
> ### `[模块名称1]` (`[模块路径]`)
>
> [模块功能描述]：
>
> - **功能 1**：[功能说明]
>- **功能 2**：[功能说明]
> - **功能 3**：[功能说明]
>- **入口文件**：[入口路径]
> 
>### `[模块名称2]` (`[模块路径]`)
> 
>[模块功能描述]：
> 
> | 方法名      | 说明   | 参数   | 返回值   |
> | :---------- | :----- | :----- | :------- |
> | `[method1]` | [说明] | [参数] | [返回值] |
>| `[method2]` | [说明] | [参数] | [返回值] |
> | `[method3]` | [说明] | [参数] | [返回值] |
>
> ### `[模块名称3]` (`[模块路径]`)
>
> [模块功能描述]：
> 
> - **状态字段**：`[field1]`、`[field2]`、`[field3]`
> - **操作方法**：`[action1]`、`[action2]`
> - **⚠️ 注意**：[重要提醒]
>
> ## 开发规范
>
> ### 代码风格
>
> ```typescript
> // ✅ 正确示例
> [correct-code-example]
>
> // ❌ 错误示例
>[incorrect-code-example]
> ```
>
> ### 命名规范
>
> | 类型      | 规范        | 示例              |
>| :-------- | :---------- | :---------------- |
> | 接口/类型 | PascalCase  | `[InterfaceName]` |
> | 函数/变量 | camelCase   | `[functionName]`  |
> | 常量      | UPPER_SNAKE | `[CONSTANT_NAME]` |
> | 私有成员  | `_` 前缀    | `_privateField`   |
> | 组件      | PascalCase  | `[ComponentName]` |
> | Hook      | `use` 前缀  | `use[HookName]`   |
> 
>### 类型安全
> 
>- 禁止使用 `any`，优先使用 `unknown` + 类型守卫
> - 公共 API 必须显式标注参数类型和返回值类型
>- 编译选项：`strict: [true/false]`
> 
> ## 开发任务导航
> 
> | 任务         | 位置                               |
> | :----------- | :--------------------------------- |
> | 添加新组件   | `[components-path]/[Component]/`   |
> | 添加新 Hook  | `[hooks-path]/use[HookName].ts`    |
> | 修改核心逻辑 | `[core-path]/[ModuleName].ts`      |
>| 添加新命令   | `[commands-path]/[CommandName].ts` |
> | 更新状态管理 | `[store-path]/[store-file].ts`     |
>| 定义类型     | `[types-path]/index.ts`            |
> | 添加工具函数 | `[utils-path]/[file].ts`           |
> | 修改配置文件 | `[config-path]/[file]`             |
> 
>## 数据流
> 
>text
> 
>```
> 用户操作
>     │
>     ▼
> [UI组件层]
>     │
>     ▼
> [API调用层]
>     │
>     ▼
> [核心逻辑层]
>    │
>     ├──→ [状态管理层] ──→ [UI更新]
>    │
>     └──→ [历史记录层] ──→ [撤销/重做]
>```
> 
>### 核心数据流说明
> 
> | 流程方向  | 触发源  | 处理逻辑   | 最终效果 |
> | :-------- | :------ | :--------- | :------- |
> | UI → 核心 | [场景1] | [处理步骤] | [结果]   |
> | 核心 → UI | [场景2] | [处理步骤] | [结果]   |
> | 撤销/重做 | [场景3] | [处理步骤] | [结果]   |
> 
> ## 技术栈
> 
> | 层级         | 技术                      |
> | :----------- | :------------------------ |
> | **核心引擎** | [core-engine] [version]   |
> | **UI 框架**  | [ui-framework] [version]  |
> | **语言**     | TypeScript [version]      |
> | **状态管理** | [state-management]        |
> | **样式方案** | [styling-solution]        |
>| **构建工具** | [build-tool]              |
> | **测试框架** | [test-framework]          |
>| **代码规范** | [lint-tool] + [formatter] |
> 
>## 最佳实践
> 
> ### 核心原则
> 
> 1. **[原则1]**：[说明]
> 2. **[原则2]**：[说明]
>3. **[原则3]**：[说明]
> 4. **[原则4]**：[说明]
>
> ### 性能优化
>
> - [优化点1]：[具体做法]
> - [优化点2]：[具体做法]
> - [优化点3]：[具体做法]
> 
> ### 测试要求
> 
> | 测试类型 | 覆盖范围 | 工具   |
> | :------- | :------- | :----- |
> | 单元测试 | [范围]   | [工具] |
> | 集成测试 | [范围]   | [工具] |
>| E2E 测试 | [范围]   | [工具] |
> 
>## 环境配置
> 
>### 开发环境要求
> 
>- Node.js：[version]
> - 包管理器：[npm/pnpm/yarn]
> - 浏览器：[browser-support]
> 
> ### 环境变量
>
> ```
>[VAR_NAME_1]=[value]  # [说明]
> [VAR_NAME_2]=[value]  # [说明]
> [VAR_NAME_3]=[value]  # [说明]
> ```
>
> ### 常用命令
>
> ```
> npm run dev        # [命令说明]
> npm run build      # [命令说明]
> npm run test       # [命令说明]
> npm run lint       # [命令说明]
>npm run type-check # [命令说明]
> ```
>
> ## 扩展指南
>
> ### 添加新功能
>
> 1. [步骤1]
> 2. [步骤2]
> 3. [步骤3]
>4. [步骤4]
> 5. [步骤5]
>
> ### 添加新命令（如适用）
> 
> 1. 在 `[commands-path]` 创建 `[CommandName].ts`
> 3. 在 `[core-file]` 中封装操作方法
> 4. 在 `[history-file]` 中注册记录策略
>5. 导出类型定义
> 
>## 注意事项
> 
> ### 开发时注意
> 
> - [注意事项1]
> - [注意事项2]
> - [注意事项3]
> 
>### 常见问题
> 
>| 问题    | 解决方案 |
> | :------ | :------- |
>| [问题1] | [方案]   |
> | [问题2] | [方案]   |
>| [问题3] | [方案]   |

## 后端

> # [后端项目名称] - 开发指南
>
> > **说明**：[后端服务简要描述，如：RESTful API 核心服务]
>
> ## 快速参考
>
> | **属性**     | **值**                         |
> | ------------ | ------------------------------ |
> | **仓库路径** | [backend-repo-path]            |
> | **运行环境** | Node.js [version]              |
> | **框架**     | [Express/Koa/NestJS] [version] |
> | **数据库**   | [MySQL/PostgreSQL/MongoDB]     |
> | **ORM/ODM**  | [Prisma/TypeORM/Mongoose]      |
> | **包管理器** | [pnpm/yarn/npm]                |
>
> ## 目录结构
>
> ```
> [项目根目录]/
> ├── src/
> │   ├── controllers/    # 输入处理与响应格式化
> │   ├── services/       # 核心业务逻辑
> │   ├── models/         # 数据库模型定义 (Schema)
> │   ├── repositories/   # 数据库原生操作 (可选)
> │   ├── middlewares/    # 插件/中间件 (鉴权、日志、报错)
> │   ├── config/         # 环境配置
> │   ├── utils/          # 工具函数
> │   └── index.ts        # 入口文件
> ├── tests/              # 测试用例
> ├── .env.example        # 环境变量模板
> └── package.json
> ```
>
> ## 核心模块
>
> ### [模块名称1] ([模块路径])
>
> **功能描述**：[如：用户鉴权与权限控制]
>
> - **功能 1**：[如：JWT 签发与校验]
> - **功能 2**：[如：RBAC 权限中间件]
> - **入口文件**：[入口路径]
>
> ### [API 接口规范]
>
> | **方法** | **路径**                 | **说明** | **权限要求**  |
> | -------- | ------------------------ | -------- | ------------- |
> | `GET`    | `/api/v1/[resource]`     | 获取列表 | [Guest/User]  |
> | `POST`   | `/api/v1/[resource]`     | 创建资源 | [Admin]       |
> | `PATCH`  | `/api/v1/[resource]/:id` | 局部更新 | [Owner/Admin] |
>
> ## 开发规范
>
> ### 异步处理
>
> ```typescript
> // ✅ 正确示例：使用 async/await 配合 try-catch 或全局错误捕获
> export const getData = async (req, res, next) => {
>   try {
>     const data = await service.fetchData(req.params.id);
>     res.json({ success: true, data });
>   } catch (error) {
>     next(error); // 传递给全局错误中间件
>   }
> };
> 
> // ❌ 错误示例：回调地狱或未捕获的 Promise Rejection
> [incorrect-async-example]
> ```
>
> ### 命名规范
>
> | **类型**       | **规范**    | **示例**        |
> | -------------- | ----------- | --------------- |
> | **路由路径**   | kebab-case  | `/user-profile` |
> | **控制层函数** | camelCase   | `getUserById`   |
> | **模型类名**   | PascalCase  | `UserModel`     |
> | **环境变量**   | UPPER_SNAKE | `DB_PASSWORD`   |
>
> ------
>
> ## 数据流 (Request-Response Cycle)
>
> ```
> HTTP 请求 (Request)
>      │
>      ▼
> [Middleware 层] ──→ (鉴权/校验/限流)
>      │
>      ▼
> [Controller 层] ──→ (参数提取/格式化)
>      │
>      ▼
> [Service 层]    ──→ (核心业务逻辑计算)
>      │
>      ▼
> [Repository 层] ──→ (数据库 CRUD 操作)
>      │
>      ▼
> HTTP 响应 (Response)
> ```
>
> ## 环境配置
>
> ### 环境变量 (.env)
>
> - `PORT`=[value] # 监听端口
> - `DATABASE_URL`=[value] # 数据库连接串
> - `JWT_SECRET`=[value] # 密钥
>
> ### 常用命令
>
> - `npm run dev` : 启动本地热更新开发环境
> - `npm run migration:run` : 执行数据库迁移
> - `npm run seed` : 填充初始测试数据
> - `npm run docs` : 生成 Swagger/OpenAPI 文档
>
> ## 扩展指南
>
> ### 添加新功能
>
> 1. [步骤1]
> 2. [步骤2]
> 3. [步骤3]
> 4. [步骤4]
> 5. [步骤5]
>
> ## 注意事项
>
> ### 开发时注意
>
> - [注意事项1]
> - [注意事项2]
> - [注意事项3]
>
> ### 常见问题
>
> | 问题    | 解决方案 |
> | :------ | :------- |
> | [问题1] | [方案]   |
> | [问题2] | [方案]   |
> | [问题3] | [方案]   |
