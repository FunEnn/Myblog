---
title: JSON
date: 2024-10-21 15:27:04
description: 笔记
tags:
 - JavaScript
---

JSON（JavaScript Object Notation）是一种轻量级的数据交换格式，易于人阅读和编写，同时也易于机器解析和生成。它基于JavaScript的一个子集，但JSON是独立于语言的文本格式。

### JSON 的特点

1. **文本格式**：JSON是一种纯文本格式，这意味着它可以跨不同的平台和编程语言使用。
2. **键值对**：JSON数据由键值对构成，其中键是字符串，而值可以是字符串、数字、布尔值、数组、对象（另一个JSON结构）或`null`。
3. **数组**：在JSON中，值也可以是数组，这使得它非常适合表示有序的数据集合。
4. **自描述**：JSON结构通常包含足够的信息来描述其内容，无需额外的文档。
5. **数据交换**：JSON广泛用于网络应用之间的数据交换，因为它易于人阅读和编写，同时也易于机器解析和生成。
6. **语言独立性**：虽然JSON的名字来源于JavaScript，但它与JavaScript的特定实现无关，可以被任何编程语言处理。
7. **广泛支持**：几乎所有现代编程语言都提供了解析和生成JSON数据的库。

**示例**：

```json
{
  "name": "John Doe",
  "age": 30,
  "is_student": false,
  "courses": ["Math", "Science", "History"],
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "state": "CA",
    "zip": "12345"
  }
}
```

### 在 JavaScript 中如何操作 JSON：

#### 1. 将JSON字符串转换为JavaScript对象

使用`JSON.parse()`方法可以将JSON格式的字符串转换为JavaScript对象。

```javascript
let jsonString = '{"name": "John", "age": 30}';
let obj = JSON.parse(jsonString);
console.log(obj.name); // 输出: John
```

#### 2. 将JavaScript对象转换为JSON字符串

使用`JSON.stringify()`方法可以将JavaScript对象转换为JSON格式的字符串。

```javascript
let obj = {name: "John", age: 30};
let jsonString = JSON.stringify(obj);
console.log(jsonString); // 输出: {"name":"John","age":30}
```

#### 3. 遍历JSON对象

你可以使用`for...in`循环来遍历对象的所有可枚举属性。

javascript复制

```javascript
let obj = JSON.parse(jsonString);
for (let key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(key + ': ' + obj[key]);
  }
}
```