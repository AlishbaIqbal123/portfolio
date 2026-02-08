import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, GitCommit, FolderGit, Code2, ExternalLink } from 'lucide-react';
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
  { label: 'Repositories', value: 11, icon: FolderGit, suffix: '' },
  { label: 'Contributions', value: 472, icon: GitCommit, suffix: '+' },
  { label: 'Languages', value: 6, icon: Code2, suffix: '+' },
];

// Generate a mock contribution graph
const generateContributions = () => {
  const weeks = 52;
  const days = 7;
  const contributions = [];

  for (let w = 0; w < weeks; w++) {
    const week = [];
    for (let d = 0; d < days; d++) {
      // Random contribution level (0-4)
      const level = Math.floor(Math.random() * 5);
      week.push(level);
    }
    contributions.push(week);
  }

  return contributions;
};

const contributionColors = [
  'bg-[#352208]', // 0 - no contribution
  'bg-[#685634]/40', // 1 - low
  'bg-[#7b6b43]/60', // 2 - medium-low
  'bg-[#806443]/80', // 3 - medium-high
  'bg-[#e1bb80]', // 4 - high
];

export function GitHubStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const contributions = generateContributions();

  return (
    <section
      id="github"
      ref={sectionRef}
      className="section-padding bg-[#352208] relative overflow-hidden"
    >
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          {/* Section Label */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#e1bb80]" />
            <span className="text-[#e1bb80] text-sm font-medium tracking-wider uppercase">
              Activity
            </span>
            <div className="h-px w-12 bg-[#e1bb80]" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-white font-['Playfair_Display'] mb-4">
            GitHub <span className="text-[#e1bb80]">Stats</span>
          </h2>

          {/* Description */}
          <p className="text-white/60 max-w-2xl mx-auto">
            My open-source contributions and coding activity on GitHub.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-[#806443]/20 to-[#685634]/10 border border-[#7b6b43]/50 hover:border-[#e1bb80]/50 transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-[#e1bb80]/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-[#e1bb80]" />
                </div>
                <div className="text-4xl font-bold text-[#e1bb80] font-['Playfair_Display'] mb-2">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-white/60">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Contribution Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-[#806443]/20 to-[#685634]/10 border border-[#7b6b43]/50"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              Contribution Activity
            </h3>
            <span className="text-sm text-white/50">Last 52 weeks</span>
          </div>

          {/* Graph */}
          <div className="overflow-x-auto">
            <div className="flex gap-1 min-w-max">
              {contributions.map((week, weekIndex) => (
                <motion.div
                  key={weekIndex}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: weekIndex * 0.01 }}
                  className="flex flex-col gap-1"
                >
                  {week.map((level, dayIndex) => (
                    <motion.div
                      key={dayIndex}
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{
                        delay: weekIndex * 0.01 + dayIndex * 0.005,
                        duration: 0.2,
                      }}
                      className={`w-3 h-3 rounded-sm ${contributionColors[level]}`}
                      title={`${level} contributions`}
                    />
                  ))}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-2 mt-4 text-xs text-white/50">
            <span>Less</span>
            {contributionColors.slice(1).map((color, i) => (
              <div key={i} className={`w-3 h-3 rounded-sm ${color}`} />
            ))}
            <span>More</span>
          </div>
        </motion.div>

        {/* View Profile Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-8"
        >
          <motion.a
            href={personalData.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#e1bb80] text-[#352208] rounded-lg font-medium hover:bg-[#d4a85c] transition-colors duration-300"
          >
            <Github className="w-5 h-5" />
            View Full Profile
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
