<template>
  <div class="rounded-xl border dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 p-6 transform hover:scale-[1.02] transition-all duration-300">
    <!-- 个人信息部分 -->
    <div class="flex flex-col items-center">
      <div class="relative group">
        <img :src="theme.avator" 
             class="w-24 h-24 rounded-full border-4 border-indigo-500/20 transition-transform duration-300 group-hover:scale-105" 
             alt="avatar" />
        <div class="absolute -bottom-1 -right-1 bg-indigo-500 rounded-full p-1.5 border-2 border-white dark:border-gray-800">
          <div class="w-2 h-2 rounded-full bg-white animate-pulse"></div>
        </div>
      </div>
      
      <h2 class="mt-4 text-xl font-bold text-gray-900 dark:text-gray-100">FunEnn</h2>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">
        Passionate about coding & open source
      </p>
      <!-- 技术栈标签 -->
      <div class="mt-6 flex flex-wrap gap-2 justify-center">
        <span v-for="(tag, index) in techStack" 
              :key="index"
              :class="[
                'px-3 py-1 text-xs rounded-full transition-all duration-300',
                `bg-${tag.color}-100 text-${tag.color}-800 dark:bg-${tag.color}-900/50 dark:text-${tag.color}-400`,
                'hover:scale-110 cursor-default'
              ]">
          {{ tag.name }}
        </span>
      </div>

      <!-- 社交链接 -->
      <div class="mt-6 flex gap-4 justify-center">
        <a href="https://github.com/FunEnn" 
           target="_blank"
           class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-300 group">
          <svg viewBox="0 0 24 24" 
               class="w-6 h-6 text-gray-600 group-hover:text-indigo-600 dark:text-gray-400 dark:group-hover:text-indigo-400">
            <path fill="currentColor" 
                  d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </a>
        
        <a href="tencent://message/?uin=3095852337&Site=&Menu=yes" 
           target="_blank"
           class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-300 group">
          <svg viewBox="0 0 24 24" 
               class="w-6 h-6 text-gray-600 group-hover:text-indigo-600 dark:text-gray-400 dark:group-hover:text-indigo-400">
            <path fill="currentColor" 
                  d="M21.395 15.035a39.548 39.548 0 0 0-.803-2.264l-1.079-2.695c.001-.032.014-.562.014-.836C19.526 4.632 15.815 1 11.263 1 6.71 1 3 4.632 3 9.24c0 .274.013.804.014.836l-1.08 2.695a38.97 38.97 0 0 0-.802 2.264c-1.021 3.283-.69 4.643-.438 4.673.54.065 2.103-2.472 2.103-2.472 0 1.469.756 3.387 2.394 4.771-.612.188-1.363.479-1.845.835-.434.32-.379.646-.301.778.343.578 5.883.369 7.218.189 1.335.18 6.875.389 7.217-.189.078-.132.133-.458-.301-.778-.483-.356-1.233-.647-1.845-.835 1.637-1.384 2.393-3.302 2.393-4.771 0 0 1.563 2.537 2.103 2.472.251-.03.581-1.39-.439-4.673"/>
          </svg>
        </a>

        <a href="mailto:3095852337@qq.com" 
           target="_blank"
           class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-300 group">
          <svg viewBox="0 0 24 24" 
               class="w-6 h-6 text-gray-600 group-hover:text-indigo-600 dark:text-gray-400 dark:group-hover:text-indigo-400">
            <path fill="currentColor" 
                  d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </a>
      </div>


    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useData } from 'vitepress'

const { theme } = useData()

// 技术栈数据
const techStack = [
  { name: 'Vue.js', color: 'emerald' },
  { name: 'React', color: 'blue' },
  { name: 'TypeScript', color: 'purple' },
  { name: 'Node.js', color: 'green' },
  { name: 'C++', color: 'blue' },
  { name: 'MongoDB', color: 'green' },
  { name: 'Git', color: 'yellow' },
]

// 社交链接数据
const socialLinks = [
  {
    name: 'GitHub',
    link: 'https://github.com/FunEnn',
    icon: 'i-carbon-logo-github'
  },
  {
    name: 'Email',
    link: '3095852337@qq.com',
    icon: 'i-carbon-email'
  }
]

// 随机名言
const quotes = [
  "Code is poetry in motion",
  "Learning never exhausts the mind",
  "Stay hungry, stay foolish",
  "Make it work, make it right, make it fast"
]

const randomQuote = computed(() => {
  return quotes[Math.floor(Math.random() * quotes.length)]
})
</script>

<style scoped>
/* 可选：添加一些微妙的悬停动画 */
.social-icon {
  @apply transition-transform duration-300;
}

.social-icon:hover {
  @apply scale-110;
}

/* 可选：添加渐变背景效果 */
.gradient-border {
  background: linear-gradient(45deg, #6366f1, #3b82f6);
  padding: 1px;
}

/* 可选：添加卡片阴影效果 */
.card-shadow {
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.1);
}
</style>
