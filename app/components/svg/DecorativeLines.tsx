"use client";

import { cn } from "@/lib/utils";

interface DecorativeLinesProps {
  className?: string;
  variant?: "horizontal" | "vertical" | "corner";
}

export function DecorativeLines({
  className,
  variant = "horizontal",
}: DecorativeLinesProps) {
  if (variant === "horizontal") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
        <span className="text-neon-cyan text-xs">◆</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
      </div>
    );
  }

  if (variant === "vertical") {
    return (
      <div className={cn("flex flex-col items-center gap-2 h-full", className)}>
        <div className="w-px flex-1 bg-gradient-to-b from-transparent via-neon-cyan to-transparent" />
        <span className="text-neon-cyan text-xs">◆</span>
        <div className="w-px flex-1 bg-gradient-to-b from-transparent via-neon-cyan to-transparent" />
      </div>
    );
  }

  if (variant === "corner") {
    return (
      <svg
        className={cn("text-neon-cyan", className)}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <path d="M0 24 L0 0 L24 0" />
      </svg>
    );
  }

  return null;
}

// Dashed line separator
export function DashedSeparator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full border-t border-dashed border-[rgba(0,255,159,0.2)]",
        className
      )}
    />
  );
}

// Bracket decoration
export function Brackets({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      <span className="text-neon-cyan">[</span>
      {children}
      <span className="text-neon-cyan">]</span>
    </span>
  );
}

// Angle brackets decoration
export function AngleBrackets({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      <span className="text-neon-magenta">&lt;</span>
      {children}
      <span className="text-neon-magenta">&gt;</span>
    </span>
  );
}
