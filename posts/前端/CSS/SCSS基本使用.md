---
title: SCSS基本使用
date: 2024-07-26 22:38:04
description: 笔记
tags:
 - CSS
---

[toc]

Sass就是css的[预处理器](https://so.csdn.net/so/search?q=预处理器&spm=1001.2101.3001.7020)，Scss是Sass3版本中引入的新语法特性

安装：

`npm i -S node-sass sass-loader`

使用：

```scss
<style lang="scss" scoped>
</style>
```

## 1、变量 $

使用$符号去声明一个变量，给同一个变量再次赋值时，后赋值的会替换先赋值的

```vue
<style lang="scss" scoped>
	$base-color: red;
    .main {
        color: $base-color;
    }    
</style>
```

可以在变量的结尾添加 `!default` 给一个未通过 `!default` 声明赋值的变量赋值，此时，如果变量已经被赋值，不会再被重新赋值，但是如果变量还没有被赋值，则会被赋予新的值。

示例：

```vue
<style lang="scss" scoped>
	$base-color: red;
    $base-color: red; !default
    .main {
        color: $base-color;
    }    
</style>
```

## 2、嵌套

在嵌套的代码块内，可以使用&引用父元素。比如a:hover伪类，可以写成：

```scss
a {
    &:hover {color: red;}
}
```

## 3、继承 @extend 

SASS允许一个选择器，继承另一个选择器。使用@extend 

示例：

```scss
.main {
    @extend .class1;
}
.class1 {
    background-color: blue;
}
```

## 4、混入 **@mixin 、**@include

Mixin是可以重用的代码块。使用**@mixin**命令，定义一个代码块，使用**@include**命令，调用这个mixin。

```scss
@mixin mycss {
    color: red;
}
.main {
    @include myscss;
}
```

还可以指定参数

```scss
@mixin mycss($mycolor) {
    color: $mycolor;
}
.main {
    @include myscss(red);
}
```

## 5、引入外部文件

**@import**

```vue
@import "@/scss/index.scss";
```

**Partials**
如果需要导入 SCSS  文件，但又不希望将其编译为 CSS，只需要在文件名前添加下划线，这样会告诉 Sass 不要编译这些文件，但导入语句中却不需要添加下划线。

例如，将文件命名为 _color.scss，便不会编译成 _color.css 文件。

@import "color.scss" 导入的其实是 _colors.scss 文件

> 注意，不可以同时存在添加下划线与未添加下划线的同名文件，否则添加下划线的文件将会被忽略。

## 6、！default，！global

！default上面已经介绍到了，可以把它理解成为一个备胎。

！global就是可以将变量提升为全局变量。不到万不得已，不要用它，因为它很简单粗暴，直接破坏了作用域规则，影响全局

## 7、语句

### 7.1 条件语句 @if,@else if,@else

```scss
.main {
    @if 1==2 {
        color: blue;
    } @else if 3>5 {
        color: red;
    } @else {
        color: yellow;
    }
}
```

### 7.2 循环语句 @for @while @each

**for循环**

```scss
@for $i from <start> through <end>
@for $i from <start> to <end>
```

- $i 表示变量
- start 表示起始值
- end 表示结束值

> 这两个的区别是关键字 through 表示包括 end 这个数，而 to 则不包括 end 这个数。

示例：

```scss
 
 @for $i from 1 to 3 {
        .item-#{$i} {
            width: 100px;
            height: 100px;
            border : #{$i}px solid #f00;
        }
    }
//最终编译为：
.item-1 {
            width: 100px;
            height: 100px;
            border : 1px solid #f00;
        }
.item-2 {
            width: 100px;
            height: 100px;
            border : 2px solid #f00;
        }
```

**while循环**

只要@while后面的条件为true就会执行，直到表达式值为false时停止循环；

```scss
    $m : 2;
 
    @while $m >0 {
        .item-#{$m} {
            width: 100px * $m ;
            height: 100px;
            background-color: aquamarine;
        }
 
        $m : $m - 1;
    }
//最终编译为：
 .item-#2 {
            width: 100px * 2 ;
            height: 100px;
            background-color: aquamarine;
        }
  .item-#1 {
            width: 100px * 1 ;
            height: 100px;
            background-color: aquamarine;
        }
```

**each 语法**

```scss
 
    @each $item in item-1,
    item-2 {
        //$item就是遍历了in关键词后面的类名列
        .#{$item} {
            background-color: purple;
        }
    }
 
    //会编译成 .item-1, .item-2 {background-color:purple;}
```

## 8、自定义函数 @function

```scss
@function double($n) {
    @return $n * 2;
}
.main {
    span {
        font-size: double(20px);
    }
}
```

## 9、颜色函数

>  color: **lighten**(green, 10%);表示绿色变浅10%
>
>  color: **darken**(green, 10%); 表示绿色加深10%

## 10、占位符 %

> 使用% 声明的代码块，如果不被@extend调用的话就不会被编译。编译出来的代码会将相同的代码合并在一起，代码变得十分简洁。

```scss
 
 %m5 {
        background-color: rgb(12, 174, 228);
    }
 
    .div3 {
        @extend %m5;
    }
```

