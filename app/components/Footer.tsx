import { Feather } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t border-border mt-24">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* 装饰元素 */}
        <div className="footer-decoration">
          <Feather className="w-4 h-4" />
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a 
              href="/rss.xml" 
              className="link-underline hover:text-foreground transition-colors"
            >
              RSS
            </a>
            <span className="text-border">·</span>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="link-underline hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
