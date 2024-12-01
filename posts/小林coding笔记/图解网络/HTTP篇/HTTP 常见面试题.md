---
title: HTTP 常见面试题
date: 2024-11-25 22:38:04
description: 笔记
tags:
 - 图解网络
---

![提纲](https://cdn.xiaolincoding.com//mysql/other/6b9bfd38d2684b3f9843ebabf8771212.png)

## HTTP 基本概念

### HTTP 是什么？

HTTP 是超文本传输协议，也就是**H**yper**T**ext **T**ransfer **P**rotocol。

![三个部分](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP/3-HTTP%E4%B8%89%E9%83%A8%E5%88%86.png)

### HTTP请求的特性

1. **单向请求。** HTTP请求是单向的，是只能由客户端发起请求，由服务端响应的请求-响应模式。

2. **基于TCP协议。** HTTP是应用层协议，所以其数据传输部分是基于TCP协议实现的。
3. **无状态。** HTTP请求是无状态的，即没有记忆功能，不能获取之前请求或响应的内容。
4. **无连接。** HTTP协议不能保存连接状态，每次连接只处理一个请求，用完即断，从而达到节约传输时间、提高并发性。

### HTTP 常见的状态码有哪些？

![ 五大类 HTTP 状态码 ](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP/6-%E4%BA%94%E5%A4%A7%E7%B1%BBHTTP%E7%8A%B6%E6%80%81%E7%A0%81.png)

- 「**301 Moved Permanently**」表示永久重定向，说明请求的资源已经不存在了，需改用新的 URL 再次访问。
- 「**302 Found**」表示临时重定向，说明请求的资源还在，但暂时需要用另一个 URL 来访问。
- 「**304 Not Modified**」不具有跳转的含义，表示资源未修改，重定向已存在的缓冲文件，也称缓存重定向，也就是告诉客户端可以继续使用缓存资源，用于缓存控制。

### HTTP 常见字段有哪些？

#### 请求字段（Request Headers）

1. **Host**：指定请求的服务器的域名和端口号。
2. **User-Agent**：包含发出请求的客户端信息，如浏览器类型和版本。
3. **Accept**：客户端能够处理的媒体类型。
4. **Accept-Language**：客户端偏好的语言。
5. **Accept-Encoding**：客户端能够处理的压缩类型。
6. **Authorization**：认证信息，如基础认证凭证。
7. **Cookie**：存储在客户端的服务器状态信息。
8. **Content-Length**：请求正文的长度。
9. **Content-Type**：请求正文的媒体类型。
10. **Referer**：引用页面的地址，表示这个请求是从哪个页面发起的。
11. **Connection**：管理持久连接，如 `keep-alive`。
12. **Cache-Control**：控制缓存行为。

#### 响应字段（Response Headers）

1. **Status Line**：包括 HTTP 版本、状态码和状态消息。
2. **Content-Type**：响应正文的媒体类型。
3. **Content-Length**：响应正文的长度。
4. **Content-Encoding**：响应正文的压缩类型。
5. **Set-Cookie**：服务器发送到客户端的 Cookie。
6. **Cache-Control**：控制缓存行为。
7. **Expires**：响应的过期时间。
8. **Last-Modified**：资源的最后修改时间。
9. **ETag**：资源的特定版本标识符。
10. **Location**：用于重定向的 URI。
11. **Server**：服务器软件的名称和版本。
12. **WWW-Authenticate**：挑战认证信息，通常用于需要认证的请求。
13. **Access-Control-Allow-Origin**：跨源资源共享（CORS）策略。