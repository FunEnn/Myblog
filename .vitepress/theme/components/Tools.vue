<script setup lang="ts">
import { withBase } from 'vitepress'
import { toolCategories } from '../tools'
import { ref, onMounted, onUnmounted } from 'vue'

const activeCategory = ref(toolCategories[0].title)
const showMobileNav = ref(false)
const showBackToTop = ref(false)

const scrollToCategory = (categoryTitle: string) => {
  const element = document.getElementById(categoryTitle)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
    activeCategory.value = categoryTitle
    showMobileNav.value = false
  }
}

const updateActiveCategory = () => {
  const scrollPosition = window.scrollY + 100 // 添加偏移量以提前激活
  
  // 从后往前遍历，这样可以正确处理重叠的情况
  for (let i = toolCategories.length - 1; i >= 0; i--) {
    const category = toolCategories[i]
    const element = document.getElementById(category.title)
    
    if (element && element.offsetTop <= scrollPosition) {
      activeCategory.value = category.title
      break
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    showBackToTop.value = window.scrollY > 300
    updateActiveCategory()
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', () => {
    showBackToTop.value = window.scrollY > 300
    updateActiveCategory()
  })
})

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- 移动端导航栏 -->
    <div class="lg:hidden sticky top-0 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div class="px-4 py-3">
        <button 
          @click="showMobileNav = !showMobileNav"
          class="flex items-center justify-between w-full text-gray-700 dark:text-gray-300"
        >
          <div class="flex items-center space-x-2">
            <span class="text-lg font-medium">{{ activeCategory }}</span>
          </div>
          <svg 
            class="w-5 h-5 transition-transform duration-200"
            :class="{ 'rotate-180': showMobileNav }"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      <!-- 移动端下拉菜单 -->
      <div v-show="showMobileNav" 
           class="absolute w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg">
        <nav class="max-h-[30vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800 hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500">
          <button
            v-for="category in toolCategories"
            :key="category.title"
            @click="scrollToCategory(category.title)"
            class="w-full text-left px-4 py-3 transition-colors duration-200 ease-in-out border-b border-gray-100 dark:border-gray-800"
            :class="[
              activeCategory === category.title
                ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400'
                : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
            ]"
          >
            <span class="mr-2">{{ category.icon }}</span>
            {{ category.title }}
          </button>
        </nav>
      </div>
    </div>

    <!-- 桌面端布局 -->
    <div class="flex-1 flex">
      <!-- 桌面端侧边栏 -->
      <div class="hidden lg:block sticky top-16 h-[calc(100vh-4rem)] w-60 flex-shrink-0 overflow-y-auto border-r border-gray-200 dark:border-gray-800">
        <nav class="p-4 space-y-1">
          <button
            v-for="category in toolCategories"
            :key="category.title"
            @click="scrollToCategory(category.title)"
            class="w-full text-left px-4 py-2.5 rounded-lg transition-colors duration-200 ease-in-out"
            :class="[
              activeCategory === category.title
                ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
            ]"
          >
            <span class="mr-2">{{ category.icon }}</span>
            {{ category.title }}
          </button>
        </nav>
      </div>

      <!-- 主内容区 -->
      <div class="flex-1">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-20">
          <!-- 标题区域 -->
          <div class="relative mb-8 text-center">
            <h1 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              实用工具
            </h1>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
              精选实用工具和网站导航
            </p>
            <div class="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-0.5">
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur"></div>
            </div>
          </div>

          <!-- 工具分类区域 -->
          <div class="space-y-8">
            <section v-for="(category, index) in toolCategories" 
                     :key="category.title"
                     :id="category.title"
                     class="relative">
              <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <span class="text-lg mr-2">{{ category.icon }}</span>
                <span>{{ category.title }}</span>
              </h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <a v-for="tool in category.tools" 
                   :key="tool.name"
                   :href="tool.url.startsWith('http') ? tool.url : withBase(tool.url)"
                   target="_blank" 
                   rel="noopener noreferrer"
                   class="group">
                  <div class="h-full p-4 rounded-lg 
                              bg-white dark:bg-gray-800
                              border border-gray-200 dark:border-gray-700
                              hover:border-indigo-500/50 dark:hover:border-indigo-500/50
                              hover:shadow-lg hover:shadow-indigo-500/10
                              transform hover:-translate-y-0.5
                              transition-all duration-300 ease-out">
                    <h3 class="text-base font-medium text-gray-900 dark:text-gray-100 mb-1
                               group-hover:text-transparent group-hover:bg-clip-text 
                               group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-500">
                      {{ tool.name }}
                    </h3>
                    <p class="text-xs text-gray-600 dark:text-gray-400">
                      {{ tool.description }}
                    </p>
                  </div>
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <!-- 返回顶部按钮 -->
    <button
      v-show="showBackToTop"
      @click="scrollToTop"
      class="fixed right-6 bottom-8 z-50 p-2.5 rounded-lg
             bg-gradient-to-r from-indigo-500 to-purple-500
             text-white shadow-lg 
             hover:shadow-indigo-500/50
             transform hover:scale-105
             transition-all duration-300"
      aria-label="返回顶部"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.blur {
    filter: blur(8px);
}
</style>
