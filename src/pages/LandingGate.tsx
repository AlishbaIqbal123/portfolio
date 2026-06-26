import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

export default function LandingGate() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [step, setStep] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [flash, setFlash] = useState(false);

  // Check preference on mount
  useEffect(() => {
    const preference = localStorage.getItem('alishba-portfolio-preference');
    if (preference === 'story') {
      navigate('/story', { replace: true });
    } else if (preference === 'multi') {
      navigate('/portfolio', { replace: true });
    }
  }, [navigate]);

  // Visual sequence timers
  useEffect(() => {
    // Step 1: Line fades in
    const timer1 = setTimeout(() => setStep(1), 600);
    // Step 2: Typing starts
    const timer2 = setTimeout(() => setStep(2), 1300);
    // Step 3: Subtitle fades in
    const timer3 = setTimeout(() => setStep(3), 2300);
    // Step 4: Choice label and cards slide up
    const timer4 = setTimeout(() => setStep(4), 3300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  // Typing effect
  const fullText = "Hello — I'm Alishba.";
  useEffect(() => {
    if (step < 2) return;
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [step]);

  const handleChoice = (preference: 'story' | 'multi', targetPath: string) => {
    setFlash(true);
    setTimeout(() => {
      localStorage.setItem('alishba-portfolio-preference', preference);
      navigate(targetPath);
    }, 350);
  };

  // Helper to split and style the text dynamically based on light/dark design philosophy
  const renderTypedText = () => {
    const prefix = "Hello — I'm ";
    if (typedText.startsWith(prefix)) {
      const namePart = typedText.slice(prefix.length);
      return (
        <>
          {isDark ? (
            // Dark Mode design: Space Grotesk (sans-serif) for prefix
            <span className="font-space uppercase tracking-wider text-[var(--s-sand)]">{prefix}</span>
          ) : (
            // Light Mode design: Cormorant Garamond (serif italic) for prefix
            <span className="font-cormorant italic font-medium text-[var(--s-sand)]">{prefix}</span>
          )}
          {/* Name always in elegant Garamond serif italic */}
          <span className="font-cormorant italic text-[var(--s-gold)] normal-case">{namePart}</span>
        </>
      );
    }
    return (
      <span className={isDark ? "font-space uppercase tracking-wider text-[var(--s-sand)]" : "font-cormorant italic font-medium text-[var(--s-sand)]"}>
        {typedText}
      </span>
    );
  };

  // Prevent flash of content if preference already exists
  const hasPref = typeof window !== 'undefined' && localStorage.getItem('alishba-portfolio-preference');
  if (hasPref) {
    return <div style={{ background: 'var(--s-bg, #0A0A09)', width: '100vw', height: '100vh' }} />;
  }

  return (
    <div
      className="fixed inset-0 w-screen h-screen flex flex-col items-center justify-center overflow-hidden z-[9999] select-none"
      style={{ background: 'var(--s-bg, #0A0A09)' }}
    >
      {/* White transition flash overlay */}
      {flash && (
        <div className="fixed inset-0 bg-white z-[10000] pointer-events-none animate-flash-overlay" />
      )}

      {/* Film grain noise overlay for premium feel */}
      <div className="film-grain" />

      {/* Intro text group */}
      <div className="flex flex-col items-center justify-center text-center px-6 max-w-2xl z-10">
        {/* Step 2: Hello - I'm Alishba */}
        <h1 
          className={`text-[1.8rem] md:text-[2.8rem] leading-tight mb-4 transition-opacity duration-500 select-none ${
            step >= 2 ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ minHeight: '3.6rem' }}
        >
          {renderTypedText()}
        </h1>

        {/* Step 1: Gold line */}
        <div 
          className={`h-[1px] transition-all duration-1000 ease-out`}
          style={{
            background: 'var(--s-gold, #C5A880)',
            width: step >= 1 ? '180px' : '0px',
            opacity: step >= 1 ? 0.75 : 0,
          }}
        />

        {/* Step 3: Description Line */}
        <p 
          className={`font-cormorant italic text-[1.15rem] mt-4 leading-relaxed transition-opacity duration-1000`}
          style={{
            color: 'var(--s-sand-dim, #8E8B82)',
            opacity: step >= 3 ? 1 : 0,
          }}
        >
          Software Engineer  ·  Full Stack Developer  ·  Builder of things that matter.
        </p>
      </div>

      {/* Step 4: Choice Area */}
      <div 
        className={`mt-12 flex flex-col items-center z-10 transition-all duration-700 ease-out transform ${
          step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[40px] pointer-events-none'
        }`}
      >
        <span 
          className="font-mono-story text-[0.62rem] tracking-[0.2em] mb-6 uppercase"
          style={{ color: 'var(--s-sand-dim, #8E8B82)' }}
        >
          How would you like to explore?
        </span>

        {/* The Choice Cards */}
        <div className="flex flex-col md:flex-row gap-[1.5rem]">
          {/* Card 1 — THE EXPERIENCE */}
          <div 
            onClick={() => handleChoice('story', '/story')}
            className="group cursor-pointer w-[260px] rounded-[2px] border p-[2rem_2.2rem] flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: 'var(--s-surface, #181614)',
              borderColor: 'var(--s-border-mid, #2E2C28)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--s-gold)';
              e.currentTarget.style.boxShadow = isDark 
                ? '0 0 25px rgba(197, 168, 128, 0.1)' 
                : '0 0 25px rgba(139, 30, 63, 0.06)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--s-border-mid)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span className="text-[1.2rem] mb-3 leading-none transition-transform duration-300 group-hover:scale-110" style={{ color: 'var(--s-gold, #C5A880)' }}>✦</span>
            <h2 
              className={`text-[0.92rem] font-bold mb-2 transition-colors duration-300 group-hover:text-[var(--s-gold)] ${
                isDark ? 'font-space tracking-wider' : 'font-cormorant italic tracking-normal'
              }`}
              style={{ color: 'var(--s-sand, #EAE7E0)' }}
            >
              THE EXPERIENCE
            </h2>
            <p className="font-mono-story text-[0.6rem] tracking-wider leading-relaxed" style={{ color: 'var(--s-sand-dim, #8E8B82)' }}>
              Scroll-driven · Cinematic · Animated
            </p>
          </div>

          {/* Card 2 — FULL PORTFOLIO */}
          <div 
            onClick={() => handleChoice('multi', '/portfolio')}
            className="group cursor-pointer w-[260px] rounded-[2px] border p-[2rem_2.2rem] flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: 'var(--s-surface, #181614)',
              borderColor: 'var(--s-border-mid, #2E2C28)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--s-gold)';
              e.currentTarget.style.boxShadow = isDark 
                ? '0 0 25px rgba(197, 168, 128, 0.1)' 
                : '0 0 25px rgba(139, 30, 63, 0.06)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--s-border-mid)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span className="text-[1.2rem] mb-3 leading-none transition-transform duration-300 group-hover:scale-110" style={{ color: 'var(--s-gold, #C5A880)' }}>⊞</span>
            <h2 
              className={`text-[0.92rem] font-bold mb-2 transition-colors duration-300 group-hover:text-[var(--s-gold)] ${
                isDark ? 'font-space tracking-wider' : 'font-cormorant italic tracking-normal'
              }`}
              style={{ color: 'var(--s-sand, #EAE7E0)' }}
            >
              FULL PORTFOLIO
            </h2>
            <p className="font-mono-story text-[0.6rem] tracking-wider leading-relaxed" style={{ color: 'var(--s-sand-dim, #8E8B82)' }}>
              All pages · Projects · Admin
            </p>
          </div>
        </div>
      </div>

      {/* Small print at bottom */}
      <div className="fixed bottom-0 mb-[1.5rem] left-0 right-0 text-center z-10">
        <p 
          className="font-mono-story text-[0.55rem] tracking-wider uppercase opacity-60"
          style={{ color: 'var(--s-sand-dim, #8E8B82)' }}
        >
          You can switch anytime from the navigation
        </p>
      </div>
    </div>
  );
}
