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
        <div className="card-modern p-6 md:p-8 relative overflow-hidden">
          {/* Hover gradient overlay */}
          <div 
            className={`absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`} 
          />
          
          {/* Accent line on hover */}
          <div 
            className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent via-purple-500 to-pink-500 transition-all duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`} 
          />

          <div className="relative z-10">
            {/* Top row: Date, Reading time, Arrow */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
              
              {/* Arrow indicator */}
              <div 
                className={`w-10 h-10 rounded-full border border-border flex items-center justify-center transition-all duration-300 ${
                  isHovered 
                    ? 'bg-accent border-accent text-accent-foreground translate-x-1 -translate-y-1' 
                    : 'bg-transparent text-muted-foreground'
                }`}
              >
                <ArrowUpRight className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'rotate-0' : '-rotate-45'}`} />
              </div>
            </div>

            {/* Title */}
            <h2 className={`text-xl md:text-2xl font-bold mb-3 leading-tight transition-colors duration-300 ${
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
                    className="badge"
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
