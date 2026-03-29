"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlowTextProps {
  children: ReactNode;
  color?: "cyan" | "magenta" | "amber";
  className?: string;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "div";
}

export function GlowText({
  children,
  color = "cyan",
  className,
  as: Component = "span",
}: GlowTextProps) {
  const glowClasses = {
    cyan: "text-glow",
    magenta: "text-glow-magenta",
    amber: "text-glow-amber",
  };

  const colorClasses = {
    cyan: "text-neon-cyan",
    magenta: "text-neon-magenta",
    amber: "text-neon-amber",
  };

  return (
    <Component
      className={cn(colorClasses[color], glowClasses[color], className)}
    >
      {children}
    </Component>
  );
}

// Simpler inline glow variant
export function GlowTextInline({
  children,
  color = "cyan",
  className,
}: Omit<GlowTextProps, "as">) {
  const styles = {
    cyan: {
      color: "#00ff9f",
      textShadow: "0 0 10px #00ff9f, 0 0 20px rgba(0, 255, 159, 0.5)",
    },
    magenta: {
      color: "#ff00a0",
      textShadow: "0 0 10px #ff00a0, 0 0 20px rgba(255, 0, 160, 0.5)",
    },
    amber: {
      color: "#ffb000",
      textShadow: "0 0 10px #ffb000, 0 0 20px rgba(255, 176, 0, 0.5)",
    },
  };

  return (
    <span style={styles[color]} className={className}>
      {children}
    </span>
  );
}
