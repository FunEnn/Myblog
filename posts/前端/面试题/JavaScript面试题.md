---
title: JavaScript面试题
date: 2026-03-10 14:59:55
description: 笔记
tags:
 - 前端面试题
---

[toc]

## 一、ES6 新特性

1. **`let`** **与** **`const`**：彻底解决了 `var` 带来的作用域混乱问题
2. **箭头函数**
3. **解构赋值**：
   1. 对象解构：`const { name, age } = props;`
   2. 数组解构：`const [state, setState] = useState(0);`
   3. 默认值与重命名：`const { data: user = {} } = response;`
4. **模板字符串：**使用反引号 ```，支持多行字符串和插值 `${expression}`
5. **展开运算符与剩余参数：**
   1. Spread (`...`)：用于浅拷贝对象或合并数组
   2. Rest (`...args`)：用于获取函数的多余参数，替代了模糊的 `arguments`
6. **类 (Class)**：引入了 `class`、`extends`、`super`、`static`
7. **Promise：**解决了回调地狱。提供了 `.then()`、`.catch()` 和 `Promise.all()` 等聚合能力
8. **Set 与 Map**
9. **模块化 (ESModules)：**`import` 和 `export`

### 变量声明与作用域：`var` vs `let` vs `const`

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

### 3. async/await

`async/await` 是 JavaScript 中处理异步操作（如网络请求、文件读取、定时器等）的**语法糖**。它建立在 **Promise** 之上，目的是让你用“写同步代码的方式”来编写异步逻辑，从而彻底告终“回调地狱”

#### 核心概念

**`async`** **关键字**

- **位置：** 放在函数声明的前面
- **作用：** 强制该函数返回一个 **Promise** 对象
- 如果函数返回一个普通值，它会被自动包装成 `Promise.resolve(value)`

**`await`** **关键字**

- **位置：** 只能在 `async` 函数内部使用
- **作用：** 暂停代码的执行，等待右侧的 Promise 状态变为 `fulfilled`（完成），并返回解析后的结果
- **注意：** 它不会阻塞整个主线程，只会“暂停”当前异步函数的后续逻辑，让出执行权给其他任务

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

### 改变this指向方式

**1. call()、apply() 和 bind()**

它们都挂载在 `Function.prototype` 上

**2. 箭头函数**

箭头函数**没有自己的** **`this`**。它会捕获其**定义时**所处的上下文（词法作用域）的 `this` 值

**3. new 关键字 (构造函数绑定)**

当使用 `new` 操作符调用函数时，JS 内部会执行以下操作：

1. 创建一个空对象
2. **将函数内部的** **`this`** **指向这个新对象**
3. 执行构造函数代码
4. 返回该对象

**4. DOM** **事件监听中的 this**

在原生的 DOM 事件处理函数中，`this` 默认指向**绑定事件的元素**（即 `e.currentTarget`）



## 十二、事件循环

事件循环是JavaScript实现异步编程的核心机制。JavaScript是单线程语言，通过事件循环来**处理异步操作**，避免阻塞主线程

### 宏任务与微任务

**微任务：**`Promise.then/catch/finally`**、**`MutationObserver`**、**`process.nextTick`

**宏任务：**`setTimeout`**、**`setInterval`**、**`setImmediate`**、**`I/O` 操作、UI 渲染、`MessageChannel`

### 事件循环的完整流程

1. **执行宏任务**：从宏任务队列中取出一个任务（首次是 `<script>` 脚本）开始执行
2. **执行同步代码**：执行这个宏任务中的所有同步代码
3. **清空微任务队列**：当宏任务的同步代码执行完毕，立即检查微任务队列。如果队列不为空，则循环执行其中的所有微任务，直到队列被**完全清空**
4. **UI** **渲染 (浏览器环境)**：微任务队列清空后，浏览器会判断是否需要进行 UI 渲染（重绘/重排）
5. **开始下一个宏任务**：结束本轮循环，回到第一步，从宏任务队列中取出下一个任务

## 十三、闭包

**闭包就是一个函数以及它所声明时所处的环境（词法环境）的组合**

要形成一个闭包，必须满足两个条件：

1. **函数嵌套**：在一个函数内部定义另一个函数
2. **引用外部变量**：内部函数引用了外部函数的变量

```JavaScript
function outer() {
  let count = 0; // 外部函数的局部变量
  return function inner() {
    count++; // 内部函数引用了外部变量
    console.log(count);
  };
}

const counter = outer(); 
counter(); // 输出 1
counter(); // 输出 2
```

### 闭包的三个核心特性

- **函数嵌套**：函数内部嵌套了另一个函数
- **变量引用**：内部函数引用了外部函数的变量
- **生命周期延长**：通常函数执行完后变量会被销毁，但由于闭包的存在，外部函数的变量会**常驻****内存**，直到内部函数也被销毁

### 闭包有什么用？

| 用途            | 描述                                               |
| --------------- | -------------------------------------------------- |
| 数据私有化      | 模拟私有变量，防止外部直接修改内部状态。           |
| 持久化状态      | 像上面的计数器一样，在多次调用间保持数据的连续性。 |
| 高阶函数/柯里化 | 允许我们将参数分批传入，定制化函数功能。           |

### 需要注意的“副作用”

1. **内存消耗**：由于闭包会阻止变量被垃圾回收机制（GC）清理，如果大量使用不当，可能会导致**内存泄漏**
2. **性能开销**：闭包在处理速度和内存消耗上比普通函数稍大

**解决办法**：当闭包不再使用时，手动将引用置为 `null`（例如 `counter = null`），释放内存

## 十四、js对象new的过程

`new` 操作符的执行过程其实是一个“对象工厂”模式。当我们执行 `const p = new Person()` 时，引擎在后台悄悄完成了四个关键步骤：

### `new` 关键字的 4 个步骤

1. **创建一个新对象**： 在内存中创建一个空的简单 JavaScript 对象（即 `{}`）
2. **链接原型（Prototype）**： 将这个新对象的 `proto` 属性指向构造函数的 `prototype` 属性。这使得新对象可以访问构造函数原型链上的方法
3. **绑定 this 并执行**： 执行构造函数内部的代码，并将 `this` 绑定到这个新创建的对象上。这样，构造函数里的属性（如 `this.name = name`）就会被添加到新对象中
4. **返回新对象**： 如果构造函数没有返回**非基本类型**的对象，则默认返回这个新创建的对象

## 十五、V8垃圾回收机制

### 内存分代架构

V8 将堆内存分为两个主要区域：**新生代 (Young Generation)** 和 **老生代 (Old Generation)**

1. 新生代 (Young Generation)

- **特点**：存放生存时间短的对象（如局部变量）。内存空间较小（通常 1MB - 8MB）
- **算法**：**Scavenge 算法**。
  - 将空间平分为两部分：**使用区 (From-space)** 和 **空闲区 (To-space)**
  - **清理过程**：当 From 空间快满时，检查存活对象，将其复制到 To 空间，然后清空 From 空间。最后，From 和 To 角色对调
  - **晋升**：如果一个对象经过两次 Scavenge 依然存活，它会被移动到老生代

2. 老生代 (Old Generation)

- **特点**：存放生存时间长或常驻内存的对象（如闭包中的变量、全局对象）。空间大
- **算法**：**Mark-Sweep (标记清除)** & **Mark-Compact (标记整理)**
  - **Mark-Sweep**：遍历堆中所有对象，标记存活对象，直接清除未被标记的对象。但这会产生内存碎片
  - **Mark-Compact**：为了解决碎片问题，将存活对象向内存的一端移动，清理边界外的内存

### 什么是内存泄漏

**内存泄漏（Memory Leak）** 是指程序中动态分配的内存由于某种原因，在使用完毕后**未释放**或**无法释放**，导致这部分内存长期被占用，无法被操作系统或其他进程重新利用

### 常见的内存泄漏场景

1. **意外的全局变量**：未定义的变量挂载在 `window` 上，除非页面关闭，否则永不释放
2. **未清理的定时器或回调**：`setInterval` 内部引用了外部变量，若不 `clearInterval`，闭包引用的内存将一直存在
3. **脱离** **DOM** **的引用**：在 JS 中保存了 DOM 节点的引用，即使从 HTML 中删除了该节点，JS 里的引用依然指向它
4. **闭包滥用**：内部函数持有巨大的外部变量且长期不被销毁

## 十六、JavaScript数据类型

根据存储方式的不同，可以将其分为两类：**基本数据类型（Primitive）** 和 **引用数据类型（Reference）**

### 基本数据类型

基本类型的数据直接存储在**栈（Stack）**内存中

| 类型      | 描述                                    | 特点                                    |
| --------- | --------------------------------------- | --------------------------------------- |
| Number    | 数值（包含整数、浮点数、NaN、Infinity） | 基于 IEEE 754 标准                      |
| String    | 字符串                                  | 不可变性（修改字符串会创建新字符串）    |
| Boolean   | 布尔值（true / false）                  | 逻辑判断基础                            |
| Undefined | 变量已声明但未赋值                      | 默认初始值                              |
| Null      | 表示“空”的对象引用                      | typeof null === 'object' (历史遗留 Bug) |
| Symbol    | 唯一且不可变的值 (ES6)                  | 常用于对象私有属性的 Key                |
| BigInt    | 任意精度的整数 (ES10)                   | 用于处理超过 $2^{53} - 1$ 的大整数      |

### 引用数据类型

引用类型存储在**堆（Heap）内存**中，栈内存中只保存指向该**堆内存地址的指针**

**Object**：包含普通对象 `{}`

**Array**：有序的数据集合 `[]`

**Function**：可执行的代码块（唯一能被调用的对象）

**其他内置对象**：`Date`、`RegExp`、`Map`、`Set` 等

## 十七、Null 与 undefined 区别

**undefined (未定义)：**量虽然声明了，但还没有被赋值

**null** **(空值)：**变量被主动赋值为空

| 特性          | undefined          | null                         |
| ------------- | ------------------ | ---------------------------- |
| 类型 (typeof) | "undefined"        | "object" (JS 历史悠久的 Bug) |
| 转为数字      | NaN                | 0                            |
| 转为布尔      | FALSE              | FALSE                        |
| JSON 序列化   | 属性会被忽略       | 属性会被保留                 |
| 语义          | 缺失（Unexpected） | 为空（Expected）             |

## 十八、判断 js 对象类型

1. **typeof：**适合判断基本类型，但在处理对象时，它几乎都会返回 `"object"`
2. **Object.prototype.toString.call()：**返回一个形如 `[object Type]` 的字符串，能够精确区分内置的所有对象类型
3. **instanceof：**判断原型链
4. **Array.isArray()：**只能判断数组

## 十九、TypeScript

- TypeScript：TS是JavaScript的超集，它**引入了静态类型系统**，允许开发者为变量、函数参数和返回值指定类型。这有助于在编译时期就发现潜在的类型错误，提高代码的可读性和可维护性
- JavaScript：JS是一种**动态类型**的语言，变量的类型是在运行时确定的，不需要显式声明变量的类型

#### 基本类型

| 类型      | 描述                             | 示例                                                  |
| --------- | -------------------------------- | ----------------------------------------------------- |
| string    | 表示文本数据                     | let name: string = "Alice";                           |
| number    | 表示数字，包括整数和浮点数       | let age: number = 30;                                 |
| boolean   | 表示布尔值 true 或 false         | let isDone: boolean = true;                           |
| array     | 表示相同类型的元素数组           | let list: number[] = [1, 2, 3];                       |
| tuple     | 表示已知类型和长度的数组         | let person: [string, number] = ["Alice", 30];         |
| enum      | 定义一组命名常量                 | enum Color { Red, Green, Blue };                      |
| any       | 任意类型，不进行类型检查         | let value: any = 42;                                  |
| void      | 无返回值（常用于函数）           | function log(): void {}                               |
| null      | 表示空值                         | let empty: null = null;                               |
| undefined | 表示未定义                       | let undef: undefined = undefined;                     |
| never     | 表示不会有返回值                 | function error(): never { throw new Error("error"); } |
| object    | 表示非原始类型                   | let obj: object = { name: "Alice" };                  |
| union     | 联合类型，表示可以是多种类型之一 | let id: string                                        |
| unknown   | 不确定类型，需类型检查后再使用   | let value: unknown = "Hello";                         |

#### 泛型工具类型

| 工具类型     | 逻辑                          | 典型应用场景                           |
| ------------ | ----------------------------- | -------------------------------------- |
| Partial<T>   | 将所有属性变为 可选           | 编辑表单时，只传修改过的字段           |
| Required<T>  | 将所有属性变为 必选           | 确保配置对象中所有项都已填充           |
| Readonly<T>  | 将所有属性变为 只读           | 防止在函数内部意外修改配置或 Props     |
| Pick<T, K>   | 从 T 中 挑选 出 K 属性        | 从完整的用户信息中只取 id 和 name      |
| Omit<T, K>   | 从 T 中 剔除 掉 K 属性        | 创建新数据时，剔除掉数据库自增的 id    |
| Record<K, T> | 创建一个 键为 K 值为 T 的对象 | 定义对象映射（如错误代码与消息的映射） |

## 二十、Web Worker

Web Worker 是 HTML5 引入的一项关键技术，它允许 JavaScript 在后台线程中运行，从而**解决了 JavaScript 单线程模型的性能瓶颈问题**

**核心特性**：

- **独立线程**：Web Worker 运行在独立的线程中，与主线程隔离
- **消息通信**：通过 `postMessage()` 和 `onmessage` 事件实现线程间通信
- **无** **DOM** **访问**：Worker 无法直接操作 DOM 或访问 `window` 对象
- **同源限制**：Worker 脚本必须与主线程同源

**类型**：

1. **专用 Worker (Dedicated Worker)**：仅能被创建它的脚本使用
2. **共享 Worker (Shared Worker)**：可被多个脚本共享（需同源）
3. **Service Worker**：用于离线缓存和网络代理（进阶功能）
