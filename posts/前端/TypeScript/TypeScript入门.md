---
title: TypeScript入门
date: 2024-11-21 15:31:43
description: 笔记
tags:
 - TypeScript
---

# TypeScript

- **TypeScript**：TS是JavaScript的超集，它引入了静态类型系统，允许开发者为变量、函数参数和返回值指定类型。这有助于在编译时期就发现潜在的类型错误，提高代码的可读性和可维护性。
- **JavaScript**：JS是一种动态类型的语言，变量的类型是在运行时确定的，不需要显式声明变量的类型。

### 什么是动态类型与静态类型?

JavaScript 的类型系统非常弱，而且没有使用限制，运算符可以接受各种类型的值。在语法上，JavaScript 属于动态类型语言。TypeScript 的主要功能是为 JavaScript 添加类型系统，TypeScript 引入了一个更强大、更严格的类型系统，属于**静态类型语言**。

静态类型优点：

- 有利于代码的静态分析
- 有利于发现错误
- 更好的 IDE 支持，做到语法提示和自动补全
- 提供了代码文档
- 有助于代码重构

## 类型定义

#### 基本类型

| 类型        | 描述                             | 示例                                                    |
| :---------- | :------------------------------- | :------------------------------------------------------ |
| `string`    | 表示文本数据                     | `let name: string = "Alice";`                           |
| `number`    | 表示数字，包括整数和浮点数       | `let age: number = 30;`                                 |
| `boolean`   | 表示布尔值 `true` 或 `false`     | `let isDone: boolean = true;`                           |
| `array`     | 表示相同类型的元素数组           | `let list: number[] = [1, 2, 3];`                       |
| `tuple`     | 表示已知类型和长度的数组         | `let person: [string, number] = ["Alice", 30];`         |
| `enum`      | 定义一组命名常量                 | `enum Color { Red, Green, Blue };`                      |
| `any`       | 任意类型，不进行类型检查         | `let value: any = 42;`                                  |
| `void`      | 无返回值（常用于函数）           | `function log(): void {}`                               |
| `null`      | 表示空值                         | `let empty: null = null;`                               |
| `undefined` | 表示未定义                       | `let undef: undefined = undefined;`                     |
| `never`     | 表示不会有返回值                 | `function error(): never { throw new Error("error"); }` |
| `object`    | 表示非原始类型                   | `let obj: object = { name: "Alice" };`                  |
| `union`     | 联合类型，表示可以是多种类型之一 | `let id: string                                         |
| `unknown`   | 不确定类型，需类型检查后再使用   | `let value: unknown = "Hello";`                         |

**重点：为什么需要**`**any**`**和**`**unknow**`**类型**

1. any 用于当前变量允许任何类型，意味着关闭对这个变量的类型检查，这应该是你在无法确定类型时的最后选择。
2. 应用场景
3. 处理来自不同源头、类型不确定的数据
4. 当你需要逐步迁移 JavaScript 代码到 TypeScript 时
5. 赋值：any 类型可以再次被赋值为所有类型，同时也能赋值给所有类型。
6. unknow 用于当一个变量的类型未知时，它要求你必须先执行类型断言或类型守卫，确定其类型之后，才能对该变量执行操作。这增加了类型安全，因为你被迫明确变量的类型，而不是盲目地执行操作。
7. 应用场景
8. 处理动态数据或来自外部源的数据
9. 赋值：`unknow`类型可以再次被赋值为所有类型，但只能赋值给 `any`和`unknow`类型。

> any 和 unknown 区别？
>
> - any 类型是一种“逃脱类型检查”的类型。当一个变量被声明为 any 类型时，你可以对它进行任何操作，包括调用任意属性或方法，而不会收到 TypeScript 编译器的任何错误提示。
> - unknown 类型表示该变量的类型是未知的，它是一种安全的“多类型”类型。对 unknown 类型的变量进行操作时，**必须进行类型检查或类型断言**（如 typeof），否则 TypeScript 编译器会报错。
> - unknown 可以看作是更安全的 any。一般来说，凡是需要设为 any 类型的地方，通常都应该优先考虑设为 unknown 类型



总而言之，**any 类型和 unknown 类型是 TypeScript 提供的灵活性和兼容性的机制**，用于处理不确定或未知的值。然而，为了提高代码的可靠性和可维护性，**应该尽量避免过度使用 any 类型**，并在能确定类型的情况下使用更具体的类型。而 unknown 类型则提供了更严格的类型安全性，要求进行类型检查和类型断言，以确保类型安全。

#### 引用类型

##### 元组和数组

定长的数组。但使用元组可以帮助我们进一步提升**数组结构的严谨性**，包括基于位置的类型标注、避免出现越界访问等等。

```
const arr1: [string, number ] = ['xiaohe', 18];

console.log(arr1[599]); //长度为“2”的元组类型“[string, string, string]”在索引“599“处没有元素
```

**对象类型**：

```typescript
let person: { name: string; age: number } = { name: "Kimi", age: 30 };
```

**函数类型**：

- 函数在TypeScript中也是引用类型，可以指定函数参数和返回值的类型。

```typescript
let myFunction: (a: number, b: number) => number = (a, b) => a + b;
```

**类和接口**：

- 类和接口用于定义对象的形状，它们也是引用类型

```typescript
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

interface PersonInterface {
  name: string;
  age: number;
}
```

**枚举类型**：

```typescript
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```



#### 装箱类型

##### 装箱

在我们定一个 string 类型时，我们有时候会去访问`substring`方法，有没有想过为什么一个基本类型下面怎么挂载着属性和方法，其实这都归究于 ts 的装箱。

```
var s1 = 'call_me_R'; // 隐式装箱
var s2 = s1.substring(2);

// 隐式装箱当读取一个基本类型值时，后台会创建一个该基本类型所对应的基本包装类型对象。在这个基本类型的对象上调用方法，
// 其实就是在这个基本类型对象上调用方法。这个基本类型的对象是临时的，它只存在于方法调用那一行代码执行的瞬间，执行方法后立即被销毁。
```

##### 装箱类型

![img](https://cdn.nlark.com/yuque/0/2024/png/34717503/1711375600006-75f684cb-f9ad-41be-ada3-f92171ed7ef3.png)

像这样的类似的装箱类型还有 Boolean、Number、String、Symbol 等等。只要在非严格模式下装箱类型都可以赋值为 undefined 、null 、void 0 这个三种超预期的类型，这是我们需要注意的点

#### 内置工具类型

##### 联合类型（｜）

联合类型中是一种允许一个值可以是多种类型的类型系统特性，给项目带来了**灵活性**和**代码复用性**。

```
type ProductType = 'Device' | 'Normal';

function processColor(type: ProductType) {
  // 公共逻辑的处理
  if (type === 'Device') {
    // 执行设备商品逻辑
  } else {
    // 执行普通商品逻辑
  }
}
```

##### 交叉类型（&）

交叉类型允许你将多个类型合并为一个新类型，合理的使用它可以给代码带来它可以给代码带来清晰性和可读性。

在使用交叉类型时需保证两个前提**明确意图**和**保持简洁，**需确保意图是明确的在把多个类型组合在一起时，应该避免创建过于复杂的类型，应该使类型变得更加容易理解。如果交叉类型使得类型定义变得难以阅读或维护，那么可能需要重新考虑下类型的设计。

例如一个很常见的首页金刚位场景为例，前端需要在本地存一份菜单配置类型，但还需要通过后端接口拿到实时计算的进度描述信息、提醒数量等数据配置类型，最终将这**两个模块类型**合并在一起形成最终的结构体：

```js
// 本地配置信息
export interface BaseGoldEntryItemConfig {
  menuCode?: MenuCode;
  /** 菜单名称 */
  title: string;
  /** 描述 */
  desc?: string;
  /** 图标链接 */
  iconUrl: string;
  /** 主题颜色 */
  color?: string;
  /** 点击埋点 */
  eventClickName?: string;
  /** 跳转目标 URL */
  targetUrl?: string;
  /** 子分组菜单 */
  children?: Array<Omit<BaseGoldEntryItemConfig, 'children'>>;
}

// 服务端数据
export interface HomeMenuItem {
  /** 菜单编码 */
  code?: MenuCode;
  /** 菜单名称 */
  name?: string;
  /** 菜单描述 */
  desc?: string;
  /** 是否有菜单权限，默认有 */
  accessFlag?: boolean;
  /** 是否需要展示引导（用户已有培训记录则不需要展示） */
  needGuided?: boolean;
  /** 提示数量 */
  noticeNum?: number
}

export type GoldEntryItemConfig = HomeMenuItem & BaseGoldEntryItemConfig;
```

##### 映射类型（in）

映射类型的主要作用即是**基于键名映射到键值类型**。通常与映射操作符（keyof、in、as const 等）、extends 、索引类型一起使用。

应用场景：

1. 对键名进行修饰

```
type MyObject = { a: number; b: string; c: boolean };
type MyObjectReadonly = { readonly [K in keyof MyObject]: MyObject[K] };
```

2. 结合条件类型生成一个具有含义的新类型

```
type IsString<T> = T extends string ? true : false;
type MyStringType = { [K in keyof string]: IsString<T[K]> };
```

##### 条件类型（extends）

条件类型允许**基于类型系统中的类型条件来创建新类型**，使得类型可以根据某个条件来决定其最终的形式。这种类型的引入极大地增强了 TypeScript 表达力和类型安全性。

```
import { ModalProps } from 'antd';

type Pattern = 'add' | 'edit'

export interface AddOrEditModalProps<T extends Pattern> extends ModalProps {
  type?: T;
  id: T extends 'edit' ? string :never
}
```

##### 模版字符串类型

TypeScript 可以识别模版字符串语法，故有了模版字符串类型

```
type Greet<T extends string | number | boolean | null | undefined | bigint> = `Hello ${T}`;

// 对于模版字符串支持的范型只有 string | number | boolean | null | undefined | bigint
```