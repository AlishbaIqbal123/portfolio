import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Code2, Cpu, Globe, ArrowUpRight } from 'lucide-react';
import { SafeImage } from '@/components/ui/SafeImage';

interface BubbleItem {
    id: string;
    title: string;
    subtitle?: string;
    icon: React.ReactNode;
    color: string;
    size: 'sm' | 'md' | 'lg' | 'wide';
    link: string;
    image?: string;
}

const bubbles: BubbleItem[] = [
    {
        id: 'b1',
        title: 'Tech Insights',
        subtitle: 'Daily tips & tricks',
        icon: <Sparkles className="w-6 h-6" />,
        color: 'var(--maroon)',
        size: 'md',
        link: '/tips'
    },
    {
        id: 'b2',
        title: 'Project Alpha',
        subtitle: 'Latest Work',
        icon: <Code2 className="w-8 h-8" />,
        color: 'var(--moss)',
        size: 'lg',
        link: '/projects',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'b3',
        title: '@alishba',
        subtitle: 'Follow the journey',
        icon: <ArrowUpRight className="w-5 h-5" />,
        color: 'var(--dark-peach)',
        size: 'sm',
        link: '/contact'
    },
    {
        id: 'b4',
        title: 'Core Stack',
        subtitle: 'React • Node • AI',
        icon: <Cpu className="w-6 h-6" />,
        color: 'var(--deep-maroon)',
        size: 'wide',
        link: '/skills'
    },
    {
        id: 'b5',
        title: 'Web Apps',
        icon: <Globe className="w-6 h-6" />,
        color: 'var(--brown)',
        size: 'md',
        link: '/projects'
    }
];

export const BubbleLayout = () => {
    return (
        <div className="relative w-full max-w-6xl mx-auto p-4 md:p-8 flex flex-wrap justify-center gap-6 items-center">
            {bubbles.map((bubble, index) => (
                <motion.div
                    key={bubble.id}
                    initial={{ opacity: 0, scale: 0.8, rotate: index % 2 === 0 ? -5 : 5 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1, type: 'spring' }}
                >
                    <Link to={bubble.link}>
                        <motion.div
                            whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                            className={`relative overflow-hidden shadow-bubble border-8 border-white transition-all duration-500 flex flex-col justify-between p-8 group
                                ${bubble.size === 'sm' ? 'w-56 h-56 rounded-[3.5rem] !p-6' : ''}
                                ${bubble.size === 'md' ? 'w-64 h-64 rounded-[4rem]' : ''}
                                ${bubble.size === 'lg' ? 'w-80 h-[30rem] rounded-[5rem]' : ''}
                                ${bubble.size === 'wide' ? 'w-[30rem] h-64 rounded-[4rem]' : ''}
                            `}
                            style={{ backgroundColor: bubble.color }}
                        >
                            {bubble.image && (
                                <div className="absolute inset-0 z-0">
                                    <SafeImage src={bubble.image} alt="" className="w-full h-full object-cover opacity-30 hover:opacity-50 transition-opacity" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                </div>
                            )}

                            <div className="relative z-10 flex justify-between items-start">
                                <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
                                    {bubble.icon}
                                </div>
                                <ArrowUpRight className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-2xl font-black mb-1 text-white uppercase italic tracking-tighter drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">{bubble.title}</h3>
                                {bubble.subtitle && <p className="text-[12px] font-black uppercase tracking-[0.2em] text-white bg-black/40 px-4 py-1.5 rounded-full inline-block backdrop-blur-sm border border-white/10">{bubble.subtitle}</p>}
                            </div>
                        </motion.div>
                    </Link>
                </motion.div>
            ))}
            
            {/* Added some small floating "emojis" like the reference */}
            <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-10 right-10 text-4xl hidden lg:block"
            >
                🌰
            </motion.div>
            <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-10 left-10 text-4xl hidden lg:block"
            >
                🧸
            </motion.div>
        </div>
    );
};
