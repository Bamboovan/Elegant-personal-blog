"use client";

import { useState } from "react";
import { WindowTabBar, TabId } from "./window/WindowTabBar";
import { WindowContent } from "./window/WindowContent";
import { TimelineLog } from "./sections/TimelineLog";
import { ProjectFileBrowser } from "./sections/ProjectFileBrowser";
import { ResearchPanel } from "./sections/ResearchPanel";
import { ContactTerminal } from "./sections/ContactTerminal";
import { TimelineEntry, ProjectFile, ResearchData, Profile } from "@/lib/data";

interface ArchiveContentProps {
  timeline: TimelineEntry[];
  projects: ProjectFile[];
  research: ResearchData;
  profile: Profile;
}

export function ArchiveContent({
  timeline,
  projects,
  research,
  profile,
}: ArchiveContentProps) {
  const [activeTab, setActiveTab] = useState<TabId>("timeline");

  return (
    <div>
      <WindowTabBar activeTab={activeTab} onTabChange={setActiveTab} />
      <WindowContent>
        {activeTab === "timeline" && <TimelineLog entries={timeline} />}
        {activeTab === "projects" && <ProjectFileBrowser files={projects} />}
        {activeTab === "research" && (
          <ResearchPanel
            interests={research.interests}
            papers={research.papers}
            certifications={research.certifications}
          />
        )}
        {activeTab === "contact" && <ContactTerminal profile={profile} />}
      </WindowContent>
    </div>
  );
}
