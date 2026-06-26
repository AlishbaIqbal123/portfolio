import React, { useRef, useState, useEffect } from 'react';
import { useStoryScroll } from '../components/story/useStoryScroll';
import StoryNav from '../components/story/StoryNav';
import AnimeCharacter from '../components/story/AnimeCharacter';
import { getCertifications } from '@/lib/api';

// Safe lazy helper to handle chunk loading failures (e.g. after a new deployment)
const safeLazy = (importFn: () => Promise<any>) => {
  return React.lazy(() => 
    importFn().catch((err) => {
      console.warn("Dynamic import failed, forcing reload to fetch latest deployment:", err);
      window.location.reload();
      return { default: () => null };
    })
  );
};

// Dynamic lazy imports for all story sections
const StoryPreloader   = safeLazy(() => import('../sections/story/StoryPreloader'));
const StoryHero        = safeLazy(() => import('../sections/story/StoryHero'));
const StoryAbout       = safeLazy(() => import('../sections/story/StoryAbout'));
const StorySkills      = safeLazy(() => import('../sections/story/StorySkills'));
const StoryExperience  = safeLazy(() => import('../sections/story/StoryExperience'));
const StoryProjects    = safeLazy(() => import('../sections/story/StoryProjects'));
const StoryCertifications = safeLazy(() => import('../sections/story/StoryCertifications'));
const StoryContact     = safeLazy(() => import('../sections/story/StoryContact'));

export default function StoryPage() {
  const [loading, setLoading] = useState(true);
  const [hasCerts, setHasCerts] = useState(false);

  // Refs for each chapter section
  const heroRef   = useRef<HTMLDivElement>(null);
  const aboutRef  = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const expRef    = useRef<HTMLDivElement>(null);
  const projRef   = useRef<HTMLDivElement>(null);
  const certRef   = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Check certifications count to conditionally enable the credentials chapter
  useEffect(() => {
    async function checkCertifications() {
      try {
        const certs = await getCertifications();
        setHasCerts(certs && certs.length > 0);
      } catch (err) {
        console.error('Error fetching certifications for story check:', err);
      }
    }
    checkCertifications();
  }, []);

  const chapters = [
    { id: 'hero', name: 'PROLOGUE', ref: heroRef },
    { id: 'about', name: 'IDENTITY', ref: aboutRef },
    { id: 'skills', name: 'ARSENAL', ref: skillsRef },
    { id: 'experience', name: 'CHRONICLES', ref: expRef },
    { id: 'projects', name: 'WORKS', ref: projRef },
    ...(hasCerts ? [{ id: 'certifications', name: 'CREDENTIALS', ref: certRef }] : []),
    { id: 'contact', name: 'CONNECT', ref: contactRef },
  ];

  const { activeChapter, scrollProgress, registerChapter, scrollToChapter } =
    useStoryScroll(chapters.length);

  // Register each chapter with the scroll hook once refs mount
  useEffect(() => {
    if (!loading) {
      registerChapter(heroRef.current, 'hero');
      registerChapter(aboutRef.current, 'about');
      registerChapter(skillsRef.current, 'skills');
      registerChapter(expRef.current, 'experience');
      registerChapter(projRef.current, 'projects');
      if (hasCerts) {
        registerChapter(certRef.current, 'certifications');
      }
      registerChapter(contactRef.current, 'contact');
    }
  }, [loading, hasCerts]);

  return (
    <div
      className="relative"
      style={{ background: 'var(--s-bg)', minHeight: '100vh', overflowX: 'hidden' }}
    >
      {/* Preloader — hides itself after 2.5s and calls onComplete */}
      {loading && (
        <React.Suspense fallback={null}>
          <StoryPreloader onComplete={() => setLoading(false)} />
        </React.Suspense>
      )}

      {/* Side navigation */}
      {!loading && (
        <StoryNav
          activeChapter={activeChapter}
          scrollProgress={scrollProgress}
          scrollToChapter={scrollToChapter}
          chapters={chapters}
        />
      )}

      {/* Film grain noise overlay */}
      <div className="film-grain" />

      {/* Persistent floating character */}
      {!loading && (
        <AnimeCharacter activeChapter={activeChapter} scrollProgress={scrollProgress} />
      )}

      {/* Story sections — all on one page, stacked vertically */}
      <React.Suspense fallback={null}>
        <div ref={heroRef}>   <StoryHero /> </div>
        <div ref={aboutRef}>  <StoryAbout /> </div>
        <div ref={skillsRef}> <StorySkills /> </div>
        <div ref={expRef}>    <StoryExperience /> </div>
        <div ref={projRef}>   <StoryProjects /> </div>
        {hasCerts && <div ref={certRef}>   <StoryCertifications /> </div>}
        <div ref={contactRef}><StoryContact /> </div>
      </React.Suspense>
    </div>
  );
}
