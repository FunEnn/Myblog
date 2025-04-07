---
title: Pinia的使用
date: 2024-07-22 19:46:54
description: 笔记
tags:
 - Vue
---

[toc]

### 1、pinia是什么？

Pinia 是 Vue 的专属状态管理库，它允许你跨组件或页面共享状态。就是和vuex一样的实现数据共享。

Pinia 目前也已经是 vue 官方正式的状态库。适用于 [vue2](https://so.csdn.net/so/search?q=vue2&spm=1001.2101.3001.7020) 和 vue3。可以简单的理解成 Pinia 就是 Vuex5。也就是说， Vue3 项目，建议使用Pinia。

### 2、pinia基本使用

1. 首先先安装依赖

```javascript
npm install pinia
```

2. 在main.js中引入pinia并创建容器挂载到根实例上

```js
//引入stores暴露出的pinia的实例
import pinia from './stores'

createApp(App).use(pinia).mount('#app')
```

3. 创建**stores**文件夹和**index.js**文件（这个文件以后基本不用管了）

```js
import { createPinia } from "pinia";

const pinia = createPinia()

export default pinia
```

4. 在**stores**文件夹下创建**counter.js**文件。这个文件就是存有关counter相关的数据。（类似vuex的模块化）

**defineStore** 是需要传参数的，

- 第一个参数是id，就是一个唯一的值，简单点说就可以理解成是一个命名空间.
- 第二个参数就是一个对象，里面有三个模块需要处理，第一个是 state，第二个是 getters，第三个是 actions。

方法一：*Option Store*

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```

`state` 是 store 的数据 (`data`)，`getters` 是 store 的计算属性 (`computed`)，而 `actions` 则是方法 (`methods`)。

方法二：*Setup Store*

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
```

在 *Setup Store* 中：

- `ref()` 就是 `state` 属性
- `computed()` 就是 `getters`
- `function()` 就是 `actions`

> 注意：返回的函数统一使用useXXX作为命名方案，这是约定的规矩。例如上面的useCounterStore

5. 然后再组件中使用：

```vue
<template>
	<!-- 在页面中直接使用就可以了 不用 .state-->
  <div>展示pinia的counter的count值：{{counterStore.count}}</div>

</template>

<script setup>
// 首先需要引入一下我们刚刚创建的store
import useCounter from '../stores/counter'
// 因为是个方法，所以我们得调用一下
const counterStore = useCounter()

</script>
```

#### 2.1注意Store获取到后不能解构，否则失去响应式

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'
import { computed } from 'vue'

const store = useCounterStore()
// ❌ 这将不起作用，因为它破坏了响应性
// 这就和直接解构 `props` 一样
const { name, doubleCount } = store
name // 将始终是 "Eduardo"
doubleCount // 将始终是 0

setTimeout(() => {
  store.increment()
}, 1000)
// ✅ 这样写是响应式的
// 💡 当然你也可以直接使用 `store.doubleCount`
const doubleValue = computed(() => store.doubleCount)
</script>
```

解决方案：
**pinia提供了一个函数storeToRefs**解决。引用官方API storeToRef 作用就是把结构的数据使用ref做代理。

```vue
<script setup>
import { storeToRefs } from 'pinia'
const store = useCounterStore()
// `name` 和 `doubleCount` 是响应式的 ref
// 同时通过插件添加的属性也会被提取为 ref
// 并且会跳过所有的 action 或非响应式 (不是 ref 或 reactive) 的属性
const { name, doubleCount } = storeToRefs(store)
// 作为 action 的 increment 可以直接解构
const { increment } = store
</script>
```

### 3、State

在 Pinia 中，state 被定义为一个返回初始状态的函数。

#### 3.1、重置state

使用[选项式 API](https://pinia.vuejs.org/zh/core-concepts/#option-stores) 时，你可以通过调用 store 的 `$reset()` 方法将 state 重置为初始值。

在 `$reset()` 内部，会调用 `state()` 函数来创建一个新的状态对象，并用它替换当前状态。

```vue
const store = useStore()

store.$reset()
```

在 [Setup Stores](https://pinia.vuejs.org/core-concepts/#setup-stores) 中，您需要创建自己的 `$reset()` 方法：

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  function $reset() {
    count.value = 0
  }

  return { count, $reset }
})
```

#### 3.2、修改state的数据

**$patch函数修改**

```js
function updateStore(){
    //一个个的修改状态
    // userStore.name = "zimo"
    // userStore.age = 20

    // 一次性修改多个状态
    userStore.$patch({
        name:"zimo",
        age:20
    })
}
```

### 4、Getter

getters 类似于 vue 里面的计算属性，可以对已有的数据进行修饰。不管调用多少次，getters中的函数只会执行一次，且都会缓存。

1. **基本使用**

```js
//定义关于counter的store
import {defineStore} from 'pinia'

const useCounter = defineStore("counter",{
    state:() => ({
        count:66,
    }),
·
    getters:{
        //基本使用
        doubleCount(state) {
            return state.count * 2
        },
    },
})

//暴露这个useCounter模块
export default useCounter
```

2. **一个getter引入另外一个getter**

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    // 自动推断出返回类型是一个 number
    doubleCount(state) {
      return state.count * 2
    },
    // 返回类型**必须**明确设置
    doublePlusOne(): number {
      // 整个 store 的 自动补全和类型标注 ✨
      return this.doubleCount + 1
    },
  },
})
```

3. **getters中用别的store中的数据**

```js
//定义关于counter的store
import {defineStore} from 'pinia'
import useUser from "./user"
const useCounter = defineStore("counter",{
    state:() => ({
        count:66,
    }),

    getters:{
        //基本使用
        doubleCount(state) {
            return state.count * 2
        },
        //一个getter引入另外一个getter
        doubleCountAddTwo(){
            console.log(this);
            //this.是store实例
            return this.doubleCount + 2
        },
        //getters中用别的store中的数据
        showMessage(state){
            console.log(state);
            console.log(this)
            //获取user信息，拿到useUser模块
            const userStore = useUser()
            //拼接信息
            return `name：${userStore.name}--count:${state.count}`
        }
    },
})

//暴露这个useCounter模块
export default useCounter

```

### 5、Action

> **actions 是可以处理同步，也可以处理异步，同步的话相对来说简单一点.actions类似methods**

1. **同步使用**：

```js
export const useCounterStore = defineStore('main', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++
    },
    randomizeCounter() {
      this.count = Math.round(100 * Math.random())
    },
  },
})
```

> 注意：**state的结果是undefined** 所以actions只能通过this访问store。getter的话state和this都能访问。

2. **异步操作使用**：

**在 actions 处理异步的时候呢，我们一般是与 async 和 await 连用。**

```js
    state:() => ({
        count:66,
        list:[]
    }),
	actions:{
        //大概演示这个异步流程
        async axiosData(){
            const res = await fetch("http://-----------------")
            if(code ==200){
                //收到数据保存到store
                this.list = res.data.list
                return "ok"
            }
        }

    }
```

组件使用：

```vue
<template>
      <!-- 遍历store的数据 -->
      <div v-for="item in counterStore.list"></div>
</template>

<script setup>
import useCounter from '../stores/counter'
const counterStore = useCounter()

counterStore.axiosData().then(res =>{
  console.log("成功",res);
})
</script>
```

