---
title: Echarts（可视化图表库）的使用
date: 2024-07-21 19:44:29
description: 笔记
tags:
 - 前端库
---

[toc]

### 一、echarts的介绍

echarts是一款基于JavaScript的数据可视化图表库，提供直观，生动，可交互，可个性化定制的**数据可视化图表**。

### 二、echarts的下载

`npm install echarts --save`

### 三、使用

**1. 为 echarts 准备一个具有宽高的div容器（简单来说就是存放图表的一个占位）**

```html
<div id="foldBreadChart" :style="{ width: '100%', height: '100%' }"></div>
```

**2. 获取定义 id 并通过 echarts.init() 方法初始化 echarts 实例**

```js
var myChart = this.$echarts.init(document.getElementById('foldBreadChart'));
```

**3. 根据个人需求调整图表的配置项和数据**

```js
let option = {
    ......
}
```

**4. 通过 setOption() 方法生成图表**

```html
myChart.setOption(option)
```

示例：

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<!-- 01 导入js -->
		<script src="js/echarts.min.js"></script>
		<!-- 03 设置容器的样式 -->
		<style>
			#container{
				width: 800px;
				height: 600px;
			}
		</style>
	</head>
	<body>
		<!-- 02 创建个容器 -->
		<div id="container"></div>
	</body>
	<script>
		//04 实例化echarts
		// 4.1 创建一个实例
		var echart = echarts.init(document.getElementById("container"))
		// 4.2 定义配置项
		var option = {
			// 图表的标题
			title:{
				text:"我的第一个图表"
			},
			// 图表的提示
			tooltip:{},
			// 图例
			legend:{data:["睡眠时长"]},
			// x轴线
			xAxis:{data:["周一","周二","周三","周四","周五","周六","周日"]},
			// y轴线
			yAxis:{},
			// 设置数据
			series:[
				{
					// 数据名称
					name:"睡眠时长",
					// 类型为柱状图
					type:"bar",
					// 数据data
					data:[8,10,4,5,9,4,8]
					}
			]
		}
		// 4.3 更新配置
		echart.setOption(option);
		// chart图表，set设置 Option选项  data数据 type类型 bar条（柱状条），series系列（数据） Axis轴线 xAxis水平轴线 
		// legend传奇（图例） tooltip 提示 init初始化 document文档 
	</script>
</html>
```

###  四、echarts语法

#### 1.echarts常见术语

|  英文   | 汉语  |
| :-----: | :---: |
|  title  | 标题  |
| legend  | 图例  |
| tooltip | 提示  |
|  xAxis  | x轴线 |
|  yAxis  | y轴线 |
| series  | 系列  |
|  data   | 数据  |

#### 2.图表常见类型

1. bar 柱状图
2. line折线图
   (1)曲线图
   加上**smooth:true;就会变成曲线图**
   (2)面积图
   加上**areaStyle:{fill:“#f70”} 会变成面积图**
3. pie 饼形图
   （1）加上**radius:[80,50] 会变成环形图**

### 五、echarts 中的样式简介

1.颜色主题
（1）主题可以通过切换深色模式，直接看到采用主题的效果

- 通过light 、dark切换
- 定制主题，具体可以参考[官网](https://echarts.apache.org/zh/theme-builder.html#acc-visualmap-body)，需要导入下载的js文件

```js
// HTML 引入 vintage.js 文件后（假设主题名称是 "vintage"）
var chart = echarts.init(dom, 'vintage');
// ...
```

（2）color调色盘
在 option 中设置。可以设置全局的调色盘，也可以设置系列自己专属的调色盘。

**全局调色盘option.color**\

```js
option.color：color: ["pink", "#ff0", "#f0f", "#0ff"]
```

**局部调色盘series.item.color**

```js
series: [
    {
      type: 'bar',
      // 此系列自己的调色盘。
      color: [
        '#dd6b66',
        '#759aa0',
        '#e69d87',
        '#8dc1a9',
        '#ea7e53',
        '#eedd78',
        '#73a373',
        '#73b9bc',
        '#7289ab',
        '#91ca8c',
        '#f49f42'
      ]
    },
```

### 六、动态显示局部

1. 定义option
2. 修改option值
3. echart.setOption(option);更新数据和视图

### 七、缓动动画

1. 动画延迟animationDelay
2. 动画时长animationDuration
3. 动画缓动函数animationEasing

```js
animationDelay: function(idx) {
					// 越往后的数据延迟越大
					return idx * 200;
				},
				animationDuration: function(idx) {
					// 每小格动画的时候
					return idx * 200;
				},
				// 弹性的方式出现动画
				animationEasing: "bounceInOut"
			}
```

### 八、事件

1. 事件的监听
   echart.on（”事件名“，处理函数）
2. 发送事件
   dispatchAction

```js
echart.dispatchAction({
	type: 'showTip',
// 系列的 index，在 tooltip 的 trigger 为 axis 的时候可选。
	seriesIndex: 0,
// 数据项的 index，如果不指定也可以通过 name 属性根据名称指定数据项
	dataIndex: ind,
// 可选，数据项名称，在有 dataIndex 的时候忽略				 
	position:"top",
				})
```

