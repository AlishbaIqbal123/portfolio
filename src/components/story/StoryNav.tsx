import React from 'react';
import { useTheme } from '../../hooks/useTheme';

interface StoryChapter {
  id: string;
  name: string;
  ref: React.RefObject<HTMLDivElement | null>;
}

interface StoryNavProps {
  activeChapter: string;
  scrollProgress: number;
  scrollToChapter: (el: HTMLElement | null) => void;
  chapters: StoryChapter[];
}

export default function StoryNav({
  activeChapter,
  scrollProgress,
  scrollToChapter,
  chapters,
}: StoryNavProps) {
  const { isDark } = useTheme();
  const shadowColor = isDark ? 'rgba(197, 168, 128, 0.45)' : 'rgba(139, 30, 63, 0.28)';
  return (
    <div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-end select-none"
      style={{ gap: '0' }}
    >
      {/* Multi-page link */}
      <a
        href="/portfolio"
        onClick={() => localStorage.setItem('alishba-portfolio-preference', 'multi')}
        className="font-mono-story uppercase transition-colors"
        style={{
          fontSize: '0.52rem',
          letterSpacing: '0.12em',
          color: 'var(--s-sand-dim)',
          textDecoration: 'none',
          marginBottom: '1.8rem',
          display: 'block',
          textAlign: 'right',
          transition: 'color 0.25s',
        }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--s-sand)'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--s-sand-dim)'}
      >
        ← MULTI-PAGE
      </a>

      {/* Track and chapters */}
      <div className="relative flex flex-col" style={{ gap: '1rem', paddingRight: '4px' }}>
        {/* Background track */}
        <div
          className="absolute"
          style={{
            right: '18px',
            top: 0,
            bottom: 0,
            width: '1px',
            background: 'var(--s-border-mid)',
          }}
        />
        {/* Progress fill */}
        <div
          className="absolute"
          style={{
            right: '18px',
            top: 0,
            bottom: 0,
            width: '1px',
            background: 'var(--s-gold)',
            transformOrigin: 'top',
            transform: `scaleY(${scrollProgress})`,
            transition: 'transform 0.1s ease-out',
          }}
        />

        {chapters.map((chap) => {
          const isActive = activeChapter === chap.id;
          return (
            <div
              key={chap.id}
              onClick={() => scrollToChapter(chap.ref.current || null)}
              className="flex items-center justify-end cursor-pointer group relative"
              style={{ height: '22px' }}
            >
              {/* Chapter label */}
              <span
                className={`font-mono-story transition-all duration-300 pointer-events-none select-none ${
                  isActive 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0'
                }`}
                style={{
                  fontSize: '0.55rem',
                  letterSpacing: '0.12em',
                  marginRight: '30px',
                  color: isActive ? 'var(--s-sand)' : 'var(--s-sand-dim)',
                  whiteSpace: 'nowrap',
                }}
              >
                {chap.name}
              </span>

              {/* Dot */}
              <div
                className="absolute transition-all duration-300 ease-out group-hover:scale-125"
                style={{
                  right: '10px',
                  width: isActive ? '8px' : '5px',
                  height: isActive ? '8px' : '5px',
                  borderRadius: '1px',
                  transform: 'rotate(45deg)',
                  background: isActive ? 'var(--s-gold)' : 'transparent',
                  border: '1px solid var(--s-border-mid)',
                  borderColor: isActive ? 'var(--s-gold)' : 'var(--s-border-mid)',
                  boxShadow: isActive ? `0 0 8px ${shadowColor}` : 'none',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'var(--s-gold)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'var(--s-border-mid)';
                  }
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
