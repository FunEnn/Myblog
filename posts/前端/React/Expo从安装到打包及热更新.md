---
title: Expo从安装到打包及热更新
date: 2025-04-09 22:38:04
description: 笔记
tags:
 - React
---

[toc]

## 1、Expo项目安装

[创建您的第一个应用程序 - Expo Documentation --- Create your first app - Expo Documentation](https://docs.expo.dev/tutorial/create-your-first-app/)

**使用 create-expo-app来初始化新的 Expo 应用程序**

```bash
npx create-expo-app@latest StickerSmash
```

**运行 `reset-project` 脚本来删除样板代码**

```bash
npm run reset-project
```

## 2、Expo打包（仅安卓打包）

**安装eas-cli**

```bash
npm install -g eas-cli
```

**注册Expo账户并登录  expo官网 https://expo.dev/**

```bash
expo login
```

**输入如下命令后，出现All, ios, Android,这里选择Android**

```undefined
eas build:configure
```

**aab打包**

```bash
eas build --platform android
```

**apk打包**

```bash
eas build -p android --profile preview
```

## 3、Expo热更新

**安装`expo-updates`**

```bash
npx expo install expo-updates
```

**使用 `eas update` 配置项目**

按指定顺序运行以下命令：

```bash
eas update:configure

eas build:configure
```

项目根目录中的 eas.json 文件将被修改

```json
{
  "build": {
    "development": {
      "channel": "development"
    },
    "preview": {
      "channel": "preview"
    },
    "production": {
      "channel": "production"
    }
  }
}
```

安装后app.json会出现变化

```json
"updates": {
      "fallbackToCacheTimeout": 0,
      "url": "https://u.expo.dev/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    },
```

**发布更新**

```bash
eas update --branch preview --message "Updating the app"
```

