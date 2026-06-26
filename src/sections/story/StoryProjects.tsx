import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getProjects } from '../../lib/api';
import { useTheme } from '../../hooks/useTheme';

interface Project {
  id: number | string;
  number: string;
  name: string;
  type: string;
  stack: string[];
  description: string;
  link: string;
}

const STATIC_PROJECTS: Project[] = [
  { id: 1, number: '01', name: 'DEEN-MATE', type: 'MOBILE · FLUTTER', stack: ['Flutter', 'Firebase', 'GetX', 'REST APIs'], description: 'Islamic companion app — Quran reading, prayer time calculations, Qibla compass, background audio streaming. Offline-first support.', link: '/projects/deen-mate' },
  { id: 2, number: '02', name: 'AI RESUME ANALYZER', type: 'WEB · AI · MERN', stack: ['React', 'Node.js', 'MongoDB', 'Gemini AI'], description: 'AI platform that parses resumes, performs job-matching with ATS keyword analysis, and delivers career insights via Gemini models.', link: '/projects/ai-resume-analyzer' },
  { id: 3, number: '03', name: 'FINANCE TRACKER', type: 'WEB · FULL STACK', stack: ['Laravel 11', 'PHP 8.2', 'PostgreSQL', 'Bootstrap'], description: 'Personal finance app with real-time balance tracking, analytics, and interactive dashboards. Glassmorphism mobile-first UI.', link: '/projects/finance-tracker' },
  { id: 4, number: '04', name: 'PLAN & TRACK', type: 'MOBILE · FLUTTER', stack: ['Flutter', 'SQLite', 'Provider', 'Dart'], description: 'Task management app with recurring tasks, subtasks, progress tracking, local notifications, and customizable themes.', link: '/projects/plan-and-track' },
  { id: 5, number: '05', name: 'SMART POS', type: 'MOBILE · FLUTTER', stack: ['Flutter', 'Firebase', 'SQLite'], description: 'Business management app — POS checkout, inventory tracking, customer ledger, offline-first data, Google Drive cloud sync.', link: '/projects/smart-pos' },
];

const ACCENT_COLORS = ['#C5A880', '#D4B896', '#B8956A', '#E8D5B7', '#A8906A'];

export default function StoryProjects() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [projects, setProjects] = useState<Project[]>(STATIC_PROJECTS);
  const [currentCardIndex, setCurrentCardIndex] = useState(1);
  const [isSectionActive, setIsSectionActive] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getProjects();
        if (data && Array.isArray(data) && data.length > 0) {
          setProjects(data.map((p: any, idx: number) => {
            const stack = Array.isArray(p.tech_stack) ? p.tech_stack
              : (typeof p.tech_stack === 'string' ? p.tech_stack.split(',').map((t: string) => t.trim()) : []);
            return {
              id: p.id,
              number: (idx + 1).toString().padStart(2, '0'),
              name: p.title || 'Untitled Project',
              type: `${(p.category || 'web').toUpperCase()} · ${stack.slice(0, 2).join(' · ').toUpperCase()}`,
              stack,
              description: p.description || '',
              link: `/projects/${p.id}`,
            };
          }));
        }
      } catch (err) {
        console.error('Failed to load projects:', err);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (isMobile || projects.length === 0) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const strip = stripRef.current;
      if (!section || !strip) return;
      const totalWidth = strip.scrollWidth - window.innerWidth;
      gsap.to(strip, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section, pin: true, scrub: 1,
          start: 'top top', end: () => `+=${totalWidth}`,
          onToggle: (self) => setIsSectionActive(self.isActive),
          onUpdate: (self) => {
            setCurrentCardIndex(Math.min(projects.length, Math.max(1, Math.round(self.progress * (projects.length - 1)) + 1)));
          },
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [isMobile, projects]);

  return (
    <div
      ref={sectionRef}
      className={isMobile ? '' : 'relative w-full overflow-hidden'}
      style={{ background: 'var(--s-bg)' }}
    >
      {isMobile ? (
        <MobileLayout projects={projects} navigate={navigate} />
      ) : (
        <>
          {/* Counter indicator */}
          {isSectionActive && (
            <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[200]"
              style={{ background: 'var(--s-surface)', border: '1px solid var(--s-border-mid)', borderRadius: '20px', padding: '0.4rem 1.2rem' }}>
              <span className="font-mono-story" style={{ fontSize: '0.85rem', color: 'var(--s-sand-dim)', letterSpacing: '0.12em' }}>
                {currentCardIndex.toString().padStart(2, '0')} / {projects.length.toString().padStart(2, '0')}
              </span>
            </div>
          )}

          {/* Horizontal strip */}
          <div
            ref={stripRef}
            className="flex flex-row items-center gap-8 h-screen will-change-transform"
            style={{ paddingLeft: '10vw', paddingRight: '10vw', width: 'auto' }}
          >
            {/* Section title */}
            <div className="flex flex-col items-start justify-center flex-shrink-0 w-[260px] pr-8 select-none">
              <span className="font-mono-story block mb-4"
                style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--s-sand-dim)' }}>
                Chapter 04 — Works
              </span>
              <h2 className={`mb-3 ${isDark ? 'font-space uppercase' : 'font-cormorant font-normal'}`}
                style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3rem)', fontWeight: isDark ? 800 : 400, letterSpacing: isDark ? '-0.03em' : 'normal', color: 'var(--s-sand)', lineHeight: 0.9 }}>
                SELECTED<br />
                {isDark ? (
                  <span className="text-outline-gold">WORKS</span>
                ) : (
                  <span className="italic" style={{ color: 'var(--s-gold)' }}>Works</span>
                )}
              </h2>
            </div>

            {/* Project Cards */}
            {projects.map((proj, idx) => {
              const accent = ACCENT_COLORS[idx % ACCENT_COLORS.length];
              return (
                <div
                  key={proj.id}
                  className="flex-shrink-0 relative overflow-hidden flex flex-col justify-between"
                  style={{
                    width: '360px', height: '480px',
                    background: 'var(--s-surface)',
                    border: '1px solid var(--s-border-mid)',
                    borderRadius: '4px',
                    padding: '2rem',
                    transition: 'border-color 0.3s, transform 0.3s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--s-gold-dim)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--s-border-mid)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                  onClick={() => navigate(proj.link)}
                >
                  {/* Giant background index watermark */}
                  <div className="absolute select-none pointer-events-none"
                    style={{
                      bottom: '-0.2em', right: '-0.05em',
                      fontSize: '10rem', fontWeight: 800,
                      fontFamily: isDark ? "'Space Grotesk', sans-serif" : "'Cormorant Garamond', serif",
                      fontStyle: isDark ? 'normal' : 'italic',
                      color: 'transparent',
                      WebkitTextStroke: '1px var(--s-border-mid)',
                      lineHeight: 1,
                      opacity: 0.6,
                    }}>
                    {proj.number}
                  </div>

                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: accent }} />

                  <div>
                    <div className="flex justify-between items-start mb-5">
                      <span className="font-mono-story" style={{ fontSize: '0.62rem', color: 'var(--s-sand-dim)' }}>{proj.number}</span>
                      <span className="font-mono-story" style={{ fontSize: '0.58rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: accent }}>{proj.type}</span>
                    </div>

                    <h3 className={`mb-3 ${isDark ? 'font-space uppercase' : 'font-cormorant font-bold italic'}`}
                      style={{ fontSize: isDark ? '1.6rem' : '1.8rem', fontWeight: isDark ? 800 : 700, letterSpacing: isDark ? '-0.02em' : 'normal', color: 'var(--s-sand)', lineHeight: 1.1 }}>
                      {proj.name}
                    </h3>

                    <p className="font-cormorant" style={{ fontSize: '1rem', color: 'var(--s-sand-dim)', lineHeight: 1.7, display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {proj.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {proj.stack.map((tech, ti) => (
                        <span key={ti} className="font-mono-story"
                          style={{ fontSize: '0.58rem', padding: '0.25rem 0.6rem', border: '1px solid var(--s-border-mid)', borderRadius: '2px', color: 'var(--s-sand)' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 font-mono-story" style={{ fontSize: '0.65rem', color: accent, letterSpacing: '0.08em' }}>
                      <span>→</span><span>VIEW PROJECT</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Ghost card */}
            <div
              className="flex-shrink-0 flex flex-col items-center justify-center cursor-pointer"
              style={{
                width: '280px', height: '480px',
                border: '1px dashed var(--s-border-mid)',
                borderRadius: '4px',
                transition: 'border-color 0.3s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--s-gold-dim)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--s-border-mid)'}
              onClick={() => navigate('/projects')}
            >
              <span className="font-space uppercase" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--s-sand-dim)', letterSpacing: '0.12em' }}>
                VIEW ALL →
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function MobileLayout({ projects, navigate }: { projects: Project[]; navigate: any }) {
  const { isDark } = useTheme();
  const accents = ACCENT_COLORS;
  return (
    <div className="min-h-screen py-16 relative flex flex-col items-center"
      style={{ background: 'var(--s-bg)', padding: '4rem 1.5rem' }}>
      <div className="w-full max-w-md text-left mb-10">
        <span className="font-mono-story block mb-4"
          style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--s-sand-dim)' }}>
          Chapter 04 — Works
        </span>
        <h2 className="font-space uppercase"
          style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--s-sand)', lineHeight: 0.9 }}>
          SELECTED<br /><span className="text-outline-gold">WORKS</span>
        </h2>
      </div>
      <div className="flex flex-col gap-6 w-full max-w-md">
        {projects.map((proj, idx) => {
          const accent = accents[idx % accents.length];
          return (
            <div key={proj.id} onClick={() => navigate(proj.link)}
              className="relative overflow-hidden flex flex-col justify-between cursor-pointer"
              style={{
                height: '360px', background: 'var(--s-surface)',
                border: '1px solid var(--s-border-mid)', borderRadius: '4px', padding: '1.5rem',
              }}>
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: accent }} />
              <div className="absolute select-none pointer-events-none"
                style={{ bottom: '-0.1em', right: '-0.03em', fontSize: '7rem', fontWeight: 800, fontFamily: isDark ? "'Space Grotesk', sans-serif" : "'Cormorant Garamond', serif", fontStyle: isDark ? 'normal' : 'italic', color: 'transparent', WebkitTextStroke: '1px var(--s-border-mid)', lineHeight: 1 }}>
                {proj.number}
              </div>
              <div>
                <div className="flex justify-between mb-3">
                  <span className="font-mono-story" style={{ fontSize: '0.62rem', color: 'var(--s-sand-dim)' }}>{proj.number}</span>
                  <span className="font-mono-story" style={{ fontSize: '0.58rem', color: accent, textTransform: 'uppercase' }}>{proj.type}</span>
                </div>
                <h3 className={`mb-2 ${isDark ? 'font-space uppercase' : 'font-cormorant font-bold italic'}`}
                  style={{ fontSize: isDark ? '1.3rem' : '1.45rem', fontWeight: isDark ? 800 : 700, color: 'var(--s-sand)', lineHeight: 1.1 }}>{proj.name}</h3>
                <p className="font-cormorant" style={{ fontSize: '0.95rem', color: 'var(--s-sand-dim)', lineHeight: 1.65, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {proj.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {proj.stack.slice(0, 4).map((t, ti) => (
                  <span key={ti} className="font-mono-story" style={{ fontSize: '0.55rem', padding: '0.2rem 0.5rem', border: '1px solid var(--s-border-mid)', borderRadius: '2px', color: 'var(--s-sand)' }}>{t}</span>
                ))}
              </div>
            </div>
          );
        })}
        <div onClick={() => navigate('/projects')}
          className="flex items-center justify-center cursor-pointer"
          style={{ height: '100px', border: '1px dashed var(--s-border-mid)', borderRadius: '4px' }}>
          <span className="font-space uppercase" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--s-sand-dim)', letterSpacing: '0.1em' }}>VIEW ALL →</span>
        </div>
      </div>
    </div>
  );
}
