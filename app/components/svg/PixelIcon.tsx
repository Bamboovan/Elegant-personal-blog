"use client";

import { cn } from "@/lib/utils";

interface PixelIconProps {
  name: "user" | "code" | "server" | "database" | "terminal" | "gear";
  size?: number;
  className?: string;
}

export function PixelIcon({ name, size = 24, className }: PixelIconProps) {
  const icons = {
    user: (
      <g fill="currentColor">
        {/* Head */}
        <rect x="8" y="4" width="8" height="8" />
        {/* Body */}
        <rect x="4" y="12" width="16" height="8" />
      </g>
    ),
    code: (
      <g fill="currentColor">
        {/* < */}
        <rect x="6" y="6" width="2" height="2" />
        <rect x="4" y="8" width="2" height="8" />
        <rect x="6" y="16" width="2" height="2" />
        {/* / */}
        <rect x="10" y="4" width="4" height="2" />
        <rect x="10" y="18" width="4" height="2" />
        {/* > */}
        <rect x="16" y="6" width="2" height="2" />
        <rect x="18" y="8" width="2" height="8" />
        <rect x="16" y="16" width="2" height="2" />
      </g>
    ),
    server: (
      <g fill="currentColor">
        {/* Top bar */}
        <rect x="4" y="4" width="16" height="4" />
        <rect x="6" y="5" width="2" height="2" />
        {/* Middle bar */}
        <rect x="4" y="10" width="16" height="4" />
        <rect x="6" y="11" width="2" height="2" />
        {/* Bottom bar */}
        <rect x="4" y="16" width="16" height="4" />
        <rect x="6" y="17" width="2" height="2" />
      </g>
    ),
    database: (
      <g fill="currentColor">
        {/* Top ellipse */}
        <rect x="4" y="4" width="16" height="4" />
        {/* Middle */}
        <rect x="4" y="8" width="2" height="10" />
        <rect x="18" y="8" width="2" height="10" />
        {/* Bottom ellipse */}
        <rect x="4" y="16" width="16" height="4" />
      </g>
    ),
    terminal: (
      <g fill="currentColor">
        {/* Frame */}
        <rect x="2" y="4" width="20" height="16" />
        {/* Prompt */}
        <rect x="4" y="14" width="4" height="2" />
        <rect x="10" y="14" width="2" height="2" />
      </g>
    ),
    gear: (
      <g fill="currentColor">
        {/* Center */}
        <rect x="10" y="10" width="4" height="4" />
        {/* Top */}
        <rect x="10" y="4" width="4" height="4" />
        {/* Bottom */}
        <rect x="10" y="16" width="4" height="4" />
        {/* Left */}
        <rect x="4" y="10" width="4" height="4" />
        {/* Right */}
        <rect x="16" y="10" width="4" height="4" />
        {/* Corners */}
        <rect x="6" y="6" width="2" height="2" />
        <rect x="16" y="6" width="2" height="2" />
        <rect x="6" y="16" width="2" height="2" />
        <rect x="16" y="16" width="2" height="2" />
      </g>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={cn("shrink-0", className)}
    >
      {icons[name]}
    </svg>
  );
}
