---
title: CSS 定位详解
date: 2024-10-10 22:38:04
description: 笔记
tags:
 - CSS
---

`display` 和 `position`

## 1. display

[弹性布局`flex`](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)和[网格布局`grid`](https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)。

## 2. position

`position`属性用来指定一个元素在网页上的位置，一共有5种定位方式

- `static`
- `relative`
- `fixed`
- `absolute`
- `sticky`

### static

`static`是`position`属性的默认值。如果省略`position`属性，浏览器就认为该元素是`static`定位。

这时，浏览器会按照源码的顺序，决定每个元素的位置，这称为"正常的页面流"（normal flow）

> 注意，`static`定位所导致的元素位置，是浏览器自主决定的，所以这时`top`、`bottom`、`left`、`right`这四个属性无效。

### relative，absolute，fixed

`relative`、`absolute`、`fixed`这三个属性值有一个共同点，都是相对于某个基点的定位，不同之处仅仅在于基点不同。

**relative **

`relative`表示，相对于默认位置（即`static`时的位置）进行偏移，即定位基点是元素的默认位置。

![img](https://cdn.beekka.com/blogimg/asset/201911/bg2019111721.jpg)

它必须搭配`top`、`bottom`、`left`、`right`这四个属性一起使用，用来指定偏移的方向和距离。

**absolute **

`absolute`表示，相对于上级元素（一般是父元素）进行偏移，即定位基点是父元素。

它有一个重要的限制条件：定位基点（一般是父元素）不能是`static`定位，否则定位基点就会变成整个网页的根元素`html`。另外，`absolute`定位也必须搭配`top`、`bottom`、`left`、`right`这四个属性一起使用。

![img](https://cdn.beekka.com/blogimg/asset/201911/bg2019111801.jpg)

**fixed **

`fixed`表示，相对于视口（viewport，浏览器窗口）进行偏移，即定位基点是浏览器窗口。这会导致元素的位置不随页面滚动而变化，好像固定在网页上一样。

> ```css
> div {
>   position: fixed;
>   top: 0;
> }
> ```

上面代码中，`div`元素始终在视口顶部，不随网页滚动而变化。

### sticky 

`sticky`跟前面四个属性值都不一样，它会产生动态效果

`sticky`生效的前提是，必须搭配`top`、`bottom`、`left`、`right`这四个属性一起使用，不能省略，否则等同于`relative`定位，不产生"动态固定"的效果。原因是这四个属性用来定义"偏移距离"，浏览器把它当作`sticky`的生效门槛

> ```css
> #toolbar {
>   position: -webkit-sticky; /* safari 浏览器 */
>   position: sticky; /* 其他浏览器 */
>   top: 20px;
> }
> ```

上面代码中，页面向下滚动时，`#toolbar`的父元素开始脱离视口，一旦视口的顶部与`#toolbar`的距离小于`20px`（门槛值），`#toolbar`就自动变为`fixed`定位，保持与视口顶部`20px`的距离。页面继续向下滚动，父元素彻底离开视口（即整个父元素完全不可见），`#toolbar`恢复成`relative`定位。