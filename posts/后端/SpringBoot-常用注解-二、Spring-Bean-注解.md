---
title: SpringBoot 常用注解 二、Spring Bean 注解 与 Spring DI注解
date: 2024-07-14 23:41:33
description: 笔记
tags:
 - 后端
---

[toc]

### 一、@ComponentScan

`@ComponentScan`注解用于配置Spring需要扫描的被组件注解注释的类所在的包。可以通过配置其basePackages属性或者value属性来配置需要扫描的包路径。value属性是basePackages的别名。

### 二、@Component

`@Component`注解的作用是将一个普通的Java类转化为Spring的组件。通过`@Component`注解标记的类会被Spring框架扫描并创建实例，以便在需要的地方进行依赖注入。

### 三、@Service

`@Service`注解是@Component的一个延伸（特例），它用于标注业务逻辑类。与@Component注解一样，被此注解标注的类，会自动被Spring所管理。

### 四、@Repository

`@Repository`注解也是@Component注解的延伸，与@Component注解一样，被此注解标注的类会被Spring自动管理起来，@Repository注解用于标注DAO层的数据持久化类。

### 五、@Bean

`@Bean` 注解用于在配置类中声明一个 Bean。当配置类（带有 `@Configuration`）被 Spring 容器加载时，其中带有 `@Bean` 注解的方法会被自动调用，其返回值会注册为一个 Bean，这些 Bean 然后可以在 Spring 容器中被其他部分使用。

