---
title: Canvas学习01
date: 2024-11-24 19:44:29
description: 笔记
tags:
 - 前端库
---

### 引用canvas

```html
<canvas id="canvas"></canvas>
```

通过 `CanvasRenderingContext2D` 调用内部的 `canvas` 属性，获取 canvas 元素的引用

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas; // HTMLCanvasElement
```

### 绘制直线

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.strokeStyle = "green";
ctx.moveTo(100, 100);
ctx.lineTo(200, 200);
ctx.stroke();
```

### 绘制折线与闭合

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.moveTo(100, 100);
ctx.lineTo(200, 200);
ctx.lineTo(300, 200);
ctx.closePath(); //闭合
ctx.stroke();
// ctx.fill(); //填充
```

### 绘制矩形

```js
ctx.rect(x, y, width, height)
ctx.stroke();
或
// ctx.strokeRect(x, y, width, height)
// ctx.fillRect(x, y, width, height)
```

`rect()` 方法创建一个矩形路径，其起始点位于 `(x, y)`，大小由 `width` 和 `height` 指定。

### 绘制圆形

```js
arc(x, y, radius, startAngle, endAngle)
arc(x, y, radius, startAngle, endAngle, counterclockwise)
```

`arc()` 方法创建一个以坐标 `(x, y)` 为中心，以 `radius` 为半径的圆弧。路径从 `startAngle` 开始，到 `endAngle` 结束，路径方向由 `counterclockwise` 参数决定（默认为顺时针方向）。

**半圆**

```js
arc(100, 100, 50, 0, Math.PI);
ctx.stroke();
```

### 贝塞尔曲线

**一次贝塞尔曲线**

```
quadraticCurveTo(cpx, cpy, x, y)
```

### 参数

- `cpx`

  控制点的 x 轴坐标。

- `cpy`

  控制点的 y 轴坐标。

- `x`

  终点的 x 轴坐标。

- `y`

  终点的 y 轴坐标。

**二次贝塞尔曲线**

```
bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
```

### 绘制文本

```js
ctx.fillText(text, x, y)
ctx.fillText(text, x, y, maxWidth)
```

#### 自定义字体

```
ctx.font = "bold 48px serif";
ctx.strokeText("Hello world", 50, 100);
```

#### 文本对齐

```
ctx.textAlign("left"||"right"||"center"||"start"||"end")
```

#### 基线对齐

```js
ctx.textBaseline("top"||"hanging"||"middle"||"alphabetic"||"ideographic"||"bottom")
```

#### 文本方向

```js
ctx.direction("ltr"||"rtl"||"inherit")
```

- `"ltr"`

  文字方向为从左到右。

- `"rtl"`

  文字方向为从右到左。

- `"inherit"`

  文字方向从相应的`<canvas>`或 Document 继承。

默认值为 `"inherit"`。

### 绘制图像

```js
var img = new Image()
img.onload = function(){
    ctx.drawImage(img,0,0)
}
img.src = 'myImage.png'
```

```
drawImage(image, dx, dy)
drawImage(image, dx, dy, dWidth, dHeight)
drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
```

示例：原图像从坐标 (33,71) 处截取一个宽度为 104 高度为 124 的图像。并将其绘制到画布的 (21, 20) 坐标处，并将其缩放为宽 87、高 104 的图像。

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const image = document.getElementById("source");

image.addEventListener("load", (e) => {
  ctx.drawImage(image, 33, 71, 104, 124, 21, 20, 87, 104);
});
```

### 填充颜色

示例：

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

for (let i = 0; i < 6; i++) {
  for (let j = 0; j < 6; j++) {
    ctx.fillStyle = `rgb(
        ${Math.floor(255 - 42.5 * i)},
        ${Math.floor(255 - 42.5 * j)},
        0)`;
    ctx.fillRect(j * 25, i * 25, 25, 25);
  }
}
```

### 绘制每一条线段的末端

```js
ctx.lineCap("butt"||"round"||"square")
```

### 描线时使用虚线模式

```js
ctx.setLineDash(segments)
```

`segments`是一个数组 `[实线长度，间隙长度]`

```
ctx.setLineDash([5, 15]);
```

### 变形操作

#### 移动坐标系

```js
ctx.translate(x, y)
```

`translate()` 方法通过在网格上将画布和原点水平移动 `x` 单位和垂直移动 `y` 单位，向当前矩阵添加一个平移变换。

#### 顺时针旋转坐标系

```js
ctx.rotate(angle)
```

#### 放大缩小坐标系

```js
ctx.scale(x,y)
```

