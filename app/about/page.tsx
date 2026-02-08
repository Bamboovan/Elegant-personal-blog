import { Metadata } from "next";
import { DecorativeDivider, TextDivider } from "../components/DecorativeDivider";
import { User, Code2, Palette, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "关于",
  description: "关于这个博客和作者",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 animate-fade-in-up">
      <div className="flex items-center gap-3 mb-4">
        <User className="w-6 h-6 text-accent/60" />
        <h1 className="font-serif text-4xl md:text-5xl font-normal text-foreground">
          关于
        </h1>
      </div>
      
      <DecorativeDivider symbol="asterisk" className="mb-12" />
      
      <div className="prose max-w-none">
        <p className="drop-cap text-lg leading-relaxed">
          这是一个简约的个人博客，专注于分享关于设计、技术与生活的思考。
        </p>
        
        <p>
          博客的设计遵循"编辑式极简主义"理念：以内容为核心，通过精致的字体排版、
          克制的配色和充足的留白，创造一个宁静而专注的阅读体验。
        </p>

        <TextDivider>自我介绍</TextDivider>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 not-prose">
          <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
            <span className="text-muted-foreground text-sm w-20">姓名</span>
            <span className="font-medium">朱凡</span>
          </div>
          <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
            <span className="text-muted-foreground text-sm w-20">出生年月</span>
            <span>2004年3月</span>
          </div>
          <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
            <span className="text-muted-foreground text-sm w-20">院校</span>
            <span>四川大学 / 软件工程</span>
          </div>
          <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
            <span className="text-muted-foreground text-sm w-20">职业</span>
            <span>学生</span>
          </div>
        </div>
        
        <TextDivider>技术栈</TextDivider>
        
        <div className="flex items-center gap-2 mb-4">
          <Code2 className="w-5 h-5 text-accent/60" />
        </div>
        
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
        
        <TextDivider>设计原则</TextDivider>
        
        <div className="flex items-center gap-2 mb-4">
          <Palette className="w-5 h-5 text-accent/60" />
        </div>
        
        <ul>
          <li>温暖米白背景，减少视觉疲劳</li>
          <li>精致衬线字体，提升阅读体验</li>
          <li>单栏布局，专注内容本身</li>
          <li>微妙纹理，增添质感</li>
          <li>支持暗色模式，适应不同环境</li>
        </ul>
        
        <DecorativeDivider symbol="flourish" className="my-12" />
        
        <div className="flex items-start gap-3 p-6 bg-muted/50 rounded-lg not-prose">
          <Mail className="w-5 h-5 text-accent/60 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-muted-foreground text-sm mb-1">联系方式</p>
            <p className="text-foreground">
              如有任何问题或建议，欢迎通过邮件联系：
              <a 
                href="mailto:2199591086@qq.com" 
                className="text-accent hover:underline underline-offset-4"
              >
                2199591086@qq.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
