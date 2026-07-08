import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Printer, Loader2, Github, Linkedin, Globe, Phone, Mail, MapPin } from 'lucide-react';
import { getPersonalInfo, getExperience, getEducation, getSkillCategories, getProjects } from '@/lib/api';
import { toast } from 'sonner';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  video_url?: string;
  github_link?: string;
  deployed_link?: string;
  tech_stack: string[];
  category: string;
  featured: boolean;
}

interface Skill {
  id?: string;
  name: string;
  logo_url?: string;
}

interface SkillCategory {
  id: string;
  title: string;
  skills: Skill[];
}

interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string;
  duration?: string;
  type?: 'work' | 'internship' | 'simulation';
  description?: string;
  points?: string[];
  link?: string;
}

interface Education {
  id: string;
  degree: string;
  school: string;
  location?: string;
  duration?: string;
  status?: string;
  details?: string[];
  achievements?: string[];
  cgpa?: string;
}

// Company URL mapping as fallbacks
const companyUrls: Record<string, string> = {
  'Tkxel': 'https://tkxel.com',
  'Internee.pk': 'https://internee.pk',
  'Forage': 'https://www.theforage.com',
  'Mastercard': 'https://www.mastercard.com',
  'AWS': 'https://aws.amazon.com',
  'Citi': 'https://www.citigroup.com',
  'Electronic Arts': 'https://www.ea.com',
};

export default function ResumePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const autoPrint = searchParams.get('print') === 'true';

  const [loading, setLoading] = useState(true);
  const [personal, setPersonal] = useState<any>(null);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [personalData, expData, eduData, skillData, projData] = await Promise.all([
          getPersonalInfo(),
          getExperience(),
          getEducation(),
          getSkillCategories(),
          getProjects(),
        ]);

        if (personalData) setPersonal(personalData);
        if (expData) setExperience(expData as any[]);
        if (eduData) setEducation(eduData as any[]);
        if (skillData) setSkills(skillData as any[]);
        if (projData) setProjects(projData as any[]);
      } catch (err) {
        console.error('Failed to load resume data from database:', err);
        toast.error('Could not sync live resume data. Displaying fallback values.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Trigger print after loading is complete and if print param is set
  useEffect(() => {
    if (!loading && autoPrint) {
      const timer = setTimeout(() => {
        window.print();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [loading, autoPrint]);

  // Fallbacks for Personal Info
  const displayPersonal = personal || {
    name: "Alishba Iqbal",
    title: "Software Engineer",
    phone: "+92 3180623294",
    location: "Vehari, Pakistan",
    email: "i.alishba1342@gmail.com",
    github: "https://github.com/AlishbaIqbal123",
    linkedin: "https://www.linkedin.com/in/alishba-iqbal-a667b6263",
    bio: "Software Engineering student at COMSATS University with hands-on experience in Flutter, Full Stack Development, React.js, Node.js, REST APIs, and AI-powered applications. Experienced in building scalable web and mobile applications, integrating payment systems (Stripe), and developing AI tools using Gemini API. Seeking a Software Engineer & Full Stack Developer where I can contribute to building efficient and user-focused software solutions."
  };

  // Fallbacks for Education
  const displayEducation = education.length > 0 ? education : [
    {
      id: "edu-1",
      degree: "Bachelor of Software Engineering",
      school: "COMSATS University Islamabad, Vehari",
      duration: "Expected June 2027",
      status: "completed"
    }
  ];

  // Fallbacks for Skills
  const displaySkills = skills.length > 0 ? skills : [
    {
      id: "sk-1",
      title: "Technical Skills",
      skills: ["Express.js", "Flutter", "React.js", "Node.js", "Android Development", "REST APIs", "Full-stack Development", "Stripe Integration"].map(name => ({ name }))
    },
    {
      id: "sk-2",
      title: "Languages",
      skills: ["C++", "Python", "PHP", "JavaScript", "Dart", "Java"].map(name => ({ name }))
    },
    {
      id: "sk-3",
      title: "Databases",
      skills: ["MySQL", "SQL Server", "PostgreSQL (Supabase)", "Firebase Firestore"].map(name => ({ name }))
    },
    {
      id: "sk-4",
      title: "Version Control",
      skills: ["Git", "GitHub"].map(name => ({ name }))
    },
    {
      id: "sk-5",
      title: "Tools",
      skills: ["Jira", "VS Code", "Android Studio", "Postman"].map(name => ({ name }))
    },
    {
      id: "sk-6",
      title: "Platforms",
      skills: ["Windows"].map(name => ({ name }))
    },
    {
      id: "sk-7",
      title: "Other",
      skills: ["Problem Solving", "Team work", "Attention to detail"].map(name => ({ name }))
    }
  ];

  // Fallbacks for Experience
  const displayExperience = experience.length > 0 ? experience : [
    {
      id: "exp-1",
      role: "Frontend-Intern",
      company: "Tkxel",
      location: "Lahore, Pakistan",
      duration: "Aug 2025 – Sep 2025",
      points: [
        "Enhanced 10+ high-fidelity landing pages and newsletter layouts, improving cross-browser compatibility by 20% and ensuring 97% alignment with UI/UX design specifications."
      ]
    },
    {
      id: "exp-2",
      role: "React.JS",
      company: "Internee.pk",
      location: "Remote",
      duration: "Jan 2026– March 2026",
      points: [
        "Expanded production-level capabilities across 7+ tasks, including an AI-powered resume analyzer, a full-stack E-commerce platform with secure payments, and a persistent AI chatbot using Gemini APIs."
      ]
    },
    {
      id: "exp-3",
      role: "Virtual Job Simulations",
      company: "Forage",
      location: "Remote",
      duration: "Oct 2025 – Feb 2026",
      description: "Completed hands-on simulations from Mastercard, AWS, Citi, and Electronic Arts, solving real-world engineering and cybersecurity scenarios.",
      points: [
        "Cybersecurity (Mastercard): Identified 15+ critical phishing vulnerabilities and Formulated a security training program that simulated real-world attacks to educate 50+ virtual employees on threat mitigation .",
        "Solutions Architecture (AWS): Designed scalable hosting architecture using AWS Elastic Beanstalk and documented technical cost–benefit analysis.",
        "Software Development (Citi): Built a real-time credit risk visualization tool in Java and created UML state diagrams for loan systems.",
        "Software Engineering (Electronic Arts): Proposed game feature improvements, optimized C++ data structures, and designed UML class diagrams."
      ]
    }
  ];

  // Fallbacks for Starred/Featured Projects
  const displayProjects = projects.filter(p => p.featured).length > 0
    ? projects.filter(p => p.featured)
    : [
        {
          id: "proj-1",
          title: "Finance Tracker",
          description: "personal finance app featuring real-time balance tracking, analytics, and interactive dashboards with a mobile-first glassmorphism UI.",
          tech_stack: ["Laravel 11", "PHP 8.2", "PostgreSQL", "Bootstrap 5", "JavaScript"],
          category: "Personal Finance Management App",
          github_link: "https://github.com/AlishbaIqbal123",
          featured: true,
          image: ""
        },
        {
          id: "proj-2",
          title: "Deen-Mate",
          description: "Engineered a feature-rich Islamic Mobile App with Quran reading, prayer time calculations, Qibla compass, and background audio streaming using Firebase and multiple REST APIs with offline-first support.",
          tech_stack: ["Flutter", "Firebase", "GetX", "REST APIs"],
          category: "Islamic Companion App (Flutter)",
          github_link: "https://github.com/AlishbaIqbal123",
          featured: true,
          image: ""
        },
        {
          id: "proj-3",
          title: "AI-Powered Resume Analyzer",
          description: "Architected a MERN-based AI platform that parses resumes, performs semantic job-matching with ATS keyword analysis, and delivers personalized career insights using Google Gemini models.",
          tech_stack: ["React", "Node.js", "Express", "MongoDB", "Google Gemini AI"],
          category: "",
          github_link: "https://github.com/AlishbaIqbal123",
          featured: true,
          image: ""
        },
        {
          id: "proj-4",
          title: "Plan & Track",
          description: "Engineered a mobile task management application supporting recurring tasks, subtasks with progress tracking, local notifications, and data import/export with customizable themes.",
          tech_stack: ["Flutter", "Dart", "SQLite", "Provider"],
          category: "Task Management Application (Flutter)",
          github_link: "https://github.com/AlishbaIqbal123",
          featured: true,
          image: ""
        },
        {
          id: "proj-5",
          title: "Smart POS & Inventory Management App",
          description: "Built a business management mobile app with POS checkout, inventory tracking, customer ledger, offline-first data handling, and automated Google Drive backups with cloud sync.",
          tech_stack: ["Flutter", "Firebase", "SQLite", "Provider"],
          category: "",
          github_link: "https://github.com/AlishbaIqbal123",
          featured: true,
          image: ""
        }
      ];

  const handlePrint = () => {
    window.print();
  };

  const getCompanyUrl = (companyName: string, dbLink?: string) => {
    if (dbLink) return dbLink;
    const cleanName = companyName.trim();
    return companyUrls[cleanName] || companyUrls[Object.keys(companyUrls).find(k => cleanName.includes(k)) || ''] || '#';
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white">
        <Loader2 className="animate-spin w-10 h-10 mb-4 text-emerald-500" />
        <p className="text-xs uppercase tracking-widest font-black opacity-60">Compiling CV Structure...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900/40 text-black py-8 px-4 flex flex-col items-center print:p-0 print:bg-white print:py-0">
      
      {/* 🛠️ CONTROL PANEL (Hidden in print) */}
      <div className="print:hidden w-full max-w-[210mm] bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 flex flex-col md:flex-row justify-between items-center gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/portfolio')}
            className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center hover:bg-slate-700 transition-colors"
            title="Back to Portfolio"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-sm font-black text-white uppercase tracking-wider">Interactive CV Builder</h1>
            <p className="text-[10px] text-slate-400 uppercase font-bold italic">Dynamically Linked to Portfolio DB</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={handlePrint}
            className="flex-1 md:flex-initial h-10 px-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-900/20"
          >
            <Printer className="w-4 h-4" /> Save as PDF / Print
          </button>
        </div>
      </div>

      <div className="print:hidden w-full max-w-[210mm] bg-blue-950/20 border border-blue-900/30 rounded-2xl p-4 mb-6 text-[10px] text-slate-300 font-medium leading-relaxed">
        <span className="font-bold text-blue-400 uppercase tracking-wider block mb-1">💡 Professional PDF Export Tips:</span>
        1. Click <strong className="text-emerald-400">Save as PDF / Print</strong> above.<br />
        2. Set <strong>Destination</strong> to <strong className="text-white">Save as PDF</strong>.<br />
        3. Set <strong>Paper size</strong> to <strong className="text-white">A4</strong> and <strong>Layout</strong> to <strong className="text-white">Portrait</strong>.<br />
        4. Set <strong>Margins</strong> to <strong className="text-white">Default</strong> (or <strong className="text-white">None</strong> for a tighter fit).<br />
        5. Enable <strong className="text-white">Background graphics</strong> under More Settings to render colors correctly.
      </div>

      {/* 📄 THE CV PAGE SHEET */}
      <div 
        id="cv-sheet"
        className="w-full max-w-[210mm] min-h-[297mm] bg-white border border-slate-200 shadow-2xl p-[0.6in] flex flex-col font-sans text-slate-800 leading-normal print:shadow-none print:border-none print:p-[0.4in]"
      >
        {/* Name and Title Header */}
        <div className="text-center mb-3">
          <h1 className="text-[22pt] font-black tracking-wider text-emerald-800 leading-none uppercase">
            {displayPersonal.title || "Software Engineer"}
          </h1>
          <h2 className="text-[14pt] font-bold text-emerald-700 mt-1 leading-none">
            {displayPersonal.name}
          </h2>
          
          {/* Subheader links */}
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-1 text-[9.5pt] font-medium text-slate-700 mt-2.5">
            {displayPersonal.phone && (
              <span className="flex items-center gap-1">
                <span className="font-bold text-emerald-800">Phone:</span>
                <a href={`tel:${displayPersonal.phone.replace(/\s+/g, '')}`} className="hover:underline hover:text-emerald-700">
                  {displayPersonal.phone}
                </a>
              </span>
            )}
            {displayPersonal.location && (
              <span className="flex items-center gap-1">
                <span className="font-bold text-emerald-800">Location:</span>
                <span>{displayPersonal.location}</span>
              </span>
            )}
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-1 text-[9.5pt] font-medium text-slate-700 mt-1.5 border-b border-slate-300 pb-2.5">
            {displayPersonal.email && (
              <span className="flex items-center gap-1">
                <span className="font-bold text-emerald-800">Email:</span>
                <a href={`mailto:${displayPersonal.email}`} className="hover:underline text-emerald-800 font-semibold">
                  {displayPersonal.email}
                </a>
              </span>
            )}
            {displayPersonal.linkedin && (
              <span className="flex items-center gap-1">
                <span className="font-bold text-emerald-800">LinkedIn:</span>
                <a 
                  href={displayPersonal.linkedin.startsWith('http') ? displayPersonal.linkedin : `https://www.linkedin.com/in/${displayPersonal.linkedin.toLowerCase().replace(/\s+/g, '-')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline text-emerald-800 font-semibold"
                >
                  {displayPersonal.linkedin.replace(/https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
                </a>
              </span>
            )}
            {displayPersonal.github && (
              <span className="flex items-center gap-1">
                <span className="font-bold text-emerald-800">GitHub:</span>
                <a 
                  href={displayPersonal.github.startsWith('http') ? displayPersonal.github : `https://github.com/${displayPersonal.github}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline text-emerald-800 font-semibold"
                >
                  {displayPersonal.github.replace(/https?:\/\/(www\.)?github\.com\//, '')}
                </a>
              </span>
            )}
          </div>
        </div>

        {/* Section Wrapper */}
        <div className="flex-1 flex flex-col justify-between">
          
          {/* Section: Objective */}
          <div className="mb-2">
            <h3 className="text-[10pt] font-black text-emerald-800 uppercase tracking-wider border-b-2 border-emerald-800 pb-0.5 mb-1.5">
              Objective:
            </h3>
            <p className="text-[9.5pt] text-slate-800 leading-relaxed text-justify">
              {displayPersonal.bio}
            </p>
          </div>

          {/* Section: Education */}
          <div className="mb-2">
            <h3 className="text-[10pt] font-black text-emerald-800 uppercase tracking-wider border-b-2 border-emerald-800 pb-0.5 mb-1.5">
              Education:
            </h3>
            {displayEducation.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start text-[9.5pt] leading-tight">
                <div>
                  <span className="font-bold text-slate-800">{edu.degree}</span>
                  {edu.school && (
                    <span className="text-slate-700">
                      , <span className="italic">{edu.school}</span>
                    </span>
                  )}
                </div>
                {edu.duration && <span className="font-bold italic text-slate-700 whitespace-nowrap ml-4">{edu.duration}</span>}
              </div>
            ))}
          </div>

          {/* Section: Skills */}
          <div className="mb-2">
            <h3 className="text-[10pt] font-black text-emerald-800 uppercase tracking-wider border-b-2 border-emerald-800 pb-0.5 mb-1.5">
              Skills:
            </h3>
            <div className="grid grid-cols-[140px_1fr] gap-x-2 gap-y-0.5 text-[9.5pt] leading-tight text-slate-800">
              {displaySkills.map((cat) => (
                <div key={cat.id} className="contents">
                  <span className="font-bold text-slate-800">{cat.title}:</span>
                  <span className="text-slate-700">
                    {cat.skills.map((s) => s.name).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Experience */}
          <div className="mb-2">
            <h3 className="text-[10pt] font-black text-emerald-800 uppercase tracking-wider border-b-2 border-emerald-800 pb-0.5 mb-1.5">
              Experience:
            </h3>
            <div className="space-y-2">
              {displayExperience.map((exp) => {
                const isForage = exp.company.toLowerCase().includes('forage');
                return (
                  <div key={exp.id} className="text-[9.5pt]">
                    <div className="flex justify-between items-start font-bold text-slate-800 leading-none">
                      <div>
                        <span>{exp.role}</span>
                        <span> – </span>
                        <a 
                          href={getCompanyUrl(exp.company, exp.link)} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-emerald-800 hover:underline"
                        >
                          {exp.company}
                        </a>
                      </div>
                      {exp.duration && <span className="italic font-bold text-slate-700 whitespace-nowrap ml-4">{exp.duration}</span>}
                    </div>
                    {exp.location && <div className="text-[9pt] italic text-slate-600 mt-0.5 leading-none">{exp.location}</div>}
                    
                    {exp.description && (
                      <p className="text-[9pt] text-slate-800 mt-1 leading-normal">
                        {exp.description}
                      </p>
                    )}

                    {exp.points && exp.points.length > 0 && (
                      <ul className="list-disc pl-5 mt-1 space-y-0.5 text-[9pt] text-slate-800 leading-relaxed">
                        {exp.points.map((point, index) => {
                          // Handle simulations specifically: check if there's a bold keyword
                          const colonIndex = point.indexOf(':');
                          if (isForage && colonIndex !== -1 && colonIndex < 35) {
                            const title = point.substring(0, colonIndex);
                            const content = point.substring(colonIndex);
                            
                            // Check if title has a parenthesized brand to hyperlink (e.g. Cybersecurity (Mastercard))
                            const openParen = title.indexOf('(');
                            const closeParen = title.indexOf(')');
                            if (openParen !== -1 && closeParen !== -1) {
                              const beforeBrand = title.substring(0, openParen);
                              const brand = title.substring(openParen + 1, closeParen);
                              const afterBrand = title.substring(closeParen + 1);
                              return (
                                <li key={index} className="text-justify">
                                  <strong className="font-bold">{beforeBrand}</strong>(
                                  <a 
                                    href={getCompanyUrl(brand)} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="text-emerald-800 hover:underline font-bold"
                                  >
                                    {brand}
                                  </a>
                                  <strong className="font-bold">){afterBrand}</strong>
                                  {content}
                                </li>
                              );
                            }
                            
                            return (
                              <li key={index} className="text-justify">
                                <strong className="font-bold">{title}</strong>{content}
                              </li>
                            );
                          }
                          return (
                            <li key={index} className="text-justify">{point}</li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section: Featured Projects */}
          <div className="mb-2">
            <h3 className="text-[10pt] font-black text-emerald-800 uppercase tracking-wider border-b-2 border-emerald-800 pb-0.5 mb-1.5">
              Featured Projects:
            </h3>
            <div className="space-y-1.5">
              {displayProjects.slice(0, 5).map((project) => {
                const portfolioUrl = `${window.location.origin}/projects/${project.id}`;
                const githubLink = project.github_link;
                const deployedLink = project.deployed_link;
                const stack = project.tech_stack || [];

                return (
                  <div key={project.id} className="text-[9pt]">
                    <div className="flex justify-between items-start leading-none mb-0.5">
                      <div className="text-[9.5pt]">
                        <a 
                          href={portfolioUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="font-bold text-slate-800 hover:text-emerald-800 hover:underline"
                        >
                          {project.title}
                        </a>
                        {project.category && (
                          <span className="text-slate-700">
                            {' '}— {project.category}
                          </span>
                        )}
                        <span className="text-[8pt] text-slate-500 ml-2 font-normal whitespace-nowrap">
                          (
                          <a href={portfolioUrl} target="_blank" rel="noreferrer" className="text-emerald-800 hover:underline">Portfolio</a>
                          {githubLink && (
                            <>
                              {' | '}
                              <a href={githubLink} target="_blank" rel="noreferrer" className="text-emerald-800 hover:underline">GitHub</a>
                            </>
                          )}
                          {deployedLink && (
                            <>
                              {' | '}
                              <a href={deployedLink} target="_blank" rel="noreferrer" className="text-emerald-800 hover:underline">Live</a>
                            </>
                          )}
                          )
                        </span>
                      </div>
                      {stack.length > 0 && (
                        <span className="text-[8.5pt] italic text-slate-700 text-right max-w-[280px] font-medium ml-4 truncate">
                          {stack.join(', ')}
                        </span>
                      )}
                    </div>
                    <ul className="list-disc pl-5 text-[9pt] text-slate-800 leading-normal">
                      <li>{project.description}</li>
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section: Footer links */}
          <div className="text-center text-[9.5pt] border-t border-slate-300 pt-2.5 mt-2 font-bold text-slate-700 leading-none">
            You can view More of my new projects on my{' '}
            <a href={`${window.location.origin}/portfolio`} target="_blank" rel="noreferrer" className="text-emerald-800 hover:underline">
              portfolio
            </a>{' '}
            as well as from my{' '}
            <a href={displayPersonal.github} target="_blank" rel="noreferrer" className="text-emerald-800 hover:underline">
              Github
            </a>{' '}
            as well.
          </div>

        </div>
      </div>

    </div>
  );
}
