<template>
  <div class="title-container">
    <h1 class="title">{{ pageData?.title }}</h1>
    <div class="date">🕒 Published at: {{ publishDate }}</div>
  </div>
</template>

<script lang="ts" setup>
import { useData, onContentUpdated } from "vitepress";
import { ref, computed } from "vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

interface PageData {
  description: string;
  title: string;
  frontmatter: {
    date?: string;
    [key: string]: any;
  };
  headers: any[];
  lastUpdated: number;
  relativePath: string;
}

const { page } = useData();
dayjs.extend(relativeTime);

// 使用计算属性优化数据处理
const pageData = computed(() => page.value as PageData);
const publishDate = computed(() => {
  const date = pageData.value?.frontmatter?.date;
  return date ? dayjs().to(dayjs(date)) : dayjs().to(dayjs());
});
</script>

<style scoped>
.title-container {
  margin-bottom: 2rem;
}

.title {
  color: var(--vp-c-text-1);
  font-weight: 600;
  font-size: 2.25em;
  margin-top: 0.3em;
  margin-bottom: 0.3em;
  line-height: 1.3;
  font-family: Dosis, ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans",
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    "Noto Color Emoji";
  will-change: transform;
}

.date {
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin-bottom: 1em;
  padding-bottom: 1em;
  border-bottom: 1px dashed #c7c7c7;
  opacity: 0.8;
}
</style>
