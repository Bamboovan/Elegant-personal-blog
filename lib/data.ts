import fs from "fs";
import path from "path";

// Profile Types
export interface Profile {
  id: string;
  name: string;
  alias: string;
  role: string;
  status: "ONLINE" | "BUSY" | "OFFLINE";
  location: string;
  clearance: string;
  avatar: string;
  bio: string[];
  stats: {
    projectsCompleted: number;
    linesOfCode: string;
    coffeeConsumed: string;
    uptime: string;
  };
  systemInfo: {
    os: string;
    kernel: string;
    shell: string;
    uptime: string;
  };
  social: {
    github: string;
    email: string;
  };
  skills: {
    name: string;
    level: number;
    category: string;
  }[];
}

// Timeline Types
export interface TimelineEntry {
  timestamp: string;
  type: "EVENT" | "PROJECT" | "AWARD" | "PUBLICATION" | "CERTIFICATION";
  category: "EDUCATION" | "DEV" | "ACHIEVEMENT" | "WORK" | "OTHER";
  title: string;
  description: string;
  details: string[];
}

export interface TimelineData {
  entries: TimelineEntry[];
}

// Project Types
export interface ProjectFile {
  id: string;
  name: string;
  type: "FILE" | "FOLDER";
  ext: string;
  size: string;
  modified: string;
  description: string;
  tech: string[];
  status: "ACTIVE" | "COMPLETED" | "ARCHIVED" | "DEVELOPMENT";
  icon: string;
  links: {
    github?: string;
    demo?: string;
  };
}

export interface ProjectsData {
  files: ProjectFile[];
}

// Research Types
export interface ResearchInterest {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  status: "ACTIVE" | "PAUSED" | "COMPLETED";
  description: string;
  tags: string[];
  link?: string;
}

export interface Paper {
  title: string;
  status: string;
  venue: string;
  year: number;
  abstract: string;
  link?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  status: string;
  link?: string;
}

export interface ResearchData {
  interests: ResearchInterest[];
  papers: Paper[];
  certifications: Certification[];
}

// Data Readers
export function getProfile(): Profile {
  const filePath = path.join(process.cwd(), "content/profile.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
}

export function getTimeline(): TimelineData {
  const filePath = path.join(process.cwd(), "content/timeline.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
}

export function getProjects(): ProjectsData {
  const filePath = path.join(process.cwd(), "content/projects.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
}

export function getResearch(): ResearchData {
  const filePath = path.join(process.cwd(), "content/research.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
}
