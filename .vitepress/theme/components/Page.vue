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

        <!-- 文章列表 -->
        <div class="space-y-6">
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
                <span v-if="item.frontMatter.tags" 
                      v-for="tag in item.frontMatter.tags" 
                      :key="tag"
                      class="px-2 py-0.5 text-xs rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-400">
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- 文章摘要 -->
            <p v-if="item.frontMatter.description" 
               class="mt-3 text-gray-600 dark:text-gray-400 line-clamp-2">
              {{ item.frontMatter.description }}
            </p>
          </a>
        </div>
        
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

      <!-- 右侧边栏 -->
      <div class="lg:col-span-4 space-y-6">
        <ShareCard />
        <Projects />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ShareCard from "./ShareCard.vue";
import Projects from "./Projects.vue";
import { useData, withBase } from "vitepress";

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

// get posts
let postsAll = (theme.value as Theme).posts || [];
// get postLength
let postLength = (theme.value as Theme).postLength;
// get pageSize
let pageSize = (theme.value as Theme).pageSize;

//  pagesNum
let pagesNum =
  postLength % pageSize === 0
    ? postLength / pageSize
    : postLength / pageSize + 1;
pagesNum = parseInt(pagesNum.toString());
//pageCurrent
let pageCurrent = ref(1);
// filter index post
postsAll = postsAll.filter((item: Post) => {
  return item.regularPath.indexOf("index") < 0;
});
// pagination
let allMap = {};
for (let i = 0; i < pagesNum; i++) {
  allMap[i] = [];
}
let index = 0;
for (let i = 0; i < postsAll.length; i++) {
  if (allMap[index].length > pageSize - 1) {
    index += 1;
  }
  allMap[index].push(postsAll[i]);
}
// set posts
let posts = ref<Post[]>([]);
posts.value = allMap[pageCurrent.value - 1];

// click pagination
const go = (i) => {
  pageCurrent.value = i;
  posts.value = allMap[pageCurrent.value - 1];
};
// timestamp transform
const transDate = (date: string) => {
  const dateArray = date.split("-");
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const month = months[parseInt(dateArray[1]) - 1];
  return `${month} ${dateArray[2]}, ${dateArray[0]}`;
};
</script>

<style scoped>
.blog-title {
  text-align: center;
  font-weight: bold;
  font-size: 2rem;
  margin-top: 24px;
}
.blogList {
  padding: 30px 0;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.blog {
  width: 85%;
  display: block;
  border-radius: 10px;
  padding: 0 20px;
  margin: 10px;
  background: var(--vp-c-bg);
  max-width: 600px;
  box-shadow: 6px 6px var(--vp-c-brand);
  border: 4px solid #3f4e4f;
  cursor: pointer;
}
.blog:hover {
  text-decoration: none;
  transform: translate(-2px, -2px);
  box-shadow: 10px 10px var(--vp-c-brand);
}
.title {
  color: var(--vp-c-brand-light);
  font-size: 1.2em;
  font-weight: bold;
}
.date {
  padding-bottom: 7px;
}
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 85%;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
}

button {
  display: inline-block;
  position: relative;
  color: var(--vp-c-color-d);
  cursor: pointer;
  font-size: 1.2em;
  font-weight: bold;
}

button::after {
  content: "";
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: var(--vp-c-color-d);
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}
button:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.left {
  position: absolute;
  left: 0;
}
.right {
  position: absolute;
  right: 0;
}
</style>
