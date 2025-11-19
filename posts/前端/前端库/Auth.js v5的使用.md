---
title: Auth.js v5的使用
date: 2025-05-25 19:44:29
description: 笔记
tags:
 - 前端库
---

[toc]

## 1、安装最新Auth.js

```
pnpm add next-auth@beta
```

## 2、使用 CLI 生成身份验证密钥

```
pnpm exec auth secret
```

## 3、配置文件

1.  创建文件`auth.config.ts`以及`auth.ts`

```ts
// src/lib/auth.config.ts
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig, User } from "next-auth";

const authConfig: NextAuthConfig = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const email = "admin@admin.com";
                const password = "123456";
                console.log("🔥 Incoming credentials:", credentials);

                if (!credentials?.email || !credentials?.password) {
                    console.error("⚠️ Missing email or password");
                    return null;
                }

                if (credentials.email === email && credentials.password === password) {
                    return {
                        id: "1",
                        email,
                        name: "Admin",
                    };
                }
                return null;
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                // @ts-ignore
                token.accessToken = user.accessToken;
            }
            return token;
        },

        async session({ session, token }) {
            session.user.id = token.id as string;
            session.user.email = token.email as string;
            session.user.name = token.name as string;
            // @ts-ignore
            session.accessToken = token.accessToken;
            return session;
        },
    },

    pages: {
        signIn: "/login",
    },

    session: {
        strategy: "jwt",
    },

    secret: process.env.AUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
};

export default authConfig;
```

```ts
// src/lib/auth.ts
import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import authConfig from "./auth.config";

// ✅ 类型扩展：统一写在 "next-auth" 模块中
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            name: string;
        };
        accessToken?: string;
    }

    interface User {
        id: string;
        email: string;
        name: string;
    }

    interface JWT {
        id?: string;
        email?: string;
        name?: string;
        accessToken?: string;
    }
}

// ✅ 初始化 NextAuth（新版 v5）并导出核心功能
export const {
    auth, // 用于 SSR / middleware 获取 session
    handlers, // 用于 API Route (route.ts)
    signIn, // 用于客户端登录
    signOut, // 用于客户端登出
} = NextAuth(authConfig satisfies NextAuthConfig);
```

2. 创建用于 App Router API 路由

`app/api/auth/[...nextauth]/route.ts`

```ts
import { handlers } from "@/lib/auth"
export const { GET, POST } = handlers
```

3. 根目录src下创建中间件`middleware.ts`

```ts
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/", "/login"];

export async function middleware(request: NextRequest) {
    const session = await auth();
    const pathname = request.nextUrl.pathname;
    console.log("🔥 middleware running:", request.nextUrl.pathname);

    const isPublic = publicPaths.some((path) => pathname.startsWith(path));
    const isLoginPage = pathname.startsWith("/login");

    if (!session && !isPublic) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (session && isLoginPage) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/login"],
};
```

