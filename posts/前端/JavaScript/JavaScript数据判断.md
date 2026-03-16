---
title: JavaScript数据判断
date: 2026-03-08 15:27:04
description: 笔记
tags:
 - JavaScript
---

[toc]

## 一、数据类型检测的四种方式

### 1. `typeof`：基于机器码位的快速判别

`typeof` 是一个运算符，在 V8 引擎底层，它通过检查变量存储的**底层二进制位（Tag）**来快速判定

```javascript
console.log(typeof 2);               // "number"
console.log(typeof 'str');           // "string"
console.log(typeof undefined);       // "undefined"
console.log(typeof function(){});    // "function"

// 历史遗留 Bug
console.log(typeof null);            // "object" 
```

> **原理解析**：JS 早期版本为了性能，将对象标记为 `000`。由于 `null` 的机器码全为 0，导致其被错误判定为对象。此外，`typeof` 无法区分 Object 及其衍生子类（如 Array、Date）

### 2. `instanceof`：基于原型链的拓扑检索

`instanceof` 用于检测构造函数的 `prototype` 属性是否出现在待检测对象的**原型链**上

```javascript
console.log([] instanceof Array);          // true
console.log({} instanceof Object);         // true

// 缺陷：无法穿透包装对象
console.log(2 instanceof Number);          // false
```

- **适用场景**：判断实例与构造函数的关系。
- **局限性**：在 **跨跨域/跨 Iframe** 环境下，由于全局对象（window）不同，其原型链会断裂，导致判定失效。

### 3. `constructor`：基于实例属性的回溯

每个实例对象默认都会继承自构造函数的 `constructor` 属性

```javascript
console.log((2).constructor === Number);   // true
console.log(([]).constructor === Array);   // true
```

- **致命缺陷**：**不可靠性**。`constructor` 是一个可修改的普通属性。在进行原型链继承（如 `Fn.prototype = new Parent()`）时，若不手动纠正，其 `constructor` 会指向基类，导致判断逻辑崩溃

### 4. `Object.prototype.toString.call()`：基于内部标签

利用了引擎内部的 `[[Class]]` 标签，使用 Object 对象的原型方法 toString 来判断数据类型：

```javascript
const toString = Object.prototype.toString;

console.log(toString.call(null));      // "[object Null]"
console.log(toString.call(undefined)); // "[object Undefined]"
console.log(toString.call([]));        // "[object Array]"
console.log(toString.call(new Date()));// "[object Date]"
```

> **为什么必须使用 `.call()`？** 因为 `Array`、`Function` 等内置对象为了实现自身的字符串化，都 **Override（重写）** 了从 Object 继承的 `toString` 方法。通过 `.call()`，我们绕过了这些重写逻辑，直接调用最底层的原始实现。

## 二、数组检测

| **判定方案** | **实现代码**                              | **技术评估**                           |
| ------------ | ----------------------------------------- | -------------------------------------- |
| **标准方案** | `Array.isArray(obj)`                      | **首选**。ES6 规范化接口，原生优化     |
| **通用方案** | `toString.call(obj) === '[object Array]'` | **最稳健**。跨上下文（Iframe）表现完美 |
| **关系判定** | `obj instanceof Array`                    | 常用，但存在跨窗口失效风险             |
| **原型验证** | `Array.prototype.isPrototypeOf(obj)`      | 语义化强，验证原型拓扑关系             |
