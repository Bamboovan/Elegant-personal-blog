"use client";

import { useCurrentTime } from "@/app/hooks/useCurrentTime";
import { cn } from "@/lib/utils";

interface StatusBarProps {
  className?: string;
}

export function StatusBar({ className }: StatusBarProps) {
  const { formatted } = useCurrentTime();

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 h-8 z-[10000]",
        "bg-[#0a0a0f] border-b border-[rgba(0,255,159,0.3)]",
        "flex items-center justify-between px-4",
        "font-mono text-xs select-none",
        className
      )}
    >
      {/* Left section */}
      <div className="flex items-center gap-4">
        <span className="text-neon-cyan font-bold tracking-wider">
          ZF_OS v2.0
        </span>
        <span className="text-[#404040]">|</span>
        <span className="text-neon-amber animate-pulse">SECURE CONNECTION</span>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        <span className="text-neon-cyan">{formatted}</span>
        <span className="text-[#404040]">|</span>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
          <span className="text-neon-cyan">OPERATIONAL</span>
        </div>
      </div>
    </div>
  );
}
