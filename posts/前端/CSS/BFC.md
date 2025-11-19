---
title: BFC
date: 2024-08-26 22:38:04
description: 笔记
tags:
 - CSS
---

## BFC(Block formatting contexts)

**块级格式化上下文**

在 BFC 中，在包含块内一个盒子一个盒子不重叠地垂直排列，两个兄弟盒子直接的垂直距离由 margin 决定。浮动也是如此（虽然有可能两个盒子的距离会因为 floats 而变小），除非该盒子再创建一个新 BFC。

## 原理

BFC 原理，渲染规则：

- 内部的 Box 会在垂直方向一个个排列
- 垂直方向上的距离由 margin 决定。（完整的说法是：属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠（塌陷），与方向无关。margin 水平方向不会发生重叠）
- 每个元素的左外边距与包含块的左边界相接触（从左向右），即使浮动元素也是如此。（这说明 BFC 中子元素不会超出他的包含块，而 position 为 absolute 的元素可以超出他的包含块边界）
- BFC 的区域不会与 float 的元素区域重叠
- 计算 BFC 的高度时，浮动子元素也参与计算
- BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面元素，反之亦然

## 产生条件

以下条件会创建新的 BFC：

- 根元素
- float 属性不为 none(脱离文档流，浮动元素)
- position 属性为 absolute 或 fixed (绝对与固定定位)
- display 属性为 inline-block、table-cell、table-caption、flex、inline-flex、grid、inline-grid、flow-root(最佳，无副作用)，定义成块级的非块级元素。
- overflow 属性不为 visible（- overflow: auto/ hidden)，非溢出的可见元素。

## 应用场景

- BFC内部的元素不会影响外部元素，反之亦然。
- BFC可以包含内部浮动，排除外部浮动。
- BFC可以阻止外边距重叠，通过创建新的BFC可以避免margin折叠。
- BFC可以阻止元素被浮动元素覆盖，实现布局的独立性。

## 使用 BFC

### 自适应两栏布局

利用 BFC 的这一个原理就可以实现两栏布局，左边定宽，右边自适应。不会相互影响，哪怕高度不相等。BFC 的区域不会和浮动区域重叠，所以就可以把侧边栏固定宽度且左浮动，而对右侧内容触发 BFC，使得它的宽度自适应该行剩余宽度。

### 1. 使用浮动（Float）

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

### 2. 使用Flexbox

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

### 3. 使用Grid布局

```css
.container {
  display: grid;
  grid-template-columns: 3fr 1fr; /* 主栏占3份，侧边栏占1份 */
}
```

### 解决垂直外边距重叠问题

1. **父元素加overflow：hidden；**
2. **父元素加边框 border**
3. **父级或者子级设置display:inline-block;**
4. **父级或者子级设置float**
5. **父级或者子级设置position: absolute;**

### 清除内部浮动

浮动造成的问题就是父元素高度坍塌，所以清除浮动需要解决的问题就是让父元素的高度恢复正常。而用 BFC 清除浮动的原理就是：计算 BFC 的高度时，浮动元素也参与计算。只要触发父元素的 BFC 即可。

1. 父元素添加overflow:hidden

2. 使用after伪元素清除浮动

   ```css
   .clearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
       content: "";
       display: block;
       height: 0;
       clear: both;
       visibility: hidden;
   }
   ```

   