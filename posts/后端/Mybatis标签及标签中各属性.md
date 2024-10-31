---
title: Mybatis常用标签及标签中各属性
date: 2024-07-12 15:59:24
description: 笔记
tags:
 - 后端
---

[toc]

### 一、Mapper标签

Mapper 标签是 Mybatis 中最重要的标签之一，它用于描述 SQL 映射关系。Mapper 标签有以下属性：

1. namespace：指定 Mapper 接口的完整路径名。
2. resultMap：指定结果映射关系，将查询结果映射成 Java 对象。
3. parameterMap：指定参数映射关系，将 Java 对象映射成 SQL 参数。
4. sql：定义可重用的 SQL 片段。
5. insert、update、delete、select：定义对应的 SQL 语句及参数映射关系。

### 二、ResultMap 标签

ResultMap 标签用于描述查询结果集与 Java 对象之间的映射关系。ResultMap 标签有以下属性：

1. id：指定 ResultMap 的唯一标识符。
2. type：指定映射的 Java 对象类型。
3. extends：指定继承的 ResultMap。
4. discriminator：用于多表关联查询时进行分组判断。
5. constructor、id、result、association、collection：用于定义映射关系。

``` xml

<resultMap id="userMap" type="User">
    <id property="id" column="id"/>
    <result property="name" column="name"/>
    <result property="age" column="age"/>
</resultMap>
 
<select id="selectUserById" resultMap="userMap">
    select * from user where id = #{id}
</select>
```

### 三、Sql 标签

Sql 标签用于定义可重用的 SQL 片段，可以在 SQL 映射文件中多次引用。Sql 标签有以下属性：

1. id：指定 Sql 片段的唯一标识符。

2. databaseId：指定 Sql 片段适用的数据库类型。

3. lang：指定 Sql 片段使用的脚本语言。

4. statementType、parameterType、resultType：用于定义 Sql 片段的类型信息。


``` xml

<sql id="userColumns">
    id, name, age
</sql>
 
<select id="getUserById" resultType="com.example.User" parameterType="int">
    SELECT <include refid="userColumns"/> FROM user WHERE id = #{id}
</select>
```

**SQL标签是MyBatis中最常用的标签之一，它用于定义SQL语句，包括增删改查等操作。SQL标签有以下几种：**

#### 3.1 select

select标签用于定义查询语句，可以包含where、order by、group by等子句

``` xml
<select id="selectUserById" resultType="User">
    select * from user where id = #{id}
</select>
```

#### 3.2 insert

insert标签用于定义插入语句，可以插入单条或多条数据

``` xml
<insert id="insertUser" parameterType="User">
    insert into user (name, age) values (#{name}, #{age})
</insert>
```

#### 3.3 update

update标签用于定义更新语句，可以更新单条或多条数据。

``` xml
<update id="updateUser" parameterType="User">
    update user set name = #{name}, age = #{age} where id = #{id}
</update>
```

#### 3.4 delete

delete标签用于定义删除语句，可以删除单条或多条数据

``` xml
<delete id="deleteUserById" parameterType="int">
    delete from user where id = #{id}
</delete>
```

#### 3.5 selectKey

selectKey标签用于在插入数据时获取自动生成的主键值。该标签有多种属性，包括resultType、keyProperty等。

``` xml
<insert id="addUser" parameterType="com.example.User">
    <selectKey resultType="int" keyProperty="id" order="AFTER">
        SELECT LAST_INSERT_ID()
    </selectKey>
    INSERT INTO user (name, age) VALUES (#{name}, #{age})
</insert>
```

### 四、Insert、Update、Delete、Select 标签

Insert、Update、Delete、Select 标签分别对应 SQL 语句中的插入、更新、删除和查询操作。这些标签都有以下属性：

1. id：指定 SQL 语句的唯一标识符。

2. parameterType：指定输入参数类型。

3. resultMap：指定结果映射关系。

4. flushCache、useCache：控制缓存行为。

5. timeout：指定 SQL 执行超时时间。

6. statementType：指定 SQL 类型。

7. keyProperty、keyColumn：仅对插入操作有效，用于获取自动生成的主键值。


### 五、动态SQL标签

动态SQL标签用于根据不同的条件生成不同的SQL语句，可以大大提高代码的复用性和可读性。

#### 5.1 if

if标签用于根据条件生成不同的SQL语句。

```xml
<select id="selectUserByNameAndAge" resultType="User">
    select * from user
    <where>
        <if test="name != null and name != ''">
            and name like concat('%', #{name}, '%')
        </if>
        <if test="age != null">
            and age = #{age}
        </if>
    </where>
</select>
```

#### 5.2 choose、when、otherwise

choose、when、otherwise标签用于根据不同的条件生成不同的SQL语句。

```xml
<select id="selectUserByCondition" resultType="User">
    select * from user
    <where>
        <choose>
            <when test="name != null and name != ''">
                and name like concat('%', #{name}, '%')
            </when>
            <when test="age != null">
                and age = #{age}
            </when>
            <otherwise>
                and 1=1
            </otherwise>
        </choose>
    </where>
</select>
```

#### 5.3 foreach

foreach标签用于循环生成SQL语句。

``` xml
<delete id="deleteUsersByIds" parameterType="List">
    delete from user where id in
    <foreach collection="list" item="id" open="(" separator="," close=")">
        #{id}
    </foreach>
</delete>
```

foreach标签可以用于各种情况，例如：

1.在WHERE子句中使用IN运算符

使用foreach标签来生成逗号分隔的整数列表，并将其插入到查询中：

```xml
SELECT * FROM users WHERE id IN
<foreach collection="ids" item="id" open="(" close=")" separator=",">
    #{id}
</foreach>
```

2.在INSERT语句中使用VALUES子句

使用foreach标签来生成多个VALUES子句，并将它们插入到INSERT语句中：

```xml
INSERT INTO users (name, age) VALUES
<foreach collection="users" item="user" separator=",">
    (#{user.name}, #{user.age})
</foreach>
```

3.在UPDATE语句中使用SET子句

使用foreach标签来生成多个SET子句，并将它们插入到UPDATE语句中：

```xml
UPDATE users SET
<foreach collection="users" item="user" separator=",">
    age = #{user.age}
</foreach>
WHERE id IN
<foreach collection="ids" item="id" open="(" close=")" separator=",">
    #{id}
</foreach>
```

#### 5.4 where、set、trim等标签

这些标签都是用于拼接SQL语句的辅助标签，可以大大提高代码的可读性和可维护性。

where标签用于动态生成WHERE子句，可以根据条件判断是否生成WHERE子句。

```xml
<select id="selectUsers" resultType="User">
  SELECT * FROM users
  <where>
    <if test="id != null">
      AND id = #{id}
    </if>
    <if test="name != null">
      AND name = #{name}
    </if>
  </where>
</select>
```

set标签用于动态生成SET子句，可以根据条件判断是否生成SET子句。

```xml
<update id="updateUser" parameterType="com.example.User">
    UPDATE user
    <set>
        <if test="name != null">
            name = #{name},
        </if>
        <if test="age != null">
            age = #{age},
        </if>
    </set>
    WHERE id = #{id}
</update>
```

### 六、Result 标签

Result 标签用于描述查询结果集中的一列与 Java 对象之间的映射关系。Result 标签有以下属性：

1. property：指定映射到 Java 对象中的属性名。

2. column：指定查询结果集中的列名。

3. jdbcType：指定查询结果集中列的数据类型。

4. typeHandler：指定类型处理器，将查询结果集中列的数据类型转换成 Java 对象或将 Java 对象转换成查询结果集中列的数据类型。

5. select、insert、update、delete：仅对存储过程有效，用于指定输出参数类型和输出参数名称。
