"use client";

import { cn } from "@/lib/utils";

interface HexGridProps {
  className?: string;
  opacity?: number;
}

export function HexGrid({ className, opacity = 0.1 }: HexGridProps) {
  return (
    <svg
      className={cn("absolute inset-0 w-full h-full", className)}
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="hex-grid"
          width="28"
          height="49"
          patternUnits="userSpaceOnUse"
          patternTransform="scale(0.5)"
        >
          <path
            d="M14 0L28 8.5v17L14 34 0 25.5v-17L14 0z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-neon-cyan"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex-grid)" />
    </svg>
  );
}

// Simple grid lines
export function GridLines({
  className,
  opacity = 0.05,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{
        opacity,
        backgroundImage: `
          linear-gradient(rgba(0, 255, 159, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 159, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    />
  );
}
