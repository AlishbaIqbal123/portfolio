import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Folder, Smartphone, Monitor, Layout, Loader2 } from 'lucide-react';
import { projectsData } from '@/data/projects';
import { useTheme } from '@/hooks/useTheme';
import { getProjects } from '@/lib/api';
import { Link } from 'react-router-dom';
import { SafeImage } from '@/components/ui/SafeImage';

type Category = 'all' | 'mobile' | 'web' | 'desktop';

const categories: { id: Category; label: string; icon: typeof Folder }[] = [
  { id: 'all', label: 'All Projects', icon: Folder },
  { id: 'web', label: 'Web', icon: Layout },
  { id: 'mobile', label: 'Mobile', icon: Smartphone },
  { id: 'desktop', label: 'Desktop', icon: Monitor },
];

function ProjectCard({
  project,
  index,
  isDark
}: {
  project: any;
  index: number;
  isDark: boolean;
}) {
  // Handle field name differences between DB and static data
  const github = project.github_link || project.githubUrl;
  const live = project.deployed_link || project.liveUrl;
  const stack = project.tech_stack || project.tags || [];
  const hasVideo = !!project.video_url;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative w-full sm:w-[380px] shrink-0"
    >
      <div className={`monolith-card flex flex-col h-auto ${!isDark ? 'rounded-2xl' : 'rounded-none'}`}>
        {/* Project Visual */}
        <div className={`relative overflow-hidden mb-6 ${!isDark ? 'rounded-xl h-64' : 'rounded-lg min-h-[160px]'}`}>
          <SafeImage
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          
          {hasVideo && (
            <div className="absolute top-4 right-4 z-10">
              <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
                <PlayCircle className="w-3 h-3 text-primary animate-pulse" />
                <span className="text-[8px] font-black text-white uppercase tracking-widest">Demo</span>
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
             {github && (
                <a href={github} target="_blank" rel="noreferrer" className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center rounded-full hover:scale-110 transition-transform">
                   <Github className="w-5 h-5" />
                </a>
             )}
             {live && (
                <a href={live} target="_blank" rel="noreferrer" className="w-12 h-12 bg-white text-primary flex items-center justify-center rounded-full hover:scale-110 transition-transform">
                   <ExternalLink className="w-5 h-5" />
                </a>
             )}
             <Link 
                to={`/projects/${project.id}`} 
                className="w-12 h-12 bg-primary/20 backdrop-blur-md text-white border border-white/20 flex items-center justify-center rounded-full hover:scale-110 transition-transform"
             >
                <Layout className="w-5 h-5" />
             </Link>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
             <span className="text-[10px] font-black tracking-widest text-primary/60 uppercase italic">{project.category}</span>
             {project.featured && <span className="text-[8px] font-black px-2 py-1 bg-primary/10 text-primary border border-primary/20 uppercase tracking-widest">FEATURED</span>}
          </div>
          <Link to={`/projects/${project.id}`}>
            <h3 className={`text-2xl md:text-3xl font-black uppercase text-foreground leading-none transition-colors hover:text-primary ${!isDark ? 'heading-silk' : 'heading-cyber'}`}>
              {project.title}
            </h3>
          </Link>
          <p className="text-sm opacity-60 leading-relaxed font-medium line-clamp-3">
             {project.description}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
             {stack.map((tag: string) => (
                <span key={tag} className="text-[9px] font-bold opacity-40 px-2 py-0.5 border border-foreground/10 uppercase tracking-tighter">#{tag}</span>
             ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const { isDark } = useTheme();
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        if (data && data.length > 0) {
          setProjects(data);
        } else {
          setProjects(projectsData);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setProjects(projectsData);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding bg-background relative overflow-hidden transition-all duration-1000"
    >
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="text-primary text-[10px] font-black tracking-[0.8em] uppercase italic mb-4 block">
            SELECTED PROJECTS
          </span>

          <h2 className={`text-6xl md:text-9xl font-black text-foreground uppercase mb-6 ${!isDark ? 'heading-silk' : 'heading-cyber'}`}>
            Portfolio
          </h2>

          <p className="text-foreground/40 max-w-2xl mx-auto uppercase text-[11px] font-black tracking-[0.3em] italic">
             Transforming complex logic into high-end digital experiences.
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
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                    : 'bg-primary/5 text-foreground/40 border border-primary/10 hover:border-primary/40 hover:text-foreground'
                }`}
              >
                <Icon className="w-3 h-3" />
                {category.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Projects Display */}
        {loading ? (
            <div className="flex flex-col items-center justify-center py-32 opacity-20">
                <Loader2 className="w-10 h-10 animate-spin mb-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em]">Syncing Vault...</span>
            </div>
        ) : (
          <motion.div 
             layout 
             className="flex flex-wrap justify-center items-start gap-8 w-full max-w-7xl mx-auto"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} isDark={isDark} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* View More on GitHub */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-20"
          >
            <motion.a
              href="https://github.com/AlishbaIqbal123"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="imperial-btn mx-auto shrink-0"
            >
              VIEW MORE
            </motion.a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
