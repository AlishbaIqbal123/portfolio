import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getPersonalInfo } from '../../lib/api';
import { useTheme } from '../../hooks/useTheme';

export default function StoryAbout() {
  const { isDark } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  const [personal, setPersonal] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getPersonalInfo();
        if (data) setPersonal(data);
      } catch (err) {
        console.error('Failed to load about settings:', err);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const textItems = leftColRef.current?.querySelectorAll('.animate-text');
    const cardItems = rightColRef.current?.querySelectorAll('.stat-card-item');

    const textAnim = textItems ? gsap.fromTo(textItems,
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, stagger: 0.14, ease: 'power3.out',
        scrollTrigger: { trigger: leftColRef.current, start: 'top 80%' }
      }
    ) : null;

    const cardsAnim = cardItems ? gsap.fromTo(cardItems,
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: rightColRef.current, start: 'top 80%' }
      }
    ) : null;

    const lineAnim = dividerRef.current ? gsap.fromTo(dividerRef.current,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 1.2, ease: 'power2.out',
        scrollTrigger: { trigger: leftColRef.current, start: 'top 80%' }
      }
    ) : null;

    return () => {
      textAnim?.scrollTrigger?.kill(); textAnim?.kill();
      cardsAnim?.scrollTrigger?.kill(); cardsAnim?.kill();
      lineAnim?.scrollTrigger?.kill(); lineAnim?.kill();
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'var(--s-bg2)', padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 7rem)' }}
    >
      {/* Subtle texture lines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `repeating-linear-gradient(0deg, var(--s-border) 0px, var(--s-border) 1px, transparent 1px, transparent 80px)`,
        opacity: 0.3,
      }} />

      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-16 lg:gap-24 items-start relative z-10">

        {/* Left Column — Editorial Narrative */}
        <div ref={leftColRef} className="w-full lg:w-[55%] flex flex-col items-start text-left">
          {/* Eyebrow */}
          <span
            className="animate-text font-mono-story uppercase opacity-0 mb-5"
            style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: 'var(--s-sand-dim)' }}
          >
            Chapter 01 — Identity
          </span>

          {/* Section title */}
          <h2
            className={`animate-text mb-3 opacity-0 ${isDark ? 'font-space uppercase' : 'font-cormorant font-normal'}`}
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: isDark ? 800 : 400, letterSpacing: isDark ? '-0.03em' : 'normal', color: 'var(--s-sand)', lineHeight: 0.9 }}
          >
            WHO<br />
            {isDark ? (
              <span className="text-outline-gold" style={{ fontSize: '0.95em' }}>AM I</span>
            ) : (
              <span className="italic" style={{ color: 'var(--s-gold)', fontSize: '1.05em' }}>Am I</span>
            )}
          </h2>

          {/* Animated gold divider */}
          <div
            ref={dividerRef}
            className="mb-10 mt-2"
            style={{ height: '1px', width: '100%', background: 'linear-gradient(to right, var(--s-gold), transparent)' }}
          />

          {/* Quote block */}
          <blockquote
            className="animate-text font-cormorant italic opacity-0 mb-6"
            style={{
              fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
              color: 'var(--s-sand)',
              lineHeight: 1.65,
              borderLeft: '2px solid var(--s-gold)',
              paddingLeft: '1.5rem',
              fontWeight: 500,
            }}
          >
            "{personal?.bio?.paragraph1 || "I'm Alishba — a Software Engineering student at COMSATS University Islamabad, Vehari, building things at the intersection of full-stack engineering, mobile development, and AI. I believe great software is built with both precision and soul."}"
          </blockquote>

          <p
            className="animate-text font-cormorant opacity-0"
            style={{
              fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
              color: 'var(--s-sand-dim)',
              lineHeight: 1.85,
              paddingLeft: '1.5rem',
            }}
          >
            {personal?.bio?.paragraph2 || "My tools are React, Flutter, Node.js, and a healthy obsession with making things actually work beautifully. Currently seeking internships and full-time opportunities as I complete my degree in June 2027."}
          </p>
        </div>

        {/* Right Column — Stat Cards (clean outline grid) */}
        <div ref={rightColRef} className="w-full lg:w-[45%] flex flex-col justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">

            {[
              { value: 'BSE 2027', label: 'COMSATS University Islamabad' },
              { value: `📍 ${personal?.location || 'Vehari, Pakistan'}`, label: 'Available Remotely' },
              { value: 'Full Stack', label: 'Web · API · Databases' },
              { value: 'Mobile Dev', label: 'Flutter · Android' },
            ].map((card, i) => (
              <div
                key={i}
                className="stat-card-item opacity-0"
                style={{
                  background: 'var(--s-surface)',
                  border: '1px solid var(--s-border-mid)',
                  borderRadius: '4px',
                  padding: '1.4rem',
                  transition: 'all 0.3s',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--s-gold)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                  if (!isDark) {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(0,0,0,0.04)';
                  }
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--s-border-mid)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <div className={isDark ? "font-space" : "font-cormorant font-bold italic"} style={{ fontSize: isDark ? '1rem' : '1.18rem', fontWeight: isDark ? 600 : 700, color: 'var(--s-gold)', marginBottom: '0.5rem', lineHeight: 1.1 }}>
                  {card.value}
                </div>
                <div className="font-mono-story" style={{ fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--s-sand-dim)', lineHeight: 1.5 }}>
                  {card.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
