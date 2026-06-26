import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export function useStoryScroll(chapterCount: number) {
  const [activeChapter, setActiveChapter] = useState<string>('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Init Lenis
    const lenis = new Lenis({ lerp: 0.08 });
    lenisRef.current = lenis;

    // Connect Lenis to GSAP ticker
    const tickHandler = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickHandler);
    gsap.ticker.lagSmoothing(0);

    // Track overall scroll progress
    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => setScrollProgress(self.progress),
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickHandler);
      trigger.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Call this from each chapter section to register it
  const registerChapter = (el: HTMLElement | null, id: string) => {
    if (!el) return;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 60%',
      onEnter:     () => setActiveChapter(id),
      onEnterBack: () => setActiveChapter(id),
    });
  };

  // Smooth scroll to any chapter element
  const scrollToChapter = (el: HTMLElement | null) => {
    if (!el || !lenisRef.current) return;
    lenisRef.current.scrollTo(el, {
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  return { activeChapter, scrollProgress, registerChapter, scrollToChapter };
}
