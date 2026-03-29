"use client";

import { ResearchProject } from "@/lib/data";
import { cn } from "@/lib/utils";

interface ResearchPanelProps {
  projects: ResearchProject[];
}

export function ResearchPanel({ projects }: ResearchPanelProps) {
  return (
    <div className="p-6 space-y-8">
      <section>
        <div className="text-[#606060] text-xs mb-4 flex items-center gap-2">
          <span className="text-neon-cyan">●</span>
          {"// RESEARCH PROJECTS"}
        </div>
        <div className="space-y-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ProjectCard({ project }: { project: ResearchProject }) {
  const statusColors = {
    ACTIVE: "border-neon-cyan text-neon-cyan",
    COMPLETED: "border-neon-magenta text-neon-magenta",
    PAUSED: "border-neon-amber text-neon-amber",
  };

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
            <h3 className="text-neon-cyan font-mono text-base">{project.title}</h3>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-[#404040] hover:text-neon-cyan transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLinkIcon className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
          <div className="flex items-center gap-3 mt-1 text-xs text-[#606060]">
            <span>{project.type}</span>
            <span>•</span>
            <span>{project.year}</span>
          </div>
        </div>
        <span
          className={cn(
            "px-2 py-1 text-xs font-mono border",
            statusColors[project.status]
          )}
        >
          {project.status}
        </span>
      </div>

      <p className="text-[#909090] text-sm mt-2">{project.description}</p>

      <div className="flex flex-wrap gap-2 mt-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 border border-[rgba(0,255,159,0.2)] text-neon-amber font-mono"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
