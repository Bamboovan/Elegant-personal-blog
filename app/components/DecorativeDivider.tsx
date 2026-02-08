interface DecorativeDividerProps {
  symbol?: "flourish" | "diamonds" | "asterisk" | "waves" | "dots";
  className?: string;
}

const symbols = {
  flourish: "* * *",
  diamonds: "◆ ◆ ◆",
  asterisk: "⁂",
  waves: "~ ~ ~",
  dots: "· · ·",
};

export function DecorativeDivider({ 
  symbol = "flourish", 
  className = "" 
}: DecorativeDividerProps) {
  return (
    <div className={`fancy-divider ${className}`}>
      <span className="fancy-divider-symbol">{symbols[symbol]}</span>
    </div>
  );
}

// 简洁版本，用于文章内部分隔
export function TextDivider({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-4 my-12">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-border" />
      {children ? (
        <span className="text-muted-foreground text-sm">{children}</span>
      ) : (
        <span className="text-accent/40">§</span>
      )}
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-border" />
    </div>
  );
}
