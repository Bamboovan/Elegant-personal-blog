# 个人博客

一个精致优雅、可直接部署的个人博客网站。采用编辑式极简主义设计，以内容为核心，通过精致的字体排版、克制的配色和充足的留白，创造一个宁静而专注的阅读体验。

## 设计哲学

- **温暖米白背景** (#FDFBF7) — 比纯白更柔和，长时间阅读更舒适
- **精致衬线字体** — Noto Serif 字体带来优雅的阅读体验
- **充足的留白** — 让内容呼吸，减少视觉疲劳
- **微妙的纸张纹理** — 2.5% 透明度的噪点纹理，增添质感而不喧宾夺主
- **克制的配色** — 单一强调色（赭石棕 #8B4513），无渐变、无过度装饰
- **有意的不对称** — 布局打破完美对称，体现手工设计感

## 功能特性

- **Markdown 文章支持** — 使用 Markdown 编写文章，支持代码高亮、表格等
- **标签分类系统** — 文章按标签分类管理
- **暗色/亮色模式** — 支持手动切换或跟随系统偏好
- **RSS 订阅** — 自动生成 RSS 源，方便读者订阅
- **SEO 优化** — 自动生成 meta 标签、Open Graph 标签
- **响应式设计** — 完美适配桌面、平板、手机等各种屏幕尺寸
- **静态生成** — 纯静态 HTML，加载速度极快

## 技术栈

- **Next.js 16** — React 框架，支持静态导出
- **React 19** — 用户界面库
- **Tailwind CSS 4** — 原子化 CSS 框架
- **TypeScript** — 类型安全的 JavaScript
- **Gray Matter** — 解析 Markdown 前置数据
- **Remark** — Markdown 处理

## 快速开始

### 环境要求

- Node.js 18 或更高版本
- npm 或 yarn 包管理器

### 安装依赖

```bash
cd my-app
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:3000 查看效果。

### 添加文章

在 `content/posts` 目录下创建 `.md` 文件：

```markdown
---
title: "文章标题"
date: "2025-02-07"
excerpt: "文章摘要，显示在文章列表中"
tags: ["标签1", "标签2"]
---

# 正文标题

正文内容支持 **加粗**、*斜体*、代码块等 Markdown 语法。

## 代码示例

```javascript
console.log("Hello, World!");
```

## 列表

- 项目一
- 项目二
- 项目三

> 引用文本
```

### 构建静态文件

```bash
npm run build
```

构建完成后，静态文件会生成在 `dist` 目录中。

## 项目结构

```
my-app/
├── app/                    # Next.js 应用目录
│   ├── components/         # 可复用组件
│   │   ├── Header.tsx      # 页面头部导航
│   │   ├── Footer.tsx      # 页面底部
│   │   ├── PostCard.tsx    # 文章卡片
│   │   └── ThemeToggle.tsx # 暗色模式切换
│   ├── posts/[slug]/       # 文章详情页（动态路由）
│   │   └── page.tsx
│   ├── tags/               # 标签相关页面
│   │   ├── page.tsx        # 标签列表
│   │   └── [tag]/          # 单个标签页
│   │       └── page.tsx
│   ├── about/              # 关于页面
│   │   └── page.tsx
│   ├── rss.xml/            # RSS 生成
│   │   └── route.ts
│   ├── globals.css         # 全局样式（设计系统）
│   ├── layout.tsx          # 根布局
│   ├── template.tsx        # 页面模板（含 Header/Footer）
│   └── page.tsx            # 首页
├── content/                # 内容目录
│   └── posts/              # Markdown 文章
│       └── hello-world.md
├── lib/                    # 工具函数
│   ├── posts.ts            # 文章处理逻辑
│   └── rss.ts              # RSS 生成逻辑
├── dist/                   # 构建输出目录（静态文件）
├── next.config.ts          # Next.js 配置
├── package.json            # 项目依赖
└── README.md               # 项目说明
```

## 自定义配置

### 修改个人信息

编辑 `app/layout.tsx` 中的元数据：

```typescript
export const metadata: Metadata = {
  title: {
    default: "你的名字",
    template: "%s | 你的名字",
  },
  description: "你的博客描述",
  authors: [{ name: "你的名字" }],
};
```

编辑 `app/about/page.tsx` 添加个人介绍。

### 调整设计系统

编辑 `app/globals.css`：

```css
:root {
  /* 配色 */
  --background: #FDFBF7;    /* 背景色 */
  --foreground: #2C2C2C;    /* 文字色 */
  --accent: #8B4513;        /* 强调色 */
  --border: #E8E5E0;        /* 边框色 */
  
  /* 字体 */
  --font-serif: "Noto Serif SC", Georgia, serif;
  
  /* 圆角 */
  --radius: 0.5rem;
}
```

### 更换字体

在 `app/layout.tsx` 中修改 Google Fonts 链接：

```html
<link 
  href="https://fonts.googleapis.com/css2?family=你的字体&display=swap" 
  rel="stylesheet" 
/>
```

在 `globals.css` 中更新字体变量。

## 许可证

MIT License

---

如有问题或建议，欢迎通过以下方式联系：
- 邮箱：your-email@example.com
- GitHub：github.com/yourusername
