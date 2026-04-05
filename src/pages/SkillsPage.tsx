import { motion, type Variants } from 'framer-motion';
import { personalData } from '@/data/personal';
import { Code2, Cpu, Wrench, Rocket, Atom, Star } from 'lucide-react';
import {
    SiCplusplus, SiJavascript, SiTypescript, SiDart, SiPhp, SiReact,
    SiFlutter, SiLaravel, SiTailwindcss, SiNodedotjs, SiMysql,
    SiGit, SiGithub, SiPostman, SiFigma, SiVercel, SiNetlify
} from 'react-icons/si';
import { FaJava, FaDatabase, FaCode, FaDraftingCompass, FaBrain, FaLightbulb, FaLaptopCode } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { QuickAdmin } from '@/components/QuickAdmin';
import { getSkillCategories } from '@/lib/api';
import { useTheme } from '@/hooks/useTheme';

const icons: Record<string, any> = {
    languages: Code2,
    technologies: Cpu,
    tools: Wrench,
    frameworks: Rocket,
    databases: FaDatabase,
};

const skillIcons: Record<string, any> = {
    'C++': SiCplusplus, 'Java': FaJava, 'Dart': SiDart, 'PHP': SiPhp, 'SQL': FaDatabase,
    'JavaScript': SiJavascript, 'TypeScript': SiTypescript, 'React': SiReact,
    'Flutter': SiFlutter, 'Laravel': SiLaravel, 'Tailwind CSS': SiTailwindcss,
    'Node.js': SiNodedotjs, 'MySQL': SiMysql, 'SQL Server': FaDatabase,
    'Git': SiGit, 'GitHub': SiGithub, 'VS Code': FaCode, 'Visual Studio': FaLaptopCode,
    'Postman': SiPostman, 'Figma': SiFigma, 'Vercel': SiVercel, 'Netlify': SiNetlify,
    'Data Structures': SiCplusplus, 'OOP': FaDraftingCompass, 'Problem Solving': FaLightbulb,
    'System Design': FaBrain,
};

export function SkillsPage() {
    const { isDark } = useTheme();
    const [skillsData, setSkillsData] = useState<any[]>([]);

    useEffect(() => {
        async function loadData() {
            try {
                const data = await getSkillCategories();
                if (data && data.length > 0) {
                    setSkillsData(data);
                } else {
                    setSkillsData(Object.entries(personalData.skills).map(([title, skills], index) => ({
                        id: title, title, skills, order_index: index
                    })));
                }
            } catch (err) { console.error(err); }
        }
        loadData();
    }, []);

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
        <div className="relative min-h-screen bg-background transition-colors duration-500">
            
            {/* Header */}
            <section className="pt-24 pb-8 px-6 md:px-16 lg:px-24">
              <div className="max-w-6xl mx-auto">
                {!isDark ? (
                  <div className="space-y-3">
                    <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">Expertise</p>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">Skills</h1>
                    <p className="text-muted-foreground max-w-lg">
                      A diverse toolkit spanning front-end, back-end, and design systems.
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase mb-3">Technical Core</p>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">Skills</h1>
                    <p className="text-muted-foreground mt-3 max-w-md mx-auto">
                      Technologies and tools I work with on a daily basis.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Skills Grid */}
            <section className="py-12 px-6 md:px-16 lg:px-24">
                <div className="max-w-6xl mx-auto space-y-16">
                    {skillsData.map((category) => {
                        const Icon = icons[category.title.toLowerCase()] || Atom;
                        return (
                            <motion.div 
                              key={category.id} 
                              initial="hidden" 
                              whileInView="visible" 
                              viewport={{ once: true }} 
                              variants={cardVariants} 
                              className="space-y-6"
                            >
                                {/* Category Header */}
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all ${
                                      isDark ? 'bg-primary/10 text-primary' : 'bg-primary text-primary-foreground'
                                    }`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-2xl font-bold tracking-tight text-foreground">{category.title}</h2>
                                </div>

                                {/* Skill Items — Light: horizontal wrap, Dark: dense grid */}
                                {!isDark ? (
                                  <div className="flex flex-wrap gap-3">
                                    {category.skills.map((item: string) => {
                                      const SubIcon = skillIcons[item] || Star;
                                      return (
                                        <motion.div
                                          key={item} 
                                          whileHover={{ y: -3 }}
                                          className="silk-card flex items-center gap-3 px-5 py-3"
                                        >
                                          <SubIcon className="w-5 h-5 text-primary" />
                                          <span className="text-sm font-medium text-foreground">{item}</span>
                                        </motion.div>
                                      );
                                    })}
                                  </div>
                                ) : (
                                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                    {category.skills.map((item: string) => {
                                      const SubIcon = skillIcons[item] || Star;
                                      return (
                                        <motion.div
                                          key={item}
                                          whileHover={{ y: -3 }}
                                          className="architect-card flex flex-col items-center justify-center text-center gap-3 p-6"
                                        >
                                          <SubIcon className="w-6 h-6 text-primary" />
                                          <span className="text-xs font-medium text-muted-foreground">{item}</span>
                                        </motion.div>
                                      );
                                    })}
                                  </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Quote */}
            <section className="py-16 px-6 md:px-16 lg:px-24">
              <div className={`max-w-4xl mx-auto p-10 md:p-16 text-center ${isDark ? 'architect-card' : 'silk-card'}`}>
                <blockquote className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4">
                  "Good architecture is the foundation of great software."
                </blockquote>
                <p className="text-sm text-muted-foreground">— Always learning, always building</p>
              </div>
            </section>

            <QuickAdmin tab="skills" />
        </div>
    );
}
