---
title: sleep函数
date: 2024-10-09 22:38:04
description: 笔记
tags:
 - 前端手写题
---

```javascript
const sleep = (delay) => new Promise((resolve) => setTimeout(() => resolve(), delay));
```

`sleep` 函数是一个用于在异步代码中引入延迟的工具。它通过返回一个 `Promise`，结合 `setTimeout` 来实现延迟。

### 工作原理

`sleep` 函数主要通过 `Promise` 和 `setTimeout` 来实现延迟。以下是工作流程：

1. 调用 `sleep(delay)` 时，函数会立即返回一个 `Promise` 对象。
2. `setTimeout` 开始计时，当计时达到 `delay` 毫秒时，执行回调函数 `() => resolve()`。
3. `resolve()` 被调用后，`Promise` 状态变为 `fulfilled`，表示延迟已结束。
4. 任何等待该 `Promise` 的异步操作将继续执行。

### 使用示例

```javascript
async function example() {
  console.log("Start");
  await sleep(2000);  // 延迟2秒
  console.log("End after 2 seconds");
}

example();
```

在上面的示例中：

- `console.log("Start")` 立即执行。
- `await sleep(2000)` 会暂停函数的执行 2 秒钟。
- 2 秒钟后，`Promise` 完成，`console.log("End after 2 seconds")` 执行，输出第二条信息。