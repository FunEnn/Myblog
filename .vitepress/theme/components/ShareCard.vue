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
              <img className="rounded-lg" src="./img/nest.png" alt="" />
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
              <img className="rounded-lg" src="./img/nest.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import './shareCard.css'
</script>
<style scoped>
.shareCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
  text-align: center;
}

.title {
  display: flex;
  align-items: center;
  font-size: 2.2em;
  font-weight: bold;
}

.description {
  margin: 1em 0;
}

.icon-scroll {
  animation: iconScroll 20s linear infinite;
}

.ml {
  margin-left: 2rem ;
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
