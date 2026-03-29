"use client";

import { HexRain } from "@/app/components/effects/HexRain";
import { GlowText } from "@/app/components/effects/GlowText";
import { useTypewriter } from "@/app/hooks/useTypewriter";
import { Profile } from "@/lib/data";
import { useState, useEffect } from "react";
import Image from "next/image";

interface HeroTerminalProps {
  profile: Profile;
}

export function HeroTerminal({ profile }: HeroTerminalProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-8 overflow-hidden">
      {/* Hex Rain Background */}
      <HexRain opacity={0.12} />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 w-full">
        <TerminalBootSequence profile={profile} />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
    </section>
  );
}

function TerminalBootSequence({ profile }: { profile: Profile }) {
  const [showIdentity, setShowIdentity] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const { displayText: bootText, isComplete: bootComplete } = useTypewriter(
    "> 系统初始化完成...",
    { speed: 40, delay: 300 }
  );

  const { displayText: authText, isComplete: authComplete } = useTypewriter(
    "> 身份验证: 通过",
    { speed: 40, delay: 800 }
  );

  const { displayText: clearanceText, isComplete: clearanceComplete } =
    useTypewriter(`> 安全等级: ${profile.clearance}`, { speed: 40, delay: 1200 });

  useEffect(() => {
    if (clearanceComplete) {
      const timer = setTimeout(() => setShowIdentity(true), 400);
      return () => clearTimeout(timer);
    }
  }, [clearanceComplete]);

  useEffect(() => {
    if (showIdentity) {
      const timer = setTimeout(() => setShowStats(true), 600);
      return () => clearTimeout(timer);
    }
  }, [showIdentity]);

  return (
    <div className="font-mono space-y-4">
      {/* Boot sequence */}
      <div className="space-y-2 text-sm">
        <div className="text-[#606060]">
          {bootText}
          {!bootComplete && <span className="animate-pulse">_</span>}
        </div>
        {bootComplete && (
          <div className="text-[#909090]">
            {authText}
            {!authComplete && <span className="animate-pulse">_</span>}
          </div>
        )}
        {authComplete && (
          <div className="text-[#909090]">
            {clearanceText}
            {!clearanceComplete && <span className="animate-pulse">_</span>}
          </div>
        )}
      </div>

      {/* Identity Panel */}
      {showIdentity && (
        <div className="animate-fade-in-up mt-8 p-6 border border-[rgba(0,255,159,0.2)] bg-[rgba(0,255,159,0.02)]">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 border-2 border-neon-cyan flex items-center justify-center bg-[#0a0a0f] overflow-hidden relative">
              <Image
                src={profile.avatar}
                alt={profile.name}
                width={80}
                height={80}
                className="object-cover"
              />
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <h1 className="text-4xl font-bold text-neon-cyan text-glow">
                  {profile.name}
                </h1>
                <p className="text-neon-magenta mt-1">@{profile.alias}</p>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <span className="text-[#909090]">{profile.role}</span>
                <span className="text-[#404040]">|</span>
                <span className="text-[#909090]">{profile.location}</span>
                <span className="text-[#404040]">|</span>
                <span className="text-neon-amber">{profile.organization}</span>
                <span className="text-[#404040]">|</span>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      profile.status === "ONLINE"
                        ? "bg-neon-cyan animate-pulse"
                        : profile.status === "BUSY"
                        ? "bg-neon-amber"
                        : "bg-red-500"
                    }`}
                  />
                  <span className="text-neon-cyan">{profile.status}</span>
                </div>
              </div>

              <div className="space-y-1 text-sm text-[#909090]">
                {profile.bio.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4 pt-2">
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#909090] hover:text-neon-cyan transition-colors group"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.2-6.085 8.2-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="group-hover:underline">GitHub</span>
                </a>
                <a
                  href={`mailto:${profile.social.email}`}
                  className="flex items-center gap-2 text-sm text-[#909090] hover:text-neon-magenta transition-colors group"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <span className="group-hover:underline">{profile.social.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Panel */}
      {showStats && (
        <div className="animate-fade-in-up grid grid-cols-4 gap-4 mt-6">
          <StatCard
            label="PROJECTS"
            value={profile.stats.projectsCompleted.toString()}
          />
          <StatCard label="LINES_OF_CODE" value={profile.stats.linesOfCode} />
          <StatCard label="COFFEE" value={profile.stats.coffeeConsumed} />
          <StatCard label="UPTIME" value={profile.stats.uptime} />
        </div>
      )}

      {/* System Info */}
      {showStats && (
        <div className="animate-fade-in-up mt-6 p-4 border border-[rgba(255,176,0,0.2)] bg-[rgba(255,176,0,0.02)]">
          <div className="text-xs text-[#606060] mb-2">// SYSTEM INFO</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-[#909090]">
              OS: <span className="text-neon-amber">{profile.systemInfo.os}</span>
            </div>
            <div className="text-[#909090]">
              KERNEL: <span className="text-neon-amber">{profile.systemInfo.kernel}</span>
            </div>
            <div className="text-[#909090]">
              SHELL: <span className="text-neon-amber">{profile.systemInfo.shell}</span>
            </div>
            <div className="text-[#909090]">
              UPTIME: <span className="text-neon-amber">{profile.systemInfo.uptime}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 border border-[rgba(0,255,159,0.15)] bg-[#0a0a0f] hover:border-[rgba(0,255,159,0.3)] transition-colors">
      <div className="text-[#606060] text-xs mb-1">{label}</div>
      <div className="text-neon-cyan text-lg font-bold text-glow">{value}</div>
    </div>
  );
}
