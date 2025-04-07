---
title: vue路由的hash模式和history模式
date: 2024-12-08 14:59:55
description: 笔记
tags:
 - Vue
---

### 区别

1. hash的路由地址上有`#`号,history模式没有
2. 在做回车刷新的时候，hash模式会加载对应页面，history会报错404
3. hash模式支持低版本浏览器，history不支持，应为是h5新增的API
4. hash不会重新加载页面，单页面应用必备
5. history有历史记录，H5新增了`pushState`和`replaceState()`去修改历史记录，并不会立刻发送请求
6. history需要后台配置













































