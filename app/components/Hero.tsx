"use client";

import { ArrowDown, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToContent = () => {
    const content = document.getElementById("content");
    if (content) {
      content.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!mounted) {
    return (
      <section className="relative min-h-[80vh] flex items-center justify-center px-6 py-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="h-20 w-20 mx-auto mb-8 rounded-2xl bg-muted animate-pulse" />
          <div className="h-16 w-3/4 mx-auto mb-6 rounded-lg bg-muted animate-pulse" />
          <div className="h-8 w-1/2 mx-auto rounded-lg bg-muted animate-pulse" />
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-6 py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-pink-500/10 to-rose-500/10 blur-3xl" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-50" />
        
        {/* Floating elements */}
        <div className="absolute top-20 right-[15%] w-4 h-4 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 opacity-60 animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute top-40 left-[10%] w-3 h-3 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 opacity-40 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute bottom-32 right-[20%] w-2 h-2 rounded-full bg-gradient-to-br from-violet-400 to-indigo-400 opacity-50 animate-bounce" style={{ animationDuration: '5s', animationDelay: '0.5s' }} />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Badge */}
        <div 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
        >
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-muted-foreground">记录思考，分享灵感</span>
        </div>

        {/* Main title */}
        <h1 
          className="hero-title mb-8 animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          <span className="text-gradient-animated">探索与创造</span>
          <br />
          <span className="text-foreground">的旅程</span>
        </h1>

        {/* Subtitle */}
        <p 
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          关于设计、技术与生活的思考与记录。
          <br className="hidden md:block" />
          在这里分享我的见解、项目和灵感。
        </p>

        {/* CTA Buttons */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          <button 
            onClick={scrollToContent}
            className="btn-primary gap-2 w-full sm:w-auto"
          >
            <span>开始阅读</span>
            <ArrowDown className="w-4 h-4" />
          </button>
          <a 
            href="/about"
            className="btn-secondary gap-2 w-full sm:w-auto"
          >
            <span>了解更多</span>
          </a>
        </div>

        {/* Stats */}
        <div 
          className="flex items-center justify-center gap-8 md:gap-16 animate-fade-in-up"
          style={{ animationDelay: '0.5s' }}
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">50+</div>
            <div className="text-sm text-muted-foreground">文章</div>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">20+</div>
            <div className="text-sm text-muted-foreground">标签</div>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">3年</div>
            <div className="text-sm text-muted-foreground">创作历程</div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
