---
title: instanceOf
date: 2024-10-09 22:38:04
description: 笔记
tags:
 - 前端手写题
---

> instanceof 用于判断一个对象是否是某个构造函数的实例。 obj instanceof Constructor 通过检查构造函数的原型对象是否在obj的原型链上。 1.获取构造函数的prototype属性 2.获取obj的原型对象 3.二者比对

# 手写instanceOf

```js
function myInstanceof(left, right) {
  // 取得左边操作数的原型
  let leftProto = Object.getPrototypeOf(left);
  // 循环遍历右边操作数的原型链
  while (leftProto !== null) {
    // 判断原型是否等于右边操作数的prototype属性
    if (leftProto === right.prototype) {
      return true;
    }
    // 否则，继续向上遍历原型链
    leftProto = Object.getPrototypeOf(leftProto);
  }
  // 如果遍历完原型链都没有找到，则返回false
  return false;
}

// 示例
const myArray = [1, 2, 3];
console.log(myInstanceof(myArray, Array)); // 输出：true
console.log(myInstanceof(myArray, Object)); // 输出：true
console.log(myInstanceof(myArray, String)); // 输出：false
```

```js
function instanceOf(obj,Constructor){
    //当获取的对象为null或者undefined就返回false
    if(obj==null)return false;
    //获取构造器的原型属性
    const prototype=Constructor.prototype;
    //获取obj的原型对象
    let proto=Object.getPrototypeOf(obj);
    //遍历obj的原型链
    while(proto){
        //如果找到与构造器prototype属性一样的原型就返回true
        if(proto===prototype)return true;
        //继续向上查找
        proto=Object.getPrototypeOf(proto);
    }
    //如果遍历完原型链还没找到就返回false
    return false;
}
```

```js
const _instanceof = (target, fn) => {
    let proto = Object.getPrototypeOf(target);
    while(proto) {
        if(proto === fn.prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
    return false;
};
```

### `instanceof` 的核心是沿着对象的原型链查找构造函数的

当我们使用 `A instanceof B` 时，JavaScript 进行如下操作：

1. **获取构造函数的原型**: 首先获取构造函数 `B` 的 `prototype` 属性，即 `B.prototype`。

2. **沿着对象的原型链查找**: 然后，JavaScript 会沿着对象 `A` 的原型链（`[[Prototype]]`）向上查找，看是否能找到 `B.prototype`。

3. 返回结果

   :

   - 如果在原型链上找到了 `B.prototype`，那么 `A` 被认为是 `B` 的实例，`A instanceof B` 返回 `true`。
   - 如果遍历了整个原型链也没有找到 `B.prototype`，那么 `A` 不是 `B` 的实例，`A instanceof B` 返回 `false`。

### 注意事项

- `instanceof` 只能用于判断对象和构造函数的关系，不能用于判断基本数据类型（如字符串、数字、布尔值等）。
- 原型链查找是动态的，如果更改了构造函数的 `prototype` 属性，`instanceof` 的判断结果也会随之改变。