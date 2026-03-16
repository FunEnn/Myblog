---
title: BFC（块格式化上下文）的原理与应用
date: 2024-08-26 22:38:04
description: 笔记
tags:
 - CSS
---

[toc]



## 一、 核心概念：什么是 BFC？

在了解 BFC 之前，我们需要明确两个基础概念：

1. **Box（盒子）**：CSS 布局的基本单位。页面由无数个 Box 组成，即我们常说的“盒模型”
2. **Formatting Context（格式化上下文）**：它是页面中的一块**渲染区域**，拥有一套固定的渲染规则，决定了其子元素如何定位，以及与其他元素的关系

**BFC (Block Formatting Context)**，即“块格式化上下文”

> **通俗理解**：BFC 是一个**独立的隔离容器**。容器内部的元素布局无论如何变化，都不会影响到外部元素；反之，外部元素也不会干扰 BFC 内部

## 二、 触发 BFC 的“开关”

一个元素并不会无缘无故成为 BFC，必须满足以下条件之一：

- **根元素**：`<html>`（天然的 BFC）
- **浮动元素**：`float` 值为 `left` 或 `right`
- **绝对定位元素**：`position` 值为 `absolute` 或 `fixed`
- **特定的 display 属性**：`inline-block`、`table-cell`、`flex`、`grid` 等
- **溢出处理**：`overflow` 值不为 `visible`（如 `hidden`、`auto`、`scroll`）

## 三、 BFC 的运行规则（特点）

一旦形成 BFC，该区域将遵循以下“物理定律”：

1. **内部排列**：子元素在垂直方向上，自上而下逐个排列
2. **外边距重叠**：在同一个 BFC 中，相邻两个盒子的垂直 `margin` 会发生重叠（取最大值）
3. **高度计算**：计算 BFC 高度时，**浮动元素也参与计算**（不再塌陷）
4. **避开浮动**：BFC 区域的边缘不会与浮动（float）盒子重叠
5. **边界约束**：每个元素的左外边距（margin-left）会紧贴包含块的左边界
6. **独立性**：BFC 是独立的容器，内外互不影响

## 四、应用场景

- BFC内部的元素不会影响外部元素，反之亦然
- BFC可以包含内部浮动，排除外部浮动
- BFC可以阻止外边距重叠，通过创建新的BFC可以避免margin折叠
- BFC可以阻止元素被浮动元素覆盖，实现布局的独立性

## 五、使用 BFC

### 自适应两栏布局

利用 BFC 的这一个原理就可以实现两栏布局，左边定宽，右边自适应。不会相互影响，哪怕高度不相等。BFC 的区域不会和浮动区域重叠，所以就可以把侧边栏固定宽度且左浮动，而对右侧内容触发 BFC，使得它的宽度自适应该行剩余宽度。

#### 1. 使用浮动（Float）

```css
.container {
  width: 100%;
}

.main-content {
  float: left;
  width: 60%;
}

.sidebar {
  float: right;
  width: 40%;
}
```

#### 2. 使用Flexbox

```css
.container {
  display: flex;
}

.main-content {
  flex: 1;
}

.sidebar {
  flex: 0 0 300px; /* 侧边栏宽度固定，但可以根据需要调整 */
}
```

#### 3. 使用Grid布局

```css
.container {
  display: grid;
  grid-template-columns: 3fr 1fr; /* 主栏占3份，侧边栏占1份 */
}
```

### 解决垂直外边距重叠问题

对于折叠的情况，主要有两种：**兄弟之间重叠**和**父子之间重叠** 

1. **兄弟之间重叠**

   - 底部元素变为行内盒子：`display: inline-block`

   - 底部元素设置浮动：`float`

   - 底部元素的position的值为`absolute/fixed`

2. **父子之间重叠**

   - 父元素加入：`overflow: hidden`

   - 父元素添加透明边框：`border:1px solid transparent`

   - 子元素变为行内盒子：`display: inline-block`

   - 子元素加入浮动属性或定位

### 清除内部浮动

浮动造成的问题就是父元素高度坍塌，所以清除浮动需要解决的问题就是让父元素的高度恢复正常。而用 BFC 清除浮动的原理就是：计算 BFC 的高度时，浮动元素也参与计算。只要触发父元素的 BFC 即可。

1. 包含浮动元素的父级标签添加`overflow:hidden`或者`overflow:auto`

2. 最后一个浮动元素之后添加一个空的div标签，并添加`clear:both`样式

3. 使用after伪元素清除浮动

   ```css
   .clearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
       content: "";
       display: block;
       height: 0;
       clear: both;
       visibility: hidden;
   }
   ```

   