---
title: Vue-router（路由）的使用
date: 2024-07-20 20:02:56
description: 笔记
tags:
 - Vue
---

[toc]

### 一、安装

`npm install vue-router`

### 二、创建组件

如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能，用vue-cli生产了我们的项目结构，**src文件目录下会有一个router文件夹**，此处就是编写路由组件的地方。在src/router/index.js，这个文件就是路由的核心文件：

```javascript

import Vue from 'vue'   //引入Vue
import Router from 'vue-router'  //引入vue-router
import Hello from '@/components/Hello'  //引入根目录下的Hello.vue组件
 
Vue.use(Router)  //Vue全局使用Router
 
export default new Router({
  routes: [              //配置路由，这里是个数组
    {                    //每一个链接都是一个对象
      path: '/',         //链接路径
      name: 'Hello',     //路由名称，
      component: Hello   //对应的组件模板
    }，{
      path:'/hi',
      component:Hi,
      children:[        //子路由,嵌套路由
        {path:'/',component:Hi},
        {path:'hi1',component:Hi1},
        {path:'hi2',component:Hi2},
      ]
    }
  ]
})
```

### 三、router-link制作导航

1. **router-link** 是一个组件，它默认会被渲染成一个带有链接的a标签，通过to属性指定链接地址。
   注意：被选中的router-link将自动添加一个class属性值.router-link-active。

```vue
<router-link to="/">[text]</router-link>
```

- to：导航路径，要填写的是你在router/index.js文件里配置的path值，如果要导航到默认首页，只需要写成 to="/" ，
- [text] ：就是我们要显示给用户的导航名称。

2. **router-view** 用于渲染匹配到的组件。

   ①.可以给router-view组件设置**transition过渡**

   ```vue
   <transition name="fade">
     <router-view ></router-view>
   </transition>
   ```

   **css过渡类名：**
   组件过渡过程中，会有四个CSS类名进行切换，这四个类名与transition的name属性有关，比如name="fade",会有如下四个CSS类名：

   - fade-enter:进入过渡的开始状态，元素被插入时生效，只应用一帧后立刻删除。
   - fade-enter-active:进入过渡的结束状态，元素被插入时就生效，在过渡过程完成后移除。
   - fade-leave:离开过渡的开始状态，元素被删除时触发，只应用一帧后立刻删除。
   - fade-leave-active:离开过渡的结束状态，元素被删除时生效，离开过渡完成后被删除。

   从上面四个类名可以看出，**fade-enter-active**和**fade-leave-active**在整个进入或离开过程中都有效，所以CSS的transition属性在这两个类下进行设置。

   **过渡模式mode：**

   - in-out(mode默认in-out模式）：新元素先进入过渡，完成之后当前元素过渡离开。
   - out-in：当前元素先进行过渡离开，离开完成后新元素过渡进入。

   ②.还可以配合`<keep-alive>`使用，**keep-alive**可以缓存数据，这样不至于重新渲染路由组件的时候，之前那个路由组件的数据被清除了。

   ```vue
   <transition>
     <keep-alive>
       <router-view></router-view>
     </keep-alive>
   </transition>
   ```

### 四、动态路由匹配

我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件。
调用router的map方法映射路由，每条路由以key-value的形式存在，key是路径，value是组件。

示例：

```javascript
router.map({
    '/home': { component: Home },
    '/about': { component: About }
})

//'/home'是一条路由的key，它表示路径；{component: Home}则表示该条路由映射的组件
```

例如，我们有一个 User 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。那么，我们可以在 vue-router 的路由路径中使用『动态路径参数』来达到这个效果。

```javascript
const User = {
  template: '<div>User</div>'
}
 
const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})
```

例如： /user/foo 和 /user/bar 都将映射到相同的路由。
一个『路径参数』使用冒号 : 标记。当匹配到一个路由时，参数值会被设置到**this.$route.params**，可以在每个组件内使用。
你可以在一个路由中设置多段『路径参数』，对应的值都会设置到 **$route.params** 中。

> |             模式              |      匹配路径       | $route.params                     |
> | :---------------------------: | :-----------------: | --------------------------------- |
> |        /user/:username        |     /user/evan      | { username: 'evan'}               |
> | /user/:username/post/:post_id | /user/evan/post/123 | { username: 'evan', post_id: 123} |
>

### 五、vue-router参数传递

1. 用name传值（不推荐）

   ①在路由文件src/router/index.js里配置name属性。

   ```javascript
   routes: [
       {
           path: '/',
           name: 'Hello',
           component: Hello
       }
   ]
   ```

   ②模板里(src/App.vue)用$router.name的形式接收

   ```vue
   <p>{{ $router.name }}</p>
   ```

2. 通过<router-link> 标签中的to传参

   ```javascript
   <router-link :to="{name:‘dxl’,params:{key:value}}">东西里</router-link>
   ```

   - name：就是我们在路由配置文件中起的name值。
     另：**命名路由**就是用一个名称来标识一个路由，在定义路由的时候设置一个name属性即可。**在router-link中也可以用路由的名字来链接到一个路由。**
   - params：就是我们要传的参数，它也是对象形势，在对象里可以传递多个值。
     最后用`$route.params.username`进行接收.

3. 用url传参

    **:冒号的形式传递参数**

   (1).在router路由配置文件里以冒号的形式设置参数

   ```javascript
   {
       path:'/params/:newsId/:userName,
       component:Params
   }
   ```

   (2).组件形式，在src/components目录下建立我们params.vue组件。
   我们在页面里输出了url传递的参数。

   ```vue
   <template>
       <div>
           <h2>{{ msg }}</h2>
           <p>新闻ID：{{ $route.params.newsId}}</p>
           <p>用户名：{{ $route.params.userName}}</p>
       </div>
   </template>
   <script>
   export default {
     name: 'params',
     data () {
       return {
         msg: 'params page'
       }
     }
   }
   </script>
   ```

   (3).<router-view>标签path路径中传值
   ```javascript
   <router-link to="/params/888/dxl shuai>params</router-link>
   ```

   (4).正则表达式在URL传值中的应用
   希望我们传递的新闻ID只能是数字的形式，这时候我们就需要在传递时有个基本的类型判断，`path:'/params/:newsId(\\d+)/:userName'`

### 六.响应路由参数的变化

当使用路由参数时，例如从 /user/foo 导航到 /user/bar，原来的组件实例会被复用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会再被调用。
复用组件时，想对路由参数的变化作出响应的话:
(1). watch（监测变化） $route 对象：

```js
const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  }
}
```

(2).beforeRouteUpdate 导航守卫
如果目的地和当前路由相同，只有参数发生了改变 (比如从一个用户资料到另一个 `/users/1` -> `/users/2`)，你需要使用 `beforeRouteUpdate`来响应这个变化 (比如抓取用户信息)。

```js
const User = {
  template: '...',
  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
  }
}
```

### 七、实现不同路由不同页面标题

```js
// 定义路由的时候如下定义，name也可为中文
const routes = [
  { path: '/goods', component: goods, name: 'goods' },
  { path: '/orders', component: orders, name: 'orders' },
  { path: '/seller', component: seller, name: 'seller' }
];
// 创建路由实例
const router = new VueRouter({
  routes: routes
})
// 关键在这里，设置afterEach钩子函数
router.afterEach((to, from, next) => {
  document.title = to.name;
}
```

### 八、重定向

redirect基本重定向：

```js
const routes = [
  { path: '/', redirect: '/goods'}
]
重定向的目标也可以是一个命名的路由。
const routes = [
  { path: '/', redirect: { name: 'goods' }}
]
重定向时也可以传递参数
{
  path:'/',
  redirect:'/goods/:newsId(\\d+)/:userName'
}
```

★.这里不得不提到**alias**别名的使用。

1. 首先我们在路由配置文件里给路径起一个别名，dxl。

```js
{
    path: '/hi',
    component: Hi,
    alias:'/dxl'
 }
```

2. 配置我们的<router-link>，起过别名之后，可以直接使用<router-link>标签里的to属性，进行重新定向。

   ```vue
   <router-link to="/dxl">jspang</router-link>
   ```

**别名alias在path为'/'中，是不起作用的。**

### 九、编程式导航

**1.router.push( )**
想要导航到不同的 URL，则使用 **router.push (在创建vue实例并挂载后调用)**。router.push方法就是用来动态导航到不同的链接的，这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。

当你点击 <router-link> 时，这个方法会在内部调用，所以说，点击 <router-link :to="..."> 等同于调用 router.push(...)。

|         声明式          |      编程式      |
| :---------------------: | :--------------: |
| <router-link :to="..."> | router.push(...) |

**注意：
如果提供了 path，params 会被忽略，而 query 并不属于这种情况。**

```js
const userId = 123
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
```

**2.router.go(n)**

这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 window.history.go(n)。

 ```js
 // 在浏览器记录中前进一步，等同于 history.forward()
 router.go(1)
 // 后退一步记录，等同于 history.back()
 router.go(-1)
 ```

自定义一个goback()方法，并使用this.$router.go(-1),进行后退操作

```vue
<script>
export default {
  name: 'app',
  methods:{
    goback(){
      this.$router.go(-1);
    },
    goHome(){
      this.$router.push('/');
    }
  }
}
</script>
```

### 十、路由中的钩子

**1.路由配置文件中的钩子函数：**
在路由文件中我们只能写一个beforeEnter,就是在进入此路由配置时：

```js
{
      path:'/params/:newsId(\\d+)/:userName',
      component:Params,
      beforeEnter:(to,from,next)=>{
        console.log('我进入了params模板');
        console.log(to);
        console.log(from);
        next();
},
```

三个参数：

- to:路由将要跳转的路径信息，信息是包含在对像里边的。
- from:路径跳转前的路径信息，也是一个对象的形式。
- next:路由的控制参数，常用的有next(true)和next(false)。

**2.写在模板中的钩子函数：**
写在模板中就可以有两个钩子函数可以使用。
beforeRouteEnter：在路由进入前的钩子函数。
beforeRouteLeave：在路由离开前的钩子函数。

```js
export default {
  name: 'params',
  data () {
    return {
      msg: 'params page'
    }
  },
  beforeRouteEnter:(to,from,next)=>{
    console.log("准备进入路由模板");
    next();
  },
  beforeRouteLeave: (to, from, next) => {
    console.log("准备离开路由模板");
    next();
  }
}
```

此处常用于**数据获取**。

- **导航完成之后获取**：先完成导航，然后在接下来的组件生命周期钩子中获取数据。在数据获取期间显示『加载中』之类的指示。
  当你使用这种方式时，我们会马上导航和渲染组件，然后在组件的 **created** 钩子中获取数据。这让我们有机会在数据获取期间展示一个 loading 状态，还可以在不同视图间展示不同的 loading 状态。
  假设我们有一个 Post 组件，需要基于 `$route.params.id` 获取文章数据：
- **导航完成之前获取**：导航完成前，在路由进入的守卫中获取数据，在数据获取成功后再执行导航。
  通过这种方式，我们在导航转入新的路由前获取数据。我们可以在接下来的组件的 beforeRouteEnter 守卫中获取数据，当数据获取成功后只调用 next 方法。

### 十一、路由组件传参

在组件中使用 $route 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。
**解耦前：**
`id`不能直接拿出来使用

```js
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User }
  ]
})
```

**使用 props 将组件和路由解耦：**

```js
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true },
 
    // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
})
```

### 十二、导航守卫

`vue-router`提供的导航守卫主要用来通过跳转或取消的方式守卫导航
**注意**：参数或查询的改变并不会触发进入/离开的导航守卫，你可以通过观察 `$route` 对象来应对这些变化，或使用 `beforeRouteUpdate` 的组件内守卫。

#### 全局前置守卫 router.beforeEach

```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```

> 当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 等待中。

- to: 即将要进入的目标 路由对象

- from: 当前导航正要离开的路由

- next: 

  - `next()`: 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
  - `next(false)`: 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
  - next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: ‘home’ 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。
  - `next(error)`: (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。

  

**确保 next 函数在任何给定的导航守卫中都被严格调用一次。它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错**

用户未能验证身份时[重定向](https://so.csdn.net/so/search?q=重定向&spm=1001.2101.3001.7020)到 /login 的示例：

```js
// GOOD
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})
```

#### 全局解析守卫 router.beforeResolve

在 2.5.0+ 你可以用 router.beforeResolve 注册一个全局守卫。这和 router.beforeEach 类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用

```js
router.beforeResolve((to, from, next) => { } )
```

#### 全局后置钩子 router.afterEach

全局后置钩子，然而和守卫不同的是，这些钩子不会接受 `next 函数`也不会改变导航本身

```js
router.afterEach((to, from) => {
  // ...
})
```

#### 路由独享的守卫 beforeEnter

在路由配置上直接定义 `beforeEnter 守卫`：

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

