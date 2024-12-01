---
title: 常用的 React Hooks
date: 2024-08-18 22:38:04
description: 笔记
tags:
 - React 
---

**useState**：用于在函数组件中添加状态。它返回一个包含当前状态值和更新状态的函数的数组。

**useEffect**：用于在组件渲染后执行副作用操作。可以在 useEffect 中订阅事件、发送网络请求、操作 DOM 等。

**useContext**：用于在函数组件中使用 React 的上下文（Context）。

**useReducer**：类似于 Redux 中的 reducer，用于管理复杂的状态逻辑。

**useRef**：用于在函数组件中创建可变的引用。

**useCallback**：用于缓存回调函数，以避免不必要的函数重新创建。

**useMemo**：用于缓存计算结果，以提高性能。