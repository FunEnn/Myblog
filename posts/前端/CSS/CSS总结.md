---
title: CSS总结
date: 2024-10-26 22:38:04
description: 笔记
tags:
 - CSS
---

## 响应式

[响应式设计](https://mp.weixin.qq.com/s/5N5ZMIzACWj08mrZAa7fKg)

## CSS 隐藏页面元素

[CSS中，有哪些方式可以隐藏页面元素？区别?](https://mp.weixin.qq.com/s/1tnP66WsEZHEDNcNV2srRA)

[在 CSS 中隐藏元素的 10 种方法](https://juejin.cn/post/7065871783232012318)

## CSS 画一个三角形

[CSS如何画一个三角形？原理是什么？(opens new window)](https://mp.weixin.qq.com/s/KtKFnuRtK-PDESrVeGclEw)

[纯 CSS 实现三角形的 3 种方式](https://juejin.cn/post/7075884138900750372)

```css
.triangle {
    width: 0;
    height: 0;
    border: 100px solid;
    border-color: orangered skyblue gold yellowgreen;
}

// 指向下面
.triangle {
    width: 0;
    height: 0;
    border-top: 50px solid skyblue;
    border-right: 50px solid transparent;
    border-left: 50px solid transparent;
}

```

