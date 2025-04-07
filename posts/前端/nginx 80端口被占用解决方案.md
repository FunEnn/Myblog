---
title: nginx 80端口被占用解决方案
date: 2024-10-20 20:58:53
description: 笔记
tags:
 - nginx
---

#### 进入 nginx-1.12.1\logs 路径下，打开error.log文件，发现有以下错误日志：

`10013: An attempt was made to access a socket in a way forbidden by its access permissions`

#### 绑定80端口错误，说明80端口被占用，nginx绑定失败。

## 解决方案 

### 1、kill掉占用80端口的程序，再次启动nginx

（1） 按键盘win+r 打开运行界面，输入cmd，确定，打开管理员界面

（2）输入 `netstat -aon | findstr :80`

![ 2024-06-30 163116.png](https://s2.loli.net/2024/06/30/zmWCguDTOSFyIYw.png)

（3）输入 `tasklist|findstr “端口”`

![ 2024-06-30 163055.png](https://s2.loli.net/2024/06/30/HZvwgYxjrMNmBck.png)

找到端口对应的服务名称

（4）在控制台关闭服务

### 2、如若占用80端口的服务/程序不能关闭，则更改nginx监听的端口号

&emsp;&emsp;**在 nginx-1.12.1\conf 路径下，打开nginx.conf文件，将监听的端口80 修改为 8080，重新启动。**

#### Windows平台下80端口被System占用解决办法：

在使用Windows的过程中，我们可能会要用到80端口。但是我们发现80端口被System进程占用。

（1）查找端口占用。

netstat -ano | findstr ":80 "

tasklist /fi “PID eq 4”

（2）80端口被System占用。

我们在运行中输入 regedit 打开注册表。

（3）找到 HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\services\HTTP

（4）找到项Start，将其值改为0

（5）重启系统，System进程就不会占用80端口了。

