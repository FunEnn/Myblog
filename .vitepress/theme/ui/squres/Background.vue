<template>
  <div class="fixed inset-0 w-full h-full -z-10 pointer-events-none">
    <div class="absolute inset-0 bg-gradient-to-b from-gray-50/80 to-gray-50/50 dark:from-gray-50/30 dark:to-gray-900/50"></div>
    <Squares
      direction="diagonal"
      :speed="0.5"
      borderColor="rgba(99, 102, 241, 0.1)"
      :squareSize="60"
      hoverFillColor="rgba(99, 102, 241, 0.05)"
    />
  </div>
</template>

<script setup>
import Squares from './Squares.vue';

defineOptions({
  name: 'Background'
});
</script> 