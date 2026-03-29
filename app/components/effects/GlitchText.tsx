"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { useGlitch } from "@/app/hooks/useGlitch";

interface GlitchTextProps {
  children: ReactNode;
  className?: string;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "div";
  autoGlitch?: boolean;
  hoverGlitch?: boolean;
}

export function GlitchText({
  children,
  className,
  as: Component = "span",
  autoGlitch = false,
  hoverGlitch = true,
}: GlitchTextProps) {
  const { isGlitching, trigger } = useGlitch({
    interval: 3000,
    duration: 150,
    probability: 0.2,
  });

  const handleMouseEnter = () => {
    if (hoverGlitch) {
      trigger();
    }
  };

  return (
    <Component
      className={cn(
        "relative inline-block",
        (isGlitching || autoGlitch) && "glitch-text",
        className
      )}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </Component>
  );
}

// More intense glitch effect with color separation
export function GlitchTextIntense({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn("relative inline-block group cursor-pointer", className)}
    >
      <span className="relative z-10">{children}</span>
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100"
        style={{
          color: "#ff00a0",
          transform: "translateX(-2px)",
          zIndex: 5,
        }}
      >
        {children}
      </span>
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100"
        style={{
          color: "#00ff9f",
          transform: "translateX(2px)",
          zIndex: 5,
        }}
      >
        {children}
      </span>
    </span>
  );
}
