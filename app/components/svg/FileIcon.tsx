"use client";

import { cn } from "@/lib/utils";
import { Folder, FileCode, FileText, File } from "lucide-react";

interface FileIconProps {
  type: "folder" | "code" | "text" | "file";
  size?: number;
  className?: string;
  extension?: string;
}

export function FileIcon({
  type,
  size = 20,
  className,
  extension,
}: FileIconProps) {
  const colorClasses = {
    folder: "text-neon-amber",
    code: "text-neon-cyan",
    text: "text-[#909090]",
    file: "text-[#606060]",
  };

  const icons = {
    folder: Folder,
    code: FileCode,
    text: FileText,
    file: File,
  };

  const Icon = icons[type];

  return (
    <div className={cn("relative inline-flex", className)}>
      <Icon
        size={size}
        className={cn(colorClasses[type])}
        strokeWidth={1.5}
      />
      {extension && (
        <span
          className={cn(
            "absolute -bottom-1 -right-1 text-[8px] font-mono px-0.5",
            "bg-[#0a0a0f] border border-[rgba(0,255,159,0.3)]",
            type === "code" ? "text-neon-cyan" : "text-neon-amber"
          )}
        >
          {extension}
        </span>
      )}
    </div>
  );
}
