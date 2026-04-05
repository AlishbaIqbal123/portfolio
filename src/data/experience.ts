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
    id: "internee-pk",
    title: "React.JS Intern",
    organization: "Internee.pk",
    location: "Remote",
    date: "Jan 2026 – March 2026",
    type: "work",
    description: [
      "Expanded production-level capabilities across 7+ tasks, including an AI-powered resume analyzer.",
      "Developed a full-stack E-commerce platform with secure payment integration (Stripe).",
      "Created a persistent AI chatbot utilizing Gemini APIs for intelligent interactions."
    ]
  },
  {
    id: "tkxel",
    title: "Frontend Intern",
    organization: "Tkxel",
    location: "Lahore, Pakistan",
    date: "Aug 2025 – Sep 2025",
    type: "work",
    description: [
      "Enhanced 10+ high-fidelity landing pages and newsletter layouts.",
      "Improved cross-browser compatibility by 20% across various devices and browsers.",
      "Ensured 97% alignment with UI/UX design specifications through rigorous testing and refinement."
    ]
  },
  {
    id: "forage-mastercard",
    title: "Cybersecurity Simulation",
    organization: "Mastercard (Forage)",
    location: "Remote",
    date: "Oct 2025 - Feb 2026",
    type: "simulation",
    description: [
      "Identified 15+ critical phishing vulnerabilities in simulated environments.",
      "Formulated a security training program that simulated real-world attacks to educate 50+ virtual employees on threat mitigation."
    ]
  },
  {
    id: "forage-aws",
    title: "Solutions Architecture Simulation",
    organization: "AWS (Forage)",
    location: "Remote",
    date: "Oct 2025 - Feb 2026",
    type: "simulation",
    description: [
      "Designed scalable hosting architecture using AWS Elastic Beanstalk.",
      "Documented a detailed technical cost–benefit analysis for cloud migration and scaling."
    ]
  },
  {
    id: "forage-citi",
    title: "Software Development Simulation",
    organization: "Citi (Forage)",
    location: "Remote",
    date: "Oct 2025 - Feb 2026",
    type: "simulation",
    description: [
      "Built a real-time credit risk visualization tool using Java.",
      "Created comprehensive UML state diagrams for complex loan management systems."
    ]
  },
  {
    id: "forage-ea",
    title: "Software Engineering Simulation",
    organization: "Electronic Arts (Forage)",
    location: "Remote",
    date: "Oct 2025 - Feb 2026",
    type: "simulation",
    description: [
      "Proposed and implemented game feature improvements focused on player engagement.",
      "Optimized C++ data structures and designed detailed UML class diagrams for game systems."
    ]
  },
  {
    id: "comsats",
    title: "Bachelor of Software Engineering",
    organization: "COMSATS University Islamabad",
    location: "Vehari, Pakistan",
    date: "Sep 2023 - June 2027 (Expected)",
    type: "education",
    description: [
      "Full-time degree focused on advanced software engineering principles and practices.",
      "Hands-on experience in full-stack development, mobile apps, and AI integration projects."
    ]
  }
];

