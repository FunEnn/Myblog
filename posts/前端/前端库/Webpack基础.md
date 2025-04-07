---
title: Webpack基础
date: 2024-12-23 19:44:29
description: 笔记
tags:
 - 前端库
---

[toc]

### Webpack的核心概念：

- **Entry（入口）**：指定Webpack开始构建依赖关系图的入口文件，可以是一个或多个文件。
- **Output（输出）**：指定Webpack打包后的输出文件的名称和路径。
- **Loader（加载器）**：Webpack使用加载器来处理非JavaScript文件，例如将Sass文件转换为CSS，将TypeScript文件转换为JavaScript等。
- **Plugin（插件）**：Webpack的插件系统可以用于执行各种任务，例如代码压缩、资源优化、环境变量注入等。
- **Module（模块）**：Webpack将所有的文件视为模块，通过加载器和插件对模块进行处理和转换。
- **Chunk（代码块）**：Webpack在打包过程中将模块分割成代码块，可以通过代码分割来优化应用程序的加载性能。

### 工作原理
- **入口文件**：Webpack从一个或多个入口文件开始，根据入口文件中的依赖关系，递归地构建出整个应用程序的依赖关系图。
- **模块解析**：Webpack会解析每个模块的依赖关系，包括JavaScript文件、样式表、图片、字体等资源文件，以及其他模块依赖。
- **打包输出**：根据依赖关系图，Webpack将所有模块打包成一个或多个输出文件，通常是一个JavaScript文件和一些辅助的资源文件。

### 常用loader

- **file-loader**：打包图片，打包字体图标。
- **url-loader**：类似于file-loader，但是可以将小于指定大小的文件转成base64编码的Data URL格式
- **css-loader**：和图片一样webpack默认能不能处理CSS文件, 所以也需要借助loader将CSS文件转换为webpack能够处理的类型。解析css文件中的@import依赖关系,打包时会将依赖的代码复制过来代替@import。
- **scss-loader**：自动将scss转换为CSS
- **less-loader**：自动将less转换为CSS

- **style-loader**: 将css文件通过css-loader处理之后，将处理之后的内容插入到HTML的HEAD代码中。
- **eslint-loader**：用于检查常见的 JavaScript 代码错误，也可以进行"代码规范"检查，
- **PostCSS-loader**：PostCSS和sass/less不同, 它不是CSS预处理器（换个格式编写css）。PostCSS是一款使用插件去转换CSS的工具，PostCSS有许多非常好用的插件。例如：autoprefixer(自动补全浏览器前缀)、**postcss-pxtorem**(自动把px代为转换成rem)。使用说明，必须放在css规则的最后，最先执行。
- **babel-loader**：将ES6+的代码转换成ES5的代码。
- **vue-loader**：将Vue单文件组件编译成JavaScript代码。

### 常用plugins

- **optimize-css-assets-webpack-plugin**：压缩css代码

- **HtmlWebpackPlugin**：生成HTML文件，并自动将打包后的javaScript和CSS文件引入到HTML文件中。
- **CleanWebpackPlugin**：清除输出目录。
- **ExtractTextWebpackPlugin**：将CSS代码提取到单独的CSS文件中。
- **DefinePlugin**：定义全局变量。
- **UglifyJsWebpackPlugin**：压缩JavaScript代码。
- **HotModuleReplacementPlugin**：热模块替换，用于在开发环境下实现热更新。
- **MiniCssExtractPlugin**：与ExtractTextWebpackPlugin类似，将CSS代码提取到单独的CSS文件中。
- **BundleAnalyzerPlugin**：分析打包后的文件大小和依赖关系。

### 什么是Webpack的热更新（Hot Module Replacement）？原理是什么？

Webpack的热更新，在不刷新页面的前提下，将新代码替换掉旧代码。

HRM的原理实际上是 webpack-dev-server（WDS）和浏览器之间维护了一个**websocket服务**。当本地资源发生变化后，webpack会先将打包生成新的模块代码放入内存中，然后WDS向浏览器推送更新，并附带上构建时的hash，让客户端和上一次资源进行对比.
