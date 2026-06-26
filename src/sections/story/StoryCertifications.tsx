import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, X, ExternalLink } from 'lucide-react';
import { getCertifications } from '../../lib/api';
import { useTheme } from '../../hooks/useTheme';

interface Certification {
  id: string;
  name: string;
  issuer: string;
  issue_date: string;
  image_url: string;
  credential_id?: string;
  credential_url?: string;
  details: string;
  accentColor: string;
  icon: string;
  location: string;
}

export default function StoryCertifications() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getCertifications();
        setCertifications((data || []).map((item: any) => ({
          id: item.id,
          name: item.name,
          issuer: item.issuer,
          issue_date: item.issue_date,
          image_url: item.image_url || '',
          credential_id: item.credential_id || '',
          credential_url: item.credential_url || '',
          details: item.details || '',
          accentColor: item.accent_color || '#C5A880',
          icon: item.icon || '🏆',
          location: item.location || '',
        })));
      } catch (err) {
        console.error('Error fetching story certifications:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (loading || certifications.length === 0) return;
    gsap.registerPlugin(ScrollTrigger);
    const cards = gridRef.current?.querySelectorAll('.cert-card-item');
    if (!cards || cards.length === 0) return;
    const anim = gsap.fromTo(cards,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 82%' } }
    );
    return () => { anim.scrollTrigger?.kill(); anim.kill(); };
  }, [loading, certifications]);

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
      style={{ background: 'var(--s-bg2)', padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 7rem)' }}
    >
      {/* Faint horizontal lines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `repeating-linear-gradient(0deg, var(--s-border) 0px, var(--s-border) 1px, transparent 1px, transparent 80px)`,
        opacity: 0.25,
      }} />

      <div className="w-full max-w-5xl mx-auto flex flex-col relative z-10">
        {/* Section Header */}
        <div className="mb-14">
          <span className="font-mono-story uppercase block mb-4"
            style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: 'var(--s-sand-dim)' }}>
            Chapter 05 — Credentials
          </span>
          <h2 className={`mb-3 ${isDark ? 'font-space uppercase' : 'font-cormorant font-normal'}`}
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: isDark ? 800 : 400, letterSpacing: isDark ? '-0.03em' : 'normal', color: 'var(--s-sand)', lineHeight: 0.9 }}>
            CERTIFI<br />
            {isDark ? (
              <span className="text-outline-gold" style={{ fontSize: '0.9em' }}>CATIONS</span>
            ) : (
              <span className="italic" style={{ color: 'var(--s-gold)', fontSize: '0.95em' }}>cations</span>
            )}
          </h2>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid gap-5 grid-cols-1 md:grid-cols-2 w-full">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="cert-card-item opacity-0 flex flex-col"
              style={{
                background: 'var(--s-surface)',
                border: '1px solid var(--s-border-mid)',
                borderRadius: '4px',
                overflow: 'hidden',
                transition: 'border-color 0.3s, transform 0.3s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--s-gold-dim)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--s-border-mid)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              {/* Top accent */}
              <div style={{ height: '2px', background: cert.accentColor }} />

              {/* Certificate image */}
              {cert.image_url && (
                <div
                  onClick={() => setZoomImage(cert.image_url)}
                  className="w-full relative group cursor-zoom-in overflow-hidden"
                  style={{ aspectRatio: '16/9', background: 'var(--s-bg)' }}
                >
                  <img
                    src={cert.image_url}
                    alt={cert.name}
                    className="w-full h-full object-cover"
                    style={{ transition: 'transform 0.5s ease' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center"
                    style={{ background: 'rgba(10,10,9,0)', transition: 'background 0.3s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(10,10,9,0.45)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(10,10,9,0)'}>
                    <div style={{ padding: '0.5rem', border: '1px solid rgba(197,168,128,0.4)', borderRadius: '50%', color: 'var(--s-gold)', opacity: 0, transition: 'opacity 0.3s' }}
                      className="group-hover:opacity-100">
                      <ZoomIn size={16} />
                    </div>
                  </div>
                </div>
              )}

              <div style={{ padding: '1.4rem' }}>
                {/* Icon + Title */}
                <div className="flex items-start gap-3 mb-3">
                  <span style={{ fontSize: '1.2rem', lineHeight: 1, marginTop: '0.1rem' }}>{cert.icon}</span>
                  <div>
                    <h4 className={isDark ? "font-space uppercase" : "font-cormorant font-bold italic"}
                      style={{ fontSize: isDark ? '0.95rem' : '1.1rem', fontWeight: isDark ? 700 : 700, letterSpacing: isDark ? '0.02em' : 'normal', color: 'var(--s-sand)', lineHeight: 1.2, marginBottom: '0.3rem' }}>
                      {cert.name}
                    </h4>
                    <p className="font-mono-story"
                      style={{ fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--s-sand-dim)' }}>
                      {cert.issuer}{cert.location ? ` · ${cert.location}` : ''}
                    </p>
                  </div>
                </div>

                {cert.credential_id && (
                  <div className="font-mono-story mb-3"
                    style={{ fontSize: '0.52rem', color: 'var(--s-sand-dim)', background: 'var(--s-bg)', padding: '0.3rem 0.7rem', borderRadius: '2px', border: '1px solid var(--s-border)', display: 'inline-block' }}>
                    ID: {cert.credential_id}
                  </div>
                )}

                {cert.details && (
                  <p className="font-cormorant italic mb-4"
                    style={{ fontSize: '1rem', color: 'var(--s-sand-dim)', lineHeight: 1.65 }}>
                    {cert.details}
                  </p>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-3"
                  style={{ borderTop: '1px solid var(--s-border)' }}>
                  <span className="font-mono-story" style={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--s-gold)' }}>
                    {cert.issue_date}
                  </span>
                  {cert.credential_url && (
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 font-mono-story"
                      style={{ fontSize: '0.58rem', color: 'var(--s-sand-dim)', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', transition: 'color 0.25s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--s-gold)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--s-sand-dim)'}
                    >
                      Verify <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setZoomImage(null)}
            className="fixed inset-0 z-[3000] flex items-center justify-center p-4 cursor-zoom-out"
            style={{ background: 'rgba(10,10,9,0.92)', backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              className="relative max-w-4xl max-h-[85vh] overflow-hidden"
              style={{ borderRadius: '4px', border: '1px solid var(--s-border-mid)' }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <button
                onClick={() => setZoomImage(null)}
                className="absolute top-4 right-4 z-10 flex items-center justify-center cursor-pointer"
                style={{ width: '32px', height: '32px', background: 'var(--s-surface)', border: '1px solid var(--s-border-mid)', borderRadius: '2px', color: 'var(--s-sand)' }}
              >
                <X size={14} />
              </button>
              <img src={zoomImage} alt="Certificate" className="w-full h-auto max-h-[80vh] object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
