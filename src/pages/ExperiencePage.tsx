import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ExternalLink, Award, Building2, Code2, Sparkles, Linkedin, ArrowRight } from 'lucide-react';

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  date: string;
  type: 'internship' | 'simulation';
  description: string[];
  skills: string[];
  link?: string;
}

const experiences: ExperienceItem[] = [
  {
    id: 'tkxel',
    title: 'Frontend Development Intern (React)',
    company: 'TKXEL',
    location: 'Lahore, Pakistan',
    date: 'August 2025',
    type: 'internship',
    description: [
      'Developing interactive and reusable user interfaces using React and modern frontend practices',
      'Implementing responsive designs with HTML, CSS, and Tailwind CSS',
      'Collaborating in a professional development environment using Git-based workflows',
      'Gaining exposure to real-world software engineering standards, code quality, and team collaboration',
    ],
    skills: ['React', 'Tailwind CSS', 'Git', 'Responsive Design', 'Component Architecture'],
  },
  {
    id: 'virtual-react',
    title: 'Virtual Internship - React Developer',
    company: 'Remote',
    location: 'Remote',
    date: 'January 2026 - March 2026',
    type: 'internship',
    description: [
      'Engaged in advanced React development cycles including state management and API orchestration',
      'Worked on real-world industry projects under professional mentorship',
      'Enhanced frontend engineering skills with a focus on performant UI components',
    ],
    skills: ['React', 'JavaScript', 'Frontend Engineering', 'Project Management'],
  },
];

const simulations: ExperienceItem[] = [
  {
    id: 'citi',
    title: 'Technology Software Development',
    company: 'Citi (Forage Virtual Simulation)',
    location: 'Virtual',
    date: 'October 2025',
    type: 'simulation',
    description: [
      'Designed and documented a structured software feature proposal for banking infrastructure',
      'Performed data querying and visualization tasks using complex web-based datasets',
      'Applied analytical thinking to solve technology challenges in a high-stakes financial context',
    ],
    skills: ['Data Analysis', 'Software Design', 'Financial Tech', 'Visualization'],
    link: 'https://www.theforage.com/simulations/citi/technology-software-development',
  },
  {
    id: 'ea',
    title: 'Software Engineering',
    company: 'Electronic Arts - EA (Forage Virtual Simulation)',
    location: 'Virtual',
    date: 'October 2025',
    type: 'simulation',
    description: [
      'Proposed new software features and designed object-oriented class structures for game systems',
      'Implemented a basic inventory system demonstrating modular and maintainable design patterns',
      'Applied OOP principles to solve game development architectural challenges',
    ],
    skills: ['OOP', 'System Design', 'Game Development', 'Modular Architecture'],
    link: 'https://www.theforage.com/simulations/electronic-arts/software-engineering',
  },
  {
    id: 'aws',
    title: 'Solutions Architecture',
    company: 'AWS (Forage Virtual Simulation)',
    location: 'Virtual',
    date: 'October 2025',
    type: 'simulation',
    description: [
      'Designed a simple, scalable cloud hosting architecture utilizing core AWS services',
      'Gained practical understanding of scalability, availability, and high-level system design concepts',
      'Architected cloud solutions focusing on cost-efficiency and fault tolerance',
    ],
    skills: ['AWS', 'Cloud Architecture', 'System Design', 'Scalability'],
    link: 'https://www.theforage.com/simulations/aws/solutions-architecture',
  },
];

function TimelineCard({ item, index }: { item: ExperienceItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`relative flex items-center gap-12 md:gap-24 ${isEven ? 'flex-row' : 'flex-row-reverse'} mb-24 last:mb-0`}
    >
      <div className={`flex-1 ${isEven ? 'text-right' : 'text-left'}`}>
        <div className={`group p-1 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent transition-all duration-500 hover:from-[var(--primary)]/30`}>
          <div className="p-10 rounded-[2.4rem] bg-[var(--card)]/40 backdrop-blur-3xl border border-white/5 relative overflow-hidden h-full">
            <div className={`flex items-center gap-3 mb-6 ${isEven ? 'justify-end' : ''}`}>
              <span className={`px-4 py-1 text-[10px] font-black rounded-full uppercase tracking-widest ${item.type === 'internship' ? 'bg-[var(--primary)] text-[var(--oxford-blue)]' : 'bg-white/10 text-white'}`}>
                {item.type}
              </span>
              <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)] font-bold">
                <Calendar className="w-3.5 h-3.5" />
                {item.date}
              </div>
            </div>

            <h3 className="text-3xl font-black mb-3 tracking-tight group-hover:text-[var(--primary)] transition-colors italic">{item.title}</h3>

            <div className={`flex items-center gap-4 mb-8 ${isEven ? 'justify-end' : ''}`}>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[var(--primary)]" />
                <span className="text-[var(--primary)] font-black text-sm uppercase tracking-wider">{item.company}</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <div className="flex items-center gap-2 text-[var(--muted-foreground)] font-bold text-xs uppercase tracking-widest">
                <MapPin className="w-3.5 h-3.5" />
                {item.location}
              </div>
            </div>

            <ul className={`space-y-4 mb-10 ${isEven ? 'text-right' : ''}`}>
              {item.description.map((desc, i) => (
                <li key={i} className={`text-sm text-[var(--foreground)]/70 flex items-start gap-3 ${isEven ? 'flex-row-reverse' : ''}`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mt-1.5 flex-shrink-0" />
                  <span className="leading-relaxed font-medium">{desc}</span>
                </li>
              ))}
            </ul>

            <div className={`flex flex-wrap gap-2 ${isEven ? 'justify-end' : ''}`}>
              {item.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3.5 py-1.5 text-[10px] font-black rounded-lg bg-white/5 text-[var(--foreground)]/80 uppercase tracking-widest border border-white/5"
                >
                  {skill}
                </span>
              ))}
            </div>

            {item.link && (
              <div className={`mt-10 pt-8 border-t border-white/5 flex ${isEven ? 'justify-end' : 'justify-start'}`}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-black text-[var(--primary)] hover:gap-3 transition-all uppercase tracking-[0.2em]"
                >
                  Verification
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center h-full top-0 hidden md:flex">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          className={`w-16 h-16 rounded-[1.2rem] flex items-center justify-center z-10 shadow-2xl relative transition-transform duration-500 hover:rotate-12 ${item.type === 'internship' ? 'bg-[var(--primary)]' : 'bg-white/10 backdrop-blur-xl'
            }`}
        >
          {item.type === 'internship' ? (
            <Briefcase className="w-7 h-7 text-[var(--oxford-blue)]" />
          ) : (
            <Award className="w-7 h-7 text-white" />
          )}
          <div className="absolute inset-0 rounded-[1.2rem] border-2 border-[var(--primary)] animate-pulse opacity-20" />
        </motion.div>

        <div className="w-px flex-1 bg-gradient-to-b from-[var(--primary)]/30 via-[var(--primary)]/10 to-transparent" />
      </div>

      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}

export function ExperiencePage() {
  const allExperiences = [...experiences, ...simulations];

  return (
    <div className="relative overflow-hidden min-h-screen">
      <section className="section-padding pt-32 lg:pt-48 pb-40">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-40"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex mb-8"
            >
              <div className="flex items-center gap-2 px-6 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-black uppercase tracking-[0.2em] border border-[var(--primary)]/20 shadow-sm backdrop-blur-md">
                <Sparkles className="w-4 h-4" />
                The Odyssey
              </div>
            </motion.div>

            <h1 className="text-7xl md:text-[10rem] font-black mb-10 tracking-[-0.05em] leading-[0.85] italic">
              Professional{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[#A0B2C6] block md:inline">
                Growth
              </span>
            </h1>

            <p className="text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto font-medium leading-relaxed">
              Bridging the gap between academic theory and complex engineering reality through focused practical iterations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-40">
            {[
              { value: '02', label: 'Internships', icon: <Briefcase className="w-6 h-6" /> },
              { value: '03', label: 'Simulations', icon: <Award className="w-6 h-6" /> },
              { value: '15+', label: 'Tech Stack', icon: <Code2 className="w-6 h-6" /> },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-10 rounded-[3rem] bg-[var(--card)]/30 border border-white/5 backdrop-blur-md flex flex-col items-center justify-center text-center hover:border-[var(--primary)]/50 transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-[var(--primary)] group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-6xl font-black text-[var(--primary)] mb-3 tracking-tighter italic">
                  {stat.value}
                </div>
                <div className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-[0.3em] font-black">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--primary)]/5 via-[var(--primary)]/20 to-transparent hidden md:block" />

            <div className="relative">
              {allExperiences.map((item, index) => (
                <TimelineCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-40 text-center"
          >
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <Code2 className="w-5 h-5 text-[var(--primary)]" />
              <span className="text-sm font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                Additional Forage Virtual Simulations – <span className="text-[var(--primary)]">IN PROGRESS</span>
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-40 p-16 md:p-24 rounded-[4rem] bg-gradient-to-br from-[var(--background-secondary)] to-[var(--background)] text-center relative overflow-hidden shadow-2xl border border-[var(--primary)]/10 group"
          >
            <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-[var(--primary)]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-black mb-8 italic tracking-tighter text-[var(--foreground)]">Build the Future Together</h2>
              <p className="text-[var(--foreground)]/60 text-xl mb-14 max-w-2xl mx-auto font-medium leading-relaxed">
                I'm always looking for collaborative opportunities at the intersection of engineering and innovation.
              </p>
              <a
                href="https://www.linkedin.com/in/alishba-iqbal-a667b6263"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 px-12 py-6 bg-[var(--primary)] text-white rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-2xl"
              >
                <Linkedin className="w-6 h-6" />
                Network on LinkedIn
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
