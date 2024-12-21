---
title: ES6
date: 2024-10-20 15:27:04
description: 笔记
tags:
 - JavaScript
---



### 1. let 和 const

`let` 允许你在块级作用域中声明变量，而 `const` 用于声明常量，一旦声明赋值后，其值不能被重新赋值。

### 2. 箭头函数

```js
const sum = (a, b) => a + b;
```

### 3. 模板字符串

使用反引号（```）可以创建模板字符串，它们允许内嵌表达式。

```js
const name = 'Kimi';
const greeting = `Hello, ${name}!`;
```

### 4. 扩展运算符

```javascript
const numbers = [1, 2, 3];
const moreNumbers = [...numbers, 4, 5];
```

### 5. 类（Classes）

引入了基于类的面向对象编程，提供了一种新的语法糖，使得定义构造函数和原型方法更加简洁。

```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
```

### 6. Promises

用于异步计算，允许你为异步操作写同步代码

```javascript
const promise = Promise.resolve('Hello, world!');
promise.then(value => console.log(value));
```

### 7. Proxy 和 Reflect

`Proxy` 对象用于定义基本操作的自定义行为（如属性查找、赋值、枚举、函数调用等）。`Reflect` 是一个内置对象，提供拦截 JavaScript 操作的方法。

