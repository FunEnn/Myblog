---
title: Electron基础
date: 2024-07-21 19:44:29
description: 笔记
tags:
 - 前端库
---

[toc]

[**官网**]([快速入门 | Electron (electronjs.org)](https://www.electronjs.org/zh/docs/latest/tutorial/quick-start))

> Electron是一个使用 JavaScript、HTML 和 CSS 构建桌面应用程序的框架。 嵌入 [Chromium](https://www.chromium.org/) 和 [Node.js](https://nodejs.org/) 到 二进制的 Electron 允许您保持一个 JavaScript 代码代码库并创建 在Windows上运行的跨平台应用 macOS和Linux——不需要本地开发 经验。

相关文章：

> 1. [2023 最新前端 Electron Gui 实现桌面应用开发详细教程（基础篇）_electron开发桌面端应用-CSDN博客](https://blog.csdn.net/qq_47452807/article/details/129292227)
> 2. [Electron 基础入门 简单明了，看完啥都懂了-CSDN博客](https://blog.csdn.net/qq_39235055/article/details/111995373)

### Electron 架构

![image.png](https://i-blog.csdnimg.cn/blog_migrate/e25131310a62c322fa83bd527aee62a6.png)

Electron 架构和 Chromium 架构类似，也是具有1个主进程和多个渲染进程。但是也有区别

- 在各个进行中暴露了 Native API ，提供了 Native 能力。
- 引入了 Node.js，所以可以使用 Node 的能力
- 但是渲染进程使用node 需要配置，下文会有所提到

> **可以简单的理解为Electron为web项目套上了Node.js环境的壳，使得我们可以调用Node.js的丰富的API。这样我们可以用JavaScript来写桌面应用，拓展很多我们在web端不能做的事情。**