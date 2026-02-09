import { motion } from 'framer-motion';
import { personalData } from '@/data/personal';
import { Code2, Cpu, Wrench, Sparkles } from 'lucide-react';
import {
    SiCplusplus, SiJavascript, SiTypescript, SiDart, SiPhp, SiReact,
    SiFlutter, SiLaravel, SiTailwindcss, SiNodedotjs, SiMysql,
    SiGit, SiGithub, SiPostman, SiFigma, SiVercel, SiNetlify
} from 'react-icons/si';
import { FaJava, FaDatabase, FaCode, FaDraftingCompass, FaBrain, FaLightbulb, FaLaptopCode } from 'react-icons/fa';

const icons = {
    languages: Code2,
    technologies: Cpu,
    tools: Wrench,
};

const skillIcons: Record<string, any> = {
    // Languages
    'C++': SiCplusplus,
    'Java': FaJava,
    'Dart': SiDart,
    'PHP': SiPhp,
    'SQL': FaDatabase,
    'JavaScript': SiJavascript,
    'TypeScript': SiTypescript,

    // Frameworks & Libraries
    'React': SiReact,
    'Flutter': SiFlutter,
    'Laravel': SiLaravel,
    'Tailwind CSS': SiTailwindcss,
    'Node.js': SiNodedotjs,

    // Databases
    'MySQL': SiMysql,
    'SQL Server': FaDatabase,

    // Tools
    'Git': SiGit,
    'GitHub': SiGithub,
    'VS Code': FaCode,
    'Visual Studio': FaLaptopCode,
    'Postman': SiPostman,
    'Figma': SiFigma,
    'Vercel': SiVercel,
    'Netlify': SiNetlify,

    // Core Concepts
    'Data Structures': FaCode,
    'OOP': FaDraftingCompass,
    'Problem Solving': FaLightbulb,
    'System Design': FaBrain,
};

export function SkillsPage() {
    const { skills } = personalData;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
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
                                <Sparkles className="w-4 h-4" />
                                Technical Arsenal
                            </div>
                        </motion.div>

                        <h1 className="text-7xl md:text-[10rem] font-black mb-10 tracking-tighter leading-[0.85] italic">
                            Tech{' '}
                            <span className="text-[var(--primary)]">
                                Stack
                            </span>
                        </h1>

                        <p className="text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto font-medium leading-relaxed">
                            A comprehensive curation of the tools, languages, and technologies I leverage to build scalable digital solutions.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid gap-20"
                    >
                        {Object.entries(skills).map(([category, items]) => {
                            const Icon = icons[category as keyof typeof icons] || Sparkles;
                            return (
                                <div key={category} className="space-y-12">
                                    <div className="flex items-center gap-8">
                                        <div className="flex items-center gap-4 text-[var(--primary)]">
                                            {Icon && <Icon className="w-8 h-8" />}
                                            <h2 className="text-4xl font-black italic tracking-tight uppercase">{category}</h2>
                                        </div>
                                        <div className="h-px flex-1 bg-gradient-to-r from-[var(--primary)]/30 to-transparent" />
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                                        {items.map((item) => {
                                            const SubIcon = skillIcons[item] || Sparkles;
                                            return (
                                                <motion.div
                                                    key={item}
                                                    variants={itemVariants}
                                                    whileHover={{ y: -10, scale: 1.05 }}
                                                    className="group p-8 rounded-[2rem] bg-[var(--card)]/30 border border-[var(--primary)]/10 hover:border-[var(--primary)]/30 transition-all duration-500"
                                                >
                                                    <div className="p-8 rounded-[1.9rem] bg-[var(--card)]/40 backdrop-blur-3xl border border-white/5 flex flex-col items-center justify-center text-center h-full">
                                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-[var(--primary)]/10 group-hover:text-[var(--primary)] transition-all duration-500 border border-white/10 group-hover:border-[var(--primary)]/50">
                                                            <SubIcon className="w-6 h-6" />
                                                        </div>
                                                        <span className="text-sm font-black uppercase tracking-widest text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                                                            {item}
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>

                    {/* Proficiency Narrative */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mt-40 p-16 md:p-24 rounded-[4rem] bg-[var(--card)]/40 text-center relative overflow-hidden shadow-2xl border border-[var(--primary)]/10"
                    >
                        <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-[var(--primary)]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                        <div className="relative z-10">
                            <h2 className="text-5xl md:text-7xl font-black mb-8 italic tracking-tighter text-[var(--foreground)]">Philosophy of Growth</h2>
                            <p className="text-[var(--foreground)]/60 text-xl font-medium leading-relaxed max-w-3xl mx-auto italic">
                                "I believe that a tech stack is more than just a list of tools; it's a dynamic ecosystem of problem-solving instruments. I am constantly expanding this arsenal to stay at the cutting edge of engineering innovation."
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
