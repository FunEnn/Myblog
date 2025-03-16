<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
    <!-- 顶部统计信息 -->
    <div class="relative mb-12 text-center">
      <h1 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        文章归档
      </h1>
      <p class="mt-4 text-gray-600 dark:text-gray-400">
        共计 {{ totalPosts }} 篇文章，继续加油！
      </p>
      <div class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
    </div>

    <!-- 时间线 -->
    <div class="relative">
      <!-- 垂直线 -->
      <div class="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500/50 via-purple-500/20 to-transparent"></div>

      <!-- 年份分组 -->
      <div v-for="(yearGroup, yearIndex) in groupedPosts" 
           :key="yearGroup.year" 
           class="relative mb-16 last:mb-0 pl-8 fade-up-element"
           :class="{ 'is-visible': visibleElements.has(`year-${yearIndex}`) }"
           :data-key="`year-${yearIndex}`">
        <!-- 年份标记点 -->
        <div class="absolute -left-[5px] top-0 w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 ring-4 ring-indigo-500/20"></div>
        
        <!-- 年份标题 -->
        <div class="flex items-center gap-4 mb-8">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-200">
            {{ yearGroup.year }}
          </h2>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            {{ yearGroup.months.reduce((acc, month) => acc + month.posts.length, 0) }} 篇
          </div>
        </div>

        <!-- 月份分组 -->
        <div class="space-y-8">
          <div v-for="(monthGroup, monthIndex) in yearGroup.months" 
               :key="`${yearGroup.year}-${monthGroup.month}`" 
               class="relative fade-up-element"
               :class="{ 'is-visible': visibleElements.has(`month-${yearIndex}-${monthIndex}`) }"
               :data-key="`month-${yearIndex}-${monthIndex}`">
            <!-- 月份标题 -->
            <div class="flex items-center gap-3 mb-4">
              <span class="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                {{ monthGroup.month.toString().padStart(2, '0') }}月
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {{ monthGroup.posts.length }} 篇
              </span>
            </div>

            <!-- 文章列表 -->
            <div class="space-y-3">
              <a v-for="(article, articleIndex) in monthGroup.posts" 
                 :key="article.regularPath"
                 :href="withBase(article.regularPath)"
                 class="group block fade-up-element"
                 :class="{ 'is-visible': visibleElements.has(`article-${yearIndex}-${monthIndex}-${articleIndex}`) }"
                 :data-key="`article-${yearIndex}-${monthIndex}-${articleIndex}`">
                <div class="p-4 rounded-xl border border-transparent bg-gray-50 dark:bg-gray-800/50 
                           transition-all duration-300 
                           hover:border-indigo-500/20 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]">
                  <div class="flex items-center justify-between gap-4">
                    <div class="flex items-center gap-3 min-w-0">
                      <div class="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-50 
                                transition-all duration-300 
                                group-hover:scale-125 group-hover:opacity-100"></div>
                      <span class="text-gray-700 dark:text-gray-300 
                                 group-hover:text-transparent group-hover:bg-clip-text 
                                 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-500 
                                 transition-colors duration-300 truncate">
                        {{ article.frontMatter.title }}
                      </span>
                    </div>
                    <time class="text-sm text-gray-500 dark:text-gray-400 font-mono whitespace-nowrap">
                      {{ article.frontMatter.date.slice(8, 10) }}日
                    </time>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js" setup>
import { useData, withBase } from "vitepress";
import { computed, ref, onMounted } from "vue";

const { theme } = useData();

// 计算文章总数
const totalPosts = computed(() => theme.value.posts.length);

// 存储可见元素的 Map
const visibleElements = ref(new Set());

// 按年月对文章进行分组
const groupedPosts = computed(() => {
  const posts = theme.value.posts;
  const groups = {};

  posts.forEach(post => {
    const date = new Date(post.frontMatter.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    if (!groups[year]) {
      groups[year] = {
        year,
        months: {}
      };
    }

    if (!groups[year].months[month]) {
      groups[year].months[month] = {
        month,
        posts: []
      };
    }

    groups[year].months[month].posts.push(post);
  });

  return Object.values(groups)
    .sort((a, b) => b.year - a.year)
    .map(yearGroup => ({
      ...yearGroup,
      months: Object.values(yearGroup.months)
        .sort((a, b) => b.month - a.month)
    }));
});

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        visibleElements.value.add(entry.target.dataset.key);
        visibleElements.value = new Set(visibleElements.value);
      }
    });
  }, {
    threshold: 0.1
  });

  // 观察所有需要动画的元素
  document.querySelectorAll('.fade-up-element').forEach(el => {
    observer.observe(el);
  });
});
</script>

<style scoped>
.fade-up-element {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  will-change: opacity, transform;
  filter: blur(10px);
}

.fade-up-element.is-visible {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.yearItem {
  animation: fadeInUp 0.5s ease-out forwards;
}
</style>
