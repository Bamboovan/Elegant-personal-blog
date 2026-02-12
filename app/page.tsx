import { PostCard } from "./components/PostCard";
import { getAllPosts } from "@/lib/posts";
import { Hero } from "./components/Hero";
import { PenLine, Sparkles } from "lucide-react";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="relative">
      {/* Shared background - extends from Hero through content */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] rounded-full bg-gradient-to-br from-pink-500/8 to-rose-500/8 blur-3xl" />
        <div className="absolute top-2/3 left-1/3 w-80 h-80 rounded-full bg-gradient-to-br from-violet-500/8 to-indigo-500/8 blur-3xl" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>

      <div className="relative z-10">
        <Hero />
        
        <div id="content" className="max-w-4xl mx-auto px-6 pb-24 -mt-8">
          {/* Section Header - glass card */}
          <div className="glass-card rounded-2xl p-6 mb-8 animate-fade-in-up">
            <div className="flex items-center justify-between">
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
          </div>

          {posts.length === 0 ? (
            <div className="glass-card rounded-2xl p-12 text-center animate-fade-in-up">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/50 dark:bg-white/5 flex items-center justify-center">
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>查看所有标签</span>
                <span className="text-lg">→</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
