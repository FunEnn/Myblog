---
title: Redux使用
date: 2024-08-18 22:38:04
description: 笔记
tags:
 - React 
---



## 1、简介

**Redux 是一个使用叫做 “action” 的事件来管理和更新应用状态的模式和工具库** 它以集中式 Store（centralized store）的方式对整个应用中使用的状态进行集中管理，其规则确保状态只能以可预测的方式更新。

Redux 是一个小型的独立 JS 库。 但是，它通常与其他几个包一起使用：

**React-Redux**

Redux 可以集成到任何的 UI 框架中，其中最常见的是 React 。[**React-Redux**](https://react-redux.js.org/) 是我们的官方包，它可以让 React 组件访问 state 片段和 dispatch actions 更新 store，从而同 Redux 集成起来。

**Redux Toolkit**

[**Redux Toolkit**](https://redux-toolkit.js.org/) 是我们推荐的编写 Redux 逻辑的方法。 它包含我们认为对于构建 Redux 应用程序必不可少的包和函数。 Redux Toolkit 构建是我们建议的最佳实践中，简化了大多数 Redux 任务，预防了常见错误，并使编写 Redux 应用程序变得更加容易。

**Redux DevTools 扩展**

[**Redux DevTools 扩展**](https://github.com/zalmoxisus/redux-devtools-extension) 可以显示 Redux 存储中状态随时间变化的历史记录。这允许你有效地调试应用程序，包括使用强大的技术，如“时间旅行调试”。

### Redux 数据流

![数据流更新动画](https://cn.redux.js.org/assets/images/ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)

## 2、基础使用

### 安装 Redux Toolkit 和 React-Redux

> `npm install @reduxjs/toolkit react-redux`

### 创建 Redux Store

创建 `src/app/store.js` 文件。从 Redux Toolkit 引入 `configureStore` API。我们从创建一个空的 Redux store 开始，并且导出它:

```js
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {},
  preloadedState: 
})
```

上面代码创建了 Redux store ，并且自动配置了 Redux DevTools 扩展 ，这样你就可以在开发时调试 store

### 为 React 提供 Redux Store

创建 store 后，便可以在 React 组件中使用它。 在 src/index.js 中引入我们刚刚创建的 store , 通过 React-Redux 的 `<Provider>`将 `<App>` 包裹起来,并将 store 作为 prop 传入。

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
        <App />
    </Provider>
  </BrowserRouter>
);
```

### 创建 Redux State Slice

创建 `src/features/counter/counterSlice.js` 文件。在该文件中从 Redux Toolkit 引入 `createSlice` API

创建 slice 需要一个字符串名称来标识切片、一个初始 state 以及一个或多个定义了该如何更新 state 的 reducer 函数。slice 创建后 ，我们可以导出 slice 中生成的 Redux action creators 和 reducer 函数。

```js
import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    increment: state => {
      // Redux Toolkit 允许我们在 reducers 写 "可变" 逻辑。它
      // 并不是真正的改变状态值，因为它使用了 Immer 库
      // 可以检测到“草稿状态“ 的变化并且基于这些变化生产全新的
      // 不可变的状态
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})

// 每个 case reducer 函数会生成对应的 Action creators
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer

//或者
/*
const userActions = userSlice.actions;
const userReducer = userSlice.reducer;

export { userActions, userReducer };
*/
```

### 将 Slice Reducers 添加到 Store 中

通过在 reducer 参数中定义一个字段，我们告诉 store 使用这个 slice reducer 函数来处理对该状态的所有更新。

```js
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

export default configureStore({
  reducer: {
    counter: counterReducer
  }
})
```

### 在 React 组件中使用 Redux 状态和操作

使用 React-Redux 钩子让 React 组件与 Redux store 交互。我们可以使用 `useSelector` 从 store 中读取数据，使用 `useDispatch` dispatch actions。

示例：

```jsx
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterSlice'
import styles from './Counter.module.css'

export function Counter() {
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}
```

## 3、