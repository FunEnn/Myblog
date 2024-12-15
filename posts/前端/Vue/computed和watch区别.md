---
title: computed和watch区别
date: 2024-12-08 14:59:55
description: 笔记
tags:
 - Vue
---

### 区别

1. computed是计算属性，watch是监听，监听的是data中数据的变化
2. computed是支持缓存，依赖的属性值发生变化，计算属性才会重新计算，否则用缓存；watch不支持缓存
3. computed不支持异步，watch可以异步操作
4. computed是第一次加载救监听，watch是不监听
5. computed函数中必须有return；watch不用
6. 