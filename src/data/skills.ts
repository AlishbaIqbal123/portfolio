export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Programming Languages",
    icon: "Code2",
    skills: ["C++", "Python", "PHP", "JavaScript", "Dart", "Java"]
  },
  {
    id: "frameworks",
    title: "Frameworks & Libraries",
    icon: "Layers",
    skills: ["Express.js", "React.js", "Node.js", "Laravel", "Flutter"]
  },
  {
    id: "databases",
    title: "Databases & Cloud",
    icon: "Database",
    skills: ["MySQL", "SQL Server", "PostgreSQL", "Firebase Firestore"]
  },
  {
    id: "tools",
    title: "Tools & Platforms",
    icon: "Wrench",
    skills: ["Git", "GitHub", "Jira", "VS Code", "Android Studio"]
  },
  {
    id: "specialized",
    title: "Specialized Development",
    icon: "Brain",
    skills: ["Android Development", "REST APIs", "Full-stack Development", "Stripe Integration", "AI Integration"]
  }
];

