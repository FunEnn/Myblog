---
title: Vue基础语法
date: 2024-07-19 21:47:41
description: 笔记
tags:
 - Vue
---

[toc]

### 1.综合

#### 1.1 v-once

后面不需要跟任何表达式
表示元素和组件只渲染一次, 不会随着数据的改变而变化

#### 1.2 v-html

后面往往跟一个string类型
会将string的html解析出来并渲染

#### 1.3 v-text

与Mustache相似, 一般不用, 不灵活

#### 1.4 v-pre

用于跳过这个元素和它子元素的编译过程, 用于显示原本的Mustache语法

#### 1.5 v-cloak

在某些情况下, 我们浏览器可能会直接显示出未编译的Mustache标签

#### 1.6 v-bind

作用: 动态绑定属性
简写: :

### 2.v-on

作用: 绑定事件监听
简写: @

示例：

- 没有参数的情况下, 可以不写(); 如果方法本身有一个参数, 会默认将原生事件event参数传递进去
- 如果传入某个参数, 同时需要event时, 可以通过$event传入时间

```vue
<div id="app">
  <h2>点击次数: {{counter}}</h2>
  <!--情况一: 方法没有参数-->
  <button @click="btnClick1">按钮1</button>

  <!--情况二: 如果方法有参数-->
  <!--1.调用时不传入参数,会默认将event作为第一个参数传入-->
  <button @click="btnClick2">按钮2</button>
  <!--2.调用时不传入参数,那么参数为undefined-->
  <button @click="btnClick2()">按钮2</button>

  <!--情况三: 如果方法有参数,并且希望传入event-->
  <button @click="btnClick3(10, $event)">按钮3</button>
</div>

<script src="../../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      counter: 0
    },
    methods: {
      btnClick1() {
        console.log('按钮1被点击');
      },
      btnClick2(payload) {
        console.log('按钮2被点击', payload);
      },
      btnClick3(num, event) {
        console.log('按钮3被点击', num, event);
      }
    }
  })
</script>

```

### 3.v-for遍历数组

示例：

```vue
// 遍历过程中, 没有使用索引值
<li v-for="item in names">{{item}}</li>

// 遍历过程中, 获取索引值
<li v-for="(item, index) in names">{{index + 1}} - {{item}}</li>

// 遍历对象的时候, 只有一个值, 活得的是value

// 获取对象的key和value 
<li v-for="(value, key) in names">{{value}} - {{key}}</li>

// 获取对象的key和value和index 
<li v-for="(value, key, index) in names">{{value}} - {{key}} - {{index}}</li>
```

**推荐, 使用v-for的时候, 加上一个 key属性**。key的作用是为了高效的更新虚拟DOM

如：

```vue
<li v-for="(item, index) in names" :key="item">{{index + 1}} - {{item}}</li>
```

### 4.v-model表单绑定

实现表单元素和数据的双向绑定

示例：

```vue
<div id="app">
    <input type="text" v-model="message">
    {{message}}
</div>

cosnt app = new Vue({
    el: '#app',
    data: {
        message: '你好'
    }
})

// 界面的message数据改了, data里面的message就改变了, 是双向的
```

其他方法实现双向绑定

```vue
// v-bind绑定一个value属性
// v-on指令给当前元素绑定input事件  
// 下面代码 等同于 使用v-model

<div id="app">
    <input type="text" :value="message" @input="message = $event.target.value">
    {{message}}
</div>

cosnt app = new Vue({
    el: '#app',
    data: {
        message: '你好'
    }
})
```

#### 4.1 v-model结合select类型使用

**下拉框单选**

- v-model绑定的是一个值
- 当选中option中一个时, 会将它对应的value赋值到mySelect中

```vue
<select v-model="mySelect">
    <option value="apple">苹果<option>
    <option value="orange">橘子<option>
    <option value="banana">香蕉<option>
</select>
<p>您最喜欢的水果: {{mySelect}}</p>
```

**下拉框多选**

- v-model绑定的是一个数组
- 当选择多个值时,会将选中的option对应的value添加到数组mySelect中

```vue
<select v-model="mySelect" multiple>
    <option value="apple">苹果<option>
    <option value="orange">橘子<option>
    <option value="banana">香蕉<option>
</select>
<p>您最喜欢的水果: {{mySelect}}</p>
```

### 5.值绑定

含义: 动态的给value赋值

1. 在前面的value中的值, 都是在定义input的时候直接给定的

2. 但真实开发中, input的值可能是从网络获取或定义在data中的

3. 可以通过v-bind:value动态的给value绑定值

```vue
<div id="app">
    <label v-for="item in nums" :for="item">
        <inout type="checkbox" value="item" :id="item" v-model="hobbies">{{item}}
    </label>
    <h2>您的爱好是: {{hobbies}}</h2>
</div>

cosnt app = new Vue({
    el: '#app',
    data: {
        hobbies: [],
        nums: ['篮球', '足球', '羽毛球']
    }
})
```

### 6.修饰符

**lazy修饰符**

- 前景: v-model默认是在input事件中实时同步输入框的数据的 (容易同步的过于频繁 )
- 作用: 可以让数据只有在失去焦点或回车时才会更新

```vue
<input type="text" v-model.lazy="输入">
```

**number修饰符**

- 前景: 默认情况下, 在输入框中无论输入字母还是数字, 都会被当做字符串类型进行处理
- 作用: 当做数字类型进行处理

**trim修饰符**

- 前景: 输入的内容首位容易有空格
- 作用: 可以过滤掉内容左右两边的空格

### 7.检测数组更新

Vue是**响应式**, 所以当数据发生变化时, Vue会自动检测数据变化, 视图会发生对应的更新.

Vue中观察数据编译的方法 – 用它们改变数组会触发视觉更新

| 数组响应式方法 |          作用          |
| :------------: | :--------------------: |
|     push()     |  在数组中最后增加元素  |
|     pop()      | 删除数组中最后一个元素 |
|    shift()     | 删除数组中的第一个元素 |
|   unshift()    |  在数组最前面添加元素  |
|    splice()    | 删除 / 插入 / 替换元素 |

### 8.计算属性 computed

使用: 需要将多个数据结合起来进行显示的时候

```javascript
<div id='app'>

 // 使用拼接的方法 -- 语法太过繁琐
 <h2>{{firstName + '' + lastName}}</h2>
 <h2>{{firstName}} {{lastName}}</h2>
 
 // 使用方法
 <h2>{{getFullName()}}</h2>
 
 // 使用计算属性 -- 看起来最舒服 最好
 <h2>{{fullName}}</h2>
</div>


const app = new Vue({
    el: '#app',
    data:{
        firstName: 'li',
        lastName: 'er'
    },
    // 计算属性
    computed: {
        fullName: function () {
            reture this.firstName + '' + this.lastName
        }
    },
    // 方法
    methods: {
        getFullName () {
            reture this.firstName + '' + this.lastName
        }
    }
})
```

#### 8.1 计算属性setter和getter

```javascript
<div id='app'>
 <h2>{{fullName}}</h2>
</div>


const app = new Vue({
    el: '#app',
    data:{
        firstName: 'li',
        lastName: 'er'
    },
    // 计算属性
    computed: {
        fullName: {
            // 一般没有set方法 
            set: function (value) {
                
            },
            // 只读属性
            get: function () {
                reture this.firstName + '' + this.lastName
            }
        }
    }
})
```

#### 8.2 computed / methods区别

**多次使用的时候**

- methods: 每次都会调用
- computed: 计算机会缓存, 不变的情况下只调用一次

#### 9.fulters过滤器

``` javascript
<div id='app'>
 <h2 {{aaa | showA}}></h2>
</div>


const app = new Vue({
    el: '#app',
    data:{
        aaa: 'li'
    },
    // 过滤器
    fulters: {
        showA (value) {
        return;
    }
})
```





