import { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于",
  description: "关于这个博客和作者",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-serif text-4xl md:text-5xl font-normal text-foreground mb-12">
        关于
      </h1>
      
      <div className="prose max-w-none">
        <p>
          这是一个简约的个人博客，专注于分享关于设计、技术与生活的思考。
        </p>
        
        <p>
          博客的设计遵循"编辑式极简主义"理念：以内容为核心，通过精致的字体排版、
          克制的配色和充足的留白，创造一个宁静而专注的阅读体验。
        </p>

        <h2>自我介绍</h2>
        
        <ul>
          <li>
            <strong>姓名</strong> 朱凡
          </li>
          <li>
            <strong>出生年月</strong> 2004年3月
          </li>
          <li>
            <strong>本科院校</strong> 四川大学
          </li>
          <li>
            <strong>职业</strong> 学生
          </li>
        </ul>
        
        <h2>技术栈</h2>
        
        <ul>
          <li>
            <strong>Next.js</strong> - React 框架，支持静态生成
          </li>
          <li>
            <strong>Tailwind CSS</strong> - 原子化 CSS 框架
          </li>
          <li>
            <strong>Markdown</strong> - 文章内容使用 Markdown 编写
          </li>
        </ul>
        
        <h2>设计原则</h2>
        
        <ul>
          <li>温暖米白背景，减少视觉疲劳</li>
          <li>精致衬线字体，提升阅读体验</li>
          <li>单栏布局，专注内容本身</li>
          <li>微妙纹理，增添质感</li>
          <li>支持暗色模式，适应不同环境</li>
        </ul>
        
        <hr />
        
        <p className="text-muted-foreground">
          如有任何问题或建议，欢迎通过邮件联系：2199591086@qq.com。
        </p>
      </div>
    </div>
  );
}
