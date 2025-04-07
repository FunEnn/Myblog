---
title: css、less、scss区别
date: 2024-12-20 22:38:04
description: 笔记
tags:
 - CSS
---

### Less

Less是一种动态的**样式表**语言，可以编译为CSS。它在功能和特性上类似于Sass，但其语法更简单。Less的一个关键优势是它能够使用JavaScript函数来创建动态的CSS值。Less还支持嵌套规则、混合和变量。

示例：

```less
@primary-color: #007bff;

.button {
  background-color: @primary-color;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
}

.box {
  .button;
  border: 1px solid @primary-color;
}
```

Less还提供了一些高级功能，例如作用域和命名空间等。通过使用作用域和命名空间，可以更好地组织和管理Less代码，避免命名冲突和样式污染。

### Sass

Sass代表Syntactically Awesome Style Sheets。它是一种预处理器，可以编译为CSS，并为CSS增加了额外的功能，例如变量、混合、函数和嵌套。Sass有两种语法选项：Sass（缩进语法）和SCSS（Sassy CSS）。Sass使用空格缩进来定义代码块，而SCSS具有更传统的CSS语法。

示例：

```scss
$primary-color: #007bff;

.button
  background-color: $primary-color
  color: white
  padding: 10px 20px
  border-radius: 5px

.box
  @include button
  border: 1px solid $primary-color
```

### SCSS

SCSS（Sassy CSS）是一种非常流行的CSS预处理器，它可以让开发人员更加高效地编写CSS代码。

示例：

```scss
$primary-color: #007bff;

@mixin button {
  background-color: $primary-color;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
}

.button {
  @include button;
}

.box {
  @include button;
  border: 1px solid $primary-color;
  width: calc(50% - #{($padding * 2)});
}
```

