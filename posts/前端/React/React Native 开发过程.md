---
title: React Native 开发过程
date: 2025-03-17 22:38:04
description: 笔记
tags:
 - React
---

# 一、搭建项目初始化

### 从windows安卓开始: https://reactnative.dev/docs/set-up-your-environment

#### 第一步运行：

```Plain
choco install -y nodejs-lts microsoft-openjdk17
```

#### 如果系统还没有安装过Chocolatey，则需要运行下面的命令：

```Plain
Set-ExecutionPolicy Bypass -Scope Process -Force; `
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; `
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

暂时无法在飞书文档外展示此内容

#### 第二步运行：

```Plain
npx create-expo-app@latest
```

#### 第三步运行（当前node版本 22 )：

```Plain
pnpm run start
```

#### 然后会出现二维码+项目地址，安卓手机下载expo go，来扫码或者输入地址预览即可。

![img](https://nexseaai.feishu.cn/space/api/box/stream/download/asynccode/?code=Zjg3Y2FiNjBkZDVkZTU2NjVmNGZlZDY3NjM1OGMxNjFfZngwZ2VGS2JDR0loSjJSOEhTUU5pVHFEdE00M0Z2UWFfVG9rZW46UEFuV2JTUGNub2tBcWR4TlJUdWNqdWdkbjdkXzE3NDIxOTA2MzI6MTc0MjE5NDIzMl9WNA)

![img](https://nexseaai.feishu.cn/space/api/box/stream/download/asynccode/?code=NjI3MmM5MjNhMTAwOGFlNDdlMzIzOTA1OGZhOWU4OThfREpWMFBqNG50YTJIVlFPNW9aaVJacTgzSGxKNlB6N0ZfVG9rZW46QUhmOGJBOG1Tb1FLM0d4SXVOSmNHNzdmblVjXzE3NDIxOTA2MzI6MTc0MjE5NDIzMl9WNA)

### 下一步NativeWind引入(方便用tailwindcss写样式，官方文档https://www.nativewind.dev/getting-started/expo-router)：

```Plain
pnpm i nativewind tailwindcss react-native-reanimated react-native-safe-area-context
```

#### 在根目录下引入global.css:

```CSS
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### babel.config.js配置代码：

```JavaScript
module.exports = function (api) {
    api.cache(true);
    return {
      presets: [
        ["babel-preset-expo", { jsxImportSource: "nativewind" }],
        "nativewind/babel",
      ],
    };
  };
```

#### 创建metro.config.js文件配置代码：

```JavaScript
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });
```

#### tsconfig.json配置代码：

```JSON
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "jsx": "react-jsx",
    "jsxImportSource": "react-native-css-interop"
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts",
    "nativewind-env.d.ts"
  ]
}
```

#### tailwind.config.js文件配置代码：

```JavaScript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

预览效果：

![img](https://nexseaai.feishu.cn/space/api/box/stream/download/asynccode/?code=ODNhYmVhNGI5M2Q3NjJjZjM0ZTljZTVmNDRiMTMzOWZfYmZvRkFtNUtXNUt4aTdjQnRtd2g5NWhUeW4xUjNYallfVG9rZW46Qm9nSGJSVmh1b3lxMDl4alV0TWNzN0k1bmJnXzE3NDIxOTA2MzI6MTc0MjE5NDIzMl9WNA)

### 下一步测试下打包的过程：

### eas build -p android --profile preview

![img](https://nexseaai.feishu.cn/space/api/box/stream/download/asynccode/?code=MTM0MjFhYzk1ZDhkODZmYTA4ZmFlNjhhMjdlZjFmNjBfNG9mWTFrRzR2T0EyWXBtQzNFQzdMbHkzNG9oMERzRUdfVG9rZW46TjFEQmJDU3djb1Z1dG54Q3VDMmM0Y1BFblJkXzE3NDIxOTA2MzI6MTc0MjE5NDIzMl9WNA)

### 下一步尝试集成taro ui组件库（经过调研发现taro更适合去开发小程序，而不太适合开发app，坑比较多，还有预览方面的问题。）

### 基于expo开发工具链来初始化rn项目，非常快，因为expo里面简化了开发环境的搭建，结合手机上的expo go app，热重载非常快，可以加快开发效率~

```Plain
# 创建项目
npx create-expo-app app-demo

# 启动开发服务器
npx expo start

# 构建应用
eas build
```

目前expo+rn+nativewind, expo处理了很多原生的配置，更适合后期维护，已经满足大量的需求，如路由系统，文件系统，相机，定位，推送通知，热更新，以及EAS (云构建服务），打包后会提供apk链接，直接可以下载app，通过app.json配置文件可以更精细的控制项目，nativewind会在编译的时候自动将tailwind转换成原生样式。  

苹果打包：

eas build -p ios --profile development