---
title: JavaScript面试题
date: 2026-03-10 14:59:55
description: 笔记
tags:
 - 前端面试题
---

[toc]

## 一、变量声明与作用域：`var` vs `let` vs `const`

ES6 引入块级作用域，旨在解决变量提升带来的逻辑混乱

| **特性**       | **var** | **let** | **const** |
| -------------- | ------- | ------- | --------- |
| **块级作用域** | ❌ 无    | ✅ 有    | ✅ 有      |
| **变量提升**   | ✅ 存在  | ❌ 无    | ❌ 无      |
| **暂时性死区** | ❌ 无    | ✅ 有    | ✅ 有      |
| **重复声明**   | ✅ 允许  | ❌ 禁止  | ❌ 禁止    |
| **修改指针**   | ✅ 允许  | ✅ 允许  | ❌ 禁止    |

> **核心解析**：`let` 和 `const` 存在**暂时性死区 (TDZ)**，强制“先声明后使用”。`const` 保证的是指针不可变，但对于对象，其内部属性依然可以修改

## 二、箭头函数

箭头函数并不是普通函数的简单缩写，它在 `this` 绑定和内存结构上有重大改变

- **没有自己的 `this`**：它继承自定义时所处的作用域。这意味着 `call()`、`apply()` 无法改变其指向
- **不可作为构造函数**：因为没有自己的 `this` 且没有 `prototype` 属性，无法执行 `new` 过程
- **无 `arguments`**：访问的是外层函数的参数，推荐使用 `...rest` 参数代替

## 三、for...in vs for...of

核心在于**可枚举性**与**迭代器协议**

| **特性**     | **for...in (ES3)**         | **for...of (ES6)**             |
| ------------ | -------------------------- | ------------------------------ |
| **遍历内容** | 遍历 **键名 (Key)**        | 遍历 **键值 (Value)**          |
| **作用对象** | 主要用于 **对象**          | 数组、Map、Set、字符串、类数组 |
| **原型链**   | ✅ 会遍历原型链上可枚举属性 | ❌ 只遍历当前实例               |
| **性能**     | 性能较差（需要搜索原型链） | 性能优异                       |

> **结论**：遍历数组及类数组首选 `for...of`；遍历对象属性使用 `for...in`（但建议配合 `hasOwnProperty`）

## 四、扩展运算符 (...)

- **浅拷贝**：`let clone = { ...original };`
- **数组转换**：可以将字符串、类数组（arguments）转为真正的数组
- **Redux 实践**：在 reducer 中，利用 `{ ...state, newProp: 1 }` 实现不可变数据的更新

## 五、Ajax, Fetch, Axios

| **维度**     | **AJAX (XHR)**             | **Fetch**               | **Axios**                   |
| ------------ | -------------------------- | ----------------------- | --------------------------- |
| **底层实现** | `XMLHttpRequest` 异步对象  | 浏览器原生标准 API      | 基于 XHR 封装的库           |
| **异步模型** | 事件回调（易产生回调地狱） | Promise（原生支持）     | Promise（原生支持）         |
| **报错机制** | 状态码非 2xx 需手动判断    | **仅网络错误才 reject** | 状态码非 2xx 自动 reject    |
| **同构性**   | 仅限浏览器                 | 浏览器（Node 需三方库） | **同构**（Node 端自动切换） |

## 六、原型与原型链

### 1. 原型 (Prototype)

每个构造函数内部都有一个 `prototype` 属性，它指向一个对象，该对象包含了可以由该构造函数的所有实例**共享**的属性和方法

### 2. 原型链 (Prototype Chain)

当你访问一个对象的属性时：

1. 首先在对象**自身**查找
2. 若不存在，则通过 `__proto__` 指针去它的**原型对象**查找
3. 依次递归，直到找到对应属性或到达终点

### 3. 原型链的终点

原型链的尽头是 `Object.prototype.__proto__`，结果为 **`null`**

> **总结**：所有的对象最终都由 `Object` 构造，而 `Object.prototype` 是一个孤立的顶层对象，它不再指向任何原型

## 七、Map 与 Object 

| **特性**     | **Map**                        | **Object**            |
| ------------ | ------------------------------ | --------------------- |
| **键的类型** | 任意值（对象、函数、基本类型） | 仅限 String 或 Symbol |
| **顺序**     | 严格有序（插入顺序）           | 无序                  |
| **Size**     | 自带 `size` 属性               | 需要手动迭代计算      |
| **性能**     | 频繁增删场景下表现更佳         | 未做针对性优化        |

## 八、CommonJS 与 ES6 Module

| **特性**         | **CommonJS (CJS)**           | **ES6 Module (ESM)**             |
| ---------------- | ---------------------------- | -------------------------------- |
| **引入方式**     | `require('module')`          | `import { name } from 'module'`  |
| **输出方式**     | `module.exports = {}`        | `export const name = ''`         |
| **加载时机**     | **运行时加载** (Runtime)     | **编译时输出接口** (Static)      |
| **加载方式**     | 同步加载                     | 异步加载 (支持顶层 `await`)      |
| **变量引用**     | **值的浅拷贝** (快照)        | **值的动态引用** (只读链接)      |
| **只读性**       | 引入后可重新赋值（改变指针） | **Read-only** (不可改变指针指向) |
| **Tree Shaking** | ❌ 不支持（无法静态分析）     | ✅ 原生支持（提升打包效率）       |
| **this 指向**    | 指向当前模块对象             | 指向 `undefined`                 |

## 九、Promise

### 1. 理解 Promise 的本质

**Promise** 简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果

#### 1.1 三种状态

Promise 实例在生命周期中处于以下三种状态之一：

- **Pending（进行中）**：初始状态，操作尚未完成
- **Fulfilled（已成功）**：操作成功完成（有时也称为 Resolved）
- **Rejected（已失败）**：操作执行失败

#### 1.2 两个关键特性

1. **状态不可逆**：状态只能从 `Pending` 变为 `Fulfilled` 或 `Rejected`。一旦状态定型（Resolved），就永远不会再变，任何时候都可以获取这个结果
2. **结果导向**：对象的状态不受外界影响，只有异步操作的结果能决定当前状态

### 2. Promise 的优缺点

| **优点**                  | **缺点**                                                  |
| ------------------------- | --------------------------------------------------------- |
| 链式调用，解决回调地狱    | **无法取消**：一旦新建就会立即执行，无法中途终止。        |
| 统一的 API 接口，逻辑清晰 | **错误静默**：如果不设置回调，内部抛错不会反应到外部。    |
| 状态凝固，结果可多次获取  | **进度不明**：处于 `Pending` 时无法得知任务完成的百分比。 |

## 十、垃圾回收与内存泄漏

### 1. 浏览器垃圾回收（GC）机制

垃圾回收是指系统自动收回不再使用的变量所占用的内存空间

#### 1.1 核心原理：可达性（Reachability）

垃圾回收器会定期扫描内存中的对象，判断它们是否还能被“根”（如全局对象 window、当前执行上下文中的局部变量）访问到。如果一个对象不再被引用，它就会被视为“垃圾”

#### 1.2 两大回收算法

**标记清除（Mark-and-Sweep）**—— 现代浏览器主流

这是目前最常用的算法。它分为两个阶段：

- **标记阶段**：从根对象开始，遍历所有引用的对象，打上“活跃”标记
- **清除阶段**：遍历内存，销毁所有没有被标记的对象

**引用计数（Reference Counting）**—— 较少使用

记录每个值被引用的次数。

- **缺陷**：无法解决**循环引用**问题。如果两个对象互相引用，它们的引用计数永远不会清零，导致内存无法回收

### 2.  常见内存泄漏的四种场景

内存泄漏是指程序中已动态分配的堆内存由于某种原因未释放或无法释放，造成系统内存的浪费

#### 2.1 意外的全局变量

```javascript
function foo() {
  bar = "this is a hidden global variable"; // 未使用 let/var/const，挂载到了 window
}
```

**解决**：开启严格模式 (`'use strict'`)，强制声明变量

#### 2.2 被遗忘的计时器或回调

```javascript
let data = loadData();
setInterval(() => {
  console.log(data); // 只要定时器不停止，data 就永远不会被回收
}, 1000);
```

**解决**：在不需要时显式调用 `clearInterval` 或 `clearTimeout`

#### 2.3 脱离 DOM 的引用

当你删除了一张表格的 DOM，但 JavaScript 变量里还存着某一行 `tr` 的引用

```javascript
let elements = {
  button: document.getElementById('button')
};
document.body.removeChild(document.getElementById('button'));
// 此时 button 元素在页面消失，但在 elements 对象中依然占据内存
```

**解决**：手动将变量设置为 `null`

#### 2.4 不合理的闭包

闭包会维持其外部函数作用域的引用。如果闭包函数本身长期存在，那么它引用的变量也无法释放

## 十一、this绑定机制与手动实现 call/apply/bind

### 1. 深度理解 `this` 对象

`this` 是执行上下文中的一个属性，指向最后一次调用该方法的对象。其指向遵循以下四种模式（优先级由高到低）：

1. **构造器调用模式**（最高优先级）：使用 `new` 关键字时，`this` 指向新创建的空对象。
2. **显式绑定模式**（`apply/call/bind`）：通过这些方法强制指定 `this` 指向某个对象。
3. **方法调用模式**：作为对象属性被调用（如 `obj.fn()`），`this` 指向该对象 `obj`。
4. **函数调用模式**（最低优先级）：普通函数直接调用，非严格模式下指向 `window`（全局对象），严格模式下为 `undefined`

### 2.  `call()`、`apply()` 与 `bind()` 的异同

这三个方法都能改变 `this` 指向，但在参数传递和执行时机上有所区别：

| **方法**    | **参数形式**         | **执行时机** | **返回值**             |
| ----------- | -------------------- | ------------ | ---------------------- |
| **`call`**  | 参数列表（逐个列举） | 立即执行     | 原函数执行结果         |
| **`apply`** | 参数数组/类数组      | 立即执行     | 原函数执行结果         |
| **`bind`**  | 参数列表             | **延迟执行** | 绑定 `this` 后的新函数 |

### 3. 手写实现

#### 手写 `call`

**核心思路**：将函数设为上下文对象的一个属性，由该对象调用，利用“方法调用模式”自然改变 `this`

```javascript
Function.prototype.myCall = function(context, ...args) {
  if (typeof this !== "function") throw new TypeError("Error");
  
  context = context || window; // 处理上下文为空的情况
  const fnSymbol = Symbol('fn'); // 使用 Symbol 防止属性覆盖
  context[fnSymbol] = this;     // 将当前函数挂载到对象上
  
  const result = context[fnSymbol](...args); // 执行函数
  
  delete context[fnSymbol];     // 清理现场
  return result;
};
```

#### 手写 `apply`

**核心思路**：与 `call` 类似，区别在于对第二个参数（数组）的处理

```javascript
Function.prototype.myApply = function(context, argsArray) {
  if (typeof this !== "function") throw new TypeError("Error");
  
  context = context || window;
  const fnSymbol = Symbol('fn');
  context[fnSymbol] = this;
  
  // 执行并处理数组参数
  const result = Array.isArray(argsArray) ? context[fnSymbol](...argsArray) : context[fnSymbol]();
  
  delete context[fnSymbol];
  return result;
};
```

#### 手写 `bind`

**核心思路**：返回一个闭包函数。难点在于处理**构造函数调用**的情况（`new` 绑定的优先级高于 `bind`）

```javascript
Function.prototype.myBind = function(context, ...args) {
  if (typeof this !== "function") throw new TypeError("Error");
  
  const self = this;
  return function F(...newArgs) {
    // 如果是通过 new 调用的，this 指向实例，否则指向 context
    if (this instanceof F) {
      return new self(...args, ...newArgs);
    }
    return self.apply(context, [...args, ...newArgs]);
  };
};
```

