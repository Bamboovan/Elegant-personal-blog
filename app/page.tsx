import { PostCard } from "./components/PostCard";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {posts.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-muted-foreground text-lg">
            还没有文章，开始写第一篇吧
          </p>
        </div>
      ) : (
        <div>
          <div className="mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-normal text-foreground mb-4">
              每日文章
            </h1>
            <p className="text-muted-foreground text-lg">
              关于设计、技术与生活的思考
            </p>
          </div>
          
          <div className="divide-y divide-border">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
