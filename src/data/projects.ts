export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: "mobile" | "web" | "desktop";
  githubUrl?: string;
  liveUrl?: string;
  image: string;
  videoUrl?: string;
  is_video_primary?: boolean;
  featured: boolean;
  images?: string[];
}

export const projectsData: Project[] = [];



