"use client";

import { cn } from "@/lib/utils";

type TabId = "timeline" | "projects" | "research" | "contact";

interface WindowTabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  className?: string;
}

interface Tab {
  id: TabId;
  label: string;
  icon: string;
}

const TABS: Tab[] = [
  { id: "timeline", label: "[TIMELINE]", icon: "LOG" },
  { id: "projects", label: "[PROJECTS]", icon: "DIR" },
  { id: "research", label: "[RESEARCH]", icon: "DATA" },
  { id: "contact", label: "[CONTACT]", icon: "COMM" },
];

export function WindowTabBar({
  activeTab,
  onTabChange,
  className,
}: WindowTabBarProps) {
  return (
    <div
      className={cn(
        "flex border-b border-[rgba(0,255,159,0.2)] bg-[#0a0a0f]",
        className
      )}
    >
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-4 py-3 font-mono text-sm tracking-wider",
            "border-r border-[rgba(0,255,159,0.1)]",
            "transition-all duration-200",
            "flex items-center gap-2",
            activeTab === tab.id
              ? "bg-[rgba(0,255,159,0.08)] text-neon-cyan border-b-2 border-b-neon-cyan"
              : "text-[#606060] hover:text-[#909090] hover:bg-[rgba(255,255,255,0.02)]"
          )}
        >
          <span className="text-neon-magenta text-xs">{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

export type { TabId };
