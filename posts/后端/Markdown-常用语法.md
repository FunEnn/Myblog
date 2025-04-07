---
title: Markdown 常用语法
date: 2024-06-20 15:31:43
description: 笔记
tags:
 - Markdown
---

[toc]

### 1.1 文章目录

&emsp;&emsp;TOC全称为Table of Content，自动列出全部标题。在文章开头使用`[TOC]`即可自动生成文章目录。


`1 | [目录名](#标题链接)`

**规则：**

- **标题链接**格式为： 一个`#`+`被链接标题`。
- **标题链接**中不能出现大写字母，大写字母用小写字母代替。
- **标题链接**中不能出现空格` `，空格` `用`-`代替。
- 目录排布由**有序列表**或**无序列表**控制
- 跳转与**目录名**无关，**标题**和**标题链接**符合规则即可

### 1.2 字体

#### 1.2.1 首行缩进

&emsp;&emsp;Markdown的段落没有特殊的格式，书写中文时，需要首行空两格，可通过实现，一个即为一个中文字符的宽度。**语法格式：**

`&emsp;&emsp;首行空两格`

>`&ensp;`：占据的宽度正好是半个中文宽度   
>`&emsp;`：占据的宽度正好是1个中文宽度 

#### 1.2.2 字体颜色

&emsp;&emsp;字体颜色可通过HTML的`<font>`标签来表示。**语法格式：**

```html
<font size=5>字体大小</font> 					// size范围要求在[0, 7]，数字越大，字体越大，超过7，按最大字体显示
<span style="font-size:#px;">字体大小</span>		// #号表示任意整数，可任意设置像素字体的大小
```

#### 1.2.3 字体高亮

&emsp;&emsp;字体高亮可通过`2`对`=`号实现，也可通过HTML的`<mark>`标签来表示.**语法格式：**

```html
==字体高亮==
<mark>字体高亮</mark>
```

#### 1.2.4 文字居中

&emsp;&emsp;文字居中可通过HTML的`<div>`标签实现。**语法格式：**

```html
<div align=center>文字居中显示</div>
```

&emsp;&emsp;同理，文字居左，居右也可通过该方式实现，只需将`align`的值替换成`left`，`right`。

### 1.3 代码框

- 如果是一个函数或者一行代码，可以使用`1`对 ` 号将其包起来。**语法格式：**

  ```
  `fun()`函数
  ```

  显示效果如下：

  > `fun()`函数

- 如果是一段代码，代码量较多，可以使用连续的`3`对 ` 号将其包起来，并且可以指定一种语言。**语法格式：**

  ````
  ```cpp
  int main()
        {
        	std::cout << "Hello Markdown";
     	}
  ```
  ````

    显示效果如下：

  ```cpp
  int main()
        {
        	std::cout << "Hello Markdown";
     	}
  ```
  
  
  
  

### 1.4 链接

**语法格式：**

```
[链接名称](链接地址)		// [CSDN主页](https://www.csdn.net)
<链接地址>				// <https://www.csdn.net>
```

显示效果如下：

>[CSDN主页](https://www.csdn.net)
>
><https://www.csdn.net>

### 1.5 图片

**语法格式：**

```
· ![图片描述](图片链接) 		// 图片链接：可以网络图片地址，也可以是本地图片地址。本地图片地址的路径方向为/

· ![图片描述](data:image/png;base64,Base64编码文本)	// 图片转为Base64编码显示

· ![图片描述][图片资源]
  // 放在文章末尾
  [图片资源]:data:image/png;base64,Base64编码文本
```

- **图片居左显示**。图片链接后加上#pic_left，如：`![CSDN图标](https://img-blog.csdnimg.cn/img_convert/da0d7042b2fbfc13929ddda265ef2da6.png#pic_left)`
- **图片居中显示**。图片链接后加上#pic_center，如：`![CSDN图标](https://img-blog.csdnimg.cn/img_convert/da0d7042b2fbfc13929ddda265ef2da6.png#pic_center)`
- **图片居右显示**。图片链接后加上#pic_right，如：`![CSDN图标](https://img-blog.csdnimg.cn/img_convert/da0d7042b2fbfc13929ddda265ef2da6.png#pic_right)`

### 1.6 锚点

&emsp;&emsp;Markdown的语法是不支持锚点的，但可以使用HTML的锚点语法，实现页面中跳转。**语法格式：**

```
<a href="#jump">链接说明文字</a>
在需要跳转到的位置增加如下代码：
<a id="jump">跳转</a>
```

显示效果如下：

> <a href="#test">跳转到：测试</a>
> | -
> | --
> | ---
> | ----
> | -----
> | ------
> <a id="test">测试</a>

### 1.7 任务列表

&emsp;&emsp;任务列表可以创建带有复选框的项目列表。复选框将显示在内容旁边。要创建任务列表，请在任务列表项之前添加破折号`-`和方括号`[ ]`，并在`[ ]`前面加上空格。要选择一个复选框，请在方括号`[x]`之间添加 x 。**语法格式：**

```
- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media
```

显示效果如下：

>- [x] Write the press release
>- [ ] Update the website
>- [ ] Contact the media



### 1.8 列表语法

#### 1.8.1  有序列表

&emsp;&emsp;要创建有序列表，请在每个列表项前添加数字并紧跟一个英文句点。数字不必按数学顺序排列，但是列表应当以数字 1 起始。

| **Markdown语法**                                             | HTML                                                         | **预览效果**                                                 |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `1. First item`<br/>`2. Second item`<br/>` 3. Third item`<br/>`4. Fourth item` | `<ol>`              <br/>`<li>First item</li>`<br/>`<li>Second item</li>`<br/>`<li>Third item</li>`<br/>`<li>Fourth item</li>`<br/>`</ol>` | 1. First item <br/>2. Second item<br/>3. Third item <br/>4. Fourth item |

#### 1.8.2 无序列表

创建无序列表，在每个列表项前面添加破折号 (-)、星号 (*) 或加号 (+) 。缩进一个或多个列表项可创建嵌套列表。

| **Markdown语法**                                             | HTML                                                         | 预览效果                                                     |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `- First item`<br/>`- Second item`<br/>`- Third item`<br/>`- Fourth item` | `<ul>`<br/>`<li>First item</li>`<br/>`<li>Second item</li>`<br/>`<li>Third item</li>`<br/>`<li>Fourth item</li>`<br/>`</ul>` | - First item<br/>- Second item<br/>- Third item<br/>- Fourth item |
