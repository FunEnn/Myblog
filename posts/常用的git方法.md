---
title: 常用的git方法
date: 2025-03-11 22:38:04
description: 笔记
tags:
 - git
---

[toc]

## 1、分支

**查看分支**

```bash
git branch
```

**切换分支**

```bash
git checkout <分支名>
```

**创建并切换分支**

```bash
git checkout -b <分支名>
```

**拉取远程分支**

```bash
git pull origin develop
```

**删除分支**

```
git branch -d <分支名>
```

**推送分支**

```bash
git push -u origin <分支名>
```

**删除远程分支**

```
git push origin --delete <分支名>
```

## 2、提交

**取消上一次提交**

```bash
git reset --soft HEAD~1
```

**暂存修改**

```bash
git stash
git stash save "备注"  
```

**获取暂存**

```bash
git stash list            # 查看暂存列表
git stash pop 
```

