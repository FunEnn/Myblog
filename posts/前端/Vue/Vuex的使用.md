---
title: Vuex的使用
date: 2024-07-21 13:48:04
description: 笔记
tags:
 - Vue
---

[toc]

### 一、Vuex是什么？

> ####  vuex官方解释
>
> Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式 + 库**。它采用集中式[存储管理](https://so.csdn.net/so/search?q=存储管理&spm=1001.2101.3001.7020)应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

**vuex就是把组件共享状态抽取出来以一个全局单例模式管理，把共享的数据函数放进vuex中，任何组件都可以进行使用。**

### 二、安装

**npm 或 Yarn安装**

```
npm install vuex@next --save
```

```
yarn add vuex@next --save
```

### 三、配置

store文件->index.js，进行如下配置，在main.js中进行引入

```js

import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex)
 
export default new Vuex.Store({
  //数据，相当于data
  state: {
    
  },
  getters: {
    
  },
  //里面定义方法，操作state方发
  mutations: {
    
  },
  // 操作异步操作mutation
  actions: {
    
  },
  modules: {
    
  },
})
```

### 四、核心概念

> vuex中一共有五个状态 State Getter Mutation  Action  Module

#### 4.1 State

> 提供唯一的公共数据源，所有共享的数据统一放到store的state进行储存，相似与data

 在vuex中state中定义数据，可以在任何组件中进行调用

```js
import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex)
 
export default new Vuex.Store({
  //数据，相当于data
  state: {
    name:"张三",
    age:12,
    count:0
  },
})
```

 **调用：**

方法一：

在标签中直接使用

```vue
<p>{{ $store.state.name }}</p>
<p>{{ $store.state.age }}</p>
```

 方法二：

```
this.$store.state.全局数据名称
```

方法三：

从vuex中按需导入mapstate函数

```js
import { mapState } from "vuex";
```

**当前组件需要的全局数据，映射为当前组件computed属性**

```js
computed: {
	...mapState(["name","age","sex"]),
}
```

#### 4.2 Mutation

> 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的**事件类型 (type)和一个回调函数 (handler)**。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：
>

 **在vuex中定义：**

其中参数state参数是必须的，也可以自己传递一个参数，如下代码，进行计数器的加减操作，加法操作时可以根据所传递参数大小进行相加，减法操作没有传参每次减一

```js

import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex)
 
export default new Vuex.Store({
  //数据，相当于data
  state: {
    name:"张三",
    age:12,
    count:0
  },
  getters: {
    
  },
  //里面定义方法，操作state方发
  mutations: {
    addcount(state,num){
        state.count = state.count + num
    },
    reduce(state){
        state.count--
    }
  },

})
```

**在组件中使用：**

 定义两个按钮进行加减操作

```vue
<button @click="btn">增加store中的数据</button>
<button @click="btn1">减少store中的数据</button>
```

方法一：

> 注意：使用commit触发Mutation操作

```js
methods:{
    //加法
    btn(){
    	this.$store.commit("addcount",10)     //每次加十
    },
    //减法
    btn1(){
    	this.$store.commit("reduce") 
    }
}
```

方法二：

使用辅助函数进行操作，具体方法同上

```js

methods:{
    ...mapMutations(["addcount","reduce"]),
    //加法
    btn(){
    	this.addcount(10);  //每次加十
    },
    //减法
    btn1(){
    	this.reduce();
    }
}
```

####  4.3 Action ——进行异步操作

> Action和Mutation相似，一般不用Mutation 异步操作，若要进行异步操作，使用Action

**在vuex中定义：**

**将上面的减法操作改为异步操作**

```js
//操作异步操作mutation
actions: {
    asyncAdd(context){
        //异步
        setTimeout(()=>{
            context.commit("reduce")
        },1000);
    }
},
```

**在组件中使用：**

方法一：

直接使用 dispatch触发Action函数

```js
this.$store.dispatch("asyncAdd")
```

方法二：

使用辅助函数

```js
methods:{
    ...mapActions(["asyncAdd"]),
    //减法
    btn2(){
    	this.asyncAdd();
    }
}
```

#### 4.4 Getter

> 类似于vue中的computed，进行缓存，对于Store中的数据进行加工处理形成新的数据

#### 4.5 Modules

> 当遇见大型项目时，数据量大，store就会显得很臃肿
>
> 为了解决以上问题，Vuex 允许我们将 store 分割成**模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：

```js
modules: {
    cityModules: {
        namespaced:true,
        state: {
            cityname: "中国",
        },
        mutations: {
            cityfunction(state){
                state.cityname = "ch"
            }
        }
    },
    userinfo: {
        state: {
            username: "张"
        },
    },
},
```

 默认情况下，模块内部的 action 和 mutation 仍然是注册在全局命名空间的——这样使得多个模块能够对同一个 action 或 mutation 作出响应。

如果希望你的模块具有更高的封装度和复用性，你可以通过添加 `namespaced: true `的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。
