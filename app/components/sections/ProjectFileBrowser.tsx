"use client";

import { ProjectFile } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Folder, FileCode, ExternalLink, Github } from "lucide-react";

interface ProjectFileBrowserProps {
  files: ProjectFile[];
}

export function ProjectFileBrowser({ files }: ProjectFileBrowserProps) {
  return (
    <div className="p-6 font-mono">
      {/* Header */}
      <div className="flex items-center justify-between text-[#606060] mb-4 text-xs border-b border-[rgba(96,96,96,0.3)] pb-2">
        <div className="flex items-center gap-2">
          <span>LOCATION:</span>
          <span className="text-neon-cyan">/home/zf/projects</span>
        </div>
        <span>TOTAL: {files.length} items</span>
      </div>

      {/* File list header */}
      <div className="grid grid-cols-[40px_1fr_80px_100px_60px_80px] gap-4 text-xs text-[#404040] py-2 border-b border-[rgba(64,64,64,0.2)]">
        <span>TYPE</span>
        <span>NAME</span>
        <span>SIZE</span>
        <span>MODIFIED</span>
        <span>STATUS</span>
        <span>LINKS</span>
      </div>

      {/* File list */}
      <div className="space-y-1 mt-2">
        {files.map((file) => (
          <FileRow key={file.id} file={file} />
        ))}
      </div>
    </div>
  );
}

function FileRow({ file }: { file: ProjectFile }) {
  const statusColors = {
    ACTIVE: "text-neon-cyan",
    COMPLETED: "text-neon-amber",
    ARCHIVED: "text-[#606060]",
    DEVELOPMENT: "text-neon-magenta",
  };

  return (
    <div
      className={cn(
        "grid grid-cols-[40px_1fr_80px_100px_60px_80px] gap-4 py-3 px-2 -mx-2",
        "items-center text-sm",
        "hover:bg-[rgba(0,255,159,0.03)] transition-colors cursor-pointer group",
        "border-l-2 border-transparent hover:border-neon-cyan"
      )}
    >
      {/* Icon */}
      <div className="flex justify-center">
        {file.type === "FOLDER" ? (
          <Folder className="w-5 h-5 text-neon-amber" />
        ) : (
          <FileCode className="w-5 h-5 text-neon-cyan" />
        )}
      </div>

      {/* Name and description */}
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[#e0e0e0] group-hover:text-neon-cyan transition-colors truncate">
            {file.name}
          </span>
          <span className="text-[#606060]">{file.ext}</span>
        </div>
        <div className="text-xs text-[#606060] truncate mt-1">
          {file.description}
        </div>
        {/* Tech tags */}
        <div className="flex flex-wrap gap-1 mt-2">
          {file.tech.map((tech) => (
            <span
              key={tech}
              className="text-[10px] px-1.5 py-0.5 border border-[rgba(0,255,159,0.2)] text-[#909090]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Size */}
      <span className="text-[#909090]">{file.size}</span>

      {/* Modified */}
      <span className="text-[#606060]">{file.modified}</span>

      {/* Status */}
      <span className={cn("text-xs", statusColors[file.status])}>
        {file.status}
      </span>

      {/* Links */}
      <div className="flex items-center gap-1">
        {file.links.github && (
          <a
            href={file.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-[#606060] hover:text-neon-cyan transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Github className="w-4 h-4" />
          </a>
        )}
        {file.links.demo && (
          <a
            href={file.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-[#606060] hover:text-neon-cyan transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
