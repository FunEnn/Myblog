<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
    <!-- 顶部统计信息 -->
    <div class="relative mb-12 text-center fade-in" :class="{ 'show': isVisible['header'] }">
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

      <!-- 年月分组 -->
      <div v-for="group in sortedGroups" 
           :key="group.key"
           class="relative mb-16 last:mb-0 pl-8 fade-in"
           :class="{ 'show': isVisible[group.key] }"
           ref="groupRefs">
        <!-- 年月标记点 -->
        <div class="absolute -left-[5px] top-0 w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 ring-4 ring-indigo-500/20"></div>
        
        <!-- 年月标题 -->
        <div class="flex items-center gap-4 mb-8">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-200">
            {{ group.year }}年{{ group.month.toString().padStart(2, '0') }}月
          </h2>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            {{ group.posts.length }} 篇
          </div>
        </div>

        <!-- 文章列表 -->
        <div class="space-y-3">
          <a v-for="article in group.posts" 
             :key="article.regularPath"
             :href="withBase(article.regularPath)"
             class="group block">
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
</template>

<script lang="js" setup>
import { useData, withBase } from "vitepress";
import { computed, ref, onMounted } from "vue";

const { theme } = useData();
const groupRefs = ref([]);
const isVisible = ref({});

// 计算文章总数
const totalPosts = computed(() => theme.value.posts.length);

// 按年月对文章进行分组
const sortedGroups = computed(() => {
  const posts = theme.value.posts;
  const groups = {};

  posts.forEach(post => {
    const date = new Date(post.frontMatter.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const key = `${year}-${month}`;

    if (!groups[key]) {
      groups[key] = {
        key,
        year,
        month,
        posts: []
      };
    }

    groups[key].posts.push(post);
  });

  return Object.values(groups)
    .sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.month - a.month;
    });
});

// 处理滚动动画
onMounted(() => {
  // 立即显示头部
  isVisible.value['header'] = true;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const key = entry.target.__key;
        isVisible.value[key] = true;
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '-50px 0px'
  });

  // 等待 DOM 更新后设置观察者
  setTimeout(() => {
    groupRefs.value.forEach((el, index) => {
      if (el) {
        el.__key = sortedGroups.value[index].key;
        observer.observe(el);
      }
    });
  }, 100);
});
</script>

<style scoped>
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  will-change: opacity, transform;
}

.fade-in.show {
  opacity: 1;
  transform: translateY(0);
}

/* 为每个分组添加延迟 */
.fade-in:nth-child(1) { transition-delay: 0.1s; }
.fade-in:nth-child(2) { transition-delay: 0.2s; }
.fade-in:nth-child(3) { transition-delay: 0.3s; }
.fade-in:nth-child(4) { transition-delay: 0.4s; }
.fade-in:nth-child(5) { transition-delay: 0.5s; }
</style>
