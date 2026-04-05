import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const hasMouse = window.matchMedia('(pointer: fine)').matches;
    if (!hasMouse) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, input, textarea, [role="button"], .hoverable');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] opacity-0 lg:opacity-100">
      {/* Outer Ring */}
      <motion.div
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 48 : 24,
          height: isHovering ? 48 : 24,
          borderWidth: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.4,
        }}
        transition={{ duration: 0.15, ease: "linear" }}
        className="fixed rounded-full border border-primary shadow-[0_0_15px_rgba(0,35,102,0.1)]"
      />

      {/* Inner Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 0.5 : 1,
          backgroundColor: isHovering ? '#D4AF37' : '#002366',
          opacity: isHovering ? 0.9 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="fixed w-2 h-2 rounded-full shadow-[0_0_10px_rgba(0,35,102,0.3)]"
      />
    </div>
  );
}
