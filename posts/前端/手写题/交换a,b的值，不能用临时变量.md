---
title: 交换a,b的值，不能用临时变量
date: 2024-10-10 22:38:04
description: 笔记
tags:
 - 前端手写题
---

**方法一：使用加法（仅限于数字）**

```javascript
let a = 5;  
let b = 10;  
  
a = a + b;  
b = a - b;  
a = a - b;  
  
console.log(a); // 输出 10  
console.log(b); // 输出 5
```

**方法二：使用解构赋值**

```javascript
let a = 5;  
let b = 10;  
  
[a, b] = [b, a];  
  
console.log(a); // 输出 10  
console.log(b); // 输出 5
```

