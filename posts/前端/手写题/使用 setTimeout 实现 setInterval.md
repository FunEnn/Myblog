---
title: 使用 setTimeout 实现 setInterval
date: 2024-10-11 22:38:04
description: 笔记
tags:
 - 前端手写题
---

`setInterval` 和 `setTimeout` 都是 JavaScript 中用于执行定时任务的函数，但它们的行为有所不同。`setInterval` 会按照指定的间隔不断重复执行某个函数，而 `setTimeout` 则只会在指定的时间后执行一次函数。

```javascript
function mySetInterval(callback, delay) {  
    // 初始调用  
    callback();  
  
    // 递归调用 setTimeout 来模拟 setInterval  
    const intervalId = setTimeout(() => {  
        // 清除前一个 setTimeout，防止在回调函数执行时间较长时产生累积的延迟  
        clearTimeout(intervalId);  
  
        // 递归调用 mySetInterval  
        mySetInterval(callback, delay);  
  
        // 执行回调函数  
        callback();  
    }, delay);  
}  
  
// 使用示例  
mySetInterval(() => console.log('Hello, world!'), 1000);
```

这个 `mySetInterval` 函数首先执行一次回调函数，然后设置一个 `setTimeout` 在指定的延迟后执行。在 `setTimeout` 的回调函数中，我们首先清除前一个 `setTimeout`（如果有的话），然后递归调用 `mySetInterval` 来设置下一个 `setTimeout`，最后执行回调函数。这样就实现了类似 `setInterval` 的功能。