---
title: React18新特性
date: 2024-12-17 22:38:04
description: 笔记
tags:
 - React 
---

### React 16

1. **Fiber架构**：React 16引入了全新的Fiber架构，这是其最核心的变化之一。Fiber将渲染过程拆分为多个可中断的小任务，避免了长时间占用主线程，从而提高了应用的响应性和性能。
2. **错误边界（Error Boundaries）**：React 16引入了错误边界，允许开发者捕获组件树中的JavaScript错误，防止整个应用崩溃。
3. **Portals**：React 16引入了Portals API，允许将子节点渲染到存在于父组件之外的DOM节点上。

### React 17

1. **自动批处理（Automatic Batching）**：React 17引入了自动批处理，这意味着所有的生命周期方法和状态更新都会被批处理，这可以减少不必要的渲染次数，提高性能。
2. **函数组件支持Context**：React 17允许函数组件使用Context，这使得函数组件能够像类组件一样使用Context。
3. **增强的事件处理**：React 17增强了事件处理，使得事件处理更加稳定和可靠。
4. **新的并发模式**：React 17引入了新的并发模式，使得React能够更好地处理大量数据和复杂的状态。
5. **性能优化**：React 17在性能上进行了大量优化，包括减少不必要的渲染和提升组件的初始化速度

### React 18

1. **并发渲染（Concurrent Rendering）**：React 18最引人注目的特性之一是并发渲染。并发渲染允许React在渲染过程中中断和恢复，从而提高应用的响应性和性能。
2. **自动批处理（Automatic Batching）**：在React 18中，自动批处理得到了扩展，几乎所有状态更新（包括 `useState`、 `useReducer` 和 `useContext`）都会被自动批处理。
3. **新的根API（createRoot）**：React 18引入了一个新的根API `createRoot`，用于替代 `ReactDOM.render`。使用 `createRoot` 可以启用并发特性。
4. **新的钩子（useId、useDeferredValue、useTransition）**：React 18引入了 `useId`、 `useDeferredValue` 和 `useTransition` 等新的钩子，为开发者提供了更多灵活性。
5. **性能优化和底层改进**：React 18采用了新的渲染引擎React Reconciler，提升了性能和可扩展性。