"use client";

import { ResearchInterest, Paper, Certification } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

interface ResearchPanelProps {
  interests: ResearchInterest[];
  papers: Paper[];
  certifications: Certification[];
}

export function ResearchPanel({
  interests,
  papers,
  certifications,
}: ResearchPanelProps) {
  return (
    <div className="p-6 space-y-8">
      {/* Research Interests */}
      <section>
        <div className="text-[#606060] text-xs mb-4 flex items-center gap-2">
          <span className="text-neon-cyan">●</span>
          {"// RESEARCH INTERESTS"}
        </div>
        <div className="space-y-4">
          {interests.map((interest) => (
            <ResearchCard key={interest.id} interest={interest} />
          ))}
        </div>
      </section>

      {/* Papers */}
      {papers.length > 0 && (
        <section>
          <div className="text-[#606060] text-xs mb-4 flex items-center gap-2">
            <span className="text-neon-magenta">●</span>
            {"// PUBLICATIONS"}
          </div>
          <div className="space-y-3">
            {papers.map((paper, index) => (
              <PaperCard key={index} paper={paper} />
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section>
          <div className="text-[#606060] text-xs mb-4 flex items-center gap-2">
            <span className="text-neon-amber">●</span>
            {"// CERTIFICATIONS"}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {certifications.map((cert, index) => (
              <CertCard key={index} cert={cert} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ResearchCard({ interest }: { interest: ResearchInterest }) {
  const statusColors = {
    ACTIVE: "border-neon-cyan text-neon-cyan",
    PAUSED: "border-neon-amber text-neon-amber",
    COMPLETED: "border-neon-magenta text-neon-magenta",
  };

  const progressPercent = (interest.level / interest.maxLevel) * 100;

  return (
    <div
      className={cn(
        "p-4 border bg-[rgba(0,255,159,0.02)] group",
        "border-[rgba(0,255,159,0.15)] hover:border-[rgba(0,255,159,0.3)]",
        "transition-all"
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-neon-cyan font-mono text-base">{interest.name}</h3>
            {interest.link && (
              <a
                href={interest.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-[#404040] hover:text-neon-cyan transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
          <p className="text-[#606060] text-sm mt-1">{interest.description}</p>
        </div>
        <span
          className={cn(
            "px-2 py-1 text-xs font-mono border",
            statusColors[interest.status]
          )}
        >
          {interest.status}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-[#606060] mb-1 font-mono">
          <span>MASTERY LEVEL</span>
          <span>
            {interest.level}/{interest.maxLevel}
          </span>
        </div>
        <div className="h-2 bg-[#1a1a1a] border border-[rgba(0,255,159,0.2)]">
          <div
            className="h-full bg-gradient-to-r from-neon-cyan to-neon-magenta transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {interest.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs text-neon-amber font-mono"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function PaperCard({ paper }: { paper: Paper }) {
  return (
    <div className="p-3 border border-[rgba(255,0,160,0.15)] bg-[rgba(255,0,160,0.02)] hover:border-[rgba(255,0,160,0.3)] transition-colors group">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2 flex-1">
          <h4 className="text-[#e0e0e0] font-mono text-sm">{paper.title}</h4>
          {paper.link && (
            <a
              href={paper.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-[#404040] hover:text-neon-magenta transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
        <span
          className={cn(
            "text-xs px-2 py-0.5 border",
            paper.status === "published"
              ? "border-neon-cyan text-neon-cyan"
              : "border-neon-amber text-neon-amber"
          )}
        >
          {paper.status}
        </span>
      </div>
      <div className="flex items-center gap-4 mt-2 text-xs text-[#606060]">
        <span>{paper.venue}</span>
        <span>{paper.year}</span>
      </div>
      <p className="text-xs text-[#808080] mt-2 line-clamp-2">
        {paper.abstract}
      </p>
    </div>
  );
}

function CertCard({ cert }: { cert: Certification }) {
  const statusColors = {
    COMPLETED: "text-neon-cyan border-neon-cyan",
    "IN-PROGRESS": "text-neon-amber border-neon-amber",
  };

  return (
    <div className="p-3 border border-[rgba(255,176,0,0.15)] bg-[rgba(255,176,0,0.02)] hover:border-[rgba(255,176,0,0.3)] transition-colors group">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2 flex-1">
          <h4 className="text-[#e0e0e0] font-mono text-sm">{cert.name}</h4>
          {cert.link && (
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-[#404040] hover:text-neon-amber transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
        <span
          className={cn(
            "text-xs px-2 py-0.5 border",
            statusColors[cert.status as keyof typeof statusColors] ||
              "text-[#606060] border-[#606060]"
          )}
        >
          {cert.status}
        </span>
      </div>
      <p className="text-xs text-[#808080] mt-2">{cert.date}</p>
    </div>
  );
}
