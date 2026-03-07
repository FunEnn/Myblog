---
title: DOM的增删改查
date: 2025-12-18 15:27:04
description: 笔记
tags:
 - JavaScript
---

### 增

createElement() createTextNode()

父节点.appendChild(子节点)

父节点.insertBefore(新节点, 旧节点)

createDocumentFragment()文档片段

### 删

父节点.removeChild(子节点)

自删：子节点.parentNode.removeChild(子节点)

### 改

父节点.replaceChild(新节点, 旧节点)

innerHTML

### 查

#### 通过方法获取

##### 1.获取单个元素

getElementById() querySelector()

##### 2.获取HTMLCollection动态伪数组

getElementsByClassName() getElementsByTagName()

##### 3.获取NodeList静态伪数组

getElementsByName() querySelectorAll()

#### 通过属性获取

##### 1.获取子节点/子元素

子节点：childNodes(NodeList动态) firstChild lastChild

子元素：children(HTMLCollection)
