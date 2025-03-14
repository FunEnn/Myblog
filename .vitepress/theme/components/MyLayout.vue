<template>
  <div>
    <Layout>
      <template #doc-before>
        <Title />
        <Category />
      </template>
      <template #doc-after>
        <div>
          <button @click="back">cd ··</button>
        </div>
        <!-- <Comments /> -->
      </template>
      <!-- Home slot-->
      <template #home-hero-before>
        <HomeHero />
      </template>
      <template #home-features-after>
        <Page />
      </template>
    </Layout>
    <!-- copywright -->
    <CopyWright />
  </div>
</template>
<script lang="ts" setup>
import DefaultTheme from "vitepress/theme";
import { defineAsyncComponent } from 'vue';
const { Layout } = DefaultTheme;

// 异步加载非关键组件
const HomeHero = defineAsyncComponent(() => import('./HomeHero.vue'));
const CopyWright = defineAsyncComponent(() => import('./CopyWright.vue'));
const Page = defineAsyncComponent(() => import('./Page.vue'));
const Category = defineAsyncComponent(() => import('./Category.vue'));
const Title = defineAsyncComponent(() => import('./Title.vue'));

const back = () => {
  window.history.back();
};
</script>
<style>
/* 关键CSS内联 */
button {
  display: inline-block;
  position: relative;
  color: var(--vp-c-color-d);
  cursor: pointer;
  font-size: 1.2em;
  font-weight: bold;
}

/* 非关键动画CSS延迟加载 */
@media (prefers-reduced-motion: no-preference) {
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
}
</style>
