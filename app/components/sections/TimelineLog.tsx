"use client";

import { TimelineEntry } from "@/lib/data";
import { cn } from "@/lib/utils";

interface TimelineLogProps {
  entries: TimelineEntry[];
}

export function TimelineLog({ entries }: TimelineLogProps) {
  return (
    <div className="p-6 font-mono text-sm">
      {/* Header */}
      <div className="text-[#606060] mb-4 border-b border-[rgba(96,96,96,0.3)] pb-2 flex justify-between">
        <span>{"// SYSTEM LOG - CHRONOLOGICAL ORDER"}</span>
        <span>{`ENTRIES: ${entries.length}`}</span>
      </div>

      {/* Log entries */}
      <div className="space-y-1">
        {entries.map((entry, index) => (
          <LogEntry key={index} entry={entry} index={index} />
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 text-[#404040] text-xs">
        {"-- END OF LOG --"}
      </div>
    </div>
  );
}

function LogEntry({
  entry,
  index,
}: {
  entry: TimelineEntry;
  index: number;
}) {
  const typeColors = {
    EVENT: "text-neon-cyan",
    PROJECT: "text-neon-magenta",
    AWARD: "text-neon-amber",
    PUBLICATION: "text-[#00aaff]",
    CERTIFICATION: "text-[#00ff00]",
  };

  const categoryLabels = {
    EDUCATION: "EDU",
    DEV: "DEV",
    ACHIEVEMENT: "ACH",
    WORK: "WRK",
    OTHER: "OTH",
  };

  return (
    <div
      className={cn(
        "group flex gap-4 py-2 px-2 -mx-2",
        "hover:bg-[rgba(0,255,159,0.03)] transition-colors",
        "border-l-2 border-transparent hover:border-neon-cyan"
      )}
    >
      {/* Timestamp */}
      <span className="text-[#404040] min-w-[140px] shrink-0">
        [{formatTimestamp(entry.timestamp)}]
      </span>

      {/* Type */}
      <span
        className={cn(
          "min-w-[60px] font-bold shrink-0",
          typeColors[entry.type]
        )}
      >
        {entry.type}
      </span>

      {/* Category */}
      <span className="min-w-[40px] text-[#606060] shrink-0">
        [{categoryLabels[entry.category]}]
      </span>

      {/* Title */}
      <span className="text-[#e0e0e0] group-hover:text-neon-cyan transition-colors min-w-[200px] shrink-0">
        {entry.title}
      </span>

      {/* Description */}
      <span className="text-[#606060] truncate">{entry.description}</span>
    </div>
  );
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const year = date.getFullYear().toString().slice(2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
