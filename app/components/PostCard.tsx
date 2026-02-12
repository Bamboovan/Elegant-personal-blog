"use client";

import Link from "next/link";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Post } from "@/lib/posts";
import { Clock, Calendar, ArrowUpRight } from "lucide-react";
import { useState } from "react";

interface PostCardProps {
  post: Post;
  index?: number;
}

export function PostCard({ post, index = 0 }: PostCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article 
      className="group animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/posts/${post.slug}`} className="block">
        <div className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 hover:border-accent/30">
          {/* Hover glow effect */}
          <div 
            className={`absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-purple-500/5 transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`} 
          />

          <div className="relative z-10">
            {/* Top row: Date and reading time */}
            <div className="flex items-center justify-between mb-4">
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
              
              {/* Arrow indicator */}
              <div 
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  isHovered 
                    ? 'border-accent bg-accent text-white translate-x-0.5 -translate-y-0.5' 
                    : 'border-white/20 text-muted-foreground'
                }`}
              >
                <ArrowUpRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'rotate-0' : '-rotate-45'}`} />
              </div>
            </div>

            {/* Title */}
            <h2 className={`text-xl md:text-2xl font-semibold mb-3 leading-snug transition-colors duration-300 ${
              isHovered ? 'text-accent' : 'text-foreground'
            }`}>
              {post.title}
            </h2>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                {post.excerpt}
              </p>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/30 dark:bg-white/5 text-muted-foreground border border-white/20 dark:border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
