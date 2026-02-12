import { Metadata } from "next";
import { Code2, Palette, Mail, Github, MapPin, Calendar, Sparkles } from "lucide-react";
import { AvatarImage } from "./AvatarImage";

export const metadata: Metadata = {
  title: "关于",
  description: "关于这个博客和作者",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 animate-fade-in-up">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-muted-foreground">关于作者</span>
        </div>
        <h1 className="hero-title mb-4">
          <span className="text-foreground">关于</span>
          <span className="text-gradient">我</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          一个热爱设计与技术的学生，在这里记录我的学习与思考
        </p>
      </div>

      {/* Profile Card */}
      <div className="card-modern p-8 md:p-12 mb-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-purple-500 to-pink-500" />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="relative w-32 h-32">
              <AvatarImage 
                src="/images/avatar.jpg"
                alt="朱凡的头像"
                fallbackText="ZF"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-green-500 border-4 border-background flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">朱凡</h2>
              <p className="text-muted-foreground mb-4">软件工程学生 / 技术爱好者</p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
                <div className="badge">
                  <MapPin className="w-3 h-3 mr-1" />
                  成都
                </div>
                <div className="badge">
                  <Calendar className="w-3 h-3 mr-1" />
                  2004年3月
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                四川大学软件工程专业在读学生。
                喜欢探索新技术，享受将想法转化为实际产品的过程。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Tech Stack */}
        <div className="card-modern p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground">技术栈</h3>
          </div>
          
          <ul className="space-y-3">
            {[
              { name: 'Next.js', desc: 'React 框架' },
              { name: 'TypeScript', desc: '类型安全' },
              { name: 'Tailwind CSS', desc: '原子化 CSS' },
              { name: 'Node.js', desc: '后端开发' },
            ].map((tech) => (
              <li key={tech.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="font-medium text-foreground">{tech.name}</span>
                <span className="text-sm text-muted-foreground">{tech.desc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Design */}
        <div className="card-modern p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground">设计理念</h3>
          </div>
          
          <ul className="space-y-3">
            {[
              '以内容为核心的极简主义',
              '精致的排版与留白',
              '流畅的交互动画',
              '暗色/亮色模式适配',
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Contact Card */}
      <div className="card-modern p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-foreground">联系我</h3>
        </div>
        
        <p className="text-muted-foreground mb-6">
          如果你有任何问题、建议，或者只是想聊聊天，欢迎通过以下方式联系我：
        </p>
        
        <div className="flex flex-wrap gap-3">
          <a 
            href="mailto:2199591086@qq.com"
            className="btn-secondary gap-2"
          >
            <Mail className="w-4 h-4" />
            <span>发送邮件</span>
          </a>
          <a 
            href="https://github.com/Bamboovan"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary gap-2"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}
