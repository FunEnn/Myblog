---
title: for in 和 for of 区别
date: 2024-12-01 15:27:04
description: 笔记
tags:
 - JavaScript
---

### for in

`for-in`循环用于遍历一个对象的所有可枚举属性，包括其原型链上的属性。

```javascript
const obj = { a: 1, b: 2 };
for (const key in obj) {
  if (obj.hasOwnProperty(key)) { // 检查属性是否为obj自身的属性，而不是原型链上的属性
    console.log(key + ' = ' + obj[key]);
  }
}
```

1. **遍历属性**：`for-in`循环遍历对象的所有可枚举属性，包括继承的属性。
2. **属性顺序**：按照属性创建的顺序进行遍历。
3. **非数组**：`for-in`不适用于数组，因为数组索引也是属性，会遍历所有索引。
4. **性能**：对于对象属性的遍历，`for-in`可能不如`for-of`高效

### for of

`for-of`循环用于遍历可迭代对象（如数组、字符串、Map、Set等）的值。

```javascript
const arr = [3, 5, 7];
for (const value of arr) {
  console.log(value);
}
```

### 区别

- `for-in`用于遍历对象的属性，包括继承的属性。
- `for-of`用于遍历可迭代对象的值，如数组、字符串、Map和Set。
- `for-of`通常比`for-in`更适合遍历数组和字符串，因为它遵循迭代器协议，且性能更好。
- `for-in`循环中，如果需要排除对象的原型链属性，可以使用`hasOwnProperty`方法进行检查。