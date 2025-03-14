<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- 左侧文章列表 -->
      <div class="lg:col-span-8">
        <!-- 文章统计 -->
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-blue-500">
            Latest Posts
          </h1>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            共 {{ postLength }} 篇文章
          </span>
        </div>

        <!-- 文章列表 - 使用transition-group优化列表动画 -->
        <transition-group 
          name="post-list" 
          tag="div" 
          class="space-y-6">
          <a v-for="item in posts" 
             :key="item.regularPath" 
             :href="withBase(item.regularPath)"
             class="group block p-6 rounded-xl border border-transparent bg-gray-50 dark:bg-gray-800/50 
                    transition-all duration-300 hover:-translate-y-1
                    hover:border-indigo-500/20 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]">
            <!-- 文章标题 -->
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {{ item.frontMatter.title }}
            </h2>
            
            <!-- 文章元信息 -->
            <div class="mt-2 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <time class="flex items-center gap-1">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ transDate(item.frontMatter.date) }}
              </time>
              
              <!-- 标签 -->
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path d="M7 7h.01M7 3h5a1.99 1.99 0 011.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.995 1.995 0 013 12V7a4 4 0 014-4z" 
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <template v-if="item.frontMatter.tags?.length">
                  <span v-for="tag in item.frontMatter.tags" 
                        :key="tag"
                        class="px-2 py-0.5 text-xs rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-400">
                    {{ tag }}
                  </span>
                </template>
              </div>
            </div>

            <!-- 文章摘要 -->
            <p v-if="item.frontMatter.description" 
               class="mt-3 text-gray-600 dark:text-gray-400 line-clamp-2">
              {{ item.frontMatter.description }}
            </p>
          </a>
        </transition-group>
        
        <!-- 分页 -->
        <div class="flex items-center justify-center gap-4 mt-8">
          <button v-if="pageCurrent > 1" 
                  @click="go(pageCurrent - 1)"
                  class="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 
                         hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">
            ← Previous
          </button>
          <span v-if="pagesNum > 1" class="text-sm text-gray-500">
            {{ pageCurrent }}/{{ pagesNum }}
          </span>
          <button v-if="pageCurrent < pagesNum" 
                  @click="go(pageCurrent + 1)"
                  class="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 
                         hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">
            Next →
          </button>
        </div>
      </div>

      <!-- 右侧边栏 - 使用Suspense包装异步组件 -->
      <div class="lg:col-span-4 space-y-6">
        <Suspense>
          <template #default>
            <ShareCard />
          </template>
          <template #fallback>
            <div class="animate-pulse bg-gray-200 dark:bg-gray-700 h-32 rounded-lg"></div>
          </template>
        </Suspense>
        <Suspense>
          <template #default>
            <Projects />
          </template>
          <template #fallback>
            <div class="animate-pulse bg-gray-200 dark:bg-gray-700 h-32 rounded-lg"></div>
          </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineAsyncComponent } from "vue";
import { useData, withBase } from "vitepress";

// 异步加载组件
const ShareCard = defineAsyncComponent(() => import("./ShareCard.vue"));
const Projects = defineAsyncComponent(() => import("./Projects.vue"));

interface Theme {
  posts: Post[]
  postLength: number
  pageSize: number
}

interface Post {
  regularPath: string;
  frontMatter: {
    title: string;
    date: string;
    tags?: string[];
    description?: string;
  };
}

const { theme } = useData();

// 使用计算属性优化数据处理
const posts = ref<Post[]>([]);
const pageCurrent = ref(1);
const pageSize = (theme.value as Theme).pageSize;
const postLength = (theme.value as Theme).postLength;
const pagesNum = Math.ceil(postLength / pageSize);

// 优化分页逻辑
const updatePosts = () => {
  const start = (pageCurrent.value - 1) * pageSize;
  const end = start + pageSize;
  posts.value = ((theme.value as Theme).posts || [])
    .filter(item => item.regularPath.indexOf("index") < 0)
    .slice(start, end);
};

// 初始化文章列表
updatePosts();

// 优化分页切换
const go = (page: number) => {
  pageCurrent.value = page;
  updatePosts();
};

// 优化日期转换
const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
] as const;

const transDate = (date: string) => {
  const [year, month, day] = date.split("-");
  return `${months[parseInt(month) - 1]} ${day}, ${year}`;
};
</script>

<style scoped>
.post-list-move,
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.5s ease;
}

.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.post-list-leave-active {
  position: absolute;
}
</style>
