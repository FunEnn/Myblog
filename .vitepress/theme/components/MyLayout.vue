<template>
  <div>
    <Layout>
      <template #doc-before>
        <ClientOnly>
          <Suspense>
            <template #default>
              <div>
                <Title />
                <Category />
              </div>
            </template>
            <template #fallback>
              <Skeleton />
            </template>
          </Suspense>
        </ClientOnly>
      </template>
      <template #doc-after>
        <div>
          <button type="button" @click="back">cd ··</button>
        </div>
      </template>
      <!-- Home slot-->
      <template #home-hero-before>
        <ClientOnly>
          <Suspense>
            <template #default>
              <HomeHero />
            </template>
            <template #fallback>
              <Skeleton />
            </template>
          </Suspense>
        </ClientOnly>
      </template>
      <template #home-features-after>
        <ClientOnly>
          <Suspense>
            <template #default>
              <Page />
            </template>
            <template #fallback>
              <Skeleton />
            </template>
          </Suspense>
        </ClientOnly>
      </template>
    </Layout>
    <!-- copywright -->
    <CopyWright />
  </div>
</template>

<script lang="ts" setup>
import DefaultTheme from "vitepress/theme";
import { defineAsyncComponent, type Component } from 'vue';
const { Layout } = DefaultTheme;

// 先定义骨架屏组件
const Skeleton = defineAsyncComponent({
  loader: () => import(/* webpackChunkName: "skeleton" */ './Skeleton.vue'),
  delay: 0,
  timeout: 3000
}) as Component;

// 异步加载其他非关键组件
const HomeHero = defineAsyncComponent({
  loader: () => import(/* webpackChunkName: "home-hero" */ './HomeHero.vue'),
  loadingComponent: Skeleton,
  delay: 200,
  timeout: 3000
}) as Component;

const CopyWright = defineAsyncComponent({
  loader: () => import(/* webpackChunkName: "copy-wright" */ './CopyWright.vue'),
  delay: 200,
  timeout: 3000
}) as Component;

const Page = defineAsyncComponent({
  loader: () => import(/* webpackChunkName: "page" */ './Page.vue'),
  loadingComponent: Skeleton,
  delay: 200,
  timeout: 3000
}) as Component;

const Category = defineAsyncComponent({
  loader: () => import(/* webpackChunkName: "category" */ './Category.vue'),
  loadingComponent: Skeleton,
  delay: 200,
  timeout: 3000
}) as Component;

const Title = defineAsyncComponent({
  loader: () => import(/* webpackChunkName: "title" */ './Title.vue'),
  loadingComponent: Skeleton,
  delay: 200,
  timeout: 3000
}) as Component;

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
