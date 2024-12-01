---
title: vue2、vue3响应式原理
date: 2024-11-27 14:59:55
description: 笔记
tags:
 - Vue
---

### Vue2 的响应式原理

通过使用`Object.defineProperty`函数来实现的

在 Vue.js 中，当一个对象被传入 Vue 实例的 data 选项中时，Vue.js 会将这个对象的属性转换为 getter 和 setter，以便在属性被访问或修改时能够触发相应的更新。**当属性被访问时，会触发 getter 函数，当属性被修改时，会触发 setter 函数。在 setter 函数中，Vue.js 会执行一系列的更新操作，如重新渲染视图、触发依赖的更新等。**

### vue3 的响应式原理

Vue 3 中使用了 Proxy 对象来实现响应式。在 Vue 3 中，当一个对象被传入组件实例的 data 选项中时，Vue 3 会将这个对象转换为一个 Proxy 对象，通过拦截对属性的访问和修改来实现响应式。与 Vue 2 中的 Object.defineProperty 相比，Proxy 具有更强大和灵活的拦截能力。

**当属性被访问时，Proxy 对象会触发 get 拦截器函数，当属性被修改时，Proxy 对象会触发 set 拦截器函数。**

### 异同点

Vue 2 使用 Object.defineProperty 函数来实现响应式，而 Vue 3 使用 Proxy 对象来实现响应式。Proxy 对象相较于 Object.defineProperty 具有更强大和灵活的拦截能力。

Vue 2 的响应式系统在对象和数组的监听方面存在一些限制。需要使用特定的数组方法（如 push、pop、splice 等）或 Vue.set 方法来触发数组的更新。而 Vue 3 的响应式系统对数组进行了改进，可以直接监听数组的索引和长度的变化。
