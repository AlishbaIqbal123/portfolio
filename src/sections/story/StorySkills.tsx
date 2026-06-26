import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getSkillCategories } from '../../lib/api';
import { useTheme } from '../../hooks/useTheme';

const STATIC_SKILL_GROUPS = [
  { category: 'LANGUAGES',         skills: ['C++', 'Python', 'PHP', 'JavaScript', 'Dart', 'Java'] },
  { category: 'FRONTEND & MOBILE', skills: ['React.js', 'Flutter', 'Android Dev', 'HTML/CSS'] },
  { category: 'BACKEND & APIS',    skills: ['Node.js', 'Express.js', 'REST APIs', 'Stripe', 'Gemini AI'] },
  { category: 'DATABASES',         skills: ['MySQL', 'PostgreSQL', 'Firebase', 'SQLite', 'MongoDB'] },
  { category: 'TOOLS & PLATFORMS', skills: ['Git', 'GitHub', 'Jira', 'VS Code', 'Postman', 'Vercel'] },
  { category: 'ENGINEERING',       skills: ['Problem Solving', 'Full Stack Arch', 'Agile', 'Teamwork'] },
];

export default function StorySkills() {
  const { isDark } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const groupRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [skillGroups, setSkillGroups] = useState<any[]>(STATIC_SKILL_GROUPS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getSkillCategories();
        if (data && Array.isArray(data) && data.length > 0) {
          setSkillGroups(data.map((cat: any) => ({
            category: cat.title.toUpperCase(),
            skills: (cat.skills || []).map((s: any) => s.name),
          })));
        }
      } catch (err) {
        console.error('Failed to load skills:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (loading || skillGroups.length === 0) return;
    gsap.registerPlugin(ScrollTrigger);

    const cards = gridRef.current?.querySelectorAll('.skills-category-card');
    const cardsAnim = cards ? gsap.fromTo(cards,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%' }
      }
    ) : null;

    const chipAnims: gsap.core.Tween[] = [];
    skillGroups.forEach((_, i) => {
      const el = groupRefs.current[i];
      if (!el) return;
      const chips = el.querySelectorAll('.skill-chip');
      if (!chips.length) return;
      chipAnims.push(gsap.fromTo(chips,
        { scale: 0.88, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.04, duration: 0.45, ease: 'back.out(1.3)',
          scrollTrigger: { trigger: el, start: 'top 85%' }
        }
      ));
    });

    return () => {
      cardsAnim?.scrollTrigger?.kill(); cardsAnim?.kill();
      chipAnims.forEach(a => { a.scrollTrigger?.kill(); a.kill(); });
    };
  }, [loading, skillGroups]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--s-bg)' }}>
        <div className="w-6 h-6 border border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--s-gold)' }} />
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'var(--s-bg)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 7rem)',
      }}
    >
      {/* Dot grid background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, var(--s-border) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        opacity: 0.6,
      }} />

      <div className="w-full max-w-5xl mx-auto flex flex-col items-start text-left relative z-10">
        {/* Header */}
        <div className="mb-14">
          <span
            className="font-mono-story uppercase block mb-4"
            style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: 'var(--s-sand-dim)' }}
          >
            Chapter 02 — Arsenal
          </span>
          <h2
            className={`mb-3 ${isDark ? 'font-space uppercase' : 'font-cormorant font-normal'}`}
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: isDark ? 800 : 400, letterSpacing: isDark ? '-0.03em' : 'normal', color: 'var(--s-sand)', lineHeight: 0.9 }}
          >
            MY TECH
            <br />
            {isDark ? (
              <span className="text-outline-gold" style={{ fontSize: '0.9em' }}>STACK</span>
            ) : (
              <span className="italic" style={{ color: 'var(--s-gold)', fontSize: '1.02em' }}>Stack</span>
            )}
          </h2>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          {skillGroups.map((group: any, index: number) => (
            <div
              key={index}
              ref={el => { groupRefs.current[index] = el; }}
              className="skills-category-card opacity-0"
              style={{
                background: 'var(--s-surface)',
                border: '1px solid var(--s-border-mid)',
                borderRadius: '4px',
                padding: '1.5rem',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--s-gold-dim)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 28px rgba(197,168,128,0.06)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--s-border-mid)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              {/* Category label */}
              <span
                className={`block mb-4 ${isDark ? 'font-space' : 'font-cormorant font-bold italic'}`}
                style={{ fontSize: isDark ? '0.65rem' : '0.85rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--s-gold)' }}
              >
                {group.category}
              </span>

              {/* Chips */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill: string, si: number) => (
                  <span
                    key={si}
                    className="skill-chip font-mono-story opacity-0"
                    style={{
                      fontSize: '0.62rem',
                      padding: '0.3rem 0.75rem',
                      border: '1px solid var(--s-border-mid)',
                      borderRadius: '2px',
                      color: 'var(--s-sand)',
                      background: 'transparent',
                      transition: 'border-color 0.25s, color 0.25s',
                      cursor: 'default',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--s-gold)';
                      (e.currentTarget as HTMLElement).style.color = 'var(--s-gold)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--s-border-mid)';
                      (e.currentTarget as HTMLElement).style.color = 'var(--s-sand)';
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
