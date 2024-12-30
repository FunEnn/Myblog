---
title: CSS布局与定位
date: 2024-08-26 22:38:04
description: 笔记
tags:
 - CSS
---

## 块级元素

**块级元素的特点**：

- 默认情况下，块级元素会独占一行
- 宽度自动填满其父元素宽度 100%
- 可以设置 `width, height, line-height` 属性
- 可以设置 `margin` 和 `padding` 属性
- 可以包含行内元素和其他块级元素
- 一个 `block` 元素通常被叫做块级元素 `display: block;`
- 当元素的 display 为 block、list-item 或 table 时，它就是块级元素

**常见的块级元素如下**：

- 文档分区 `<div>`
- 行 `<p>`
- 标题标签 `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`
- 表格 `<table>`
- 有序列表 `<ol>`
- 无序列表 `<ul>`
- 定义列表中定义条目描述 `<dd>`
- 定义列表 `<dl>`
- 表单 `<form>`
- 水平分割线 `<hr>`
- 区段头或页头 `<header>` HTML5
- 文章内容 `<article>` HTML5
- 伴随内容 `<aside>` HTML5
- 一个页面区段 `<section>` HTML5
- 区段尾或页尾 `<footer>` HTML5
- 音频播放 `<audio>` HTML5
- 视频 `<video>` HTML5
- 绘制图形 `<canvas>` HTML5
- 图文信息组 `<figure>` HTML5

## 行内元素

**行内元素的特点**：

- 一般情况下，行内元素只能包含数据和其他行内元素，相邻的行内元素在一行上，但是中间会有空白的间隙，一般用 `font-size：0` 解决空白间隙。
- 行内元素设置 `width，height` 属性无效，默认的宽度就是本身内容的宽度
- 水平方向上的 `padding` 和 `margin` 可以设置，垂直方向上的无效
- 行内元素只能容纳纯文本或者是其他的行内元素（`<a>`除外）
- 一个 `inline` 元素通常被叫做行内元素 `display: inline;`
- 当元素的 display 为 inline、inline-block 或 inline-table 时，它就是行内级元素

**常见的行内元素如下**：

- 锚元素 `<a>`
- 缩写元素 `<abbr>`
- 粗体元素 `<b>`
- 粗体显示 `<strong>`
- `<span>`
- 标签，表示用户界面中某个元素的说明 `<label>`
- 输入控件 `<input>`
- 一个多行纯文本编辑控件 `<textarea>`
- 选项菜单控件 `<select>`
- 可点击的按钮 `<button>`
- 图片 `<img>`

> **注意**
>
> 在行内元素中有几个特殊的标签，`<img>`,`<input>` 可以设置它们的宽高度以及对齐属性。
>
> 文字块级标签 `<h1>~<h6>`,`<p>`,`<dt>`等里面不能放块级元素。
>
> 链接里面不能再存放链接

## display 属性

display 属性指定了元素的显示类型，它包含两类基础特征，用于指定元素怎样生成盒模型，即，盒子的类型取决于 CSS display 属性：

- 外部显示类型定义了元素怎样参与流式布局的处理，影响一个元素的外部表现，但不影响子元素的表现。
- 内部显示类型定义了元素内子元素的布局方式

**外部显示类型**

- display: block; 指定对象为块元素。(常用)
- display: inline; 指定对象为内联元素。(常用)

**内部显示类型**

- display: flex; 将对象作为弹性伸缩盒显示。(常用)
- display: grid; 网格布局。(常用)

**列表值**

- display: list-item; 指定对象为列表项目。在`<div>`上使用等价于`<ul><li>`的实现。

**显示值**

- display: contents; 让子元素拥有和父元素一样的布局方式
- display: none; 隐藏对象。与 `visibility` 属性的 `hidden` 值不同，其不为被隐藏的对象保留其物理空间(常用)

**混合值**

- display: inline-block; 指定对象为内联块元素。
- display: inline-table; 指定对象作为内联元素级的表格。类同于html标签`<table>`
- display: inline-flex; 将对象作为内联块级弹性伸缩盒显示。
- display: inline-grid; 在行内进行网格布局。

## 定位

定位一般有**相对定位(relative)**、**绝对定位(absolute)**、**固定定位(fixed)**，relative和absolute在移动端用的最多， fixed 在移动端有兼容性问题，因此不推荐使用，在移动端替代 fixed 的方案是 absolute+内部滚动。

## 正常布局流

正常布局流是指在不对页面进行任何布局控制时，浏览器默认的 HTML 布局方式。

默认的，一个块级元素的内容宽度是其父元素的`100%`，其高度与其内容高度一致。 行内元素的 `height` `width` 与内容一致。你无法设置行内元素的 `height` `width`, 它们就那样置于块级元素的内容里。如果你想控制行内元素的尺寸， 你需要为元素设置 `display: block;` （或者，`display: inline-block;` `inline-block` 混合了 `inline` 和 `block` 的特性。)

- 块级元素默认会占满整行，所以多个块级盒子之间是从上到下排列的；
- 内联元素默认会在一行里一列一列的排布，当一行放不下的时候，会自动切换到下一行继续按照列排布；

### 如何脱离文档流呢？

脱流文档流指节点脱流正常文档流后，在正常文档流中的其他节点将忽略该节点并填补其原先空间。文档一旦脱流，计算其父节点高度时不会将其高度纳入，脱流节点不占据空间。有两种方式可以让元素脱离文档流：浮动和定位。

- 使用浮动（float）会将元素脱离文档流，移动到容器左/右侧边界或者是另一个浮动元素旁边，该浮动元素之前占用的空间将被别的元素填补，另外浮动之后所占用的区域不会和别的元素之间发生重叠；
- 使用绝对定位（position: absolute;）或者固定定位（position: fixed;）也会使得元素脱离文档流，且空出来的位置将自动被后续节点填补。

## 浮动

设置 float 为 left 或 right，就能使该元素脱离文档流，向左或向右浮动。一般在做宫格模式布局时会用到，如果子元素全部设置为浮动，则父元素是塌陷的， 这时就需要清除浮动，清除浮动的方法也很多，常用的方法是在元素末尾加空元素设置 clear:both, 更高级一点的就给父容器设置 before/after 来模拟一个空元素，还可以直接设置 `overflow:auto/hidden`。除过浮动可以实现宫格模式，行内盒子 (inline-block) 和 table 也可以。

## Flex 布局

[flexbox（弹性盒布局模型）,以及适用场景?](https://mp.weixin.qq.com/s/OORqq5uK8jgjDV2Hkx0baA)

> `flex: 1;`
>
> **flex为一个复合属性，它是由flex-grow、flex-shrink、flex-basis三个值组成的**
>
> 当你写 `flex: 1;` 时，你实际上是在设置以下三个属性：
>
> - `flex-grow: 1;`：允许元素增长来占据flex容器中未使用的空间。
> - `flex-shrink: 1;`：允许元素缩小以适应flex容器。
> - `flex-basis: 0;`：元素的初始大小（在分配多余空间之前的大小）是0。

Flex 布局是一种一维的布局，一个 flexbox 一次只能处理一个维度上的元素布局，一行或者一列。 作为对比的是另外一个二维布局 CSS Grid Layout（CSS栅格布局），可以同时处理行和列上的布局。

我们把一个容器的 display 属性值改为 flex 或者 inline-flex。容器中的直系子元素就会变为 flex 元素。

- flex 容器（flex container）：采用 flex 布局的元素
- flex 元素（flex item）：flex 容器中的所有子元素，即 flex 容器成员
- 主轴：水平方向，flex 元素 默认沿主轴排列。
- 交叉轴：垂直于主轴。

> **注意**
>
> 设为 Flex 布局以后，子元素的 float 、 clear 和 vertical-align 属性将失效。

### Flex Container 属性

容器属性有以下几个：

- flex-direction
- flex-wrap
- flex-flow
- justify-content
- align-items
- align-content

#### flex-direction

flex-direction属性决定主轴的方向（即项目的排列方向）

- row（默认值）：主轴为水平方向，起点在左端
- row-reverse：主轴为水平方向，起点在右端
- column：主轴为垂直方向，起点在上沿
- column-reverse：主轴为垂直方向，起点在下沿

#### flex-wrap

默认子元素都排在一行，一行排不下，可设置此属性换行

- nowrap（默认值）：不换行
- warp：换行且第一行在上方
- warp-reverse：换行但第一行在下方

#### flex-flow

flex-flow 属性是 flex-direction 属性和 flex-wrap 属性的简写形式，默认：

flex-flow：row nowrap。即取上面两个属性的默认值

#### justify-content

justify-content 属性定义了子元素在主轴上的对齐方式

- flex-start（默认值）：左对齐
- flex-end：右对齐
- center：居中
- space-between：两端对齐，子元素之间的间隔都相等
- space-around：每个子元素两侧的间隔相等。所以，子元素与子元素的间隔 比 子元素与边框的间隔 大一倍
- space-evenly：弹性容器子项均匀分布，所有项目之间及项目与边框之间的距离相等。

#### align-items

align-items 属性定义子元素在交叉轴上对齐方式

- flex-start：交叉轴的起点对齐
- flex-end：交叉轴的终点对齐
- center：交叉轴的中点对齐
- baseline：项目的第一行文字的基线对齐。
- stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

#### align-content

align-content 属性定义了多根轴线的对齐方式。如果子元素只有一根轴线，该属性不起作用

- flex-start：与交叉轴的起点对齐。
- flex-end：与交叉轴的终点对齐。
- center：与交叉轴的中点对齐。
- space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
- space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
- stretch（默认值）：轴线占满整个交叉轴。

> **注意**
>
> 该属性有以下快捷设置:
>
> - flex: 0 1 auto (默认值)
> - flex: auto (1 1 auto)
> - flex: none (0 0 auto)
> - flex: 1 (1 1 0%)[取非负数字]
> - flex: 0% (1 1 0%)[取百分比]
> - flex: 24px (1 1 24px)[取长度]
>
> 建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值