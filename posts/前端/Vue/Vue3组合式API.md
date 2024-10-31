---
title: Vue3组合式API
date: 2024-07-23 19:40:38
description: 笔记
tags:
 - Vue
---

[toc]

### 一、setup选项

#### 1. setup选项的写法和执行时机

写法

```vue
<script>
    export default {
      setup(){
        
      },
      beforeCreate(){
        
      }
    }
</script>
```

执行时机

> 在beforeCreate钩子之前执行

#### 2. setup中写代码的特点

> 在setup函数中写的数据和方法需要在末尾以对象的方式return，才能给模版使用

```vue
<script>
    export default {
      setup(){
        const message = 'this is message'
        const logMessage = ()=>{
          console.log(message)
        }
        // 必须return才可以
        return {
          message,
          logMessage
        }
      }
    }
</script>
```

#### 3. setup语法糖

> script标签添加 setup标记，不需要再写导出语句，默认会添加导出语句

```vue
<script setup>
    const message = 'this is message'
    const logMessage = ()=>{
      console.log(message)
    }
  </script>
```

### 二、reactive和ref函数

#### 1. reactive

> 接受**对象类型数据**的参数传入并返回一个响应式的对象

```vue
 <script setup>
   // 导入
   import { reactive } from 'vue'
   // 执行函数 传入参数 变量接收
   const state = reactive({
     msg:'this is msg'
   })
   const setSate = ()=>{
     // 修改数据更新视图
     state.msg = 'this is new msg'
   }
</script>
  
  <template>
    {{ state.msg }}
    <button @click="setState">change msg</button>
  </template>
```

#### 2. ref

> 接收**简单类型或者对象类型**的数据传入并返回一个响应式的对象

```vue
 <script setup>
   // 导入
   import { ref } from 'vue'
   // 执行函数 传入参数 变量接收
   const count = ref(0)
   const setCount = ()=>{
     // 修改数据更新视图必须加上.value
     count.value++
   }
  </script>
  
  <template>
    <button @click="setCount">{{count}}</button>
  </template>
```

#### 3. reactive 对比 ref

>1. 都是用来生成响应式数据
>2. **不同点**
>   1. reactive不能处理简单类型的数据
>   2. ref参数类型支持更好，但是必须通过.value做访问修改
>   3. ref函数内部的实现依赖于reactive函数

### 三、computed

> 计算属性基本思想和Vue2保持一致，组合式API下的计算属性只是修改了API写法

```vue
  <script setup>
  // 导入
  import {ref, computed } from 'vue'
  // 原始数据
  const count = ref(0)
  // 计算属性
  const doubleCount = computed(()=>count.value * 2)
  
  // 原始数据
  const list = ref([1,2,3,4,5,6,7,8])
  // 计算属性list
  const filterList = computed(() => {
     return list.value.filter(item => item > 2)
  })
  </script>
```

### 四、watch

> 侦听一个或者多个数据的变化，数据变化时执行回调函数，俩个额外参数 **immediate**控制立刻执行，**deep**开启深度侦听

#### 1. 侦听单个数据

```vue
<script setup>
    // 1. 导入watch
    import { ref, watch } from 'vue'
    const count = ref(0)
    // 2. 调用watch 侦听变化
    watch(count, (newValue, oldValue)=>{
      console.log(`count发生了变化，老值为${oldValue},新值为${newValue}`)
    })
  </script>
```

#### 2. 侦听多个数据

> 侦听多个数据，第一个参数可以改写成数组的写法

```vue
  <script setup>
    // 1. 导入watch
    import { ref, watch } from 'vue'
    const count = ref(0)
    const name = ref('cp')
    // 2. 调用watch 侦听变化
    watch([count, name],([newCount, newName],[oldCount,oldName])=>{
      console.log(`count或者name变化了，[newCount, newName],[oldCount,oldName])
    })
  </script>
```

#### 3. immediate

> 在侦听器创建时立即出发回调，响应式数据变化之后继续执行回调

```vue
<script setup>
    // 1. 导入watch
    import { ref, watch } from 'vue'
    const count = ref(0)
    // 2. 调用watch 侦听变化
    watch(count, (newValue, oldValue)=>{
      console.log(`count发生了变化，老值为${oldValue},新值为${newValue}`)
    },{
      immediate: true
    })
  </script>
```

#### 4. deep

> 通过watch监听的ref对象默认是浅层侦听的，直接修改嵌套的对象属性不会触发回调执行，需要开启deep

```vue
<script setup>
    // 1. 导入watch
    import { ref, watch } from 'vue'
    const state = ref({ count: 0 })
    // 2. 监听对象state
    watch(state, ()=>{
      console.log('数据变化了')
    })
    const changeStateByCount = ()=>{
      // 直接修改不会引发回调执行
      state.value.count++
    }
  </script>

<script setup>
    // 1. 导入watch
    import { ref, watch } from 'vue'
    const state = ref({ count: 0 })
    // 2. 监听对象state 并开启deep
    watch(state, ()=>{
      console.log('数据变化了')
    },{deep:true})
    const changeStateByCount = ()=>{
      // 此时修改可以触发回调
      state.value.count++
    }
  </script>
```

#### 5. 精准监听

```vue
<script setup>
    // 1. 导入watch
    import { ref, watch } from 'vue'
    const state = ref({ count: 0 })
    // 2. 监听对象state 并开启deep
    watch(
        ()=>state.value.count,
        ()=>{
      console.log('数据变化了')
    })
    const changeStateByCount = ()=>{
      // 此时修改可以触发回调
      state.value.count++
    }
  </script>
```

### 五、生命周期函数

#### 1. 选项式对比组合式

|        选项式API         |    组合式API    |
| :----------------------: | :-------------: |
| **beforeCreate/created** |    **setup**    |
|       beforeMount        |  onBeforeMount  |
|         mounted          |    onMounted    |
|       beforeUpdate       | onBeforeUpdate  |
|         updated          |    onUpdated    |
|      beforeUnmount       | onBeforeUnmount |

#### 2. 生命周期函数基本使用

> 1. 导入生命周期函数
> 2. 执行生命周期函数，传入回调

```vue
 <scirpt setup>
  import { onMounted } from 'vue'
  onMounted(()=>{
    // 自定义逻辑
  })
  </script>
```

#### 3. 执行多次

> 生命周期函数执行多次的时候，会**按照顺序依次执行**

### 六、模版引用

概念：通过 **ref标识** 获取真实的 **dom对象或者组件实例对象**

#### 1. 基本使用

> 实现步骤：
>
> 1. 调用ref函数生成一个ref对象
> 2. 通过ref标识绑定ref对象到标签

```vue
<script setup>
import { ref } from 'vue'

const h1Ref = ref(null)
</script>

<template>>
<!-- 通过ref标识绑定ref对象 -->
	<h1 ref="h1Ref">
        我是dom标签h1
    </h1>
</template>
```

#### 2. defineExpose

> 默认情况下在 <script setup>语法糖下组件内部的属性和方法是不开放给父组件访问的，可以通过**defineExpose编译宏**指定哪些属性和方法容许访问

示例：指定testMessage属性可以被访问到 

```vue
<script setup>
import { ref } from 'vue'

const testMessage = ref('msg')
defineExpose({
    testMessage
})
</script>
```

### 七、组件通信

#### 1. props

> **props**是实现父组件向子组件传递信息，props的数据是**只读的**。

父组件：通过动态传值的方式给子组件传递数据。

```vue
<script setup lang="ts">
// 导入子组件
import Child from './ChildView.vue'
import { ref } from 'vue';
 
const money = ref();
const onMoney = () => {
    money.value = 9999;
}
</script>
 
<template>
    <div class="box">
        <h1>我是父组件</h1>
        <button @click="onMoney">给儿子钱</button>
        <hr />
        <Child :money="money"></Child>
    </div>
</template>
 
<style scoped>
    
</style>
```

子组件：需要使用到**defineProps**方法去接受父组件传递过来的数据。

```vue
<script setup lang="ts">
//defineProps是Vue3提供方法,可以不需要引入直接使用
const { money } = defineProps(['money']);
 
</script>
 
<template>
  <div class="box">
    <h2>我是子组件</h2>
    <p>父亲给我的钱：{{ money ? money : 0 }}元</p>
  </div>
</template>
 
<style scoped>

</style>
```

#### 2. emit

> **emit**方式是Vue3中最常见的组件通信方式，该方式用于子组件向父组件传递信息。**子组件触发事件,父组件监听该事件并更新数据**

子组件：

```vue
<script setup lang="ts">
const emits = defineEmits(['enter']);
// 点击事件
const handleBtn = () => {
  // 第一个参数：子组件要传递的事件名称
  // 第二个参数：子组件要传递的数据
  emits('enter', '我是子组件参数');
}
</script>
 
<template>
  <div class="box">
    <h2>我是子组件</h2>
    <button @click="handleBtn">点击我</button>
  </div>
</template>
 
<style scoped lang="scss">

</style>
```

父组件：

```vue
<script setup lang="ts">
// 导入子组件
import Child from './ChildView.vue'
import { ref } from 'vue';
 
const message = ref("");
const handleEnter= (item: string) => {
    message.value = item;
};       
</script>
 
<template>
    <div class="box">
        <h1>我是父组件</h1>
        <p style="color:#fff;">{{ message }}</p>
        <hr />
        <!-- enter 是子组件要传递的事件名称,handleEnter 是监听到之后执行的事件 -->
        <Child @enter="handleEnter"></Child>
    </div>
</template>
 
<style scoped>

</style>
```

#### 3. provide/inject

> **provide**和**inject**是Vue中提供的一对API**（`provide`和`inject`是成对出现的）**，该API可以实现隔辈组件通信**（父传子或者祖孙传值）**，无论层级有多深，都可以通过这对API实现。

- provide：在顶层组件中可以通过 provide 提供需要向后代组件传送的信息。
- inject：从顶层组件到该组件无论嵌套多少层都可以直接用 inject 拿到顶层组件传送的信息。

顶层组件：

```vue
<script setup lang="ts">
// 导入后代组件
import Child from './ChildView.vue'
import { ref, provide } from 'vue'
 
const list = ref(['JavaScript', 'HTML', 'CSS']);
// 向后代组件提供数据
provide('list', list.value)
</script>
 
<template>
    <div class="box">
        <h1>我是顶层组件</h1>
        <hr />
        <!-- 后代组件 -->
        <Child></Child>
    </div>
</template>
 
<style scoped>

</style>
```

后代组件：

```vue

<script setup lang="ts">
import { inject } from 'vue'
// 接受顶层组件提供的数据
const list = inject('list');
</script>
 
<template>
  <div class="box">
    <h2>我是后代组件</h2>
    <ul>
      <p>这是顶层组件传过来的数据</p>
      <li v-for="i in list" :key="i">{{ i }}</li>
    </ul>
  </div>
</template>
 
<style scoped lang="scss">

</style>
```

#### 4. Refs

> **Refs**提供了一个简单的方法可以获取真实的DOM节点，也可以获取子组件实例的VC，以便在Vue组件中进行操作和处理。

父组件：

```vue
<script setup lang="ts">
// 导入子组件
import Child from './ChildView.vue'
import { ref } from 'vue'
 
const childRefs = ref(null);
</script>
 
<template>
    <!-- 父组件 -->
    <div class="box">
        <h2>我是父组件</h2>
        <!-- 父组件中可以在通过refName?.属性名的方式使用子组件中数据 -->
        <div>
            {{ childRefs?.list }}
        </div>
        <hr>
        <!-- 子组件 -->
        <!-- ref的值与标签中的值保持一致 -->
        <Child ref="childRefs"></Child>
    </div>
</template>
 
<style scoped lang="scss">

</style>
```

子组件：

```vue
<script setup lang="ts">
import { ref, defineExpose } from 'vue'
const list = ref(['张三', '李四', '王五', '赵六']);
 
// 向父组件暴露数据
defineExpose({ list });
</script>
 
<template>
  <div class="box">
    <h2>我是子组件</h2>
  </div>
</template>
 
<style scoped lang="scss">
    
</style>
```

> 但是需要注意，如果想让父组件获取子组件的数据或者方法需要通过 `defineExpose` 对外暴露，因为 `Vue3` 中组件内部的数据对外“关闭的”，外部不能访问。

### 八、Vue3.3 新特性-defineOptions

> 顾名思义，主要是用来定义 Options API 的选项。可以用 defineOptions 定义任意的选项， props, emits, expose, slots 除外（因为这些可以使用 defineXXX 来做到）

```vue
<script setup>
defineOptions({
    name: 'Foo',
    // ...更多自定义属性
})
</script>
```

### 九、Vue3.3新特性-defineModel

> 在Vue3中，自定义组件上使用**v-model,** 相当于传递一个**modelValue**属性，同时触发 **update:modelValue** 事件

```vue
<Chile v-model="isVisible"></Chile>
// 相当于
<Chile :modelValue="isVisible" @update:modelValue="isVisible=$event"></Chile>
```

> 我们需要先定义 props，再定义 emits 。其中有许多重复的代码。如果需要修改此值，还需要手动调用 emit 函数。
>
> 于是乎 defineModel 诞生了

```vue
<script setup>
const modelValue = defineModel()
modelValue.value++
</script>
```

生效需要配置 vite.config.js

```js
 
  import { fileURLToPath, URL } from 'node:url'
  
  import { defineConfig } from 'vite'
  import vue from '@vitejs/plugin-vue'
  
  // https://vitejs.dev/config/
  export default defineConfig({
    plugins: [
      vue({
        script: {
          defineModel: true
        }
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  })
```

