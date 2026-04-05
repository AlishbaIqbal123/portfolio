import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, GraduationCap, Monitor, Calendar } from 'lucide-react';
import { experienceData } from '@/data/experience';

const typeIcons = {
  work: Briefcase,
  education: GraduationCap,
  simulation: Monitor,
};

const typeColors = {
  work: 'bg-[var(--primary)]',
  education: 'bg-[var(--accent)]',
  simulation: 'bg-emerald-500',
};

function TimelineItem({
  item,
  index,
  isLeft,
}: {
  item: (typeof experienceData)[0];
  index: number;
  isLeft: boolean;
}) {
  const Icon = typeIcons[item.type];
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      className={`relative flex items-start gap-4 md:gap-8 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      } flex-col md:items-center`}
    >
      {/* Content Card */}
      <div
        className={`flex-1 ${
          isLeft ? 'md:text-right' : 'md:text-left'
        } w-full`}
      >
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
          className="p-6 rounded-xl bg-card/60 backdrop-blur-md border-2 border-foreground/5 hover:border-[var(--primary)]/50 transition-all duration-300 shadow-xl"
        >
          {/* Date Badge */}
          <div
            className={`flex items-center gap-2 mb-3 ${
              isLeft ? 'md:justify-end' : 'justify-start'
            }`}
          >
            <Calendar className="w-4 h-4 text-[var(--primary)]" />
            <span className="text-[var(--primary)] text-sm font-black uppercase tracking-widest italic">
              {item.date}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-black text-foreground drop-shadow-sm uppercase tracking-tighter italic mb-1">
            {item.title}
          </h3>

          {/* Organization */}
          <p className="text-[var(--primary)] font-black uppercase tracking-widest text-[11px] mb-3 italic">
            {item.organization}
            {item.location && (
              <span className="text-foreground/30"> • {item.location}</span>
            )}
          </p>

          {/* Description */}
          <ul
            className={`space-y-2 ${
              isLeft ? 'md:text-right' : 'text-left'
            }`}
          >
            {item.description.map((desc, i) => (
              <li
                key={i}
                className="text-foreground/50 text-[11px] font-black uppercase tracking-widest leading-relaxed flex items-start gap-3 italic"
              >
                <span
                  className={`w-2 h-2 rounded-full bg-[var(--primary)] mt-1.5 flex-shrink-0 shadow-sm ${
                    isLeft ? 'md:order-last' : ''
                  }`}
                />
                <span>{desc}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Timeline Center */}
      <div className="relative flex flex-col items-center">
        {/* Icon Circle */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
          className={`w-12 h-12 rounded-full ${typeColors[item.type]} flex items-center justify-center z-10 shadow-lg border-2 border-background`}
        >
          <Icon className="w-5 h-5 text-[hsl(var(--primary-foreground))]" />
        </motion.div>

        {/* Connector Line */}
        {index < experienceData.length - 1 && (
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
            className="absolute top-12 w-0.5 bg-gradient-to-b from-[#7b6b43] to-[#7b6b43]/20"
            style={{ height: 'calc(100% + 2rem)' }}
          />
        )}
      </div>

      {/* Empty Space for Alternating Layout */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-padding bg-background relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-foreground/5 to-transparent" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          {/* Section Label */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-1 w-12 bg-[var(--primary)] rounded-full" />
            <span className="text-[var(--primary)] text-[11px] font-black tracking-[0.4em] uppercase italic">
              Journey
            </span>
            <div className="h-1 w-12 bg-[var(--primary)] rounded-full" />
          </div>

          {/* Heading */}
          <h2 className="text-5xl md:text-7xl font-black text-foreground drop-shadow-sm uppercase italic tracking-tighter mb-4">
            Experience & <span className="text-[var(--primary)] stroke-text">Education</span>
          </h2>

          <p className="text-foreground/50 max-w-2xl mx-auto font-black uppercase tracking-widest text-[11px] italic">
            My professional journey through internships, virtual simulations, and academic achievements.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative space-y-8 md:space-y-0">
          {experienceData.map((item, index) => (
            <div key={item.id} className="md:py-4">
              <TimelineItem
                item={item}
                index={index}
                isLeft={index % 2 === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
