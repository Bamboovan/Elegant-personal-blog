# 个人博客 | Cyber Archive

基于 Next.js 16 + React 19 的赛博朋克风格个人主页，采用终端界面设计语言，展示个人时间线、项目、研究成果和荣誉。

## 设计哲学

- **赛博朋克终端美学** — 深色背景、霓虹光效、CRT 扫描线效果
- **命令行交互** — 交互式终端，支持命令输入
- **档案管理系统** — 模拟档案终端的 Tab 界面（时间线/项目/研究/荣誉/交互）
- **动态视觉效果** — 六边形粒子雨、文字发光、故障效果

## 功能特性

- **交互式终端** — 输入命令获取信息（`help`, `whoami`, `github`, `email` 等）
- **时间线系统** — 按时间顺序展示教育、项目、获奖经历
- **项目浏览器** — 文件浏览器风格的项目展示
- **研究成果展示** — 研究项目列表及状态
- **荣誉与证书** — 获奖和证书展示
- **暗色模式** — 纯黑背景配合霓虹光效
- **响应式设计** — 适配桌面和移动设备
- **静态生成** — 纯静态 HTML，可部署到任何静态托管平台

## 技术栈

- **Next.js 16** — React 框架，静态导出
- **React 19** — 用户界面库
- **Tailwind CSS 4** — 原子化 CSS
- **TypeScript** — 类型安全
- **Lucide React** — 图标库

## 快速开始

### 环境要求

- Node.js 18 或更高版本
- npm 包管理器

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:3000 查看效果。

### 构建静态文件

```bash
npm run build
```

构建完成后，静态文件会生成在 `dist` 目录中。

## 项目结构

```
my-app/
├── app/                           # Next.js 应用目录
│   ├── components/                # 组件
│   │   ├── effects/               # 视觉效果组件
│   │   │   ├── CRTEffect.tsx      # CRT 扫描线效果
│   │   │   ├── GlowText.tsx       # 发光文字
│   │   │   ├── GlitchText.tsx     # 故障文字效果
│   │   │   └── HexRain.tsx        # 六边形粒子雨
│   │   ├── sections/              # 页面区块
│   │   │   ├── HeroTerminal.tsx   # 首页 Hero 区域
│   │   │   ├── TimelineLog.tsx    # 时间线
│   │   │   ├── ProjectFileBrowser.tsx  # 项目文件浏览器
│   │   │   ├── ResearchPanel.tsx  # 研究面板
│   │   │   ├── AwardsPanel.tsx    # 荣誉面板
│   │   │   └── ContactTerminal.tsx # 交互式终端
│   │   └── window/                # 窗口组件
│   │       ├── WindowFrame.tsx    # 窗口框架
│   │       ├── WindowTabBar.tsx   # Tab 栏
│   │       ├── WindowContent.tsx  # 窗口内容
│   │       └── StatusBar.tsx      # 状态栏
│   ├── hooks/                     # 自定义 Hooks
│   │   ├── useTypewriter.ts       # 打字机效果
│   │   └── useCurrentTime.ts      # 当前时间
│   ├── globals.css                # 全局样式（赛博朋克主题）
│   ├── layout.tsx                 # 根布局
│   ├── page.tsx                   # 首页
│   └── template.tsx               # 页面模板
├── content/                       # 内容数据（JSON）
│   ├── profile.json               # 个人资料
│   ├── timeline.json              # 时间线数据
│   ├── projects.json              # 项目数据
│   ├── research.json              # 研究数据
│   ├── awards.json                # 荣誉数据
│   └── avatar.jpg                 # 头像图片
├── lib/                           # 工具函数
│   ├── data.ts                    # 数据类型和读取
│   └── utils.ts                   # 工具函数
├── public/                        # 静态资源
│   └── avatar.jpg                 # 头像（构建后使用）
├── dist/                          # 构建输出目录
└── next.config.ts                 # Next.js 配置
```

## 自定义配置

### 修改个人信息

编辑 `content/profile.json`：

```json
{
  "name": "你的名字",
  "alias": "你的别名",
  "role": "你的角色",
  "organization": "所属单位",
  "location": "所在城市",
  "bio": ["个人简介1", "个人简介2"],
  "social": {
    "github": "https://github.com/你的用户名",
    "email": "your.email@example.com"
  }
}
```

### 更新时间线

编辑 `content/timeline.json` 添加时间线事件：

```json
{
  "entries": [
    {
      "timestamp": "2025-01-01",
      "type": "EVENT",
      "category": "EDUCATION",
      "title": "事件标题",
      "description": "事件描述",
      "details": ["详情1", "详情2"]
    }
  ]
}
```

### 更新项目

编辑 `content/projects.json`：

```json
{
  "files": [
    {
      "name": "项目名称",
      "description": "项目描述",
      "tech": ["技术1", "技术2"],
      "status": "ACTIVE",
      "links": {
        "github": "https://github.com/...",
        "demo": "https://..."
      }
    }
  ]
}
```

### 头像设置

将头像图片放入 `public/avatar.jpg`，并在 `content/profile.json` 中设置：

```json
"avatar": "/avatar.jpg"
```

### 终端命令扩展

编辑 `app/components/sections/ContactTerminal.tsx` 中的 `processCommand` 函数添加新命令。

## 部署

构建生成纯静态文件，可部署到：
- Vercel
- Cloudflare Pages
- GitHub Pages
- Netlify
- 任何静态文件托管服务

## 许可证

MIT License

---

如有问题或建议，欢迎联系！
