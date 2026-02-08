import { Metadata } from "next";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { getPostBySlug, getPostHtml, getAllPosts } from "@/lib/posts";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { DecorativeDivider } from "@/app/components/DecorativeDivider";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: "文章未找到",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

// 为第一个段落添加 drop-cap 类
function addDropCap(html: string): string {
  // 找到第一个 <p> 标签并添加 drop-cap 类
  return html.replace(/<p>/, '<p class="drop-cap">');
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const rawHtml = await getPostHtml(post);
  const contentHtml = addDropCap(rawHtml);

  return (
    <article className="max-w-3xl mx-auto px-6 py-16 animate-fade-in-up">
      <header className="mb-12">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 opacity-60" />
            <time dateTime={post.date}>
              {format(new Date(post.date), "yyyy年M月d日", { locale: zhCN })}
            </time>
          </div>
          {post.readingTime && (
            <>
              <span className="text-border">·</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 opacity-60" />
                <span>{post.readingTime} 分钟阅读</span>
              </div>
            </>
          )}
        </div>
        
        <h1 className="font-serif text-4xl md:text-5xl font-normal text-foreground mb-6 leading-tight">
          {post.title}
        </h1>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="tag-elegant"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </header>

      <DecorativeDivider symbol="waves" className="mb-12" />

      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      <DecorativeDivider symbol="flourish" className="mt-16 mb-8" />

      <footer className="flex items-center justify-between">
        <Link 
          href="/"
          className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
        >
          <span>←</span>
          <span>返回文章列表</span>
        </Link>
      </footer>
    </article>
  );
}
