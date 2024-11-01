<template>
  <div class="shareCard">
    <h1 class="title">
      <span>Hi, I'm FunEnn 👋</span>
    </h1>
    <p class="description">
      Start exploring my blog and learn more about me and my work.
    </p><!-- 简介与技术栈 -->
    <div class="flex w-full flex-col justify-between gap-5 mt-4 md:gap-0 md:flex-row">
      <!-- 简介 -->
      <div
        class="bg-stripe md:w-[35%] bg-slate-50 border dark:bg-slate-800 dark:border-slate-900 p-4 rounded-xl" >
        <p class="text-[12px]">💡 I am a software engineering student.</p>
        <div class="mt-2">
          <h1 class="text-xl">😺Love coding and open source.</h1>
          <h1 class="text-xl">🎂2005.6.13 born in FuJian.</h1>
          <h1 class="text-xl lg:text-xl md:text-base">🔥🌱</h1>
          <p></p>
        </div>
      </div>
      <!-- 技术栈 -->
      <div class="md:w-[62%] dark:border-slate-900 border dark:bg-slate-800 bg-slate-50 p-4 rounded-xl ml">
        <p class="text-[12px]">技术栈</p>
        <div class="mt-2 overflow-hidden">
          <!-- TODO:封装ICON组件,抽离背景颜色与svg地址 -->
          <div class="flex gap-4 w-fit icon-scroll">
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
          </div>
        </div>
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
    padding: 0 15px;
    text-align: center;
    margin: auto;
    /* 确保.shareCard在父容器中水平居中 */
    width: 70%;
    /* 或者使用max-width来限制最大宽度 */
}

.title {
    display: flex;
    align-items: center;
    justify-content: center;
    /* 水平居中标题 */
    font-size: 1em;
    font-weight: bold;
}

.description {
    margin: 1em 0;
    text-align: center;
    /* 确保描述文本居中 */
}

.icon-scroll {
    display: flex;
    /* 确保.icon-scroll是一个弹性容器 */
    justify-content: center;
    /* 水平居中图标 */
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
