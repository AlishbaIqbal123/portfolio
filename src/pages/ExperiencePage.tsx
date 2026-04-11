import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, MapPin, ArrowRight, Building2, Zap, Terminal } from 'lucide-react';
import { getExperience } from '@/lib/api';
import { useTheme } from '@/hooks/useTheme';

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  type: 'internship' | 'simulation' | 'work';
  description: string;
  points: string[];
  link?: string;
}

const staticExperiences: ExperienceItem[] = [
  {
    id: 'tkxel',
    role: 'Frontend Development Intern (React)',
    company: 'TKXEL',
    location: 'Lahore, Pakistan',
    duration: 'August 2025',
    type: 'internship',
    description: 'Developing interactive and reusable user interfaces using React and modern frontend practices. Implementing responsive designs with HTML, CSS, and Tailwind CSS. Collaborating in a professional development environment using Git-based workflows.',
    points: ['React', 'Tailwind CSS', 'Git', 'Responsive Design'],
  },
];

/* ── Light Mode: Editorial timeline card ── */
function SilkTimelineCard({ item, index }: { item: ExperienceItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.1 });
  const descriptionPoints = typeof item.description === 'string' 
    ? item.description.split('\n').filter(Boolean) 
    : Array.isArray(item.description) ? item.description : [];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
      animate={isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
      className="group flex gap-6 mb-8"
    >
      {/* Timeline dot */}
      <div className="flex flex-col items-center pt-2">
        <div className="w-3 h-3 rounded-full bg-primary shrink-0" />
        <div className="flex-1 w-px bg-border mt-2" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <div className="silk-card">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs text-primary font-medium">{item.duration}</span>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground">{item.type}</span>
          </div>
          <h3 className="text-xl font-bold tracking-tight mb-1 text-foreground">{item.role}</h3>
          <p className="text-sm text-muted-foreground mb-4">{item.company} — {item.location}</p>
          <ul className="space-y-2 mb-6">
            {descriptionPoints.map((desc, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                <span className="text-sm text-muted-foreground leading-relaxed">{desc}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {(item.points || []).map((skill) => (
              <span key={skill} className="text-[10px] font-medium text-primary bg-primary/5 border border-primary/10 px-3 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Dark Mode: Grid card ── */
function ArchitectExpCard({ item, index }: { item: ExperienceItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.1 });
  const descriptionPoints = typeof item.description === 'string' 
    ? item.description.split('\n').filter(Boolean) 
    : Array.isArray(item.description) ? item.description : [];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        type: "spring",
        stiffness: 200, 
        damping: 20, 
        delay: index * 0.1 
      }}
      className="architect-card flex flex-col h-full group"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xs text-primary font-medium">{item.duration}</span>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">{item.role}</h3>
      <p className="text-sm text-muted-foreground mb-6">{item.company} — {item.location}</p>

      <div className="space-y-3 mb-6 flex-1">
        {descriptionPoints.slice(0, 3).map((desc, i) => (
          <div key={i} className="flex gap-3 items-start">
            <div className="w-1 h-1 bg-primary mt-2 shrink-0" />
            <span className="text-sm text-muted-foreground leading-relaxed">{desc}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
        {(item.points || []).map(s => (
          <span key={s} className="text-[10px] font-medium text-primary bg-primary/5 px-3 py-1 rounded-md">{s}</span>
        ))}
      </div>
    </motion.div>
  );
}

export function ExperiencePage() {
  const { isDark } = useTheme();
  const [exps, setExps] = useState<ExperienceItem[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getExperience();
        if (data && data.length > 0) {
          setExps(data.map((exp: any) => ({
            ...exp,
            role: exp.role || exp.title || '',
            duration: exp.duration || exp.date || '',
            points: Array.isArray(exp.points) ? exp.points : (Array.isArray(exp.skills) ? exp.skills : []),
            description: typeof exp.description === 'string' ? exp.description : (Array.isArray(exp.description) ? exp.description.join('\n') : '')
          })));
        } else {
          setExps(staticExperiences);
        }
      } catch (err) { 
        console.error(err);
        setExps(staticExperiences);
      }
    }
    loadData();
  }, []);

  return (
    <div className="relative min-h-screen bg-transparent transition-colors duration-500">
      
      {/* Header */}
      <section className="pt-24 pb-8 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          {!isDark ? (
            <div className="space-y-3">
              <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">Career</p>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground text-reveal">Experience</h1>
              <p className="text-muted-foreground max-w-lg">
                Professional milestones and engineering growth.
              </p>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase mb-3">Portfolio</p>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground text-reveal">Experience</h1>
              <p className="text-muted-foreground mt-3 max-w-md mx-auto">
                My professional journey and key contributions.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-4">
          {[
            { label: 'Internships', val: '2+' },
            { label: 'Projects', val: '12+' },
            { label: 'Collaborations', val: '15+' }
          ].map((s, i) => (
            <div key={i} className={`p-6 text-center floating-delayed ${isDark ? 'architect-card' : 'silk-card bg-card/80 backdrop-blur-sm'}`}>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider block mb-2">{s.label}</span>
              <div className="text-3xl font-bold text-primary">{s.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline/Grid */}
      <section className="py-12 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          {!isDark ? (
            /* Light: Vertical timeline */
            <div className="max-w-3xl mx-auto">
              {exps.map((item, index) => (
                <SilkTimelineCard key={item.id} item={item} index={index} />
              ))}
            </div>
          ) : (
            /* Dark: Grid cards */
            <div className="grid md:grid-cols-2 gap-4">
              {exps.map((item, index) => (
                <ArchitectExpCard key={item.id} item={item} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 md:px-16 lg:px-24">
        <div className={`max-w-4xl mx-auto p-10 md:p-16 text-center ${isDark ? 'architect-card' : 'silk-card bg-card/80 backdrop-blur-sm'}`}>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 text-foreground">Let's Connect</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Always open to new opportunities and creative partnerships.
          </p>
          <a 
            href="https://www.linkedin.com/in/alishba-iqbal-a667b6263" target="_blank" rel="noopener noreferrer"
            className="imperial-btn"
          >
            LinkedIn <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
