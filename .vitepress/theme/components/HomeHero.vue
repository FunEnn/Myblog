<template>
  <div class="relative py-16 sm:py-24 overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 -z-10">
      <!-- 主背景图案 -->
      <div
        class="absolute inset-0 bg-hero-pattern bg-cover bg-center bg-fixed bg-no-repeat opacity-30 dark:opacity-10 transition-opacity duration-500 ease-in-out">
      </div>


      <!-- 动态光效 -->
      <div class="absolute inset-0">
        <div
          class="absolute inset-0 bg-gradient-to-tr from-violet-900/30 via-transparent to-indigo-900/20 dark:from-violet-400/20 dark:to-indigo-400/20 animate-gradient">
        </div>
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,82,141,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(159,162,255,0.15),transparent_50%)]">
        </div>
      </div>

    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <!-- 主标题 -->
        <div class="relative inline-block">
          <h1 ref="titleRef"
            class="text-4xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 dark:from-violet-400 dark:via-purple-400 dark:to-indigo-300 pb-2 typewriter">
            {{ displayText }}
          </h1>
          <div
            class="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-violet-600/0 via-violet-600/70 to-violet-600/0 dark:from-violet-400/0 dark:via-violet-400/70 dark:to-violet-400/0">
          </div>
        </div>

        <!-- 副标题 -->
        <p class="mt-6 text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto opacity-0 fade-in font-medium">
          Code · Create · Share
        </p>

        <!-- 动态标签云 -->
        <div class="mt-12 flex flex-wrap justify-center gap-4">
          <div v-for="(tag, index) in tags" :key="index" :class="[
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
          <a v-for="(link, index) in quickLinks" :key="index" :href="link.url" class="group relative px-6 py-3 text-sm font-medium rounded-full 
                    bg-white dark:bg-gray-800 shadow-md hover:shadow-lg
                    transition-all duration-300 hover:-translate-y-1">
            <span
              class="relative z-10 text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors duration-300">
              {{ link.icon }} {{ link.text }}
            </span>
            <div
              class="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0">
            </div>
          </a>
        </div>

        <!-- 游戏控制按钮 -->
        <div class="mt-8">
          <!-- 移动端提示 -->
          <div class="block sm:hidden text-sm text-gray-600 dark:text-gray-300 text-center mb-4">
            游戏功能仅支持桌面端 💻
          </div>

          <!-- 游戏按钮在移动端隐藏 -->
          <button v-if="!isMobile" @click="toggleGame" class="px-6 py-3 text-sm font-medium rounded-full 
                   bg-gradient-to-r from-violet-500 to-indigo-500
                   text-white shadow-md hover:shadow-lg
                   transition-all duration-300 hover:-translate-y-1
                   flex items-center gap-2 mx-auto">
            <span>{{ isGameActive ? '关闭游戏' : '开始游戏' }}</span>
            <span class="text-lg">{{ isGameActive ? '🎮' : '🚀' }}</span>
          </button>

          <!-- 游戏操作提示也在移动端隐藏 -->
          <div v-if="isGameActive && !isMobile" class="mt-4 text-sm text-gray-600 dark:text-gray-300 
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
import { ref, onMounted, onUnmounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const isGameActive = ref(false)
const isMobile = ref(false)
const heroRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const displayText = ref('')
const fullText = 'Welcome to My Blog'

// 检测是否为移动设备，只根据屏幕宽度判断
const checkMobile = () => {
  isMobile.value = window.innerWidth < 640
}

// 打字机效果
const typeText = async () => {
  displayText.value = ''
  for (let i = 0; i < fullText.length; i++) {
    displayText.value += fullText[i]
    await new Promise(resolve => setTimeout(resolve, 100))
  }
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  typeText()

  // 预加载背景图片
  const img = new Image()
  img.src = 'https://s2.loli.net/2025/03/11/buWneUL4fy95sga.jpg'
  img.onload = () => {
    document.documentElement.style.setProperty('--hero-bg-image', `url(${img.src})`)
  }

  // 添加淡入动画
  const fadeElements = document.querySelectorAll('.fade-in')
  fadeElements.forEach(el => {
    setTimeout(() => {
      (el as HTMLElement).style.opacity = '1'
    }, 1000)
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

const toggleGame = async () => {
  if (isMobile.value) return

  isGameActive.value = !isGameActive.value
  if (isGameActive.value) {
    try {
      const script = document.createElement('script')
      script.src = 'https://fastly.jsdelivr.net/gh/stevenjoezhang/asteroids/asteroids.js'
      script.async = true
      script.defer = true
      await new Promise((resolve, reject) => {
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
      })
    } catch (error) {
      console.error('Failed to load game script:', error)
      isGameActive.value = false
    }
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

<style>
/* 关键CSS */
:root {
  --hero-bg-image: none;
}

.bg-hero-pattern {
  background-image: var(--hero-bg-image);
}

/* 渐变动画 */
@keyframes gradient {
  0% {
    transform: translateX(-50%) translateY(-50%) rotate(0deg);
  }

  50% {
    transform: translateX(50%) translateY(50%) rotate(180deg);
  }

  100% {
    transform: translateX(-50%) translateY(-50%) rotate(360deg);
  }
}

.animate-gradient {
  animation: gradient 15s linear infinite;
}

/* 延迟动画 */
.delay-1000 {
  animation-delay: 1s;
}

/* 打字机效果 */
.typewriter {
  border-right: 0.1em solid currentColor;
  animation: blink-caret 0.75s step-end infinite;
}

@keyframes blink-caret {

  from,
  to {
    border-color: transparent
  }

  50% {
    border-color: currentColor;
  }
}

/* 淡入动画 */
.fade-in {
  transition: opacity 1s ease-in-out;
}

/* 标签样式优化 */
.tag-bounce {
  will-change: transform;
  transform: translateZ(0);
  animation: bounce 3s infinite;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dark .tag-bounce {
  border-color: rgba(255, 255, 255, 0.05);
}

/* 非关键CSS */
.tag-bounce {
  will-change: transform;
  transform: translateZ(0);
  animation: bounce 3s infinite;
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

/* 延迟加载的动画CSS */
@media (prefers-reduced-motion: no-preference) {
  .animate-bounce-delay-0 {
    animation-delay: 0s;
  }

  .animate-bounce-delay-1 {
    animation-delay: 0.2s;
  }

  .animate-bounce-delay-2 {
    animation-delay: 0.4s;
  }

  .animate-bounce-delay-3 {
    animation-delay: 0.6s;
  }

  .animate-bounce-delay-4 {
    animation-delay: 0.8s;
  }

  .animate-bounce-delay-5 {
    animation-delay: 1s;
  }
}

/* 响应式和性能优化 */
@media (max-width: 640px) {
  .tag-bounce {
    animation: none;
  }

  .bg-hero-pattern {
    background-attachment: scroll;
  }
}

@media (prefers-reduced-motion: reduce) {
  .tag-bounce {
    animation: none;
  }

  .bg-hero-pattern {
    background-attachment: scroll;
  }

  .bg-gradient-animate {
    animation: none;
  }

  .typewriter {
    animation: none;
  }

  .fade-in {
    transition: none;
  }
}
</style>
