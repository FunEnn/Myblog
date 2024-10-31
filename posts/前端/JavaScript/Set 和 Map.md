---
title: Set 和 Map
date: 2024-10-23 15:27:04
description: 笔记
tags:
 - JavaScript
---

Set 和 Map 主要的应用场景在于 **数据重组** 和 **数据储存**

Set 是一种叫做 **集合** 的数据结构，Map 是一种叫做 **字典** 的数据结构

### Set

Set本身是一个构造函数，用来生成 Set 数据结构。Set 对象允许你**储存任何类型的唯一值**，无论是原始值或者是对象引用。`Set`函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。

由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以 keys 方法和 values 方法的行为完全一致。默认遍历器生成函数就是它的 values 方法，可以省略 values 方法，直接用 for...of(value) 循环遍历 Set

#### 特性

- 成员的值都是唯一的，没有重复的值。
- 利用 Set 去除数组重复成员。
- 向 Set 加入值的时候，不会发生类型转换。类似 `===` 的算法判断两个值是否不同，主要的区别是向 Set 加入值时认为 NaN 等于自身，而精确相等运算符认为 NaN 不等于自身。
- keys 方法和 values 方法的行为完全一致。原因是 Set 结构没有键名，只有键值（或者说键名和键值是同一个值）
- 直接用 for...of(value) 循环遍历 Set
- 实现并集（Union）、交集（Intersect）和差集（Difference）。

```js
let set1 = new Set([1, 2, 3])
let set2 = new Set([4, 3, 2])

let intersect = new Set([...set1].filter(value => set2.has(value))) // [2,3]
let union = new Set([...set1, ...set2]) // [1,2,3,4]
let difference = new Set([...set1].filter(value => !set2.has(value))) // [1]
```

### WeakSet

WeakSet 结构与 Set 类似，也是不重复的值的集合。WeakSet 对象允许你将弱引用对象储存在一个集合中。

#### 与 Set 的区别

- WeakSet 的成员只能是对象，而不能是其他类型的值。
- WeakSet 中的对象都是**弱引用**
- WeakSet 没有 size 静态属性
- WeakSet 没有 clear 方法
- WeakSet 没有遍历方法，WebSet 不能遍历

WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。 一个对象若只被弱引用所引用，**则被认为是不可访问（或弱可访问）的，并因此可能在任何时刻被回收。**

### Map

ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。Set 和 Map 都可以用来生成新的 Map

> **Map 的插入总是保持着先后顺序（删除了中间元素也会保持顺序）**，这和传统 Hash 并不一样。传统 Hash 是一种散列结构，元素并不具备顺序性，而 Map 很明显， 后插入的元素就在最后，保持着这种先后顺序。Map 的底层数据结构，使用了 `Hash + 链表` 实现。用 Hash 思想来存储数据，达到 O(1) 的查找时间，用链表思想来维持插入数据的先后顺序。

#### 特性

- Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键
- Map 的键若是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等(`===`)，Map 将其视为一个键
- Map 的 set 方法返回的是当前的 Map 对象，因此可以采用链式写法。
- Map 结构转数组结构，可用扩展运算符（...）

### WeakMap

WeakMap 结构与 Map 结构类似，也是用于生成键值对的集合。**注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。**

#### 与 Map 的区别

- WeakMap 只接受对象作为键名（null除外），不接受其他类型的值作为键名。
- WeakMap 的键名所指向的对象都是弱引用，不计入垃圾回收机制。
- WeakMap 没有 size 静态属性
- WeakMap 没有 clear 方法
- WeakMap 没有遍历方法，WeakMap 不能遍历
- WeakMap 只有四个方法可用：get()、set()、has()、delete()。

### WeakRef

WeakSet 和 WeakMap 是基于弱引用的数据结构，[ES2021](https://github.com/tc39/proposal-weakrefs)更进一步，提供了 **WeakRef** 对象，用于直接**创建对象的弱引用**。

```javascript
let target = {};
let wr = new WeakRef(target);
```

上面示例中，`target`是原始对象，构造函数`WeakRef()`创建了一个基于`target`的新对象`wr`。这里，`wr`就是一个 WeakRef 的实例，属于对`target`的弱引用，垃圾回收机制不会计入这个引用，也就是说，`wr`的引用不会妨碍原始对象`target`被垃圾回收机制清除。