---
title: Vue项目初始化创建
date: 2024-08-03 14:59:55
description: 笔记
tags:
 - Vue
---

[toc]

## 1、通过create-vue搭建vue3 项目

> **npm init vue@latest**

依次输入问题的答案，帮助创建项目：

> - Project name：------》项目名称，默认值：vue-project，可输入想要的项目名称，此处我写的是：vueproject1。
> - Add TypeScript? ------》是否加入TypeScript组件？默认值：No。
> - Add JSX Support? ------》是否加入JSX支持？默认值：No。
> - Add Vue Router for Single Page Application development? ------》是否为单页应用程序开发添加Vue Router路由管理组件？默认值：No。
> - Add Pinia for state management? ------》是否添加Pinia组件来进行状态管理？默认值：No。
> - Add Vitest for Unit testing? ------》是否添加Vitest来进行单元测试？默认值：No。
> - Add an End-to-End Testing Solution?------》是否添加端到端测试？默认值No。
> - Add ESLint for code quality? ------》是否添加ESLint来进行代码质量检查？默认值：No。

依次输入以下命令，

> -  **npm install**
> - **npm run dev**

当准备将应用发布到生产环境时，请运行：

-  npm run build

## 2、导入scss

> **npm install node-sass sass-loader --save-dev**

## 3、导入element-plus

> **npm install element-plus --save**
>
> **npm install @element-plus/icons-vue**

### 注册组件

1. components/Svgicon/index.vue

   ```vue
   <template>
       <!-- svg:图标外层容器节点,内部需要与use标签结合使用 -->
       <svg :style="{ width, height }">
           <!-- xlink:href执行用哪一个图标,属性值务必#icon-图标名字 -->
           <!-- use标签fill属性可以设置图标的颜色 -->
           <use :xlink:href="prefix + name" :fill="color"></use>
       </svg>
   </template>
   
   <script setup lang="ts">
   //接受父组件传递过来的参数
   defineProps({
       //xlink:href属性值前缀
       prefix: {
           type: String,
           default: '#icon-'
       },
       //提供使用的图标名字
       name: String,
       //接受父组件传递颜色
       color: {
           type: String,
           default: ''
       },
       //接受父组件传递过来的图标的宽度
       width: {
           type: String,
           default: '16px'
       },
       //接受父组件传递过来的图标的高度
       height: {
           type: String,
           default: '16px'
       }
   })
   </script>
   
   <style scoped></style>
   ```

2. components/index.ts

   ```ts
   //引入项目中全部的全局组件
   import SvgIcon from './SvgIcon/index.vue'
   //引入element-plus提供全部图标组件
   import * as ElementPlusIconsVue from '@element-plus/icons-vue'
   //全局对象
   const allGloablComponent: any = { SvgIcon }
   //对外暴露插件对象
   export default {
     //务必叫做install方法
     install(app: any) {
       //注册项目全部的全局组件
       Object.keys(allGloablComponent).forEach((key) => {
         //注册为全局组件
         app.component(key, allGloablComponent[key])
       })
       //将element-plus提供图标注册为全局组件
       for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
         app.component(key, component)
       }
     }
   }
   ```

3. main.ts

   ```ts
   import './assets/main.css'
   
   import { createApp } from 'vue'
   import pinia from './store'
   
   import App from './App.vue'
   import router from './router'
   import gloalComponent from '@/components'
   import ElementPlus from 'element-plus'
   import 'element-plus/dist/index.css'
   import zhCn from 'element-plus/es/locale/lang/zh-cn'
   const app = createApp(App)
   app.use(ElementPlus, {
     locale: zhCn
   })
   app.use(gloalComponent)
   //安装仓库
   app.use(pinia)
   app.use(router)
   app.mount('#app')
   ```

## 4、二次封装axios

**utils/request.ts**

```ts
//进行axios二次封装:使用请求与响应拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { Jwt_Prefix } from '@/const/Jwt'
import { GET_TOKEN } from '@/utils/auth'
import NProgress from 'nprogress'
//引入用户相关的仓库
//第一步:利用axios对象的create方法,去创建axios实例(其他的配置:基础路径、超时的时间)
const request = axios.create({
  //基础路径
  baseURL: import.meta.env.VITE_APP_BASE_API, //基础路径上会携带/api
  timeout: 5000, //超时的时间的设置
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

//第二步:request实例添加请求与响应拦截器
request.interceptors.request.use(
  (config) => {
    //获取用户相关的小仓库:获取仓库内部token,登录成功以后携带给服务器
    //config配置对象,headers属性请求头,经常给服务器端携带公共参数

    config.headers['X-Client-Type'] = 'Frontend'
    // 请求头添加token
    if (GET_TOKEN() == null) return config
    config.headers['token'] = GET_TOKEN()

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

//第三步:响应拦截器
request.interceptors.response.use(
  (response) => {
    //成功回调
    //简化数据
    return response.data
  },
  (error) => {
    //失败回调:处理http网络错误的
    //定义一个变量:存储网络错误信息
    let message = ''
    //http状态码
    const status = error.response.status
    switch (status) {
      case 401:
        message = 'TOKEN过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '网络出现问题'
        break
    }
    //提示错误信息
    ElMessage({
      type: 'error',
      message
    })
    return Promise.reject(error)
  }
)
//对外暴露
export default request

```

## 5、配置路由

1. **router/routes.ts**

   ```ts
   export const constantRoute = [
     {
       path: '/',
       component: () => import('../views/Home/index.vue'),
       meta: {
         title: '首页'
       }
     },
     {
       path: '/404',
       component: () => import('../views/404/index.vue'),
       meta: {
         title: '404'
       }
     },
     { path: '/:catchAll(.*)', redirect: '/404' }
   ]
   ```

2. **router/index.ts**

   ```ts
   import { createRouter, createWebHistory } from 'vue-router'
   import { constantRoute } from './routes'
   
   export const router = createRouter({
     history: createWebHistory(),
     routes: constantRoute,
     //滚动行为
     scrollBehavior(to, from, savedPosition) {
       // to：即将进入的路由对象
       // from：当前导航正要离开的路由对象
       // savedPosition：上次记录的滚动位置
       // 默认行为，如果有记录的滚动位置，则恢复到该位置
       if (savedPosition) {
         return savedPosition
       }
       // 没有记录的滚动位置，则滚动到页面顶部
       return { top: 0 }
     }
   })
   
   export default router
   ```

## 6、创建store文件，配置仓库

示例：

1. **store/modules/setting.ts**

   ```ts
   //小仓库:layout组件相关配置仓库
   import { defineStore } from 'pinia'
   
   const useLayOutSettingStore = defineStore('SettingStore', {
     state: () => {
       return {
         fold: false, //用户控制菜单折叠还是收起控制
         refsh: false //仓库这个属性用于控制刷新效果
       }
     }
   })
   
   export default useLayOutSettingStore
   ```

2. **store/index.ts**

   ```ts
   //仓库大仓库
   import { createPinia } from 'pinia'
   //创建大仓库
   const pinia = createPinia()
   //对外暴露：入口文件需要安装仓库
   export default pinia
   ```

## 7、创建api文件，实现请求发送、接收

示例：

1. **api/article/index.ts**

   ```ts
   import request from '@/utils/request'
   // 查询文章列表
   export function articleList(query: any) {
     return request({
       url: '/article/articleList',
       method: 'get',
       headers: {
         isToken: false
       },
       params: query
     })
   }
   
   //查询最热文章
   export function hotArticleList() {
     return request({
       url: '/article/hotArticleList',
       headers: {
         isToken: false
       },
       method: 'get'
     })
   }
   
   export function updateViewCount(articleId: string) {
     return request({
       url: '/article/updateViewCount/' + articleId,
       headers: {
         isToken: false
       },
       method: 'put'
     })
   }
   
   ```

## 8、根目录下创建 .env.dev 和 .env.prod 文件

1. **.env.dev **

   ```
   # 变量必须以 VITE_ 为前缀才能暴露给外部读取
   NODE_ENV = 'development'
   VITE_APP_TITLE = 'blog'
   VITE_APP_BASE_API = '/api'
   VITE_SERVE="http://localhost:7777"
   ```

2. **.env.prod**

   ```
   NODE_ENV = 'production'
   VITE_APP_TITLE = 'blog'
   VITE_APP_BASE_API = '/api'
   VITE_SERVE="http://localhost:7777"
   ```

## 9、配置vite.config.ts文件

```ts
import { fileURLToPath, URL } from 'node:url'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// 引入svg需要用到插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      }),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        resolvers: [ElementPlusResolver()],
        dts: 'src/types/auto-imports.d.ts'
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";'
        }
      },
      postcss: {
        plugins: [tailwindcss, autoprefixer]
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    //代理跨域
    server: {
      port: 6679,
      host: '0.0.0.0',
      proxy: {
        [env.VITE_APP_BASE_API]: {
          //获取数据的服务器地址设置
          target: env.VITE_SERVE,
          //需要代理跨域
          changeOrigin: true,
          //路径重写
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})

```

## 其他插件

### 1.1、安装Markdown编辑器：md-editor-v3

> npm install md-editor-v3 --save

[详情]([推荐一款强大的Markdown编辑器：md-editor-v3-CSDN博客](https://blog.csdn.net/gitblog_00009/article/details/137538987))

### 1.2、弹幕组件vue-danmaku

> npm install vue3-danmaku

[详情]([vue3中使用弹幕组件vue-danmaku_vue弹幕插件-CSDN博客](https://blog.csdn.net/qq_42931285/article/details/140090902))

### 1.3、进度条插件NProgress

> npm install --save-dev @types/nprogress
>
> npm install nprogress

[详情]([NProgress 的使用_nprogress使用-CSDN博客](https://blog.csdn.net/CEZLZ/article/details/108198402))
