export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  category: "mobile" | "web" | "desktop";
  githubUrl?: string;
  liveUrl?: string;
  image: string;
  featured: boolean;
}

export const projectsData: Project[] = [
  {
    id: "deenmate",
    title: "DeenMate (Islamic App)",
    description: "Feature-rich mobile application including Quran access, Qibla direction, prayer timings, and comprehensive Islamic resources. Built with Flutter and integrated with various APIs for real-time prayer data.",
    tech: ["Flutter", "Dart", "API Integration", "JSON", "State Management"],
    category: "mobile",
    githubUrl: "https://github.com/AlishbaIqbal123/mobile-apps",
    image: "/images/project-islamic.jpg",
    featured: true
  },
  {
    id: "ai-resume-analyzer",
    title: "AI-Powered Resume Analyzer",
    description: "Intelligent resume analysis tool with AI integration that helps users optimize their resumes for better job matches and ATS compatibility. Focuses on content analysis and scoring.",
    tech: ["JavaScript", "React", "Node.js", "AI/ML Integration"],
    category: "web",
    githubUrl: "https://github.com/AlishbaIqbal123/AI-powered-resume-analyzer",
    image: "/images/project-resume.jpg",
    featured: true
  },
  {
    id: "finance-tracker-laravel",
    title: "Finance Tracker Web Application",
    description: "Full-stack web application using Laravel and MySQL. Implemented complete CRUD operations for managing financial data, income tracking, and expense management with detailed reporting.",
    tech: ["Laravel", "PHP", "MySQL", "Bootstrap", "Blade Components"],
    category: "web",
    githubUrl: "https://github.com/AlishbaIqbal123/Finance-Tracker",
    image: "/images/project-finance-web.jpg",
    featured: true
  },
  {
    id: "ice-cream-parlor",
    title: "Ice Cream Parlor Management",
    description: "Desktop application developed using C# with SQL Server integration. Implemented complex database operations and business logic for inventory and sales management in both GUI and console versions.",
    tech: ["C#", "SQL Server", "ADONET", "Visual Studio"],
    category: "desktop",
    githubUrl: "https://github.com/AlishbaIqbal123/Ice-Cream-Parlor-system-console-based-",
    image: "/images/project-ice-cream.jpg",
    featured: true
  },
  {
    id: "planntrack",
    title: "PlanNTrack (Task Management)",
    description: "Mobile task creation and tracking application developed with Flutter. Implemented efficient task lifecycle management, priority tracking, and basic state management for a smooth UX.",
    tech: ["Flutter", "Dart", "Provider", "Local Storage"],
    category: "mobile",
    githubUrl: "https://github.com/AlishbaIqbal123/mobile-apps",
    image: "/images/project-task.jpg",
    featured: false
  },
  {
    id: "pos-mobile-shop",
    title: "Mobile Shop POS System",
    description: "Flutter-based Point of Sale application focusing on clean UI structure and logical separation. Handles product cataloging, sales transactions, and stock tracking.",
    tech: ["Flutter", "Dart", "UI Architecture", "Logic Separation"],
    category: "mobile",
    githubUrl: "https://github.com/AlishbaIqbal123/mobile-apps",
    image: "/images/project-pos.jpg",
    featured: false
  },
  {
    id: "cgpa-calculator",
    title: "COMSATS CGPA Calculator",
    description: "Mobile application implementing the specific COMSATS grading system logic. Helps students track their academic performance accurately based on credit hours and grades.",
    tech: ["Flutter", "Dart", "Grading Logic"],
    category: "mobile",
    githubUrl: "https://github.com/AlishbaIqbal123/mobile-apps",
    image: "/images/project-cgpa.jpg",
    featured: false
  },
  {
    id: "bmi-calculator",
    title: "BMI Calculator App",
    description: "Sleek Flutter application for health tracking. Features robust input validation, real-time BMI calculation, and result interpretation with health recommendations.",
    tech: ["Flutter", "Dart", "UX Design"],
    category: "mobile",
    githubUrl: "https://github.com/AlishbaIqbal123/mobile-apps",
    image: "/images/project-bmi.jpg",
    featured: false
  },
  {
    id: "quiz-application",
    title: "Quiz Application",
    description: "Designed using object-oriented programming principles. Implemented a modular structure for questions, scoring, and user interaction. High focus on code reusability and scalability.",
    tech: ["C++", "OOP", "Modular Design"],
    category: "desktop",
    githubUrl: "https://github.com/AlishbaIqbal123/Quiz-Application",
    image: "/images/project-quiz.jpg",
    featured: false
  },
  {
    id: "tic-tac-toe",
    title: "Tic Tac Toe Game",
    description: "Dual-implementation game. A console-based version in C++ focuses on pure logic and game state management, while the GUI version in Python emphasizes user interaction and visual feedback.",
    tech: ["C++", "Python", "Game Logic", "GUI"],
    category: "desktop",
    githubUrl: "https://github.com/AlishbaIqbal123/TicTacToe-Console-",
    image: "/images/project-tictactoe.png",
    featured: false
  }
];
