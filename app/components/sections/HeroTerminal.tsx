"use client";

import { HexRain } from "@/app/components/effects/HexRain";
import { GlowText } from "@/app/components/effects/GlowText";
import { useTypewriter } from "@/app/hooks/useTypewriter";
import { Profile } from "@/lib/data";
import { useState, useEffect } from "react";

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
            {/* Avatar placeholder */}
            <div className="w-20 h-20 border-2 border-neon-cyan flex items-center justify-center bg-[#0a0a0f]">
              <span className="text-3xl text-neon-cyan">
                {profile.name.charAt(0)}
              </span>
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
