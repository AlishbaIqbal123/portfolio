import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, Shield, Zap, Hash, Layers } from 'lucide-react';
import { personalData } from '@/data/personal';
import { getPersonalInfo } from '@/lib/api';
import { useTheme } from '@/hooks/useTheme';
import { SafeImage } from '@/components/ui/SafeImage';

function TypingEffect({ text, delay = 0, isMono = false }: { text: string; delay?: number; isMono?: boolean }) {
  const [displayText, setDisplayText] = useState('');
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => setHasStarted(true), delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [hasStarted, text]);

  return (
    <span className={isMono ? "tracking-widest uppercase opacity-70" : "font-black"}>
      {displayText}
      <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} className="inline-block w-[2px] h-[0.8em] bg-primary ml-1" />
    </span>
  );
}

export function Hero() {
  const { isDark } = useTheme();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getPersonalInfo().then(setData);
  }, []);

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = personalData.cvPath;
    link.download = 'ALISHBA_RESUME.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-background px-6">
      
      {/* 🏛️ LIGHT THEME: EDITORIAL SPREAD */}
      {!isDark && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-6xl flex flex-col items-center text-center space-y-10"
        >
          <div className="space-y-4">
            <span className="text-[10px] font-black tracking-[0.6em] text-primary/40 uppercase italic">ESTABLISHED 2024</span>
            <motion.h1 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-8xl md:text-[11rem] font-black italic tracking-tighter text-primary uppercase leading-[0.8] heading-silk"
            >
              {data?.name?.split(' ')[0] || personalData.name.split(' ')[0]}
            </motion.h1>
          </div>

          <div className="max-w-2xl">
            <h2 className="text-xl md:text-3xl font-black uppercase text-foreground/80 leading-tight italic mb-8">
              {data?.tagline || personalData.tagline}
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="imperial-btn">
                VIEW PROJECTS
              </button>
              <button onClick={downloadCV} className="imperial-btn bg-background text-primary border-2 border-primary/20 hover:border-primary">
                RESUME
              </button>
            </div>
          </div>
          
          <div className="w-full max-w-4xl h-px bg-primary/10" />
        </motion.div>
      )}

      {/* 🌌 DARK THEME: TACTICAL GRID */}
      {isDark && (
        <div className="relative z-10 w-full max-w-[1400px] h-full grid grid-cols-1 md:grid-cols-12 items-center gap-10 py-10">
          
          {/* Status Pillar */}
          <div className="hidden md:flex col-span-2 flex-col gap-10 justify-center h-full border-r border-primary/10">
             <div className="space-y-4 px-6">
                <div className="text-[9px] font-black tracking-[0.5em] text-primary uppercase italic">STATUS</div>
                <div className="flex items-center gap-2 text-[10px] font-black text-foreground">
                   <div className="w-2 h-2 bg-primary animate-pulse" />
                   ONLINE_V6
                </div>
             </div>
             
             <div className="px-6 space-y-6">
                <div className="text-[9px] font-black tracking-[0.5em] text-primary uppercase italic">SYSTEMS</div>
                <div className="space-y-2 opacity-40">
                   <div className="text-[8px] font-black">SYNC: 100%</div>
                   <div className="text-[8px] font-black">CORE: ACTIVE</div>
                </div>
             </div>
          </div>

          {/* Main Command Center */}
          <div className="col-span-1 md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left space-y-12">
            <motion.div 
               initial={{ x: -20, opacity: 0 }} 
               animate={{ x: 0, opacity: 1 }}
               className="space-y-2"
            >
               <span className="text-[10px] font-black text-primary tracking-[1em] uppercase">SUBJECT_IDENTITY</span>
               <h1 className="text-7xl md:text-[9rem] font-black tracking-tighter text-foreground uppercase leading-[0.8] heading-cyber">
                 {data?.name?.split(' ')[0] || personalData.name.split(' ')[0]}
               </h1>
            </motion.div>

            <div className="space-y-10 max-w-xl">
               <h2 className="text-lg md:text-4xl font-black uppercase text-primary leading-none heading-cyber">
                 <TypingEffect text={personalData.tagline} isMono={true} />
               </h2>
               <div className="flex flex-wrap justify-center md:justify-start gap-4">
                 <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="imperial-btn">
                   VIEW PROJECTS
                 </button>
                 <button onClick={downloadCV} className="imperial-btn opacity-60 hover:opacity-100">
                   DOWNLOAD CV
                 </button>
               </div>
            </div>
          </div>

          {/* Overseer Detail */}
          <div className="hidden md:flex col-span-3 flex-col items-center gap-10">
             <div className="relative p-6 border-2 border-primary/20 bg-card/10 backdrop-blur-3xl overflow-hidden group rounded-3xl">
                <SafeImage src={data?.profile_pic || "/images/mascot.png"} alt="Overseer" className="w-56 h-56 object-cover rounded-2xl filter drop-shadow-[0_0_30px_rgba(255,20,147,0.4)] transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="mt-4 text-[10px] font-black tracking-[0.4em] opacity-40 text-center">OVERSEER_ACTIVE</div>
             </div>
             
             <div className="w-full h-px bg-primary/10" />
             
             <div className="grid grid-cols-2 gap-4 w-full">
                <div className="p-4 border border-primary/10 text-center">
                   <div className="text-[8px] font-black text-primary mb-1">LATENCY</div>
                   <div className="text-lg font-black text-foreground">0.04MS</div>
                </div>
                <div className="p-4 border border-primary/10 text-center">
                   <div className="text-[8px] font-black text-primary mb-1">SECURITY</div>
                   <div className="text-lg font-black text-foreground">ENCRYPTED</div>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* 🧬 GLOBAL SCROLL CUE */}
      <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-primary/40 to-transparent" />
        <span className="text-[8px] font-black tracking-widest text-primary/40 uppercase">SCROLL</span>
      </motion.div>

    </section>
  );
}
