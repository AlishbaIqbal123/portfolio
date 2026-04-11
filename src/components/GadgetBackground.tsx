import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { motion } from 'framer-motion';
import { ColorBends } from './effects/ColorBends';
import { Silk } from './effects/Silk';

export const GadgetBackground: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background transition-all duration-1000">
      
      {/* 🏛️ LIGHT: ARCHITECTURAL MAROON DEPTH */}
      {!isDark && (
        <div className="absolute inset-0 bg-[#F4F1EE]">
          {/* Static Atmospheric Depth - Removed moving Bends */}
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
          
          
          {/* Industrial Drafting Hatching (Subtle Stripes) */}
          <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, #4a0715 0, #4a0715 1px, transparent 0, transparent 50%)`,
              backgroundSize: '10px 10px',
            }}
          />

          {/* Blueprint Grid Layers (Maroon Tinted) */}
          <div 
            className="absolute inset-0 opacity-[0.08]" 
            style={{
              backgroundImage: `linear-gradient(to right, #4a0715 2px, transparent 2px), linear-gradient(to bottom, #4a0715 2px, transparent 2px)`,
              backgroundSize: '80px 80px',
            }}
          />
          <div 
            className="absolute inset-0 opacity-[0.04]" 
            style={{
              backgroundImage: `linear-gradient(to right, #4a0715 1px, transparent 1px), linear-gradient(to bottom, #4a0715 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
            }}
          />

          {/* Corner Node Markers (Architectural Artifacts) */}
          {[
            "top-0 left-0 border-t-2 border-l-2",
            "top-0 right-0 border-t-2 border-r-2",
            "bottom-0 left-0 border-b-2 border-l-2",
            "bottom-0 right-0 border-b-2 border-r-2"
          ].map((pos, idx) => (
            <div key={idx} className={`absolute ${pos} w-20 h-20 border-[#4a0715]/10 m-10`} />
          ))}

          {/* Industrial Metadata Labels */}
          <div className="absolute top-1/2 left-32 -translate-y-1/2 -rotate-90 pointer-events-none opacity-10">
             <span className="text-[12px] font-black tracking-[1em] text-[#4a0715] uppercase whitespace-nowrap italic">PORTFOLIO · ALISHBA IQBAL</span>
          </div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(74,7,21,0.02),transparent_50%)]" />
        </div>
      )}

      {/* 🌌 DARK: SAPPHIRE DATA MATRIX & SILK */}
      {isDark && (
        <div className="absolute inset-0 bg-[#0A0F1E]">
          <Silk color="#0EA5E9" speed={0.05} noiseIntensity={0.8} className="opacity-[0.15]" />

          {/* Static Matrix Line Grid */}
          <div 
            className="absolute inset-0 opacity-[0.04]" 
            style={{
              backgroundImage: `linear-gradient(to right, var(--primary) 1px, transparent 1px), linear-gradient(to bottom, var(--primary) 1px, transparent 1px)`,
              backgroundSize: '100px 100px',
            }}
          />
          
          {/* Moving Data-Velocity Trails */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: "-100%", y: Math.random() * 100 + "vh" }}
              animate={{ x: "200%" }}
              transition={{
                duration: 15 + Math.random() * 20,
                repeat: Infinity,
                ease: "linear",
                delay: i * 2
              }}
              className="absolute h-[1px] w-[500px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            />
          ))}

          {/* Constant Indigo Scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(59,130,246,0.02),rgba(14,165,233,0.01),rgba(59,130,246,0.02))] bg-[length:100%_4px,3px_100%] opacity-20" />

          {/* Deep Ambient Void Glow */}
          <div className="absolute inset-x-0 top-0 h-[80vh] bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[50vh] bg-gradient-to-t from-primary/10 to-transparent" />
        </div>
      )}

      {/* Surface Depth Layer */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" />
    </div>
  );
};
