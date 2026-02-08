import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalData } from '@/data/personal';

function CountUp({
  end,
  duration = 2,
  suffix = '',
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { label: 'CGPA', value: 3.67, suffix: '/4.00', isDecimal: true },
  { label: 'Projects', value: 10, suffix: '+' },
  { label: 'Internships', value: 2, suffix: '+' },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-[#352208] relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-[#e1bb80] blur-3xl" />
        <div className="absolute bottom-20 right-40 w-48 h-48 rounded-full bg-[#7b6b43] blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-6"
          >
            {/* Section Label */}
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-[#e1bb80]" />
              <span className="text-[#e1bb80] text-sm font-medium tracking-wider uppercase">
                About Me
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-white font-['Playfair_Display']">
              Crafting Digital{' '}
              <span className="text-[#e1bb80]">Solutions</span>
            </h2>

            {/* Bio Paragraphs */}
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>{personalData.bio.paragraph1}</p>
              <p>{personalData.bio.paragraph2}</p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-3 gap-6 pt-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-[#e1bb80] font-['Playfair_Display']">
                    {stat.isDecimal ? (
                      <span>3.67{stat.suffix}</span>
                    ) : (
                      <CountUp end={stat.value} suffix={stat.suffix} />
                    )}
                  </div>
                  <div className="text-white/50 text-sm mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Decorative Frame */}
              <div className="absolute inset-0 border-2 border-[#7b6b43] rounded-2xl transform rotate-6" />
              <div className="absolute inset-0 border-2 border-[#e1bb80]/50 rounded-2xl transform -rotate-3" />

              {/* Main Content Card */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#806443]/30 to-[#685634]/20 rounded-2xl backdrop-blur-sm border border-[#7b6b43]/50 flex flex-col items-center justify-center p-8">
                {/* Code Icon Representation */}
                <div className="w-32 h-32 mb-6 relative">
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <svg
                      viewBox="0 0 120 120"
                      className="w-full h-full"
                      fill="none"
                    >
                      {/* Code brackets */}
                      <motion.path
                        d="M35 40L20 60L35 80"
                        stroke="#e1bb80"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={isInView ? { pathLength: 1 } : {}}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                      <motion.path
                        d="M85 40L100 60L85 80"
                        stroke="#e1bb80"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={isInView ? { pathLength: 1 } : {}}
                        transition={{ duration: 1, delay: 0.7 }}
                      />
                      {/* Slash */}
                      <motion.path
                        d="M55 85L65 35"
                        stroke="#7b6b43"
                        strokeWidth="4"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={isInView ? { pathLength: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.9 }}
                      />
                      {/* Decorative dots */}
                      <circle cx="60" cy="20" r="4" fill="#e1bb80" />
                      <circle cx="30" cy="95" r="3" fill="#7b6b43" />
                      <circle cx="90" cy="95" r="3" fill="#7b6b43" />
                    </svg>
                  </motion.div>
                </div>

                <h3 className="text-2xl font-bold text-[#e1bb80] font-['Playfair_Display'] mb-2">
                  Developer
                </h3>
                <p className="text-white/60 text-center text-sm">
                  Building the future, one line of code at a time
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  {['React', 'Flutter', 'Laravel', 'Node.js'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs bg-[#e1bb80]/10 border border-[#e1bb80]/30 rounded-full text-[#e1bb80]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
