## HeroUI相比Antd缺少组件

1. FloatButton
2. Typography排版
3. Flex布局
4. Grid布局
5. Layout布局
6. Splitter分割
7. Anchor锚点
8. Menu 导航菜单
9. Steps 步骤条
10. Cascader 级联选择
11. ColorPicker
12. InputNumber
13. Mentions 提及
14. Rate 评分
15. TimePicker 时间选择框 （HeroUI使用Time Input）
16. Transfer 穿梭框
17. TreeSelect 树选择
18. Upload 上传
19. Carousel 走马灯
20. Collapse 折叠面板 （HeroUI为Accordion）
21. Descriptions 描述列表
22. Empty 空状态
23. QRCode 二维码
24. Segmented 分段控制器
25. Statistic 统计数值
26. Tag 标签
27. Timeline 时间轴
28. Tooltip 文字提示
29. Tour 漫游式引导
30. Tree 树形控件
31. Message 全局提示
32. Notification 通知提醒框
33. Popconfirm 气泡确认框
34. Result 结果
35. Spin 加载中
36. Watermark 水印
37. Affix 固钉
38. App 包裹组件
39. ConfigProvider 全局化配置

| 功能/组件        | HeroUI                                                 | Ant Design                                       |
| :--------------- | :----------------------------------------------------- | :----------------------------------------------- |
| **基础组件**     | 提供按钮、输入框等基础组件，但数量较少                 | 提供丰富的基础组件，如按钮、输入框、表单、表格等 |
| **高级组件**     | 缺少如级联选择、树选择、穿梭框等高级组件               | 提供级联选择、树选择、穿梭框等高级组件           |
| **布局组件**     | 提供 Accordion，但缺少 Grid、Flex、Layout 等布局组件   | 提供 Grid、Flex、Layout 等布局组件               |
| **导航组件**     | 提供基本导航组件，但缺少 Menu、Anchor 等               | 提供 Menu、Anchor 等导航组件                     |
| **数据展示组件** | 提供基本数据展示组件，但缺少 Descriptions、Timeline 等 | 提供 Descriptions、Timeline 等数据展示组件       |
| **数据录入组件** | 提供基本数据录入组件，但缺少 InputNumber、Cascader 等  | 提供 InputNumber、Cascader 等数据录入组件        |
| **反馈组件**     | 提供基本反馈组件，但缺少 Message、Notification 等      | 提供 Message、Notification 等反馈组件            |
| **其他组件**     | 提供基本组件，但缺少如 Carousel、QRCode 等             | 提供 Carousel、QRCode 等其他组件                 |

## Hero可通过tailwindcss配置

```ts
// tailwind.config.js
const {heroui} = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    // make sure it's pointing to the ROOT node_module
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};
```

