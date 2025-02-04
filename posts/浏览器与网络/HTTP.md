---
title: HTTP
date: 2024-10-20 22:38:04
description: 笔记
tags:
 - 浏览器与网络
---

## HTTP 1.0

### 新增特性

- 对多文件提供良好的支持，支持多种不同类型的数据。HTTP/1.0 的方案是通过请求头和响应头来进行协商，在发起请求时候会通过 HTTP 请求头告诉服务器它期待服务器返回什么类型的文件、采取什么形式的压缩、提供什么语言的文件以及文件的具体编码。
- 引入状态码，有的请求服务器可能无法处理，或者处理出错，这时候就需要告诉浏览器服务器最终处理该请求的情况，状态码是通过响应行的方式来通知浏览器的。
- 提供了 Cache 机制，用来缓存已经下载过的数据以减轻服务器的压力
- 加入了用户代理的字段以统计客户端的基础信息，比如 Windows 和 macOS 的用户数量分别是多少。

http 1.0

更好的多类型文件支持，引入状态码，提供缓存机制，加入User-Agent

## HTTP 1.1

### 新增特性

- 改进持久连接。

  - 由于 http 1.0 是短连接，所以 HTTP/1.0 每进行一次 HTTP 通信，都需要经历建立 TCP 连接、传输 HTTP 数据和断开 TCP 连接三个阶段。这样做会增加大量的开销。为解决这个问题，HTTP/1.1 中增加了 **持久连接** 的方法，它的特点是在 **一个 TCP 连接上可以传输多个 HTTP 请求**，只要浏览器或者服务器没有明确断开连接，那么 **该 TCP 连接会一直保持**。持久连接在 HTTP/1.1 中是默认开启的，如不想采用持久连接，可以在 HTTP 请求头中加上 `Connection: close`。
  - 目前浏览器中对于同一个域名，默认允许同时建立 6 个 TCP 持久连接。
  - 使用 CDN 实现域名分片机制

- 不成熟的 HTTP 管线化

  HTTP/1.1 中的 **管线化** 是指将多个 HTTP 请求整批提交给服务器的技术，虽然可以整批发送请求，不过服务器依然需要根据请求顺序来回复浏览器的请求。由于持久连接虽然能减少 TCP 的建立和断开次数，但是它需要等待前面的请求返回之后，才能进行下一次请求。如果 TCP 通道中的某个请求因为某些原因没有及时返回，那么就会阻塞后面的所有请求，这就是著名的**队头阻塞**的问题。HTTP/1.1 试图用管线化解决队头阻塞问题。

- 提供虚拟主机的支持

  在 HTTP/1.0 中，每个域名绑定了一个唯一的 IP 地址，因此一个服务器只能支持一个域名。但是随着**虚拟主机技术**的发展，需要实现在**一台物理主机上绑定多个虚拟主机，每个虚拟主机都有自己的单独的域名，这些单独的域名都公用同一个 IP 地址**。因此，HTTP/1.1 的请求头中**增加了 Host 字段**，用来表示当前的域名地址，这样服务器就可以根据不同的 Host 值做不同的处理。

- 对动态生成的内容提供了完美支持

  HTTP/1.0 时，需要在响应头中设置完整的数据大小，如 Content-Length: 901，这样浏览器就可以根据设置的数据大小来接收数据。不过随着服务器端的技术发展，很多页面的**内容都是动态生成的**，因此在传输数据之前并**不知道最终的数据大小**，这就导致了浏览器不知道何时会接收完所有的文件数据。HTTP/1.1 通过**引入 Chunk transfer 机制**（分块传输编码机制）来解决这个问题，服务器会将数据分割成若干个任意大小的数据块，每个数据块发送时会附上上个数据块的长度，最后使用一个零长度的块作为发送数据完成的标志。这样就提供了对动态内容的支持。

- 客户端 Cookie、安全机制

  HTTP/1.1 还引入了客户端 Cookie 机制和安全机制

http 1.1

持久性连接，管线化技术解决持久性连接引起的对头阻塞但还未彻底解决，支持虚拟主机(Host)，数据分块传输，引入 Cookie 机制和安全机制

## *HTTP 2.0

### 新增特性

- 多路复用，通过引入二进制分帧层，就实现了 HTTP 的多路复用技术。

  首先，浏览器准备好请求数据，包括了请求行、请求头等信息，如果是 POST 方法，那么还要有请求。这些数据经过二进制分帧层处理之后，会被**转换为一个个带有请求 ID 编号的帧**，通过协议栈将这些帧发送给服务器。服务器接收到所有帧之后，会将**所有相同 ID 的帧合并为一条完整的请求信息**。然后服务器处理该条请求，并将处理的响应行、响应头和响应体分别发送至二进制分帧层。同样，二进制分帧层会将这些响应数据转换为一个个带有请求 ID 编号的帧。经过协议栈发送给浏览器。浏览器接收到响应帧之后，会根据 ID 编号将帧的数据提交给对应的请求。

- 设置请求的优先级

  我们知道浏览器中有些数据是非常重要的，但是在发送请求时，重要的请求可能会晚于那些不怎么重要的请求，如果服务器按照请求的顺序来回复数据，那么这个重要的数据就有可能推迟很久才能送达浏览器。为了解决这个问题，HTTP/2 提供了**请求优先级**，可以在发送请求时，标上该请求的优先级，这样服务器接收到请求之后，会优先处理优先级高的请求。数据传输优先级可控，使网站可以实现更灵活和强大的页面控制。

- 服务器推送

  除了设置请求的优先级外，HTTP/2 还可以直接将数据**提前推送**到浏览器。提前给客户端推送必要的资源，这样就可以相对减少一点延迟时间。

- 头部压缩

  HTTP/2 对请求头和响应头进行了压缩，你可能觉得一个 HTTP 的头文件没有多大，压不压缩可能关系不大，但你这样想一下，在浏览器发送请求的时候，基本上都是发送 HTTP 请求头，很少有请求体的发送，通常情况下页面也有 100 个左右的资源，如果将这 100 个请求头的数据压缩为原来的 20%，那么传输效率肯定能得到大幅提升。

- 可重置

  能在不中断 TCP 连接的情况下停止数据的发送。

> **http 2.0**
>
> 引入二进制分帧层，实现 HTTP 多路复用技术，并行处理请求。设置请求优先级，优先处理高优先级请求。 提前向客户端推送数据。压缩头部，提高传输效率。

## HTTP/1.0、HTTP/2.0和HTTP/3.0三个版本之间的主要区别

### 1. 协议基础和连接管理

- **HTTP/1.0**：
  - 无状态、无连接：每个请求/响应对都需要建立和关闭一个TCP连接，不支持持久连接（除非使用`keep-alive`）。
  - 队头阻塞：由于TCP连接的特性，请求和响应是顺序处理的，如果前一个请求没有完成，后续请求将被阻塞。
- **HTTP/2.0**：
  - 二进制协议：相比于HTTP/1.0和1.1的文本协议，HTTP/2.0采用二进制格式，提高了解析效率。
  - 多路复用：在单个TCP连接上可以并行发送多个请求和响应，彻底解决了队头阻塞问题。
  - 头部压缩：使用HPACK算法对请求和响应的头部进行压缩，减少了冗余头部信息的传输。
- **HTTP/3.0**：
  - 基于QUIC协议：HTTP/3.0不再使用TCP作为传输层协议，而是使用基于UDP的QUIC协议，这使得连接建立更快，并且提供了更好的拥塞控制和连接迁移能力。
  - 无队头阻塞：由于基于QUIC，即使在数据流中发生丢包，也不会影响其他数据流，从而避免了队头阻塞。
  - 0-RTT连接建立：QUIC支持0-RTT（零往返时间）握手，允许在不需要完整握手的情况下快速建立连接。

### 2. 性能和效率

- **HTTP/1.0**：
  - 性能较低：由于每次请求都需要建立和关闭TCP连接，导致性能较低，特别是在高延迟网络环境下。
- **HTTP/2.0**：
  - 性能显著提升：多路复用、二进制协议和头部压缩等特性显著提高了性能和效率。
- **HTTP/3.0**：
  - 更高的效率和性能：基于QUIC的传输层协议提供了更快的连接建立时间和更好的拥塞控制，进一步提高了性能。

### 3. 安全性

- **HTTP/1.0**：
  - 安全性较低：默认不加密，虽然可以通过SSL/TLS进行加密，但不是默认行为。
- **HTTP/2.0**：
  - 默认加密：虽然HTTP/2.0本身不提供加密，但它默认运行在TLS之上，提供了更好的安全性。
- **HTTP/3.0**：
  - 内置加密：QUIC协议内置了TLS 1.3，提供了更强的安全性和隐私保护。

### 4. 兼容性

- **HTTP/1.0**和**HTTP/1.1**：
  - 广泛支持：几乎所有的浏览器和服务器都支持这两个版本。
- **HTTP/2.0**：
  - 兼容性良好：虽然不是所有的服务器和浏览器都支持HTTP/2.0，但支持率正在迅速提高。
- **HTTP/3.0**：
  - 兼容性逐渐提高：随着QUIC协议的推广，HTTP/3.0的兼容性也在逐渐提高。