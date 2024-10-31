---
title: reduce
date: 2024-10-09 22:38:04
description: 笔记
tags:
 - 前端手写题
---

`reduce` 是 JavaScript 中一个强大的数组方法，用于将数组中的所有元素通过一个累加器函数组合成单一值。与 `map` 或 `filter` 不同，`reduce` 可以返回任意类型的值，而不只是数组。

### `reduce` 方法的功能

`reduce` 方法将数组中的每个元素依次传递给回调函数，并累积计算结果。它最终返回累积的结果值。

### `reduce` 的使用示例

1. **求和**:

   ```javascript
   const numbers = [1, 2, 3, 4];
   const sum = numbers.reduce((acc, curr) => acc + curr, 0);
   console.log(sum); // 输出: 10
   ```

2. **计算数组中最大值**:

   ```javascript
   const numbers = [1, 2, 3, 4];
   const max = numbers.reduce((acc, curr) => (curr > acc ? curr : acc), -Infinity);
   console.log(max); // 输出: 4
   ```

3. **将数组转换为对象**:

   ```javascript
   const people = [
     { id: 1, name: 'John' },
     { id: 2, name: 'Jane' },
     { id: 3, name: 'Jim' },
   ];
   const peopleObject = people.reduce((acc, person) => {
     acc[person.id] = person.name;
     return acc;
   }, {});
   console.log(peopleObject); 
   // 输出: { 1: 'John', 2: 'Jane', 3: 'Jim' }
   ```

4. **扁平化二维数组**:

   ```javascript
   const array = [[1, 2], [3, 4], [5, 6]];
   const flatArray = array.reduce((acc, curr) => acc.concat(curr), []);
   console.log(flatArray); 
   // 输出: [1, 2, 3, 4, 5, 6]
   ```

### `reduce` 的实现原理

`reduce` 的核心思想是遍历数组，通过每次调用 `callback` 函数，逐步将结果累积到 `accumulator` 中，并最终返回 `accumulator` 的值。

### 手写实现 `reduce`

**法一**

```js
Array.prototype.myReduce = function(callback, initialValue) {
    let accumulator = initialValue !== undefinded ? initialValue : this[0];
    let startIndex = initialValue !== undefinded ? 0 : 1;
    for(let i = startIndex; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i, this);
    }
    return accumulator;
}

// 测试
const numbers = [1, 2, 3, 4];
const sum = numbers.myReduce((acc, curr) => acc + curr, 0);
console.log(sum); // 输出: 10
```

**法二**

```js
function myReduce(arr, callback, initialValue) {
    // 检查 callback 是否为函数
    if (typeof callback !== 'function') {
        throw new TypeError('callback is not a function');
    }

    // 检查数组长度
    if (arr == null) { // 如果数组为空，并且没有提供初始值，则抛出错误
        throw new TypeError('Array is null or undefined');
    }

    const length = arr.length;
    let index = 0; // 初始化索引
    let accumulator = initialValue; // 初始化累加器，如果没有提供初始值，则默认为数组的第一个元素

    // 如果没有提供初始值，则将累加器初始化为数组的第一个元素
    if (initialValue === undefined) {
        accumulator = arr[0];
        index = 1; // 从第二个元素开始遍历
    }

    // 遍历数组
    while (index < length) {
        if (arr.hasOwnProperty(index)) { // 确保属性属于数组本身
            accumulator = callback(accumulator, arr[index], index, arr);
            index++;
        }
    }

    return accumulator; // 返回累加器的最终值
}

// 示例
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.myReduce((accumulator, current) => accumulator + current, 0);
console.log(sum); // 输出：15

const flat = [[1, 2], [3, 4], [5, 6]].myReduce((accumulator, current) => accumulator.concat(current), []);
console.log(flat); // 输出：[1, 2, 3, 4, 5, 6]
```

### `reduce` 与其他数组方法的对比

- **`map`**: `map` 返回一个新数组，而 `reduce` 可以返回任何值。
- **`filter`**: `filter` 生成一个新的过滤后的数组，而 `reduce` 可以对数组进行更复杂的操作。
- **`forEach`**: `forEach` 仅用于遍历数组，而 `reduce` 可以对遍历结果进行累积处理。

