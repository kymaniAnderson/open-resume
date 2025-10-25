import { z } from "zod";

// Personal Info validation
export const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required").max(100),
  email: z.string().email("Invalid email address").max(100),
  phone: z.string().min(1, "Phone number is required").max(30),
  location: z.string().min(1, "Location is required").max(100),
  website: z
    .string()
    .url("Invalid website URL")
    .max(200)
    .optional()
    .or(z.literal("")),
  linkedin: z
    .string()
    .url("Invalid LinkedIn URL")
    .max(200)
    .optional()
    .or(z.literal("")),
  github: z
    .string()
    .url("Invalid GitHub URL")
    .max(200)
    .optional()
    .or(z.literal("")),
});

// Work Experience validation
export const workExperienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, "Company name is required").max(100),
  position: z.string().min(1, "Position is required").max(100),
  location: z.string().max(100),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  current: z.boolean(),
  responsibilities: z.array(z.string().max(500)),
  techStack: z.array(z.string().max(50)).optional(),
});

// Education validation
export const educationSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, "Institution is required").max(150),
  degree: z.string().min(1, "Degree is required").max(100),
  field: z.string().min(1, "Field of study is required").max(100),
  location: z.string().max(100),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  gpa: z.string().max(20).optional(),
  honors: z.array(z.string().max(200)).optional(),
  activities: z.array(z.string().max(200)).optional(),
});

// Project validation
export const projectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Project name is required").max(100),
  description: z.string().min(1, "Description is required").max(500),
  techStack: z.array(z.string().max(50)),
  link: z
    .string()
    .url("Invalid project URL")
    .max(200)
    .optional()
    .or(z.literal("")),
  github: z
    .string()
    .url("Invalid GitHub URL")
    .max(200)
    .optional()
    .or(z.literal("")),
  highlights: z.array(z.string().max(500)),
});

// Skills validation
export const skillsSchema = z.object({
  languages: z.array(z.string().max(50)),
  frameworks: z.array(z.string().max(50)),
  tools: z.array(z.string().max(50)),
  databases: z.array(z.string().max(50)),
});

// Resume Data validation
export const resumeDataSchema = z.object({
  personalInfo: personalInfoSchema,
  summary: z.string().max(1000),
  workExperience: z
    .array(workExperienceSchema)
    .max(20, "Maximum 20 work experiences allowed"),
  education: z
    .array(educationSchema)
    .max(10, "Maximum 10 education entries allowed"),
  projects: z.array(projectSchema).max(20, "Maximum 20 projects allowed"),
  skills: skillsSchema,
  interests: z
    .array(z.string().max(50))
    .max(20, "Maximum 20 interests allowed"),
  sectionOrder: z.array(z.string()),
});

// Validate data size (for export limit)
export function validateDataSize(data: unknown): boolean {
  const jsonString = JSON.stringify(data);
  const sizeInBytes = new Blob([jsonString]).size;
  const sizeInMB = sizeInBytes / (1024 * 1024);
  return sizeInMB <= 5; // Max 5MB
}

// Get data size in MB
export function getDataSizeMB(data: unknown): number {
  const jsonString = JSON.stringify(data);
  const sizeInBytes = new Blob([jsonString]).size;
  return sizeInBytes / (1024 * 1024);
}

export type PersonalInfoValidation = z.infer<typeof personalInfoSchema>;
export type WorkExperienceValidation = z.infer<typeof workExperienceSchema>;
export type EducationValidation = z.infer<typeof educationSchema>;
export type ProjectValidation = z.infer<typeof projectSchema>;
export type SkillsValidation = z.infer<typeof skillsSchema>;
export type ResumeDataValidation = z.infer<typeof resumeDataSchema>;
