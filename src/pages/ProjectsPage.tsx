import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search, X, SlidersHorizontal, ExternalLink } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { projectsData as staticProjects } from '@/data/projects';
import { QuickAdmin } from '@/components/QuickAdmin';
import { getProjects } from '@/lib/api';
import { SafeImage } from '@/components/ui/SafeImage';
import { BorderGlow } from '@/components/effects/BorderGlow';

type Category = 'all' | 'mobile' | 'web' | 'desktop';

const categories: { id: Category; label: string }[] = [
  { id: 'all',     label: 'All' },
  { id: 'web',     label: 'Web' },
  { id: 'mobile',  label: 'Mobile' },
  { id: 'desktop', label: 'Desktop' },
];

// Tech tag icon colors — map common techs to a color for the pill
const tagColors: Record<string, string> = {
  react:      '#61DAFB', typescript: '#3178C6', javascript: '#F7DF1E',
  nextjs:     '#ffffff',  nodejs:     '#339933', python:     '#3776AB',
  flutter:    '#02569B', dart:       '#0175C2', firebase:   '#FFCA28',
  supabase:   '#3ECF8E', postgresql: '#336791', mysql:      '#4479A1',
  mongodb:    '#47A248', tailwind:   '#06B6D4', css:        '#1572B6',
  html:       '#E34F26', figma:      '#F24E1E', java:       '#007396',
  kotlin:     '#7F52FF', swift:      '#F05138', 'c++':      '#00599C',
  'c#':       '#178600', php:        '#777BB4', vue:        '#4FC08D',
  angular:    '#DD0031', express:    '#000000', graphql:    '#E10098',
  redis:      '#DC382D', docker:     '#2496ED', git:        '#F05032',
  gsap:       '#88CE02', framer:     '#BB4B96', threejs:    '#049EF4',
  vite:       '#646CFF', prisma:     '#2D3748', vercel:     '#ffffff',
};

function getTagColor(tag: string): string {
  const key = tag.toLowerCase().replace(/\s+/g, '').replace(/\./g, '');
  return tagColors[key] || '#888888';
}

/* ── Light Mode Card: horizontal, editorial ── */
function SilkProjectCard({ project, index, activeTech }: { project: any; index: number; activeTech: string | null }) {
  const navigate = useNavigate();
  const liveLink = project.deployed_link || project.liveUrl;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      onClick={() => navigate(`/projects/${project.id}`)}
      className="cursor-pointer group"
    >
      <BorderGlow
        borderRadius={32}
        glowRadius={40}
        glowIntensity={0.8}
        glowColor="345 80% 30%"
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
                {(project.tags || []).slice(0, 5).map((tag: string) => (
                  <span
                    key={tag}
                    className={`text-[10px] px-2 py-1 rounded-md font-semibold transition-all ${
                      activeTech && tag.toLowerCase() === activeTech.toLowerCase()
                        ? 'text-white shadow-sm scale-105'
                        : 'text-muted-foreground bg-muted group-hover:bg-primary/5'
                    }`}
                    style={
                      activeTech && tag.toLowerCase() === activeTech.toLowerCase()
                        ? { backgroundColor: getTagColor(tag), color: '#fff' }
                        : {}
                    }
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                {liveLink && (
                  <a
                    href={liveLink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                    title="View Live Website"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <motion.div
                  className="flex items-center"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-5 h-5 text-primary" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </BorderGlow>
    </motion.div>
  );
}

/* ── Dark Mode Card: vertical grid, architectural ── */
function ArchitectProjectCard({ project, index, activeTech }: { project: any; index: number; activeTech: string | null }) {
  const navigate = useNavigate();
  const liveLink = project.deployed_link || project.liveUrl;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      onClick={() => navigate(`/projects/${project.id}`)}
      className="cursor-pointer group"
    >
      <BorderGlow
        borderRadius={16}
        glowRadius={40}
        glowIntensity={1.0}
        glowColor="45 100% 60%"
        colors={['#facc15', '#fbbf24', '#f59e0b']}
        edgeSensitivity={40}
      >
        <div className="architect-card flex flex-col gap-0 p-0 overflow-hidden border-0 bg-transparent shadow-none w-full sm:w-[360px] h-full">
          <div className="overflow-hidden bg-secondary h-[240px]">
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
                {(project.tags || []).slice(0, 4).map((tag: string) => (
                  <span
                    key={tag}
                    className={`text-[10px] font-semibold px-1.5 py-0.5 rounded transition-all ${
                      activeTech && tag.toLowerCase() === activeTech.toLowerCase()
                        ? 'rounded text-white'
                        : 'text-muted-foreground'
                    }`}
                    style={
                      activeTech && tag.toLowerCase() === activeTech.toLowerCase()
                        ? { backgroundColor: getTagColor(tag) }
                        : {}
                    }
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                {liveLink && (
                  <a
                    href={liveLink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    title="View Live Website"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </BorderGlow>
    </motion.div>
  );
}

export function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showTechFilter, setShowTechFilter] = useState(false);
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
            tags: Array.isArray(p.tech_stack)
              ? p.tech_stack
              : (typeof p.tech_stack === 'string' ? p.tech_stack.split(',').map((t: string) => t.trim()) : [])
          }));
          setProjects(normalized);
        }
      } catch (err) { console.error(err); }
    }
    loadData();
  }, []);

  // Build unique, sorted tech tags from all projects
  const allTechTags = useMemo(() => {
    const tagSet = new Set<string>();
    projects.forEach(p => (p.tags || []).forEach((t: string) => {
      if (t && t.trim()) tagSet.add(t.trim());
    }));
    return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
  }, [projects]);

  // Count projects per tech tag
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    projects.forEach(p => (p.tags || []).forEach((t: string) => {
      if (t) counts[t] = (counts[t] || 0) + 1;
    }));
    return counts;
  }, [projects]);

  // Sort by usage count (most used first)
  const sortedTechTags = useMemo(() =>
    [...allTechTags].sort((a, b) => (tagCounts[b] || 0) - (tagCounts[a] || 0)),
    [allTechTags, tagCounts]
  );

  // Filter projects
  const filteredProjects = useMemo(() => projects.filter(p => {
    const catMatch = activeCategory === 'all' || p.category === activeCategory;
    const techMatch = !activeTech || (p.tags || []).some((t: string) => t.toLowerCase() === activeTech.toLowerCase());
    const searchMatch = !searchQuery.trim() ||
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.tags || []).some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return catMatch && techMatch && searchMatch;
  }), [projects, activeCategory, activeTech, searchQuery]);

  const clearAllFilters = () => {
    setActiveCategory('all');
    setActiveTech(null);
    setSearchQuery('');
  };

  const hasActiveFilters = activeCategory !== 'all' || activeTech !== null || searchQuery !== '';

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

      {/* Filter Bar */}
      <section className="py-4 px-6 md:px-16 lg:px-24 sticky top-16 z-50">
        <div className="max-w-6xl mx-auto space-y-3">

          {/* Row 1: Category tabs + Search + Tech toggle */}
          <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3 backdrop-blur-xl border transition-all ${
            isDark ? 'bg-card/80 border-border rounded-xl' : 'bg-white/80 border-border rounded-2xl'
          }`}>

            {/* Category pills */}
            <div className={`inline-flex gap-1 p-1 shrink-0 ${
              isDark ? 'bg-background/40 rounded-lg' : 'bg-muted/40 rounded-full'
            }`}>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    px-4 py-1.5 text-xs font-medium tracking-wider uppercase transition-all
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

            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects or skills..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full h-9 bg-transparent pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground transition-colors" />
                </button>
              )}
            </div>

            {/* Tech filter toggle */}
            <button
              onClick={() => setShowTechFilter(v => !v)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-medium transition-all shrink-0 ${
                isDark ? 'rounded-md' : 'rounded-full'
              } ${
                showTechFilter || activeTech
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground border border-border'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Skills {activeTech ? `· ${activeTech}` : ''}
            </button>

            {/* Clear all */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1.5 px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
              >
                <X className="w-3 h-3" /> Clear
              </button>
            )}
          </div>

          {/* Row 2: Tech tag cloud (expandable) */}
          <AnimatePresence>
            {showTechFilter && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className={`p-4 backdrop-blur-xl border transition-all ${
                  isDark ? 'bg-card/80 border-border rounded-xl' : 'bg-white/80 border-border rounded-2xl'
                }`}>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest mb-3">
                    Filter by Language / Skill
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {sortedTechTags.map(tag => {
                      const isActive = activeTech?.toLowerCase() === tag.toLowerCase();
                      const color = getTagColor(tag);
                      return (
                        <motion.button
                          key={tag}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setActiveTech(isActive ? null : tag)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition-all border ${
                            isDark ? 'rounded-md' : 'rounded-full'
                          } ${
                            isActive
                              ? 'text-white border-transparent shadow-md'
                              : 'text-muted-foreground border-border hover:border-primary/40 hover:text-foreground bg-transparent'
                          }`}
                          style={isActive ? { backgroundColor: color } : {}}
                        >
                          {/* Color dot */}
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: isActive ? 'rgba(255,255,255,0.7)' : color }}
                          />
                          {tag}
                          <span className={`text-[9px] ml-0.5 ${isActive ? 'text-white/70' : 'text-muted-foreground/60'}`}>
                            {tagCounts[tag] || 0}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active filter summary */}
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 px-1"
            >
              <span className="text-xs text-muted-foreground">
                Showing <span className="text-foreground font-semibold">{filteredProjects.length}</span> of {projects.length} projects
              </span>
              {activeTech && (
                <span
                  className="flex items-center gap-1 text-[10px] font-semibold text-white px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: getTagColor(activeTech) }}
                >
                  {activeTech}
                  <button onClick={() => setActiveTech(null)}>
                    <X className="w-2.5 h-2.5" />
                  </button>
                </span>
              )}
              {activeCategory !== 'all' && (
                <span className="flex items-center gap-1 text-[10px] font-semibold bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                  {activeCategory}
                  <button onClick={() => setActiveCategory('all')}>
                    <X className="w-2.5 h-2.5" />
                  </button>
                </span>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Grid */}
      <section className="pb-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center"
            >
              <p className="text-4xl mb-4">🔍</p>
              <h3 className="text-lg font-bold text-foreground mb-2">No projects found</h3>
              <p className="text-sm text-muted-foreground mb-6">Try adjusting your filters or search query.</p>
              <button onClick={clearAllFilters} className="imperial-btn text-xs">
                Clear Filters
              </button>
            </motion.div>
          ) : !isDark ? (
            /* Light: Stacked horizontal cards */
            <motion.div layout className="flex flex-col gap-5">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((p, idx) => (
                  <SilkProjectCard key={p.id} project={p} index={idx} activeTech={activeTech} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Dark: Centered flex grid */
            <motion.div layout className="flex flex-wrap justify-center items-start gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((p, idx) => (
                  <ArchitectProjectCard key={p.id} project={p} index={idx} activeTech={activeTech} />
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
