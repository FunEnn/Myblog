---
title: React Native如何实现吸顶操作
date: 2025-04-02 22:38:04
description: 笔记
tags:
 - React
---

[toc]

## 1、使用 React Native 的FlatList 使用吸顶操作

**如图**

![img](https://s2.loli.net/2025/04/02/VZFpIilYOR3MaNc.jpg)

实例代码：

```tsx
<FlatList
  ref={flatListRef}
  style={{
    flex: 1,
  }}
  scrollEventThrottle={1}
  data={[
    {
      key: "header",
    },
    {
      key: "tabs",
    },
  ]}
  stickyHeaderIndices={[1]}
  ListFooterComponent={() => (
    <ProjectTabs projectId={id as string}/> // 上滑的列表
  )}
  renderItem={({ item, index }) => {
    if (item.key === "header") {
      return (
        // 上滑的顶部
        <View>
          <ProjectHeader project={projectData} /> {/* 标签栏 */}
          <ProjectTabBar
            activeTab={activeTab}
            tabs={tabs}
            onTabChange={handleTabChange}
          />
        </View>
      );
    }

    return (
       // 顶部吸附
      <View>
        <ProjectTabsHeader placeholder="搜索资产编号"/>
      </View>
    );
  }}
/>;
```

## 2、实现吸顶的关键属性

### 2.1 stickyHeaderIndices
- 用于指定哪些索引位置的组件需要吸顶
- 数组中的数字表示需要吸顶的组件的索引位置
- 例如：`stickyHeaderIndices={[1]}` 表示索引为1的组件会吸顶

### 2.2 scrollEventThrottle
- 控制滚动事件的触发频率
- 值越小，滚动越流畅，但性能消耗越大
- 建议值：1-16之间

### 2.3 ListHeaderComponent
- 用于渲染列表的头部组件
- 可以是函数组件或普通组件
- 不会被吸顶效果影响

## 3、性能优化建议

### 3.1 使用 useCallback 优化渲染函数
```tsx
const renderItem = useCallback(({ item, index }) => {
  if (item.key === "header") {
    return (
      <View>
        <ProjectHeader project={projectData} />
        <ProjectTabBar
          activeTab={activeTab}
          tabs={tabs}
          onTabChange={handleTabChange}
        />
      </View>
    );
  }
  return (
    <View>
      <ProjectTabsHeader placeholder="搜索资产编号"/>
    </View>
  );
}, [projectData, activeTab, tabs, handleTabChange]);
```

### 3.2 使用 memo 优化子组件
```tsx
const StickyHeader = memo(({ placeholder }) => {
  return (
    <View style={styles.headerContainer}>
      <SearchBar placeholder={placeholder} />
    </View>
  );
});
```

### 3.3 合理设置 initialNumToRender 和 maxToRenderPerBatch
```tsx
<FlatList
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={10}
  // ... 其他属性
/>
```

## 4、常见问题及解决方案

### 4.1 吸顶组件闪烁问题
- 原因：滚动时吸顶组件的重新渲染
- 解决：使用 `useMemo` 缓存吸顶组件的内容

### 4.2 吸顶位置不准确
- 原因：组件高度计算不准确
- 解决：使用 `onLayout` 事件获取准确高度

### 4.3 滚动性能问题
- 原因：频繁的滚动事件触发
- 解决：调整 `scrollEventThrottle` 值，使用 `useCallback` 优化事件处理函数

## 5、最佳实践示例

```tsx
const StickyList = () => {
  const [activeTab, setActiveTab] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  
  // 使用 useCallback 优化渲染函数
  const renderItem = useCallback(({ item, index }) => {
    if (index === 0) {
      return <HeaderComponent />;
    }
    if (index === 1) {
      return <StickyHeaderComponent />;
    }
    return <ListItem item={item} />;
  }, []);

  // 使用 useCallback 优化事件处理
  const handleScroll = useCallback((event) => {
    // 处理滚动事件
  }, []);

  return (
    <FlatList
      ref={flatListRef}
      data={data}
      renderItem={renderItem}
      stickyHeaderIndices={[1]}
      scrollEventThrottle={16}
      onScroll={handleScroll}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={10}
      showsVerticalScrollIndicator={false}
    />
  );
};
```

## 6、注意事项

1. 吸顶组件的高度应该固定，避免动态变化
2. 合理使用 `useCallback` 和 `useMemo` 优化性能
3. 注意处理吸顶组件的层级关系，避免被其他组件遮挡
4. 在 iOS 和 Android 上测试吸顶效果的一致性
5. 考虑添加下拉刷新和上拉加载更多的功能 