"use client";

import { useState } from "react";
import { WindowTabBar, TabId } from "./window/WindowTabBar";
import { WindowContent } from "./window/WindowContent";
import { TimelineLog } from "./sections/TimelineLog";
import { ProjectFileBrowser } from "./sections/ProjectFileBrowser";
import { ResearchPanel } from "./sections/ResearchPanel";
import { AwardsPanel } from "./sections/AwardsPanel";
import { ContactTerminal } from "./sections/ContactTerminal";
import { TimelineEntry, ProjectFile, ResearchData, AwardsData, Profile } from "@/lib/data";

interface ArchiveContentProps {
  timeline: TimelineEntry[];
  projects: ProjectFile[];
  research: ResearchData;
  awards: AwardsData;
  profile: Profile;
}

export function ArchiveContent({
  timeline,
  projects,
  research,
  awards,
  profile,
}: ArchiveContentProps) {
  const [activeTab, setActiveTab] = useState<TabId>("timeline");

  return (
    <div>
      <WindowTabBar activeTab={activeTab} onTabChange={setActiveTab} />
      <WindowContent>
        {activeTab === "timeline" && <TimelineLog entries={timeline} />}
        {activeTab === "projects" && <ProjectFileBrowser files={projects} />}
        {activeTab === "research" && <ResearchPanel projects={research.projects} />}
        {activeTab === "awards" && (
          <AwardsPanel
            certifications={awards.certifications}
            awards={awards.awards}
          />
        )}
        {activeTab === "contact" && <ContactTerminal profile={profile} />}
      </WindowContent>
    </div>
  );
}
