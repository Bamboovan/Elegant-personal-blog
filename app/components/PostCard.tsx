import Link from "next/link";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Post } from "@/lib/posts";
import { Clock, Calendar } from "lucide-react";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group py-8 border-b border-border last:border-b-0">
      <Link href={`/posts/${post.slug}`} className="block">
        <div className="flex flex-col gap-3">
          {/* 日期和阅读时间 */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
          
          {/* 标题 */}
          <h2 className="font-serif text-2xl md:text-3xl font-normal text-foreground group-hover:text-accent transition-colors leading-tight">
            {post.title}
          </h2>
          
          {/* 摘要 */}
          {post.excerpt && (
            <p className="text-muted-foreground leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>
          )}
          
          {/* 标签 - 使用新样式 */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {post.tags.map((tag) => (
                <span 
                  key={tag}
                  className="tag-elegant"
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
