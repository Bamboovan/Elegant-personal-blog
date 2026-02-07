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

---

## 部署到阿里云 ECS

以下是将博客部署到阿里云应用服务器（ECS）的详细步骤：

### 准备工作

1. **购买阿里云 ECS 实例**
   - 登录 [阿里云控制台](https://ecs.console.aliyun.com/)
   - 选择适合的地域和配置（最低 1核1GB 即可）
   - 选择操作系统：推荐 Ubuntu 22.04 LTS
   - 设置安全组：开放 22（SSH）、80（HTTP）、443（HTTPS）端口

2. **配置域名（可选）**
   - 在阿里云域名控制台添加 A 记录，指向 ECS 公网 IP
   - 等待 DNS 解析生效（通常 10-30 分钟）

### 连接服务器

```bash
# 使用 SSH 连接服务器（Mac/Linux）
ssh root@你的服务器IP

# Windows 用户可使用 PuTTY 或 PowerShell
```

### 安装必要软件

```bash
# 更新系统包
apt update && apt upgrade -y

# 安装 Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

# 验证安装
node --version  # 应显示 v18.x.x
npm --version

# 安装 Nginx
apt install -y nginx

# 安装 PM2（进程管理器）
npm install -g pm2

# 安装 Git（可选，用于从仓库拉取代码）
apt install -y git
```

### 上传博客文件

**方式一：使用 SCP 命令（推荐）**

在本地终端执行：

```bash
# 先确保项目已构建
cd /Users/flynn/Code/blog/my-app
npm run build

# 将 dist 目录上传到服务器
scp -r dist/* root@你的服务器IP:/var/www/blog/

# 或者压缩后上传（更快）
cd dist && tar -czf ../blog.tar.gz . && cd ..
scp blog.tar.gz root@你的服务器IP:/tmp/
ssh root@你的服务器IP "mkdir -p /var/www/blog && tar -xzf /tmp/blog.tar.gz -C /var/www/blog/"
```

**方式二：使用 Git**

```bash
# 在服务器上克隆仓库
mkdir -p /var/www
cd /var/www
git clone https://github.com/你的用户名/你的仓库名.git blog

# 进入项目目录并安装依赖
cd blog/my-app
npm install

# 构建项目
npm run build

# 将构建产物移动到正确位置
mv dist/* /var/www/blog/
```

**方式三：使用 FTP/SFTP 工具**

- Mac 用户：使用 Forklift、Transmit 等工具
- Windows 用户：使用 FileZilla、WinSCP 等工具
- 连接服务器后，将 `dist` 目录中的文件上传到 `/var/www/blog/`

### 配置 Nginx

创建 Nginx 配置文件：

```bash
nano /etc/nginx/sites-available/blog
```

添加以下内容（替换 `your-domain.com` 为你的域名或服务器 IP）：

```nginx
server {
    listen 80;
    server_name your-domain.com;  # 或使用你的服务器IP
    root /var/www/blog;
    index index.html;

    # 开启 gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # 缓存静态资源
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 所有路由都指向 index.html（支持前端路由）
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 安全响应头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

启用站点：

```bash
# 创建软链接
ln -s /etc/nginx/sites-available/blog /etc/nginx/sites-enabled/

# 删除默认站点（可选）
rm /etc/nginx/sites-enabled/default

# 测试配置
nginx -t

# 重启 Nginx
systemctl restart nginx

# 设置开机自启
systemctl enable nginx
```

### 配置 HTTPS（SSL 证书）

**使用阿里云 SSL 证书（推荐）**

1. 在阿里云控制台申请免费 SSL 证书
2. 下载 Nginx 格式的证书文件
3. 上传到服务器：

```bash
# 创建证书目录
mkdir -p /etc/nginx/ssl

# 上传证书文件（本地执行）
scp your-domain.com.pem root@你的服务器IP:/etc/nginx/ssl/
scp your-domain.com.key root@你的服务器IP:/etc/nginx/ssl/
```

4. 修改 Nginx 配置：

```bash
nano /etc/nginx/sites-available/blog
```

更新为：

```nginx
# HTTP 重定向到 HTTPS
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS 配置
server {
    listen 443 ssl http2;
    server_name your-domain.com;
    root /var/www/blog;
    index index.html;

    # SSL 证书配置
    ssl_certificate /etc/nginx/ssl/your-domain.com.pem;
    ssl_certificate_key /etc/nginx/ssl/your-domain.com.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # 开启 gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # 缓存静态资源
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 所有路由都指向 index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 安全响应头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

重启 Nginx：

```bash
nginx -t && systemctl restart nginx
```

### 使用 Certbot 自动配置 SSL（替代方案）

```bash
# 安装 Certbot
apt install -y certbot python3-certbot-nginx

# 自动获取并配置证书
certbot --nginx -d your-domain.com

# 按照提示完成配置
# 证书会自动续期
```

### 自动化部署脚本

在服务器上创建部署脚本 `/var/www/deploy.sh`：

```bash
#!/bin/bash

set -e

echo "开始部署博客..."

# 进入项目目录（如果使用 Git）
# cd /var/www/blog
# git pull origin main
# cd my-app
# npm install
# npm run build

# 如果是直接上传 dist 目录，跳过构建步骤

echo "复制文件到网站目录..."
# 假设上传的 dist 文件在 /tmp/blog-dist/
rsync -av --delete /tmp/blog-dist/ /var/www/blog/

# 设置权限
chown -R www-data:www-data /var/www/blog
chmod -R 755 /var/www/blog

echo "部署完成！"
```

赋予执行权限：

```bash
chmod +x /var/www/deploy.sh
```

本地部署命令：

```bash
# 构建并打包
cd /Users/flynn/Code/blog/my-app
npm run build
cd dist && tar -czf ../../blog-dist.tar.gz . && cd ../..

# 上传到服务器并部署
scp blog-dist.tar.gz root@你的服务器IP:/tmp/
ssh root@你的服务器IP "mkdir -p /tmp/blog-dist && tar -xzf /tmp/blog-dist.tar.gz -C /tmp/blog-dist/ && rm -rf /var/www/blog/* && cp -r /tmp/blog-dist/* /var/www/blog/ && chown -R www-data:www-data /var/www/blog && rm -rf /tmp/blog-dist /tmp/blog-dist.tar.gz"

echo "部署完成！"
```

### 配置 CDN 加速（可选）

1. 在阿里云开通 CDN 服务
2. 添加域名，源站地址填写 ECS 公网 IP 或域名
3. 配置 HTTPS 证书
4. 修改 DNS 解析到 CDN 提供的 CNAME 地址

### 常见问题

**1. 访问出现 403 错误**

```bash
# 检查文件权限
chown -R www-data:www-data /var/www/blog
chmod -R 755 /var/www/blog

# 检查 SELinux（如启用）
setenforce 0  # 临时关闭
# 或
chcon -R -t httpd_sys_content_t /var/www/blog  # 设置正确上下文
```

**2. 页面刷新后 404**

确保 Nginx 配置中包含：
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

**3. 中文显示乱码**

```bash
# 在 Nginx 配置中添加
charset utf-8;
```

**4. 更新文章后不生效**

浏览器可能缓存了旧版本。强制刷新：
- Windows/Linux: Ctrl + Shift + R
- Mac: Cmd + Shift + R

或修改文件名添加版本号：
```bash
# 在构建前添加时间戳到资源文件名
# 或配置 Nginx 禁用缓存（仅开发环境）
add_header Cache-Control "no-cache";
```

### 维护命令

```bash
# 查看 Nginx 状态
systemctl status nginx

# 查看 Nginx 错误日志
tail -f /var/log/nginx/error.log

# 查看访问日志
tail -f /var/log/nginx/access.log

# 重启 Nginx
systemctl restart nginx

# 查看磁盘空间
df -h

# 查看内存使用
free -h
```

---

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
