import RSS from "rss";
import { getAllPosts } from "./posts";

export function generateRSS(): string {
  const posts = getAllPosts();
  const siteUrl = process.env.SITE_URL || "https://example.com";

  const feed = new RSS({
    title: "Blog",
    description: "A personal blog featuring thoughts on design, technology, and life.",
    site_url: siteUrl,
    feed_url: `${siteUrl}/rss.xml`,
    language: "zh-CN",
    pubDate: new Date(),
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt || post.content.slice(0, 200) + "...",
      url: `${siteUrl}/posts/${post.slug}`,
      guid: post.slug,
      date: post.date,
      categories: post.tags,
    });
  });

  return feed.xml({ indent: true });
}
