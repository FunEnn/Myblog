---
title: Next项目初始化
date: 2025-01-27 22:38:04
description: 笔记
tags:
 - React 
---

[toc]

## 1、创建项目

>`pnpm create next-app my-next-app`
>
>`npx create-next-app@latest`

-询问选项：

1. 项目名称，这里输入`nextjs-demo`。
2. 项目是否需要使用`ESLint`。
3. 是否需要在项目中使用`src`目录，默认会吧所有文件放在根目录，为了方便开发，这里启用`src`目录。
4. 是否启用`app`目录，默认会放一些框架相关的东西。这里启用之后会在`app`目录中生成首页内容。
5. 是否启用别名，方便使用，直接启用了。

## 2、项目目录

![image-20230222170934146](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb2d178e3cff4db69c17f1725ecb20ea~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

1. `.next`目录。这是Nextjs的缓存目录，在执行dev或者build等命令的时候，会在本地项目的根目录下生成此目录，开发不需要关注。想要了解更多的可以稍微研究一下，使用缓存/已生成的方式加速编译。
2. `.vscode`目录。看名字就知道，这个是vscode编辑器使用到的配置目录。
3. `node_modules`目录。这是三方依赖的目录，这里不多介绍。
4. `public`目录。这个主要放置静态资源，默认没有二级目录，为了方便可以简单创建几个目录来放相关资源。默认路径是在根目录，使用的时候可以使用类似`/favicon.ico`的形式引用。
5. `src`目录。这个目录是主要源代码的位置，初始目录下有`app`默认页和`pages`其他页面目录。在`pages`目录下还有一个默认`api`目录，主要放置Nextjs提供的服务端API。可以简单看一下默认提供的`hello.ts`文件内容。
6. `.eslintrc.json`。主要是eslint的规则。
7. `.gitignore`。git排除文件。
8. `next-env.d.ts`。nextjs的一些ts相关内容，目前只有默认引用。
9. `next.config.js`。Nextjs的配置文件，这里默认只有`appDir`参数。
10. `package-lock.json`。项目依赖lock文件。
11. `package.json`。项目npm相关文件。
12. `README.md`。文档说明。
13. `tsconfig.json`。`typescript`相关配置文件。

## 3、使用自定义入口文件`_app.tsx`

创建文件`src/pages/_app.tsx`。这个文件主要是作为所有页面的入口文件，可以简单做一些统一处理的逻辑。需要可以创建，不需要可以删除，不影响项目运行。

![image-20230222172654616](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/685f4d3933e1402c9d613962891e3355~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

## 4、`app` 路由约定

### 路由文件

|                           |                                       |                  |
| ------------------------- | ------------------------------------- | ---------------- |
| `layout` `布局`           | `.js` `.jsx` `.tsx` ```.js.jsx.tsx``` | 布局             |
| `page` `页`               | `.js` `.jsx` `.tsx` ```.js.jsx.tsx``` | 页面             |
| `loading` `装载`          | `.js` `.jsx` `.tsx` ```.js.jsx.tsx``` | 加载用户界面     |
| `not-found` `未找到`      | `.js` `.jsx` `.tsx` ```.js.jsx.tsx``` | 未找到用户界面   |
| `error` `错误`            | `.js` `.jsx` `.tsx` ```.js.jsx.tsx``` | 错误用户界面     |
| `global-error` `全局错误` | `.js` `.jsx` `.tsx` ```.js.jsx.tsx``` | 全局错误用户界面 |
| `route` `路线`            | `.js` `.ts`                           | API 端点         |
| `template` `模板`         | `.js` `.jsx` `.tsx` ```.js.jsx.tsx``` | 重新渲染布局     |
| `default` `违约`          | `.js` `.jsx` `.tsx` ```.js.jsx.tsx``` | 并行路由后备页面 |

### 嵌套路由

|                 |            |
| --------------- | ---------- |
| `folder`        | 路由段     |
| `folder/folder` | 嵌套路由段 |

### 动态路由

|                  |                        |
| ---------------- | ---------------------- |
| `[folder\]`      | 动态路段               |
| `[...folder\]`   | 包罗万象的路由段       |
| `[[...folder\]]` | 可选的包罗万象的路由段 |

### 路由组和私有文件夹

|            |                                |
| ---------- | ------------------------------ |
| `(folder)` | 对路由进行分组而不影响路由     |
| `_folder`  | 选择文件夹和所有子段不参与路由 |

### 并行和拦截的路由

|                  |              |
| ---------------- | ------------ |
| `@folder`        | 命名槽       |
| `(.)folder`      | 拦截同级     |
| `(..)folder`     | 拦截上方一层 |
| `(..)(..)folder` | 拦截上面两层 |
| `(...)folder`    | 从根拦截     |