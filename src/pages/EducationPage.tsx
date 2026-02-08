import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Star, TrendingUp, Sparkles, Trophy } from 'lucide-react';

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  date: string;
  status: 'ongoing' | 'completed';
  details: string[];
  achievements?: string[];
  cgpa?: string;
}

const educationData: EducationItem[] = [
  {
    id: 'comsats',
    degree: 'Bachelor of Science in Software Engineering',
    institution: 'COMSATS University Islamabad',
    location: 'Vehari Campus, Pakistan',
    date: '2023 - 2027 (Expected)',
    status: 'ongoing',
    details: [
      'Focused on software development, system design, and problem-solving',
      'Advanced coursework in Algorithms, Data Structures, and Database Systems',
      'Contributing to research-oriented academic software projects',
    ],
    achievements: [
      'Consistent academic performance',
      'Dean\'s List recognition',
    ],
    cgpa: '3.64/4.00',
  },
  {
    id: 'intermediate',
    degree: 'Intermediate (Pre-Engineering)',
    institution: 'Punjab Group of Colleges',
    location: 'Vehari, Pakistan',
    date: '2021 - 2023',
    status: 'completed',
    details: [
      'Strong foundation in mathematical methods and physical sciences',
      'Developed early analytical and logical thinking skills',
    ],
  },
  {
    id: 'matric',
    degree: 'Matriculation',
    institution: 'Punjab Group of Colleges',
    location: 'Vehari, Pakistan',
    date: '2019 - 2021',
    status: 'completed',
    details: [
      'Primary science curriculum with focus on computer fundamentals',
      'Graduated with distinctions in core science subjects',
    ],
  },
];

const certifications = [
  {
    name: 'Technology Software Development',
    provider: 'Citi (Forage)',
    date: 'October 2025',
    icon: Trophy,
  },
  {
    name: 'Software Engineering Visualization',
    provider: 'Electronic Arts (Forage)',
    date: 'October 2025',
    icon: Award,
  },
  {
    name: 'Solutions Architecture Foundation',
    provider: 'AWS (Forage)',
    date: 'November 2025',
    icon: Sparkles,
  },
];

function EducationCard({ item, index }: { item: EducationItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="p-1 rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent hover:from-[var(--primary)]/20 transition-all duration-500">
        <div className="p-10 md:p-14 rounded-[2.8rem] bg-[var(--card)]/40 backdrop-blur-3xl border border-white/5 relative overflow-hidden h-full">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

          <div className="flex flex-wrap items-start justify-between gap-8 mb-10">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className={`px-4 py-1.5 text-[10px] font-black rounded-full uppercase tracking-[0.2em] ${item.status === 'ongoing'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                  : 'bg-white/5 text-white/60 border border-white/10'
                  }`}>
                  {item.status === 'ongoing' ? 'In Probing' : 'Finalized'}
                </span>
                {item.cgpa && (
                  <div className="flex items-center gap-2 px-5 py-1.5 text-[10px] font-black rounded-full bg-[var(--primary)] text-[var(--oxford-blue)] uppercase tracking-[0.2em] shadow-lg shadow-[var(--primary)]/10">
                    <Star className="w-3 h-3 fill-current" />
                    GPA {item.cgpa}
                  </div>
                )}
              </div>

              <h3 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter italic leading-tight">{item.degree}</h3>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[var(--muted-foreground)] font-bold text-sm">
                <div className="flex items-center gap-2 group-hover:text-[var(--primary)] transition-colors">
                  <BookOpen className="w-4 h-4" />
                  <span>{item.institution}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>

            <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <Calendar className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--primary)]">{item.date}</span>
            </div>
          </div>

          <div className="space-y-5 mb-12">
            {item.details.map((detail, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-[var(--primary)]/40 mt-1.5 flex-shrink-0" />
                <p className="text-[var(--foreground)]/70 leading-relaxed font-medium italic">{detail}</p>
              </div>
            ))}
          </div>

          {item.achievements && (
            <div className="pt-10 border-t border-white/5">
              <h4 className="text-[10px] font-black text-[var(--muted-foreground)] mb-6 flex items-center gap-3 uppercase tracking-[0.3em]">
                <TrendingUp className="w-4 h-4 text-[var(--primary)]" />
                Key Milestones
              </h4>
              <div className="flex flex-wrap gap-3">
                {item.achievements.map((achievement) => (
                  <span
                    key={achievement}
                    className="px-5 py-2 text-[10px] font-black rounded-xl bg-white/5 text-white/80 border border-white/10 uppercase tracking-widest group-hover:bg-[var(--primary)]/10 group-hover:text-[var(--primary)] transition-all duration-500"
                  >
                    {achievement}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function EducationPage() {
  return (
    <div className="relative overflow-hidden min-h-screen">
      <section className="section-padding pt-32 lg:pt-48 pb-40">
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-40"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex mb-8"
            >
              <div className="flex items-center gap-2 px-6 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-black uppercase tracking-[0.2em] border border-[var(--primary)]/20 shadow-sm backdrop-blur-md">
                <GraduationCap className="w-4 h-4" />
                The Academy
              </div>
            </motion.div>

            <h1 className="text-7xl md:text-[10rem] font-black mb-10 tracking-tighter leading-[0.85] italic">
              Academic{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[#A0B2C6]">
                History
              </span>
            </h1>

            <p className="text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto font-medium leading-relaxed">
              Synthesizing theoretical paradigms with applied engineering methodologies across the educational spectrum.
            </p>
          </motion.div>

          {/* Performance Highlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-40"
          >
            <div className="relative p-16 md:p-24 rounded-[4rem] bg-gradient-to-br from-[var(--background-secondary)] to-[var(--background)] text-[var(--foreground)] overflow-hidden shadow-2xl border border-[var(--primary)]/10">
              <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-[var(--primary)]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-[10px] font-black uppercase tracking-[0.3em] mb-10 border border-[var(--primary)]/20 backdrop-blur-md">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    Performance Narrative
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter italic leading-tight">Software Engineering</h2>
                  <p className="text-[var(--primary)] text-xl md:text-3xl font-black tracking-tight uppercase">COMSATS University Islamabad</p>
                </div>

                <div className="group relative">
                  <div className="absolute inset-0 bg-[var(--primary)] blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity" />
                  <div className="relative text-center bg-[var(--card)]/50 backdrop-blur-3xl p-14 md:p-20 rounded-[4rem] border border-[var(--primary)]/10 shadow-3xl hover:border-[var(--primary)]/50 transition-colors duration-700">
                    <div className="text-8xl md:text-[12rem] font-black leading-none mb-6 tracking-tighter text-[var(--primary)]">3.64</div>
                    <div className="text-[var(--muted-foreground)] text-xs font-black uppercase tracking-[0.4em] italic">Current Cumulative GPA</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Education Timeline */}
          <div className="space-y-40 mb-40">
            <div className="flex items-center gap-12 mb-20">
              <h2 className="text-5xl font-black italic tracking-tighter whitespace-nowrap">The Timeline</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </div>

            <div className="grid gap-20">
              {educationData.map((item, index) => (
                <EducationCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>

          {/* Certifications Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-12 mb-20 text-right flex-row-reverse">
              <h2 className="text-5xl font-black italic tracking-tighter whitespace-nowrap">Distinctions</h2>
              <div className="h-px flex-1 bg-gradient-to-l from-white/10 to-transparent" />
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {certifications.map((cert, index) => {
                const Icon = cert.icon;
                return (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="p-12 h-full rounded-[3.5rem] bg-[var(--card)]/30 backdrop-blur-md border border-white/5 hover:border-[var(--primary)]/50 transition-all duration-500">
                      <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center mb-8 shadow-inner border border-[var(--primary)]/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        <Icon className="w-8 h-8 text-[var(--primary)]" />
                      </div>
                      <h3 className="text-2xl font-black mb-3 tracking-tight group-hover:text-[var(--primary)] italic transition-colors leading-tight">{cert.name}</h3>
                      <p className="text-[10px] font-black text-[var(--muted-foreground)] mb-8 uppercase tracking-[0.2em]">{cert.provider}</p>

                      <div className="flex items-center gap-3 text-xs font-black text-[var(--primary)] uppercase tracking-widest pt-6 border-t border-white/5">
                        <Calendar className="w-4 h-4" />
                        <span>{cert.date}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
