import { PostCard } from "./components/PostCard";
import { getAllPosts } from "@/lib/posts";
import { Hero } from "./components/Hero";
import { PenLine, Sparkles } from "lucide-react";

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      <Hero />
      
      <div id="content" className="max-w-4xl mx-auto px-6 pb-24">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in-up">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">最新文章</h2>
              <p className="text-sm text-muted-foreground">{posts.length} 篇文章</p>
            </div>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="card-modern p-12 text-center animate-fade-in-up">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center">
              <PenLine className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-lg mb-2">还没有文章</p>
            <p className="text-sm text-muted-foreground/60">开始创作你的第一篇文章吧</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post, index) => (
              <PostCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        )}

        {/* View all link */}
        {posts.length > 0 && (
          <div className="mt-12 text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <a 
              href="/tags"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
            >
              <span>查看所有标签</span>
              <span className="text-lg">→</span>
            </a>
          </div>
        )}
      </div>
    </>
  );
}
