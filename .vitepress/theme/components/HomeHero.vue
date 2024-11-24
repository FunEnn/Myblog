<template>
  <div class="content">
    <div class="flex justify-center items-center flex-auto">
      <div
        class="w-36 h-36 mx-auto rounded-full shadow-[0px_0px_3px#147eae] dark:shadow-[0px_0px_3px#9ba0a9] top-1/2 avatar-ping left-1/2">
      </div>
      <div class="absolute">
        <img :src="theme.avator" width="150" height="150" class="avator" />
      </div>
      <p
        class="tag-bounce block absolute left-[70%] sm:left-[69%] md:left-[66%] lg:left-[63%] xl:left-[55%] xl:top-[12%] top-[10%] px-3 py-0.5 text-sm font-bold rounded-full shadow-[0px_0px_1px_1px#eee]">
        🌟 前端开发
      </p>
      <p
        class="tag-bounce block absolute left-[0%] sm:left-[8%] md:left-[13%] lg:left-[21%] xl:left-[37%] xl:top-[12%] top-[10%] px-3 py-0.5 text-sm font-bold rounded-full shadow-[0px_0px_1px_1px#eee]">
        🌙 后端开发
      </p>
      <p
        class="tag-bounce block absolute left-[0%] sm:left-[8%] md:left-[13%] lg:left-[21%] xl:left-[37%] xl:top-[16%] top-[14%] px-3 py-0.5 text-sm font-bold rounded-full shadow-[0px_0px_1px_1px#eee]">
        ✨ 热爱生活
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useData } from "vitepress";
const { theme } = useData();
</script>
<style scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
}

.avator {
  border-radius: 50%;
  border: 5px solid var(--vp-avator-border);
}

@keyframes avator-transform {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

.avator:hover {
  animation: 5s linear 0s infinite avator-transform;
}

.avatar-ping {
  animation: avatarPing 2s ease-in infinite;
}

@keyframes avatarPing {

  0%,
  100% {
    transform: translateX(-0%) translateY(-0%) scale(1.05);
  }

  50% {
    transform: translateX(-0%) translateY(-0%) scale(1.1);
  }
}

.tag-bounce {
  animation: tagBounce 1.5s ease-in infinite;
}

@keyframes tagBounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10%);
  }
}
</style>
