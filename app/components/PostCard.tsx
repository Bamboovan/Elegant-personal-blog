import Link from "next/link";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Post } from "@/lib/posts";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group py-8 border-b border-border last:border-b-0">
      <Link href={`/posts/${post.slug}`} className="block">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
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
          
          <h2 className="font-serif text-2xl md:text-3xl font-normal text-foreground group-hover:text-accent transition-colors leading-tight">
            {post.title}
          </h2>
          
          {post.excerpt && (
            <p className="text-muted-foreground leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>
          )}
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {post.tags.map((tag) => (
                <span 
                  key={tag}
                  className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
