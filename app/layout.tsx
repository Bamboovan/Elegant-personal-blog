import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "朱凡",
    template: "%s | 朱凡",
  },
  description: "这里是我的个人博客，分享我的一些见解与感悟",
  authors: [{ name: "朱凡" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;500&family=Noto+Serif:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-serif grain">
        {children}
      </body>
    </html>
  );
}
