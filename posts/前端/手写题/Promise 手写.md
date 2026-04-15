---
title: Promise 手写
date: 2026-03-10 22:38:04
description: 笔记
tags:
 - 前端手写题
---



原文：[异步与设计模式（12题）](https://www.yuque.com/jerry-xazqf/avr9hr/xxmrptp4lq6uw3gb?singleDoc#ADOMp)

[toc]

## 1. Promise 完整实现

### 推导链

Q1: Promise 是什么？
→ 状态机：pending → fulfilled/rejected，不可逆
→ 需要：state、value、callbacks[]

Q2: resolve/reject 干嘛？
→ 改状态 + 存值 + 执行所有等待的回调
→ 为什么要 callbacks？因为 then 可能在 pending 时调用

Q3: then 为什么能链式调用？
→ 返回新 Promise
→ 新 Promise 的 resolve/reject 由上一个 then 的返回值决定

Q4: then 的返回值怎么处理？
→ 普通值：直接 resolve(result)
→ Promise：result.then(resolve, reject) 等它完成

Q5: 为什么要 setTimeout？
→ 规范要求 then 回调异步执行

Q6: 透传是什么？
→ .then().then(v => ...) 值要能传下去
→ 默认 v => v 和 e => { throw e }

### 代码

```javascript
class MyPromise {
    constructor(executor) {
        this.state = 'pending';
        this.value = undefined;
        this.callbacks = [];

        const resolve = (val) => {
            if(this.state !== 'pending') return;
            this.state = 'fulfilled';
            this.value = val;
            this.callbacks.forEach(cb => cb.onFulfilled());
        }

        const reject = (val) => {
            if(this.state !== 'pending') return;
            this.state = 'rejected';
            this.value = val;
            this.callbacks.forEach(cb => cb.onRejected());
        }

        try {
            executor(resolve,reject);
        } catch (e) {
            reject(e);
        }
    }

    then(onFulfilled,onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
        onRejected = typeof onRejected === 'function' ? onRejected : e => { throw e }

        return new MyPromise((resolve, reject) => {
            const handle = (callback) => {
                try {
                    const result = callback(this.value);
                    result instanceof MyPromise ? result.then(resolve,reject) : resolve(result);
                } catch (e) {
                    reject(e)
                }
            }

            if(this.state === 'fulfilled') return setTimeout(() => handle(onFulfilled));
            if(this.state === 'rejected') return setTimeout(() => handle(onRejected));

            this.callbacks.push({
                onFulfilled: () => setTimeout(() => handle(onFulfilled)),
                onRejected: () => setTimeout(() => handle(onRejected))
            })
        })
    }

    catch(onRejected) {
        return this.then(null,onRejected);
    }

    static resolve(v) {
        return v instanceof MyPromise ? v : new MyPromise(r => r(v));
    }
    static reject(e) {
        return new MyPromise((_,r) => r(e))
    }
}

//测试
const p1 = new MyPromise((resolve,reject) => {
    setTimeout(() => {
        resolve('成功')
    },1000)
})

p1.then(res => {
    console.log('p1: ', res);
})
```

## 2. Promise.all

### 推导链

Q1: all 干嘛？→ 全部成功才成功，一个失败就失败
Q2: 怎么知道全部完成？→ 计数器 finished === total
Q3: 结果顺序？→ results[index] 按索引存

### 代码

```javascript
Promise.myAll = function(promises) {
    return new Promise((resolve,reject) => {
        const results = [];
        let count = 0;
        const arr = Array.from(promises);
        
        if(arr.length === 0) return resolve([]);
        
        arr.forEach((p,i) => {
            Promise.resolve(p).then(value => {
                results[i] = value;
          		count++;
          		if (count === promises.length) resolve(results);
            }, reject);
        });
    });
}

// 测试
Promise.myAll([Promise.resolve(1), Promise.resolve(2), 3]).then(console.log) // [1,2,3]
Promise.myAll([Promise.resolve(1), Promise.reject('err')]).catch(console.log) // 'err'
```

## 3. Promise.race

### 推导链

Q1: race 干嘛？→ 谁先完成用谁（无论成功失败）
Q2: 怎么实现？→ 每个都 .then(resolve, reject)，第一个触发后状态锁定

### 代码

```javascript
Promise.myRace = function(promises) {
    return new Promise((resolve,reject) => {
      promises.forEach(p => {
        Promise.resolve(p).then(resolve, reject);
      });
    })
}

// 测试
Promise.myRace([
  new Promise(r => setTimeout(() => r('slow'), 200)),
  new Promise(r => setTimeout(() => r('fast'), 100))
]).then(console.log) // 'fast'
```

## 4. Promise.any

### 推导链

Q1: 和 race 区别？→ 第一个成功的，全失败才失败
Q2: 全失败返回什么？→ AggregateError

### 代码

```javascript
Promise.myAny = function(promises) {
    return new Promise((resolve,reject) => {
        const errors = [];
        let rejected = 0;
        const arr = Array.from(promises);
        
        if(arr.length === 0) return reject(new AggregateError([], 'All promises were rejected'))
        
        arr.forEach((p,i) => {
            Promise.resolve(p).then(resolve, reason => {
                errors[i] = reason;
                rejected++;
                if(rejected === arr.length) {
                    reject(new AggregateError([], 'All promises were rejected'))
                }
            });
        });
    });
}

// 测试
Promise.myAny([Promise.reject(1), Promise.resolve(2)]).then(console.log) // 2
Promise.myAny([Promise.reject(1), Promise.reject(2)]).catch(e => console.log(e.errors)) // [1,2]
```

