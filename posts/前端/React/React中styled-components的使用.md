---
title: styled-components使用
date: 2024-08-19 22:38:04
description: 笔记
tags:
 - React 
---



[官网](https://styled-components.com/)

## 简介

``styled-components`` 样式化组件，主要作用是它可以编写实际的CSS代码来设计组件样式，也不需要组件和样式之间的映射，即创建后就是一个正常的React 组件，并且可以附加样式给当前组件。 优化react组件。

## 安装

```
npm i --save-dev @types/styled-components
```

## 使用

```ts
import styled from "styled-components";

export const Header = styled.div`
  width:100%;
  background:red      
`
```

```tsx
import {Header} from "./style";

const AppHeader = () => {
    return (
        <Header>
            <div>顶部</div>
        </Header>
    )
}
```





