---
title: React入门
date: 2024-08-18 22:38:04
description: 笔记
tags:
 - React
---

[toc]

## 1、React 简介

### 什么是 React

React用于构建用户界面的JS库。是一个将数据渲染为HTML视图的开源JS库。

### React 的特点

1. 声明式编码
2. 组件化编码
3. React Native 编写原生应用
4. 高效（优秀的Diffing算法）
5. JSX 语法
6. 单向数据绑定
7. 虚拟 DOM
8. Component

### React 官网

1. [英文官网: https://reactjs.org/](https://reactjs.org/)
2. [中文官网: https://react.docschina.org/](https://react.docschina.org/)

### 相关文章

1. [React 入门（超详细）_react入门-CSDN博客](https://blog.csdn.net/weixin_62897746/article/details/129696913?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-0-129696913-blog-119103615.235^v43^pc_blog_bottom_relevance_base5&spm=1001.2101.3001.4242.1&utm_relevant_index=3)
2. [React 教程 | 菜鸟教程 (runoob.com)](https://www.runoob.com/react/react-tutorial.html)

## 2、使用 create-react-app 快速构建 React 开发环境

> ```
> npx create-react-app my-app
> pnpm create vite my-app --template
> ```

**项目的目录结构如下：**

```
my-first-react-app/
├── node_modules/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
├── .gitignore
├── package.json
├── README.md
└── yarn.lock (或 package-lock.json)
```

### 目录和文件说明

**node_modules/**

存放所有项目的依赖包。这个目录由 npm 或 yarn 自动生成，包含了项目运行所需的所有第三方库和模块。

**public/**

存放静态文件，Webpack 不会对这个目录中的文件进行处理。`public` 目录下的文件会被直接复制到构建目录。

- `favicon.ico`：浏览器标签页上的小图标。
- `index.html`：HTML 模板文件，React 组件将被挂载到这个文件中的 `div` 元素中。
- `logo192.png` 和 `logo512.png`：不同尺寸的 React logo 图标。
- `manifest.json`：Web 应用清单文件，用于定义应用的名称、图标等元数据。
- `robots.txt`：用于告诉搜索引擎哪些页面可以被抓取。

**src/**

存放应用的源代码。这里是你主要进行开发的地方。

- `App.css`：`App` 组件的样式文件。
- `App.js`：主组件文件，定义了一个基础的 React 组件。
- `App.test.js`：`App` 组件的测试文件。
- `index.css`：全局样式文件。
- `index.js`：应用的入口文件，负责渲染 React 组件到 DOM 中。
- `logo.svg`：React logo 的 SVG 文件。
- `reportWebVitals.js`：用于性能监测的文件，可以帮助你了解和分析应用的性能。
- `setupTests.js`：用于设置测试环境的文件。

**.gitignore**

列出 Git 应该忽略的文件和目录，例如 `node_modules/` 和构建输出的目录。

**package.json**

项目的配置文件，包含项目信息、脚本、依赖项等。

**README.md**

项目的自述文件，包含项目的基本信息和使用说明。

`yarn.lock` **或 `package-lock.json`**

**src/index.js 是一个入口文件，我们可以尝试直接修改 src/index.js 文件代码：**

```react
import React from 'react';
import ReactDOM from 'react-dom';

function Hello(props) {
  return <h1>Hello {props.name}!</h1>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
// 渲染 Hello 组件，并传递 name 属性
root.render(<Hello name="World" />);
```

## 3、JSX

**概念**：jsx是javaScript和XML(HTML)的缩写，表示在js代码中编写html模板结构，它是react中编写UI模板的方式

```jsx
const message = 'this is App'
function App(){
    return {
        <div className="App">
            <h1>this is h1</h1>
            {message}
        <div>
    }
}
```

**本质**：JSX并不是标准的js语法，它是js的语法扩展，浏览器本身不能识别，需要通过解析工具做解析之后才能在浏览器中运行

**JSX中使用JS表达式**
在JSX中可以通过 大括号语法{} 识别JavaScript中的表达式，比如常见的变量、函数调用、方法调用等等

使用引号传递字符串
使用JavaScript变量
函数调用和方法调用
使用JavaScript对象
注意：if语句、switch语句、变量声明属于语句，不是表达式，不能出现在{}中

```jsx
const count = 100

const getName = () => {
  return 'Bob'
}
function App() {
  return (
    <div className="App">
      {/* 使用引号传递字符串 */}
      { '这是一个字符串' }
      {/* 使用JavaScript变量 */}
      { count }
      {/* 函数调用 */}
      { getName() }
      {/* 方法调用 */}
      { new Date().getDate() }
      {/* 使用JavaScript对象 */}
      <div style={ {color:'red',fontSize:'30px'} }>this is div</div>
    </div>
  );
}

export default App;
```

### JSX中实现列表渲染

**语法**：在JSX中可以使用原生JS中的map方法遍历渲染列表

1. 循环哪个结构在map中就return哪个结构
2. 结构上需要加上key字段，可以是字符串、number类型
3. key的作用：React框架内部使用，提升更新性能

```jsx
const list = [
  {id:1,name:'Vue'},
  {id:2,name:'React'},
  {id:3,name:'Angle'}
]
function App() {
  return (
    <div className="App">
      {/* 渲染列表 */}
      <ul>
        {list.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  );
}

export default App;
```

### JSX实现条件渲染

语法：在React中，可以通过逻辑与运算符&&、三元里表达式（?:）实现基础的条件渲染
``{flag && <span>this is span</span>}``：当flag为false时，不显示；当flag为true时，显示标签
``{loading ? <span>loading...</span> : <span>this is span</span>}``：当loading为true时显示第一个标签；当loading为false时显示第二个标签

```jsx
const isLogin = true
function App() {
  return (
    <div className="App">
     {/* 条件渲染 */}
     {/* 逻辑与 && */}
     {isLogin && <div>未登录</div>}
     {/* 三元运算符 */}
     {isLogin ? <div>已登录（jack）</div> : <div>用户未登录</div>}
    </div>
  );
}

export default App;
```

## 4、事件绑定

### 基础事件绑定

**语法**：on+事件名称={事件处理程序}，整体上遵循驼峰命名法

```jsx
function App() {
  const handleClick = () => {
    console.log('BUTTON被点击了')
  }
  return (
    <div className="App">
      {/* 基础事件绑定 */}
      <button onClick={handleClick}>click事件</button>
    </div>
  );
}

export default App;
```

### 使用事件对象参数

**语法**：在事件回调函数中设置形参e

```jsx
function App() {
  const handleClick1 = (e) => {
    console.log('button被点击了',e)
  }
  return (
    <div className="App">
      {/* 使用事件对象参数e */}
      <button onClick={handleClick1}>click事件</button>
    </div>
  );
}

export default App;
```

### 同时传递事件对象和自定义参数

**语法**：在事件绑定的位置传递事件实参e和自定义参数，clickHandler中声明形参，注意顺序对应

```jsx
function App() {
  const handleClick3 = (name,e) => {
    console.log('button被点击了',name,e)
  }
  return (
    <div className="App">
      {/* 同时传递自定义参数和事件对象 */}
      <button onClick={(e) => handleClick('bob',e)}>click事件</button>
    </div>
  );
}

export default App;
```

## 5、React Hooks（函数）

### useState

> 1. useState是一个函数，返回值是一个数组
> 2. 数组中的第一个参数是状态变量，第二个参数时set函数用来修改状态变量
> 3. useState的参数将作为count的初始值

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

### useEffect

> 处理组件生命周期,例如数据获取、订阅、手动更改 DOM 等

`useEffect` 钩子接受两个参数：

1. **副作用函数（Effect Function）**： 这是第一个参数，一个执行副作用操作的函数。在这个函数内部，你可以执行诸如数据获取、订阅或手动更改React组件中的DOM等操作。这个函数的执行时机取决于你传递给 `useEffect` 的第二个参数，即依赖项数组。
   - 它应该返回一个 **清理函数**（cleanup），其 cleanup 代码 用来与该系统断开连接。

1. **依赖项数组（Dependencies Array）**（可选）： 这是第二个参数，一个数组，用于告诉React哪些值是副作用函数依赖的。这个数组中的值如果发生变化，React会重新执行副作用函数。如果不传递这个数组或者传递一个空数组，副作用函数只会在组件挂载和卸载时执行。

**React 在必要时会调用 setup 和 cleanup，这可能会发生多次**：

1. 将组件挂载到页面时，将运行 `setup` 代码。
2. 重新渲染依赖项变更的组件后：
   - 首先，使用旧的 props 和 state 运行 `cleanup` 代码。
   - 然后，使用新的 props 和 state 运行 `setup` 代码。
3. 当组件从页面卸载后，`cleanup` 代码 将运行最后一次。

**在开发环境下，React 在运行 setup 之前会额外运行一次setup 和 cleanup**。这是一个压力测试，用于验证 Effect 逻辑是否正确实现。

```jsx
import { useState, useEffect } from 'react';

function FetchData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/data');
      const data = await response.json();
      setData(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Fetched Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### useContext

> 跨组件传递数据,避免"prop drilling"

```jsx
import { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedButton />
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button style={{ backgroundColor: theme === 'dark' ? 'black' : 'white' }}>Theme Button</button>;
}
```

### useReducer

> 管理复杂的状态逻辑

```jsx
import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}
```

### useCallback

> 缓存函数引用,优化性能

```jsx
import { useState, useCallback } from 'react';

function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <ChildComponent onClick={handleClick} />
    </div>
  );
}

function ChildComponent({ onClick }) {
  console.log('ChildComponent rendered');
  return <button onClick={onClick}>Increment</button>;
}
```

### useMemo

> 缓存计算结果,优化性能

```jsx
import { useState, useMemo } from 'react';

function ExpensiveCalculation() {
  const [number, setNumber] = useState(0);

  const doubledNumber = useMemo(() => {
    return slowlyDoubleNumber(number);
  }, [number]);

  return (
    <div>
      <input type="number" value={number} onChange={(e) => setNumber(parseInt(e.target.value))} />
      <p>Doubled number: {doubledNumber}</p>
    </div>
  );
}

function slowlyDoubleNumber(n) {
  // 模拟一个耗时的计算
  let i = 0;
  while (i < 1000000000) i++;
  return n * 2;
}
```

### useRef

> 获取 DOM 元素引用,保存可变状态

```jsx
import { useRef } from 'react';

function FocusInput() {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}
```

### useLayoutEffect

> 处理 DOM 操作,需要同步执行

```jsx
import { useLayoutEffect, useRef } from 'react';

function MeasureElement() {
  const elementRef = useRef(null);

  useLayoutEffect(() => {
    const element = elementRef.current;
    console.log('Element width:', element.offsetWidth);
  }, []);

  return <div ref={elementRef}>This is the element to measure</div>;
}
```

### useImperativeHandle

暴露组件实例方法给父组件

```jsx
import { forwardRef, useImperativeHandle, useRef } from 'react';

const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));

  return <input type="text" ref={inputRef} />;
});

function App() {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <CustomInput ref={inputRef} />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}
```

### useDebugValue

> 为自定义 Hooks 提供调试标签

```jsx
import { useState, useDebugValue } from 'react';

function useCustomHook() {
  const [state, setState] = useState(0);
  useDebugValue(`Current state: ${state}`);
  // 自定义 Hook 的其他逻辑
  return [state, setState];
}
```

## 6、classnames优化类名控制

classnames是一个简单的JS库，可以非常方便的通过条件动态控制class类名显示

**安装**：`npm install classnames`

不使用classnames时，动态控制class类名：采用字符串拼接的方式：

```jsx
<span className={`tab ${item.type === type && 'active'}`}>bob</span>
```

使用classnames时，动态控制class类名：

```jsx
<span className={classNames('tab',{active: item.type === type})}>bob</span>
```

## 7、组件通信

### props

1. **props可传递数据类型：**

数字、字符串、布尔值、数组、对象、函数、JSX

1. **props是只读对象**

子组件只能读取props中的数据，不能直接进行修改，父组件的数据只能由父组件修改

示例：

```jsx
function Son(props){
  console.log(props)
  // props.age = 32  错误代码，TypeError: Cannot assign to read only property 'age' of object '#<Object>'
  return (
    <div>this is Son App，{props.name}</div>
  )
}

function App() {
  const name = 'this is App'
  return (
    <div className="App">
      <Son 
        name={name} 
        age={18} 
        isTrue={true} 
        list={['vue','react']} 
        obj={{name:'bob'}} 
        cb={() => console.log(123)} 
        child={<span>this is span child</span>}
      />
    </div>
  );
}

export default App;
```

### 特殊的prop - children

**场景**：当我们把内容嵌套在子组件标签中时，父组件会自动在名为children的prop属性中接收该内容

示例：

```jsx
function Son(props){
  // 2. 子组件通过props参数接收数据
  console.log(props)
  return (
    <div>this is Son App，{props.name}，{props.children}</div>
  )
}

function App() {
  const name = 'this is App'
  return (
    <div className="App">
      {/* 1. 在子组件标签上绑定属性 */}
      <Son name={name}>
        <span>this is span</span>
      </Son>
    </div>
  );
}

export default App;
```

### 父传子

1. 父组件传递数据 - 在子组件标签上绑定属性
2. 子组件接收数据 - 子组件通过props参数接收数据

```jsx
function Son(props){
  // 2. 子组件通过props参数接收数据
  return (
    <div>this is Son App，{props.name}</div>
  )
}

function App() {
  const name = 'this is App'
  return (
    <div className="App">
      {/* 1. 在子组件标签上绑定属性 */}
      <Son name={name}/>
    </div>
  );
}

export default App;
```

### 子传父

**实现核心**：在子组件中调用父组件中的函数并传递参数

示例：

```jsx
import { useState } from "react"

function Son(props){
  // 2. 子组件通过props参数接收数据
  const {onGetSonMsg,onGetSonName} = props
  console.log(props)

  const name = 'this is Son'
  const sonMsg = 'this is son msg'
  return (
    <div>
      this is Son
      <div>{props.name}</div>
      {/* 3. 触发父组件传递过来的函数，并传递参数 */}
      <button onClick={() => onGetSonMsg(sonMsg) }>点击</button>
      <button onClick={() => onGetSonName(name)}>点击2</button>
    </div>
  )
}

function App() {
  const [sonName,setSonName] = useState('')

  const name = 'this is App'
  const getSonMsg = (msg) => {
    // 4. 接收子组件传递的参数
    console.log(msg) // this is son msg
  }

  const getSonName = (sname) => {
    // 4. 接收子组件传递的参数
    setSonName(sname)
  }
  return (
    <div className="App">
      {/* 1. 在子组件标签上绑定属性 */}
      <Son name={name} onGetSonMsg={getSonMsg} onGetSonName={getSonName}/>
      <div>{sonName}</div>
    </div>
  );
}

export default App;
```

### 使用状态提升实现兄弟组件通信

**实现思路**：A(子组件) —> App(父组件) —> B(子组件)
**实现步骤**：

1. A组件先通过子传父的方式把数据传给父组件App
2. App拿到数据后通过父传子的方式再传递给B组件

```jsx
import { useState } from "react"

function A({onGetName}) {
  const aName = 'this is A'
  return (
    <div>
      this is A
      {/* 1.将数据传递父组件App */}
      <button onClick={() => onGetName(aName)}>send</button>
    </div>
  )
}

function B(props) {
  const {name} = props
  return (
    <div>
      this is B
      <div>{name}</div>
    </div>
  )
}

function App() {
  const [name,setName] = useState('')
  const getName = (aName) => {
    setName(aName)
  }
  return (
    <div className="App">
      <A onGetName={getName}/>
      {/* 2.将数据传递给子组件B */}
      <B name={name}/>
    </div>
  );
}

export default App;
```

### 使用Context机制跨层级组件通信
语法：createContext、useContext
实现步骤：

1. 使用createContext方法创建一个上下文对象Ctx
2. 在顶层组件（App）中通过Ctx.Provider组件提供数据
3. 在底层组件（B）中通过useContext钩子函数获取数据

```jsx
import { createContext,useContext } from "react"

// 1. 使用createContext创建一个上下文对象
const MsgContext = createContext()

function B() {
  // 3. 在底层组件中通过useContext钩子函数使用数据
  const msg = useContext(MsgContext)
  return (
    <div>
      this is B
      <div>{msg}</div>
    </div>
  )
}

function A() {
  return (
    <div>
      this is A
      <B/>
    </div>
  )
}

function App() {
  const msg = 'this is App msg'
  return (
    <div className="App">
      {/* 2. 在顶层组件中通过Provider组件提供数据 */}
      <MsgContext.Provider value={msg}>
        this is App
        <A/>
      </MsgContext.Provider>
    </div>
  );
}

export default App;
```

## 8、React-Router

[ React Router6 中文文档 ](https://baimingxuan.github.io/react-router6-doc/routers/router-provider)

> *# 安装react-router-dom* 
>
> `npm install react-router-dom`

### 路由模式

> React Router 支持两种路由模式：`BrowserRouter` 和 `HashHistory`。

1. BrowserRouter 模式使用 URL 中的/来定义路由，例如：http://xxx.com/about。

2. HashHistory 模式使用 URL 中的#来定义路由，例如：http://xxx.com/#/about。

   默认情况下，React Router 使用 BrowserRouter 作为其历史记录。
   **注意**：BrowserRouter组件最好放在最顶层所有组件之外，这样可以确保内部组件在使用 Link 做路由跳转时不会出现出错

### 路由组件

> 路由组件是用于处理路由的组件。在 React Router 中，路由组件通常用于显示不同的页面或视图。

#### 1. 创建路由组件

> 在项目`src`目录中创建一个`App.jsx`的文件，并在其中编写示例代码

```jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function Home() {
	return <div>Home</div>;
}

function About() {
	return <div>About</div>;
}
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
			</Routes>
		</BrowserRouter>
	);
}
```

#### 2. Route 组件

> `Route`组件用于定义路由规则。`Route`组件接收两个属性：`path`和`element`。`path`属性用于定义路由的路径，`element`属性用于定义路由对应的组件，`index`属性用于指定默认子路由

- 注意`element`属性值`必须`写成标签的形式
- Route组件可以嵌套使用，用于定义更复杂的路由规则。
  - `嵌套路由`可以不在向旧版一样提供完整的路径，因此新版本路径书写变短,但访问路径还是需要完整路径如`/about/joinus`

```jsx
<Route path="/about" element={<About />}>
	<Route index element={<Address />} />
	<Route path="address" element={<Address />}></Route>
	<Route path="joinus" element={<Join />}></Route>
</Route>
```

- 在新版中`Route`先后顺序不在重要，`Router Route`可以自动匹配正确的路径

- 使用`index`属性可以指定默认子路由

- 或通过 `path` 为空，来指定默认路由

```jsx
const router = [
	{
		path: '/home',
		element: <Home />,
		children: [
			{
				path: '',
				element: <News />,
			},
			{
				path: 'news',
				element: <About />,
			},
		],
	},
];
```

#### 3. Routes 组件

> `Routes`组件是之前版本种`Switch`组件的变名，用于将多个`Route`组件组合在一起。

#### 4. 导航组件 Link、NavLink

> `Link`和`NavLink`组件类似于 a 标签，用于创建路由链接。`Link`组件接收一个`to`属性，用于指定链接的地址，`NavLink`组件相似，区别是可以添加一些样式来区分当前页面。

##### 4.1 Link 组件

> `Link`组件用于创建路由链接，它有一个参数`to`, 它的值可以是字符串还可以是一个`location`对象。

1. 字符串形式

```jsx
<Link to="/about">关于我们</Link>
```

2. 对象形式

```jsx
<Link to={{ pathname: '/about', search: '?name=zhangsan' }} state={{ some: 'value' }}>
	关于我们
</Link>
```

##### 4.2 NavLink 组件

> `NavLink`组件是`Link`组件的变体，可以添加一些样式来区分当前页面。

1. 通过 style 的形式

```jsx
<NavLink
	to="/about"
	style={({ isActive }) => {
		return {
			color: isActive ? 'red' : '#000',
			fontWeight: 'bold',
		};
	}}
>
	首页
</NavLink>
```

2. 通过 css 的形式

```jsx
<NavLink
	to="/about"
	className={({ isActive }) => {
		return isActive ? 'active' : '';
	}}
>
	首页
</NavLink>
```

#### 5. Navigate 组件

> `Navigate`组件是对旧版本的 `Redirect` 的替代品。

```jsx
import { Navigate } from 'react-router-dom';
<Route path="/" element={<Navigate replace to="/home" />} />;
```

- 其中`replace`属性也可以省略，不过路由的行为由 replace 改为 `push`
- replace Vs push

- `replace` 替换当前 `history` 记录，没有历史记录
- `push` 添加新的 history 记录，可以`回退到上一页`

#### 6. Outlet 组件

> `Outlet`组件用于在路由被匹配时，渲染匹配到的路由组件。用于占位，告诉 React Router 嵌套的内容应该显示在哪里。

示例：

```jsx
export default function App() {
	return (
		<div className="container">
			<h2>关于我们</h2>
			<ul>
				<li>
					<Link to="/about/address">公司地址</Link>
				</li>
				<li>
					<Link to="/about/join">加入我们</Link>
				</li>
			</ul>
			<div className="boxs">
				<Outlet />
			</div>
		</div>
	);
}
```

### 声明式路由

#### 1. useRoutes 声明式的路由配置方式

> 在声明式路由中，不能写`index`, 但可以让 path: “” , 来实现显示默认组件;

```jsx
const MyRoutes = () => {
	return useRoutes([
		{
			path: '/',
			element: <Home />,
		},
		{
			path: '/home',
			element: <Home />,
		},
		{
			path: '/about',
			element: <About />,
			children: [
				{
					path: '',
					element: <Story />,
				},
				{
					path: 'address',
					element: <Address />,
				},
			],
		},
	]);
};
function App() {
	return (
		<div>
			<Router>
				<MyRoutes />
			</Router>
		</div>
	);
}
export default App;
```

### 编程式导航

> 编程式导航就是通过 JS 代码来控制路由的跳转，包括路由的跳转、路由的参数传递、路由的钩子函数等。

#### 1. 路由跳转`useNavigate`函数

> `useNavigate` 函数用于获取路由导航的函数，该函数可以接收一个参数，表示要跳转到的路由地址。同时新版本中移除了`useHistory` 函数。
>
> `params`传参方式，地址会如：/home/1。
> `search`传参方式，地址会如：/home?id=1。
> `state`传参方式，地址栏中不会显示

```jsx
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
navigate('/home'); // 默认是以push的形式跳转
```

##### 1.1 `push`的方式

**跳转到指定路由，并生成历史记录**

- 携带params参数

  > 路由设计格式为：`<Route path="about" element={<About/>} />`

```jsx
navigate(`/home/${id}`);
```

- 携带search参数

  > 路由设计格式为：`<Route path="about/:id/:keyword" element={<About/>} />`

```javascript
navigate(`/home/${id}/${keyword}`);
```

携带state参数
路由设计格式，以上两种方式都可以

1. 第一种

```jsx
navigate('/home', { state: { id: '1' } });
```

2. 第二种

```jsx
<NavLink
	to={`detail`}
	state={{
		id: 1,
	}}

>首页
></NavLink>
```

##### 1.2 `replace`方式

**跳转到指定路由，并替换当前历史记录**

- 携带params参数

```jsx
navigate(`/home/${id}`, { replace: true });
```

- 携带search参数

```jsx
navigate(`/home/${id}/${keyword}`, { replace: true });
```

- 携带state参数

```jsx
navigate('/home', { state: { id: '1' }, replace: true });
```

##### 1.3 返回上一页

使用`navigate(-1)`后退到前一页，`navigate(-2)`后退到前两页。

#### 2. 获取路由参数

> 通过`React Router`提供的函数，从而获取解析地址栏中的参数。
> **注意**：在最新版路由中组件不能直接从`props`中获取参数

##### 2.1 useParams 函数

> `useParams` 函数用于获取地址栏中的`params`参数，其路由地址参考为`localhost:3000/home/1`。

##### 2.2 useSearchParams 函数

> `useSearchParams` 函数用于获取地址栏中的`search`参数，其路由地址参考为`localhost:3000/home?id=1`。

其中返回的`searchParam`s函数，具有以下方法：

- `searchParams`：表示地址栏中的search参数，通过.get方法获取指定数据。
- `setSearchParams`：表示设置地址栏中的search参数。
- 在更改地址栏中的search参数时，必须传入所有的查询参数，否则会覆盖已经有的参数

示例：

```jsx
import { useSearchParams } from 'react-router-dom';

function Home() {
	// 当前路径为/home?id=1
	const [searchParams, setSearchParams] = useSearchParams();
	console.log(searchParams.get('id')); // 输出：1
    
    //或者
    /*
    const searchParamsValue = Object.fromEntries([...searchParams]);
    console.log(searchParamsValue?.id)
    */
	// setSearchParams({ id: '2' }); // 设置地址栏中的search参数为id=2
	return (
		<div>
			<h1>Home</h1>
			<button onClick={() => setSearchParams({ id: 2 })}>修改search参数</button>
		</div>
	);
}
```

##### 2.3 useLocation 函数

> - useLocation 函数用于获取地址栏中的search和params参数。
>   返回的location对象，具有以下属性：
>
> - pathname：表示地址栏中的路径，地址如：/home?id=1。
> - search：表示地址栏中的search参数，地址如：/home/1。
> - state：表示传递的state参数，该参数不会在地址栏中展示。

示例：

```jsx
import { useLocation } from 'react-router-dom';
function Home() {
	const location = useLocation();
	console.log(location.pathname); // 输出：/home
	console.log(location.search); // 输出：?id=1&keyword=react
	console.log(location.state); // 输出：{ id: '1' }
	// 可以直接结构
	const {
		pathname,
		search,
		state: { id },
	} = useLocation();
	console.log(id); // 输出：1
	return <div>Home</div>;
}
```

### 路由懒加载

> 在`React`中，使用`import()`函数来实现路由的懒加载。通过`import()`函数，可以异步加载路由组件，提高页面加载速度。

1. 创建一个`Suspense`组件，用于包裹需要懒加载的路由组件。
2. 使用`@loadable/component`库来加载路由组件。

安装依赖

```
# npm的形式
npm install @loadable/component
# yarn的形式
yarn add @loadable/component
```

示例：

```jsx
import React from 'react';
// 导入@loadable/component，来加载路由
import loadable from '@loadable/component';

const Home = loadable(() => import('...component path'));
const About = loadable(() => import('...component path'));

function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}
```

动态路由的形式如下:

```jsx
import React from 'react';
import { BrowserRouter, Routes, useRoutes } from 'react-router-dom';
import loadable from '@loadable/component';
// 假设动态
const menuList = [
	{
		path: '/index',
		name: '首页',
		elementPath: 'index',
	},
	{
		path: '/user',
		name: '用户管理',
		elementPath: '/user/index',
		children: [
			{
				path: '',
				name: '用户列表',
				elementPath: 'user/list',
			},
			{
				path: '/user/add',
				name: '添加用户',
				elementPath: 'user/add',
			},
		],
	},
];

function bindRouter(list) {
	let arr = [];
	list.map((item) => {
		const ComponentNode = loadable(() => import(`@/pages/${item.elementPath}`));
		if (item.children && item.children.length > 0) {
			arr.push({
				path: item.path,
				element: <ComponentNode />,
				children: [...bindRouter(item.children)],
			});
		} else {
			arr.push({
				path: item.path,
				element: <ComponentNode />,
			});
		}
	});
	return arr;
}

function App() {
	const route = bindRouter(menuList);
	const GetRoute = useRoutes(route);
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<GetRoute />
				</Routes>
			</BrowserRouter>
		</div>
	);
}
export default App;
```

