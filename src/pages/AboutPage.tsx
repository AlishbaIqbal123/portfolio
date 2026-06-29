import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Layers, Zap, ShieldCheck, Heart, Rocket, Download } from 'lucide-react';
import { QuickAdmin } from '@/components/QuickAdmin';
import { SafeImage } from '@/components/ui/SafeImage';
import { getPersonalInfo } from '@/lib/api';
import { personalData as staticPersonal } from '@/data/personal';
import { useTheme } from '@/hooks/useTheme';

const interests = [
  { icon: Shield, title: 'Backend Systems', desc: 'Building reliable server-side logic and scalable infrastructure.' },
  { icon: Layers, title: 'UI Engineering', desc: 'Crafting beautiful, responsive interfaces that delight users.' },
  { icon: Zap, title: 'AI & Automation', desc: 'Implementing smart solutions that streamline workflows.' },
  { icon: ShieldCheck, title: 'Data Privacy', desc: 'Ensuring privacy and integrity of user data.' },
  { icon: Heart, title: 'Accessible Design', desc: 'Building inclusive technology that empowers everyone.' },
  { icon: Rocket, title: 'Innovation', desc: 'Pushing the boundaries of modern software engineering.' },
];

export function AboutPage() {
  const { isDark } = useTheme();
  const [personal, setPersonal] = useState<any>(staticPersonal);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getPersonalInfo();
        if (data) setPersonal(data);
      } catch (err) { console.error(err); }
    }
    loadData();
  }, []);

  const bio = typeof personal?.bio === 'string' 
    ? personal.bio 
    : (personal?.bio?.paragraph1 || "A passionate software engineer focused on building elegant and impactful digital experiences.");

  return (
    <div className="relative min-h-screen bg-transparent transition-colors duration-500">
      
      {!isDark ? (
        /* ── Light: Editorial spread ── */
        <div className="flex flex-col">
          <section className="pt-24 pb-16 px-6 md:px-16 lg:px-24">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8 }}
                className="space-y-6 order-2 lg:order-1"
              >
                <div>
                  <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase mb-2">About Me</p>
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground text-reveal">My Story</h1>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">{bio}</p>
                <div className="flex items-center gap-6 pt-2">
                  <motion.div 
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    className="text-center"
                  >
                    <div className="text-2xl font-bold text-primary">{personal.location || 'Pakistan'}</div>
                    <p className="text-xs text-muted-foreground mt-1">Location</p>
                  </motion.div>
                </div>
                
                <div className="pt-6">
                  <button 
                    onClick={() => {
                        window.open('/resume', '_blank');
                    }}
                    className="imperial-btn flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" /> DOWNLOAD CV
                  </button>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="order-1 lg:order-2 flex justify-center"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-b from-primary/5 to-primary/10 border border-primary/10 p-6 flex items-center justify-center shadow-lg">
                  <SafeImage src="/images/alishba_avatar_about.png" className="max-h-[90%] max-w-full object-contain" alt="Alishba Iqbal" />
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-primary/20 via-transparent to-transparent flex items-end justify-center">
                    <span className="text-foreground text-xl font-bold bg-background/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-primary/10 shadow-sm">Alishba Iqbal</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Interests — Pinterest masonry */}
          <section className="py-16 px-6 md:px-16 lg:px-24 bg-muted/10 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold tracking-tight mb-8 text-foreground text-reveal">What I Focus On</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {interests.map((interest, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, duration: 0.6 }}
                  >
                    <div className="relative group overflow-hidden rounded-2xl border border-[#7b6b43]/20 bg-gradient-to-br from-[#fdfbf7] to-[#f4efdf] p-8 h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(125,13,27,0.1)] hover:border-primary/30 flex flex-col justify-between cursor-default">
                      <div className="absolute right-4 bottom-2 text-7xl font-bold font-['Playfair_Display'] text-primary/5 group-hover:text-primary/10 select-none transition-colors duration-500">
                        0{idx + 1}
                      </div>
                      
                      <div className="absolute -inset-20 bg-gradient-to-tr from-primary/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 pointer-events-none" />

                      <div className="relative z-10">
                        <div className="w-12 h-12 rounded-full bg-primary/5 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-[360deg] transition-all duration-700">
                          <interest.icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold font-['Playfair_Display'] text-foreground mb-3 group-hover:text-primary transition-colors">
                          {interest.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {interest.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>
      ) : (
        /* ── Dark: Architectural grid ── */
        <div className="flex flex-col">
          <section className="pt-24 pb-16 px-6 md:px-16 lg:px-24">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase mb-3">About</p>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground text-reveal">My Story</h1>
              </div>
              
              <div className="grid lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 architect-card relative group transition-all duration-500 hover:border-primary/40">
                  <p className="text-lg text-muted-foreground leading-relaxed transition-colors group-hover:text-foreground">{bio}</p>
                  <div className="mt-8 pt-8 border-t border-primary/10">
                    <button 
                      onClick={() => {
                          window.open('/resume', '_blank');
                      }}
                      className="imperial-btn flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" /> DOWNLOAD CV
                    </button>
                  </div>
                </div>
                <div className="lg:col-span-4 flex items-center justify-center">
                  <div className="architect-card text-center py-10 w-full">
                    <div className="text-xs text-muted-foreground mb-3 uppercase tracking-widest">Base Operations</div>
                    <div className="text-2xl font-bold text-primary">{personal.location || 'Pakistan'}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 px-6 md:px-16 lg:px-24">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold tracking-tight mb-8 text-foreground">Focus Areas</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {interests.map((interest, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, duration: 0.6 }}
                  >
                    <div className="relative group overflow-hidden rounded-2xl border border-primary/10 bg-[#0c1524]/40 backdrop-blur-md p-6 h-full transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(225,187,128,0.15)] flex flex-col justify-between cursor-default">
                      {/* Tech grid overlay */}
                      <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.1] transition-opacity duration-500 pointer-events-none"
                        style={{
                          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                          backgroundSize: '16px 16px',
                          color: 'var(--primary)'
                        }}
                      />
                      
                      {/* Corner bracket decorations */}
                      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-primary/20 group-hover:border-primary/60 transition-colors duration-500" />
                      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-primary/20 group-hover:border-primary/60 transition-colors duration-500" />
                      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-primary/20 group-hover:border-primary/60 transition-colors duration-500" />
                      <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-primary/20 group-hover:border-primary/60 transition-colors duration-500" />
                      
                      <div>
                        <div className="flex justify-between items-start mb-6">
                          <div className="p-3 rounded-xl bg-primary/5 text-primary border border-primary/10 group-hover:bg-primary/20 group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-500">
                            <interest.icon className="w-6 h-6" />
                          </div>
                          <span className="text-[10px] font-mono text-primary/30 group-hover:text-primary/70 transition-colors">
                            // 0{idx + 1}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors tracking-tight">
                          {interest.title}
                        </h3>
                        <p className="text-sm text-muted-foreground/85 leading-relaxed">
                          {interest.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      <QuickAdmin tab="settings" />
    </div>
  );
}
