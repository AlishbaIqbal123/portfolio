import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Layers, Zap, ShieldCheck, Heart, Rocket } from 'lucide-react';
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
                    <div className="text-2xl font-bold text-primary">{personal.stats?.cgpa || personal.cgpa || '3.64'}</div>
                    <p className="text-xs text-muted-foreground mt-1">CGPA</p>
                  </motion.div>
                  <div className="w-px h-10 bg-border" />
                  <motion.div 
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    className="text-center"
                  >
                    <div className="text-2xl font-bold text-primary">{personal.location || 'Pakistan'}</div>
                    <p className="text-xs text-muted-foreground mt-1">Location</p>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="order-1 lg:order-2"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-xl">
                  <SafeImage src="/images/alishba_profile_professional.png" className="w-full h-full object-cover" alt="Alishba Iqbal" />
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-primary/80 to-transparent">
                    <span className="text-white text-xl font-bold">Alishba Iqbal</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Interests — Pinterest masonry */}
          <section className="py-16 px-6 md:px-16 lg:px-24 bg-muted/10 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold tracking-tight mb-8 text-foreground text-reveal">What I Focus On</h2>
              <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                {interests.map((interest, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`silk-card break-inside-avoid group cursor-default floating-delayed`}
                  >
                    <div className="relative overflow-hidden">
                      <interest.icon className="w-8 h-8 text-primary mb-4 transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110" />
                      <h3 className="text-xl font-bold tracking-tight mb-2 text-foreground group-hover:text-primary transition-colors">{interest.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{interest.desc}</p>
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
                <div className="lg:col-span-8 architect-card">
                  <p className="text-lg text-muted-foreground leading-relaxed">{bio}</p>
                </div>
                <div className="lg:col-span-4 grid grid-cols-2 gap-4">
                  <div className="architect-card text-center py-8">
                    <div className="text-xs text-muted-foreground mb-2">CGPA</div>
                    <div className="text-3xl font-bold text-primary">{personal.stats?.cgpa || personal.cgpa || '3.64'}</div>
                  </div>
                  <div className="architect-card text-center py-8">
                    <div className="text-xs text-muted-foreground mb-2">Location</div>
                    <div className="text-lg font-bold text-primary">{personal.location || 'Pk'}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 px-6 md:px-16 lg:px-24">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold tracking-tight mb-8 text-foreground">Focus Areas</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {interests.map((interest, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: idx * 0.08 
                    }}
                    whileHover={{ y: -5 }}
                    className="architect-card group"
                  >
                    <interest.icon className="w-6 h-6 text-primary mb-4" />
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">{interest.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{interest.desc}</p>
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
