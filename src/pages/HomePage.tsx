import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Code2, Sparkles, User, Briefcase } from 'lucide-react';
import { personalData } from '@/data/personal';
import MagicBento from '@/components/MagicBento/MagicBento';

// Animated text component
function AnimatedText({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {text}
    </motion.span>
  );
}

export function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);


  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Main Content */}
        <motion.div
          className="relative z-10 container-custom text-center"
          style={{ y: textY, opacity }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex mb-8"
          >
            <div className="flex items-center gap-2 px-6 py-2 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/30 backdrop-blur-md shadow-sm">
              <Sparkles className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-sm font-bold text-[var(--primary)] uppercase tracking-widest">
                Software Engineering Student
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-black mb-8 tracking-tighter italic">
            <div className="overflow-hidden">
              <AnimatedText text="ALISHBA" delay={0.3} className="block leading-[0.8]" />
            </div>
            <div className="overflow-hidden">
              <AnimatedText
                text="IQBAL"
                delay={0.5}
                className="block text-[var(--primary)] leading-[0.8]"
              />
            </div>
          </h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl md:text-2xl text-[var(--muted-foreground)] max-w-2xl mx-auto mb-14 font-medium"
          >
            A dedicated software engineer crafting refined digital experiences through elegant code and architectural precision.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link
              to="/projects"
              className="group relative px-10 py-5 bg-[var(--primary)] text-[var(--oxford-blue)] rounded-2xl font-black text-lg transition-all duration-300 hover:scale-105 shadow-xl shadow-[var(--primary)]/20"
            >
              <span className="relative z-10 flex items-center gap-3 uppercase tracking-wider">
                Explore Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <a
              href="/cv/CV-Alishba.pdf"
              download
              className="group px-10 py-5 border-2 border-[var(--primary)]/30 text-[var(--primary)] rounded-2xl font-black text-lg bg-background/20 backdrop-blur-sm hover:bg-[var(--primary)] hover:text-[var(--oxford-blue)] transition-all duration-300 flex items-center gap-3 uppercase tracking-wider"
            >
              <Download className="w-5 h-5" />
              Download CV
            </a>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-wrap justify-center gap-12 md:gap-24 mt-24"
          >
            {[
              { value: personalData.stats.cgpa.split('/')[0], label: 'CGPA', suffix: `/${personalData.stats.cgpa.split('/')[1]}` },
              { value: `${personalData.stats.projects}+`, label: 'Projects' },
              { value: `${personalData.stats.internships}+`, label: 'Internships' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-black text-[var(--primary)] tracking-tighter">
                  {stat.value}
                  {stat.suffix && <span className="text-3xl opacity-50">{stat.suffix}</span>}
                </div>
                <div className="text-xs text-[var(--muted-foreground)] mt-2 uppercase tracking-[0.3em] font-black">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-px h-24 bg-gradient-to-b from-[var(--primary)] to-transparent opacity-50 relative">
            <motion.div
              animate={{ top: ['0%', '80%', '0%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--primary)] shadow-[0_0_10px_var(--primary)]"
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Services Section (Magic Bento) */}
      <section className="section-padding relative overflow-hidden bg-[var(--oxford-blue)]/30 border-y border-white/5">
        <div className="container-custom relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black mb-6 italic tracking-tighter">Professional Focus</h2>
            <p className="text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto font-medium">
              A precise breakdown of my core competencies and specialized areas in the software engineering landscape.
            </p>
          </div>
          <MagicBento
            glowColor="116, 140, 171"
            enableBorderGlow={true}
            enableStars={true}
          />
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-6 italic tracking-tighter">Navigate</h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { title: 'About', desc: 'Expertise & Background', link: '/about', icon: <User className="w-8 h-8" /> },
              { title: 'Skills', desc: 'Tech Stack & Arsenal', link: '/skills', icon: <Sparkles className="w-8 h-8" /> },
              { title: 'Projects', desc: 'Impactful Engineering', link: '/projects', icon: <Code2 className="w-8 h-8" /> },
              { title: 'Timeline', desc: 'Milestones & Growth', link: '/experience', icon: <Briefcase className="w-8 h-8" /> },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={item.link}
                  className="group block p-10 rounded-[2.5rem] bg-[var(--card)]/30 border border-white/5 backdrop-blur-md hover:border-[var(--primary)] hover:bg-[var(--card)]/50 transition-all duration-500 h-full relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-6 h-6 text-[var(--primary)] -rotate-45" />
                  </div>

                  <div className="mb-8 text-[var(--primary)] group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                  <h3 className="text-3xl font-black mb-3 group-hover:text-[var(--primary)] transition-colors italic tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[var(--muted-foreground)] font-medium text-sm">{item.desc}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
