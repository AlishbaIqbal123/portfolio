import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, User, Loader2, Lightbulb, Heart, BookOpen, Sparkles, CheckCircle2, Quote } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { SafeImage } from '@/components/ui/SafeImage';

interface Tip {
    id: string;
    title: string;
    content: string;
    category: string;
    author: string;
    fetched_at: string;
}

/* ── Friendly tips / details based on category ── */
const friendlyDetails: Record<string, { heading: string; points: string[]; emoji: string }> = {
    'software engineering': {
        heading: '🏗️ Engineering Wisdom',
        emoji: '🔧',
        points: [
            'Clean code is not about perfection, but about being kind to the next person who reads it (most likely you).',
            'Automated testing is the insurance policy for your future productivity.',
            'Design patterns are vocabularies that help engineers communicate complex ideas efficiently.',
        ]
    },
    'frontend': {
        heading: '🎨 Interface Excellence',
        emoji: '✨',
        points: [
            'Visual stability isn\'t just about aesthetics — it\'s about user trust and accessibility.',
            'Responsive design is the standard. If it doesn\'t work on a phone, it doesn\'t truly exist.',
            'Performance is a feature. Every millisecond saved is a friction point removed.',
        ]
    },
    'backend': {
        heading: '⚙️ Scalable Logic',
        emoji: '🔧',
        points: [
            'A predictable API is a joy to integrate. Always prioritize consistency over cleverness.',
            'Statelessness allows your system to scale horizontally with minimal friction.',
            'Observability is better than debugging. Log the right data before you need it.',
        ]
    },
    'architecture': {
        heading: '📐 Structural Purity',
        emoji: '🏛️',
        points: [
            'Architecture is about making the important decisions now so you can make smaller ones later.',
            'Loose coupling and high cohesion are the twin pillars of a resilient system.',
            'Good architecture handles requirements that haven\'t been written yet.',
        ]
    },
    'database': {
        heading: '💾 Data Integrity',
        emoji: '🗄️',
        points: [
            'Data is the ultimate source of truth. Protecting it is your most important job.',
            'Indexes are like library catalogs — they make finding things fast, but they take up space.',
            'Normalization reduces redundancy; Denormalization increases performance. Choose wisely.',
        ]
    },
    'default': {
        heading: '✨ Pro Tips',
        emoji: '🌟',
        points: [
            'The best tool is the one you know how to use well, but the best dev is the one who keeps learning new ones.',
            'Don\'t just fix the bug — understand why it happened to prevent an entire class of errors.',
            'Write code as if you\'re writing a letter to your future self.',
        ]
    }
};

const inspirationalQuotes: Record<string, { quote: string; by: string }> = {
    'frontend': { quote: 'Design is not just what it looks like. Design is how it works.', by: 'Steve Jobs' },
    'backend': { quote: 'The best code is no code at all. Every new line is a potential bug.', by: 'Jeff Atwood' },
    'software engineering': { quote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', by: 'Martin Fowler' },
    'default': { quote: 'Simplicity is the soul of efficiency.', by: 'Austin Freeman' },
};

export const TipDetailPage = () => {
    const { id } = useParams();
    const { isDark } = useTheme();
    const [tip, setTip] = useState<Tip | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTip = async () => {
            const { data } = await supabase
                .from('coding_tips')
                .select('*')
                .eq('id', id)
                .single();
                
            if (data) setTip(data);
            setLoading(false);
        };
        fetchTip();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-background">
           <Loader2 className="animate-spin w-8 h-8 text-primary" />
        </div>
    );

    if (!tip) return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-foreground mb-2 italic">Observation Vault Empty</h1>
                <Link to="/tips" className="text-sm text-primary hover:underline uppercase tracking-widest font-black">Re-establish Connection</Link>
            </div>
        </div>
    );

    const catKey = (tip.category || '').toLowerCase();
    const friendly = friendlyDetails[catKey] || friendlyDetails['default'];
    const quote = inspirationalQuotes[catKey] || inspirationalQuotes['default'];

    // Generate a unique, relevant image using Unsplash keywords + the tip ID as a seed/sig
    const imageKeywords = `${catKey.replace(' ', ',')},technology,code,minimal`;
    const heroImage = `https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop&sig=${tip.id}`;
    
    // More curated dynamic imagery based on category if sig isn't enough variety
    const getDynamicImage = () => {
        const techPool = [
            '1517694712202-14dd9538aa97', // Laptop code
            '1555066931-4365d14bab8c', // Screen code
            '1587620962725-abab7fe55159', // Programmer
            '1516321318423-f06f85e504b3', // Modern office
            '1550751827-4bd374c3f58b', // Cyber
            '1488590528505-98d2b5aba04b', // Apple gear
            '1504639725597-78f6ec6b5383', // Coding abstract
            '1531297484001-80022131f5a1', // Future tech
            '1551033406-611cf9a28f67', // Debugging
            '1519389950473-47ba0277781c'  // Collaboration
        ];
        // Use hash of tipping.id to pick from pool
        const idNum = tip.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const imageId = techPool[idNum % techPool.length];
        return `https://images.unsplash.com/photo-${imageId}?q=80&w=1200&auto=format&fit=crop`;
    };

    const finalImage = getDynamicImage();

    return (
        <div className="min-h-screen bg-background transition-colors duration-500">
            <div className="pt-24 pb-16 px-6 md:px-16 lg:px-24">
                <div className="max-w-4xl mx-auto space-y-6">
                    
                    {/* Back link */}
                    <Link to="/tips" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors font-black uppercase tracking-widest italic">
                        <ArrowLeft className="w-4 h-4" /> {"System.Exit(0) -> Back"}
                    </Link>

                    {/* ── Hero Image ── */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`overflow-hidden border border-border/50 group ${isDark ? 'rounded-xl' : 'rounded-3xl shadow-2xl'}`}
                    >
                        <div className="relative aspect-[16/7] overflow-hidden">
                            <SafeImage 
                                src={finalImage} 
                                alt={tip.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                            />
                            <div className={`absolute inset-0 ${
                                isDark 
                                    ? 'bg-gradient-to-t from-background via-background/60 to-transparent' 
                                    : 'bg-gradient-to-t from-background via-background/40 to-transparent'
                            }`} />
                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                                <motion.span 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 mb-4 inline-block italic ${
                                        isDark ? 'bg-primary/20 text-primary rounded-md backdrop-blur-sm border border-primary/20' : 'bg-primary text-white rounded shadow-lg'
                                    }`}
                                >
                                    {tip.category}
                                </motion.span>
                                <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground uppercase italic leading-none">{tip.title}</h1>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── Meta bar ── */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground italic opacity-60"
                    >
                        <span className="flex items-center gap-2">
                            <User className="w-3.5 h-3.5 text-primary" />
                            {tip.author || 'Alishba Iqbal'}
                        </span>
                        <span className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-primary" />
                            {new Date(tip.fetched_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-2">
                            <BookOpen className="w-3.5 h-3.5 text-primary" />
                            3 min read
                        </span>
                    </motion.div>

                    {/* ── Main Content Card ── */}
                    <div className="grid lg:grid-cols-12 gap-6 items-start">
                        <motion.article
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className={`lg:col-span-8 ${isDark ? 'architect-card' : 'silk-card'}`}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-foreground">The Insight</h2>
                            </div>
                            <p className="text-lg md:text-xl font-bold leading-snug text-foreground/90 mb-8 italic">
                                "{tip.content}"
                            </p>
                            
                            <div className={`p-6 border-l-4 border-primary ${
                                isDark ? 'bg-card/50 rounded-r-lg' : 'bg-muted/30 rounded-r-2xl'
                            }`}>
                                <h4 className="text-[10px] font-black uppercase text-primary mb-2 italic">Detailed Analysis</h4>
                                <p className="text-xs leading-relaxed text-muted-foreground font-medium">
                                    Deep engineering cycles reveal that {tip.category} standards often dictate the lifespan of a deployment. 
                                    By prioritizing this specific insight, you are opting for structural longevity over temporary velocity. 
                                    High-end development is a marathon of consistency, not a sprint of hacks.
                                </p>
                            </div>
                        </motion.article>

                        <div className="lg:col-span-4 space-y-6">
                            {/* ── Why This Matters ── */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.25 }}
                                className={isDark ? 'architect-card' : 'silk-card'}
                            >
                                <div className="flex items-center gap-2 mb-6">
                                    <Heart className="w-4 h-4 text-primary" />
                                    <h2 className="text-[10px] font-black text-foreground uppercase tracking-widest">{friendly.heading}</h2>
                                </div>
                                <div className="space-y-4">
                                    {friendly.points.map((point, idx) => (
                                        <div key={idx} className="flex items-start gap-3 group">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                                            <p className="text-[10px] leading-relaxed font-bold text-muted-foreground/80 uppercase tracking-tight">{point}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* ── Inspirational Quote ── */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.35 }}
                                className={`relative overflow-hidden p-6 border-2 border-primary/10 ${isDark ? 'architect-card' : 'silk-card'}`}
                            >
                                <div className="absolute -top-2 -right-2 opacity-5">
                                    <Quote className="w-16 h-16 text-primary" />
                                </div>
                                <div className="relative z-10">
                                    <blockquote className="text-sm font-black italic tracking-tight text-foreground leading-tight mb-4">
                                        "{quote.quote}"
                                    </blockquote>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-primary">— {quote.by}</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* ── Browse More Tips ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                        className={`p-10 text-center border-dashed border-2 border-border/50 ${isDark ? 'architect-card' : 'silk-card'}`}
                    >
                        <Lightbulb className="w-10 h-10 text-primary mx-auto mb-4 opacity-20" />
                        <h3 className="text-sm font-black text-foreground mb-1 uppercase tracking-widest">Knowledge Pipeline</h3>
                        <p className="text-[10px] text-muted-foreground mb-6 uppercase italic font-black">Syncing the next generation of engineering thoughts.</p>
                        <Link to="/tips" className="imperial-btn text-[10px]">
                            CONTINUE EXPLORING
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
