import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
    ArrowRight, Code2, Briefcase, Zap, 
    Heart, Rocket, Shield, Layers, ShieldCheck, 
    Terminal, Star, MapPin
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useTheme } from '@/hooks/useTheme';
import { getPersonalInfo, getProjects, getExperience } from '@/lib/api';
import { personalData as staticPersonal } from '@/data/personal';
import { QuickAdmin } from '@/components/QuickAdmin';
import { SafeImage } from '@/components/ui/SafeImage';
import { ScrollVelocity } from '@/components/effects/ScrollVelocity';
import { BorderGlow } from '@/components/effects/BorderGlow';

/* ── Shared Data ── */
const interests = [
  { icon: Shield, title: 'Backend Systems', desc: 'Building reliable server-side logic and scalable cloud infrastructure.' },
  { icon: Layers, title: 'UI Engineering', desc: 'Crafting beautiful, responsive interfaces that delight users.' },
  { icon: Zap, title: 'AI & Automation', desc: 'Implementing smart solutions that streamline complex workflows.' },
  { icon: ShieldCheck, title: 'Security', desc: 'Ensuring privacy, data integrity, and secure user experiences.' },
  { icon: Heart, title: 'Accessible Design', desc: 'Building inclusive technology that empowers everyone.' },
  { icon: Rocket, title: 'Innovation', desc: 'Pushing the boundaries of modern software engineering.' },
];

export function HomePage() {
  const { isDark } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState({ cgpa: '3.5+', projects: '12+', experience: '3+', focus: 'Full Stack' });
  const [personal, setPersonal] = useState<any>(staticPersonal);

  useEffect(() => {
    async function loadData() {
      try {
        const [info, prjs, exps, settings] = await Promise.all([
          getPersonalInfo(), 
          getProjects(), 
          getExperience(),
          supabase.from('admin_settings').select('*')
        ]);

        const focusVal = settings.data?.find((s: any) => s.key === 'tagline' || s.key === 'site_focus')?.value || 'Full Stack';
        
        if (info) {
          setPersonal(info);
          setStats({
            internships: (exps?.filter((e: any) => e.role?.toLowerCase().includes('intern'))?.length || 2) + '+',
            projects: (prjs?.length || 12) + '+',
            experience: (exps?.length || 3) + '+',
            focus: focusVal
          });
        }
      } catch (err) { console.error(err); }
    }
    loadData();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-transparent overflow-x-hidden transition-colors duration-500">
      
      {/* ═══════════════════════════════════════════
          LIGHT MODE: "Silk Editorial"
          Horizontal layouts, magazine grids, warm tones
          ═══════════════════════════════════════════ */}
      {!isDark && (
        <div className="flex flex-col">

          {/* Hero — Editorial two-column with photo */}
          <section className="pt-24 pb-16 px-6 md:px-16 lg:px-24">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Text side */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="space-y-8 order-2 lg:order-1"
              >
                <div className="space-y-3">
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xs font-medium tracking-[0.2em] text-primary uppercase"
                  >{personal.title || 'Software Engineer'}</motion.p>
                  
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] text-foreground">
                    {(personal.name?.split(' ')[0] || 'Alishba').split('').map((char: string, i: number) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                        transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                    <br/>
                    <span className="text-primary">
                      {(personal.name?.split(' ')[1] || 'Iqbal').split('').map((char: string, i: number) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                          transition={{ delay: 0.8 + i * 0.05, duration: 0.5 }}
                          className="inline-block"
                        >
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  </h1>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                  {personal.tagline || 'Building elegant digital experiences with modern engineering principles.'}
                </p>

                <div className="flex gap-4 items-center">
                  <Link to="/projects" className="imperial-btn">
                    View Projects <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to="/contact" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    Get in touch →
                  </Link>
                </div>
              </motion.div>

              {/* Photo side */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="order-1 lg:order-2 flex justify-center lg:justify-end"
              >
                <motion.div 
                  whileHover={{ scale: 1.02, rotate: 1 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full max-w-[400px] cursor-pointer"
                >
                  <motion.div 
                    animate={{ rotate: [-3, -1, -3] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-primary/5 rounded-3xl" 
                  />
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
                    <SafeImage 
                      src="/images/alishba_profile_original.jpg" 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
                      alt={personal.name || "Alishba Iqbal"} 
                    />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* ⚡ Dynamic Skills Marquee — Editorial Bold */}
          <section className="py-6 border-y border-border/40 bg-card/10 backdrop-blur-sm -rotate-1 scale-105 origin-center overflow-hidden">
            <ScrollVelocity 
              texts={[
                personal.skills?.technologies?.join(" · ") || "React · Flutter · Node · AI",
                personal.skills?.languages?.join(" · ") || "C++ · Python · Dart · JS"
              ]}
              velocity={50}
              className="text-4xl md:text-6xl font-black text-primary/80"
            />
          </section>

          {/* Insights — Horizontal scrolling cards */}
          <section className="py-16 bg-muted/10 backdrop-blur-sm border-y border-border/50">
            <div className="px-6 md:px-12 lg:px-12 mb-10 flex justify-between items-end max-w-7xl mx-auto">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Insights</h2>
                <p className="text-sm text-muted-foreground mt-1">Technical perspectives & design thinking</p>
              </div>
              <Link to="/tips" className="text-sm font-medium text-primary hover:underline">View all →</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 md:px-12 lg:px-12 pb-6 max-w-7xl mx-auto">
              {/* Insights — Grid reveal */}
              {[
                { t: 'Clean Architecture', c: 'Maintain strict boundaries between layers for scalable systems.' },
                { t: 'Visual Hierarchy', c: 'Guide users naturally through contrast, spacing, and typography.' },
                { t: 'Performance First', c: 'Optimize for speed — every millisecond matters to users.' },
                { t: 'Accessible Design', c: 'Build inclusive interfaces that work for everyone.' },
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className={`h-full floating`}
                  style={{ animationDelay: `${i * 0.5}s` }}
                >
                  <BorderGlow
                    borderRadius={24}
                    glowRadius={30}
                    glowColor="345 80% 30%"
                    colors={['#7d0d1b', '#a90519', '#ff102a']}
                    backgroundColor="hsl(var(--card))"
                    animated
                  >
                    <motion.div 
                      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                      className="silk-card border-0 bg-transparent shadow-none h-full p-8 md:p-6 cursor-default"
                    >
                      <span className="text-xs text-primary font-medium">0{i+1}</span>
                      <h3 className="text-xl font-bold tracking-tight mt-2 mb-3 text-foreground">{item.t}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.c}</p>
                    </motion.div>
                  </BorderGlow>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Stats — Flex row, clean cards */}
          <section className="py-20 px-6 md:px-16 lg:px-24">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-foreground">At a Glance</h2>
                  <p className="text-sm text-muted-foreground mt-1">Key numbers from my journey</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Internships', val: (stats as any).internships || '2+' },
                    { label: 'Projects', val: stats.projects },
                    { label: 'Experience', val: stats.experience },
                    { label: 'Focus', val: stats.focus }
                  ].map((s, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="silk-card text-center py-8 cursor-default"
                    >
                      <span className="text-xs text-muted-foreground font-medium tracking-wider uppercase">{s.label}</span>
                      <div className="text-3xl font-bold text-primary mt-2">{s.val}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Quote card */}
              <div className="flex flex-col justify-between p-10 bg-primary text-primary-foreground rounded-3xl shadow-lg">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold tracking-tight leading-snug">
                    "Excellence is not a goal — it's a standard."
                  </h3>
                  <p className="text-sm opacity-80 leading-relaxed">
                    Committed to building technology that empowers people and drives meaningful innovation.
                  </p>
                </div>
                <Link to="/experience" className="flex items-center gap-2 text-sm font-medium pt-6 mt-6 border-t border-primary-foreground/20">
                  View Experience <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          DARK MODE: "Midnight Architect"
          Vertical/column layouts, grid blocks, navy tones
          ═══════════════════════════════════════════ */}
      {isDark && (
        <div className="flex flex-col min-h-screen">
          
          {/* Hero — Full-screen, centered, minimal */}
          <section className="min-h-screen flex flex-col items-center justify-center px-6 relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-6 relative z-10"
            >
              <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase">{personal.title || 'Portfolio'}</p>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-foreground leading-[0.85]">
                {personal.name?.split(' ')[0] || 'Alishba'}<br/>{personal.name?.split(' ')[1] || 'Iqbal'}
              </h1>
              <p className="text-base text-muted-foreground max-w-md mx-auto">
                {personal.tagline || 'Software Engineer · Building modern, performant web experiences'}
              </p>
              
              <div className="flex flex-wrap justify-center gap-3 pt-4">
                {[
                  { to: '/projects', label: 'Projects' },
                  { to: '/experience', label: 'Experience' },
                  { to: '/skills', label: 'Skills' },
                ].map((nav, i) => (
                  <Link key={i} to={nav.to} className="imperial-btn text-xs">
                    {nav.label}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Subtle background glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
          </section>

          {/* ⚡ Dynamic Skills Marquee — Architect Grid */}
          <section className="py-12 bg-card/30 border-y border-white/5 overflow-hidden">
            <ScrollVelocity 
              texts={[
                personal.skills?.technologies?.join(" · ") || "React · Flutter · Node · AI",
                personal.skills?.languages?.join(" · ") || "C++ · Python · Dart · JS"
              ]}
              velocity={80}
              className="text-5xl md:text-8xl font-black text-foreground/5 tracking-tighter"
              parallaxStyle={{ padding: '20px 0' }}
            />
          </section>

          {/* Interests — Vertical grid, architectural cards */}
          <section className="py-24 px-6 md:px-16 lg:px-24">
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="flex items-center gap-6">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Focus Areas</h2>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {interests.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    className="group"
                  >
                    <BorderGlow
                      borderRadius={16}
                      glowRadius={30}
                      glowIntensity={0.8}
                      glowColor="45 100% 60%"
                      colors={['#facc15', '#fbbf24', '#f59e0b']}
                    >
                      <div className="architect-card border-0 bg-card/20 backdrop-blur-md shadow-none h-full m-0">
                        <item.icon className="w-6 h-6 text-primary mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </BorderGlow>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Stats — Stacked column, dark blocks */}
          <section className="py-24 px-6 md:px-16 lg:px-24 bg-card/20 backdrop-blur-md">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-6 mb-12">
                <Terminal className="w-5 h-5 text-primary" />
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Statistics</h2>
              </div>
              
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: 'Projects', val: stats.projects },
                  { label: 'Experience', val: stats.experience },
                  { label: 'Focus', val: stats.focus }
                ].map((s, i) => (
                  <div key={i} className="architect-card p-10 text-center group hover:bg-primary/5">
                    <span className="text-xs text-muted-foreground font-medium tracking-wider uppercase block mb-4">{s.label}</span>
                    <div className="text-5xl font-bold text-primary">{s.val}</div>
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: i * 0.2 }}
                      className="h-0.5 bg-primary/30 mt-6 mx-auto max-w-[80px]" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* CTA — Shared but styled differently via CSS */}
      <section className="py-16 px-6 md:px-16 lg:px-24">
        <div className={`max-w-4xl mx-auto p-10 md:p-16 text-center transition-all duration-500 ${
          isDark ? 'architect-card' : 'silk-card bg-card/80 backdrop-blur-sm'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">Let's Collaborate</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            I'm always open to new opportunities and creative partnerships. Let's build something great together.
          </p>
          <a href="mailto:contact@alishbaiqbal.com" className="imperial-btn">
            Send Message <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <QuickAdmin tab="settings" />

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
