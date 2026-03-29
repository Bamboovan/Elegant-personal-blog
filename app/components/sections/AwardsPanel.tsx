"use client";

import { Certification, Award } from "@/lib/data";
import { cn } from "@/lib/utils";

interface AwardsPanelProps {
  certifications: Certification[];
  awards: Award[];
}

export function AwardsPanel({ certifications, awards }: AwardsPanelProps) {
  return (
    <div className="p-6 space-y-8">
      {/* Awards */}
      {awards.length > 0 && (
        <section>
          <div className="text-[#606060] text-xs mb-4 flex items-center gap-2">
            <span className="text-neon-cyan">●</span>
            {"// HONORS & AWARDS"}
          </div>
          <div className="space-y-3">
            {awards.map((award) => (
              <AwardCard key={award.id} award={award} />
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

function AwardCard({ award }: { award: Award }) {
  return (
    <div className="p-4 border border-[rgba(0,255,159,0.15)] bg-[rgba(0,255,159,0.02)] hover:border-[rgba(0,255,159,0.3)] transition-colors group">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2 flex-1">
          <h4 className="text-neon-cyan font-mono text-sm">{award.title}</h4>
          {award.link && (
            <a
              href={award.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-[#404040] hover:text-neon-cyan transition-colors"
            >
              <ExternalLinkIcon className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
        <span className="text-xs text-[#606060]">{award.date}</span>
      </div>
      <p className="text-[#909090] text-xs mt-1">{award.issuer}</p>
      {award.description && (
        <p className="text-[#606060] text-xs mt-2">{award.description}</p>
      )}
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
              <ExternalLinkIcon className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
        <span
          className={cn(
            "text-xs px-2 py-0.5 border",
            statusColors[cert.status] || "text-[#606060] border-[#606060]"
          )}
        >
          {cert.status}
        </span>
      </div>
      <p className="text-xs text-[#606060] mt-1">{cert.issuer}</p>
      <p className="text-xs text-[#808080] mt-2">{cert.date}</p>
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
