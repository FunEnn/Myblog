---
title: Map
date: 2024-10-09 22:38:04
description: 笔记
tags:
 - 前端手写题
---

### `map` 的实现原理

`map` 的实现是遍历数组中的每个元素，对每个元素执行回调函数，并将回调函数的结果存入一个新数组中

### 手写实现 `map`

```javascript
//法一
Array.prototype.myMap = function(callback,thisArg) {
    if(typeof callback !== 'function') {
        throw new TypeError(callback + 'is not a function');
    }
    const result = [];
    for (let i = 0; i < this.length; i++) {
        if(this.hasOwnProperty(i)) {
            result.push(callback.call(thisArg, this[i], i, this));
        }
    }
    return result;
}

//法二
function myMap(arr, func) {
    if (!Array.isArray(arr)) {
        throw new TypeError('The first argument must be an array.');
    }
    if (typeof func !== 'function') {
        throw new TypeError('The second argument must be a function.');
    }
    
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr.hasOwnProperty(i)) { // 确保属性属于数组本身，而不是原型链上的
            result.push(func(arr[i], i, arr)); // 将回调函数的结果添加到新数组
        }
    }
    return result;
}

// 测试
const numbers = [1, 2, 3, 4];
const squaredNumbers = numbers.myMap((number) => number * number);
console.log(squaredNumbers); // 输出: [1, 4, 9, 16]
```

### `map` 与其他数组方法的对比

- **`forEach`**: `forEach` 用于遍历数组，它不返回新数组。`map` 则返回一个新数组。
- **`filter`**: `filter` 用于筛选数组元素，返回一个新数组。`map` 是对数组元素进行处理，返回一个新数组。
- **`reduce`**: `reduce` 用于将数组元素归约为单个值，而 `map` 是将数组元素映射为一个新数组。

### `map` 的特点

- **不改变原数组**: `map` 不会修改原数组，而是返回一个新的数组。
- **返回值**: 返回一个新的数组，数组中的每个元素是原数组元素经 `callback` 处理后的结果。
- **回调函数必须有返回值**: 如果 `callback` 没有返回值，`map` 返回的新数组中对应的位置将会是 `undefined`。

