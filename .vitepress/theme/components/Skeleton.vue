<template>
  <div class="p-5">
    <div v-for="i in 3" :key="i" class="mb-5 p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
      <div class="h-6 w-3/5 mb-3 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
      <div class="space-y-2">
        <div class="h-4 w-full rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        <div class="h-4 w-4/5 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 骨架屏组件
</script>

<style scoped>

@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.6;
  }
}
</style> 