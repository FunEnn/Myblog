---
title: 异步函数async和await的用法
date: 2024-06-20 15:27:04
description: 笔记
tags:
 - JavaScript
---

## 定义

>  - **async 是异步的意思，await则可以理解为 async wait。所以可以理解async就是用来声明一个异步方法，而 await是用来等待异步方法执行**
>
>  - async作为一个关键字放在函数前面，表示该函数是一个异步函数，异步函数意味着该函数的执行不会阻塞后面代码的执行；而 await 用于等待一个异步方法执行完成；
>  - await 等待一个 Promise 对象，如果 Promise的状态变成了 resolve 或者 rejcet，那么 async函数会恢复执行。并会阻塞该函数内后面的代码。

## 关于async

**async 是一个通过异步执行并隐式返回 Promise 作为结果的函数**。

&emsp;&emsp;async 函数返回的是一个promise 对象，并且Promise还有state和result，`如果async函数中有返回值，当调用该函数时，内部会调用Promise.resolve()方法把它转化成一个promise对象作为返回，`

``` javascript
 async function timeout() {
     return 'hello world!'
 }
 timeout()
 console.log('我虽然在后面，但是先执行')
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/db0b4106416e4a15b50478b77d506687.png)

**那么要想获取到async 函数的执行结果，就要调用promise的then 或 catch 来给它注册回调函数**

``` javascript
  async function timeout() {
      return 'hello world!'
    }
    timeout().then(val => {
      console.log(val)
    })
    console.log('我虽然在后面，但是先执行')
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/46c2e71c22be45c4918fa8b93adeb42e.png)

另外，`async`函数返回一个`promise`对象，下面两种方法是等效的

``` javascript
// 方法1
function f() {return Promise.resolve('TEST');
}// asyncF is equivalent to f!

// 方法2
async function asyncF() {return 'TEST';
}
```

---

## 关于await

await关键字只能放到async函数里面。

### 1) await 到底在等啥?

&emsp;&emsp;`await不仅仅用于等Promise对象，还可以等任意表达式，所以await后面实际是可以接普通函数调用或者直接量的，**不过我们更多的是放一个返回promise 对象的表达式。他等待的是promise对象执行完毕，并返回结果。`**

``` javascript
//所以下面这个示例完全可以正确运行
    function getSomething () {
      return 'something'
    }
    async function testAsync () {
      return Promise.resolve('hello async')
    }
    async function test () {
      const v1 = await getSomething()
      const v2 = await testAsync()
      console.log(v1, v2)
    }
    test()
```

### 2) await 等到了要等的，然后呢?

> - **如果它等到的是一个Promise对象，`它会阻塞函数后面的代码`，等着Promise对象resolve/reject，然后得到resolve/reject的值，作为await表达式的运算结果。**
> - **如果 await 等待的是一个非 Promise 对象，那么V8 会隐式地将该对象包装成一个已经 resolve 的 Promise 对象.**

### 3) async/await 作用

做个简单的比较

用 setTimeout 模拟耗时的异步操作，先来看看不用 async/await 会怎么写

``` javascript
function takeLongTime () {
      return new Promise(resolve => {
        setTimeout(() =>
          resolve('long_time_value'), 1000
        )
      })
    }
takeLongTime().then(val => {
   console.log(val, 'val')
})
```

如果改用 async/await ，会是这样

``` javascript
    function takeLongTime () {
      return new Promise(resolve => {
        setTimeout(() =>
          resolve('long_time_value'), 1000
        )
      })
    }
     async function test () {
      let v = await takeLongTime()
      console.log(v, 'v')
    }
    test()
```

### 4) await 优势在于处理 then 链，使代码看起来像同步代码一样

现在写一个函数，让它返回promise 对象，该函数的作用是2s 之后让数值乘以2

``` javascript
// 2s 之后返回双倍的值
function doubleAfter2seconds (num) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(num * 2)
        }, 2000)
      })
    }
```

现在再写一个async 函数，从而可以使用await 关键字， await 后面放置的就是返回promise对象的一个表达式，所以它后面可以写上 doubleAfter2seconds 函数的调用

``` javascript
async function testResult() {
    let result = await doubleAfter2seconds(30);
    console.log(result); //2s后打印60
}
testResult();
```

> **代码的执行过程**
>
> 调用testResult 函数，它里面遇到了await, await 表示等待，代码就暂停到这里，不再向下执行了，它等待后面的promise对象执行完毕，然后拿到promise resolve 的值并进行返回，返回值拿到之后，它继续向下执行。

---

> 这里强调一下，当js引擎在等待promise.resolve的时候，他并没有真正的暂停工作，它可以处理其他的一些事情，如果我们在testResult函数后面继续执行其他代码，比如console.log一下，会发现console.log代码先执行。

``` javascript
async function testResult() {
    let first = await doubleAfter2seconds(30);
    let second = await doubleAfter2seconds(50);
    let third = await doubleAfter2seconds(30);
    console.log(first + second + third);
}
testResult()
console.log('我先执行！！！')
```

先输出 “我先执行！！！”，6s后输出计算结果。

![img](https://img-blog.csdnimg.cn/cb98f9a06d784089997ab97309a07583.png)

## 总结

>1. **Promise 的编程模型依然充斥着大量的 `then` 方法，虽然解决了`回调地狱`的问题，但是在语义方面依然存在缺陷，代码中充斥着大量的 `then` 函数，这就是 async/await 出现的原因。**
>
>2. **async 函数**
>     1)async 是一个通过`异步执行`并`隐式返回 Promise` 作为结果的函数。
>     2)Promise对象的结果由async函数执行的返回值决定
>
>3. **await 表达式**
>
>   1)正常情况下，await右侧的表达式一般为 `promise对象` , 但也可以是其它的值
>   2)如果表达式是promise对象，它会阻塞函数后面的代码，`等着Promise对象resolve/reject，然后得到resolve/reject的值`，作为await表达式的运算结果。
>   3)如果 await 等待的是一个非 Promise 对象，那么V8 会隐式地将该对象包装成一个已经resolve 的 `Promise` 对象。
>
>4. **在使用`await`的时候我们只是暂停了函数，而非整段代码。这里经常会是容易犯错的地方。**
>
>5. async和await是`非阻塞的`
>
>6. **注意**
>     1)`await`必须写在`async`函数中, 但async函数中可以没有await
>     2)如果await的promise失败了, 就会抛出异常, 需要通过`try…catch`来捕获处理

