# FunEnn's Blog

这是一个基于 VitePress 构建的个人博客主题。你可以[点击这里](https://www.funenn.xyz/)查看在线演示。

## ✨ 特性

- 🎨 响应式设计，完美支持移动端和桌面端
- 🌙 深色模式支持
- 📱 移动端适配优化
- 🔍 本地搜索功能
- 📖 文章归档功能
- 🏷️ 标签分类系统
- 📅 文章更新时间显示
- 🤖 GitHub Actions 自动部署
## 🚀 快速开始

```bash
# 安装依赖
pnpm install  # 如果没有安装 pnpm，可以运行：npm install -g pnpm

# 启动开发服务器
pnpm run docs:dev
```

## 📝 项目结构

```
.
├── .vitepress/          # VitePress 配置目录
│   ├── config.ts        # 主配置文件
│   └── theme/           # 主题相关文件
├── posts/              # 博客文章目录
├── public/             # 静态资源目录
└── components/         # Vue 组件目录
```

## 🔧 自定义配置

1. 修改 `.vitepress/config.ts` 中的配置项
2. 在 `posts/` 目录下添加你的文章
3. 自定义主题样式：修改 `.vitepress/theme/` 下的文件
