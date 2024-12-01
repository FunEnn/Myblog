---
title: HTTP缓存技术
date: 2024-11-25 22:38:04
description: 笔记
tags:
 - 浏览器与网络
---

> HTTP 缓存有两种实现方式，分别是**强制缓存和协商缓存**

### 什么是强制缓存？

强缓存指的是只要浏览器判断缓存没有过期，则直接使用浏览器的本地缓存，决定是否使用缓存的主动性在于浏览器这边。

如下图中，返回的是 200 状态码，但在 size 项中标识的是 from disk cache，就是使用了强制缓存。

![img](https://cdn.xiaolincoding.com//mysql/other/1cb6bc37597e4af8adfef412bfc57a42.png)

强缓存是利用下面这两个 HTTP 响应头部（Response Header）字段实现的，它们都用来表示资源在客户端缓存的有效期：

- `Cache-Control`， 是一个相对时间；
- `Expires`，是一个绝对时间；

### 什么是协商缓存？

当我们在浏览器使用开发者工具的时候，你可能会看到过某些请求的响应码是 `304`，这个是告诉浏览器可以使用本地缓存的资源，通常这种通过服务端告知客户端是否可以使用缓存的方式被称为协商缓存。

![img](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/%E7%BD%91%E7%BB%9C/http1.1%E4%BC%98%E5%8C%96/%E7%BC%93%E5%AD%98etag.png)

**协商缓存就是与服务端协商之后，通过协商结果来判断是否使用本地缓存**。

强制缓存和协商缓存的工作流程

![img](https://cdn.xiaolincoding.com/gh/xiaolincoder/network/http/http%E7%BC%93%E5%AD%98.png)