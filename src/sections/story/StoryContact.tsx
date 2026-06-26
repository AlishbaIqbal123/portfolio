import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getPersonalInfo } from '../../lib/api';
import { useTheme } from '../../hooks/useTheme';

export default function StoryContact() {
  const { isDark } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [personal, setPersonal] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getPersonalInfo();
        if (data) setPersonal(data);
      } catch (err) {
        console.error('Failed to load contact settings:', err);
      }
    }
    loadData();
  }, []);

  const handleCopyEmail = () => {
    const email = personal?.email || 'i.alishba1342@gmail.com';
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const titleItems = titleRef.current?.querySelectorAll('.title-item');
    const tl = titleItems ? gsap.fromTo(titleItems,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 80%' } }
    ) : null;

    const cards = cardsContainerRef.current?.querySelectorAll('.contact-link-card');
    const cardsAnim = cards ? gsap.fromTo(cards,
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: cardsContainerRef.current, start: 'top 80%' } }
    ) : null;

    return () => {
      tl?.scrollTrigger?.kill(); tl?.kill();
      cardsAnim?.scrollTrigger?.kill(); cardsAnim?.kill();
    };
  }, []);

  const email = personal?.email || 'i.alishba1342@gmail.com';
  const linkedin = personal?.linkedin || 'https://linkedin.com/in/alishba-iqbal-a667b6263';
  const github = personal?.github || 'https://github.com/AlishbaIqbal123';

  const contactLinks = [
    {
      label: 'Email',
      handle: email,
      href: `mailto:${email}`,
      action: handleCopyEmail,
      actionLabel: copied ? 'Copied!' : 'Copy',
    },
    {
      label: 'LinkedIn',
      handle: linkedin.split('/').filter(Boolean).pop() || 'Connect',
      href: linkedin,
      actionLabel: 'Open →',
    },
    {
      label: 'GitHub',
      handle: github.split('/').filter(Boolean).pop() || 'Code',
      href: github,
      actionLabel: 'View →',
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'var(--s-bg)', padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 4rem)' }}
    >
      {/* Subtle ambient glows */}
      <div className="absolute pointer-events-none"
        style={{ width: '600px', height: '600px', left: '-200px', top: '50%', transform: 'translateY(-50%)', background: 'radial-gradient(circle, rgba(197,168,128,0.04) 0%, transparent 60%)', borderRadius: '50%' }} />
      <div className="absolute pointer-events-none"
        style={{ width: '400px', height: '400px', right: '-100px', bottom: '-100px', background: 'radial-gradient(circle, rgba(197,168,128,0.03) 0%, transparent 60%)', borderRadius: '50%' }} />

      <div className="relative flex flex-col items-center w-full max-w-2xl z-10 text-center">
        {/* Eyebrow */}
        <span className="font-mono-story uppercase mb-8"
          style={{ fontSize: '0.6rem', letterSpacing: '0.35em', color: 'var(--s-sand-dim)', display: 'block' }}>
          Chapter 06 — Connect
        </span>

        {/* Massive heading */}
        <div ref={titleRef} className="mb-12 select-none">
          {isDark ? (
            <>
              <div className="title-item font-space uppercase opacity-0"
                style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--s-sand)', lineHeight: 0.88 }}>
                LET'S
              </div>
              <div className="title-item font-space uppercase opacity-0 text-outline-gold"
                style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.88 }}>
                BUILD
              </div>
              <div className="title-item font-cormorant italic opacity-0"
                style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', fontWeight: 600, letterSpacing: '0.02em', color: 'var(--s-gold)', lineHeight: 1.1, marginTop: '0.2em' }}>
                Something Remarkable
              </div>
            </>
          ) : (
            <>
              <div className="title-item font-cormorant italic opacity-0"
                style={{ fontSize: 'clamp(3.5rem, 8vw, 6.5rem)', fontWeight: 300, color: 'var(--s-sand)', lineHeight: 0.95 }}>
                Let's Build
              </div>
              <div className="title-item font-cormorant italic opacity-0"
                style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', fontWeight: 400, letterSpacing: '0.01em', color: 'var(--s-gold)', lineHeight: 1.1, marginTop: '0.1em' }}>
                something remarkable
              </div>
            </>
          )}
        </div>

        {/* Thin divider */}
        <div style={{ width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, var(--s-border-mid), transparent)', marginBottom: '2.5rem' }} />

        {/* Contact link cards */}
        <div ref={cardsContainerRef} className="flex flex-wrap justify-center gap-4 w-full mb-10">
          {contactLinks.map((link, i) => (
            <div
              key={i}
              className="contact-link-card opacity-0 flex flex-col items-start text-left"
              style={{
                background: 'var(--s-surface)',
                border: '1px solid var(--s-border-mid)',
                borderRadius: '4px',
                padding: '1.2rem 1.4rem',
                minWidth: '160px',
                flex: '1 1 160px',
                maxWidth: '220px',
                transition: 'border-color 0.3s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--s-gold-dim)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--s-border-mid)'}
            >
              <span className="font-mono-story uppercase block mb-2"
                style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--s-gold)' }}>
                {link.label}
              </span>
              <span className="font-cormorant block mb-4"
                style={{ fontSize: '0.95rem', color: 'var(--s-sand-dim)', wordBreak: 'break-all', lineHeight: 1.4 }}>
                {link.handle}
              </span>
              {link.action ? (
                <button
                  onClick={link.action}
                  className="font-mono-story uppercase"
                  style={{ fontSize: '0.58rem', letterSpacing: '0.12em', color: 'var(--s-sand)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'color 0.25s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--s-gold)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--s-sand)'}
                >
                  {link.actionLabel}
                </button>
              ) : (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono-story uppercase"
                  style={{ fontSize: '0.58rem', letterSpacing: '0.12em', color: 'var(--s-sand)', textDecoration: 'none', transition: 'color 0.25s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--s-gold)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--s-sand)'}
                >
                  {link.actionLabel}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Availability badge */}
        <div className="flex items-center gap-2.5 mb-14"
          style={{ border: '1px solid var(--s-border-mid)', borderRadius: '20px', padding: '0.5rem 1.3rem' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4ade80', animation: 'pulse 2s infinite', flexShrink: 0 }} />
          <span className="font-mono-story" style={{ fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--s-sand-dim)' }}>
            Available for Internships & Opportunities
          </span>
        </div>

        {/* Footer row */}
        <div className="flex justify-between items-center w-full pt-5"
          style={{ borderTop: '1px solid var(--s-border)' }}>
          <span className="font-mono-story" style={{ fontSize: '0.55rem', color: 'var(--s-sand-dim)', letterSpacing: '0.08em' }}>
            © 2026 Alishba Iqbal
          </span>
          <button
            onClick={handleScrollToTop}
            className="font-mono-story uppercase"
            style={{ fontSize: '0.58rem', letterSpacing: '0.12em', color: 'var(--s-sand-dim)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.25s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--s-gold)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--s-sand-dim)'}
          >
            ↑ Back to top
          </button>
        </div>
      </div>
    </div>
  );
}
