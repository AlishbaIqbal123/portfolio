import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ThreeBackground from '../../components/story/ThreeBackground';
import { getPersonalInfo, getExperience } from '../../lib/api';
import { useTheme } from '../../hooks/useTheme';

interface StatChip {
  value: string;
  label: string;
}

const fallbackStats: StatChip[] = [
  { value: '12+', label: 'Projects Built' },
  { value: '02',  label: 'Internships'    },
  { value: '04',  label: 'Job Simulations'},
];

export default function StoryHero() {
  const { isDark } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const outlineHeadRef = useRef<HTMLDivElement>(null);
  const nameSolidRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const [personal, setPersonal] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const info = await getPersonalInfo();
        const experiences = await getExperience();
        const simsCount = experiences ? experiences.filter((e: any) => e.type === 'simulation').length : 4;
        setPersonal({
          name: info?.name || 'ALISHBA IQBAL',
          role: info?.tagline || 'Software Engineer & Full Stack Developer',
          stats: [
            { value: `${info?.stats?.projects || '12'}+`, label: 'Projects Built' },
            { value: `${info?.stats?.internships || '02'}`.padStart(2, '0'), label: 'Internships' },
            { value: `${simsCount}`.padStart(2, '0'), label: 'Job Simulations' }
          ]
        });
      } catch {
        setPersonal({ name: 'ALISHBA IQBAL', role: 'Software Engineer & Full Stack Developer', stats: fallbackStats });
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (loading || !personal) return;
    gsap.registerPlugin(ScrollTrigger);

    const items = textContainerRef.current?.querySelectorAll('.hero-item');
    if (!items) return;

    const tl = gsap.timeline();
    tl.fromTo(outlineHeadRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4, ease: 'power4.out' }
    );
    tl.fromTo(items,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, stagger: 0.12, ease: 'power3.out' },
      '-=0.9'
    );
    if (statsRef.current) {
      const chips = statsRef.current.querySelectorAll('.stat-chip');
      tl.fromTo(chips,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'back.out(1.3)' },
        '-=0.5'
      );
    }

    const scrollAnim = gsap.to(textContainerRef.current, {
      y: -50, opacity: 0,
      scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
    });

    return () => { tl.kill(); scrollAnim.scrollTrigger?.kill(); scrollAnim.kill(); };
  }, [loading, personal]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--s-bg)' }}>
        <div className="w-6 h-6 border border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--s-gold)' }} />
      </div>
    );
  }

  const nameParts = personal.name.split(' ');
  const firstName = nameParts[0] || 'ALISHBA';
  const lastName = nameParts.slice(1).join(' ') || 'IQBAL';

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center overflow-hidden select-none"
      style={{ background: 'var(--s-bg)' }}
    >
      {/* WebGL particles */}
      <ThreeBackground />

      {/* Warm tonal overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: 'radial-gradient(ellipse 60% 70% at 25% 55%, rgba(197,168,128,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Vertical text accent — far right, rotated */}
      <div
        className="absolute right-10 top-1/2 -translate-y-1/2 font-mono-story text-[0.55rem] tracking-[0.35em] uppercase select-none pointer-events-none"
        style={{ color: 'var(--s-sand-dim)', writingMode: 'vertical-rl', zIndex: 2 }}
      >
        SOFTWARE ENGINEER · FULL STACK
      </div>

      {/* Thin horizontal rule at 1/3 down */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{ top: '33%', height: '1px', background: 'var(--s-border)', zIndex: 2 }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[180px] pointer-events-none"
        style={{ zIndex: 3, background: 'linear-gradient(to bottom, transparent, var(--s-bg))' }}
      />

      {/* Main content */}
      <div
        ref={textContainerRef}
        className="relative w-full max-w-5xl flex flex-col items-start pl-6 md:pl-20 lg:pl-28"
        style={{ zIndex: 4 }}
      >
        {/* Eyebrow */}
        <span
          className="hero-item font-mono-story text-[0.6rem] tracking-[0.35em] uppercase mb-4 opacity-0"
          style={{ color: 'var(--s-sand-dim)' }}
        >
          Ch. 00 — Prologue
        </span>

        {/* Huge outlined heading (background kinetic layer - Dark Mode Only) */}
        {isDark && (
          <div ref={outlineHeadRef} className="relative w-full mb-0 opacity-0 overflow-visible" style={{ lineHeight: 1 }}>
            {/* Outline word behind */}
            <span
              className="font-space text-outline-dim absolute select-none pointer-events-none"
              style={{
                fontSize: 'clamp(5rem, 14vw, 13rem)',
                fontWeight: 800,
                top: '-0.08em',
                left: '-0.02em',
                letterSpacing: '-0.03em',
                whiteSpace: 'nowrap',
                WebkitTextStroke: '1px var(--s-sand-faint)',
                color: 'transparent',
              }}
            >
              {firstName}
            </span>
          </div>
        )}

        {/* Solid name */}
        <h1
          ref={nameSolidRef}
          className={`hero-item relative opacity-0 ${isDark ? 'font-space' : 'font-cormorant font-normal'}`}
          style={{
            fontSize: 'clamp(3.5rem, 9vw, 8.5rem)',
            fontWeight: isDark ? 800 : 400,
            letterSpacing: isDark ? '-0.03em' : 'normal',
            lineHeight: 0.92,
            color: 'var(--s-sand)',
            marginTop: isDark ? 'clamp(3rem, 6vw, 5.5rem)' : 'clamp(2.5rem, 5vw, 4rem)',
          }}
        >
          {firstName}
          <br />
          <span
            className="font-cormorant italic"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 7rem)',
              fontWeight: isDark ? 600 : 500,
              color: 'var(--s-gold)',
              letterSpacing: '0.02em',
              lineHeight: 1,
            }}
          >
            {lastName}
          </span>
        </h1>

        {/* Role */}
        <p
          className="hero-item font-cormorant italic opacity-0 mt-4 mb-8"
          style={{
            fontSize: 'clamp(1.1rem, 2.2vw, 1.6rem)',
            color: 'var(--s-sand-dim)',
            letterSpacing: '0.03em',
            maxWidth: '480px',
          }}
        >
          {personal.role}
        </p>

        {/* Stats */}
        <div ref={statsRef} className="flex gap-5 flex-wrap">
          {personal.stats.map((stat: StatChip, i: number) => (
            <div
              key={i}
              className="stat-chip opacity-0"
              style={{
                border: '1px solid var(--s-border-mid)',
                background: 'var(--s-surface)',
                borderRadius: '4px',
                padding: '0.7rem 1.2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.3rem',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--s-gold)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(197,168,128,0.08)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--s-border-mid)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <span className="font-space" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--s-gold)', lineHeight: 1 }}>
                {stat.value}
              </span>
              <span className="font-mono-story" style={{ fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--s-sand-dim)' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        style={{ zIndex: 5 }}
      >
        <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, transparent, var(--s-gold-dim))' }} />
        <span className="font-mono-story" style={{ fontSize: '0.5rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--s-sand-dim)' }}>
          SCROLL
        </span>
      </div>
    </div>
  );
}
