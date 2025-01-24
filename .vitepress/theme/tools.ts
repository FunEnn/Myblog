interface Tool {
  name: string;
  description: string;
  url: string;
}

interface ToolCategory {
  title: string;
  icon: string;
  tools: Tool[];
}

export const toolCategories: ToolCategory[] = [
  {
    title: "科学上网",
    icon: "🌐",
    tools: [
      {
        name: "Clash Verge",
        description: "开源的跨平台代理工具，支持多种协议，界面美观，功能强大",
        url: "https://www.clashverge.dev/install.html",
      },
      {
        name: "v2rayNG",
        description: "Android 平台优秀的代理工具，界面简洁，功能强大",
        url: "https://github.com/2dust/v2rayNG/releases",
      },
      {
        name: "Clash.la",
        description: "Clash 订阅服务平台，提供稳定的代理服务和配置",
        url: "https://www.clash.la/",
      },
    ],
  },
  {
    title: "AI 工具",
    icon: "🤖",
    tools: [
      {
        name: "ChatGPT",
        description:
          "OpenAI 开发的 AI 对话模型，可用于写作、编程、学习等多个领域",
        url: "https://chat.openai.com/",
      },
      {
        name: "Claude",
        description: "Anthropic 开发的 AI 助手，擅长文本分析和学术研究",
        url: "https://claude.ai/",
      },
      {
        name: "DeepSeek",
        description: "开源的 AI 助手，擅长代码开发，支持中文对话",
        url: "https://chat.deepseek.com/",
      },
      {
        name: "Cursor",
        description: "基于 AI 的代码编辑器，内置 GPT-4，提供智能代码补全和重构",
        url: "https://cursor.sh/",
      },
    ],
  },
  {
    title: "开发工具",
    icon: "💻",
    tools: [
      {
        name: "GitHub.dev",
        description: "在浏览器中直接编辑 GitHub 仓库代码，支持 VS Code 功能",
        url: "https://github.dev/",
      },
      {
        name: "StackBlitz",
        description: "在线 IDE，快速启动前端项目，支持实时预览",
        url: "https://stackblitz.com/",
      },
    ],
  },
  {
    title: "图片工具",
    icon: "🎨",
    tools: [
      {
        name: "Squoosh",
        description: "Google 开发的图片压缩工具，支持多种格式和压缩算法",
        url: "https://squoosh.app/",
      },
      {
        name: "Remove.bg",
        description: "自动移除图片背景，支持批量处理",
        url: "https://www.remove.bg/",
      },
    ],
  },
  {
    title: "追番必备",
    icon: "📺",
    tools: [
      {
        name: "蜜柑计划",
        description: "新番资源聚合下载站，支持 RSS 订阅",
        url: "https://mikanani.me/",
      },
      {
        name: "Bangumi",
        description: "番剧数据库与社区，记录和分享你的追番历程",
        url: "https://bangumi.tv/",
      },
      {
        name: "AGE动漫",
        description: "在线追番网站，资源丰富，更新及时",
        url: "https://www.agemys.org/",
      },
    ],
  },
  {
    title: "漫画资源",
    icon: "📚",
    tools: [
      {
        name: "哔咔漫画",
        description: "免费漫画阅读器，资源丰富，需要科学上网",
        url: "https://picacomic.com/",
      },
      {
        name: "禁漫天堂",
        description: "在线漫画网站，内容丰富，需要科学上网",
        url: "https://18comic.vip/",
      },
      {
        name: "EhViewer",
        description: "安卓平台的 E-Hentai 第三方客户端，界面精美，功能完善",
        url: "https://github.com/Ehviewer-Overhauled/Ehviewer",
      },
      {
        name: "琉璃神社",
        description: "ACG 资源分享网站，内容丰富，需要科学上网",
        url: "https://hacg.ceo/",
      },
    ],
  },
];
