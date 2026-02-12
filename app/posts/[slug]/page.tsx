import { Metadata } from "next";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { getPostBySlug, getPostHtml, getAllPosts } from "@/lib/posts";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, FileText, Hash } from "lucide-react";
import { ShareButton } from "./ShareButton";

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

function addDropCap(html: string): string {
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
    <article className="max-w-3xl mx-auto px-6 py-12 md:py-16 animate-fade-in-up">
      {/* Back link */}
      <div className="mb-8">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>返回首页</span>
        </Link>
      </div>

      {/* Article Header Card */}
      <div className="card-modern p-8 md:p-12 mb-12 relative overflow-hidden">
        {/* Gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-purple-500 to-pink-500" />
        
        <div className="relative z-10">
          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.date} className="font-medium">
                {format(new Date(post.date), "yyyy年M月d日", { locale: zhCN })}
              </time>
            </div>
            {post.readingTime && (
              <>
                <span className="text-border">·</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{post.readingTime} 分钟阅读</span>
                </div>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {post.excerpt}
            </p>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="badge hover:bg-accent hover:text-accent-foreground"
                >
                  <Hash className="w-3 h-3 mr-1" />
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Article Content */}
      <div 
        className="prose max-w-none mb-16"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {/* Article Footer */}
      <div className="border-t border-border pt-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center text-white font-bold text-lg">
              ZF
            </div>
            <div>
              <p className="font-medium text-foreground">朱凡</p>
              <p className="text-sm text-muted-foreground">分享设计、技术与生活的思考</p>
            </div>
          </div>
          
          <ShareButton title={post.title} />
        </div>
      </div>
    </article>
  );
}
