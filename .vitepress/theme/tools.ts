interface Tool {
  name: string;
  description: string;
  url: string;
  isDownload?: boolean;
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
        name: "自由门",
        description: "跨平台的翻墙工具，支持 Windows/Mac/Linux/Android 系统",
        url: "https://github.com/sglfree/freesky",
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
        name: "Google 图片搜索",
        description: "Google 强大的图片搜索引擎，支持以图搜图",
        url: "https://www.google.com/imghp",
      },
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
        url: "https://www.agedm.app/",
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
        url: "https://www.picacomic.com/apps/picacomic-v2.2.1.3.3.4.apk",
        isDownload: true,
      },
      {
        name: "禁漫天堂",
        description: "在线漫画网站，内容丰富，需要科学上网",
        url: typeof window !== 'undefined' && /Android|iPhone|iPad/i.test(window.navigator?.userAgent || '') 
          ? "https://www.18comic.vip/apps/18comic.apk"
          : "https://18comic.vip/",
        isDownload: typeof window !== 'undefined' && /Android|iPhone|iPad/i.test(window.navigator?.userAgent || '')
      },
      {
        name: "Hitomi",
        description: "在线漫画网站，支持多语言，需要科学上网",
        url: "https://hitomi.la/",
      },
      {
        name: "EhViewer",
        description: "安卓平台的 E-Hentai 第三方客户端，界面精美，功能完善",
        url: "https://github.com/Ehviewer-Overhauled/Ehviewer",
      },
    ],
  },
  {
    title: "同人资源",
    icon: "🎬",
    tools: [
      {
        name: "DLsite",
        description: "日本最大的同人作品在线销售网站",
        url: "https://www.dlsite.com/",
      },
      {
        name: "iwara",
        description: "MMD 视频分享平台，需要科学上网",
        url: "https://iwara.tv/",
      },
      {
        name: "PornHub",
        description: "全球最大的成人视频分享平台，支持中文，需要科学上网",
        url: "https://cn.pornhub.com/",
      },
      {
        name: "Rule34Video",
        description: "动漫视频分享平台，需要科学上网",
        url: "https://rule34video.com/",
      },
      {
        name: "琉璃神社",
        description: "ACG 资源分享网站，内容丰富，需要科学上网",
        url: "https://hacg.ceo/",
      },
      {
        name: "Hanime",
        description: "在线动画视频网站，需要科学上网",
        url: "https://hanime1.me/",
      },
    ],
  },
  {
    title: "游戏工具",
    icon: "🎮",
    tools: [
      {
        name: "FLiNG Trainer",
        description: "知名的单机游戏修改器，提供大量热门游戏的修改功能",
        url: "https://flingtrainer.com/",
      },
      {
        name: "赛马娘中文 Wiki",
        description: "赛马娘中文攻略站，包含角色培养、比赛攻略等详细资料",
        url: "https://wiki.biligame.com/umamusume/",
      },
      {
        name: "蔚蓝档案 Wiki",
        description: "BA 蔚蓝档案中文攻略站，学生图鉴、关卡攻略等资料详尽",
        url: "https://ba.gamekee.com/",
      },
      {
        name: "明日方舟 Wiki",
        description:
          "明日方舟中文攻略站，干员图鉴、基建配置、剿灭作战等资料详实",
        url: "https://prts.wiki/",
      },
      {
        name: "星穹铁道 Wiki",
        description: "崩坏：星穹铁道攻略站，角色培养、关卡攻略等资料完善",
        url: "https://wiki.biligame.com/sr/",
      },
      {
        name: "学园偶像大师 Wiki",
        description:
          "学马仕中文攻略站，包含角色培养、剧情翻译、竞技场配队等资料",
        url: "https://www.gamekee.com/gakumas/",
      },
      {
        name: "萌娘百科",
        description: "ACG 文化百科，收录动漫游戏相关资料",
        url: "https://zh.moegirl.org.cn/",
      },
    ],
  },
  {
    title: "Galgame工具",
    icon: "🎯",
    tools: [
      {
        name: "失落小站",
        description: "老牌 Galgame 资源站，收录大量汉化作品和生肉资源",
        url: "https://www.shinnku.com/",
      },
      {
        name: "TouchGal",
        description: "一站式 Galgame 文化社区，提供高质量资源下载",
        url: "https://www.touchgal.io/",
      },
      {
        name: "Kirikiroid2",
        description: "安卓平台的吉里吉里2引擎模拟器，支持大部分日本 Galgame",
        url: "https://github.com/zeas2/Kirikiroid2/releases/download/1.3.9/Kirikiroid2_1.3.9.apk",
        isDownload: true,
      },
      {
        name: "MisakaTranslator",
        description:
          "开源的 Galgame 翻译器，支持文本提取、OCR 识别和多种翻译接口",
        url: "https://github.com/hanmin0822/MisakaTranslator/releases",
      },
    ],
  },
];
