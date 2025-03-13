<template>
  <div class="relative py-16 sm:py-24 overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 -z-10">
      <div class="absolute inset-0 bg-[url('https://s2.loli.net/2025/03/11/buWneUL4fy95sga.jpg')] bg-cover bg-center bg-fixed bg-no-repeat transition-opacity duration-500 ease-in-out"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-violet-50/60 to-indigo-50/80  dark:to-indigo-950/90 backdrop-blur-[2px] transition-all duration-300"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <!-- 主标题 -->
        <div class="relative inline-block">
          <h1 class="text-4xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-indigo-500 dark:from-violet-400 dark:to-indigo-300 pb-2">
            Welcome to My Blog
          </h1>
          <div class="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-violet-500/0 via-violet-500/70 to-violet-500/0 dark:from-violet-400/0 dark:via-violet-400/70 dark:to-violet-400/0"></div>
        </div>

        <!-- 副标题 -->
        <p class="mt-6 text-xl text-gray-600 dark:text-gray-100 max-w-3xl mx-auto">
          Code · Create · Share
        </p>
        
        <!-- 动态标签云 -->
        <div class="mt-12 flex flex-wrap justify-center gap-4">
          <div v-for="(tag, index) in tags" 
               :key="index"
               :class="[
                 'tag-bounce px-4 py-2 rounded-full transition-all duration-300',
                 `bg-${tag.color}-100 dark:bg-${tag.color}-900/50`,
                 `text-${tag.color}-800 dark:text-${tag.color}-400`,
                 `hover:bg-${tag.color}-200 dark:hover:bg-${tag.color}-800/50`,
                 'cursor-pointer hover:scale-110',
                 `animate-bounce-delay-${index}`
               ]">
            {{ tag.icon }} {{ tag.text }}
          </div>
        </div>

        <!-- 快速导航 -->
        <div class="mt-12 flex flex-wrap justify-center gap-6">
          <a v-for="(link, index) in quickLinks"
             :key="index"
             :href="link.url"
             class="group relative px-6 py-3 text-sm font-medium rounded-full 
                    bg-white dark:bg-gray-800 shadow-md hover:shadow-lg
                    transition-all duration-300 hover:-translate-y-1">
            <span class="relative z-10 text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors duration-300">
              {{ link.icon }} {{ link.text }}
            </span>
            <div class="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></div>
          </a>
        </div>

        <!-- 游戏控制按钮 -->
        <div class="mt-8">
          <button 
            @click="toggleGame"
            class="px-6 py-3 text-sm font-medium rounded-full 
                   bg-gradient-to-r from-violet-500 to-indigo-500
                   text-white shadow-md hover:shadow-lg
                   transition-all duration-300 hover:-translate-y-1
                   flex items-center gap-2 mx-auto"
          >
            <span>{{ isGameActive ? '关闭游戏' : '开始游戏' }}</span>
            <span class="text-lg">{{ isGameActive ? '🎮' : '🚀' }}</span>
          </button>
          
          <!-- 游戏操作提示 -->
          <div v-if="isGameActive" 
               class="mt-4 text-sm text-gray-600 dark:text-gray-300 
                      bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm 
                      rounded-lg p-4 max-w-md mx-auto">
            <h3 class="font-medium mb-2">游戏操作说明：</h3>
            <ul class="space-y-1 text-left">
              <li>🎮 方向键：控制飞船移动</li>
              <li>💥 空格键：发射子弹</li>
              <li>👁️ 按 B 键：显示敌人</li>
              <li>❌ ESC 键：退出游戏</li>
            </ul>
          </div>
        </div>

        <!-- 滚动提示 -->
        <div class="mt-16 animate-bounce">
          <svg class="w-6 h-6 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'
import { ref } from 'vue'

const isGameActive = ref(false)

const toggleGame = () => {
  isGameActive.value = !isGameActive.value
  if (isGameActive.value) {
    // 动态加载游戏脚本
    const script = document.createElement('script')
    script.src = 'http://www.websiteasteroids.com/asteroids.min.js'
    script.async = true
    script.defer = true
    document.head.appendChild(script)
  }
}

const tags = [
  { text: '前端开发', icon: '🌟', color: 'sky' },
  { text: '后端开发', icon: '🌙', color: 'purple' },
  { text: '热爱生活', icon: '✨', color: 'cyan' },
  { text: '开源精神', icon: '🎯', color: 'green' },
  { text: '技术分享', icon: '📚', color: 'blue' },
  { text: '学习成长', icon: '🌱', color: 'emerald' }
]

const quickLinks = [
  { text: '最新文章', icon: '📝', url: withBase('/articles') },
  { text: '实用工具', icon: '🛠️', url: withBase('/tools') },
  { text: '关于我', icon: '👨‍💻', url: withBase('/about') },
  { text: '友情链接', icon: '🔗', url: withBase('/friends') }
]
</script>

<style scoped>
.tag-bounce {
  animation: bounce 3s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* 为每个标签添加不同的动画延迟 */
.animate-bounce-delay-0 { animation-delay: 0s; }
.animate-bounce-delay-1 { animation-delay: 0.2s; }
.animate-bounce-delay-2 { animation-delay: 0.4s; }
.animate-bounce-delay-3 { animation-delay: 0.6s; }
.animate-bounce-delay-4 { animation-delay: 0.8s; }
.animate-bounce-delay-5 { animation-delay: 1s; }

/* 优化动画性能 */
.tag-bounce {
  will-change: transform;
  transform: translateZ(0);
}

/* 响应式调整 */
@media (max-width: 640px) {
  .tag-bounce {
    animation: none;
  }
}

/* 背景图片响应式适配 */
@media (max-width: 640px) {
  [class*="bg-[url('./hero-bg.png')]"] {
    background-attachment: scroll;
    background-position: center 30%;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  [class*="bg-[url('./hero-bg.png')]"] {
    background-position: center;
    background-attachment: fixed;
  }
}

/* 优化背景图片加载 */
@media (prefers-reduced-motion: reduce) {
  [class*="bg-[url('./hero-bg.png')]"] {
    background-attachment: scroll;
  }
}

/* 暗色模式下的背景图片调整 */
@media (prefers-color-scheme: dark) {
  [class*="bg-[url('./hero-bg.png')]"] {
    filter: brightness(0.8) contrast(1.1);
  }
}
</style>
