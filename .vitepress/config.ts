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
      [
        "script",
        {
          src: "https://fastly.jsdelivr.net/gh/FunEnn/live2d-widget@v1.0.11/dist/autoload.js",
          async: true,
          defer: true
        }
      ]
    ],
    cleanUrls: true,
    lastUpdated: false,
    themeConfig: {
      // repo: "clark-cui/homeSite",
      logo: "./avator.svg",
      avator: "./avator.png",
      darkMode: true,
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
    buildEnd: async () => {
      try {
        await buildBlogRSS();
      } catch (error) {
        console.warn('RSS generation failed:', error);
        // 继续构建过程
      }
    },
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
            manualChunks: {
              'dayjs': ['dayjs'],
              'vue': ['vue', 'vue-router']
            }
          }
        }
      },
    },
  };
}
export default config();
