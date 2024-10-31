<template>
  <div className="shareCard">
    <h1 className="title">
      <span>Hi, I'm FunEnn 👋</span>
    </h1>
    <p className="description">
      Start exploring my blog and learn more about me and my work.
    </p><!-- 简介与技术栈 -->
    <div className="flex w-full flex-col justify-between gap-5 mt-4 md:gap-0 md:flex-row">
      <!-- 简介 -->
      <div
        className="bg-stripe md:w-[35%] bg-slate-50 border dark:bg-slate-800 dark:border-slate-900 p-4 rounded-xl" >
        <p className="text-[12px]">💡 I am a software engineering student.</p>
        <div className="mt-2">
          <h1 className="text-xl">😺Love coding and open source.</h1>
          <h1 className="text-xl">🎂2005.6.13 born in FuJian.</h1>
          <h1 className="text-xl lg:text-xl md:text-base">🔥🌱</h1>
          <p></p>
        </div>
      </div>
      <!-- 技术栈 -->
      <div className="md:w-[62%] dark:border-slate-900 border dark:bg-slate-800 bg-slate-50 p-4 rounded-xl ml">
        <p className="text-[12px]">技术栈</p>
        <div className="mt-2 overflow-hidden">
          <!-- TODO:封装ICON组件,抽离背景颜色与svg地址 -->
          <div className="flex gap-4 w-fit icon-scroll">
            <div className="flex justify-center flex-shrink-0 w-20 h-20 p-4 rounded-lg bg-emerald-200">
              <img src="./img/vue.svg" alt="vue.js" />
            </div>
            <div className="flex-shrink-0 w-20 h-20 p-4 bg-red-200 rounded-lg">
              <img src="./img/html.svg" alt="" />
            </div>
            <div className="flex-shrink-0 w-20 h-20 p-4 rounded-lg bg-sky-200">
              <img src="./img/css.svg" alt="" />
            </div>
            <div className="flex justify-center flex-shrink-0 w-20 h-20 p-4 rounded-lg bg-slate-200">
              <img src="./img/tailwind.svg" alt="" />
            </div>
            <div className="flex justify-center w-20 h-20 p-4 flex-shrink-0 rounded-lg bg-yellow">
              <img className="rounded-lg" src="./img/js.webp" alt="" />
            </div>
            <div className="flex justify-center flex-shrink-0 w-20 h-20 p-4 bg-red-400 rounded-lg">
              <img className="rounded-lg" src="./img/git.svg" alt="" />
            </div>
            <div className="flex justify-center flex-shrink-0 w-20 h-20 p-4 rounded-lg bg-slate-200">
              <img className="rounded-lg" src="./img/react.svg" alt="" />
            </div>
            <div className="flex justify-center flex-shrink-0 w-20 h-20 p-4 rounded-lg bg-rose-200">
              <img className="rounded-lg" src="./img/npm.svg" alt="" />
            </div>
            <div className="flex justify-center flex-shrink-0 w-20 h-20 p-4 bg-indigo-200 rounded-lg">
              <img className="rounded-lg" src="./img/java.svg" alt="" />
            </div>
            <div className="flex justify-center flex-shrink-0 w-20 h-20 p-4 rounded-lg bg-emerald-200">
              <img src="./img/vue.svg" alt="vue.js" />
            </div>
            <div className="flex-shrink-0 w-20 h-20 p-4 bg-red-200 rounded-lg">
              <img src="./img/html.svg" alt="" />
            </div>
            <div className="flex-shrink-0 w-20 h-20 p-4 rounded-lg bg-sky-200">
              <img src="./img/css.svg" alt="" />
            </div>
            <div className="flex justify-center flex-shrink-0 w-20 h-20 p-4 rounded-lg bg-slate-200">
              <img src="./img/tailwind.svg" alt="" />
            </div>
            <div className="flex justify-center w-20 h-20 p-4 flex-shrink-0 rounded-lg bg-yellow">
              <img className="rounded-lg" src="./img/js.webp" alt="" />
            </div>
            <div className="flex justify-center flex-shrink-0 w-20 h-20 p-4 bg-red-400 rounded-lg">
              <img className="rounded-lg" src="./img/git.svg" alt="" />
            </div>
            <div className="flex justify-center flex-shrink-0 w-20 h-20 p-4 rounded-lg bg-slate-200">
              <img className="rounded-lg" src="./img/react.svg" alt="" />
            </div>
            <div className="flex justify-center flex-shrink-0 w-20 h-20 p-4 rounded-lg bg-rose-200">
              <img className="rounded-lg" src="./img/npm.svg" alt="" />
            </div>
            <div className="flex justify-center flex-shrink-0 w-20 h-20 p-4 bg-indigo-200 rounded-lg">
              <img className="rounded-lg" src="./img/java.svg" alt="" />
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

/* 基础容器样式 */
.w-full {
    width: 100%;
    /* 全宽 */
}

.md\:w-\[62\%\] {
    width: 62%;
}

.dark\:border-slate-900 {
    border-color: #1e293b;
}

.border {
    border: 1px solid #d1d5db;
}

.dark\:bg-slate-800 {
    background-color: #2d3748;
}

.bg-slate-50 {
    background-color: #f8fafc;
}

.p-4 {
    padding: 1rem;
}

.rounded-xl {
    border-radius: 0.75rem;
}

/* 文本样式 */
.text-\[12px\] {
    font-size: 12px;
}

/* 图标容器样式 */
.mt-2 {
    margin-top: 0.5rem;
}

.overflow-hidden {
    overflow: hidden;
}

/* 图标样式 */
.flex {
    display: flex;
}

.gap-4 {
    gap: 1rem;
}

.w-fit {
    width: fit-content;
}

.icon-scroll {
    overflow-x: auto;
}

/* 单个图标项样式 */
.flex-shrink-0 {
    flex-shrink: 0;
}

.w-20 {
    width: 5rem;
}

.h-20 {
    height: 5rem;
}

.p-4 {
    padding: 1rem;
}

.rounded-lg {
    border-radius: 0.5rem;
}

/* 背景颜色 */
.bg-emerald-200 {
    background-color: #a3e9b8;
}

.bg-red-200 {
    background-color: #fca5a5;
}

.bg-sky-200 {
    background-color: #bae6fd;
}

.bg-slate-200 {
    background-color: #cbd5e1;
}

.bg-yellow {
    background-color: #f7cb4f;
}

.bg-red-400 {
    background-color: #f87171;
}

.bg-rose-200 {
    background-color: #fecdd3;
}

.bg-indigo-200 {
    background-color: #9fafff;
}

/* 图片样式 */
.rounded-lg\ img {
    border-radius: 0.5rem;
}
</style>
