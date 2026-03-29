import { CRTEffect } from "./components/effects/CRTEffect";
import { StatusBar } from "./components/window/StatusBar";
import { WindowFrame } from "./components/window/WindowFrame";
import { HeroTerminal } from "./components/sections/HeroTerminal";
import { ArchiveContent } from "./components/ArchiveContent";
import { getProfile, getTimeline, getProjects, getResearch } from "@/lib/data";

export default function Home() {
  const profile = getProfile();
  const timeline = getTimeline();
  const projects = getProjects();
  const research = getResearch();

  return (
    <div className="min-h-screen bg-[#050505] relative">
      {/* CRT Effect Overlay */}
      <CRTEffect />

      {/* Status Bar */}
      <StatusBar />

      {/* Main Content */}
      <main className="pt-8">
        {/* Hero Section */}
        <HeroTerminal profile={profile} />

        {/* Window Frame with Tabs */}
        <div className="max-w-6xl mx-auto px-4 pb-12">
          <WindowFrame title="PERSONNEL_ARCHIVE.exe">
            <ArchiveContent
              timeline={timeline.entries}
              projects={projects.files}
              research={research}
              profile={profile}
            />
          </WindowFrame>
        </div>
      </main>
    </div>
  );
}
