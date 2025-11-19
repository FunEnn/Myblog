---
title: Expo配置tailwindcss等相关依赖
date: 2025-04-09 22:38:04
description: 笔记
tags:
 - React
---

[toc]

## 1、配置nativewind

[Installation](https://www.nativewind.dev/docs/getting-started/installation)

**配置**

```bash
npm install nativewind react-native-reanimated@~3.17.4 react-native-safe-area-context@5.4.0
npm install --dev tailwindcss@^3.4.17 prettier-plugin-tailwindcss@^0.5.11
```

文件配置：

1. `tailwind.config.js`

   ```js
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     // NOTE: Update this to include the paths to all of your component files.
     content: ["./app/**/*.{js,jsx,ts,tsx}"],
     presets: [require("nativewind/preset")],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

2. `babel.config.js`

   ```js
   module.exports = function (api) {
     api.cache(true);
     return {
       presets: [
         ["babel-preset-expo", { jsxImportSource: "nativewind" }],
         "nativewind/babel",
       ],
     };
   };
   ```

3. `metro.config.js`

   ```js
   const {
     getDefaultConfig
   } = require('expo/metro-config');
   const {
     withNativeWind
   } = require('nativewind/metro');
   
   const config = getDefaultConfig(process.cwd());
   
   // 添加额外的解析配置
   config.resolver = {
     ...config.resolver,
     sourceExts: [...config.resolver.sourceExts, 'mjs'],
     resolverMainFields: ['react-native', 'browser', 'main'],
   };
   
   module.exports = withNativeWind(config, {
     input: './global.css'
   });
   ```

4. `postcss.config.js`

   ```js
   // postcss.config.js
   module.exports = {
     plugins: {
       tailwindcss: {},
     },
   };
   ```

   

5. 创建`global.css`文件

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

6. 在你的 app/_layout.tsx（如果使用 Expo Router）或 index.js 文件中导入 global.css 文件

## 2、配置commitlint

**安装@commitlint/config-conventional @commitlint/cli**

```bash
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```

**根目录下新建`.cz-config.js`和`commitlint.config.js`**

`.cz-config.js`

```js
module.exports = {
  types: [
    { value: 'feat', name: '✨ 新功能：新增功能' },
    { value: 'fix', name: '🐛 修复：修复bug' },
    { value: 'docs', name: '📝 文档：文档变更' },
    { value: 'style', name: '💄 格式：代码格式改变' },
    { value: 'refactor', name: '♻️ 重构：代码重构' },
    { value: 'perf', name: '⚡️ 性能：性能优化' },
    { value: 'test', name: '✅ 测试：测试用例相关' },
    { value: 'chore', name: '🔨 工具：构建/工具/依赖相关' },
    { value: 'revert', name: '⏪️ 回滚：代码回退' },
    { value: 'build', name: '📦 构建：项目构建相关' },
  ],
  messages: {
    type: '请选择提交类型：',
    subject: '请输入提交说明：\n',
    confirmCommit: '确认提交？（y/n）',
  },
  skipQuestions: ['scope', 'body', 'breaking', 'footer'],
  subjectLimit: 100,
};
```

`commitlint.config.js`

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore', 'revert', 'build'],
    ],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 100],
  },
};

```

**安装 husky**

```bash
npm install husky --save-dev 
```

**package.json配置**

```json
{
    "scripts":{
        ...
        "prepare": "husky install",
    	"commit": "git-cz"
    }
    ...
    "config": {
    	"commitizen": {
     		"path": "cz-customizable"
    	},
        "cz-customizable": {
          "config": ".cz-config.js"
        }
    }
}
```

**运行 `npm run prepare`**会创建`.husky`文件夹

```bash
npm run prepare
```

新建文件 `.husky/commit-msg`和`.husky/pre-commit`

**.husky/commit-msg**

```shell
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit $1
```

**.husky/pre-commit**

```shell
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

**之后的提交就可以使用`npm commit`来代替`git commit -m ''`**