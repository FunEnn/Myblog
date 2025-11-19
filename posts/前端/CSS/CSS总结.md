---
title: CSS总结
date: 2024-10-26 22:38:04
description: 笔记
tags:
 - CSS
---

[toc]

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



## css中可继承和不可继承的属性

**可继承**：font, font-size, font-family, font-weight, font-style, text-indent, text-align, line-hight, word-spacing, color, visibility

**不可继承**：display, width, height, margin, padding, border, background, position, float, top, left, bottom, right

## 伪类和伪元素的区别

伪类主要是为了选中元素的某种特殊状态，伪类用单冒号

伪元素主要是为了创建DOM树以外的元素，伪元素用双冒号

## CSS选择器

ID选择器

类选择器 伪类选择器 属性选择器

元素选择器 伪元素选择器

通配选择器

子元素选择器 兄弟选择器 后代选择器

交集选择器 并集选择器

## CSS隐藏元素

**display:none;**

不占据空间，无法响应自身事件

**position: absolute;+z-index : -9999;**

不占据空间，无法响应自身事件

**overflow:hidden;**

隐藏元素溢出部分，依然占据空间，但无法响应自身事件

**visibility:hidden;**

依然占据空间，无法响应自身事件

**transform:scale(0,0);**

依然占据空间，无法响应自身事件

**opacity:0;**

透明度为0，依然占据空间，可响应自身事件

## px em rem vw vh vmin vmax



px：相对于显示器屏幕分辨率

em：是相对长度，相对于自身的font-size，chrome默认16px

rem：是相对长度，相对于根标签的font-size

vw：相对视口宽度的1%

vh：相对视口高度的1%

vmin：相对视口高宽中较小值的1%

vmax：相对视口高宽中较大值的1%
