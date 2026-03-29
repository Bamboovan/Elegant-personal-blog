"use client";

import { useState } from "react";
import { TimelineEntry } from "@/lib/data";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface TimelineLogProps {
  entries: TimelineEntry[];
}

export function TimelineLog({ entries }: TimelineLogProps) {
  const [selectedEntry, setSelectedEntry] = useState<TimelineEntry | null>(null);

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
          <LogEntry
            key={index}
            entry={entry}
            index={index}
            onClick={() => setSelectedEntry(entry)}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 text-[#404040] text-xs">
        {"-- END OF LOG --"}
      </div>

      {/* Detail Modal */}
      {selectedEntry && (
        <DetailModal entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
      )}
    </div>
  );
}

function LogEntry({
  entry,
  index,
  onClick,
}: {
  entry: TimelineEntry;
  index: number;
  onClick: () => void;
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
      onClick={onClick}
      className={cn(
        "group flex gap-4 py-2 px-2 -mx-2 cursor-pointer",
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

function DetailModal({
  entry,
  onClose,
}: {
  entry: TimelineEntry;
  onClose: () => void;
}) {
  const typeColors = {
    EVENT: "text-neon-cyan",
    PROJECT: "text-neon-magenta",
    AWARD: "text-neon-amber",
    PUBLICATION: "text-[#00aaff]",
    CERTIFICATION: "text-[#00ff00]",
  };

  const categoryLabels = {
    EDUCATION: "EDUCATION",
    DEV: "DEVELOPMENT",
    ACHIEVEMENT: "ACHIEVEMENT",
    WORK: "WORK",
    OTHER: "OTHER",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(0,0,0,0.8)] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={cn(
          "w-full max-w-lg border bg-[#0a0a0f]",
          "border-[rgba(0,255,159,0.3)]",
          "shadow-[0_0_40px_rgba(0,255,159,0.1)]"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-[rgba(0,255,159,0.2)] bg-[rgba(0,255,159,0.05)]">
          <div className="flex items-center gap-2">
            <span className="text-neon-cyan">[</span>
            <span className="text-[#e0e0e0] font-mono">EVENT_DETAILS</span>
            <span className="text-neon-cyan">]</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#606060] hover:text-neon-cyan transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4">
          {/* Type & Category */}
          <div className="flex items-center gap-3 text-xs">
            <span className={cn("font-bold", typeColors[entry.type])}>
              {entry.type}
            </span>
            <span className="text-[#404040]">|</span>
            <span className="text-[#606060]">
              {categoryLabels[entry.category]}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-mono text-neon-cyan">
            {entry.title}
          </h2>

          {/* Timestamp */}
          <div className="text-xs text-[#606060]">
            <span className="text-[#404040]">TIMESTAMP: </span>
            {entry.timestamp}
          </div>

          {/* Description */}
          <div className="pt-2 border-t border-[rgba(0,255,159,0.1)]">
            <div className="text-xs text-[#404040] mb-2">// DESCRIPTION</div>
            <p className="text-[#909090] text-sm">{entry.description}</p>
          </div>

          {/* Details */}
          {entry.details && entry.details.length > 0 && (
            <div className="pt-2 border-t border-[rgba(0,255,159,0.1)]">
              <div className="text-xs text-[#404040] mb-2">// DETAILS</div>
              <ul className="space-y-1">
                {entry.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-[#e0e0e0]">
                    <span className="text-neon-cyan mt-0.5">›</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-3 border-t border-[rgba(0,255,159,0.1)] bg-[rgba(0,255,159,0.02)]">
          <div className="flex justify-between items-center text-xs text-[#404040]">
            <span>PRESS [ESC] TO CLOSE</span>
            <button
              onClick={onClose}
              className="px-3 py-1 border border-[rgba(0,255,159,0.3)] text-neon-cyan hover:bg-[rgba(0,255,159,0.1)] transition-colors"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
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
