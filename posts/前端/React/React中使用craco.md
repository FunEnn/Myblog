---
title: craco使用
date: 2024-08-19 22:38:04
description: 笔记
tags:
 - React 
---



## react项目使用craco进行配置并集成Prettier、Eslint...

### 为什么使用craco

使用`create-react-app` 创建的项目默认是无法修改其内部的`webpack`配置的，不像`vue-cli`那样可以通过一个配置文件修改。 这时我们需要使用`craco`来覆盖配置

### 使用步骤

- 进入项目,安装`craco`依赖

```
npm install @craco/craco@alpha -D
```

- 在项目根目录下创建配置文件`craco.config.js`

```js
const path = require('path')
const CracoLessPlugin = require('craco-less')

const resolve = (dir) => path.resolve(__dirname, dir)

module.exports = {
  plugins: [
    { 
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true
          }
        }
      }
    }
  ],
  webpack: {
    alias: {
      '@': resolve('src')
    }
  }
}

```

- 修改 `package.json` 中的 `scripts`

```json
"scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
  },
```

### 集成Eslint

**简介**

`ESLint` 是一个在 `JavaScript` 代码中通过规则模式匹配作代码识别和报告的插件化的检测工具，它的目的是保证代码规范的一致性和及时发现代码问题、提前避免错误发生。

**安装Eslint**

```
npx eslint --init
```

根据提示自动创建配置文件

**添加命令进行eslint检测**

在`package.json`中添加如下命令：

```json
"scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    // 新添加的lint命令，意思是使用.eslintrc.js检测src文件夹下的后缀为.ts,.tsx,.js,.jsx的所有文件,并对可自动修复的eslint报错进行修复
    "lint": "eslint -c .eslintrc.js src --ext .ts,.tsx,.js,.jsx --fix"
  },

```

运行`npm run lint`这个命令进行eslint校验;

### 集成editorconfig

- 在项目根目录下创建配置文件`.editorconfig`

```
#http://editorconfig.org

root = true

[*] # 表示所有文件适用
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = false
indent_style = space
indent_size = 2

[*.md]
trim_trailing_whitespace = false
max_line_length = off
```

### 集成Prettier

**简介**

`Prettier`是一个专注于代码格式化的工具。`Prettier`只关注格式化，并不具有lint检查语法等能力。它通过解析代码并匹配自己的一套规则，来强制执行一致的代码展示格式。

**安装Prettier**

```
npm install prettier -D
```

- 在项目根目录下创建配置文件`.prettierrc`和`.prettierignore`

```
// .prettierrc
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "none",
  "semi": false
}
```

```
// .prettierignore
/build/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*
```

**添加命令进行Prettier检测**

在`package.json`中添加如下命令：

```
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    "eject": "react-scripts eject",
    "prettier": "prettier --write ."
  },
```

运行`npm run prettier`这个命令进行prettier校验;