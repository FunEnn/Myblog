---
title: Expo bug修复
date: 2025-04-13 22:38:04
description: 笔记
tags:
 - React
---



[toc]

## 1、路由配置bug

expo-router导航路由出现bug

解决：

**在根目录下创建`index.js`文件**

```js
import 'expo-router/entry';
import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';

// LogRocket.init('wdchdb/debaox', {
//   updateId: Updates.isEmbeddedLaunch ? null : Updates.updateId, // 如果是嵌入式启动，则不设置 Update ID
//   expoChannel: Updates.channel, // 设置 Expo 更新通道
//   shouldCaptureInDev: true,
// });

// expo-router 的 ExpoRoot 作为入口点
export default function App() {
  return <ExpoRoot context={require.context('./app')} />;
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
```

**在`package.json`文件下**

```json
{
  "main": "index.js", // 替换原来的 expo-router/entry
}
```

