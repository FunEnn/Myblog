---
title: React项目初始化创建
date: 2024-08-18 22:38:04
description: 笔记
tags:
 - React 
---

[toc]

## 1、创建项目

```
npx create-react-app my-app
```

**启动项目**

> `cd my-app`
>
> `npm start`

## 2、安装tailwindcss及相关库

[官网]([安装 - TailwindCSS中文文档 | TailwindCSS中文网](https://www.tailwindcss.cn/docs/installation))

1. **@tailwindcss/typography**

`@tailwindcss/typography` 是 Tailwind CSS 的一个插件，它提供了一组预定义的样式类，用于快速设置文本样式。这些样式类包括标题、段落、列表、引用、代码块等。

> `npm install -D @tailwindcss/typography`

```js
// tailwind.config.js
module.exports = {
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

## 3、配置TypeScript的支持

```
npx create-react-app my-app --template typescript
```

## 4、相关依赖

1. **@reduxjs/toolkit**

是一个用于简化 Redux 开发的库，它提供了一些工具和函数来帮助你创建 Redux store、slice 和 reducer。

> `npm install @reduxjs/toolkit`

2. **@tanstack/react-query**

React Query 是一个用于 React 的数据获取库，它可以帮助你管理应用程序中的数据状态。是一个用于在 React 应用中处理异步数据的库。

> `npm install @tanstack/react-query`

3. **react-hook-form**

React Hook Form 是一个用于 React 的表单验证库，它提供了一种简洁、高效的方式来处理表单数据。

> `npm i react-hook-form`

4. **react-redux**

React Redux 是一个用于 React 的状态管理库，它提供了一种集中式的方式来管理应用的状态。

> `npm i react-redux`

5. **axios**

Axios 是一个基于 Promise 的 HTTP 客户端，用于浏览器和 Node.js 环境。它可以在客户端和服务器端使用，用于发送 HTTP 请求和处理响应。

> `npm i axios` 

6. **react-hot-toast**

React Hot Toast 是一个用于 React 的轻量级通知库，它可以在应用程序中显示通知消息。

> `npm i react-hot-toast`

8. **react-easy-crop**

React-Easy-Crop 是一个用于 React 的图像裁剪库，它提供了一个简单易用的界面，允许用户在网页上裁剪图像。

> `npm i react-easy-crop`

9. **@tiptap/react @tiptap/starter-kit**

`@tiptap/react` 和 `@tiptap/starter-kit` 是 Tiptap 编辑器的两个主要包。Tiptap 是一个基于 ProseMirror 的现代富文本编辑器，它提供了丰富的 API 和扩展，可以轻松创建自定义的编辑器。

> `npm i @tiptap/react @tiptap/starter-kit`

10. **@tiptap/html**

`@tiptap/html` 是 Tiptap 编辑器的一个扩展包，它允许您将 HTML 转换为 Tiptap 的文档节点，并将 Tiptap 的文档节点转换为 HTML。

> `npm install @tiptap/html`

11. **html-react-parser**

`html-react-parser` 是一个用于将 HTML 转换为 React 元素的库。它可以将 HTML 字符串解析为 React 组件，并将其渲染到页面上。

> `npm install html-react-parser`

12. **prettier-plugin-tailwindcss**

`prettier-plugin-tailwindcss` 是一个用于 Prettier 的插件，它可以帮助你更好地格式化使用 Tailwind CSS 的代码。

> `npm i  -D prettier-plugin-tailwindcss`

13. **daisyui**

DaisyUI 是一个用于 Tailwind CSS 的 UI 组件库。DaisyUI 提供了一套丰富的 UI 组件，包括按钮、卡片、表单、导航栏、模态框等。这些组件都是基于 Tailwind CSS 的实用工具类构建的，

> `npm i -D daisyui`

```js
  plugins: [
    require('daisyui')
  ],
      
   daisyui: {
    themes: [], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "d-",
  },
```

14. **@uidotdev/usehooks**

`@uidotdev/usehooks` 是一个用于 React 的自定义 Hook 库。自定义 Hook 是一个函数，它可以封装一些有状态的逻辑，以便在多个组件之间共享。

`@uidotdev/usehooks` 提供了一些常用的自定义 Hook，可以帮助你更方便地处理一些常见的任务，如处理表单、处理动画、处理键盘事件等。

> npm i @uidotdev/usehooks

15. **react-select**

`react-select` 是一个流行的 React 组件库，用于创建美观且功能强大的选择控件，如下拉菜单、多选列表等。它提供了丰富的自定义选项，可以轻松地集成到你的 React 应用中。

> `npm i --save react-select`

## 5、bug

1. react跨域代理报错

> package.json 里添加"proxy": "http://localhost:5000"在react 18之后并不适用

报错：`Invalid options object. Dev Server has been initialized using an options object that does not match the API schema. - options.allowedHosts[0] should be a non-empty string.`

解决：手动配置

> npm install http-proxy-middleware --save

**src/setupProxy.js中写入**

```

const { createProxyMiddleware } = require('http-proxy-middleware');
 
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};
```

[【react 跨域代理】](https://blog.csdn.net/qq_51689134/article/details/124588313)

2. 在 React Query 的更新中，`onSuccess` 和 `onError` 这两个配置选项已经在较新的版本中被弃用。

**处理**：应该使用 `useEffect` 与 `data` 来实现相同的功能。

```js
import { useQuery } from 'react-query';

const fetchUserData = async () => {
  const response = await fetch('/api/user');
  return response.json();
};

/*  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["blog", slug],
  });
 */
const UserComponent = () => {
  const { data, error, isLoading } = useQuery('user', fetchUserData);

  useEffect(() => {
    if (data) {
      // 这里处理数据加载成功后的逻辑
      console.log('User data:', data);
    }
  }, [data]); // 依赖项数组中包含 data，只有 data 改变时才会执行

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>User Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
```

