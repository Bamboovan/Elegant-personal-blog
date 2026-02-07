import { Metadata } from "next";
import Link from "next/link";
import { getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "标签",
  description: "按标签浏览文章",
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-serif text-4xl md:text-5xl font-normal text-foreground mb-4">
        标签
      </h1>
      <p className="text-muted-foreground text-lg mb-12">
        按主题浏览文章
      </p>
      
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
              className="group flex items-center gap-2 px-4 py-2 bg-muted rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <span className="text-base">{tag}</span>
              <span className="text-sm text-muted-foreground group-hover:text-accent-foreground/70">
                {count}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
