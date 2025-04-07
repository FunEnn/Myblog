---
title: CSS 盒模型
date: 2024-07-26 22:38:04
description: 笔记
tags:
 - CSS
---

盒模型由外而内包括：外边距（margin）、边框（border）、填充（亦称内边距）（padding）、内容（content）。但是，盒模型有标准盒模型和 IE 盒模型之分：

- W3C 盒模型(标准盒模型)
- IE 盒模型(怪异盒模型)

> **注意**
>
> 盒模型由外边距（margin）、边框（border）、填充（亦称内边距）（padding）、内容（content）。组成。但盒子由 content + padding + border 这几部分**决定盒子的大小**，如果再加上 margin 那决定的是**盒子占据的位置**，而不是盒子的大小！margin 虽然是盒模型的组成成分，但盒子的大小与 margin 没半毛钱关系！

## W3C 盒模型

### 设置

```css
box-sizing: content-box;
```

![W3C 盒模型](https://jonny-wei.github.io/blog/images/css/W3C%E7%9B%92%E6%A8%A1%E5%9E%8B.png)

盒子的大小：width/height = content(content-box)

盒子的大小只由内容 content 决定，不包含 border 和 padding。

盒子的实际尺寸 = 内容（设置的宽/高） + 内边距 + 边框

## IE 盒模型

### 设置

```css
box-sizing: border-box;
```

![IE 盒模型](https://jonny-wei.github.io/blog/images/css/IE%E7%9B%92%E6%A8%A1%E5%9E%8B.png)

盒子的大小：width/height = content + padding + border(border-box)

盒子的大小由 content + padding + border 决定。

盒子的实际尺寸 = 设置的宽/高 = 内容 + 内边距 + 边框

## 视觉格式化模型

### block

- 占满一行，默认继承父元素的宽度，多个块元素将从上到下进行排列
- 设置 width/height 将会生效
- 设置 padding 和 margin 将会生效

### inline

- 不会占满一行，宽度随着内容而变化，多个 inline 元素将按照从左到右的顺序在一行里排列显示，如果一行显示不下，则自动换行
- 设置 width/height 不会生效
- 设置竖直方向上的 padding 和 margin 不会生效；需注意的是，竖直方向的 padding 虽然有显示效果但是对其他元素没有影响，所以还是无效果。

### inline-block

- 是行内块元素，不单独占满一行，可以看成是能够在一行里进行左右排列的块元素
- 设置 width/height 会生效
- 设置 padding 和 margin 会生效