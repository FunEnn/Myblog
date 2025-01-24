import Theme from "vitepress/theme";
import "./tailwind.css";
import Archives from "./components/Archives.vue";
import Tags from "./components/Tags.vue";
import Articles from "./components/Articles.vue";
import Tools from "./components/Tools.vue";
import MyLayout from "./components/MyLayout.vue";
import TwoslashFloatingVue from "@shikijs/vitepress-twoslash/client";
import "@shikijs/vitepress-twoslash/style.css";
import type { EnhanceAppContext } from "vitepress";
import "./custom.css";

export default {
  extends: Theme,
  Layout: MyLayout,
  enhanceApp({ app }: EnhanceAppContext) {
    app.component("Archives", Archives);
    app.component("Tags", Tags);
    app.component("Articles", Articles);
    app.component("Tools", Tools);
    app.use(TwoslashFloatingVue);
  },
};
