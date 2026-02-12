import { Metadata } from "next";
import Link from "next/link";
import { getAllTags } from "@/lib/posts";
import { Tag, Hash, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "标签",
  description: "按标签浏览文章",
};

export default function TagsPage() {
  const tags = getAllTags();
  
  // Sort tags by count (most popular first)
  const sortedTags = [...tags].sort((a, b) => b.count - a.count);
  
  // Calculate tag size based on count
  const maxCount = Math.max(...tags.map(t => t.count), 1);
  const getTagSize = (count: number) => {
    const ratio = count / maxCount;
    if (ratio > 0.7) return 'text-lg px-6 py-3';
    if (ratio > 0.4) return 'text-base px-5 py-2.5';
    return 'text-sm px-4 py-2';
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 animate-fade-in-up">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
          <Tag className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-muted-foreground">{tags.length} 个标签</span>
        </div>
        <h1 className="hero-title mb-4">
          <span className="text-gradient">标签</span>云
        </h1>
        <p className="text-xl text-muted-foreground max-w-lg mx-auto">
          按主题浏览所有文章，发现你感兴趣的内容
        </p>
      </div>

      {/* Tags Grid */}
      {tags.length === 0 ? (
        <div className="card-modern p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center">
            <Hash className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-lg mb-2">还没有标签</p>
          <p className="text-sm text-muted-foreground/60">写文章时添加标签来组织内容</p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-3">
          {sortedTags.map(({ tag, count }, index) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className={`group relative ${getTagSize(count)} rounded-xl border border-border bg-card hover:border-accent hover:bg-accent/5 transition-all duration-300 animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <span className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-accent/60 group-hover:text-accent transition-colors" />
                <span className="font-medium text-foreground group-hover:text-accent transition-colors">
                  {tag}
                </span>
                <span className="text-muted-foreground group-hover:text-accent/70 transition-colors">
                  {count}
                </span>
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Quick Stats */}
      {tags.length > 0 && (
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="card-modern p-6 text-center">
            <div className="text-3xl font-bold text-gradient mb-1">{tags.length}</div>
            <div className="text-sm text-muted-foreground">总标签数</div>
          </div>
          <div className="card-modern p-6 text-center">
            <div className="text-3xl font-bold text-gradient mb-1">
              {sortedTags[0]?.count || 0}
            </div>
            <div className="text-sm text-muted-foreground">最热门标签</div>
          </div>
          <div className="card-modern p-6 text-center">
            <div className="text-3xl font-bold text-gradient mb-1">
              {Math.round(tags.reduce((acc, t) => acc + t.count, 0) / tags.length)}
            </div>
            <div className="text-sm text-muted-foreground">平均文章数</div>
          </div>
          <div className="card-modern p-6 text-center">
            <div className="text-3xl font-bold text-gradient mb-1">
              {tags.filter(t => t.count === 1).length}
            </div>
            <div className="text-sm text-muted-foreground">唯一标签</div>
          </div>
        </div>
      )}
    </div>
  );
}
