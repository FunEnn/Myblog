<template>
  <div class="w-full mt-4 md:mt-6">
    <h2 class="text-lg md:text-xl font-bold mb-3 md:mb-4">Recent Projects</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
      <a v-for="project in projects" 
         :key="project.title"
         :href="project.url" 
         target="_blank"
         class="project-card p-3 md:p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border 
                hover:shadow-lg transition-all hover:-translate-y-1">
        <div class="flex justify-between items-start">
          <h3 class="text-base md:text-lg font-bold">{{ project.title }}</h3>
          <svg class="w-4 h-4 md:w-5 md:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
        <p class="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-2">
          {{ project.description }}
        </p>
        <div class="flex flex-wrap gap-1 sm:gap-2 mt-2 md:mt-3">
          <span v-for="tech in project.technologies" 
                :key="tech.name"
                :class="[
                  'text-[10px] md:text-xs px-2 py-1 rounded',
                  tech.bgClass,
                  tech.textClass
                ]">
            {{ tech.name }}
          </span>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Technology {
  name: string
  bgClass: string
  textClass: string
}

interface Project {
  title: string
  url: string
  description: string
  technologies: Technology[]
}

const projects: Project[] = [
  {
    title: 'Dev Tools',
    url: 'https://www.2024devtools.top',
    description: '一个为开发者提供常用工具集合的网站，包含各种实用的开发工具和资源。',
    technologies: [
      { name: 'React', bgClass: 'bg-blue-100', textClass: 'text-blue-800' },
      { name: 'TypeScript', bgClass: 'bg-sky-100', textClass: 'text-sky-800' },
      { name: 'Tailwind', bgClass: 'bg-cyan-100', textClass: 'text-cyan-800' },
      { name: 'OpenAI', bgClass: 'bg-[#10a37f1a]', textClass: 'text-[#10a37f]' },
      { name: 'Vite', bgClass: 'bg-purple-100', textClass: 'text-purple-800' }
    ]
  },
  // 可以添加更多项目...
  {
    title: 'Blog',
    url: 'https://github.com/FunEnn',
    description: '基于 VitePress 构建的个人博客，记录技术学习和生活感悟。',
    technologies: [
      { name: 'Vue', bgClass: 'bg-emerald-100', textClass: 'text-emerald-800' },
      { name: 'VitePress', bgClass: 'bg-green-100', textClass: 'text-green-800' },
      { name: 'TypeScript', bgClass: 'bg-sky-100', textClass: 'text-sky-800' },
      { name: 'Tailwind', bgClass: 'bg-cyan-100', textClass: 'text-cyan-800' }
    ]
  }
]
</script>

<style scoped>
.project-card {
  backdrop-filter: blur(10px);
  border-color: rgba(255, 255, 255, 0.1);
}

@media (prefers-color-scheme: dark) {
  .project-card {
    border-color: rgba(255, 255, 255, 0.1);
  }
}
</style>
