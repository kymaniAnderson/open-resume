import type { ResumeData } from "../types/resume";

/**
 * Converts date strings to Date objects when loading data from JSON
 * This is necessary because JSON.parse converts Date objects to strings
 */
export function parseDates(data: ResumeData): ResumeData {
  return {
    ...data,
    workExperience: data.workExperience.map((exp) => ({
      ...exp,
      startDate: exp.startDate ? new Date(exp.startDate) : null,
      endDate: exp.endDate ? new Date(exp.endDate) : null,
    })),
    education: data.education.map((edu) => ({
      ...edu,
      startDate: edu.startDate ? new Date(edu.startDate) : null,
      endDate: edu.endDate ? new Date(edu.endDate) : null,
    })),
  };
}
