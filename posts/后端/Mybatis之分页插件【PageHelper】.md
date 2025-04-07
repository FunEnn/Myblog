---
title: Mybatis之分页插件【PageHelper】
date: 2024-07-11 23:44:26
description: 笔记
tags:
 - 后端
---

[toc]

### 一、PageHelper是什么？

> PageHelper是基于拦截器实现的**myBatis**分页插件

官方参考文档

> https://github.com/pagehelper/Mybatis-PageHelper

### 二、如何使用PageHelper?

1. 导入PageHelperE的相关jar包
2. 在mybatis-config.xml中配置分页插件
3. 在查询之前，设置分页条件
4. 在查询之后，将结果封装Pagelnfo中，使用Pagelnfo实现后续分页效果

示例代码如下：

**①导入PageHelper的相关jar包**

```xml
<!-- https://mvnrepository.com/artifact/com.github.pagehelper/pagehelper -->

<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper-spring-boot-starter</artifactId>
    <version>5.0.0</version>
</dependency>
```

**②在mybatis-config.xml中配置分页插件**

``` xml
<!-- 配置分页插件   -->
<plugins>
    <plugin interceptor="com.github.pagehelper.PageInterceptor"></plugin>
</plugins>
```

**在aplication.yml中配置分页插件**

```yaml
#分页pageHelper
pagehelper:
    helper-dialect: mysql
    reasonable: true
    support-methods-arguments: true
```

**③在userService上添加 分页查询方法2个**

```java
List<User> findAllUserByPageF(int pageNum,int pageSize);

PageInfo<User> findAllUserByPageS(int pageNum,int pageSize);
```

**④userServiceImpl上添加分页查询实现**

``` java
@Override
// TODO Auto-generated method stub
List<User> findAllUserByPageF(int pageNum,int pageSize){
    PageHelper.startPage(pageNum, pageSize);
    List<User> lists = userMapper.queryUserInfo();
    return lists;
}

@Override
// TODO Auto-generated method stub
PageInfo<User> findAllUserByPageS(int pageNum,int pageSize){
    PageHelper.startPage(pageNum, pageSize);
    List<User> lists = userMapper.queryUserInfo();
    PageInfo<User> pageInfo = new PageInfo<User>(lists);
    return pageInfo;
}
```

**⑤最后在controller写上测试接口**

```java
@GetMapping("/testPageHelper1")
public PageInfo<User> testPageHelper1(){
    PageInfo<User> queryResult = userService.findAllUserByPageS(1,5);
    return queryResult;
}

@GetMapping("/testPageHelper2")
public PageInfo<User> testPageHelper2(){
    PageInfo<User> queryResult = userService.findAllUserByPageF(1,5);
    return queryResult;
}
```

### 三、为什么要使用Pagelnfo去封装分页的结果？

` PageInfo就是用来封装分页信息的一个工具类，它能够将分页所需的所有信息组合在一起，并返回给前端或其他业务逻辑进行处理。`

1. **方便管理分页相关的信息**：PageInfo可以统一管理当前页码、每页记录数、总记录数、总页数等分页信息，使得代码更加清晰易读。
2. **便于扩展和维护**：当需求变化时，可以通过修改PageInfo类来快速实现新需求，而不需要对已有的代码进行大量修改，从而提高了系统的可维护性和扩展性。
3. **更加灵活的分页展示效果**：通过调整PageInfo中的参数设置，可以实现不同的分页展示效果，例如改变每页显示的记录数，调整页码的排列顺序等等。

