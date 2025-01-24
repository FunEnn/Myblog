<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8">
    <!-- 标题区域 -->
    <div class="relative mb-12 text-center">
      <h1 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        Tags Collection
      </h1>
      <p class="mt-4 text-gray-600 dark:text-gray-400">
        发现 {{ data ? Object.keys(data).length : 0 }} 个分类，共 {{ getTotalPosts() }} 篇文章
      </p>
      <div class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
    </div>
    
    <!-- 标签云 -->
    <div class="p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 
                shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none backdrop-blur-sm mb-8">
      <div class="flex flex-wrap gap-3 justify-center">
        <button
          v-for="(item, key) in data"
          :key="key"
          @click="toggleTag(key)"
          :class="[
            'relative px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300',
            'hover:scale-105 hover:shadow-sm',
            selectTag === key 
              ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md shadow-indigo-500/20' 
              : 'bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600/50'
          ]"
          :style="getFontSize(item.length)"
        >
          <span class="relative z-10">{{ key }}</span>
          <span class="absolute -top-1.5 -right-1.5 w-4 h-4 flex items-center justify-center text-[10px] font-bold
                     bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 rounded-full border border-indigo-100 dark:border-indigo-900">
            {{ item.length }}
          </span>
        </button>
      </div>
    </div>

    <!-- 文章列表 -->
    <div v-if="selectTag && data && data[selectTag]" 
         class="p-8 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 
                shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none backdrop-blur-sm">
      <h4 class="flex items-center gap-3 text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M7 7h.01M7 3h5a1.99 1.99 0 011.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.995 1.995 0 013 12V7a4 4 0 014-4z" 
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        {{ selectTag }}
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
          ({{ data[selectTag].length }} 篇文章)
        </span>
      </h4>

      <div class="space-y-4">
        <a v-for="(article, index) in data[selectTag]"
           :key="index"
           :href="withBase(article.regularPath)"
           class="group block p-4 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent 
                  dark:hover:from-gray-800/30 dark:hover:to-transparent transition-all duration-300"
        >
          <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-4 flex-1 min-w-0">
              <div class="w-1 h-12 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500 opacity-50 
                          group-hover:opacity-100 group-hover:scale-y-110 transition-all duration-300"></div>
              <div class="flex-1 min-w-0">
                <h3 class="font-medium text-gray-900 dark:text-gray-100 truncate
                           group-hover:text-transparent group-hover:bg-clip-text 
                           group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-500">
                  {{ article.frontMatter.title }}
                </h3>
                <p v-if="article.frontMatter?.description" 
                   class="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                  {{ article.frontMatter.description }}
                </p>
              </div>
            </div>
            <time class="text-sm text-gray-500 dark:text-gray-400 tabular-nums whitespace-nowrap">
              {{ formatDate(article.frontMatter.date) }}
            </time>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useData, withBase } from "vitepress";
import { initTags } from "../utils";

const { theme } = useData();
const data = computed(() => {
  return theme.value.posts ? initTags(theme.value.posts) : {};
});
const selectTag = ref("");

const toggleTag = (tag: string) => {
  selectTag.value = selectTag.value === tag ? "" : tag;
};

const getFontSize = (length: number) => {
  let size = length * 0.01 + 0.9;  // 调整字体大小的计算方式，使基础大小更小
  return { fontSize: `${size}em` };
};

const getTotalPosts = () => {
  if (!data.value) return 0;
  return Object.values(data.value).reduce((acc, curr) => acc + curr.length, 0);
};

const formatDate = (date: string) => {
  if (!date) return '';
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return new Date(date).toLocaleDateString('zh-CN', options);
};
</script>

<style scoped>
.main {
  margin: 0 auto;
  padding: 0.5rem 1.5rem 4rem;
  max-width: 48rem;
}
.tags-header {
  font-weight: bold;
  padding-bottom: 14px;
  font-size: 2.25em;
  margin-top: 24px;
}
.tags {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: left;

  border-bottom: 1px dashed #c7c7c7;
  margin-bottom: 10px;
  padding-bottom: 20px;
}
.tag {
  display: inline-block;
  margin: 6px 8px;
  font-size: 0.85em;
  line-height: 25px;
  transition: 0.4s;
  color: #a1a1a1;
  cursor: pointer;
}
.tag:hover {
  color: var(--vp-c-hover);
}
.activetag {
  color: var(--vp-c-hover);
}
.tag-length {
  color: var(--vp-c-brand);
  font-size: 12px !important;
  position: relative;
  top: -8px;
}
.header {
  font-size: 1rem;
  font-weight: 600;
  margin: 1.5rem 0;
  display: flex;
  align-items: center;
  justify-content: left;
}
.fas-icon {
  width: 2rem;
  height: 2rem;
}
.header-text {
  padding-left: 10px;
}
.article {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 10px;
  color: var(--vp-c-text-2);
  transition: border 0.3s ease, color 0.3s ease;
}
.article:hover {
  text-decoration: none;
  color: var(--vp-c-brand);
}
.date {
  font-family: Georgia, sans-serif;
}
</style>
