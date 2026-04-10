export interface ExperienceItem {
  id: string;
  title: string;
  organization: string;
  location?: string;
  date: string;
  type: "work" | "education" | "simulation";
  description: string[];
}

export const experienceData: ExperienceItem[] = [];

