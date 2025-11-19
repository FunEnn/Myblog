---
title: Auth.js的bug修复
date: 2025-05-25 19:44:29
description: 笔记
tags:
 - 前端库
---

[toc]

## 1. **Error: `headers` was called outside a request scope**

使用Authjs依赖`"next-auth": "5.0.0-beta.28"`在 `"use client"`的登录页面使用signIn方法产生报错

解决：创建一个文件 **get-session.tsx**

```tsx
"use server"
import { auth } from "@/lib/auth"

export async function getCurrentUser() {
	const session = await auth()
	return session
}
```

将客户端client与服务端server分开

