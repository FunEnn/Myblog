import { dirname } from "path";
import fg from "fast-glob";
import fs from "fs-extra";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import type { FeedOptions, Item } from "feed";
import { Feed } from "feed";

const DOMAIN = "https://clark-cui.top";
const AUTHOR = {
  name: "FunEnn",
  email: "rongchuancui@gmail.com",
  link: DOMAIN,
};
const OPTIONS: FeedOptions = {
  title: "FunEnn",
  description: "FunEnn' Blog",
  id: `${DOMAIN}/`,
  link: `${DOMAIN}/`,
  copyright: "MIT License",
  feedLinks: {
    json: DOMAIN + "/feed.json",
    atom: DOMAIN + "/feed.atom",
    rss: DOMAIN + "/feed.xml",
  },
  author: AUTHOR,
  image: "https://clark-cui.top/horse.svg",
  favicon: "https://clark-cui.top/horse.svg",
};

const markdown = MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
});

export async function buildBlogRSS() {
  try {
    const posts = await generateRSS();
    // 确保所有文章内容都有值
    const validPosts = posts.map(post => ({
      ...post,
      content: post.content || '',  // 提供默认值
      description: post.description || '',
      title: post.title || 'Untitled'
    }));
    writeFeed("feed", validPosts);
  } catch (error) {
    console.warn('RSS generation failed:', error);
    // 继续构建过程
  }
}

async function generateRSS() {
  const files = await fg("posts/*.md");

  const posts: any[] = (
    await Promise.all(
      files
        .filter((i) => !i.includes("index"))
        .map(async (i) => {
          const raw = await fs.readFile(i, "utf-8");
          const { data, content } = matter(raw);
          
          // 确保内容不为空并进行安全处理
          const safeContent = content || '';
          const html = markdown
            .render(safeContent)
            .replace('src="/', `src="${DOMAIN}/`)
            .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F]/g, ''); // 移除非法字符

          return {
            ...data,
            date: new Date(data.date),
            content: html || '',  // 确保内容不为 undefined
            description: data.description || '',
            title: data.title || 'Untitled',
            author: [AUTHOR],
            link: `${DOMAIN}/${i.replace(".md", ".html")}`,
          };
        })
    )
  ).filter(Boolean);

  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return posts;
}

async function writeFeed(name: string, items: Item[]) {
  const feed = new Feed(OPTIONS);
  items.forEach((item) => feed.addItem(item));

  await fs.ensureDir(dirname(`./.vitepress/dist/${name}`));
  await fs.writeFile(`./.vitepress/dist/${name}.xml`, feed.rss2(), "utf-8");
  await fs.writeFile(`./.vitepress/dist/${name}.atom`, feed.atom1(), "utf-8");
  await fs.writeFile(`./.vitepress/dist/${name}.json`, feed.json1(), "utf-8");
}
