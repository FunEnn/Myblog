---
title: JavaScript面试题2
date: 2026-04-10 14:59:55
description: 笔记
tags:
 - 前端面试题
---

[toc] 

## JavaScript

### 1. JavaScript 为什么是单线程

| 原因          | 说明                                                |
| ------------- | --------------------------------------------------- |
| 避免 DOM 冲突 | 多线程同时操作同一个 DOM 节点，浏览器不知道该听谁的 |
| 简化设计      | 单线程不用考虑锁、死锁、线程同步等复杂问题          |
| 历史沿革      | 最初只是表单验证脚本，没必要用多线程                |

#### 单线程如何处理耗时任务？

> 通过事件循环（Event Loop）和异步机制

- 同步代码：立即执行
- 异步任务（定时器、网络请求）：交给浏览器其他线程处理，完成后回调放入任务队列
- 主线程空闲时，从队列中取出任务执行

### 2. 死锁

#### 什么是死锁

**死锁（Deadlock）** 是指两个或多个进程在执行过程中，因争夺资源而造成的一种**互相等待**的现象

产生死锁需要四个条件：互斥、持有并等待、不可剥夺、循环等待

#### 解决死锁的方法

1. **预防死锁（设计阶段）**

| 策略           | 破坏的条件 | 做法                                       |
| -------------- | ---------- | ------------------------------------------ |
| 破坏互斥       | 互斥       | 尽量用共享锁、读写锁（但有些资源必须互斥） |
| 破坏持有并等待 | 持有并等待 | 一次性申请所有资源，不成功就释放已持有的   |
| 破坏不可剥夺   | 不可剥夺   | 允许强制抢占资源（需要额外机制）           |
| 破坏循环等待   | 循环等待   | 给资源编号，强制按顺序申请                 |

2. **检测与恢复（运行时）**

| 方法     | 说明                                         |
| -------- | -------------------------------------------- |
| 超时释放 | 获取资源时设置超时，超时后释放已有资源重试   |
| 死锁检测 | 系统定期检测是否有循环等待，有则中断一个线程 |
| 线程回滚 | 将死锁的线程回滚到安全状态，释放资源         |

### 3. 事件循环

事件循环是JavaScript实现异步编程的核心机制。JavaScript是单线程语言，通过事件循环来处理异步操作，避免阻塞主线程

#### 3.1. 宏任务与微任务

**微任务：`Promise.then/catch/finally`、`MutationObserver`、`process.nextTick`**

**宏任务：`setTimeout`、`setInterval`、`setImmediate`、`I/O` 操作、UI渲染、`MessageChannel`**

> 事件循环 的执行顺序是：同步任务 -> 微任务 -> 宏任务

##### 宏任务队列 (Macrotask Queue)

宏任务代表的是**由宿主环境（浏览器或 Node.js）发起**的离散任务。这些任务通常涉及系统的 API 调用或页面的整体调度

**常见的宏任务：**

- 整个 `<script>` 脚本代码
- `setTimeout` 和 `setInterval`
- `setImmediate`（Node.js 特有）
- I/O 操作（文件读写、网络请求完成后的回调）
- UI 渲染（浏览器专有）

**执行特点：**

- 事件循环**每次只从宏任务队列中取出一个**任务执行
- 执行完这一个宏任务后，会去检查并清空所有的微任务

##### 微任务队列 (Microtask Queue)

微任务代表的是**由** **JavaScript** **引擎自身发起**的任务。它们通常是在当前正在执行的代码（当前宏任务）结束后，需要立即执行的逻辑

**常见的微任务：**

- `Promise.then` / `catch` / `finally` 的回调
- `Async/Await`（实际上是 Promise 的语法糖）
- `MutationObserver`（监听 DOM 变动）
- `process.nextTick`（Node.js 特有，且优先级高于其他微任务）

**执行特点：**

- **插队属性**：微任务的优先级高于宏任务
- **必须清空**：当调用栈空了，事件循环会**一次性清空**微任务队列中的所有任务，直到队列为空。如果在执行微任务时又产生了新的微任务，也会在当前轮次内全部跑

| 特性     | 微任务 (Microtask)           | 宏任务 (Macrotask)             |
| -------- | ---------------------------- | ------------------------------ |
| 发起者   | JavaScript 引擎 (V8)         | 宿主环境 (浏览器/Node.js)      |
| 执行时机 | 当前宏任务结束，且在渲染之前 | 在下一轮事件循环，或者渲染之后 |
| 执行数量 | 全清（直到队列为空）         | 只取一个（每次循环只执行一个） |
| 典型例子 | Promise.then                 | setTimeout                     |

#### 3.2. 事件循环的完整流程

1. **执行宏任务**：从宏任务队列中取出一个任务（首次是 `<script>` 脚本）开始执行
2. **执行同步代码**：执行这个宏任务中的所有同步代码
3. **清空微任务队列**：当宏任务的同步代码执行完毕，立即检查微任务队列。如果队列不为空，则循环执行其中的所有微任务，直到队列被**完全清空**
4. **UI** **渲染 (浏览器环境)**：微任务队列清空后，浏览器会判断是否需要进行 UI 渲染（重绘/重排）
5. **开始下一个宏任务**：结束本轮循环，回到第一步，从宏任务队列中取出下一个任务

#### 3.3. 在浏览器和 Node.js 事件循环的区别

##### 宿主环境与实现库

| 特性     | 浏览器 (Chrome/Edge)                    | Node.js                        |
| -------- | --------------------------------------- | ------------------------------ |
| 底层库   | 由 浏览器内核 (Blink/WebCore) 实现      | 由 libuv 库实现                |
| 关注点   | 界面渲染、用户输入、定时器              | 网络 I/O、磁盘读写、数据库连接 |
| 渲染关联 | 事件循环与页面渲染（Rendering）紧密挂钩 | 无页面渲染概念                 |

##### 任务分类的差异

**浏览器端**

任务被简单地分为 **宏任务（Macrotask）** 和 **微任务（Microtask）**。

- **微任务**：Promise.then, MutationObserver。
- **宏任务**：setTimeout, setInterval, I/O, UI Rendering。

**Node.js 端**

Node.js 的事件循环分为六个阶段：timers、pending callbacks、idle, prepare、poll、check 和 close callbacks，每个阶段处理特定类型的回调

Node.js 的事件循环是由 **libuv** 预定义的 **6 个阶段（Phases）** 组成的循环，每个阶段都有一个 FIFO 队列：

1. **timers**：执行 `setTimeout` 和 `setInterval`
2. **pending callbacks**：执行延迟到下一个循环迭代的 I/O 回调
3. **idle, prepare**：仅内部使用
4. **poll (轮询)**：检索新的 I/O 事件；执行 I/O 相关回调（几乎所有回调都在这）
5. **check**：执行 `setImmediate()` 的回调
6. **close callbacks**：执行一些关闭连接的回调，如 `socket.on('close', ...)`

##### Node.js 特有的两个异步 API

**`process.nextTick()`**

- **它不属于事件循环的任何阶段。**
- 它被称为“最快的异步”，因为它会在**当前操作完成后、事件循环继续之前**立即执行。
- **优先级最高**：它的执行甚至早于 Promise 等微任务

**nextTick 与 setTimeout 区别**

| 特性         | process.nextTick()                           | setTimeout(fn, 0)                      |
| ------------ | -------------------------------------------- | -------------------------------------- |
| 所属环境     | Node.js 特有                                 | 浏览器 & Node.js 通用                  |
| 事件循环阶段 | 不属于事件循环任何阶段（在阶段切换间隙执行） | 属于 Timers（定时器）阶段              |
| 优先级       | 最高（在所有异步任务之前）                   | 较低（需等待一轮循环到达 Timers 阶段） |
| 底层实现     | 由 Node.js 引擎直接调度队列                  | 由 libuv 库管理红黑树/最小堆计时器     |

**`setImmediate()`**

- **它属于 check 阶段**
- 它被设计为在 **poll (轮询) 阶段完成后**立即执行
- **与 setTimeout 的区别**：在主模块中直接调用时，两者的顺序是不确定的（取决于系统性能）；但在 I/O 回调内部，`setImmediate` 永远比 `setTimeout` 先执行

### 4. 什么是闭包

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

#### 闭包的三个核心特性

- **函数嵌套**：函数内部嵌套了另一个函数
- **变量引用**：内部函数引用了外部函数的变量
- **生命周期延长**：通常函数执行完后变量会被销毁，但由于闭包的存在，外部函数的变量会**常驻内存**，直到内部函数也被销毁

#### 捕获列表

闭包会捕获它引用的外部变量，这些变量不会被垃圾回收

```JavaScript
function createCounter() {
  let count = 0;        // 被捕获的变量
  let temp = '无用';     // 未被捕获，可能被回收
  
  return {
    increment: () => ++count,  // 捕获了 count
    decrement: () => --count,  // 捕获了 count
    get: () => count           // 捕获了 count
  };
}

const counter = createCounter();
// count 不会因为 createCounter 执行完毕而被销毁
// 因为闭包还在引用它
```

#### 作用域链

每个函数内部都有一个 `[[Scopes]]` 属性，保存着它可访问的变量对象链

```SQL
let global = 'global';

function outer() {
  let outerVar = 'outer';
  
  function inner() {
    let innerVar = 'inner';
    console.log(global);    // 沿作用域链：inner → outer → global
    console.log(outerVar);  // inner → outer
    console.log(innerVar);  // inner
  }
  
  return inner;
}
```

#### 闭包有什么用？

| 用途            | 描述                                               |
| --------------- | -------------------------------------------------- |
| 数据私有化      | 模拟私有变量，防止外部直接修改内部状态。           |
| 持久化状态      | 像上面的计数器一样，在多次调用间保持数据的连续性。 |
| 高阶函数/柯里化 | 允许我们将参数分批传入，定制化函数功能。           |

#### 需要注意的“副作用”

1. **内存消耗**：由于闭包会阻止变量被垃圾回收机制（GC）清理，如果大量使用不当，可能会导致**内存泄漏（利用了函数作用域链的特性）**
2. **性能开销**：闭包在处理速度和内存消耗上比普通函数稍大

**解决办法**：当闭包不再使用时，手动将引用置为 `null`（例如 `counter = null`），释放内存

### 5. js对象new的过程

`new` 操作符的执行过程其实是一个“对象工厂”模式。当我们执行 `const p = new Person()` 时，引擎在后台悄悄完成了四个关键步骤：

#### `new` 关键字的 4 个步骤

1. **创建一个新对象**： 在内存中创建一个空的简单 JavaScript 对象（即 `{}`）
2. **链接原型（Prototype）**： 将这个新对象的 `proto` 属性指向构造函数的 `prototype` 属性。这使得新对象可以访问构造函数原型链上的方法
3. **绑定 this 并执行**： 执行构造函数内部的代码，并将 `this` 绑定到这个新创建的对象上。这样，构造函数里的属性（如 `this.name = name`）就会被添加到新对象中
4. **返回新对象**： 如果构造函数没有返回**非基本类型**的对象，则默认返回这个新创建的对象

```JavaScript
function myNew(Fn, ...args) {
  // 1. 创建新对象并关联原型
  const obj = Object.create(Fn.prototype);
  // 2. 执行构造函数，绑定 this
  const res = Fn.apply(obj, args);
  // 3. 优先返回构造函数返回的对象，否则返回新对象
  return (res instanceof Object) ? res : obj;
}

// 测试代码
function Person(name) { this.name = name; }
const p = myNew(Person, 'Alice');
console.log(p.name);
```

### 6. 原型与原型链

#### 原型（Prototype）

原型是实现**继承和共享属性/方法**的机制

在 JavaScript 中，函数和对象之间存在着一种“父子”关系：

1. **`prototype`（显式原型）**：
   1. 只有**函数**（构造函数）才拥有的属性
   2. 它指向一个对象，这个对象包含了所有实例能够**共享**的属性和方法
2. **`__proto__`（隐式原型）**：
   1. **所有对象**（包括函数）都拥有的属性
   2. 它指向创建该对象的构造函数的 `prototype`

> **核心公式**：`实例.__proto__ === 构造函数.prototype`

#### 原型链 (Prototype Chain)

当你访问一个对象的属性时，JavaScript 的查找逻辑如下：

1. **自身查找**：先看对象自己有没有这个属性。
2. **向上寻根**：如果没有，就顺着 `proto` 去它的原型对象里找。
3. **层层递进**：如果原型对象里也没有，就继续顺着原型对象的 `proto` 往上找
4. **终点**：一直找到 `Object.prototype.proto`，它的值是 **`null`**。如果到这里还没找到，返回 `undefined`

这种由 `proto` 串联起来的查找路径，就是 **原型链**

#### 判断属性是自身的还是继承的

1. `hasOwnProperty()` 方法

它会返回一个布尔值，指示对象自身属性中是否具有指定的属性

- **特点**：它会忽略掉那些从原型链上继承到的属性
- **代码示例**：

```JavaScript
const parent = { familyName: 'Smith' };
const child = Object.create(parent);
child.firstName = 'John';

console.log(child.hasOwnProperty('firstName')); // true (自身的)
console.log(child.hasOwnProperty('familyName')); // false (继承自 parent)
```

- **注意**：如果对象是用 `Object.create(null)` 创建的，或者对象自身重写了 `hasOwnProperty` 方法，直接调用 `child.hasOwnProperty` 会报错

2. `Object.hasOwn()`

- **优点**：它是一个静态方法，不依赖于对象原型，因此对于 `Object.create(null)` 创建的对象也能安全使用。
- **代码示例**：

```JavaScript
const obj = Object.create(null);
obj.name = 'Smith';

// console.log(obj.hasOwnProperty('name')); // 报错：obj.hasOwnProperty is not a function
console.log(Object.hasOwn(obj, 'name')); // true (安全)
```

3. `Object.getOwnPropertyNames()` 或 `Object.keys()`

通过获取对象所有的**自身属性键名列表**，然后判断目标属性是否在列表中

- **Object.keys()**：返回自身可枚举属性
- **Object.getOwnPropertyNames()**：返回自身所有属性（包括不可枚举的）
- **判断逻辑**：

```JavaScript
const keys = Object.getOwnPropertyNames(child);
const isOwn = keys.includes('firstName');
```

### 8. V8垃圾回收机制

#### 8.1. 内存分代架构

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

#### 8.2. 什么是内存泄漏

**内存泄漏（Memory Leak）** 是指程序中动态分配的内存由于某种原因，在使用完毕后**未释放**或**无法释放**，导致这部分内存长期被占用，无法被操作系统或其他进程重新利用

#### 8.3. 常见的内存泄漏场景

1. **意外的全局变量**：未定义的变量挂载在 `window` 上，除非页面关闭，否则永不释放
2. **未清理的定时器或回调**：`setInterval` 内部引用了外部变量，若不 `clearInterval`，闭包引用的内存将一直存在
3. **脱离 DOM 的引用**：在 JS 中保存了 DOM 节点的引用，即使从 HTML 中删除了该节点，JS 里的引用依然指向它
4. **闭包滥用**：内部函数持有巨大的外部变量且长期不被销毁

### 8. 深浅拷贝

#### 8.1. 浅拷贝

浅拷贝是指：创建一个新对象，该对象具有原始对象属性值的精确副本

- **基本类型**：直接拷贝其值（如数字、字符串）
- **引用类型**：拷贝其**内存地址**。这意味着新旧对象指向同一个堆内存空间，修改其中一个嵌套对象，另一个也会受影响

实现方式：`Object.assign()`、扩展运算符 (`...`)、`slice()`、`concat()`

**手写实现浅拷贝：**

```JavaScript
function shallowCopy(object) {
    if(!object || typeof object !== 'object') return object;
    let newObject = Array.isArray(object) ? [] : {};
    for(let key in object){
        if(object.hasOwnProperty(key)){
            newObject[key] = object[key];
        }
    }
    return newObject;
}
```

#### 8.2. 深拷贝

深拷贝会在堆内存中开辟一块**全新的内存地址**，递归地将原对象的所有层级属性全部拷贝过来。两个对象相互独立，修改任何一级属性都不会影响对方

实现方式：`JSON.parse(JSON.stringify(obj))` 、`structuredClone()`

**手写深拷贝：**

```JavaScript
function deepCopy(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (hash.has(obj)) return hash.get(obj);
  const result = Array.isArray(obj) ? [] : {};
  hash.set(obj, result);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepCopy(obj[key], hash);
    }
  }
  return result;
}
```

### 9. this 绑定的“隐式丢失”

当**一个函数被作为“对象的方法”调用时**，它本该指向该对象（隐式绑定）；但由于某种操作，该函数失去了与原对象的联系，退化成了“普通函数调用”，导致 **`this`** **指向了全局对象（`window`**）或 **`undefined`（严格模式）**

#### 9.1. 为什么会发生“丢失”？

在 JS 中，**函数是对象**。当你把一个对象的方法赋值给一个变量，或者作为参数传递时，你传递的是**这个函数本身的引用（地址）**，而不是这个“方法与对象的绑定关系”

**常见的隐式丢失场景**

1. **别名赋值**

```JavaScript
const obj = {
  name: 'TrackMonitor',
  printName: function() {
    console.log(this.name);
  }
};

// 隐式丢失：将函数引用赋值给新变量
const debuggerFn = obj.printName; 

// 此时调用 debuggerFn()，相当于普通函数调用
debuggerFn(); // 输出: undefined (或空，取决于 window.name)
```

2. **参数传递**

```JavaScript
function execute(fn) {
  fn(); // 这里的调用没有任何前缀
}

const user = {
  name: 'Gemini',
  sayHi: function() {
    console.log('Hi, I am ' + this.name);
  }
};

execute(user.sayHi); // 输出: Hi, I am undefined
```

3. **内置函数（如 setTimeout）**

```CSS
setTimeout(user.sayHi, 1000); // 1秒后输出: Hi, I am undefined
```

#### 9.2. 如何防止隐式丢失？

需要将 `this` **硬绑定（Explicit Binding）**

1. **使用 `.bind()` (最常用)**

`bind` 会返回一个新的函数，并永久地将 `this` 锁定在目标对象上。

```JavaScript
setTimeout(user.sayHi.bind(user), 1000); // 成功输出: Hi, I am Gemini
```

2. **箭头函数 (ES6 推荐)**

箭头函数不绑定 `this`，它会捕获定义时所在上下文的 `this`。

```JavaScript
const user = {
  name: 'Gemini',
  sayHi: () => {
    // 注意：如果在对象字面量顶层定义，this 可能指向 window// 通常在类组件或闭包中使用
  }
};
```

### 10. 改变this指向方式

1. **call()、apply() 和 bind()**

它们都挂载在 `Function.prototype` 上

2. **箭头函数**

箭头函数**没有自己的** **`this`**。它会捕获其**定义时**所处的上下文（词法作用域）的 `this` 值

3. **new 关键字 (构造函数绑定)**

当使用 `new` 操作符调用函数时，JS 内部会执行以下操作：

- 创建一个空对象

- **将函数内部的** **`this`** **指向这个新对象**

- 执行构造函数代码

- 返回该对象

4. **DOM** **事件监听中的 this**

在原生的 DOM 事件处理函数中，`this` 默认指向**绑定事件的元素**（即 `e.currentTarget`）

### 11. call、apply、bind区别

`call`、`apply` 和 `bind` 是三个用于函数调用的方法，它们允许你以不同的方式指定函数的上下文（即 `this` 值）。这三个方法都属于 `Function` 原型链上的方法，因此所有的函数都继承了它们

| 方法  | 参数形式             | 执行时机 | 返回值               |
| ----- | -------------------- | -------- | -------------------- |
| call  | 参数列表（逐个列举） | 立即执行 | 原函数执行结果       |
| apply | 参数数组/类数组      | 立即执行 | 原函数执行结果       |
| bind  | 参数列表             | 延迟执行 | 绑定 this 后的新函数 |

### 12. JavaScript数据类型

根据存储方式的不同，可以将其分为两类：**基本数据类型（Primitive）** 和 **引用数据类型（Reference）**

#### 12.1. 基本数据类型

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

#### 12.2. 引用数据类型

引用类型存储在**堆（Heap）内存**中，栈内存中只保存指向该**堆内存地址的指针**

**Object**：包含普通对象 `{}`

**Array**：有序的数据集合 `[]`

**Function**：可执行的代码块（唯一能被调用的对象）

**其他内置对象**：`Date`、`RegExp`、`Map`、`Set` 等

### 13. Null 与 undefined 区别

**undefined (未定义)：**量虽然声明了，但还没有被赋值

**null** **(空值)：**变量被主动赋值为空

| 特性          | undefined          | null                         |
| ------------- | ------------------ | ---------------------------- |
| 类型 (typeof) | "undefined"        | "object" (JS 历史悠久的 Bug) |
| 转为数字      | NaN                | 0                            |
| 转为布尔      | FALSE              | FALSE                        |
| JSON 序列化   | 属性会被忽略       | 属性会被保留                 |
| 语义          | 缺失（Unexpected） | 为空（Expected）             |

### 14. 判断 js 对象类型

1. **typeof：**适合判断基本类型，但在处理对象时，它几乎都会返回 `"object"`
2. **Object.prototype.toString.call()：**返回一个形如 `[object Type]` 的字符串，能够精确区分内置的所有对象类型
3. **instanceof：**判断原型链
4. **Array.isArray()：**只能判断数组

### 15. 防抖与节流

**防抖函数 (Debounce)** ：适用于搜索框输入查询、窗口大小调整等高频触发但在停止后执行的场景

> **原理**：在事件触发后，函数并不会立即执行，而是等待一段设定的时间 t。如果在这段时间内事件再次被触发，则**重新开始计时**。只有当最后一次触发后，完整地渡过了 t 时间，函数才执行一次

**适用场景**：

- **搜索框输入**：用户输入完最后一个字后再发送请求（搜索建议）
- **窗口大小调整（resize）**：窗口停止变化后再重新渲染布局

```JavaScript
exprot const debounce(fn, delay) {
    let time = null;
    return function(...args) {
        if(time) clearTimeout(time);
        
        time = setTimeout(()=>{
            fn.apply(this, args);
        }, delay)
    }
}
```

**节流函数 (Throttle)** ：适用于滚动加载、点击提交等在规定时间内匀速执行的场景

> **原理**：在规定的时间单位 t 内，函数只能执行一次。如果在 t 时间内多次触发事件，只有第一次生效，其余的都会被忽略

**适用场景**：

- **滚动监听（scroll）**：比如计算瀑布流图片是否进入视口，不需要每移动 1px 就算一次
- **抢购按钮点击**：防止用户疯狂点击导致重复提交

```JavaScript
export const throttle = (fn, delay) => {
  let lastTime = 0;
  return function(...args) {
      const now = Date.now();
      if(now - lastTime >= delay) {
          fn.apply(fn, args);
          lastTime = now;
      }
  }
}
```

### 16. 迭代器和生成器

JavaScript 中，**迭代器** **(Iterator)** 和 **生成器 (Generator)** 是处理集合数据和异步控制流的两个核心工具。它们相辅相成：迭代器是一套**协议**，而生成器是实现这套协议的**最佳方式**

#### 16.1. 迭代器 (Iterator)

> 在`ES6`之前，这种标准的for循环，通过变量来跟踪数组的索引。如果多个循环嵌套就需要追踪多个变量，代码复杂度会大大增加，也容易产生错用循环变量的bug
>
> 迭代器的出现旨在消除这种复杂性并减少循环中的错误

**迭代器不是一种具体的数据类型，而是一种协议（接口）。它规定了一个对象如何按顺序访问集合中的每一项**

所有的迭代器对象都有一个next()方法，每次调用都返回一个结果对象。结果对象有两个属性：一个是value，表示下一个将要返回的值；另一个是done，它是一个布尔类型的值，当没有更多可返回数据时返回true

**迭代器协议：**

一个对象要成为“迭代器”，必须实现一个 `next()` 方法，该方法返回一个包含两个属性的对象：

- `value`: 当前序列的值
- `done`: 布尔值，如果迭代完成则为 `true`，否则为 `false`

示例：

```JavaScript
function createIterator(items) {
    var i = 0;
    
    return { // 返回一个迭代器对象
        next: function() { // 迭代器对象一定有个next()方法
            var done = (i >= items.length);
            var value = !done ? items[i++] : undefined;
            
            return { // next()方法返回结果对象
                value: value,
                done: done
            };
        }
    };
}

var iterator = createIterator([1, 2, 3]);

console.log(iterator.next());  // "{ value: 1, done: false}"
console.log(iterator.next());  // "{ value: 2, done: false}"
console.log(iterator.next());  // "{ value: 3, done: false}"
console.log(iterator.next());  // "{ value: undefiend, done: true}"
// 之后所有的调用都会返回相同内容
console.log(iterator.next());  // "{ value: undefiend, done: true}"
```

**可迭代对象**

> 在ES6中，所有的集合对象（数组、Set集合及Map集合）和字符串都是可迭代对象，可迭代对象都绑定了默认的迭代器

`for-of`循环，可作用在可迭代对象上，正是利用了可迭代对象上的默认迭代器。大致过程是：`for-of`循环每执行一次都会调用可迭代对象的next()方法，并将迭代器返回的结果对象的value属性存储在变量中，循环将继续执行这一过程直到返回对象的`done`属性的值为`true

```javascript
var colors = ["red", "green", "blue"];
for(let color of colors){
    console.log(color);
}
```

**可迭代协议 (Iterable)：**

如果一个对象拥有 `[Symbol.iterator]` 属性（一个返回迭代器的函数），它就是“可迭代对象”

```JavaScript
const myIterable = [1, 2];
const iterator = myIterable[Symbol.iterator]();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

> 普通的对象不具有Iterator接口，原因是对象的遍历是没有顺序的，没有相应的索引值可言，所以想要使普通的对象要有Iterator接口，需要给它**加上Object方法**变成有顺序的对象即可

#### 16.2. 生成器 (Generator)

> 生成器是一种返回迭代器的函数，通过`function`关键字后的星号（*）来表示，函数中会用到新的关键字`yield`

**生成器**是 ES6 引入的一种特殊函数，它让编写迭代器变得异常简单

**核心特性**

- **语法：** 使用 `function*` 定义
- **暂停执行：** 使用 `yield` 关键字
- **惰性求值：** 只有在调用 `next()` 时，函数体才会执行到下一个 `yield`

**示例代码**

```JavaScript
function* numberGenerator() {
    yield 1;
    yield 2;
    return 3;
}

const gen = numberGenerator(); // 注意：调用函数并不执行，而是返回一个生成器对象
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: true }
```

#### 16.3. 生成器 vs 迭代器

| 特性       | 迭代器 (Iterator)                    | 生成器 (Generator)           |
| ---------- | ------------------------------------ | ---------------------------- |
| 本质       | 一种设计模式/协议                    | 一种特殊的函数语法           |
| 状态管理   | 需要手动维护内部变量（如索引 i）     | 自动保存执行上下文和变量状态 |
| 编写复杂度 | 较高，需要手动写 next 逻辑           | 极低，使用 yield 即可        |
| 关系       | 生成器返回的对象本质上就是一个迭代器 | 生成器是创建迭代器的“工厂”   |

### 17. JS数组遍历方式

#### 17.1. 基础性能类

支持使用 `break` 或 `continue` 提前跳出循环

**`for`** **循环**

- **代码：** `for (let i = 0; i < arr.length; i++) { ... }`

**`for...of`** **(ES6)**

- **代码：** `for (const value of arr) { ... }`

#### 17.2. 函数式编程类

**无法**通过 `break` 跳出循环

| 方法    | 返回值    | 核心用途                                             |
| ------- | --------- | ---------------------------------------------------- |
| forEach | undefined | 单纯遍历，对每一项执行操作（如打印、修改外部变量）。 |
| map     | 新数组    | 加工数据。将原数组映射为一个长度相等的新数组。       |
| filter  | 新数组    | 筛选数据。返回符合条件（返回值为真）的所有元素。     |
| reduce  | 单个值    | 累加器。将数组缩减为一个值（如求和、构建对象）。     |

#### 17.3. For in 与 for of

| 维度     | for...in             | for...of                     |
| -------- | -------------------- | ---------------------------- |
| 主要用途 | 遍历对象的属性名     | 遍历集合（如数组）的元素值   |
| 遍历对象 | 所有对象             | 必须是 Iterable（可迭代）    |
| 遍历内容 | 键名 (Keys)          | 键值 (Values)                |
| 原型链   | 会遍历原型链         | 不会遍历原型链               |
| 手动中断 | 支持 break, continue | 支持 break, continue, return |
| 异步支持 | 不支持               | 支持 for await...of          |

> for-of 不能遍历普通的对象，会报xxx is not iterable,需要把普通对象转化成具有Interator接口的即可。Object.keys(),Object.values()和Obejct.entries()也可以获取

### 18. TypeScript

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

#### 泛型

>  泛型就像一个“类型参数”，让组件/函数能适配多种类型，同时保留类型约束

它允许你在定义函数、接口或类时不预先指定具体的类型，而是在使用时再动态决定

主要使用场景：

1. API 请求封装：同一个请求函数根据泛型返回不同的数据类型
2. 数组工具函数：如 `reverse`、`first` 等保持输入输出类型一致
3. React 泛型组件：一个列表组件可以渲染任意类型的数据
4. 类型工具：如 `Partial`、`Pick` 等内置泛型工具类型
5. 泛型约束：用 `extends` 限制泛型必须有某些属性

### 19. 浏览器js与服务器js区别

在浏览器中，JS 的主要任务是 **交互 (Interactivity)，**在 Node.js 中，JS 的主要任务是 **处理逻辑与中转数据**

| 特性     | 浏览器 JavaScript              | 服务器 JavaScript (Node.js)     |
| -------- | ------------------------------ | ------------------------------- |
| 全局对象 | window                         | global                          |
| 操作对象 | DOM / BOM（页面元素、URL）     | 操作系统 / 文件系统             |
| 网络能力 | 受限（同源策略、Fetch/XHR）    | 强大（可创建 HTTP/TCP 服务器）  |
| 模块规范 | ES Modules (import/export)     | CommonJS (require) & ES Modules |
| 安全性   | 运行在沙箱中，无法访问本地文件 | 拥有完整的系统权限（读写硬盘）  |

### 20. postMessage 与 MessageChannel

####  `window.postMessage`

- **定义**：一个允许跨源通信的方法
- **特性**：你需要明确指定“接收方”是谁（比如 `window.opener` 或 `iframe.contentWindow`）
- **场景**：主要用于**不同窗口/标签页/iframe** 之间的通信
- **安全性**：通过 `targetOrigin` 参数强制要求验证接收方的身份，防止数据泄露

#### `MessageChannel`

MessageChannel 是一种 Web API 接口，允许在不同的浏览器上下文（如 iframe 或 Web Worker）之间进行双向通信

- **定义**：提供了一个异步通信的通道，包含两个相互关联的端口（`port1` 和 `port2`）
- **特性**：一旦通道建立，两个端口就可以独立于创建它们的上下文进行通信
- **场景**：主要用于 **Web Worker**、**Service Worker** 或**复杂组件间**的深度解耦
- **转移性**：端口本身是可以“转移”（Transferable）的，你可以把其中一个端口通过 `postMessage` 送给别人

| 维度     | window.postMessage          | MessageChannel               |
| -------- | --------------------------- | ---------------------------- |
| 通信对象 | 窗口、iframe、Worker        | 任何持有 Port 的对象         |
| 建立连接 | 需持有对方窗口的引用        | 需通过 postMessage 转移端口  |
| 异步类型 | 宏任务                      | 宏任务                       |
| 双向性   | 需双方各自监听 message 事件 | 天然双向（port1 <-> port2）  |
| 解耦程度 | 较低（需依赖 Window 对象）  | 极高（端口拿到哪，哪就能通） |

### 21. Web Worker

Web Worker 是 HTML5 引入的一项关键技术，它允许 JavaScript 在后台线程中运行，从而解决了 JavaScript 单线程模型的性能瓶颈问题

**核心特性**：

- **独立线程**：Web Worker 运行在独立的线程中，与主线程隔离
- **消息通信**：通过 `postMessage()` 和 `onmessage` 事件实现线程间通信
- **无** **DOM** **访问**：Worker 无法直接操作 DOM 或访问 `window` 对象
- **同源限制**：Worker 脚本必须与主线程同源

**类型**：

1. **专用 Worker (Dedicated Worker)**：仅能被创建它的脚本使用
2. **共享 Worker (Shared Worker)**：可被多个脚本共享（需同源）
3. **Service Worker**：用于离线缓存和网络代理（进阶功能）

#### Service Worker

Service Worker 是一种特殊的脚本，注册后会安装在浏览器后台。它像是一个位于浏览器和网络之间的**中间人**

- **离线优先**：它拦截所有网络请求。如果没网，它可以直接从 `Cache Storage` 拿资源返回
- **消息推送**：即使你没打开网页，它也能接收服务器推送的消息并弹出提醒
- **后台同步**：当用户在没网时点击“发送消息”，Service Worker 可以等有网了自动在后台重试
- **限制**：必须在 **HTTPS** 环境下运行（安全考虑）

| 特性     | Web Worker                     | Service Worker                   |
| -------- | ------------------------------ | -------------------------------- |
| 主要定位 | 计算密集型任务（提速）         | 网络代理/离线缓存（离线体验）    |
| 生命周期 | 与页面同步（页面关了它就没了） | 永久驻留（页面关了它依然在后台） |
| 网络拦截 | 不行                           | 可以（核心能力）                 |
| 通信对象 | 仅限于创建它的那个页面         | 作用域下的所有页面/标签页        |
| 典型场景 | 图片处理、复杂算法、加密解密   | 离线访问、推送通知、资源预加载   |

## ES6

### 1. `var` vs `let` vs `const`

ES6 引入块级作用域，旨在解决变量提升带来的逻辑混乱

| 特性         | var           | let    | const  |
| ------------ | ------------- | ------ | ------ |
| 块级作用域   | ❌ 无          | ✅ 有   | ✅ 有   |
| 变量提升     | ✅ 存在        | ❌ 无   | ❌ 无   |
| 暂时性死区   | ❌ 无          | ✅ 有   | ✅ 有   |
| 重复声明     | ✅ 允许        | ❌ 禁止 | ❌ 禁止 |
| 修改指针     | ✅ 允许        | ✅ 允许 | ❌ 禁止 |
| 全局声明挂载 | 挂载到 window | 不挂载 | 不挂载 |

> 核心解析：`let` 和 `const` 存在暂时性死区 (TDZ)，强制“先声明后使用”。`const` 保证的是指针不可变，但对于对象，其内部属性依然可以修改

#### 暂时性死区

简单来说，在代码块内，使用 `let` 或 `const` 声明变量之前，该变量都是不可用的。这块“不可用的区域”就是暂**时性死区**

**为什么会产生 TDZ：**

在 ES6 之前，使用 `var` 声明变量会发生**变量提升**：变量的声明会被提升到作用域顶部，并初始化为 `undefined`。

但在 ES6 中，`let` 和 `const` 虽然也会被“提升”，但它们与 `var` 有一个核心区别：**它们不会被自动初始化**

> 只有当程序执行到变量声明的那一行代码时，变量才会被真正初始化。在此之前，任何访问该变量的操作都会抛出 `ReferenceError`

### 2. 箭头函数与普通函数区别

1. 箭头函数本身没有 this：箭头函数的 `this` 取决于它外层的第一个**普通函数**的 `this`。不可以直接修改箭头函数的 this 指向
2. 箭头函数本身没有 argument：可以通过扩展符代替 argument 获取函数的多余参数（...args）
3. 箭头函数不能通过 new 调用：箭头函数不可以当作构造函数
4. 箭头函数没有原型（`prototype` 属性）

### 3. Promise

Promise 简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果

#### 3.1. 解决的核心痛点

- **解决回调地狱（CallbackHell）：** 通过线性链式调用让代码逻辑更清晰
- **统一错误处理机制**
- **多个异步任务的状态合并**

#### 3.2. 三种状态

Promise 实例在生命周期中处于以下三种状态之一：

- Pending（进行中）：初始状态，操作尚未完成
- Fulfilled（已成功）：操作成功完成（有时也称为 Resolved）
- Rejected（已失败）：操作执行失败

**状态转换过程：**

- `pending -> fulfilled`：称为 **Resolved**（已完成）
- `pending -> rejected`：称为 **Rejected**（已拒绝）

> **特点：** 状态一旦改变（凝固）就不会再变

#### 3.3. Promise 的优缺点

| 优点                      | 缺点                                                |
| ------------------------- | --------------------------------------------------- |
| 链式调用，解决回调地狱    | 无法取消：一旦新建就会立即执行，无法中途终止。      |
| 统一的 API 接口，逻辑清晰 | 错误静默：如果不设置回调，内部抛错不会反应到外部。  |
| 状态凝固，结果可多次获取  | 进度不明：处于 Pending 时无法得知任务完成的百分比。 |

#### 3.4. promise 常用方法

| 方法           | 说明              | 特点                                         |
| -------------- | ----------------- | -------------------------------------------- |
| .then()        | 处理成功/失败回调 | 返回新 Promise 实例，支持链式调用            |
| .catch()       | 专门处理拒绝状态  | 相当于 .then(null, rejection)，捕获链条异常  |
| Promise.all()  | 并行执行多个任务  | 全部成功才 resolve，任一失败则 reject        |
| Promise.race() | 多个任务竞速      | 返回最先改变状态的结果，常用于超时控制       |
| .finally()     | 最终执行逻辑      | 无论成功或失败都会执行，不接受任何参数       |
| .allSettled()  | 等待所有结果      | 返回数组记录每个任务的状态和值，不触发失败态 |
| Promise.any()  | 获取第一个成功    | 只要有一个成功就 resolve，全部失败才 reject  |

### 4. async/await

`async/await` 是 JavaScript 中处理异步操作（如网络请求、文件读取、定时器等）的**语法糖**。它建立在 **Promise** 之上，目的是让你用“写同步代码的方式”来编写异步逻辑，从而彻底告终“回调地狱”

#### 4.1. 核心概念

**`async`** **关键字**

- **位置：** 放在函数声明的前面
- **作用：** 强制该函数返回一个 **Promise** 对象
- 如果函数返回一个普通值，它会被自动包装成 `Promise.resolve(value)`

**`await`** **关键字**

- **位置：** 只能在 `async` 函数内部使用
- **作用：** 暂停代码的执行，等待右侧的 Promise 状态变为 `fulfilled`（完成），并返回解析后的结果
- **注意：** 它不会阻塞整个主线程，只会“暂停”当前异步函数的后续逻辑，让出执行权给其他任务

### 5. CommonJS 与 ES6 Module

| 特性     | CommonJS (CJS)             | ES6 Module (ESM)           |
| -------- | -------------------------- | -------------------------- |
| 出现时间 | 早期（为 Node.js 设计）    | 现代（浏览器原生标准）     |
| 导出方式 | module.exports / exports   | export / export default    |
| 导入方式 | require()                  | import                     |
| 加载时机 | 运行时加载（同步）         | 编译时加载（静态分析）     |
| 加载行为 | 值拷贝（导出的是值的复制） | 值引用（导出的实时的绑定） |
| 环境支持 | 主要在 Node.js             | 现代浏览器、Node.js (mjs)  |

#### 运行时 vs 编译时

**CommonJS：运行时加载**

CJS 的 `require()` 是一个普通的函数调用，它在代码**执行到那一行**时才会去加载模块。

- **灵活性**：你可以把 `require` 写在 `if` 语句里。
- **缺点**：工具（如 Webpack）很难在不运行代码的情况下知道你到底引用了哪些模块，导致 **Tree** **Shaking** 效果差

**ESM：编译时加载（静态分析）**

ESM 的 `import` 必须写在文件的顶部，它是**静态的**

- **优势**：打包工具（Vite/Webpack）在代码运行前就能构建完整的**依赖图（AST 分析）**
- **结果**：支持 **Tree** **Shaking**（自动剔除未使用的代码），这也是为什么 Vite 启动快、打包小的原因

#### 值拷贝 vs 值引用

**CommonJS** **(值拷贝)**： 一旦模块输出了一个值，模块内部的变化就**影响不到**外部已经导入的值。除非输出的是一个对象（引用类型）

**ESM** **(值引用)**： `import` 导入的是一个**只读符号映射**。如果原始模块内部修改了这个变量，外部引用的地方会**同步更新**

### 6. ES6 新特性

#### 6.1. `let` 与 `const`：彻底解决了 `var` 带来的作用域混乱问题

#### 6.2. 箭头函数

#### 6.3. 解构赋值

- 对象解构：`const { name, age } = props;`
- 数组解构：`const [state, setState] = useState(0);`
- 默认值与重命名：`const { data: user = {} } = response;`

#### 6.4.  模板字符串：使用反引号 ```，支持多行字符串和插值 `${expression}`

#### 6.5. 展开运算符与剩余参数

- Spread (`...`)：用于浅拷贝对象或合并数组
- Rest (`...args`)：用于获取函数的多余参数，替代了模糊的 `arguments`

#### 6.6. 类 (Class)：引入了 `class`、`extends`、`super`、`static`

#### 6.7. Promise：解决了回调地狱。提供了 `.then()`、`.catch()` 和 `Promise.all()` 等聚合能力

#### 6.8. Set 与 Map

#####  Set：无重复值的集合

`Set` 最核心的特性是**唯一性**和**快速查找**

- **数组去重**：这是最经典的应用

```JavaScript
const unique = [...new Set([1, 2, 2, 3])]; // [1, 2, 3]
```

**集合运算**：轻松实现并集、交集和差集

```JavaScript
const a = new Set([1, 2, 3]);
const b = new Set([2, 3, 4]);
const intersect = new Set([...a].filter(x => b.has(x))); // 交集: {2, 3}
```

##### Map：更强大的键值对

相比普通的 `Object`，`Map` 的键可以是**任何类型**（包括对象、函数、基本类型），且是有序的

- **数据缓存/字典映射**：当键不是字符串时（例如用 DOM 节点作为键来存储关联数据），`Map` 是唯一选择
- **频繁增删改查**：在涉及大量键值对操作的场景下，`Map` 的性能表现通常优于 `Object`
- **需要记录插入顺序**：`Map` 会保留元素的插入顺序，这在实现类似 **LRU（最近最少使用）缓存算法**时非常有用

##### WeakMap：内存友好的“弱引用”映射

`WeakMap` 的键必须是**对象**，且对该对象的引用是“弱引用”。这意味着如果没有其他地方引用这个对象，垃圾回收机制（GC）会自动回收它

**关键应用场景：**

- **在 DOM 节点上存储元数据**： 如果你想给某个 DOM 元素关联一些数据，但又不希望在元素被删除后导致内存泄漏

```JavaScript
const wm = new WeakMap();
const loginBtn = document.querySelector('#login');
wm.set(loginBtn, { clicked: false }); // 当按钮从 DOM 树移除且无引用时，该数据会被自动回收
```

- **实现私有属性**： 利用 `WeakMap` 无法被外部遍历且随实例销毁的特性，可以实现真正的类的私有变量。

```JavaScript
const privates = new WeakMap();
class User {
  constructor(id) {
    privates.set(this, { id });
  }
  getId() {
    return privates.get(this).id;
  }
}
```

- **防止内存泄漏的缓存**

| 类型    | 键类型   | 是否可遍历 | 回收机制           | 核心用途                           |
| ------- | -------- | ---------- | ------------------ | ---------------------------------- |
| Set     | 值本身   | 是         | 正常强引用         | 去重、集合逻辑、成员判断           |
| Map     | 任意类型 | 是         | 正常强引用         | 高性能字典、复杂 Key 映射          |
| WeakMap | 仅限对象 | 否         | 弱引用（自动回收） | DOM 关联数据、私有属性、防泄漏缓存 |

#### 6.9. 模块化 (ES Modules)：`import` 和 `export`

