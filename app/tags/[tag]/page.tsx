import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { PostCard } from "../../components/PostCard";
import { DecorativeDivider } from "../../components/DecorativeDivider";
import { Tag, ArrowLeft, FileText } from "lucide-react";

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(({ tag }) => ({
    tag,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  return {
    title: `标签: ${decodedTag}`,
    description: `关于 ${decodedTag} 的文章`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 animate-fade-in-up">
      <div className="mb-8">
        <Link 
          href="/tags"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>所有标签</span>
        </Link>
        
        <div className="flex items-center gap-3 mb-4">
          <Tag className="w-6 h-6 text-accent/60" />
          <h1 className="font-serif text-4xl md:text-5xl font-normal text-foreground">
            <span className="text-muted-foreground">#</span>
            {decodedTag}
          </h1>
        </div>
        
        <div className="flex items-center gap-2 text-muted-foreground">
          <FileText className="w-4 h-4" />
          <span className="text-lg">{posts.length} 篇文章</span>
        </div>
      </div>
      
      <DecorativeDivider symbol="waves" className="mb-12" />
      
      <div className="divide-y divide-border">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
