---
title: React-query使用
date: 2024-08-20 22:38:04
description: 笔记
tags:
 - React
---

## 什么是react-query

- `react-query` 适用于`React Hooks`的，方便我们管理服务端请求的一个库。使用这个库你可以很方便的获取、同步、更新和缓存你的远程数据。

- 可以把服务端的状态缓存在客户端的内存中， 从而让任意组件获取这些状态。

## 安装

```
npm i react-query
```

## 前后代码对比

```jsx
//前

function App() {
    const [data, updateData] = useState(null)
    const [isError, setError] = useState(false)
    const [isLoading, setLoading] = useState(false)
    
    useEffect(async () => {
        setError(false)
        setLoading(true)
        try {
            const data = await axios.get('/api/user')
            updateData(data)
        } catch (e) {
			setError(true)            
        }
        setLoading(false)
    },[])
}
```

```jsx
// 后

function App() {
    const { ata, isError, isLoading} = useQuery('userData', () => axios.get('/api/user'))
    
    if(isLoading) {
        return <div>loading</div>
    }
    
    return (
    	<ul>
        	{data.map((user) => (
            	<li key={user.id}>{user.name}</li>
            ))}
        </ul>
    )
}
```



## 使用

```javascript
// main.js(项目入口文件)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import App from './App'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)
```

```jsx
// app.jsx

import { useQuery } from 'react-query';
import request from './request';

function App() {
  // 查询
  const userQuery = useQuery({
      queryFn: () => {
          return request.get('/users')
      },
      queryKey: ["users"]
  });
  console.log(userQuery);
  return (
    (<ul>
      {
        userQuery?.data?.map((user) => <li key={user.id}>{user.name}</li>)
      }
    </ul>)
  )
}

export default App
```

## 查询 Queries

查询是一种对于与**唯一键值**相关联的异步数据源的声明性依赖。 查询可以与任何基于 Promise 的方法（包括 GET 和 POST 方法）一起使用，以从服务器获取数据。 

- 该查询的一个**唯一的键值**
- 一个返回 Promise 的函数：
  - 解析数据，或
  - 抛出错误

```jsx
import { useQuery } from "react-query";

function App() {
  const info = useQuery({ queryKey: ["todos"], queryFn: fetchTodoList });
}
```

`useQuery`返回的查询结果将包含所有关于该查询的信息，你可以用这些信息来进行排版和或数据驱动的任何动作：

```jsx
const result = useQuery({ queryKey: ["todos"], queryFn: fetchTodoList });
```

`result`对象包含一些非常重要的状态，你需要注意这些状态才能提高工作效率。 在任何给定时刻，查询只能处于以下状态之一：

- `isLoading` 或者 `status === 'loading'` - 查询暂时还没有数据
- `isError` 或者 `status === 'error'` - 查询遇到一个错误
- `isSuccess` 或者 `status === 'success'` - 查询成功，并且数据可用

除了这些主要状态之外，取决于具体查询的状态，还有更多信息可用：

- `error` - 如果查询处于`isError`状态，则可以通过`error`属性获取该错误
- `data` - 如果查询处于`isSuccess`状态，则可以通过`data`属性获得数据

**示例**

```jsx
function Todos() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodoList,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  // 现在我们可以假设 `isSuccess === true`
  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
```

## 查询的键值 Query Keys

### 包含复杂对象的数组

当查询需要更多信息来唯一地描述其数据时，数组可以为带有任意数量字符串及可序列化对象的形式。这种形式对于以下情况很有用：

- 分层或嵌套的资源
  - 通常需要传递 ID、索引或其他原语来唯一地标识该资源
- 带有附加参数的查询
  - 通常需要传递一个作为附加信息的对象

**示例**

```jsx
useQuery({ queryKey: ['todo', 5], ... });

useQuery({ queryKey: ['todo', 5, { preview: true }], ...});

useQuery({ queryKey: ['todos', { type: 'done' }], ... });
```

### 如果查询功能依赖于变量，则将其包含在查询键值中

查询键值唯一地描述了需要获取的数据，因此它们应该包括所有那些在查询函数中使用到的**需要更改的变量**。

```jsx
function Todos({ todoId }) {{
  const result = useQuery({
    queryKey: ['todos', todoId],
    queryFn: () => fetchTodoById(todoId),
  });
}
```

## 查询函数 Query Functions

查询函数实际上可以是**任何一个返回 Promise 的函数**。返回的 Promise 应该**解决数据**或**抛出错误**。

以下所有都是有效的查询函数配置：

```jsx
useQuery({ queryKey: ["todos"], queryFn: fetchAllTodos });
useQuery({ queryKey: ["todos", todoId], queryFn: () => fetchTodoById(todoId) });
useQuery({
  queryKey: ["todos", todoId],
  queryFn: async () => {
    const data = await fetchTodoById(todoId);
    return data;
  },
});
useQuery({
  queryKey: ["todos", todoId],
  queryFn: ({ queryKey }) => fetchTodoById(queryKey[1]),
});
```

### 抛出和处理错误

为了使 React Query 确定查询错误，查询函数的错误**必须抛出**或返回**rejected Promise**。查询函数中引发的任何错误都将被持久化在查询的`error`状态中。

```ts
const { error } = useQuery({
  queryKey: ["todos", todoId],
  queryFn: async () => {
    if (somethingGoesWrong) {
      throw new Error("Oh no!");
    }
    if (somethingElseGoesWrong) {
      return Promise.reject(new Error("Oh no!"));
    }

    return data;
  },
});
```

## 修改 Mutations

与查询不同，修改通常意味着用于创建/更新/删除数据或执行服务器命令等副作用。 为此，React Query 导出了`useMutation` hook。

**示例**

```JSX
function App() {
  const mutation = useMutation({
    mutationFn: (newTodo) => {
      return axios.post("/todos", newTodo);
    },
  });

  return (
    <div>
      {mutation.isLoading ? (
        "Adding todo..."
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? <div>Todo added!</div> : null}

          <button
            onClick={() => {
              mutation.mutate({ id: new Date(), title: "Do Laundry" });
            }}
          >
            Create Todo
          </button>
        </>
      )}
    </div>
  );
}
```

### 持久化

现在可以将修改持久化到数据库或其他什么存储方式中，并在以后恢复。 这可以通过以下高阶函数实现：

```jsx
const queryClient = new QueryClient();

// 定义 "addTodo" 修改
queryClient.setMutationDefaults(["addTodo"], {
  mutationFn: addTodo,
  onMutate: async (variables) => {
    // 取消 todos list 当前的查询
    await queryClient.cancelQueries(["todos"]);

    // 创建一个对于 todo 的乐观修改
    const optimisticTodo = { id: uuid(), title: variables.title };

    // 添加到 todos list
    queryClient.setQueryData(["todos"], (old) => [...old, optimisticTodo]);

    // 返回包含乐观修改的上下文
    return { optimisticTodo };
  },
  onSuccess: (result, variables, context) => {
    // 成功，用正确内容替换掉
    queryClient.setQueryData(["todos"], (old) =>
      old.map((todo) => (todo.id === context.optimisticTodo.id ? result : todo))
    );
  },
  onError: (error, variables, context) => {
    // 清除掉添加失败的 todo
    queryClient.setQueryData(["todos"], (old) =>
      old.filter((todo) => todo.id !== context.optimisticTodo.id)
    );
  },
  retry: 3,
});

// 在同一个组件内启动修改
const mutation = useMutation({ mutationKey: ["addTodo"] });
mutation.mutate({ title: "title" });

// 如果因为设备离线而暂停了修改，
// 然后，当程序退出时，可以使暂停的修改变为 dehydrated 的
const state = dehydrate(queryClient);

// 当程序启动时，修改再次启动
hydrate(queryClient, state);

// 重启修改
queryClient.resumePausedMutations();
```

