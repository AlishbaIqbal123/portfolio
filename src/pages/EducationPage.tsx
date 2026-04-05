import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, BookOpen } from 'lucide-react';
import { getEducation } from '@/lib/api';
import { useTheme } from '@/hooks/useTheme';

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  date: string;
  grade?: string;
  description: string[];
  school?: string;
  period?: string;
}

const staticEducation: EducationItem[] = [
  {
    id: 'bs-cs',
    degree: 'Bachelor of Science (Computer Science)',
    institution: 'The University of Faisalabad',
    location: 'Faisalabad, Pakistan',
    date: '2023 - 2027',
    grade: 'Currently Ongoing',
    description: [
      'Focusing on Core Computer Science principles and advanced software engineering',
      'Specializing in Modern Web Architectures and Cross-Platform App Development',
    ],
  },
];

const coursework = [
  'Data Structures & Algorithms',
  'Object Oriented Programming',
  'Web Development',
  'Database Management Systems',
  'Software Engineering',
  'Discrete Mathematics',
];

export function EducationPage() {
  const { isDark } = useTheme();
  const [eduLocal, setEduLocal] = useState<EducationItem[]>(staticEducation);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getEducation();
        if (data && data.length > 0) {
          const normalized = data.map((edu: any) => ({
             id: edu.id,
             degree: edu.degree || '',
             institution: edu.institution || edu.school || '',
             location: edu.location || '',
             date: edu.date || edu.period || '',
             grade: edu.grade || edu.cgpa || '',
             description: Array.isArray(edu.description) ? edu.description : typeof edu.description === 'string' ? edu.description.split('\n').filter(Boolean) : [],
          }));
          setEduLocal(normalized);
        }
      } catch (err) { console.error(err); }
    }
    loadData();
  }, []);

  return (
    <div className="relative min-h-screen bg-background transition-colors duration-500">
      
      {/* Header */}
      <section className="pt-24 pb-8 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          {!isDark ? (
            <div className="space-y-3">
              <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">Academic</p>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">Education</h1>
              <p className="text-muted-foreground max-w-lg">
                My academic journey and the foundations of my technical expertise.
              </p>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase mb-3">Academic</p>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">Education</h1>
              <p className="text-muted-foreground mt-3 max-w-md mx-auto">
                Comprehensive record of my academic path.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Education Entries */}
      <section className="py-8 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto space-y-4">
          {eduLocal.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={isDark ? 'architect-card' : 'silk-card'}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    isDark ? 'bg-primary/10' : 'bg-primary text-primary-foreground'
                  }`}>
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground">{item.degree}</h3>
                    <p className="text-sm text-muted-foreground">{item.institution} — {item.location}</p>
                  </div>
                </div>
                {item.grade && (
                  <span className={`text-xs font-medium px-3 py-1 shrink-0 ${
                    isDark ? 'bg-primary/10 text-primary rounded-md' : 'bg-primary/5 text-primary rounded-full border border-primary/10'
                  }`}>
                    {typeof item.grade === 'string' && item.grade.includes('.') ? `CGPA: ${item.grade}` : item.grade}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                <span>{item.date}</span>
              </div>

              <ul className="space-y-2">
                {item.description.map((desc, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                    <span className="text-sm text-muted-foreground leading-relaxed">{desc}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Coursework */}
      <section className="py-12 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Core Coursework</h2>
          </div>

          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-3`}>
            {coursework.map((course, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className={`p-5 group transition-all ${isDark ? 'architect-card' : 'silk-card'}`}
              >
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{course}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Quote */}
      <section className="py-16 px-6 md:px-16 lg:px-24">
        <div className={`max-w-4xl mx-auto p-10 md:p-16 text-center ${isDark ? 'architect-card' : 'silk-card'}`}>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 text-foreground">Always Learning</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            My academic foundation equips me to tackle complex challenges and build innovative solutions.
          </p>
        </div>
      </section>
    </div>
  );
}
