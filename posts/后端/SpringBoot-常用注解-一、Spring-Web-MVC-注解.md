---
title: SpringBoot 常用注解 一、Spring Web MVC 注解
date: 2024-07-13 23:09:48
description: 笔记
tags:
 - 后端
---

[toc]

### 一、@RequestMapping

@RequestMapping注解的主要用途是将Web请求与请求处理类中的方法进行映射。

@RequestMapping注解对请求处理类中的请求处理方法进行标注；@RequestMapping注解拥有以下的六个配置属性：

- value:映射的请求URL或者其别名
- method:兼容HTTP的方法名
- params:根据HTTP参数的存在、缺省或值对请求进行过滤
- header:根据HTTP Header的存在、缺省或值对请求进行过滤
- consume:设定在HTTP请求正文中允许使用的媒体类型
- product:在HTTP响应体中允许使用的媒体类型

**提示：在使用@RequestMapping之前，请求处理类还需要使用@Controller或@RestController进行标记**

@GetMapping、@PostMapping、@PutMapping和@DeleteMapping分别是@RequestMapping请求方法为get、post、put、delete的派生注解。

#### 1.1 @PutMapping

相当于:

```java
@RequestMapping(method=HttpMethod.PUT)
```

#### 1.2 @PostMapping

相当于:

```java
@RequestMapping(method=HttpMethod.POST)
```

#### 1.3 @DeleteMapping

相当于:

``` java
@RequestMapping(method=HttpMethod.DELETE)
```

#### 1.4 @GetMapping

相当于:

``` java
@RequestMapping(method=RequestMethod.GET)
```

### 二、@RequestBody

@RequestBody在处理请求方法的参数列表中使用，它可以将请求主体中的参数绑定到一个对象中，请求主体参数是通过HttpMessageConverter传递的，根据请求主体中的参数名与对象的属性名进行匹配并绑定值。

### 三、@ResponseBody

@ResponseBody会自动将控制器中方法的返回值写入到HTTP响应中。特别的，@ResponseBody注解只能用在被@Controller注解标记的类中。如果在被@RestController标记的类中，则方法不需要使用@ResponseBody注解进行标注。@RestController相当于是@Controller和@ResponseBody的组合注解。

示例

```java
@ResponseBody
@GetMapping("/user/{id}")
public Role findByUserId(@PathVariable long id) {
    User user = userService.findOne(id);
    return user;
}
```



### 四、@ExceptionHandler

@ExceptionHander注解用于标注处理特定类型异常类所抛出异常的方法。当控制器中的方法抛出异常时，Spring会自动捕获异常，并将捕获的异常信息传递给被@ExceptionHandler标注的方法。

### 五、@PathVariable

@PathVariable注解是将方法中的参数绑定到请求URI中的模板变量上。可以通过@RequestMapping注解来指定URI的模板变量，然后使用@PathVariable注解将方法中的参数绑定到模板变量上。

示例：

```java
@GetMapping("/user/{id}")
public Role getUserRole(@PathVariable(name="id") long id) {
    return userRoleService.findByUserId(id);
}
```

模板变量名需要使用()进行包裹，如果方法的参数名与URI模板变量名一致，则在@PathVariable中就可以省略别名的定义。

**提示：如果参数是一个非必须的，可选的项，则可以在@PathVariable中设置require = false**

### 六、@RequestParam

@RequestParam注解用于将方法的参数与Web请求的传递的参数进行绑定。使用@RequestParam可以轻松的访问HTTP请求参数的值。

示例：

```java
@GetMapping
public Role getUserRole(@RequestParam(name="id",defaultValue="0") long id) {
    return userRoleService.findByUserId(id);
}
```

该注解的其他属性配置与@PathVariable的配置相同，特别的，如果传递的参数为空，还可以通过defaultValue设置一个默认值。

### 七、@Controller

@Controller是@Component注解的一个延伸，Spring会自动扫描并配置被该注解标注的类。此注解用于标注Spring MVC的控制器。

示例：

```java
@Controller
@RequestMapping("/api/v1")
public class UserApiController{
    @Autowired
    private UserService userService;
    
    @ResponseBody
    @GetMapping("/user/{id}")
    public Role findByUserId(@PathVariable long id) {
        User user = userService.findOne(id);
        return user;
    }
}
```

### 七、@RestController

此注解相当于@Controller和@ResponseBody的快捷方式。当使用此注解时，不需要再在方法上使用@ResponseBody注解。



