import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Code2, Coffee, Lightbulb, Target, Heart, Rocket, GraduationCap, MapPin, Mail } from 'lucide-react';
import { personalData } from '@/data/personal';
import { GitHubCalendar } from 'react-github-calendar';

const interests = [
  { icon: Code2, title: 'Clean Architecture', desc: 'Designing maintainable and robust systems' },
  { icon: Lightbulb, title: 'Innovation', desc: 'Exploring cutting-edge technologies' },
  { icon: Rocket, title: 'Growth', desc: 'Committed to continuous learning' },
  { icon: Target, title: 'Precision', desc: 'Focusing on details and performance' },
  { icon: Heart, title: 'Design', desc: 'Creating beautiful user experiences' },
  { icon: Coffee, title: 'Dedication', desc: 'Focusing on impactful outcomes' },
];

export function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative min-h-screen">
      {/* Hero Section */}
      <section className="section-padding pt-32 lg:pt-48 pb-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex mb-8"
            >
              <div className="px-6 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-black uppercase tracking-[0.2em] border border-[var(--primary)]/20 shadow-sm backdrop-blur-md">
                About Me
              </div>
            </motion.div>

            <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter italic leading-none">
              A Glimpse Into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[#A0B2C6]">
                My World
              </span>
            </h1>

            <p className="text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto font-medium leading-relaxed">
              Software engineering student, problem solver, and a lifelong learner building digital bridges.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-start mb-40">
            {/* Left - Story */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-12"
            >
              <div className="relative">
                <h2 className="text-4xl font-black mb-8 italic tracking-tight">The Story So Far</h2>
                <div className="h-1 w-20 bg-[var(--primary)] rounded-full mb-10" />

                <div className="space-y-6 text-lg text-[var(--foreground)]/80 leading-relaxed font-medium">
                  <p>
                    I'm <strong className="text-[var(--primary)] font-black">{personalData.name}</strong>, current Software Engineering major at
                    <strong className="text-[var(--primary)]"> COMSATS University Islamabad</strong>.
                  </p>
                  <p>
                    My passion lies at the intersection of architectural design and user experience. I don't just write code; I strive to build systems that are as beautiful in their structure as they are in their interface.
                  </p>
                  <p>
                    With experience ranging from frontend internships at <strong>TKXEL</strong> to virtual simulations with
                    <strong> AWS</strong> and <strong>Electronic Arts</strong>, I've developed a rigorous approach to software quality and performance.
                  </p>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: GraduationCap, label: 'Education', value: 'BS Software Eng.' },
                  { icon: MapPin, label: 'Location', value: 'Pakistan' },
                  { icon: Target, label: 'Goal', value: 'Build Scalable Apps' },
                  { icon: Mail, label: 'Status', value: 'Open for Roles' },
                ].map((item, idx) => (
                  <div key={idx} className="p-6 rounded-3xl bg-[var(--card)]/30 border border-white/5 group hover:border-[var(--primary)] transition-all duration-500">
                    <item.icon className="w-6 h-6 text-[var(--primary)] mb-4" />
                    <div className="text-[var(--muted-foreground)] text-xs uppercase tracking-widest mb-1 font-black">{item.label}</div>
                    <div className="font-bold text-sm tracking-tight">{item.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right - Profile Highlight Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative lg:sticky lg:top-48"
            >
              <div className="p-1 w-full max-w-md mx-auto rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent">
                <div className="p-10 md:p-14 rounded-[2.8rem] bg-[var(--card)]/50 backdrop-blur-3xl border border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

                  <div className="relative z-10 text-center">
                    <div className="w-40 h-40 mx-auto rounded-[2.5rem] bg-gradient-to-br from-[var(--primary)] to-[var(--space-cadet)] flex items-center justify-center mb-10 shadow-2xl group-hover:rotate-6 transition-transform duration-700">
                      <span className="text-6xl font-black text-[var(--oxford-blue)]">AI</span>
                    </div>

                    <h3 className="text-3xl font-black mb-2 tracking-tight">{personalData.name}</h3>
                    <p className="text-[var(--muted-foreground)] font-bold mb-10 tracking-[0.1em] uppercase text-xs">
                      Software Engineering Student
                    </p>

                    <div className="flex flex-wrap justify-center gap-3">
                      {['TypeScript', 'React', 'Node.js', 'System Architecture'].map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 text-[10px] font-black rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 uppercase tracking-widest"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative side stats */}
              <div className="absolute -right-4 -bottom-4 bg-[var(--primary)] text-[var(--oxford-blue)] p-8 rounded-3xl shadow-2xl z-20 hidden md:block group-hover:scale-105 transition-transform">
                <div className="text-3xl font-black leading-tight">3.64</div>
                <div className="text-[10px] font-black uppercase tracking-widest opacity-80">Current CGPA</div>
              </div>
            </motion.div>
          </div>

          {/* Interests Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-40"
          >
            <div className="flex items-center gap-12 mb-16">
              <h2 className="text-4xl font-black italic tracking-tight whitespace-nowrap">Professional Values</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {interests.map((interest, index) => {
                const Icon = interest.icon;
                return (
                  <motion.div
                    key={interest.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="p-10 rounded-[2.5rem] bg-[var(--card)]/30 border border-white/5 backdrop-blur-md group-hover:border-[var(--primary)] transition-all duration-500 h-full">
                      <div className="w-14 h-14 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                        <Icon className="w-7 h-7 text-[var(--primary)]" />
                      </div>
                      <h3 className="text-2xl font-black mb-4 tracking-tight group-hover:text-[var(--primary)] transition-colors italic">{interest.title}</h3>
                      <p className="text-[var(--muted-foreground)] font-medium text-sm leading-relaxed">{interest.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* GitHub Contributions Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-40"
          >
            <div className="text-center mb-20">
              <h2 className="text-5xl font-black italic tracking-tighter mb-6">Execution Consistency</h2>
              <p className="text-[var(--muted-foreground)] font-medium max-w-xl mx-auto uppercase tracking-widest text-xs">GitHub Contribution Activity</p>
            </div>

            <div className="p-10 md:p-16 rounded-[4rem] bg-[var(--card)]/30 border border-white/5 backdrop-blur-3xl">
              <div className="flex justify-center overflow-x-auto pb-8 custom-scrollbar">
                <GitHubCalendar
                  username="AlishbaIqbal123"
                  blockSize={14}
                  blockMargin={6}
                  fontSize={14}
                  theme={{
                    light: ['#f0f0f0', '#748CAB', '#5C7A99', '#3E5C76', '#1D2D44'],
                    dark: ['#1A1B1E', '#748CAB', '#5C7A99', '#3E5C76', '#1D2D44'],
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Quote Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-20 md:p-32 rounded-[4rem] bg-gradient-to-br from-[var(--background-secondary)] to-[var(--background)] text-[var(--foreground)] overflow-hidden shadow-2xl border border-[var(--primary)]/10"
          >
            <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[var(--primary)]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 text-center">
              <div className="text-8xl font-black mb-8 italic opacity-20 tracking-[0.5em]">"</div>
              <blockquote className="text-3xl md:text-5xl font-black mb-12 italic tracking-tighter max-w-4xl mx-auto leading-tight">
                Engineering is the closest thing we have to magic in the real world.
              </blockquote>
              <div className="h-px w-20 bg-[var(--primary)] mx-auto mb-8" />
              <cite className="text-[var(--primary)] font-black uppercase tracking-[0.3em] text-sm italic">Alishba Iqbal</cite>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
