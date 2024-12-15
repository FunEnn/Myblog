<template>
  <div class="shareCard w-full md:w-[70%] px-4 md:px-15 py-6 md:py-8">
    <h1 class="title text-lg md:text-xl">
      <span>Hi, I'm FunEnn 👋</span>
    </h1>
    <p class="description text-sm md:text-base my-3 md:my-4">
      Start exploring my blog and learn more about me and my work.
    </p>
    <div class="flex w-full flex-col justify-between gap-3 md:gap-5 mt-4 md:flex-row">
      <div class="w-full md:w-[35%] bg-stripe bg-slate-50 border dark:bg-slate-800 dark:border-slate-900 p-3 md:p-4 rounded-xl hover:shadow-lg transition-shadow">
        <p class="text-[11px] md:text-[12px] font-bold text-emerald-600">About Me</p>
        <div class="mt-2">
          <h1 class="text-base md:text-xl">😺 Passionate about coding & open source</h1>
          <h1 class="text-base md:text-xl">🌱 Learning TypeScript & Node.js</h1>
          <h1 class="text-base md:text-xl">🏠 Born and raised in Fujian, China</h1>
        </div>
      </div>
      <div class="w-full md:w-[62%] dark:border-slate-900 border dark:bg-slate-800 bg-slate-50 p-3 md:p-4 rounded-xl hover:shadow-lg transition-shadow">
        <p class="text-[11px] md:text-[12px] font-bold text-emerald-600">Tech Stack</p>
        <div class="mt-2 overflow-hidden">
          <div class="flex gap-3 md:gap-4 w-fit icon-scroll">
            <div class="flex justify-center flex-shrink-0 w-16 md:w-20 h-16 md:h-20 p-3 md:p-4 rounded-lg bg-emerald-200">
              <img src="./img/vue.svg" alt="vue.js" />
            </div>
            <div class="flex-shrink-0 w-20 h-20 p-4 bg-red-200 rounded-lg">
              <img src="./img/html.svg" alt="" />
            </div>
            <div class="flex-shrink-0 w-20 h-20 p-4 rounded-lg bg-sky-200">
              <img src="./img/css.svg" alt="" />
            </div>
            <div class="flex justify-center flex-shrink-0 w-20 h-20 p-4 rounded-lg bg-slate-200">
              <img src="./img/tailwind.svg" alt="" />
            </div>
            <div class="flex justify-center w-20 h-20 p-4 flex-shrink-0 rounded-lg bg-[#f7cb4f]">
              <img class="rounded-lg" src="./img/js.webp" alt="" />
            </div>
            <div class="flex justify-center flex-shrink-0 w-20 h-20 p-4 bg-red-400 rounded-lg">
              <img class="rounded-lg" src="./img/git.svg" alt="" />
            </div>
            <div class="flex justify-center flex-shrink-0 w-20 h-20 p-4 rounded-lg bg-slate-200">
              <img class="rounded-lg" src="./img/react.svg" alt="" />
            </div>
            <div class="flex justify-center flex-shrink-0 w-20 h-20 p-4 rounded-lg bg-rose-200">
              <img class="rounded-lg" src="./img/npm.svg" alt="" />
            </div>
            <div class="flex justify-center flex-shrink-0 w-20 h-20 p-4 bg-indigo-200 rounded-lg">
              <img class="rounded-lg" src="./img/java.svg" alt="" />
            </div>
            <div class="flex justify-center flex-shrink-0 w-20 h-20 p-4 bg-slate-200 rounded-lg">
              <img class="rounded-lg" src="./img/nextjs.svg" alt="" />
            </div>
            <div class="flex justify-center flex-shrink-0 w-20 h-20 p-4 rounded-lg bg-emerald-200">
              <img src="./img/vue.svg" alt="vue.js" />
            </div>
            <div class="flex-shrink-0 w-20 h-20 p-4 bg-red-200 rounded-lg">
              <img src="./img/html.svg" alt="" />
            </div>
            <div class="flex-shrink-0 w-20 h-20 p-4 rounded-lg bg-sky-200">
              <img src="./img/css.svg" alt="" />
            </div>
            <div class="flex justify-center flex-shrink-0 w-20 h-20 p-4 rounded-lg bg-slate-200">
              <img src="./img/tailwind.svg" alt="" />
            </div>
            <div class="flex justify-center w-20 h-20 p-4 flex-shrink-0 rounded-lg bg-[#f7cb4f]">
              <img class="rounded-lg" src="./img/js.webp" alt="" />
            </div>
            <div class="flex justify-center flex-shrink-0 w-20 h-20 p-4 rounded-lg">
              <img class="rounded-lg" src="./img/git.svg" alt="" />
            </div>
            <div class="flex justify-center flex-shrink-0 w-20 h-20 p-4 rounded-lg bg-slate-200">
              <img class="rounded-lg" src="./img/react.svg" alt="" />
            </div>
            <div class="flex justify-center flex-shrink-0 w-20 h-20 p-4 rounded-lg bg-rose-200">
              <img class="rounded-lg" src="./img/npm.svg" alt="" />
            </div>
            <div class="flex justify-center flex-shrink-0 w-20 h-20 p-4 bg-indigo-200 rounded-lg">
              <img class="rounded-lg" src="./img/java.svg" alt="" />
            </div>
            <div class="flex justify-center flex-shrink-0 w-20 h-20 p-4 bg-slate-200 rounded-lg">
              <img class="rounded-lg" src="./img/nextjs.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full mt-4 md:mt-6">
      <h2 class="text-lg md:text-xl font-bold mb-3 md:mb-4">Recent Projects</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <a href="https://www.2024devtools.top" target="_blank"
          class="project-card p-3 md:p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border hover:shadow-lg transition-all hover:-translate-y-1">
          <div class="flex justify-between items-start">
            <h3 class="text-base md:text-lg font-bold">Dev Tools</h3>
            <svg class="w-4 h-4 md:w-5 md:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
          <p class="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-2">
            一个为开发者提供常用工具集合的网站，包含各种实用的开发工具和资源。
          </p>
          <div class="flex flex-wrap gap-1 sm:gap-2 mt-2 md:mt-3">
            <span class="text-[10px] md:text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">React</span>
            <span class="text-[10px] md:text-xs px-2 py-1 bg-sky-100 text-sky-800 rounded">TypeScript</span>
            <span class="text-[10px] md:text-xs px-2 py-1 bg-cyan-100 text-cyan-800 rounded">Tailwind</span>
            <span class="text-[10px] md:text-xs px-2 py-1 bg-[#10a37f1a] text-[#10a37f] rounded">OpenAI</span>
            <span class="text-[10px] md:text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded">Vite</span>
          </div>
        </a>
        <a href="https://github.com/FunEnn/Myblog" target="_blank"
          class="project-card p-3 md:p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border hover:shadow-lg transition-all hover:-translate-y-1">
          <div class="flex justify-between items-start">
            <h3 class="text-base md:text-lg font-bold">个人博客</h3>
            <svg class="w-4 h-4 md:w-5 md:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
          <p class="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-2">
            基于VitePress构建的个人博客，分享技术文章和学习心得。
          </p>
          <div class="flex gap-2 mt-3">
            <span class="text-xs px-2 py-1 bg-emerald-100 text-emerald-800 rounded">VitePress</span>
            <span class="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">Markdown</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>
<style scoped>
.shareCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: auto;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.social-icon {
  padding: 0.5rem;
  border-radius: 9999px;
  background-color: #f1f5f9;
  transition: transform 0.2s;
}

.social-icon:hover {
  transform: scale(1.1);
}

.stat-item {
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: rgba(255, 255, 255, 0.5);
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
  font-weight: bold;
}

.description {
  margin: 1em 0;
  text-align: center;
}

.icon-scroll {
  display: flex;
  justify-content: center;
  animation: iconScroll 20s linear infinite;
}

@keyframes iconScroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}
</style>
