import { Metadata } from "next";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { getPostBySlug, getPostHtml, getAllPosts } from "@/lib/posts";
import Link from "next/link";

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

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const contentHtml = await getPostHtml(post);

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <header className="mb-12">
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6">
          <time dateTime={post.date}>
            {format(new Date(post.date), "yyyy年M月d日", { locale: zhCN })}
          </time>
          {post.readingTime && (
            <>
              <span className="text-border">·</span>
              <span>{post.readingTime} 分钟阅读</span>
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
                className="text-sm px-3 py-1 bg-muted text-muted-foreground rounded hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </header>

      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      <footer className="mt-16 pt-8 border-t border-border">
        <Link 
          href="/"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          ← 返回文章列表
        </Link>
      </footer>
    </article>
  );
}
