import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "朱凡 | Cyber Archive",
    template: "%s | 朱凡",
  },
  description: "Personal cyberpunk-style archive terminal. Software engineering student exploring distributed systems.",
  authors: [{ name: "朱凡", url: "https://github.com/Bamboovan" }],
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#050505] text-[#e0e0e0] font-mono min-h-screen">
        {children}
      </body>
    </html>
  );
}
