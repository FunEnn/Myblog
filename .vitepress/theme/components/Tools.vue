<script setup lang="ts">
import { withBase } from 'vitepress'
import { toolCategories } from '../tools'
</script>

<template>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-20">
      <!-- 标题区域 -->
      <div class="relative mb-12 text-center">
        <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          实用工具
        </h1>
        <p class="mt-3 text-sm text-gray-600 dark:text-gray-400">
          精选实用工具和网站导航
        </p>
        <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-20 h-0.5">
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur"></div>
        </div>
      </div>

      <!-- 工具分类区域 -->
      <div class="space-y-10">
        <section v-for="(category, index) in toolCategories" 
                 :key="category.title"
                 :class="{ 'mb-10': index !== toolCategories.length - 1 }">
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
              <div class="h-full p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 
                          backdrop-blur-sm
                          border border-gray-200 dark:border-gray-700
                          hover:border-indigo-500/30 dark:hover:border-indigo-500/30
                          hover:shadow hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/5
                          transition-all duration-300 ease-out">
                <h3 class="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1.5
                           group-hover:text-transparent group-hover:bg-clip-text 
                           group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-500
                           transition-colors duration-300">
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
</template>

<style scoped>
.blur {
    filter: blur(8px);
}
</style>
