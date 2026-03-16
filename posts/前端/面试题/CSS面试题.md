---
title: CSS面试题
date: 2026-03-9 14:59:55
description: 笔记
tags:
 - 前端面试题 
---

[toc]

## 一、CSS 选择器及其优先级

CSS 优先级由四个等级决定，通常表示为 `(a, b, c, d)` 权重。

| 选择器格式            | 类型                    | 权重 (简易值) | 示例                     |
| --------------------- | ----------------------- | ------------- | ------------------------ |
| **内联样式**          | Style 属性              | 1000          | `style="color: red;"`    |
| **ID 选择器**         | #id                     | 100           | `#header`                |
| **类/属性/伪类**      | .class / [ref] / :hover | 10            | `.menu`, `li:last-child` |
| **标签/伪元素**       | div / ::after           | 1             | `div`, `li:after`        |
| **通配符/关系选择器** | * / > / +               | 0             | `*`, `ul > li`, `h1 + p` |

> **注意事项：**
>
> 1. **!important**：声明的样式优先级最高，应慎用
> 2. **后来者居上**：如果优先级相同，最后出现的样式生效
> 3. **继承最低**：继承得到的样式优先级最低（趋于 0）
> 4. **来源顺序**：内联样式 > 内部样式 > 外部样式 > 浏览器用户自定义 > 浏览器默认

## 二、CSS 属性的继承性

### 1. 无继承性的属性

- **布局/盒子模型**：`display`, `width`, `height`, `margin`, `border`, `padding`
- **背景/定位**：`background`, `position`, `float`, `clear`, `z-index`, `overflow`
- **文本装饰**：`vertical-align`, `text-decoration`, `text-shadow`, `white-space`

### 2. 有继承性的属性

- **字体系列**：`font-family`, `font-weight`, `font-size`, `font-style`
- **文本系列**：`text-indent`, `text-align`, `line-height`, `word-spacing`, `letter-spacing`, `color`
- **其他**：`visibility`, `cursor`, `list-style`

## 三、Display 属性详解

### 1. 常用属性值及其作用

| **属性值**         | **作用**                                         |
| ------------------ | ------------------------------------------------ |
| **`none`**         | 元素不显示，并从文档流中移除                     |
| **`block`**        | 块类型。独占一行，可设宽高，默认宽度为父元素宽度 |
| **`inline`**       | 行内元素。同行显示，不可设宽高，宽度由内容撑开   |
| **`inline-block`** | 行内块。同行显示，但可设置宽高                   |
| **`inherit`**      | 从父元素继承 display 值                          |

### 2. block、inline 与 inline-block 的区别

- **block**：独占一行，支持所有盒子模型属性（width/height/margin/padding）
- **inline**：同行显示。设置宽高无效，水平方向的 margin/padding 有效，**垂直方向无效**
- **inline-block**：结合了两者的特性，既能同行显示，又能设置宽高

## 四、隐藏元素的方法对比

| **方法**                   | **占据空间** | **响应事件** | **触发机制**            |
| -------------------------- | ------------ | ------------ | ----------------------- |
| **`display: none`**        | 否           | 否           | 触发 **重排 (Reflow)**  |
| **`visibility: hidden`**   | 是           | 否           | 触发 **重绘 (Repaint)** |
| **`opacity: 0`**           | 是           | 是           | 重绘                    |
| **`position: absolute`**   | 否           | 否           | 移出可视区              |
| **`clip-path: circle(0)`** | 是           | 否           | 裁剪隐藏                |
| **`transform: scale(0)`**  | 是           | 否           | 缩放隐藏                |

## 五、 CSS3 新特性与动画

### 1. CSS3 新功能

- **选择器**：如 `:not()`, 伪类增强
- **视觉**：圆角 (`border-radius`), 阴影 (`box-shadow`), 线性渐变 (`gradient`)
- **布局**：多列布局 (`multi-column`), **Flex 布局**, **Grid 布局**
- **变换**：`transform`（旋转、缩放、倾斜、平移）

### 2. Transition (过渡) vs Animation (动画)

- **Transition**：强调状态过渡，需要事件触发（如 `:hover`），只有起始和结束两个关键帧
- **Animation**：强调循环和复杂序列，无需触发事件，支持 `@keyframes` 定义多个关键帧

### 3. 伪类 (:) 与 伪元素 (::)

- **伪类**：用于选择元素的特定状态（如 `:hover`, `:active`）
- **伪元素**：用于创建不在 DOM 树中的虚拟元素（如 `::before`, `::after`）。CSS3 规范建议伪元素使用双冒号

## 六、伪类与伪元素的本质区别

| **维度**           | **伪类 (Pseudo-classes)**                         | **伪元素 (Pseudo-elements)**                         |
| ------------------ | ------------------------------------------------- | ---------------------------------------------------- |
| **逻辑本质**       | **已有元素**的特殊状态                            | **不存在于 DOM** 的虚拟元素                          |
| **数量关系**       | 一个元素可以同时拥有多个状态                      | 通常用于选取元素的特定部分或生成额外内容             |
| **标准语法**       | 单冒号 `:`                                        | 双冒号 `::`                                          |
| **是否产生新内容** | ❌ 否，只改变现有元素样式                          | ✅ 是，可以插入新内容（需配合 `content`）             |
| **典型代表**       | `:hover`, `:active`, `:first-child`, `:nth-child` | `::before`, `::after`, `::first-line`, `::selection` |

## 七、 文本溢出处理

- **单行文本溢出**：

```css
.single-line {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

- **多行文本溢出 (WebKit)**：

```css
.multi-line {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* 显示行数 */
  overflow: hidden;
}
```

## 八、 布局单位与响应式

### 1. 常见单位

- **`px`**：绝对像素，物理像素与设备相关
- **`%`**：相对于父元素对应属性的百分比
- **`em`**：相对于父元素的字体大小
- **`rem`**：相对于根元素 (`html`) 的字体大小，响应式首选
- **`vw/vh`**：相对于视口（Viewport）宽高的 1%

### 2. CSS 预处理器与后处理器

- **预处理器 (Sass/Less)**：提供变量、嵌套、Mixin 等编程特性，提高代码复用性
- **后处理器 (PostCSS)**：如 `autoprefixer`，在编译后自动添加浏览器私有前缀，处理兼容性
