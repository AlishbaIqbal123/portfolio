import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Folder, Smartphone, Monitor, Layout } from 'lucide-react';
import { projectsData } from '@/data/projects';

type Category = 'all' | 'mobile' | 'web' | 'desktop';

const categories: { id: Category; label: string; icon: typeof Folder }[] = [
  { id: 'all', label: 'All Projects', icon: Folder },
  { id: 'web', label: 'Web', icon: Layout },
  { id: 'mobile', label: 'Mobile', icon: Smartphone },
  { id: 'desktop', label: 'Desktop', icon: Monitor },
];

const categoryColors: Record<Category, string> = {
  all: 'bg-[#e1bb80]',
  web: 'bg-blue-500',
  mobile: 'bg-green-500',
  desktop: 'bg-purple-500',
};

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projectsData)[0];
  index: number;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#806443]/20 to-[#685634]/10 border border-[#7b6b43]/50 hover:border-[#e1bb80]/50 transition-all duration-300 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#352208] via-transparent to-transparent opacity-60" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${categoryColors[project.category]} text-white capitalize`}
            >
              {project.category}
            </span>
          </div>

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#e1bb80] text-[#352208]">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-white font-['Playfair_Display'] mb-2 group-hover:text-[#e1bb80] transition-colors duration-300">
            {project.title}
          </h3>

          <p className="text-white/60 text-sm leading-relaxed mb-4 flex-1">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs bg-[#352208]/50 border border-[#7b6b43]/50 rounded text-white/70"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="px-2 py-1 text-xs text-white/50">
                +{project.tech.length - 3}
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 pt-4 border-t border-[#7b6b43]/30">
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-white/60 hover:text-[#e1bb80] transition-colors duration-300"
              >
                <Github className="w-5 h-5" />
                <span className="text-sm">Code</span>
              </motion.a>
            )}
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-white/60 hover:text-[#e1bb80] transition-colors duration-300"
              >
                <ExternalLink className="w-5 h-5" />
                <span className="text-sm">Live</span>
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const filteredProjects =
    activeCategory === 'all'
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding bg-[#352208] relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(45deg, #e1bb80 25%, transparent 25%), linear-gradient(-45deg, #e1bb80 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e1bb80 75%), linear-gradient(-45deg, transparent 75%, #e1bb80 75%)`,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          {/* Section Label */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#e1bb80]" />
            <span className="text-[#e1bb80] text-sm font-medium tracking-wider uppercase">
              Portfolio
            </span>
            <div className="h-px w-12 bg-[#e1bb80]" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-white font-['Playfair_Display'] mb-4">
            Featured <span className="text-[#e1bb80]">Projects</span>
          </h2>

          {/* Description */}
          <p className="text-white/60 max-w-2xl mx-auto">
            A collection of projects showcasing my skills in web development, mobile apps, and software engineering.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-[#e1bb80] text-[#352208]'
                    : 'bg-[#806443]/20 text-white/70 border border-[#7b6b43]/50 hover:border-[#e1bb80]/50 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More on GitHub */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/AlishbaIqbal123"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#e1bb80] text-[#e1bb80] rounded-lg font-medium hover:bg-[#e1bb80]/10 transition-colors duration-300"
          >
            <Github className="w-5 h-5" />
            View More on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
