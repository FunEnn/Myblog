---
title: Webpack与Vite的区别
date: 2024-12-23 14:59:55
description: 笔记
tags:
 - 前端面试题 
---

### 1、开发模式的差异

在开发环境中，`Webpack` 是先打包再启动开发服务器，而 `Vite` 则是直接启动，然后再按需编译依赖文件。

当使用 `Webpack` 时，所有的模块都需要在开发前进行打包，这会增加启动时间和构建时间。

而 `Vite` 则采用了不同的策略，它会在请求模块时再进行实时编译，这种按需动态编译的模式极大地缩短了编译时间。

## 2、对ES Modules的支持

现代浏览器本身就支持 `ES Modules`，会`主动发起`请求去获取所需文件。Vite充分利用了这一点，将开发环境下的模块文件直接作为浏览器要执行的文件，而不是像 Webpack 那样`先打包`，再交给浏览器执行。

### 3、底层语言的差异

Webpack 是基于 `Node.js` 构建的，而 Vite 则是基于 `esbuild` 进行预构建依赖。esbuild 是采用 `Go` 语言编写的，Go 语言是`纳秒`级别的，而 Node.js 是`毫秒`级别的。因此，Vite 在打包速度上相比Webpack 有 `10-100` 倍的提升。

### 4、**热更新的处理**

在 Webpack 中，当一个模块或其依赖的模块内容改变时，需要`重新编译`这些模块。

而在 Vite 中，当某个模块内容改变时，只需要让浏览器`重新请求`该模块即可，这大大减少了热更新的时间。

