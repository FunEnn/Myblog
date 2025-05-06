---
title: 详解-如何使用pnpm workspace管理monorepo项目
date: 2025-02-15 23:58:53
description: 笔记
tags:
 - 前端
---



[toc]

## 1、项目结构

pnpm 内置了对单一存储库（也称为多包存储库、多项目存储库或单体存储库）的支持。 你可以创建一个工作空间以将多个项目合并到一个仓库中。

```
my-monorepo
|-- apps
|   |-- web				 # 主应用				
|       |-- package.json # 依赖 @my-monorepo/ui
|-- packages
|   |-- ui               # 核心库
|   |   |-- package.json # 包名为 @my-monorepo/ui
|-- package.json
|-- .npmrc => optional
|-- pnpm-workspace.yaml
```

一个工作空间必须在它的根目录有一个 [`pnpm-workspace.yaml`](https://pnpm.io/zh/pnpm-workspace_yaml) 文件。 工作区在其根目录中也可能有一个 [`.npmrc`](https://pnpm.io/zh/npmrc)。

###  根目录 `package.json`

私有化为 true 时，在 publish 时 npm 将不会处理该 package，你可以在项目的根目录配置，或在不需要被 publish 的 workspace 中配置它

```json
/my-monorepo/package.json
{
  "name": "my-monorepo",
  "private": true,
  "script": {
    "dev": "pnpm -r dev"
  }
} 
```

### `pnpm-workspace.yaml`

> 在该项目中指定位于 `my-monorepo/apps/ `和 `my-monorepo/packages/ `内的直接子目录为工作区如 web、ui等

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

## 2、什么是 workspace:^ - semver 版本

当你将依赖项添加到 `package.json` 中时，pnpm 根据 `.npmrc` 或命令行中的 `ave-workspace-protocol` 字段来决定是否使用 workspace: 协议，并根据 save-prefix 字段来决定版本的前缀。

```json

JSON
{
	"dependencies": {
		"foo": "workspace:*",
		"bar": "workspace:~",
		"qar": "workspace:^",
		"zoo": "workspace:^1.5.0"
	}
}
```

转换

```json
{
	"dependencies": {
		"foo": "1.5.0",
		"bar": "~1.5.0",
		"qar": "^1.5.0",
		"zoo": "^1.5.0"
	}
}
```

### `workspace:*` 的作用

> "@my-monorepo/ui": "workspace:*",

- **自动链接**：pnpm 会自动将 `@my-monorepo/ui` 链接到工作区内的对应包，无需手动使用 `pnpm link`。
- **实时同步**：修改 `@my-monorepo/ui` 的代码会立即反映在依赖它的项目中，适合本地开发和调试。
- **版本管理**：无需手动指定版本号，pnpm 会自动使用工作区内的最新版本。

#### `workspace:*`替代方案

1. `link:../ui`

如果项目不在同一仓库中，可以使用 `link:../ui` 手动链接：

2. `file:../ui`

`file:../ui` 也是一种本地路径依赖，但与 `workspace:*` 不同，它会复制文件而不是链接：

## 3、常用命令

```bash
# 给指定 workspace 安装依赖
pnpm add <package-name> --filter <workspace-name>

# 卸载依赖
pnpm uninstall <package-name> --filter <workspace-name>

# 更新依赖
pnpm update <package-name> --filter <workspace-name>
```

[pnpm CLI | pnpm](https://pnpm.io/zh/pnpm-cli)