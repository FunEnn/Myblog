---
title: 封装异步的fetch，使用async await方式来使用
date: 2024-10-11 22:38:04
description: 笔记
tags:
 - 前端手写题
---

```js
// 封装fetch函数  
async function fetchData(url, options = {}) {  
    try {  
        const response = await fetch(url, options);  
          
        // 检查响应状态码是否在200-299之间  
        if (!response.ok) {  
            throw new Error(`HTTP error! status: ${response.status}`);  
        }  
          
        // 解析响应数据  
        const data = await response.json();  
        return data;  
    } catch (error) {  
        console.error('Fetch error:', error);  
        throw error; // 可以选择是否重新抛出错误  
    }  
}  
  
// 使用封装后的fetchData函数  
async function fetchAndUseData() {  
    try {  
        const url = 'https://api.example.com/data';  
        const data = await fetchData(url);  
          
        // 使用获取到的数据  
        console.log(data);  
        // 做一些其他的处理...  
    } catch (error) {  
        console.error('Error fetching and using data:', error);  
    }  
}  
  
// 调用函数  
fetchAndUseData();
```



封装`fetch`请求的好处之一是你可以在其中添加额外的逻辑，比如添加请求头、处理不同的响应类型（不只是JSON）、添加重试逻辑、管理请求取消等。这样，你的代码会更加模块化和可维护。