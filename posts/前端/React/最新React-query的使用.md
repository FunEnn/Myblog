---
title: 最新React-query的使用
date: 2025-10-18 22:38:04
description: 笔记
tags:
 - React
---

### React Query（TanStack Query v5）

#### 安装与环境要求

- 安装（任选其一）：
  - npm: `npm i @tanstack/react-query`
  - pnpm: `pnpm add @tanstack/react-query`
  - yarn: `yarn add @tanstack/react-query`
- 开发者工具（可选，仅开发环境使用）：
  - npm: `npm i -D @tanstack/react-query-devtools`
  - pnpm: `pnpm add -D @tanstack/react-query-devtools`
  - yarn: `yarn add -D @tanstack/react-query-devtools`
- TypeScript 要求：TypeScript v4.7 及以上（推荐 v5+）。

#### 一、它解决什么问题

- 专注“服务器状态”的获取、缓存、同步与更新（区别于本地 UI 状态）。
- 内置缓存、请求去重、过期判断、后台刷新、重试、分页/无限加载、失效联动等能力。

#### 二、核心概念

- `QueryClientProvider`：在应用根部注入单例 `QueryClient`。
- `useQuery`（读）：用 `queryKey` 标识数据源，自动管理 `isLoading/isError/data` 等状态。
- `useMutation`（写）：执行创建/更新/删除/上传等操作，`isPending/error/data`，支持成功后“失效查询”。
- 查询键（Query Key）：数组键，用于唯一标识和分组缓存项；失效、匹配与联动都依赖它。

#### 三、最小可用示例

```tsx
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const client = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={client}>
      <Todos />
    </QueryClientProvider>
  );
}

function Todos() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['todos', { page: 1 }],
    queryFn: fetchTodos,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <ul>
      {data?.items?.map((t: any) => (
        <li key={t.id}>{t.title}</li>
      ))}
    </ul>
  );
}

function CreateTodoButton() {
  const qc = useQueryClient();
  const createTodo = useMutation({
    mutationFn: addTodo,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['todos'] }),
  });

  return (
    <button onClick={() => createTodo.mutate({ title: 'New' })} disabled={createTodo.isPending}>
      {createTodo.isPending ? 'Creating...' : 'Create Todo'}
    </button>
  );
}
```

#### 四、常用能力（读）

- 缓存与共享：相同 `queryKey` 的数据在组件间共享。
- 请求去重：并发相同查询只会发一次请求。
- 过期与后台刷新：数据“过期”后后台透明刷新；可配置 `staleTime`。
- 重新获取：窗口聚焦/网络恢复可自动重新获取（可配置）。
- 失败重试：默认对网络错误自动重试（可配置重试次数/退避）。

#### 五、常用能力（写）

- `useMutation`：手动触发（`mutate/mutateAsync`），管理 `isPending/error/data`。
- 失效联动：在 `onSuccess` 里 `invalidateQueries({ queryKey })`，触发相关读数据重取，保证“写后读一致”。
- 乐观更新与回滚：可在 `onMutate/onError/onSettled` 中实现更顺滑的交互。

#### 六、查询键（Query Key）实践

- 使用数组键并包含查询参数：如 `['todos', { page, filter }]`。
- 分层与前缀失效：`invalidateQueries({ queryKey: ['todos'] })` 会失效 `['todos']` 及其子键（除非 `exact: true`）。

#### 七、SSR 与水合（可选）

- 服务器预取：服务端创建 `QueryClient`，执行查询后 `dehydrate(queryClient)`。
- 客户端水合：`<HydrationBoundary state={dehydratedState}>...</HydrationBoundary>`。
- 若无 SSR 预取，不需要 HydrationBoundary（避免类型错误）。

#### 八、Devtools（开发时启用）

- 可视化查看缓存、请求、状态与依赖，定位问题更快。

#### 九、对比与记忆口诀

- `useQuery`：读数据，自动触发，有缓存；用于展示。
- `useMutation`：写数据，手动触发，无缓存；用于提交/上传/点赞等。
- 成功变更 → 失效相关 `queryKey` → 触发重取，保持 UI 一致性。