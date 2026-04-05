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

export const projectsData: Project[] = [
  {
    id: "finance-tracker",
    title: "Finance Tracker",
    description: "Personal finance app featuring real-time balance tracking, budgeting analytics, and interactive dashboards with a mobile-first glassmorphism UI. Built with Laravel 11, PHP 8.2, and PostgreSQL.",
    tags: ["Laravel 11", "PHP 8.2", "PostgreSQL", "Bootstrap 5", "JavaScript"],
    category: "web",
    githubUrl: "https://github.com/AlishbaIqbal123",
    image: "/images/project-finance.jpg", 
    featured: true
  },
  {
    id: "deen-mate",
    title: "Deen-Mate",
    description: "Engineered a feature-rich Islamic mobile application with Quran reading, prayer time calculations, Qibla compass, and background audio streaming. Built with Flutter and Firebase with offline-first support.",
    tags: ["Flutter", "Firebase", "GetX", "REST APIs", "Offline-first"],
    category: "mobile",
    githubUrl: "https://github.com/AlishbaIqbal123/mobile-apps",
    image: "/images/project-islamic.jpg",
    featured: true
  },
  {
    id: "ai-resume-analyzer",
    title: "AI-Powered Resume Analyzer",
    description: "Architected a MERN-based AI platform that parses resumes, performs semantic job-matching with ATS keyword analysis, and delivers personalized career insights using Google Gemini AI.",
    tags: ["React", "Node.js", "Express", "MongoDB", "Google Gemini AI"],
    category: "web",
    githubUrl: "https://github.com/AlishbaIqbal123/AI-powered-resume-analyzer",
    liveUrl: "https://ai-powered-resume-analyzer-zaun.vercel.app/",
    image: "/images/project-resume.jpg", 
    featured: true
  },
  {
    id: "plan-track",
    title: "Plan & Track",
    description: "Engineered a mobile task management application supporting recurring tasks, subtasks with progress tracking, local notifications, and data import/export with customizable themes.",
    tags: ["Flutter", "Dart", "SQLite", "Provider"],
    category: "mobile",
    githubUrl: "https://github.com/AlishbaIqbal123/mobile-apps",
    image: "/images/project-task.jpg",
    featured: true
  },
  {
    id: "smart-pos",
    title: "Smart POS & Inventory Management",
    description: "Built a business management mobile app with POS checkout, inventory tracking, customer ledger, offline-first data handling, and automated Google Drive backups with cloud sync.",
    tags: ["Flutter", "Firebase", "SQLite", "Provider"],
    category: "mobile",
    githubUrl: "https://github.com/AlishbaIqbal123/mobile-apps",
    image: "/images/project-pos.jpg",
    featured: true
  }
];



