---
title: lombok常用注解
date: 2024-07-17 22:29:13
tags: lombok
description: 笔记
---

[toc]

### 一、@Getter and @Setter

**取代实体类中的get和set方法**

使用@Getter或@Setter,lombok会自动生成默认的getter / setter。如果在类上使用，则所有字段生成getter / setter

### 二、@Accessors

**目的是修改getter和setter方法的内容**

- fluent

  如果为true，那么getter 和setter 生成的方法名没有前缀。此外，除非指定，否则chain将为true。

- chain

  如果为true，则生成的setter返回this而不是void。默认值：false

- prefix

  如果存在，则字段必须以任何这些前缀为前缀。每个字段名称依次与列表中的每个前缀进行比较，如果找到匹配项，则会剥离前缀以创建字段的基本名称。在列表中包含一个空字符串是合法的它将始终匹配。

示例：

```java
import lombok.experimental.Accessors;
import lombok.Getter;
import lombok.Setter;

@Accessors(fluent = true)
public class AccessorsExample {
  @Getter @Setter
  private int age = 10;
}

class PrefixExample {
  @Accessors(prefix = "f") @Getter
  private String fName = "Hello, World!";
}
```

等价于：

```java
 public class AccessorsExample {
  private int age = 10;
  
  public int age() {
    return this.age;
  }
  
  public AccessorsExample age(final int age) {
    this.age = age;
    return this;
  }
}

class PrefixExample {
  private String fName = "Hello, World!";
  
  public String getName() {
    return this.fName;
  }
}
```

### 三、@AllArgsConstructor，RequiredArgsConstructor和@NoArgsConstructor

**分别生成：全参构造方法,带参构造,无参构造**

### 四、@ToString和@EqualsAndHashCode

**自动重写toString\equals\hashCode方法**

### 五、@Data

集成以下注解

- @Getter
- @Setter
- @RequiredArgsConstructor
- @ToString
- @EqualsAndHashCode

独有属性配置:

- staticConstructor 静态方法名

> @Data(staticConstructor=“of”)
> 通过新的方式来创建实例：Foo.of(5)

### 六、@Value

**@Value是不可变的@Data**

> @ToString，@EqualsAndHashCode，@AllArgsConstructor,@FieldDefaults，@Getter。

> 所有字段由private和final修饰，不会产生setter方法。类本身也是由final修饰。

### 七、@Builder和@Singular

**自动生成构造者模式代码,Singular是针对集合属性的特殊处理。**

#### 7.1 @Singular

@Singular对集合进行操作，**最终会生成不可变集合**

示例：

```java
public class Person {
    @Singular 
    private List<String> names;
}

//-------------生成的方法
name(String) 添加一个姓名
clearNames() 清除
names(Collection<String>) 设置一个集合
```

使用：

```java
Person.builder().name("小明").name("小红").build()
```

#### 7.2 @Builder

**通过内部类和一个全参构造器来实现构造者模式**

示例：

```java
@Builder
public class BuilderExample {
  @Builder.Default 
  private long created = System.currentTimeMillis();
  private String name;
  private int age;
  @Singular 
  private Set<String> occupations;
}
```

使用：

```java
Person.builder().name("Adam Savage")
.city("San Francisco").job("Mythbusters")
.job("Unchained Reaction").build();
```

**注意事项**

- 由于Builder会生成一个全参构造器，导致默认的无参构造器失效，所以类采用@Builder注解后无法new出来。

完整使用：

```java
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Person{}
```

