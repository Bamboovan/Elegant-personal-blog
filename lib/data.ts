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

// Research Types - 研究项目
export interface ResearchProject {
  id: string;
  title: string;
  status: "ACTIVE" | "COMPLETED" | "PAUSED";
  year: number;
  type: string;
  description: string;
  tags: string[];
  link?: string;
}

export interface ResearchData {
  projects: ResearchProject[];
}

// Awards Types - 荣誉和证书
export interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
  link?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  status: "COMPLETED" | "IN-PROGRESS";
  link?: string;
}

export interface AwardsData {
  awards: Award[];
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

export function getAwards(): AwardsData {
  const filePath = path.join(process.cwd(), "content/awards.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
}
