---
title: React响应式原理
date: 2024-08-18 22:38:04
description: 笔记
tags:
 - React 
---

React.js 使用一种称为`虚拟 DOM`（Virtual DOM）的机制来实现高效的响应式更新。**当状态（State）发生变化时，React.js 会重新计算虚拟 DOM 树，并与之前的虚拟 DOM 树进行比较，找出需要更新的部分，然后仅更新这些部分到实际 DOM。**这样可以减少对实际 DOM 的操作，提高性能。

React.js 的虚拟 DOM 通过使用 **JavaScript 对象来描述组件的层次结构和属性**，它类似于真实 DOM，但只是存在于内存中。通过使用虚拟 DOM，React.js 可以高效地进行组件的渲染和更新。

另外，React.js 也提供了钩子函数的函数式组件形式，称为 React Hooks。**Hooks 可以用于在函数组件中使用状态和其他 React 特性，以及执行副作用操作；Hooks 的使用方式与传统的类组件的生命周期方法有所不同。**
