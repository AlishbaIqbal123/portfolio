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
    skills: ["C++", "Java", "Dart", "PHP", "SQL", "JavaScript", "TypeScript"]
  },
  {
    id: "frameworks",
    title: "Frameworks & Libraries",
    icon: "Layers",
    skills: ["Flutter", "React", "Laravel", "Tailwind CSS"]
  },
  {
    id: "databases",
    title: "Databases",
    icon: "Database",
    skills: ["MySQL", "SQL Server"]
  },
  {
    id: "tools",
    title: "Tools & Platforms",
    icon: "Wrench",
    skills: ["Git", "GitHub", "VS Code", "Visual Studio"]
  },
  {
    id: "core",
    title: "Core Concepts",
    icon: "Brain",
    skills: ["Data Structures", "OOP", "Problem Solving", "System Design"]
  }
];
