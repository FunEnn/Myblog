<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8">
    <!-- 标题区域 -->
    <div class="relative mb-16 text-center">
      <h1 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        最新文章
      </h1>
      <p class="mt-4 text-gray-600 dark:text-gray-400">
        最近更新 {{ posts.length }} 篇文章
      </p>
      <div class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-1.5">
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur"></div>
      </div>
    </div>

    <!-- 文章列表 -->
    <div class="space-y-12">
      <!-- 置顶/最新文章 -->
      <a v-if="sortedPosts[0]" 
         :href="withBase(sortedPosts[0].regularPath)"
         class="group block">
        <article class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50">
          <div class="relative p-8 sm:p-12">
            <!-- 装饰背景 -->
            <div class="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 rounded-full bg-gradient-to-br from-indigo-200/20 to-purple-200/20 dark:from-indigo-500/10 dark:to-purple-500/10 blur-3xl"></div>
            
            <!-- 最新标记 -->
            <div class="absolute top-6 right-6 px-3 py-1 text-xs font-medium rounded-full 
                        bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              最新发布
            </div>

            <!-- 文章内容 -->
            <h2 class="relative text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4
                       group-hover:text-transparent group-hover:bg-clip-text 
                       group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-500 
                       transition-colors duration-300">
              {{ sortedPosts[0].frontMatter.title }}
            </h2>
            
            <p class="relative text-lg text-gray-600 dark:text-gray-400 mb-6 line-clamp-2">
              {{ sortedPosts[0].frontMatter.description }}
            </p>

            <div class="relative flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <time class="flex items-center gap-1">
                <svg class="w-4 h-4 text-indigo-500/70" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ formatDate(sortedPosts[0].frontMatter.date) }}
              </time>
              <div v-if="sortedPosts[0].frontMatter.tags" class="flex items-center gap-2">
                <div class="flex gap-2">
                  <span v-for="tag in formatTags(sortedPosts[0].frontMatter.tags)" 
                        :key="tag"
                        class="px-2 py-0.5 text-xs rounded-full bg-white/50 dark:bg-white/10 
                               text-indigo-600 dark:text-indigo-400">
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </a>

      <!-- 其他最新文章 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a v-for="post in otherPosts" 
           :key="post.regularPath"
           :href="withBase(post.regularPath)"
           class="group">
          <article class="h-full p-6 rounded-2xl bg-white dark:bg-gray-800/50 
                         border border-gray-100 dark:border-gray-800
                         hover:border-indigo-500/20 dark:hover:border-indigo-500/20
                         transition-all duration-300">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2
                       group-hover:text-transparent group-hover:bg-clip-text 
                       group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-500">
              {{ post.frontMatter.title }}
            </h3>
            
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
              {{ post.frontMatter.description }}
            </p>

            <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <time class="flex items-center gap-1">
                {{ formatDate(post.frontMatter.date) }}
              </time>
              <span class="text-indigo-500 dark:text-indigo-400 
                          group-hover:translate-x-2 transition-transform duration-300">
                阅读全文 →
              </span>
            </div>
          </article>
        </a>
      </div>
    </div>

    <!-- 查看归档按钮 -->
    <div class="mt-16 mb-24 text-center">
      <a :href="withBase('/archives')" 
         class="inline-flex items-center gap-2 px-8 py-3 text-sm font-medium rounded-full
                text-white bg-gradient-to-r from-indigo-500 to-purple-500
                hover:from-indigo-600 hover:to-purple-600
                transition-all duration-500 hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5">
        浏览历史文章
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none">
          <path d="M13 7l5 5m0 0l-5 5m5-5H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup>
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'

const { theme } = useData()

// 获取最新的10篇文章
const sortedPosts = computed(() => {
  const allPosts = theme.value.posts || []
  return allPosts
    .sort((a, b) => new Date(b.frontMatter.date) - new Date(a.frontMatter.date))
    .slice(0, 7)
})

// 除了最新文章外的其他文章
const otherPosts = computed(() => {
  return sortedPosts.value.slice(1)
})

// 用于显示文章总数
const posts = computed(() => {
  return sortedPosts.value
})

// 格式化日期
const formatDate = (date) => {
  if (!date) return ''
  const options = { month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString('zh-CN', options)
}

// 格式化标签
const formatTags = (tags) => {
  if (!tags) return []
  return Array.isArray(tags) ? tags.slice(0, 2) : [tags]
}
</script>

<style scoped>
.blur {
  filter: blur(8px);
}
</style>
