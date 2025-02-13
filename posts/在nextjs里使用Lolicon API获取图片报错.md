---
title: 在nextjs里使用Lolicon API获取图片报错
date: 2025-02-09 22:38:04
description: 笔记
tags:
 - bug
---

[toc]

在获取图片时发生以下报错

![image-20250209234132400](C:\Users\30958\AppData\Roaming\Typora\typora-user-images\image-20250209234132400.png)

![image-20250209234310637](C:\Users\30958\AppData\Roaming\Typora\typora-user-images\image-20250209234310637.png)Next.js 图片组件扩展了 HTML `<img>` 元素，具有自动图片优化功能：

- 尺寸优化：使用 WebP 和 AVIF 等现代图片格式自动为每个设备提供正确尺寸的图片。
- 视觉稳定性：加载图片时自动阻止 布局转变。
- 更快的页面加载：仅当图片使用原生浏览器延迟加载进入视口时才会加载图片，并带有可选的模糊占位符。
- 资源灵活性：按需调整图片大小，即使是存储在远程服务器上的图片

## 解决方法

在Image属性中添加 `unoptimized`就可以跳过 Next.js 的图片优化

这个属性是用来取消 Next.js 对图片的优化。如果设置 `unoptimized={true}` 时，将使用源图片，不会更改质量、大小和格式。默认值是 `false`。

也可以通过 `next.config.ts` 设置所有的图片取消优化

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
```

