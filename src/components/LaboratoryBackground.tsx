import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const LaboratoryBackground: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  // Parallax and flow effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -45]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none bg-[var(--background)]">
      {/* Royal Silk Flow - Layer 1 (Deep Blue) */}
      <motion.div 
        style={{ y: y1, rotate: rotate1 }}
        className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] opacity-20"
        animate={{ 
          scale: [1, 1.02, 1],
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <div className="absolute inset-0 bg-primary/20 blur-[40px]" />
      </motion.div>

      {/* Royal Silk Flow - Layer 2 (Golden Glimmer) */}
      <motion.div 
        style={{ rotate: rotate2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[120%] opacity-5"
        animate={{ 
          scale: [1.05, 1, 1.05],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <div className="absolute inset-0 bg-accent/20 blur-[50px]" />
      </motion.div>
      
      {/* Floating Golden Artifacts (Not bubbles, but sleek geometric hints) */}
      {/* Floating Golden Artifacts (Simplified) */}
      {[...Array(4)].map((_, i) => (
        <motion.div
            key={i}
            initial={{ 
                x: `${Math.random() * 100}vw`, 
                y: `${Math.random() * 100}vh`,
                opacity: 0 
            }}
            animate={{ 
                y: [null, `${Math.random() * 100}vh`],
                x: [null, `${Math.random() * 100}vw`],
                opacity: [0, 0.08, 0],
                rotate: [0, 360]
            }}
            transition={{
                duration: 40 + Math.random() * 20,
                repeat: Infinity,
                ease: "linear",
            }}
            className="absolute w-32 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent"
        />
      ))}

      {/* Royal Sparkle Layer */}
      <div className="absolute inset-0 opacity-[0.2]">
        <div className="absolute inset-0 bg-snow-pattern animate-snow grayscale brightness-200" />
      </div>

      {/* Fine Professional Noise - Simplified */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")` }}></div>
    </div>
  );
};
