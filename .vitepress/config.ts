import { getPosts, getPostLength } from "./theme/serverUtils";
import { buildBlogRSS } from "./theme/rss";
import { transformerTwoslash } from "@shikijs/vitepress-twoslash";
import mathjax3 from "markdown-it-mathjax3";
import { defineConfig } from 'vitepress'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

async function config() {
  return {
    lang: "en-US",
    title: "FunEnn",
    description: "Home of FunEnn",
    base: "/",
    outDir: ".vitepress/dist",
    ignoreDeadLinks: true, // 或 'localhostLinks'
    head: [
      [
        "link",
        {
          rel: "icon",
          type: "image/svg",
          href: "./avator.svg",
        },
      ],
      [
        "meta",
        {
          name: "author",
          content: "FunEnn",
        },
      ],
      [
        "meta",
        {
          property: "og:title",
          content: "Home",
        },
      ],
      [
        "meta",
        {
          property: "og:description",
          content: "Home of FunEnn",
        },
      ],
    ],
    // cleanUrls: "with-subfolders",
    lastUpdated: false,
    themeConfig: {
      // repo: "clark-cui/homeSite",
      logo: "./avator.svg",
      avator: "./avator.svg",
      search: {
        provider: "local",
      },
      docsDir: "/",
      // docsBranch: "master",
      posts: await getPosts(),
      pageSize: 5,
      postLength: await getPostLength(),
      nav: [
        {
          text: "👋AboutMe",
          link: "/",
        },
        {
          text: "🔖Tags",
          link: "/tags",
        },
        {
          text: "📃Archives",
          link: "/archives",
        },
      ],
      socialLinks: [{ icon: "github", link: "https://github.com/FunEnn" }],
      // outline: 2, //设置右侧aside显示层级
      aside: false,
      // blogs page show firewokrs animation
    },
    buildEnd: buildBlogRSS,
    markdown: {
      theme: {
        light: "vitesse-light",
        dark: "vitesse-dark",
      },
      codeTransformers: [transformerTwoslash()],
      config: (md) => {
        md.use(mathjax3);
      },
    },
    vite: {
      css: {
        postcss: {
          plugins: [
            tailwindcss(),
            autoprefixer(),
          ],
        },
      },
      build: {
        cssMinify: true,
        rollupOptions: {
          output: {
            manualChunks: undefined
          },
          external: [
            'vue',
            'vitepress'
          ]
        },
        resolve: {
          alias: {
            '@': '/docs'
          }
        }
      },
      ssr: {
        noExternal: ['vitepress']
      }
    },
    cleanUrls: true,
    rewrites: {
      ':page': ':page.html'
    },
    srcDir: './docs'
  };
}
export default config();
