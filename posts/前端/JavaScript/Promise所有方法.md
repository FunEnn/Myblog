---
title: Promise所有方法
date: 2024-10-20 15:27:04
description: 笔记
tags:
 - JavaScript
---



### 创建 Promise

```js
let promise = new Promise((resolve, reject) => {
  // 异步操作
  if (成功) {
    resolve(value);
  } else {
    reject(error);
  }
});
```

### Promise.prototype.then()

- 用于指定当Promise被解决（fulfilled）或拒绝（rejected）时的回调函数。
- 参数：可以是两个函数，第一个用于处理解决值，第二个用于处理拒绝的原因。
- 返回：一个新的Promise对象，该对象与原Promise链式调用。

```js
promise.then(
  function(value) {
    // 当Promise解决时调用
  },
  function(reason) {
    // 当Promise拒绝时调用
  }
);
```

### Promise.prototype.catch()

- 用于指定当Promise被拒绝时的回调函数。
- 参数：一个函数，用于处理拒绝的原因。
- 返回：一个新的Promise对象。

```javascript
promise.catch(function(reason) {
  // 处理拒绝的原因
});
```

### Promise.prototype.finally()

- 用于指定一个无论Promise是解决还是拒绝都会执行的回调函数。
- 参数：一个函数，在Promise解决或拒绝后执行。
- 返回：一个新的Promise对象。

```vjavascript
promise.finally(function() {
  // Promise解决或拒绝后都会执行
});
```

### Promise.all()

- 用于将多个Promise实例包装成一个新的Promise。
- 参数：一个Promise实例的数组或类数组对象。
- 返回：一个新的Promise，当所有传入的Promise都解决时解决，如果任何一个Promise被拒绝，则立即拒绝。

```javascript
Promise.all([promise1, promise2, ...]).then(values => {
  // 当所有Promise都解决时调用
}).catch(error => {
  // 如果任何一个Promise被拒绝时调用
});
```

### Promise.race()

- 用于将多个Promise实例包装成一个新的Promise。
- 参数：一个Promise实例的数组或类数组对象。
- 返回：一个新的Promise，当传入的任何一个Promise解决或拒绝时，立即解决或拒绝。

```javascript
Promise.race([promise1, promise2, ...]).then(value => {
  // 当任何一个Promise解决时调用
}).catch(error => {
  // 当任何一个Promise拒绝时调用
});
```

### Promise.resolve()

- 用于创建一个解决（fulfilled）状态的Promise对象。
- 参数：解决的值。
- 返回：一个新的解决状态的Promise对象。

```javascript
let promise = Promise.resolve(value);
```

### Promise.reject()

- 用于创建一个拒绝（rejected）状态的Promise对象。
- 参数：拒绝的原因。
- 返回：一个新的拒绝状态的Promise对象。

```javascript
let promise = Promise.reject(reason);
```

### Promise.allSettled()

- 用于等待多个Promise实例都settled（解决或拒绝）。
- 参数：一个Promise实例的数组或类数组对象。
- 返回：一个新的Promise，当所有传入的Promise都settled时解决，解决的值是一个对象数组，每个对象描述了对应的Promise的结果。

```javascript
Promise.allSettled([promise1, promise2, ...]).then(results => {
  // 当所有Promise都settled时调用
});
```

### async/await 是什么

`async`/`await` 是 JavaScript 中处理异步操作的一组语法糖，它们建立在 `Promise` 之上，允许你以同步的方式编写异步代码。这种方法可以使异步代码的阅读和编写更加直观，减少了回调函数的嵌套，也简化了 `Promise` 链的复杂性。

```js
async function fetchData() {
  try {
    const response = await fetch('url'); // 等待Promise解决
    const data = await response.json(); // 等待另一个Promise解决
    return data;
  } catch (error) {
    console.error('There was an error!', error);
  }
}
```

