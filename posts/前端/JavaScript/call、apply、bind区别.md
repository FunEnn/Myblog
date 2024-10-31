---
title: call、apply、bind区别
date: 2024-10-20 15:27:04
description: 笔记
tags:
 - JavaScript
---

`call`、`apply` 和 `bind` 是三个用于函数调用的方法，它们允许你以不同的方式指定函数的上下文（即 `this` 值）。这三个方法都属于 `Function` 原型链上的方法，因此所有的函数都继承了它们。

### 三者区别总结

- **参数传递方式**：`call` 逐个传递参数，`apply` 使用数组传递参数，`bind` 既可以逐个传递参数，也可以在调用返回的新函数时再传递参数。
- **函数调用时机**：`call` 和 `apply` 立即调用函数，`bind` 返回一个绑定了 `this` 的新函数，可以稍后调用。
- 常见使用场景
  - 使用 `call` 和 `apply` 来立即调用函数，并手动指定 `this`。
  - 使用 `bind` 来绑定 `this` 并延迟函数调用，例如在事件处理程序中。

### call()

`call()` 方法调用一个具有给定 `this` 值的函数，并且可以传递任意数量的参数。

```js
function greet(language) {
  console.log(`Hello in ${language}!`);
}

const person = {
  name: 'Kimi',
  greet: function(language) {
    console.log(`${this.name} says Hello in ${language}!`);
  }
};

person.greet('English'); // Kimi says Hello in English!
person.greet.call(person, 'Spanish'); // Kimi says Hello in Spanish!
```

### apply()

`apply()` 方法与 `call()` 类似，但它接受一个参数数组而不是参数列表。

```js
const person = {
  name: 'Kimi',
  greet: function(language) {
    console.log(`${this.name} says Hello in ${language}!`);
  }
};

person.greet('English'); // Kimi says Hello in English!
person.greet.apply(person, ['Spanish']); // Kimi says Hello in Spanish!
```

### bind()

`bind()` 方法创建一个新的函数实例，其 `this` 值被绑定到提供的值，并且可以预置初始参数。

```js
const person = {
  name: 'Kimi',
  greet: function(language) {
    console.log(`${this.name} says Hello in ${language}!`);
  }
};

const greetEnglish = person.greet.bind(person, 'English');
greetEnglish(); // Kimi says Hello in English!

const greetSpanish = person.greet.bind(person, 'Spanish');
greetSpanish(); // Kimi says Hello in Spanish!
```

