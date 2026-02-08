import { Metadata } from "next";
import Link from "next/link";
import { getAllTags } from "@/lib/posts";
import { DecorativeDivider } from "../components/DecorativeDivider";
import { Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "标签",
  description: "按标签浏览文章",
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 animate-fade-in-up">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Tag className="w-6 h-6 text-accent/60" />
          <h1 className="font-serif text-4xl md:text-5xl font-normal text-foreground">
            标签
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">
          按主题浏览文章
        </p>
      </div>
      
      <DecorativeDivider symbol="dots" className="mb-12" />
      
      {tags.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">
            还没有标签
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {tags.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="group flex items-center gap-2 px-4 py-2 border border-border rounded-full hover:border-accent hover:text-accent transition-all duration-300"
            >
              <span className="text-sm text-muted-foreground group-hover:text-accent">#</span>
              <span className="text-base">{tag}</span>
              <span className="text-sm text-muted-foreground/60 group-hover:text-accent/70">
                {count}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
