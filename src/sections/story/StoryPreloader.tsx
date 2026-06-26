import React, { useState, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';

interface StoryPreloaderProps {
  onComplete: () => void;
}

export default function StoryPreloader({ onComplete }: StoryPreloaderProps) {
  const { isDark } = useTheme();
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);    // 0 = loading silhouette, 1 = loaded glow
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      setProgress(count);
      if (count >= 100) clearInterval(interval);
    }, 24); // approx 2.4 seconds loading duration

    // Stage 1: Reveal full colors and flash glow when complete
    const flash = setTimeout(() => setStage(1), 2500);

    // Slide up and call onComplete callback
    const exit = setTimeout(() => {
      setExiting(true);
      setTimeout(onComplete, 680);
    }, 3100);

    return () => {
      clearInterval(interval);
      clearTimeout(flash);
      clearTimeout(exit);
    };
  }, [onComplete]);

  // CSS Filter transitions: 
  // Dark mode: gold silhouette -> full colors + gold glow
  // Light mode: burgundy silhouette -> full colors + burgundy glow
  const characterFilter = stage === 0
    ? (isDark 
        ? 'brightness(0.16) sepia(1) saturate(2.4) hue-rotate(12deg) drop-shadow(0 0 0px rgba(0,0,0,0))'
        : 'brightness(0.16) sepia(1) saturate(2.4) hue-rotate(320deg) drop-shadow(0 0 0px rgba(0,0,0,0))')
    : (isDark
        ? 'brightness(1) contrast(1.02) drop-shadow(0 0 20px rgba(197,168,128,0.55))'
        : 'brightness(1) contrast(1.02) drop-shadow(0 0 20px rgba(139,30,63,0.38))');

  const glowGradient = isDark 
    ? 'radial-gradient(ellipse, rgba(197,168,128,0.4) 0%, transparent 70%)'
    : 'radial-gradient(ellipse, rgba(139,30,63,0.25) 0%, transparent 70%)';

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center z-[9998] select-none transform transition-transform duration-700 ${
        exiting ? '-translate-y-full' : 'translate-y-0'
      }`}
      style={{
        background: 'var(--s-bg)',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 1, 1)',
      }}
    >
      {/* 3D Character Container */}
      <div className="mb-8 relative w-[180px] h-[220px] flex items-center justify-center">
        <img
          src="/images/story/char_wave.png"
          alt="Loading Guide"
          className="w-full h-full object-contain transition-all duration-800 ease-out"
          style={{
            filter: characterFilter,
            transform: stage === 1 ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        {/* Subtle gold/burgundy glow under character when complete */}
        {stage === 1 && (
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-0 animate-pulse"
            style={{
              width: '100px', height: '24px',
              background: glowGradient,
              transition: 'opacity 0.8s',
            }}
          />
        )}
      </div>

      {/* Name */}
      <h1
        className={`uppercase mb-1 ${isDark ? 'font-space tracking-[0.4em]' : 'font-cormorant font-medium italic tracking-[0.2em] text-[1.2rem]'}`}
        style={{
          fontSize: isDark ? '1rem' : '1.3rem', 
          fontWeight: isDark ? 700 : 500,
          color: stage === 1 ? 'var(--s-gold)' : 'var(--s-sand-dim)',
          transition: 'color 0.6s ease',
        }}
      >
        ALISHBA IQBAL
      </h1>

      {/* Role / Loading State */}
      <p
        className="font-mono-story uppercase mb-8"
        style={{ fontSize: '0.52rem', letterSpacing: '0.28em', color: 'var(--s-sand-dim)' }}
      >
        {stage === 0 ? 'LOADING...' : 'WELCOME'}
      </p>

      {/* Progress bar */}
      <div
        style={{
          width: '160px', height: '1px',
          background: 'var(--s-border-mid)',
          marginBottom: '0.6rem', overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: `linear-gradient(to right, var(--s-border-mid), ${stage === 1 ? 'var(--s-gold-bright)' : 'var(--s-gold)'})`,
            transition: 'width 24ms linear, background 0.6s ease',
          }}
        />
      </div>

      {/* Percentage */}
      <span
        className="font-mono-story"
        style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: 'var(--s-sand-dim)' }}
      >
        {progress}%
      </span>

      {/* Vertical watermark */}
      <div
        className="absolute font-mono-story"
        style={{
          right: '1.5rem', bottom: '1.5rem',
          fontSize: '0.48rem', letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'var(--s-sand-faint)',
          writingMode: 'vertical-rl', userSelect: 'none',
        }}
      >
        SOFTWARE ENGINEER
      </div>
    </div>
  );
}
