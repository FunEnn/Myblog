---
title: SpringBoot 常用注解 四、Spring Boot注解
date: 2024-07-17 22:08:51
description: 笔记
tags:
 - 后端
---

[toc]

### 一、@SpringBootApplication

@SpringBootApplication注解是一个快捷的配置注解，在被它标注的类中，可以定义一个或多个Bean，并自动触发自动配置Bean和自动扫描组件。此注解相当于@Configuration、@EnableAutoConfiguration和@ComponentScan的组合。

在Spring Boot应用程序的主类中，就使用了此注解。

示例：

```java
@SpringBootApplication
public class Application{
 public static void main(String [] args){
   SpringApplication.run(Application.class,args);
 }
}
```

### 二、@EnableAutoConfiguration

@EnableAutoConfiguration注解用于通知Spring，根据当前类路径下引入的依赖包，自动配置与这些依赖包相关的配置项。

### 三、@ConditionalOnBean与@ConditionalOnMissingBean

这两个注解属于对象条件注解，根据是否存在某个对象作为依据来决定是否要执行某些配置方法。

示例：

```java
@Bean
@ConditionalOnBean(name="dataSource")
LocalContainerEntityManagerFactoryBean entityManagerFactory(){
 //...
}
@Bean
@ConditionalOnMissingBean
public MyBean myBean(){
 //...
}
```

### 四、@ConditionalOnProperty

此注解用于检测当某个配置文件存在使，则触发被其标注的方法。

示例：

```java
@ConditionalOnResource(resources = "classpath:website.properties")
Properties addWebsiteProperties(){
 //...
}
```

### 五、@ConditionalOnWebApplication与 @ConditionalOnNotWebApplication

这两个注解用于判断当前的应用程序是否是Web应用程序。如果当前应用是Web应用程序，则使用Spring WebApplicationContext,并定义其会话的生命周期。

示例：

```java
@ConditionalOnWebApplication
HealthCheckController healthCheckController(){
 //...
}
```

### 六、@ConditionalExpression

此注解可以让我们控制更细粒度的基于表达式的配置条件限制。当表达式满足某个条件或者表达式为真的时候，将会执行被此注解标注的方法。

```java
@Bean
@ConditionalException("${localstore} && ${local == 'true'}")
LocalFileStore store(){
 //...
}
```

### 七、@Conditional

@Conditional注解可以控制更为复杂的配置条件。在Spring内置的条件控制注解不满足应用需求的时候，可以使用此注解定义自定义的控制条件，以达到自定义的要求。

示例：

```java
@Conditioanl(CustomConditioanl.class)
CustomProperties addCustomProperties(){
 //...
}
```

