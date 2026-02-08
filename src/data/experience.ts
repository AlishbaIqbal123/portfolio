export interface ExperienceItem {
  id: string;
  title: string;
  organization: string;
  location?: string;
  date: string;
  type: "work" | "education" | "simulation";
  description: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: "tkxel",
    title: "Frontend Development Intern (React)",
    organization: "TKXEL",
    location: "Lahore",
    date: "Aug 2025",
    type: "work",
    description: [
      "Developed interactive and reusable user interfaces using React and modern frontend practices",
      "Implemented responsive designs with HTML, CSS, and Tailwind CSS",
      "Collaborated in a professional development environment using Git-based workflows",
      "Gained exposure to real-world software engineering standards and code quality"
    ]
  },
  {
    id: "virtual-react",
    title: "Virtual Internship - React Developer",
    organization: "Remote",
    date: "Jan 2026 - Mar 2026",
    type: "work",
    description: [
      "Remote internship with industry projects",
      "Worked on real-world React applications"
    ]
  },
  {
    id: "forage-citi",
    title: "Technology Software Development",
    organization: "Citi (Forage)",
    date: "Oct 2025",
    type: "simulation",
    description: [
      "Designed and documented a structured software feature proposal",
      "Performed data querying and visualization tasks using web-based datasets",
      "Applied analytical thinking to solve technology challenges in a financial context"
    ]
  },
  {
    id: "forage-ea",
    title: "Software Engineering",
    organization: "Electronic Arts (Forage)",
    date: "Oct 2025",
    type: "simulation",
    description: [
      "Proposed new software features and designed object-oriented class structures",
      "Implemented a basic inventory system demonstrating modular and maintainable design"
    ]
  },
  {
    id: "forage-aws",
    title: "Solutions Architecture",
    organization: "AWS (Forage)",
    date: "Oct 2025",
    type: "simulation",
    description: [
      "Designed a simple, scalable cloud hosting architecture",
      "Gained practical understanding of scalability, availability, and system design concepts"
    ]
  },
  {
    id: "comsats",
    title: "BS Software Engineering",
    organization: "COMSATS University Islamabad",
    location: "Vehari Campus",
    date: "2023 - 2027 (Expected)",
    type: "education",
    description: [
      "CGPA: 3.67/4.00",
      "Focused on software development, system design, and problem-solving"
    ]
  }
];
