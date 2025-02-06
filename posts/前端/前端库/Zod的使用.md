---
title: Zod的使用
date: 2025-02-06 19:44:29
description: 笔记
tags:
 - 前端库
---

[toc]

## 1、什么是Zod

Zod 是一个 TypeScript 优先的**模式声明和验证库**。用Zod，你只需声明一次验证器，Zod会自动推断出静态TypeScript类型。

## 2、安装

>`pnpm add zod`          # pnpm
>
>`pnpm add zod@canary `         # pnpm

## 3、示例

```ts
import { z } from "zod";

// creating a schema for strings
const mySchema = z.string();

// parsing
mySchema.parse("tuna"); // => "tuna"
mySchema.parse(12); // => throws ZodError

// "safe" parsing (doesn't throw error if validation fails)
mySchema.safeParse("tuna"); // => { success: true; data: "tuna" }
mySchema.safeParse(12); // => { success: false; error: ZodError }
```

```ts
import { z } from "zod";

// 定义用户数据模式
const userSchema = z.object({
  name: z.string(),
  age: z.number().min(0),
  email: z.string().email(),
});

// 创建用户数据
const userData = {
  name: "John Doe",
  age: 30,
  email: "john.doe@example.com",
};

// 验证用户数据
const validationResult = userSchema.safeParse(userData);
if (validationResult.success) {
  console.log("验证成功：", validationResult.data);
} else {
  console.error("验证失败：", validationResult.error);
}
```

`userSchema` 定义了用户数据的结构和类型，`safeParse` 方法用于验证数据是否符合模式。

## 4、Zod 和 TypeScript 的区别

> - TypeScript 的类型检查是在编译阶段完成的。TypeScript 代码在编译时会被转换为纯 JavaScript 代码，类型信息会被移除。
>
> - Zod 的验证是在运行时完成的。这意味着它可以在运行时根据不同的数据进行验证。这使得 Zod 适用于需要动态验证数据的场景，例如表单数据验证。

## 5、Zod基本数据类型

**原始数据类型**

```ts
// primitive values
z.string();
z.number();
z.bigint();
z.boolean();
z.date();
z.symbol();

// empty types
z.undefined();
z.null();
z.void(); // accepts undefined

// catch-all types
// allows any value
z.any();
z.unknown();

// never type
// allows no values
z.never();
```

**对象数据**

```ts
const objectSchema = z.object({
  name: z.string(),
  age: z.number(),
});
console.log(objectSchema.parse({ name: 'hello', age: 18 })); // 验证通过 { name: 'hello', age: 18 } 
```

**数组数据**

```ts
const arraySchema = z.array(z.string());
console.log(arraySchema.parse(['hello', 'world'])); // ['hello', 'world']
console.log(arraySchema.parse(['hello', 123])); // ZodError: Expected string, received number
```

**枚举数据**

```ts
const enumSchema = z.enum(['hello', 'world']);
console.log(enumSchema.parse('hello')); // hello
console.log(enumSchema.parse('hi')); // ZodError: Expected "hello" | "world", received "hi"
```

**元组**

```ts
const tupleSchema = z.tuple([z.string(), z.number()]);
console.log(tupleSchema.parse(['hello', 18])); // ['hello', 18]
console.log(tupleSchema.parse(['hello', 'world'])); // ZodError: Expected number, received string
```

**字典**

```ts
const dictionarySchema = z.record(z.string());
console.log(dictionarySchema.parse({ name: 'hello', age: '18' })); // { name: 'hello', age: '18' }
console.log(dictionarySchema.parse({ name: 123, age: '18' })); // ZodError: Expected string, received number
console.log(dictionarySchema.parse([1, 2, 3])); // ZodError: Expected object, received array
console.log(dictionarySchema.parse('hello')); // ZodError: Expected object, received string
```

**map**

```ts
const mapSchema = z.map(z.string(), z.number());
console.log(mapSchema.parse(new Map([['age', 18]]))); // Map {'age' => 18 }
console.log(mapSchema.parse(new Map([['age', '18']]))); // ZodError: Expected number, received string
```

**set**

```ts
const setSchema = z.set(z.string());
console.log(setSchema.parse(new Set(['hello', 'world']))); // Set {'hello', 'world' }
console.log(setSchema.parse(new Set([1, 2, 3]))); // ZodError: Expected string, received number
```

**嵌套数据**

```ts
const nestedSchema = z.object({
  name: z.string(),
  age: z.number(),
  hobbies: z.array(z.string()),
});
console.log(nestedSchema.parse({ name: 'hello', age: 18, hobbies: ['reading', 'swimming'] })); // 验证通过 { name: 'hello', age: 18, hobbies: ['reading', 'swimming'] }
```

**可选项数据**

```ts
const optionalSchema = z.object({
  name: z.string(),
  age: z.number().optional(),
});
console.log(optionalSchema.parse({ name: 'hello' })); // { name: 'hello' }
console.log(optionalSchema.parse({ name: 'hello', age: 18 })); // { name: 'hello', age: 18 }
```

**可空值**

```ts
const nullableSchema = z.object({
  name: z.string(),
  age: z.number().nullable(),
});
console.log(nullableSchema.parse({ name: 'hello' })); // { name: 'hello' }
console.log(nullableSchema.parse({ name: 'hello', age: null })); // { name: 'hello', age: null }
```

**默认值**

```ts
const defaultSchema = z.object({
  name: z.string(),
  age: z.number().default(18),
});
console.log(defaultSchema.parse({ name: 'hello' })); // { name: 'hello', age: 18 } 
```

## 4、高级用法

**自定义验证器**

```ts
const customSchema = z.custom((value) => typeof value === 'string', 'Expected string, received number');
console.log(customSchema.parse('hello')); // hellos
console.log(customSchema.parse(123)); // ZodError: Expected string, received number
```

**基元的强制转换**

```ts
const schema = z.coerce.string();
schema.parse("tuna"); // => "tuna"
schema.parse(12); // => "12"
```

**数组**
数组至少包含一个元素，请使用 `.nonempty()`

```ts
const nonEmptyStrings = z.string().array().nonempty();

nonEmptyStrings.parse([]); // throws: "Array cannot be empty"
nonEmptyStrings.parse(["Ariana Grande"]); // passes

// .min/.max/.length
z.string().array().min(5); // must contain 5 or more items
z.string().array().max(5); // must contain 5 or fewer items
z.string().array().length(5); // must contain 5 items exactly
```

## 5、Zod的性能优化建议

1. **延迟验证（Lazy Validation）**： 对于大型对象，可以使用`z.lazy()`来延迟验证。这允许你创建一个验证器，该验证器在实际需要时才进行解析，从而提高性能。
2. **部分验证（Partial Validation）**： 使用`z.pick()`或`z.omit()`来只验证需要的字段。这样可以减少不必要的验证操作，提高效率。
3. **缓存模式（Caching Schemas）**： 如果你频繁使用相同的模式，可以考虑缓存它们。这样可以避免重复创建模式实例，减少资源消耗。
4. **异步验证（Asynchronous Validation）**： 对于复杂的验证逻辑，可以考虑使用异步验证器。这样可以避免阻塞主线程，提高应用的响应性。
5. **可区分联合（Discriminated Unions）**： 使用`z.discriminatedUnion`方法来表示可区分联合。这可以使得Zod检查鉴别器键来确定使用哪个模式解析输入，从而提高解析效率，并让Zod报告更友好的错误。
6. **优化错误处理**： 合理配置错误处理，例如使用`.safeParse()`方法来安全地解析数据，并处理可能出现的错误，这样可以减少异常处理的开销。
7. **合理配置和使用策略**： 通过合理的配置和使用策略，可以在保证类型安全的同时，兼顾应用的性能需求。