---
title: 用Promise实现图片的异步加载
date: 2024-10-11 22:38:04
description: 笔记
tags:
 - 前端手写题
---

在JavaScript中，我们可以使用Promise来实现图片的异步加载。Promise是一种表示异步操作可能完成（或失败）的对象。

```javascript
function loadImage(url) {  
    return new Promise((resolve, reject) => {  
        let img = new Image();  
        img.onload = () => {  
            resolve(img);  
        };  
        img.onerror = (error) => {  
            reject(error);  
        };  
        img.src = url;  
    });  
}  
  
// 使用方式  
loadImage('https://example.com/path/to/image.jpg')  
    .then(img => {  
        document.body.appendChild(img);  
        console.log('图片加载成功');  
    })  
    .catch(error => {  
        console.error('图片加载失败', error);  
    });
```

在这个例子中，`loadImage`函数返回一个新的Promise。这个Promise在图片加载成功时通过`resolve`方法解决，并在加载失败时通过`reject`方法拒绝。

我们使用`new Image()`来创建一个新的Image对象，并设置其`onload`和`onerror`事件处理器。当图片加载成功时，`onload`事件处理器会被调用，我们使用`resolve`方法将图片对象传递给Promise的链式调用。如果图片加载失败，`onerror`事件处理器会被调用，我们使用`reject`方法将错误对象传递给Promise的链式调用。

然后，我们可以调用`loadImage`函数，并通过`.then()`和`.catch()`方法来处理Promise的结果。如果图片加载成功，`.then()`方法中的回调函数会被调用，并接收到加载成功的图片对象。如果图片加载失败，`.catch()`方法中的回调函数会被调用，并接收到错误对象。