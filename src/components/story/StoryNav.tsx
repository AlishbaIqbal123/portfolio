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

  const activeChapObj = chapters.find(c => c.id === activeChapter);
  const activeChapIndex = Math.max(1, chapters.findIndex(c => c.id === activeChapter) + 1);

  return (
    <>
      {/* Mobile Top Reader Bar */}
      <div
        className="flex lg:hidden fixed top-0 left-0 right-0 z-[150] h-14 items-center justify-between px-5 select-none"
        style={{
          background: 'var(--s-bg)',
          borderBottom: '1px solid var(--s-border-mid)',
        }}
      >
        {/* Progress bar at the absolute top of the bar */}
        <div 
          className="absolute top-0 left-0 h-[2px]" 
          style={{
            width: `${scrollProgress * 100}%`,
            background: 'var(--s-gold)',
            transition: 'width 0.1s ease-out',
          }}
        />

        {/* Multi-page back button */}
        <a
          href="/portfolio"
          onClick={() => localStorage.setItem('alishba-portfolio-preference', 'multi')}
          className="font-mono-story uppercase transition-colors"
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            color: 'var(--s-sand-dim)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
        >
          <span>←</span>
          <span>PORTFOLIO</span>
        </a>

        {/* Active chapter text */}
        <div 
          className="font-mono-story uppercase"
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.12em',
            color: 'var(--s-gold)',
            fontWeight: 600,
          }}
        >
          <span>{activeChapIndex.toString().padStart(2, '0')}</span>
          <span style={{ color: 'var(--s-border-mid)', margin: '0 0.4rem' }}>/</span>
          <span style={{ color: 'var(--s-sand)' }}>{activeChapObj?.name || 'STORY'}</span>
        </div>
      </div>

      {/* Desktop Vertical Tracker Sidebar */}
      <div
        className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-[100] flex-col items-end select-none"
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
    </>
  );
}
