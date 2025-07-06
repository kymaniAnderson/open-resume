export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: Date | null;
  endDate: Date | null;
  current: boolean;
  responsibilities: string[];
  techStack?: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: Date | null;
  endDate: Date | null;
  gpa?: string;
  honors?: string[];
  activities?: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  link?: string;
  github?: string;
  highlights: string[];
}

export interface Skills {
  languages: string[];
  frameworks: string[];
  tools: string[];
  databases: string[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  projects: Project[];
  skills: Skills;
  interests: string[];
  sectionOrder: string[];
}

export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
  },
  summary: "",
  workExperience: [],
  education: [],
  projects: [],
  skills: {
    languages: [],
    frameworks: [],
    tools: [],
    databases: [],
  },
  interests: [],
  sectionOrder: [
    "summary",
    "workExperience",
    "education",
    "projects",
    "skills",
    "interests",
  ],
};
