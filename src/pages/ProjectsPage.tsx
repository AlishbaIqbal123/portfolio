import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Folder, Smartphone, Monitor, Layout, ArrowRight, Box, Terminal } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { projectsData as staticProjects } from '@/data/projects';
import { QuickAdmin } from '@/components/QuickAdmin';
import { getProjects } from '@/lib/api';
import { SafeImage } from '@/components/ui/SafeImage';
import { BorderGlow } from '@/components/effects/BorderGlow';

type Category = 'all' | 'mobile' | 'web' | 'desktop';

const categories: { id: Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'desktop', label: 'Desktop' },
];

/* ── Light Mode Card: horizontal, editorial ── */
function SilkProjectCard({ project, index }: { project: any; index: number }) {
  const navigate = useNavigate();
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={() => navigate(`/projects/${project.id}`)}
      className="cursor-pointer group"
    >
      <BorderGlow
        borderRadius={32}
        glowRadius={40}
        glowIntensity={0.8}
        glowColor="345 80% 30%" // Burgundy
        colors={['#7d0d1b', '#a90519', '#ff102a']}
        backgroundColor="hsl(var(--card))"
      >
        <motion.div 
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="silk-card flex flex-col md:flex-row gap-6 p-0 overflow-hidden border-0 bg-white/40 backdrop-blur-md shadow-none h-full"
        >
          <div className={`overflow-hidden bg-muted ${
            project.category === 'mobile' 
              ? 'md:w-36 aspect-[3/4]' 
              : 'md:w-1/4 aspect-video md:aspect-auto'
          }`}>
            <SafeImage
              src={project.image || `https://source.unsplash.com/featured/?${encodeURIComponent(project.title)},tech`}
              alt={project.title}
              className={`w-full h-full transition-transform duration-1000 group-hover:scale-110 ${
                project.category === 'mobile' ? 'object-contain bg-muted p-2' : 'object-cover'
              }`}
            />
          </div>
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs text-primary font-medium uppercase tracking-wider">{project.category}</span>
              <h3 className="text-xl font-bold tracking-tight mt-1 mb-2 text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {project.description || "A professional project built with modern tools."}
              </p>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
              <div className="flex flex-wrap gap-2">
                {(project.tags || []).slice(0, 3).map((tag: string) => (
                  <span key={tag} className="text-[10px] text-muted-foreground bg-muted px-2 py-1 rounded-md font-medium group-hover:bg-primary/5 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
              <motion.div 
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="w-5 h-5 text-primary" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </BorderGlow>
    </motion.div>
  );
}

/* ── Dark Mode Card: vertical grid, architectural ── */
function ArchitectProjectCard({ project, index }: { project: any; index: number }) {
  const navigate = useNavigate();
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      onClick={() => navigate(`/projects/${project.id}`)}
      className="cursor-pointer group"
    >
      <BorderGlow
        borderRadius={16}
        glowRadius={40}
        glowIntensity={1.0}
        glowColor="45 100% 60%" // Golden/Amber Primary
        colors={['#facc15', '#fbbf24', '#f59e0b']}
        edgeSensitivity={40}
      >
        <div className="architect-card flex flex-col gap-0 p-0 overflow-hidden border-0 bg-transparent shadow-none w-full sm:w-[360px] h-full">
          <div className={`overflow-hidden bg-secondary h-[240px]`}>
            <SafeImage
              src={project.image || `https://source.unsplash.com/featured/?${encodeURIComponent(project.title)},tech`}
              alt={project.title}
              className={`w-full h-full brightness-80 group-hover:brightness-100 transition-all duration-700 group-hover:scale-105 ${
                project.category === 'mobile' ? 'object-contain p-2' : 'object-cover'
              }`}
            />
          </div>
          <div className="p-6 flex flex-col">
            <span className="text-xs text-primary font-medium uppercase tracking-wider mb-1">{project.category}</span>
            <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
              {project.description || "A professional project built with modern tools."}
            </p>
            <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {(project.tags || []).slice(0, 2).map((tag: string) => (
                  <span key={tag} className="text-[10px] text-muted-foreground font-medium">#{tag}</span>
                ))}
              </div>
              <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </BorderGlow>
    </motion.div>
  );
}

export function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [projects, setProjects] = useState<any[]>(staticProjects);
  const { isDark } = useTheme();

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getProjects();
        if (data && Array.isArray(data) && data.length > 0) {
          const normalized = data.map(p => ({
            ...p,
            id: p.id || Math.random().toString(),
            title: p.title || 'Untitled Project',
            category: (p.category || 'all').toLowerCase(),
            tags: Array.isArray(p.tech_stack) ? p.tech_stack : (p.tech_stack?.split(',') || p.tags || [])
          }));
          setProjects(normalized);
        }
      } catch (err) { console.error(err); }
    }
    loadData();
  }, []);

  const filteredProjects = projects.filter(p => activeCategory === 'all' || p.category === activeCategory);

  return (
    <div className="relative min-h-screen bg-transparent transition-colors duration-500">
      
      {/* Header */}
      <section className="pt-24 pb-8 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          {!isDark ? (
            <div className="space-y-3">
              <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">Portfolio</p>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">Projects</h1>
              <p className="text-muted-foreground max-w-lg">
                A curated collection of software solutions and digital experiences.
              </p>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase mb-3">Workspace</p>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">Projects</h1>
              <p className="text-muted-foreground mt-3 max-w-md mx-auto">
                Browse through my technical work and open-source contributions.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 px-6 md:px-16 lg:px-24 sticky top-16 z-50">
        <div className="max-w-6xl mx-auto flex justify-center">
          <div className={`
            inline-flex gap-1 p-1 backdrop-blur-xl border transition-all
            ${isDark ? 'bg-card/80 border-border rounded-lg' : 'bg-white/80 border-border rounded-full'}
          `}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  px-5 py-2 text-xs font-medium tracking-wider uppercase transition-all
                  ${isDark ? 'rounded-md' : 'rounded-full'}
                  ${activeCategory === cat.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Project Grid — Different layouts per theme */}
      <section className="pb-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          {!isDark ? (
            /* Light: Stacked horizontal cards */
            <motion.div layout className="flex flex-col gap-5">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((p, idx) => (
                  <SilkProjectCard key={p.id} project={p} index={idx} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Dark: Centered flex grid */
            <motion.div layout className="flex flex-wrap justify-center items-start gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((p, idx) => (
                  <ArchitectProjectCard key={p.id} project={p} index={idx} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* GitHub CTA */}
          <div className={`mt-16 p-10 md:p-16 text-center ${isDark ? 'architect-card' : 'silk-card bg-card/80 backdrop-blur-sm'}`}>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 text-foreground">Open Source</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              View source code and documentation on GitHub.
            </p>
            <a 
              href="https://github.com/AlishbaIqbal123" target="_blank" rel="noopener noreferrer"
              className="imperial-btn"
            >
              Visit GitHub <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <QuickAdmin tab="projects" />
    </div>
  );
}
