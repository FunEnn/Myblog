---
title: React与Vue的区别
date: 2024-12-06 22:38:04
description: 笔记
tags:
 - 前端面试题 
---

### 1. 模板与JSX：

- **React**：使用JSX，这是一种JavaScript的语法扩展，允许你在JavaScript文件中直接编写类似HTML的结构。
- **Vue**：使用 template模板语法，它更接近传统的HTML，使得从其他模板引擎迁移到Vue更加容易。

### 2. 响应式系统：

- **React**：使用Virtual DOM和setState来实现响应式更新。当状态更新时，React会重新渲染组件，然后与旧的DOM进行比较，只更新变化的部分。
- **Vue**：使用双向数据绑定和Virtual DOM。Vue的响应式系统基于依赖收集和异步更新队列，这使得Vue在处理数据变化时更加高效。

### 3. 路由和状态管理：

- **React**：React Router是React社区广泛使用的路由库，而Redux是最受欢迎的状态管理库。
- **Vue**：Vue Router和Vuex分别是Vue官方提供的路由和状态管理解决方案，它们与Vue的核心库紧密集成。

### 4. 数据流不同

**Vue实现双向绑定**：props可以双向绑定、组件与DOM之间可以通过`v-model`绑定
**React不支持双向绑定**，提倡单向数据流,称之为`onChange/setState模式`

### 5. 框架本质不同

Vue本质是`MVVM框架`，由MVC发展而来
React是`前端组件框架`，是由后端组件演化而来

![img](https://i-blog.csdnimg.cn/blog_migrate/c521298517e01bc2420220c3ef78e9b1.png)