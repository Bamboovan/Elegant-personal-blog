import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="w-full border-b border-border">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <nav className="flex items-center justify-between">
          <Link 
            href="/" 
            className="font-serif text-xl tracking-tight text-foreground hover:text-accent transition-colors"
          >
            Blog
          </Link>
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-6 text-sm">
              <Link 
                href="/" 
                className="link-underline text-muted-foreground hover:text-foreground transition-colors"
              >
                文章
              </Link>
              <Link 
                href="/tags" 
                className="link-underline text-muted-foreground hover:text-foreground transition-colors"
              >
                标签
              </Link>
              <Link 
                href="/about" 
                className="link-underline text-muted-foreground hover:text-foreground transition-colors"
              >
                关于
              </Link>
            </div>
            <div className="pl-6 border-l border-border">
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
