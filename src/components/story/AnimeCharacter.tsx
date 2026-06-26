import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

interface AnimeCharacterProps {
  activeChapter?: string;
  scrollProgress?: number;
}

// Chapter to transparent image asset mapping
const CHARACTER_IMAGES: Record<string, string> = {
  hero: '/images/story/char_wave.png',       // Hero
  about: '/images/story/char_present.png',    // About
  skills: '/images/story/char_work.png',       // Skills
  experience: '/images/story/char_think.png',      // Experience
  projects: '/images/story/char_present.png',    // Projects (presenting horizontal scroll deck)
  certifications: '/images/story/char_happy.png',      // Certifications
  contact: '/images/story/char_wave.png',       // Contact / Goodbye
};

// Layout positions for each chapter (desktop view)
const POSITIONS: Record<string, { left: string; top: string; scale: number }> = {
  hero: { left: '84%', top: '55%', scale: 0.95 },
  about: { left: '85%', top: '55%', scale: 0.82 },
  skills: { left: '12%', top: '55%', scale: 0.82 },
  experience: { left: '85%', top: '55%', scale: 0.82 },
  projects: { left: '88%', top: '78%', scale: 0.62 },
  certifications: { left: '12%', top: '55%', scale: 0.82 },
  contact: { left: '84%', top: '55%', scale: 0.92 },
};

export default function AnimeCharacter({
  activeChapter = 'hero',
}: AnimeCharacterProps) {
  const { isDark } = useTheme();
  const [dismissed, setDismissed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Parallax offset states
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Preload all character images on mount to ensure instant load times
  useEffect(() => {
    Object.values(CHARACTER_IMAGES).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Detect screen size (mobile/tablet under 1024px)
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Listen to mousemove for interactive parallax
  useEffect(() => {
    if (isMobile || dismissed) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX / innerWidth) - 0.5;
      const ny = (e.clientY / innerHeight) - 0.5;
      
      setMouseOffset({
        x: nx * -24,
        y: ny * -24,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, dismissed]);

  if (dismissed || isMobile) return null;

  const currentImg = CHARACTER_IMAGES[activeChapter] ?? CHARACTER_IMAGES.hero;
  const desktopPos = POSITIONS[activeChapter] ?? POSITIONS.hero;

  // Mobile position styles (sticky bottom right, scaled down)
  const mobileStyle: React.CSSProperties = {
    position: 'fixed',
    right: '12px',
    bottom: '12px',
    transform: 'scale(0.55)',
    transformOrigin: 'bottom right',
    zIndex: 100,
    width: '240px',
    height: '240px',
  };

  // Desktop styles using absolute left/top with transform centering
  const desktopStyle: React.CSSProperties = {
    position: 'fixed',
    left: desktopPos.left,
    top: desktopPos.top,
    transform: 'translate(-50%, -50%)',
    zIndex: 100,
    width: '280px',
    height: '280px',
  };

  // Glow color adapts dynamically: Burgundy in light mode, Gold in dark mode
  const glowColor = isDark ? 'rgba(197, 168, 128, 0.45)' : 'rgba(139, 30, 63, 0.28)';

  return (
    <motion.div
      style={isMobile ? mobileStyle : desktopStyle}
      // Animate position shifts smoothly on desktop
      animate={
        isMobile
          ? {}
          : {
              left: desktopPos.left,
              top: desktopPos.top,
            }
      }
      transition={{ type: 'spring', stiffness: 45, damping: 15 }}
      className="select-none pointer-events-none"
    >
      {/* Dismiss button */}
      <button
        onClick={() => setDismissed(true)}
        className="absolute pointer-events-auto cursor-pointer flex items-center justify-center border transition-colors duration-250 shadow-md"
        style={{
          top: isMobile ? '35px' : '0px',
          right: isMobile ? '35px' : '0px',
          zIndex: 120,
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: 'var(--s-surface)',
          borderColor: 'var(--s-border-mid)',
          color: 'var(--s-sand-dim)',
          fontSize: '11px',
          lineHeight: 1,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'var(--s-gold)';
          e.currentTarget.style.color = 'var(--s-sand)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--s-border-mid)';
          e.currentTarget.style.color = 'var(--s-sand-dim)';
        }}
        title="Dismiss Guide"
      >
        &times;
      </button>

      {/* Mouse parallax offset container */}
      <motion.div
        animate={isMobile ? {} : { x: mouseOffset.x, y: mouseOffset.y }}
        transition={{ type: 'spring', stiffness: 45, damping: 15 }}
        className="w-full h-full relative flex items-center justify-center pointer-events-none"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImg}
            initial={{ opacity: 0, scale: isMobile ? 1 : desktopPos.scale * 0.92 }}
            animate={{ opacity: 1, scale: isMobile ? 1 : desktopPos.scale }}
            exit={{ opacity: 0, scale: isMobile ? 0.92 : desktopPos.scale * 0.92 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="w-full h-full pointer-events-none"
          >
            {/* GPU CSS float loop on nested standard div to prevent Framer conflicts */}
            <div className="character-svg-wrapper w-full h-full flex items-center justify-center">
              <img
                src={currentImg}
                alt="Character Guide"
                className="w-full h-full object-contain"
                style={{
                  filter: `drop-shadow(0 8px 16px rgba(0,0,0,0.35)) drop-shadow(0 0 15px ${glowColor})`,
                }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
