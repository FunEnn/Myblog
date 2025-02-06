---
title: Zustand入门
date: 2025-02-05 22:38:04
description: 笔记
tags:
 - React
---

[toc]

https://zustand-cn.js.org/

## 1、简介

一个小型、快速、可扩展的基本状态管理解决方案

```bash
# NPM
npm install zustand

# Yarn
yarn add zustand
```

## 2、使用

**首先创建一个 Store**

你的 store 就像一个 Hook！你可以把任何东西放进去：原始值、对象、函数。`set` 函数会合并状态。

```ts
import { create } from 'zustand'

const useStore = create((set) => ({  
    bears: 0,  
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })), 
    removeAllBears: () => set({ bears: 0 }), 
    updateBears: (newBears) => set({ bears: newBears }),
}))
```

**然后绑定组件**

```tsx
import { Button, Space } from 'antd'
import { create } from 'zustand'

const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}))

function BearCounter() {
  const bears = useStore((state) => state.bears)
  return <h1>{bears} around here ...</h1>
}

function Controls() {
  const bears = useStore((state) => state.bears)
  const increasePopulation = useStore((state) => state.increasePopulation)
  const removeAllBears = useStore((state) => state.removeAllBears)

  return (
    <Space size="large">
      <Button type="primary" onClick={increasePopulation}>one up</Button>
      {bears > 0 && <Button type="primary" danger onClick={removeAllBears}>clear</Button>}
    </Space>
  )
}

export default () => {
  return (
    <>
      <BearCounter />
      <Controls />
    </>
  )
}
```

## 3、深度嵌套的对象

如果你有一个像这样的深层状态对象：

```ts
type State = {
  deep: {
    nested: {s
      obj: { count: number }
    }
  }
}
```

更新嵌套状态需要一些努力来确保过程是完全不可变的。

### 常规方法

与 React 或 Redux 类似，正常的方法是复制每个级别的 state 对象。这是通过使用扩展运算符 `...` 并手动合并新状态值来完成的。就像这样：



```tsx
normalInc: () =>
  set((state) => ({
    deep: {
      ...state.deep,
      nested: {
        ...state.deep.nested,
        obj: {
          ...state.deep.nested.obj,
          count: state.deep.nested.obj.count + 1
        }
      }
    }
  })),
```

这是非常长的！让我们探索一些替代方案，让你的生活更轻松。

### 使用 Immer

许多人使用 [Immer](https://github.com/immerjs/immer) 更新嵌套值。无论是在 React、Redux 还是当然的 Zustand 中，都可以随时使用 Immer 来更新嵌套状态！您可以使用 Immer 来缩短深度嵌套对象的状态更新。让我们看一个例子：

```ts
immerInc: () =>
  set(produce((state: State) => { ++state.deep.nested.obj.count })),
```

## 4、自动生成Selector

**创建 `createSelectors` 函数**

```ts
import { StoreApi, UseBoundStore } from 'zustand'

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  let store = _store as WithSelectors<typeof _store>
  store.use = {}
  for (let k of Object.keys(store.getState())) {
    ;(store.use as any)[k] = () => store((s) => s[k as keyof typeof s])
  }

  return store
}
```

如果你有这样的 store：

```ts
interface BearState {
  bears: number
  increase: (by: number) => void
  increment: () => void
}
const useBearStoreBase = create<BearState>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
  increment: () => set((state) => ({ bears: state.bears + 1 })),
}))
```

将该函数应用到你的 store：

```ts
const useBearStore = createSelectors(useBearStoreBase)
```

现在 selector 是自动生成的，您可以直接访问它们：

```ts
// get the propertyconst 
bears = useBearStore.use.bears()
// get the actionconst 
increase = useBearStore.use.increment()
```

## 5、高级用法

### 5.1 状态分割

当应用变得复杂时，可以将 store 拆分成多个小模块，并在需要时将它们组合起来：

```javascript
import { create } from 'zustand';

const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

const useUserStore = create((set) => ({
  name: '',
  setName: (name) => set({ name }),
}));

const useCombinedStore = create((...args) => ({
  ...useCounterStore(...args),
  ...useUserStore(...args),
}));
```

### 5.2 日志中间件

可以使用中间件记录所有状态更新：

```javascript
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const useStore = create(
  devtools((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
  }))
);
```

#### 常见的中间件

- **状态持久化（`persist`）**： 用于将状态持久化到存储中，例如 `localStorage`、`sessionStorage` 或其他自定义存储。支持同步和异步存储

  ```javascript
  import { create } from 'zustand';
  import { persist, createJSONStorage } from 'zustand/middleware';
  
  const useStore = create(
    persist(
      (set) => ({
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 })),
      }),
      {
        name: 'my-store', // 存储中的项目名称
        storage: createJSONStorage(() => localStorage), // 默认使用 localStorage
      }
    )
  );
  ```

- **开发者工具（`devtools`）**：集成 Redux DevTools，方便调试和追踪状态变化。

- **选择器订阅（`subscribeWithSelector`）**：允许使用选择器订阅状态的变化，支持自定义相等函数和立即触发

-  **Immer 集成（`immer`**）：使用 Immer 来简化嵌套状态的更新。

### 5.3 处理异步数据

```ts
const voting = "https://api.github.com/search/users?q=john&per_page=5";
const useStore = create((set) => ({
  voting: voting,
  Votes: {},
  fetch: async () => {
    const response = await fetch(voting);
    const json = await response.json();
    set({ Votes: json.items })
  },
}))
```

## 6、Zustand 和 Redux  区别

### 状态存储

- **Zustand**：
  - 使用 Hooks 创建和管理状态，可以有多个独立的状态存储。
  - 状态存储通过 `create` 函数定义，支持直接在状态存储中定义异步操作。
- **Redux**：
  - 使用单一状态树（单一的 store），需要通过 `Provider` 包裹将 store 注入到组件中。
  - 状态存储通过 reducer 函数定义，通常需要通过 `dispatch` 和 action 来更新状态。

### 状态更新

- **Zustand**：
  - 直接通过 `set` 函数更新状态，支持直接在状态存储中定义更新逻辑。
  - 支持选择性订阅，即组件只订阅需要的状态片段，避免不必要的渲染。
- **Redux**：
  - 通过 `dispatch` 和 action 更新状态，需要定义 action 类型和 reducer 函数。
  - 默认情况下，所有订阅了 store 的组件都会重新渲染，但可以通过 `reselect` 等库优化。

**Redux示例**

```react
import { createStore } from 'redux'
import { useSelector, useDispatch } from 'react-redux'

type State = {
  count: number
}

type Action = {
  type: 'increment' | 'decrement'
  qty: number
}

const countReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.qty }
    case 'decrement':
      return { count: state.count - action.qty }
    default:
      return state
  }
}

const countStore = createStore(countReducer)
```

## 7、 Zustand在非React环境中的使用

**`createStore`**

`createStore` 是 Zustand 的 **vanilla** 模块中提供的一个函数，用于在非 React 环境中创建状态管理的 store。它返回一个包含 `setState`、`getState` 和 `subscribe` 方法的对象，允许你在纯 JavaScript 或 Node.js 环境中管理状态。

示例：

```ts
import { createStore } from 'zustand/vanilla';

// 定义状态和操作函数
const store = createStore((set, get) => ({
  count: 0, // 初始状态
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

// 使用状态
console.log(store.getState().count); // 输出：0

// 更新状态
store.getState().increment();
console.log(store.getState().count); // 输出：1

// 订阅状态变化
const unsubscribe = store.subscribe((state) => {
  console.log('Count changed:', state.count);
});

// 触发状态变化
store.getState().increment(); // 输出：Count changed: 2
store.getState().decrement(); // 输出：Count changed: 1

// 取消订阅
unsubscribe();
```

