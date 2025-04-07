---
title: expo go扫码报错
date: 2025-03-24 22:38:04
description: 笔记
tags:
 - bug
---



## expo go扫码报错

报错： **CommandError: Must specify "expo-platform" header or "platform" query parameter**

解决方法：在url后添加`?platform=ios`后缀 或者`?platform=android`
