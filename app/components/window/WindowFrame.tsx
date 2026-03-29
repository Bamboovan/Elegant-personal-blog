"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface WindowFrameProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export function WindowFrame({
  children,
  className,
  title = "PERSONNEL_ARCHIVE.exe",
}: WindowFrameProps) {
  return (
    <div
      className={cn(
        "bg-[#0a0a0f] border border-[rgba(0,255,159,0.2)]",
        "shadow-[0_0_40px_rgba(0,0,0,0.5)]",
        className
      )}
    >
      {/* Window Title Bar */}
      <WindowTitleBar title={title} />

      {/* Window Content */}
      <div className="relative">{children}</div>
    </div>
  );
}

interface WindowTitleBarProps {
  title: string;
}

function WindowTitleBar({ title }: WindowTitleBarProps) {
  return (
    <div
      className={cn(
        "h-8 px-3 flex items-center justify-between",
        "bg-gradient-to-r from-[#111118] to-[#0a0a0f]",
        "border-b border-[rgba(0,255,159,0.2)]"
      )}
    >
      {/* Window controls */}
      <div className="flex items-center gap-2">
        <WindowButton color="red" />
        <WindowButton color="yellow" />
        <WindowButton color="green" />
      </div>

      {/* Window title */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
        <span className="text-[#606060] text-xs font-mono">●</span>
        <span className="text-[#909090] text-xs font-mono tracking-wide">
          {title}
        </span>
      </div>

      {/* Empty space for balance */}
      <div className="w-12" />
    </div>
  );
}

interface WindowButtonProps {
  color: "red" | "yellow" | "green";
}

function WindowButton({ color }: WindowButtonProps) {
  const colors = {
    red: "bg-[#ff5f56] hover:bg-[#ff5f56]/80",
    yellow: "bg-[#ffbd2e] hover:bg-[#ffbd2e]/80",
    green: "bg-[#27c93f] hover:bg-[#27c93f]/80",
  };

  return (
    <button
      className={cn(
        "w-3 h-3 rounded-full transition-colors",
        colors[color]
      )}
      aria-label={`window ${color} button`}
    />
  );
}
