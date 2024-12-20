---
title: IFC
date: 2024-08-26 22:38:04
description: 笔记
tags:
 - CSS
---

## IFC（Inline Formatting Context）

**内联格式化上下文**

## IFC 渲染规则

- 子元素在水平方向上一个接一个排列，在垂直方向上将以容器顶部开始向下排列
- 节点无法声明宽高，其中 margin 和 padding 在水平方向有效，在垂直方向无效
- 节点在垂直方向上以不同形式对齐
- 能把在一行上的框都完全包含进去的一个矩形区域，被称为该行的线盒（line box）。线盒的宽度是由包含块（containing box）和与其aaaaa中的浮动来决定
- IFC 中的 line box 一般左右边贴紧其包含块，但 float 元素会优先排列。
- IFC 中的 line box 高度由 line-height 计算规则来确定，同个 IFC 下的多个 line box 高度可能会不同
- 当内联级盒子的总宽度少于包含它们的 line box 时，其水平渲染规则由 text-align 属性值来决定
- 当一个内联盒子超过父元素的宽度时，它会被分割成多盒子，这些盒子分布在多个 line box 中。如果子元素未设置强制换行的情况下，inline box 将不可被分割，将会溢出父元素。

## IFC 应用场景

- 水平居中：当一个块要在环境中水平居中时，设置其为 inline-block 则会在外层产生 IFC，通过 text-align 则可以使其水平居中。
- 垂直居中：创建一个 IFC，用其中一个元素撑开父元素的高度，然后设置其 `vertical-align: middle`，其他行内元素则可以在此父元素下垂直居中。