import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Folder, Smartphone, Monitor, Layout, Star, Code2, ArrowRight } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { projectsData } from '@/data/projects';
import PixelTransition from '@/components/PixelTransition/PixelTransition';
import ShapeBlur from '@/components/ShapeBlur/ShapeBlur';
import PixelCard from '@/components/PixelCard/PixelCard';

type Category = 'all' | 'mobile' | 'web' | 'desktop';

const categories: { id: Category; label: string; icon: typeof Folder }[] = [
  { id: 'all', label: 'All Projects', icon: Folder },
  { id: 'web', label: 'Web Apps', icon: Layout },
  { id: 'mobile', label: 'Mobile Apps', icon: Smartphone },
  { id: 'desktop', label: 'Desktop', icon: Monitor },
];

const categoryColors: Record<Category, string> = {
  all: 'bg-[var(--primary)]',
  web: 'bg-blue-600',
  mobile: 'bg-indigo-600',
  desktop: 'bg-slate-700',
};

function ProjectCard({ project, index }: { project: (typeof projectsData)[0]; index: number }) {
  const { isDark } = useTheme();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-full"
    >
      <PixelCard
        className="h-full flex flex-col"
        variant="default"
        gap={6}
        speed={40}
        colors={isDark ? '#748CAB,#3E5C76,#1D2D44' : '#1D2D44,#3E5C76,#748CAB'}
      >
        <div className="flex flex-col h-full bg-[var(--card)]/40 backdrop-blur-sm border border-white/5 group-hover:border-[var(--primary)]/30 transition-colors duration-500 overflow-hidden">
          {/* Image Container with Pixel Transition */}
          <div className="relative h-64 overflow-hidden border-b border-white/5">
            <PixelTransition
              firstContent={
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                />
              }
              secondContent={
                <div className="w-full h-full relative overflow-hidden bg-[var(--primary)]/10">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60"
                  />
                  {/* Shape Blur Overlay on second content */}
                  <div className="absolute inset-0 z-10">
                    <ShapeBlur
                      variation={0}
                      shapeSize={1.5}
                      roundness={0.5}
                      borderSize={0.05}
                      circleSize={0.4}
                      circleEdge={0.6}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center gap-6 z-20">
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[var(--oxford-blue)] shadow-xl"
                      >
                        <Github className="w-7 h-7" />
                      </motion.a>
                    )}
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-14 h-14 rounded-full bg-[var(--primary)] flex items-center justify-center text-[var(--oxford-blue)] shadow-xl"
                      >
                        <ExternalLink className="w-7 h-7" />
                      </motion.a>
                    )}
                  </div>
                </div>
              }
              gridSize={12}
              pixelColor={isDark ? '#748CAB' : '#1D2D44'}
              animationStepDuration={0.4}
              className="w-full h-full"
              aspectRatio="0"
            />

            {/* Static Badges (Always Visible) */}
            <div className="absolute top-4 left-4 z-30 pointer-events-none">
              <span
                className={`px-3 py-1 text-[10px] font-bold rounded-full ${categoryColors[project.category]} text-white uppercase tracking-widest backdrop-blur-md bg-opacity-80`}
              >
                {project.category}
              </span>
            </div>

            {project.featured && (
              <div className="absolute top-4 right-4 z-30 pointer-events-none">
                <span className="flex items-center gap-1 px-3 py-1 text-[10px] font-bold rounded-full bg-[var(--primary)] text-white uppercase tracking-widest backdrop-blur-md bg-opacity-80">
                  <Star className="w-3 h-3" />
                  Featured
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-8 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-black mb-3 group-hover:text-[var(--primary)] transition-colors tracking-tight">
                {project.title}
              </h3>

              <p className="text-[var(--muted-foreground)] text-sm leading-relaxed mb-6 font-medium line-clamp-3">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-[10px] font-bold rounded-md bg-[var(--muted)]/30 text-[var(--foreground)]/80 uppercase tracking-widest border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links Footer */}
            <div className="flex items-center gap-6 pt-6 border-t border-white/5">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-bold text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors group/link"
                >
                  <Github className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                  Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-bold text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors group/link"
                >
                  <ExternalLink className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </PixelCard>
    </motion.div>
  );
}

export function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const filteredProjects =
    activeCategory === 'all'
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  const featuredProjects = projectsData.filter((p) => p.featured);

  return (
    <div className="relative overflow-hidden min-h-screen">
      <section className="section-padding pt-32 lg:pt-48 pb-20">
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex mb-8"
            >
              <div className="flex items-center gap-2 px-6 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-black uppercase tracking-[0.2em] border border-[var(--primary)]/20 shadow-sm backdrop-blur-md">
                <Code2 className="w-4 h-4" />
                Portfolio
              </div>
            </motion.div>

            <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter italic">
              Selected{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[#A0B2C6]">
                Projects
              </span>
            </h1>

            <p className="text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto font-medium leading-relaxed">
              A curated showcase of engineering challenges, from architectural design to full-stack implementation.
            </p>
          </motion.div>

          {/* Featured Section */}
          <AnimatePresence mode="wait">
            {activeCategory === 'all' && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.8 }}
                className="mb-24"
              >
                <div className="flex items-center justify-between mb-12">
                  <h2 className="text-4xl font-black flex items-center gap-4 italic">
                    <Star className="w-10 h-10 text-[var(--primary)]" />
                    Spotlight
                  </h2>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-[var(--primary)]/30 to-transparent ml-8 hidden md:block" />
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  {featuredProjects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filter Navigation */}
          <div className="sticky top-24 z-40 py-8 mb-16 backdrop-blur-xl bg-[var(--background)]/30 border-y border-white/5 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-3 px-8 py-3 rounded-xl font-black text-xs tracking-widest uppercase transition-all duration-300 ${activeCategory === category.id
                      ? 'bg-[var(--primary)] text-white shadow-2xl shadow-[var(--primary)]/20'
                      : 'bg-[var(--card)]/50 text-[var(--foreground)]/70 border border-white/5 hover:border-[var(--primary)]/50'
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    {category.label}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Projects Masonry-like Grid */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* GitHub CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-40 p-16 rounded-[4rem] bg-gradient-to-br from-[var(--background-secondary)] to-[var(--background)] text-[var(--foreground)] text-center shadow-2xl border border-[var(--primary)]/10 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-[var(--primary)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-5xl md:text-6xl font-black mb-8 italic tracking-tighter">Beyond the Portfolio</h2>
              <p className="text-[var(--foreground)]/80 text-xl mb-14 max-w-2xl mx-auto font-bold leading-relaxed">
                Explore a deeper look into my development process, experimental scripts, and open-source contributions on GitHub.
              </p>
              <a
                href="https://github.com/AlishbaIqbal123"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 px-12 py-6 bg-[var(--primary)] text-white rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-2xl"
              >
                <Github className="w-6 h-6" />
                Explore Repositories
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
