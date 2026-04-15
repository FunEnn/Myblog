---
title: React面试题2
date: 2026-04-11 14:59:55
description: 笔记
tags:
 - 前端面试题
---

[toc]

## 1. React生命周期

1. 生命周期的三个阶段

**挂载阶段 (Mounting)**

组件实例被创建并插入 DOM 的阶段

- **类组件：** `constructor` -> `getDerivedStateFromProps` -> `render` -> **`componentDidMount`** (适合发请求、开启定时器)。
- **函数组件：** 函数体执行 -> 渲染 -> **`useEffect(() => { ... }, [])`**

**更新阶段 (Updating)**

当 Props 或 State 发生变化时，组件重新渲染的阶段

- **类组件：** `shouldComponentUpdate` -> `render` -> `getSnapshotBeforeUpdate` -> **`componentDidUpdate`**。
- **函数组件：** 函数体重新执行 -> **`useEffect(() => { ... }, [deps])`**。

**卸载阶段 (Unmounting)**

组件从 DOM 中移除的阶段

- **类组件：** **`componentWillUnmount`** (清除定时器、解绑事件)
- **函数组件：** **`useEffect`** **的返回函数 (Cleanup)**。

## 2. React Fiber

> Fiber就是将React 渲染变成“可中断恢复、可插队”的异步任务，解决老版 React 渲染阻塞（同步且不可中断）的问题

**Fiber** 是 React 16 引入的全新架构，旨在**解决 V15 在处理大型组件树时产生的卡顿问题**，将 React 的核心算法从**同步递归**演变为**异步可中断的并发调度**

Fiber 的设计目标是提高 React 的并发性和响应性，通过**时间分片**，优化复杂组件树的渲染性能

### 核心思想：可中断的异步渲染

Fiber 引入了“**时间分片**（Time Slicing）”的概念：

核心目标是：**将耗时较长的** **JS** **计算任务拆分成多个微小的片段，分布在浏览器每一帧的空闲时间内执行**

- **任务拆分**：将大的更新任务拆解为许多微小的“工作单元”
- **优先级调度**：浏览器在每一帧的空闲时间（`requestIdleCallback`）执行这些单元
- **可中断与恢复**：如果此时有高优先级的任务（如用户点击、输入），React 会暂停渲染，优先响应用户，等浏览器空闲后再恢复执行

### 双缓存技术

- **current 树**：当前屏幕上显示的树
- **workInProgress 树**：正在内存中构建的树

当 `workInProgress` 树在后台构建并比对完成后，React 只需简单地交换一下指针，新的树就变成了 `current` 树，瞬间完成替换

### 时间分片

**时间分片 (Time Slicing)** 是 React Fiber 架构中最核心的“调度策略”。它的本质是：**将一个耗时极长的同步任务，拆分为多个耗时极短的小任务，并在每一个小任务执行完后，把主线程的控制权交还给浏览器**

**核心原理**

React 的 `Scheduler`（调度器）默认将一个时间片（Time Slice）定义为 **5ms**

1. **开始任务**：React 开始深度优先遍历 Fiber 树。
2. **检查时间**：每处理完一个 Fiber 节点，React 都会通过 `shouldYield()` 函数检查：**“从开始到现在，是否已经过去了 5ms？”**
3. **中断与让出 (Yield)**：

- 如果时间没到，继续处理下一个 Fiber 节点
- 如果时间到了，React 立即**停止遍历**，保存当前进度的指针，并调用 `MessageChannel` 发送一个宏任务

**浏览器执行**：此时当前 JavaScript 执行栈清空，浏览器可以利用这个空档进行 **Layout（布局）**、**Paint（绘制）** 或响应用户输入

**恢复执行**：由于 `MessageChannel` 产生的宏任务进入了队列，浏览器忙完后会执行它，React 重新回到刚才保存的指针处，继续下一个 5ms 的工

### 为什么需要Fiber？

在React 16之前的版本中，是使用递归的方式处理组件树更新，称为**堆栈调和（Stack Reconciliation）**，这种方法一旦开始就不能中断，直到整个组件树都被遍历完。这种机制在处理大量数据或复杂视图时可能导致主线程被阻塞，从而使应用无法及时响应用户的输入或其他高优先级任务

### 为什么可以中断？

1. **结构基础：从“树”到“链表”：**

在旧版 React 中，协调（Reconciliation）是基于 **递归** 的，Fiber把组件树转换成了一个**虚拟的单链表结构，**React 只需要用一个全局变量（如 `nextUnitOfWork`）记录下当前处理到了哪个节点

2. **执行机制：从“死循环”到“可循环”：**

Fiber 的执行核心是一个 `while` 循环，而不是递归函数

3. **协作式调度**

## 3. React 高阶组件（HOC）

> **HOC** **是一个函数，它接收一个组件并返回一个新组件**

### 为什么要用 HOC？

1. **逻辑复用**：比如多个页面都需要判断用户是否登录、是否拥有权限
2. **属性代理（Props Proxy）**：向被包裹的组件注入额外的 props（如：主题颜色、用户信息、多语言配置）
3. **渲染劫持**：根据条件决定是否渲染组件，或者在渲染前后包裹一些额外的 UI（如：加载动画）

## 4. 哪些变化会触发函数的重新渲染？如何避免

| 触发因素 | 描述                 | 优化/阻断方式          |
| -------- | -------------------- | ---------------------- |
| State    | 组件内部状态改变     | Object.is 相同值跳过   |
| Props    | 父组件传递的属性改变 | React.memo (浅比较)    |
| Parent   | 父组件自身发生重渲染 | React.memo             |
| Context  | 订阅的上下文值改变   | 拆分 Context / useMemo |

## 5. 常用hooks

1. 基础逻辑 Hooks
   1. `useState`：状态管理
   2. `useEffect`：处理副作用
   3. `useRef`：访问 DOM 与持久化数据
2. 性能优化 Hooks
   1. `useMemo`：缓存计算结果
   2. `useCallback`：缓存函数引用
   3. `useContext`：跨组件传递数据

## 6. useEffect

### 6.1. useEffect使用

`useEffect` 主要用于处理**副作用（Side Effects）**

通俗点说：只要是**不直接参与** **UI** **渲染**的任务（如请求数据、操作 DOM、定时器、监听事件），都应该放在 `useEffect` 里

> `useEffect` 的核心是**同步外部系统**。它通过依赖数组来模拟生命周期：空数组对应挂载，有变量对应更新。最需要注意的是 **清理函数**，是防止内存泄漏的关键

**基本语法结构**

`useEffect` 接收两个参数：

1. **回调函数**：包含你要执行的副作用逻辑
2. **依赖数组（可选）**：决定什么时候重新执行这个回调

```JavaScript
useEffect(() => {
  // 1. 这里执行副作用逻辑 (如: console.log, API 请求)
  
  return () => {
    // 2. [可选] 清理函数 (如: 清除定时器、取消订阅)
  };
}, [/* 3. 依赖项 */]);
```

### 6.2. useEffect闭包陷阱

由于 Hook 的闭包特性，`useEffect` 内部的函数“捕捉”到了某一时刻的变量快照，而没有获取到最新的值

假设我们要实现一个每秒自动加 1 的计数器：

```JavaScript
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // 这里的 count 永远是 0
      console.log('Current count:', count);
      setCount(count + 1); 
    }, 1000);

    return () => clearInterval(timer);
  }, []); // 依赖项为空数组
  return <h1>{count}</h1>;
}
```

**结果：** 屏幕上的数字从 0 变成 1 后，就再也不动了。控制台会一直打印 `Current count: 0`

**原因分析：**

1. `useEffect` 在组件首次挂载时执行
2. 此时内部的匿名函数（闭包）捕获了当时的 `count` 变量，其值为 `0`
3. 虽然 `setCount` 触发了重新渲染，但由于依赖项是 `[]`，`useEffect` 不会重新执行
4. `setInterval` 里的回调函数依然指向第一次渲染时的闭包，它看到的 `count` 始终是 

#### 解决方案

1. **添加依赖项**

将 `count` 放入依赖数组。每次 `count` 变化，`useEffect` 都会销毁旧的定时器并重新开启

```JavaScript
useEffect(() => {
  const timer = setInterval(() => {
    setCount(count + 1);
  }, 1000);
  return () => clearInterval(timer);
}, [count]); // 依赖 count
```

- **缺点**：会导致定时器频繁销毁和重建。如果内部逻辑很重（如 WebSocket 连接），频繁重建会有性能开销

2. **函数式更新 (推荐)**

`setCount` 接受一个回调函数，参数是**最新的状态值**。这种方式不依赖外部闭包

```JavaScript
useEffect(() => {
  const timer = setInterval(() => {
    // prevCount 永远是实时的，不依赖闭包里的 count 快照
    setCount(prevCount => prevCount + 1);
  }, 1000);
  return () => clearInterval(timer);
}, []); // 依赖项依然可以是 []
```

3. **使用 `useRef`**

`useRef` 返回的是一个可变的引用对象，其 `.current` 属性指向同一个内存地址，不受组件重绘快照的影响。

```JavaScript
const countRef = useRef(0);
countRef.current = count; // 每次渲染同步更新 ref

useEffect(() => {
  const timer = setInterval(() => {
    console.log(countRef.current); // 永远能拿到最新的值
  }, 1000);
  return () => clearInterval(timer);
}, []);
```

## 7. useEffect 与 useLayoutEffect

| 特性     | useEffect                           | useLayoutEffect                    |
| -------- | ----------------------------------- | ---------------------------------- |
| 执行时机 | 屏幕渲染后                          | 屏幕渲染前                         |
| 阻塞渲染 | 不会（异步）                        | 会（同步）                         |
| 优先场景 | 绝大多数场景（API请求、订阅、日志） | 涉及 DOM 测量 或 修改 DOM 避免闪烁 |
| 性能影响 | 较小，不阻塞 UI 响应                | 较大，逻辑过重会导致页面卡顿       |

### 什么时候必须用 `useLayoutEffect`

**需要根据** **DOM** **的物理尺寸（宽高、位置）来更新状态**

**场景：防止视觉闪烁**

假设你要给一个元素设置随机颜色，但必须根据它渲染后的实际宽度来决定。

- **使用** **`useEffect`**：
  - 浏览器绘制了初始颜色的 DOM。
  - `useEffect` 异步执行，计算宽度，修改颜色。
  - 浏览器重新绘制新颜色。
  - **结果**：用户会看到颜色跳了一下（闪烁）。
- **使用** **`useLayoutEffect`**：
  - React 更新 DOM。
  - `useLayoutEffect` 同步执行，计算宽度，修改颜色。
  - 浏览器接收到最终的颜色指令，进行**唯一一次**绘制。
  - **结果**：用户直接看到最终颜色，没有闪烁

## 8. useState与useRef区别

| 特性     | useState                             | useRef                                     |
| -------- | ------------------------------------ | ------------------------------------------ |
| 触发渲染 | 会触发组件重新渲染                   | 不会触发组件重新渲染                       |
| 存储内容 | 组件的状态（如输入框内容、列表数据） | 组件的引用/持久化数据（如 DOM、定时器 ID） |
| 访问方式 | 直接读取变量（如 count）             | 通过 .current 属性读取（如 ref.current）   |
| 更新方式 | 异步（通过 setCount）                | 同步（直接修改 ref.current = xxx）         |
| 主要用途 | 驱动 UI 变化的响应式数据             | 跨渲染周期保存数据，且不影响 UI            |

### 何时使用useRef

1. 访问 DOM 元素：让某个输入框自动获得焦点 (focus)、测量 DOM 的尺寸或滚动位置
2. 存储“跨渲染周期”的变量（不触发重绘）：定时器 ID、上一次的 Props、防抖变量
3. 动画和滚动位置

## 9. useCallback和useMemo区别

| 钩子        | 缓存的对象          | 返回值             | 常见用途                                                     |
| ----------- | ------------------- | ------------------ | :----------------------------------------------------------- |
| useMemo     | 计算结果 (Value)    | 函数执行后的返回值 | 避免复杂的数学计算、过滤大型数组、生成配置对象               |
| useCallback | 函数本身 (Function) | 函数定义本身       | 保持函数引用一致，防止子组件因为 props 中的函数改变而重新渲染 |

## 10.React.memo与useMemo的区别

**React.memo：**

`React.memo` 是一个**高阶组件 (HOC)，**包裹一个组件，用来防止该组件在 Props 没有变化的情况下进行不必要的重渲染

- **触发时机**：当父组件重渲染时，React 会对比传给子组件的 Props。如果 Props 没变，子组件就不会重新执行
- **对比机制**：默认进行 **浅比较，**若传递**对象或数组**，需结合 `useMemo`

**useMemo：**

`useMemo` 是一个 **Hook**。它在组件内部使用，用来缓存一个复杂的计算结果

**触发时机**：仅当依赖项数组中的值发生变化时，才会重新计算

| API         | 作用                                                         |
| ----------- | ------------------------------------------------------------ |
| React.memo  | 缓存组件：当父组件重新渲染时，若子组件的 props 未变化，阻止子组件重新渲染 |
| useMemo     | 缓存计算结果：当依赖项未变化时，避免重复执行复杂计算（如过滤列表、复杂对象处理） |
| useCallback | 缓存函数引用：当依赖项未变化时，返回同一个函数实例，避免子组件因函数引用变化而重新渲染 |

## 11. React的hooks原理

**利用闭包和链表数据结构，将状态持久化在组件对应的 Fiber 节点上**

Hooks 依赖于 React 的 Fiber 架构。每个函数组件对应一个 Fiber 节点，Hooks 的状态和副作用通过 Fiber 的 `memoizedState` 属性存储和管理。

**Fiber 节点结构**

```JavaScript
const fiber = {
  tag: FunctionComponent,      // 函数组件类型
  type: Counter,               // 组件函数
  memoizedState: null,         // Hooks 状态链表
  updateQueue: null,           // 更新队列
  child: null,                 // 子 Fiber
  sibling: null,               // 兄弟 Fiber
  return: null                 // 父 Fiber
};
```

- `memoizedState`：保存 Hooks 的状态，以链表形式存储
- **调用顺序**：React 通过 Hooks 的调用顺序定位每个 Hook 的状态

### 为什么 Hook 顺序不能变？

react 并不通过变量名来识别 Hook，而是靠执行顺序

**Hooks** **的工作流程**

1. 初次渲染（Mount）：依次创建 Hook 对象，并按顺序串成链表并将其绑定到 Fiber
2. 更新阶段（Update）：根据调用顺序复用之前的 Hooks 状态，处理更新逻辑

> 这就是为什么必须在组件的顶层调用 Hooks，并且不能在循环、条件或嵌套函数中调用 Hooks

## 12. Reconciler（协调器）

在 React 中，Reconciler**（协调器）**的核心任务是负责 **Diff 算法**，决定在状态更新时，哪些 DOM 节点需要被创建、修改或删除

> 简单来说，Reconciler 就是在 **Virtual DOM（虚拟 DOM）** 和 **Renderer（渲染器，如 ReactDOM）** 之间的桥梁 

### Reconciler 的演进：从 Stack 到 Fiber

#### 早期：Stack Reconciler (React 15 及以前)

- **工作方式**：递归。一旦开始更新，它会同步地遍历整个组件树
- **问题**：由于 JavaScript 是单线程的，如果组件树非常大，递归更新会长时间占用主线程。这会导致浏览器无法处理用户输入或动画，造成**掉帧（卡顿）**

#### 现状：Fiber Reconciler (React 16+)

- **工作方式**：循环 + 可中断。它将更新任务拆解成许多微小的“工作单元”（即 **Fiber 节点**）
- **核心能力**：
  - **可中断**：如果浏览器有更高优先级的任务（如点击事件），React 可以暂停当前的计算
  - **优先级控制**：不同的更新（如动画 vs 数据落地）有不同的优先级

### 如何遍历fiber树

为了避免递归带来的调用栈溢出风险，React 采用了**深度优先搜索（DFS）**的迭代实现，通过 Fiber 节点间的三个指针（**`return`、`child`、`sibling`）**构建了一个**双向链表结构**

## 13. React 调度

| 方案           | 结果                                    | 结论       |
| -------------- | --------------------------------------- | ---------- |
| setTimeout(0)  | 强制 4ms 延迟，浪费帧时间               | 舍弃       |
| Promise.then   | 属于微任务，会阻塞渲染直到清空          | 舍弃       |
| rAF            | 执行时机在渲染前，控制权不在 React 手里 | 不适合调度 |
| MessageChannel | 宏任务、极低延迟、不阻塞渲染            | 最终选择   |

## 14. 虚拟 DOM (VDOM)

### 本质是什么？

虚拟 DOM 本质上是一个 **轻量级的** **JavaScript** **对象**。它用 `tag`、`props` 和 `children` 等属性来描述真实 DOM 的结构（用 JavaScript 对象来描述真实 DOM 结构），通过事务处理机制，**将多次DOM修改的结果一次性的更新到页面上**，从而有效的减少页面渲染的次数，**减少修改DOM的重绘重排次数**，提高渲染性能

### 虚拟 DOM 的工作原理

**第一步：创建（Render）**

当组件第一次渲染（Mount）时，React 会执行 `render` 函数（或函数组件体），生成一棵 **虚拟** **DOM** **树**

**本质**：把你的 JSX 代码转换成一个普通的 JS 对象

- **真实DOM**： 包含成百上千个属性（`onclick`, `style`, `offsetWidth` 等），非常沉重
- **虚拟DOM**： 只记录必要的属性（`type`, `props`, `children`），非常轻量

**第二步：比对（Diffing）**

当状态（State）改变时，React 会生成一棵**新的虚拟** **DOM** **树**。然后它会将“新树”与“旧树”进行对比，找出真正发生变化的地方

- **深度优先遍历**：React 会从根节点开始，采用深度优先遍历的方式比对两棵树
- **生成** **Patch** **对象**：比对过程中，如果发现节点属性变了、节点删除了或位置换了，就会把这些差异记录在一个 **Patch（补丁）对象** 中

> **Diff 算法** 能以 O(n) 的复杂度算出差异，而不是传统算法的 O(n^3)

**第三步：更新（Patching）**

React 只会将计算出的**差异点**（Patch）应用到真实的 DOM 上

- **例子：** 如果你只是改了列表里的一个文字，React 只会更新那一个 `<span>` 的 `innerText`，而不会重排整个列表

### VDOM 一定比原生 DOM 快吗？

**不一定**

- 如果你只需要修改一个按钮的颜色，直接用 `document.getElementById(...).style` 绝对比 React 走一遍 VDOM 流程要快
- 虚拟 DOM 的真正价值在于：**在处理大规模、复杂的数据更新时，它能提供一个“足够好”的性能保底**

## 15. React中的Diff算法

diff 算法主要基于三大策略：

1. **分层求异 (Tree Diff)：同级节点对比**

   ​	React 只会对**同级节点**进行比对

   - 如果一个 DOM 节点在一次更新中跨越了层级（比如从 `<div>` 搬到了 `<span>` 里面），React 不会尝试移动它，而是直接**销毁旧的，创建新的**

2. **同类识别 (Component Diff)：类型对比**

   - 如果两个组件的**类型相同**（比如都是 `<UserProfile />`），则继续递归比对它们的子节点

   - 如果**类型不同**（比如从 `<Header />` 变成了 `<Nav />`），React 会判定它们是完全不同的子树，直接销毁原组件及其所有子节点，并挂载新组件

3. **唯一标识 (Element Diff & Key)：Key对比**

​		当同级有一堆类似的节点（如列表）时，React 通过 `key` 来判断哪些节点是稳定的，哪些是新来的

## 16. React响应式原理

> **状态变化触发组件重新执行 → 生成新虚拟 DOM → Diff 算法找出最小差异 → 批量更新真实 DOM → 执行副作用**

React 的响应式原理可分为：**触发（Trigger） -> 渲染（Render） -> 协调（Reconciliation） -> 提交（Commit）** 四个阶段

**触发阶段：从 `setState` 开始**

- 当你调用 `setCount(count + 1)` 时，你并不是修改了内存里的一个变量，而是触发了一次**重新执行组件函数**的请求，React 会把这些请求收集起来，存放在组件对应的 **Fiber 节点** 的更新队列中

**渲染阶段：生成虚拟 DOM 快照**

一旦触发更新，React 会重新运行你的函数组件

- 构建虚拟 DOM (VDOM)

**协调阶段：Diff 算法**

React 拥有两棵树：**Current Tree**（当前屏幕上的） 和 **WorkInProgress Tree（内存中新生成的）**。

- **Diffing**：React 对比这两棵树，找出差异
- **三个假设（优化核心）**：
  - **Tree** **Diff**：对**同级节点**进行比对
  - **Component Diff**：组件类型变了，直接销毁重建
  - **Element Diff**：通过 `key` 属性识别列表中的元素，避免无谓的删除和新建

**提交阶段：**

1. 计算出差异后，React 进入 Commit 阶段

2. **同步更新**：React 会一次性把所有的差异（Patch）应用到真实 DOM 上
3. **副作用执行**：在 DOM 更新完成后，React 会执行 `useEffect` 等钩子函数

## 17. React SSR

**SSR** **(Server-Side Rendering)**，即**服务端渲染**

### 为什么需要 SSR？

1. **SEO（搜索引擎优化）太差**：搜索引擎的爬虫（像百度、旧版 Google）来到你的网站，只看到一个 `<div id="root"></div>`。它等不及 JS 执行完就走了，导致你的网站搜不到
2. **首屏加载慢（白屏时间长）**：用户必须等 JS 加载完、执行完、发请求拿回数据，才能看到内容。在网速慢的手机上，用户会盯着白屏好几秒

### SSR 的工作流程

SSR 的本质是“**分两步走**”：

1. **服务端生成** **HTML**： 用户请求 URL，服务器运行 React 代码，将组件转换成静态 HTML 字符串（使用 `renderToString`）。用户**瞬间**就能看到完整的网页内容（虽然此时还不能点）
2. **客户端激活 (Hydration)**： 浏览器下载 JS 文件并运行。React 会认领服务器传来的 HTML，把事件监听器（如 `onClick`）重新绑定上去。这个过程叫 **“水合” (Hydration)**

### SSR 对比 CSR 

| 特性         | 客户端渲染 (CSR)         | 服务端渲染 (SSR)                |
| ------------ | ------------------------ | ------------------------------- |
| 首屏可见速度 | 慢（需等 JS 下载执行）   | 快（直接显示 HTML）             |
| SEO 友好度   | 差                       | 极好                            |
| 服务器压力   | 小（服务器只发静态文件） | 大（服务器每次都要计算渲染）    |
| 开发复杂度   | 低                       | 高（需处理 Node.js 环境兼容性） |

## 18. 什么是水合（Hydration）

水合是指客户端渲染时，React 会尝试重用服务端渲染生成的 HTML 结构，然后在其上进行事件绑定和状态恢复

简单来说：

1. 服务器先渲染出 HTML 页面（SSR）
2. 客户端（浏览器）加载 React 脚本
3. React 对已有的 HTML 进行水合（Hydration），让页面变得可交互

### 什么是水合错误？

通常，这种问题是由于在客户端与服务端之间的组件渲染结果不一致所引起的，可能的原因包括：

1. 在客户端和服务端渲染时，组件的状态或属性发生了变化，导致生成不同的 HTML 结构
2. 在客户端渲染时，组件的 DOM 结构被修改或重置，与服务器端渲染的 DOM 结构不匹配

#### 常见原因

1. **依赖于浏览器** **API** **的代码**：在服务器上不可用的 API（如 `window`、`document`）
2. **依赖于时间的代码**：如 `new Date()`、`Math.random()`
3. **条件渲染**：基于客户端特定条件的渲染逻辑

## 19. React通信方式

### 19.1. 父子组件通信

- **父传子(Props)：**父组件通过属性将数据传递给子组件

```JavaScript
const Child = ({ name }) => <p>项目名称：{name}</p>;

const Parent = () => <Child name="React Pro" />;
```

- **子传父(回调函数)：**父组件通过 `props` 传递一个函数给子组件，子组件通过调用该函数并传入参数，实现数据的“逆流”

```JavaScript
const Child = ({ onShowMsg }) => (
  <button onClick={() => onShowMsg('来自子的问候')}>点击汇报</button>
);

const Parent = () => {
  const handleMsg = (msg) => console.log(msg);
  return <Child onShowMsg={handleMsg} />;
};
```

### 19.2. 跨级组件通信 (Context API)

- Provider：发布数据
- Consumer / useContext：订阅数据

示例：

```JavaScript
import React, { createContext, useContext } from 'react';

const ConfigContext = createContext();

const DeepGrandChild = () => {
  // 使用 useContext 直接获取，无需 Consumer 包裹
  const config = useContext(ConfigContext);
  return <div>配置项：{config.theme}</div>;
};

const App = () => (
  <ConfigContext.Provider value={{ theme: 'Dark' }}>
    <IntermediateComponent />
  </ConfigContext.Provider>
);
```

### 19.3. 兄弟组件通信

- **状态提升**：将共享状态移动到它们共同的父组件中

### 20. 类组件与函数组件的区别

| 特性     | 类组件 (Class)                            | 函数组件 (Function)        |
| -------- | ----------------------------------------- | -------------------------- |
| 逻辑复用 | 使用 HOC (高阶组件) 或 Render Props       | 使用 Custom Hooks (更简洁) |
| 状态管理 | this.state / this.setState                | useState Hook              |
| 生命周期 | 具体的生命周期钩子 (如 componentDidMount) | useEffect 统一处理副作用   |
| 性能     | 实例化开销略大                            | 轻量，闭包机制             |

1.  `this` 绑定问题：

类组件需要频繁地使用 `.bind(this)` 或者箭头函数来确保 `this` 指向正确。而函数组件完全没有 `this` 的概念，数据通过作用域直接获取

2. 生命周期方法

类组件有明确的生命周期方法，函数组件通过 `useEffect()` Hook 来替代生命周期方法

## 21. React各个版本新特性

### 21.1. React 16

1. **Fiber架构：**React 16引入了全新的Fiber架构，这是其最核心的变化之一。Fiber将渲染过程拆分为多个可中断的小任务，避免了长时间占用主线程，从而提高了应用的响应性和性能
2. **错误边界（Error Boundaries）：**允许开发者捕获组件树中的JavaScript错误，防止整个应用崩溃。
3. **Portals：**允许将子节点渲染到存在于父组件之外的DOM节点上
4. **Hooks**（16.8）：**使函数组件能够使用状态和其他React特性**，包括useState、useEffect、useContext等，极大简化了组件逻辑复用和代码组织
5. **Fragments：**允许组件返回多个子元素而无需添加额外的DOM节点
6. **React.memo：**用于函数组件的性能优化，通过浅比较props来避免不必要的重渲染
7. **React.lazy和Suspense（16.6）：**实现了代码分割和组件的动态导入，减少了初始bundle大小1

### 21.2. React 17

1. **自动批处理（Automatic Batching）**：这意味着所有的生命周期方法和状态更新都会被批处理，这可以减少不必要的渲染次数，提高性能
2. **函数组件支持Context：**这使得函数组件能够像类组件一样使用Context
3. **增强的事件处理：**使得事件处理更加稳定和可靠
4. **新的并发模式：**使得React能够更好地处理大量数据和复杂的状态
5. **性能优化：**包括减少不必要的渲染和提升组件的初始化速度
6. **事件委托变更：**React 17将事件监听从document迁移到React应用的根容器，提升了多React版本共存的兼容性
7. **逐步升级支持：**React 17支持同一页面中运行多个React版本，为渐进式升级提供了可能

### 21.3. React 18

1. **并发渲染（Concurrent Rendering）**：React 18最引人注目的特性之一是并发渲染。并发渲染允许React在渲染过程中中断和恢复，从而提高应用的响应性和性能
2. **自动批处理（Automatic Batching）**：在React 18中，自动批处理得到了扩展，几乎所有状态更新（包括useState、useReducer和useContext）都会被自动批处理
3. **新的根API（createRoot）**：React 18引入了一个新的根API **createRoot**，用于替代ReactDOM.render。使用createRoot可以**启用并发特性**
4. **新的钩子（useId、useDeferredValue、useTransition）**：React 18引入了useId、useDeferredValue和useTransition等新的钩子，为开发者提供了更多灵活性
5. **性能优化和底层改进：**React 18采用了新的渲染引擎React Reconciler，提升了性能和可扩展性
6. **Suspense增强：**React 18增强了Suspense的功能，支持服务端Suspense和SuspenseList，更好地控制多个Suspense组件的加载顺序
7. **流式服务端渲染（Streaming SSR**）**：React 18引入了renderToPipeableStream**，支持服务端流式渲染，提升首屏加载性能
8. **useSyncExternalStore：**供第三方状态管理库在并发渲染下安全地读取外部存储。
9. **useInsertionEffect：**专为CSS-in-JS库设计，用于在DOM插入前注入样式

### 21.4. React 19

1. **React Compiler：**React 19引入了React Compiler，这是其最核心的变化之一。编译器在构建时**自动优化组件重渲染**，开发者不再需要手动使用useMemo、useCallback和React.memo，显著降低了性能优化的心智负担
2. **Actions：**React 19引入了Actions，这是一套统一的异步操作处理模式。**通过useActionState管理异步状态（pending、成功、失败）**，useFormStatus在子组件中获取表单提交状态，useOptimistic实现乐观更新，提升用户体验
3. **服务端组件（RSC）稳定**：React 19将Server Components提升为一等公民，配套完善了数据获取API（cache、cacheSignal），增强了流式SSR支持
4. **Activity组件：**React 19引入了Activity组件，**支持隐藏时保留组件状态**，类似keep-alive功能，**适用于Tab切换、路由缓存等场景**
5. **use API：**允许在组件中直接读取Promise或Context，无需useEffect和useState，简化了数据消费逻辑
6. **文档元数据管理：**React 19支持在组件内直接写入title、meta等文档元数据标签，React会自动将其提升到head中，并完整支持SSR
7. **useEffectEvent：**React 19引入了useEffectEvent，允许从Effect中提取非响应式逻辑，避免Effect因依赖变化而重新执行
8. **支持Web Components：**React 19增强了对Web Components的兼容性，能够更好地与自定义元素协作
9. **性能工具增强：**React 19在React DevTools中新增了性能面板，支持追踪组件渲染耗时和并发调度细节，同时引入Owner Stack在开发模式下显示组件所有者堆栈