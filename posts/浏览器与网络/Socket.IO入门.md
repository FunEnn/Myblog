---
title: Socket.IO入门
date: 2025-11-25 22:38:04
description: 笔记
tags:
 - 浏览器与网络
---

[toc]

## 1、简介

Socket.IO 是一个基于 WebSocket 协议的库，用于实现实时、双向通信。

特点：

- **实时双向通信**：客户端和服务器可以实时发送和接收数据
- **自动重连机制**：网络断开时自动重新连接
- **房间和命名空间**：支持分组通信
- **二进制数据传输**：支持文件、图片等二进制数据
- **跨浏览器兼容**：自动降级到长轮询等备用方案

## 2、Socket.IO 与 WebSocket 的区别

**Socket.IO** 是在 **WebSocket** 协议的基础上构建的库，它提供了以下优势：

- **自动重连**：当连接断开时，Socket.IO 会自动尝试重新连接，而原生 WebSocket 需要开发者手动实现。
- **高级功能**：如房间管理、广播等，这些功能在原生 WebSocket 中需要自行实现。
- **更好的兼容性**：在不支持 WebSocket 的浏览器或网络环境下，Socket.IO 会自动降级到轮询（Polling）或其他传输方式，确保通信的可靠性。

## 3、示例

**服务器端代码**

```js
const io = require('socket.io')(3000); // 在 3000 端口启动 Socket.IO 服务器

io.on('connection', (socket) => {
    console.log('客户端连接:', socket.id);

    // 监听客户端发送的消息
    socket.on('message', (msg) => {
        console.log('收到消息:', msg);
        // 广播消息给所有客户端
        io.emit('message', `服务器转发：${msg}`);
    });

    // 客户端断开连接
    socket.on('disconnect', () => {
        console.log('客户端断开连接:', socket.id);
    });
});
```



**客户端代码**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Socket.IO 客户端示例</title>
    <script src="https://cdn.jsdelivr.net/npm/socket.io@4.0.0/socket.io.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const socket = io('http://localhost:3000');

            // 监听服务器发送的消息
            socket.on('message', (msg) => {
                const messages = document.getElementById('messages');
                const item = document.createElement('li');
                item.textContent = msg;
                messages.appendChild(item);
            });

            // 发送消息
            document.getElementById('send').addEventListener('click', () => {
                const input = document.getElementById('message');
                socket.emit('message', input.value);
                input.value = '';
            });
        });
    </script>
</head>
<body>
    <h1>Socket.IO 客户端</h1>
    <ul id="messages"></ul>
    <input id="message" type="text" placeholder="输入消息">
    <button id="send">发送</button>
</body>
</html>
```

## 4、核心功能详解

### 4.1 事件处理

Socket.IO 事件处理的基本方法包括：

socket.emit(eventName, data) - 发送事件
socket.on(eventName, callback) - 监听事件
socket.once(eventName, callback) - 一次性监听
socket.off(eventName) - 移除事件监听

事件是 Socket.IO 的核心概念，用于在客户端和服务器之间传递数据。

```js
// 客户端向服务器发送事件
socket.emit('message', { text: '你好，服务器！' });

// 服务器向客户端发送事件
socket.emit('message', '服务器已收到消息');

------------------------------------------------------------------------------ 

//客户端监听服务器发送的事件
socket.on('message', (data) => {
    console.log('收到服务器消息:', data);
});

// 服务器监听客户端发送的事件
socket.on('message', (data) => {
    console.log('收到客户端消息:', data);
});
```

### 4.2 广播消息

广播消息是指向多个客户端发送消息，而不是单个客户端。

```js
// 服务器向所有客户端广播消息
io.emit('message', '这是一个广播消息');

// 服务器向特定房间广播消息
socket.to('room1').emit('message', '这是房间1的消息');

// 服务器向多个房间广播消息
socket.to('room1').to('room2').emit('message', '这是多房间的消息');

// 服务器向发送者以外的所有客户端广播消息
socket.broadcast.emit('message', '新用户加入');
```

### 4.3 房间管理

房间（Rooms）是用于将多个客户端分组的机制，可以方便地对特定组的客户端进行操作。

```js
// 客户端加入房间
socket.join('room1');
 
// 客户端离开房间
socket.leave('room1');
 
// 服务器获取房间内的客户端
const clients = io.sockets.adapter.rooms.get('room1');

// 检查客户端是否在房间中
const inRoom = socket.rooms.has('room1');
```

### 4.4 命名空间

命名空间用于隔离不同的通信逻辑，避免不同功能模块之间的事件冲突。

```js
// 创建命名空间
const adminNamespace = io.of('/admin');

adminNamespace.on('connection', (socket) => {
    console.log('管理员连接:', socket.id);
    
    socket.on('admin command', (command) => {
        console.log('管理员命令:', command);
    });
});


// 客户端连接到 /admin 命名空间
const socket = io('http://localhost:3000/admin');
```

### 4.5 错误处理

**服务器端错误处理**

```js
io.on('connection', (socket) => {
    console.log('客户端连接:', socket.id);

    // 监听握手错误
    socket.on('connect_error', (error) => {
        console.error('握手错误:', error);
    });

    // 监听错误事件
    socket.on('error', (error) => {
        console.error('Socket错误:', error);
    });

    // 监听客户端发送的消息
    socket.on('message', (msg) => {
        console.log('收到消息:', msg);
        // 广播消息给所有客户端
        io.emit('message', `服务器转发：${msg}`);
    });

    // 客户端断开连接
    socket.on('disconnect', () => {
        console.log('客户端断开连接:', socket.id);
    });
});
```

**客户端错误处理**

```js
document.addEventListener('DOMContentLoaded', () => {
    const socket = io('http://localhost:3000', {
        timeout: 5000 // 设置连接超时时间为 5000 毫秒
    });

    // 监听连接错误
    socket.on('connect_error', (error) => {
        console.error('连接错误:', error);
        // 显示错误信息给用户
        showErrorMessage('连接服务器失败');
    });

    // 监听连接超时
    socket.on('connect_timeout', () => {
        console.error('连接超时');
        // 显示错误信息给用户
        showErrorMessage('连接服务器超时');
    });

    // 监听错误事件
    socket.on('error', (error) => {
        console.error('客户端错误:', error);
        // 显示错误信息给用户
        showErrorMessage('客户端发生错误');
    });

    // 监听服务器发送的消息
    socket.on('message', (msg) => {
        const messages = document.getElementById('messages');
        const item = document.createElement('li');
        item.textContent = msg;
        messages.appendChild(item);
    });

    // 发送消息
    document.getElementById('send').addEventListener('click', () => {
        const input = document.getElementById('message');
        socket.emit('message', input.value);
        input.value = '';
    });
});

function showErrorMessage(message) {
    alert(message);
}
```

### 4.6 中间件

```js
// 认证中间件
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (isValidToken(token)) {
        next();
    } else {
        next(new Error('未授权'));
    }
});
 
// 连接后设置用户信息
io.on('connection', (socket) => {
    socket.data.username = getUserName(socket.handshake.auth.token);
});
```

## 5、高级功能

### 5.1 客户端自动重连

Socket.IO 默认支持客户端自动重连。可以通过配置客户端的重连选项来调整重连行为：

```javascript
const socket = io({
    reconnection: true, // 启用自动重连（默认为 true）
    reconnectionAttempts: 5, // 最大重连尝试次数
    reconnectionDelay: 1000, // 每次重连的延迟时间（毫秒）
    reconnectionDelayMax: 5000, // 最大重连延迟时间
    randomizationFactor: 0.5 // 重连延迟的随机化因子
});
```

### 5.2 保证消息的可靠传输

1. **确认消息**：

   ```javascript
   // 发送消息并等待确认
   socket.emit('message', { text: '你好' }, (ack) => {
       console.log('消息已确认:', ack);
   });
   
   // 接收方确认消息
   socket.on('message', (data, callback) => {
       console.log('收到消息:', data);
       callback('消息已收到');
   });
   ```

2. **超时重发**：在发送消息时，可以设置超时机制。如果在指定时间内没有收到确认消息，则重新发送消息。
