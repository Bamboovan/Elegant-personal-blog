import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { PostCard } from "../../components/PostCard";
import { Hash, ArrowLeft, FileText, Sparkles } from "lucide-react";

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
    <div className="max-w-4xl mx-auto px-6 py-16 animate-fade-in-up">
      {/* Back link */}
      <div className="mb-8">
        <Link 
          href="/tags"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>所有标签</span>
        </Link>
      </div>

      {/* Header Card */}
      <div className="card-modern p-8 md:p-12 mb-12 relative overflow-hidden">
        {/* Gradient top border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-purple-500 to-pink-500" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center">
              <Hash className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {decodedTag}
              </h1>
            </div>
          </div>
          
          <p className="text-muted-foreground text-lg mb-4">
            关于「{decodedTag}」的所有文章
          </p>
          
          <div className="flex items-center gap-2">
            <div className="badge badge-gradient">
              <FileText className="w-3 h-3 mr-1" />
              {posts.length} 篇文章
            </div>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post, index) => (
          <PostCard key={post.slug} post={post} index={index} />
        ))}
      </div>

      {/* Empty state */}
      {posts.length === 0 && (
        <div className="card-modern p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-lg">该标签下暂无文章</p>
        </div>
      )}
    </div>
  );
}
