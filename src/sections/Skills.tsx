import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Code2,
  Layers,
  Database,
  Wrench,
  Brain,
  type LucideIcon,
} from 'lucide-react';
import { skillCategories } from '@/data/skills';

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Layers,
  Database,
  Wrench,
  Brain,
};

function SkillCard({
  category,
  index,
}: {
  category: (typeof skillCategories)[0];
  index: number;
}) {
  const Icon = iconMap[category.icon] || Code2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative"
    >
      <div className="relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#806443]/20 to-[#685634]/10 border border-[#7b6b43]/50 backdrop-blur-sm hover:border-[#e1bb80]/50 transition-all duration-300 h-full">
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-[#e1bb80]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
            className="w-14 h-14 rounded-xl bg-[#e1bb80]/10 flex items-center justify-center mb-5 group-hover:bg-[#e1bb80]/20 transition-colors duration-300"
          >
            <Icon className="w-7 h-7 text-[#e1bb80]" />
          </motion.div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white font-['Playfair_Display'] mb-4">
            {category.title}
          </h3>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <motion.span
                key={skill}
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1.5 text-sm bg-[#352208]/50 border border-[#7b6b43]/50 rounded-lg text-white/80 hover:border-[#e1bb80]/50 hover:text-[#e1bb80] transition-colors duration-300 cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-padding bg-[#352208] relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #e1bb80 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

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
            <div className="h-px w-12 bg-[#e1bb80]" />
            <span className="text-[#e1bb80] text-sm font-medium tracking-wider uppercase">
              Expertise
            </span>
            <div className="h-px w-12 bg-[#e1bb80]" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-white font-['Playfair_Display'] mb-4">
            Skills & <span className="text-[#e1bb80]">Technologies</span>
          </h2>

          {/* Description */}
          <p className="text-white/60 max-w-2xl mx-auto">
            A comprehensive toolkit of technologies and concepts I've mastered through academic projects and professional experience.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.id} category={category} index={index} />
          ))}
        </div>

        {/* Bottom Decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center mt-12"
        >
          <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#e1bb80]/10 border border-[#e1bb80]/30">
            <span className="w-2 h-2 rounded-full bg-[#e1bb80] animate-pulse" />
            <span className="text-[#e1bb80] text-sm">
              Always learning new technologies
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
