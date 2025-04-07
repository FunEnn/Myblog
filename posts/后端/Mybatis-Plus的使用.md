---
title: Mybatis-Plus的使用
date: 2024-08-02 14:16:02
description: 笔记
tags:
 - 后端
---

[toc]

## 1、常用注解

- @TableName：用来指定表名

- @TableId：用来指定表中的主键字段信息

  > IdType枚举：
  >
  > - AUTO：数据库自增长
  > - INPUT：通过set方式自行输入
  > - ASSIGN_ID：分配ID

- @TableField：用来指定表中的普通字段信息

```java
@TableName("tb_user")
public class User {
    @TableId(value="id",type=IdType.AUTO)
    private Long id;
    @TableField("username") //成员变量与数据库字段名不一样
    private String name;
    @TableField("is_married") //成员变量以is开头，且是布尔值
    private Boolen isMarried;
    @TableField("`order`") //成员变量名与数据库关键字冲突
    private Integer order;
    @TableField(exist = false) //成员变量不是数据库字段
    private String address;
}
```

## 2、常见配置

```yaml
mybatis-plus:
  # mapper映射地址
  mapper-locations: classpath:mapper/*.xml
  # 实体类扫描包路径
  type-aliases-package: com.ican.entity
  configuration:
    # sql打印
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
    # 开启驼峰命名
    map-underscore-to-camel-case: true
  global-config:
    db-config:
      # 数据库表前缀
      table-prefix: t_
```

## 3、条件构造器

### 3.1、QueryWrapper

> 专门用于构造查询条件，支持基本的等于、不等于、大于、小于等各种常见操作。它允许你以链式调用的方式添加多个查询条件，并且可以组合使用 `and` 和 `or` 逻辑。

示例：

```java
QueryWrapper<User> wrapper = new QueryWrapper<User>()
    .select("id","username","info","balance")
    .like("username","o")
    .ge("balance",1000);
/* 
select id,username,info,balance from user where username like ? and
balance >= ?
 */
List<User> users = userMapper.selectList(wrapper);
users.forEach(System.out::println);
```

### 3.2 UpdateWrapper

> 用于构造更新条件，可以在更新数据时指定条件。与 QueryWrapper 类似，它也支持链式调用和逻辑组合。使用 UpdateWrapper 可以在不创建实体对象的情况下，直接设置更新字段和条件。

示例：

```java
List<Long> ids = List.of(1L,2L,4L);
UpdateWrapper<User> wrapper = new UpdateWrapper<User>()
    .setSql("balance = balance - 200")
    .in("id",ids);
/*
update user set balance = balance - 200 where id in (1,2,4);
*/
userMapper.update(null,wrapper);
```

### 3.3 LambdaQueryWrapper

> 这是一个基于 Lambda 表达式的查询条件构造器，它通过 Lambda 表达式来引用实体类的属性，从而避免了硬编码字段名。这种方式提高了代码的可读性和可维护性，尤其是在字段名可能发生变化的情况下。

```java
LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<User>()
    .select(User::getId,User::getUsername)
    .like(User::getUsername,"o")
    .ge(User::getBalance,1000);

List<User> users = userMapper.selectList(wrapper);
users.forEach(System.out::println);
```

### 3.4 LambdaUpdateWrapper

> 类似于 LambdaQueryWrapper，LambdaUpdateWrapper 是基于 Lambda 表达式的更新条件构造器。它允许你使用 Lambda 表达式来指定更新字段和条件，同样避免了硬编码字段名的问题。

**同上**

> - eq：用于设置单个字段的相等条件。
> - ne：设置单个字段的不相等条件。
> - gt：设置单个字段的大于条件。
> - ge：单个字段的大于等于条件。
> - lt：设置单个字段的小于条件。
> - le：设置单个字段的小于等于条件。

## 4、自定义SQL

1. 基于Wrapper构造where条件

   ```java
   List<Long> ids = List.of(1L,2L,4L);
   LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<User>()
       .in(User::get,ids);
   userMapper.updateBalanceByIds(nwrapper,amount);
   ```

2. 在mapper方法参数中使用Param注解声明wrapper变量名称，必须是ew

   ```java
   void updateBalanceByIds(@Param("ew") LambdaQueryWrapper<User> wrapper,@Param("amount") int amount);
   ```

3. 自定义SQL

   ```xml
   <update id="updateBalanceByIds">
       update tb_user set balance = balance - #{amount} ${ew.customSqlSegment}
   </update>
   ```

## 5、Service接口

### 5.1、IService接口

> [IService](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-extension/src/main/java/com/baomidou/mybatisplus/extension/service/IService.java) 是 MyBatis-Plus 提供的一个通用 Service 层接口，它封装了常见的 CRUD 操作，包括插入、删除、查询和分页等。通过继承 IService 接口，可以快速实现对数据库的基本操作，同时保持代码的简洁性和可维护性。

基础使用：

- Service层

  ```java
  public interface IUserService extends IService<User>{}
  ```

- Impl层

  ```java
  public class UserServiceImpl extends ServiceImpl<UserMapper,User> implements IUserService{}
  ```

#### save

```java
// 插入一条记录（选择字段，策略插入）
boolean save(T entity);
// 插入（批量）
boolean saveBatch(Collection<T> entityList);
// 插入（批量）
boolean saveBatch(Collection<T> entityList, int batchSize);
```

#### saveOrUpdate

````java
// TableId 注解属性值存在则更新记录，否插入一条记录
boolean saveOrUpdate(T entity);
// 根据updateWrapper尝试更新，否继续执行saveOrUpdate(T)方法
boolean saveOrUpdate(T entity, Wrapper<T> updateWrapper);
// 批量修改插入
boolean saveOrUpdateBatch(Collection<T> entityList);
// 批量修改插入
boolean saveOrUpdateBatch(Collection<T> entityList, int batchSize);
````

#### remove

```java
// 根据 queryWrapper 设置的条件，删除记录
boolean remove(Wrapper<T> queryWrapper);
// 根据 ID 删除
boolean removeById(Serializable id);
// 根据 columnMap 条件，删除记录
boolean removeByMap(Map<String, Object> columnMap);
// 删除（根据ID 批量删除）
boolean removeByIds(Collection<? extends Serializable> idList);
```

#### update

```java
// 根据 UpdateWrapper 条件，更新记录 需要设置sqlset
boolean update(Wrapper<T> updateWrapper);
// 根据 whereWrapper 条件，更新记录
boolean update(T updateEntity, Wrapper<T> whereWrapper);
// 根据 ID 选择修改
boolean updateById(T entity);
// 根据ID 批量更新
boolean updateBatchById(Collection<T> entityList);
// 根据ID 批量更新
boolean updateBatchById(Collection<T> entityList, int batchSize);
```

#### get

```java
// 根据 ID 查询
T getById(Serializable id);
// 根据 Wrapper，查询一条记录。结果集，如果是多个会抛出异常，随机取一条加上限制条件 wrapper.last("LIMIT 1")
T getOne(Wrapper<T> queryWrapper);
// 根据 Wrapper，查询一条记录
T getOne(Wrapper<T> queryWrapper, boolean throwEx);
// 根据 Wrapper，查询一条记录
Map<String, Object> getMap(Wrapper<T> queryWrapper);
// 根据 Wrapper，查询一条记录
<V> V getObj(Wrapper<T> queryWrapper, Function<? super Object, V> mapper);
```

#### list

```java
// 查询所有
List<T> list();
// 查询列表
List<T> list(Wrapper<T> queryWrapper);
// 查询（根据ID 批量查询）
Collection<T> listByIds(Collection<? extends Serializable> idList);
// 查询（根据 columnMap 条件）
Collection<T> listByMap(Map<String, Object> columnMap);
// 查询所有列表
List<Map<String, Object>> listMaps();
// 查询列表
List<Map<String, Object>> listMaps(Wrapper<T> queryWrapper);
// 查询全部记录
List<Object> listObjs();
// 查询全部记录
<V> List<V> listObjs(Function<? super Object, V> mapper);
// 根据 Wrapper 条件，查询全部记录
List<Object> listObjs(Wrapper<T> queryWrapper);
// 根据 Wrapper 条件，查询全部记录
<V> List<V> listObjs(Wrapper<T> queryWrapper, Function<? super Object, V> mapper);
```

#### count

```java
// 查询总记录数
int count();
// 根据 Wrapper 条件，查询总记录数
int count(Wrapper<T> queryWrapper);

//自3.4.3.2开始,返回值修改为long
// 查询总记录数
long count();
// 根据 Wrapper 条件，查询总记录数
long count(Wrapper<T> queryWrapper);
```

