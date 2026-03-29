"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface WindowContentProps {
  children: ReactNode;
  className?: string;
}

export function WindowContent({ children, className }: WindowContentProps) {
  return (
    <div
      className={cn(
        "min-h-[400px] max-h-[600px] overflow-auto",
        "bg-[#0a0a0f]",
        className
      )}
    >
      {children}
    </div>
  );
}
