import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getExperience } from '../../lib/api';
import { useTheme } from '../../hooks/useTheme';


interface ExperienceEntry {
  period: string;
  role: string;
  company: string;
  location: string;
  type: string;
  bullets: string[];
  chips: string[];
}

const STATIC_ENTRIES: ExperienceEntry[] = [
  {
    period: 'AUG 2025 – SEP 2025',
    role: 'Frontend Intern',
    company: 'Tkxel',
    location: 'Lahore, Pakistan',
    type: 'INTERNSHIP',
    bullets: [
      'Enhanced 10+ high-fidelity landing pages and newsletter layouts.',
      'Improved cross-browser compatibility by 20%.',
      '97% alignment with UI/UX design specifications.',
    ],
    chips: ['HTML/CSS', 'JavaScript', 'UI/UX'],
  },
  {
    period: 'JAN 2026 – MAR 2026',
    role: 'React.JS Intern',
    company: 'Internee.pk',
    location: 'Remote',
    type: 'INTERNSHIP',
    bullets: [
      'Built 7+ production-level tasks including an AI-powered resume analyzer.',
      'Developed a full-stack E-commerce platform with Stripe payments.',
      'Built a persistent AI chatbot using Google Gemini APIs.',
    ],
    chips: ['React.js', 'Node.js', 'Gemini AI', 'Stripe'],
  },
  {
    period: 'OCT 2025 – FEB 2026',
    role: 'Virtual Job Simulations',
    company: 'Forage',
    location: 'Remote',
    type: 'SIMULATION',
    bullets: [
      'Mastercard: Identified 15+ critical phishing vulnerabilities.',
      'AWS: Designed scalable architecture using Elastic Beanstalk.',
      'Citi: Built real-time credit risk visualization tool in Java.',
      'Electronic Arts: Optimized C++ data structures and designed UML diagrams.',
    ],
    chips: ['Mastercard', 'AWS', 'Citi', 'Electronic Arts'],
  },
];

export default function StoryExperience() {
  const { isDark } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackLineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [entries, setEntries] = useState<ExperienceEntry[]>(STATIC_ENTRIES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getExperience();
        if (data && Array.isArray(data) && data.length > 0) {
          setEntries(data.map((item: any) => ({
            period: (item.duration || '').toUpperCase(),
            role: item.role,
            company: item.company,
            location: item.location || '',
            type: (item.type || 'internship').toUpperCase(),
            bullets: typeof item.description === 'string'
              ? item.description.split('\n').filter(Boolean)
              : Array.isArray(item.description) ? item.description : [],
            chips: item.points || [],
          })));
        }
      } catch (err) {
        console.error('Failed to load experiences:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (loading || entries.length === 0) return;
    gsap.registerPlugin(ScrollTrigger);

    const animations: gsap.core.Tween[] = [];

    const lineAnim = gsap.fromTo(trackLineRef.current,
      { height: '0%' },
      {
        height: 'calc(100% - 100px)',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          end: 'bottom 65%',
          scrub: true,
        }
      }
    );
    animations.push(lineAnim);

    entries.forEach((_, i) => {
      const cardEl = cardRefs.current[i];
      const nodeEl = nodeRefs.current[i];
      if (!cardEl || !nodeEl) return;

      animations.push(gsap.fromTo(cardEl,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: cardEl, start: 'top 80%' }
        }
      ));

      animations.push(gsap.fromTo(nodeEl,
        { scale: 0 },
        { scale: 1, duration: 0.5, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: nodeEl, start: 'top 75%' }
        }
      ));
    });

    return () => {
      animations.forEach(a => { a.scrollTrigger?.kill(); a.kill(); });
    };
  }, [loading, entries]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--s-bg2)' }}>
        <div className="w-6 h-6 border border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--s-gold)' }} />
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'var(--s-bg2)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 7rem)',
      }}
    >
      <div className="w-full max-w-4xl mx-auto relative flex flex-col items-start text-left">

        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono-story uppercase block mb-4"
            style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: 'var(--s-sand-dim)' }}>
            Chapter 03 — Chronicles
          </span>
          <h2 className={`mb-3 ${isDark ? 'font-space uppercase' : 'font-cormorant font-normal'}`}
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: isDark ? 800 : 400, letterSpacing: isDark ? '-0.03em' : 'normal', color: 'var(--s-sand)', lineHeight: 0.9 }}>
            EXPERIENCE
            <br />
            {isDark ? (
              <span className="text-outline-gold" style={{ fontSize: '0.7em' }}>&amp; WORK</span>
            ) : (
              <span className="italic" style={{ color: 'var(--s-gold)', fontSize: '0.78em' }}>&amp; Work</span>
            )}
          </h2>
        </div>

        {/* Timeline track — background grey line */}
        <div
          className="absolute"
          style={{
            top: '160px', bottom: '40px',
            left: 'clamp(1.5rem, 3vw, 3.5rem)',
            width: '1px',
            background: 'var(--s-border-mid)',
            zIndex: 0,
          }}
        />

        {/* Animated gold fill line */}
        <div
          ref={trackLineRef}
          className="absolute origin-top"
          style={{
            top: '160px',
            left: 'clamp(1.5rem, 3vw, 3.5rem)',
            width: '1px',
            height: '0%',
            background: 'linear-gradient(to bottom, var(--s-gold), var(--s-gold-dim))',
            zIndex: 1,
          }}
        />

        {/* Timeline Entries */}
        <div className="w-full flex flex-col gap-12 relative z-10"
          style={{ paddingLeft: 'clamp(3rem, 6vw, 6rem)' }}>
          {entries.map((entry, index) => (
            <div key={index} className="relative" style={{ minHeight: '100px' }}>

              {/* Diamond node */}
              <div
                ref={el => { nodeRefs.current[index] = el; }}
                className="absolute"
                style={{
                  left: 'clamp(-2.7rem, -4.5vw, -4.2rem)',
                  top: '38px',
                  width: '10px',
                  height: '10px',
                  transform: 'rotate(45deg) scale(0)',
                  background: 'var(--s-gold)',
                  border: '1px solid var(--s-bg2)',
                  zIndex: 2,
                }}
              />

              {/* Period */}
              <span className="font-mono-story block mb-2"
                style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--s-gold)' }}>
                {entry.period}
              </span>

              {/* Card */}
              <div
                ref={el => { cardRefs.current[index] = el; }}
                className="opacity-0"
                style={{
                  background: 'var(--s-surface)',
                  borderLeft: '2px solid var(--s-gold-dim)',
                  borderTop: '1px solid var(--s-border-mid)',
                  borderRight: '1px solid var(--s-border-mid)',
                  borderBottom: '1px solid var(--s-border-mid)',
                  borderRadius: '0 4px 4px 0',
                  padding: '1.4rem 1.6rem',
                  transition: 'border-left-color 0.3s',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderLeftColor = 'var(--s-gold)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderLeftColor = 'var(--s-gold-dim)'}
              >
                {/* Type badge */}
                <span className="font-mono-story"
                  style={{
                    fontSize: '0.52rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: 'var(--s-sand-dim)', border: '1px solid var(--s-border-mid)',
                    padding: '0.2rem 0.6rem', borderRadius: '2px',
                    float: 'right', marginLeft: '1rem',
                  }}>
                  {entry.type}
                </span>

                {/* Role */}
                <h3 className={isDark ? "font-space" : "font-cormorant font-bold italic"}
                  style={{ fontSize: isDark ? 'clamp(1rem, 1.8vw, 1.3rem)' : 'clamp(1.15rem, 2vw, 1.45rem)', fontWeight: isDark ? 700 : 700, color: 'var(--s-sand)', marginBottom: '0.3rem' }}>
                  {entry.role}
                </h3>

                {/* Company & Location */}
                <span className="font-cormorant italic block mb-5"
                  style={{ fontSize: '1.05rem', color: 'var(--s-sand-dim)' }}>
                  {entry.company} · {entry.location}
                </span>

                {/* Bullets */}
                <ul className="list-none pl-0 flex flex-col gap-2 mb-5">
                  {entry.bullets.map((bullet, bi) => (
                    <li key={bi} className="flex items-start gap-3"
                      style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1rem)', color: 'var(--s-sand-dim)', lineHeight: 1.65, fontFamily: "'Cormorant Garamond', serif" }}>
                      <span style={{ color: 'var(--s-gold)', fontSize: '0.6rem', marginTop: '0.35rem', flexShrink: 0 }}>◆</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Chips */}
                <div className="flex flex-wrap gap-2">
                  {entry.chips.map((chip, ci) => (
                    <span key={ci} className="font-mono-story"
                      style={{
                        fontSize: '0.6rem', padding: '0.25rem 0.65rem',
                        border: '1px solid var(--s-border-mid)',
                        borderRadius: '2px',
                        color: 'var(--s-sand)', background: 'transparent',
                        transition: 'border-color 0.25s, color 0.25s', cursor: 'default',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = 'var(--s-gold-dim)';
                        (e.currentTarget as HTMLElement).style.color = 'var(--s-gold)';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = 'var(--s-border-mid)';
                        (e.currentTarget as HTMLElement).style.color = 'var(--s-sand)';
                      }}>
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
