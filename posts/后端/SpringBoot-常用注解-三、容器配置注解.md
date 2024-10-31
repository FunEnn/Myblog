---
title: SpringBoot 常用注解 三、容器配置注解
date: 2024-07-14 23:56:11
description: 笔记
tags:
 - 后端
---

[toc]

### 一、@Autowired

@Autowired注解用于标记Spring将要解析和注入的依赖项。此注解可以作用在构造函数、字段和setter方法上。

 作用于字段：

```java
@RestController
public class UserController{
    @AutoWired
    private UserService userService;
    
    //...
}
```

### 二、@Primary

当系统中需要配置多个具有相同类型的bean时，@Primary可以定义这些Bean的优先级。

### 三、@Qualifier

当系统中存在同一类型的多个Bean时，@Autowired在进行依赖注入的时候就不知道该选择哪一个实现类进行注入。此时，我们可以使用@Qualifier注解来微调，帮助@Autowired选择正确的依赖项。

