"use client";

import { cn } from "@/lib/utils";

type StatusType = "online" | "busy" | "offline" | "info";

interface StatusIndicatorsProps {
  status: StatusType;
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
  className?: string;
}

export function StatusIndicators({
  status,
  size = "md",
  pulse = false,
  className,
}: StatusIndicatorsProps) {
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  const colorClasses = {
    online: "bg-neon-cyan shadow-[0_0_8px_#00ff9f]",
    busy: "bg-neon-amber shadow-[0_0_8px_#ffb000]",
    offline: "bg-red-500 shadow-[0_0_8px_#ff3333]",
    info: "bg-[#00aaff] shadow-[0_0_8px_#00aaff]",
  };

  const labelClasses = {
    online: "text-neon-cyan",
    busy: "text-neon-amber",
    offline: "text-red-400",
    info: "text-[#00aaff]",
  };

  const labels = {
    online: "ONLINE",
    busy: "BUSY",
    offline: "OFFLINE",
    info: "INFO",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span
        className={cn(
          "rounded-full",
          sizeClasses[size],
          colorClasses[status],
          pulse && "animate-pulse"
        )}
      />
      <span className={cn("text-xs font-mono", labelClasses[status])}>
        {labels[status]}
      </span>
    </div>
  );
}

// Simple dot variant
export function StatusDot({
  status,
  size = "md",
  pulse = false,
}: Omit<StatusIndicatorsProps, "className">) {
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  const colorClasses = {
    online: "bg-neon-cyan shadow-[0_0_8px_#00ff9f]",
    busy: "bg-neon-amber shadow-[0_0_8px_#ffb000]",
    offline: "bg-red-500 shadow-[0_0_8px_#ff3333]",
    info: "bg-[#00aaff] shadow-[0_0_8px_#00aaff]",
  };

  return (
    <span
      className={cn(
        "rounded-full inline-block",
        sizeClasses[size],
        colorClasses[status],
        pulse && "animate-pulse"
      )}
    />
  );
}
