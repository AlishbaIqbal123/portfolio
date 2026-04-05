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

/* ── Category-specific inspiration images from Unsplash ── */
const categoryImages: Record<string, string> = {
    'core': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop',
    'frontend': 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=500&fit=crop',
    'backend': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop',
    'design': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop',
    'devops': 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=500&fit=crop',
    'testing': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop',
    'default': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500&fit=crop',
};

/* ── Friendly tips / details based on category ── */
const friendlyDetails: Record<string, { heading: string; points: string[]; emoji: string }> = {
    'core': {
        heading: '💡 Why This Matters',
        emoji: '🧱',
        points: [
            'Strong fundamentals make debugging 10x faster — you\'ll spend less time guessing and more time building.',
            'Modular code is like building with LEGO — you can swap parts without breaking everything.',
            'Every large project you admire started with clean, well-structured foundations.',
        ]
    },
    'frontend': {
        heading: '🎨 Making It Click',
        emoji: '✨',
        points: [
            'Great UI isn\'t about flashy effects — it\'s about making users feel confident and comfortable.',
            'Micro-interactions (like button animations) make apps feel alive and responsive.',
            'Accessibility isn\'t optional — building for everyone means building better for everyone.',
        ]
    },
    'backend': {
        heading: '⚙️ Behind the Scenes',
        emoji: '🔧',
        points: [
            'A well-designed API is like a good conversation — clear, predictable, and easy to follow.',
            'Security isn\'t just about passwords — it\'s about thinking like an attacker to protect your users.',
            'Caching is your best friend — it turns slow apps into fast ones without rewriting everything.',
        ]
    },
    'default': {
        heading: '✨ The Bigger Picture',
        emoji: '🌟',
        points: [
            'Every line of code you write is a step toward mastery — consistency beats perfection.',
            'The best developers aren\'t those who know everything — they\'re the ones who never stop learning.',
            'Building projects is the fastest way to learn — reading alone won\'t make you a great coder.',
        ]
    }
};

/* ── Inspirational quotes by category ── */
const inspirationalQuotes: Record<string, { quote: string; by: string }> = {
    'core': { quote: 'First, solve the problem. Then, write the code.', by: 'John Johnson' },
    'frontend': { quote: 'Design is not just what it looks like. Design is how it works.', by: 'Steve Jobs' },
    'backend': { quote: 'The best code is no code at all. Every new line is a potential bug.', by: 'Jeff Atwood' },
    'default': { quote: 'Simplicity is the soul of efficiency.', by: 'Austin Freeman' },
};

const fallbacks: Record<string, Tip> = {
    'fallback_1': {
        id: 'fallback_1',
        title: 'Modular Architecture',
        content: 'Implementing modular separation within your codebase ensures maintainability, testability, and scalability as your project grows.',
        category: 'Core',
        author: 'Alishba Iqbal',
        fetched_at: new Date().toISOString()
    },
    'fallback_2': {
        id: 'fallback_2',
        title: 'Modern UI Patterns',
        content: 'Using glassmorphism, motion-based interactions, and thoughtful micro-animations creates engaging interfaces that users love.',
        category: 'Frontend',
        author: 'Alishba Iqbal',
        fetched_at: new Date().toISOString()
    },
    'fallback_3': {
        id: 'fallback_3',
        title: 'Real-Time Sync',
        content: 'Real-time synchronization with row-level security enables instant state updates across all connected clients securely.',
        category: 'Backend',
        author: 'Alishba Iqbal',
        fetched_at: new Date().toISOString()
    }
};

export const TipDetailPage = () => {
    const { id } = useParams();
    const { isDark } = useTheme();
    const [tip, setTip] = useState<Tip | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTip = async () => {
            if (id?.startsWith('fallback_')) {
                setTip(fallbacks[id] || null);
                setLoading(false);
                return;
            }

            const { data } = await supabase
                .from('coding_tips')
                .select('*')
                .eq('id', id)
                .single();
                
            if (data) setTip(data);
            else if (id && fallbacks[id]) setTip(fallbacks[id]);
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
                <h1 className="text-3xl font-bold text-foreground mb-2">Tip Not Found</h1>
                <Link to="/tips" className="text-sm text-primary hover:underline">Back to tips</Link>
            </div>
        </div>
    );

    const catKey = tip.category.toLowerCase();
    const heroImage = categoryImages[catKey] || categoryImages['default'];
    const friendly = friendlyDetails[catKey] || friendlyDetails['default'];
    const quote = inspirationalQuotes[catKey] || inspirationalQuotes['default'];

    return (
        <div className="min-h-screen bg-background transition-colors duration-500">
            <div className="pt-24 pb-16 px-6 md:px-16 lg:px-24">
                <div className="max-w-4xl mx-auto space-y-6">
                    
                    {/* Back link */}
                    <Link to="/tips" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to tips
                    </Link>

                    {/* ── Hero Image ── */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`overflow-hidden ${isDark ? 'rounded-xl' : 'rounded-3xl'}`}
                    >
                        <div className="relative aspect-[16/7] overflow-hidden">
                            <SafeImage 
                                src={heroImage} 
                                alt={tip.title}
                                className="w-full h-full object-cover"
                            />
                            <div className={`absolute inset-0 ${
                                isDark 
                                    ? 'bg-gradient-to-t from-background via-background/40 to-transparent' 
                                    : 'bg-gradient-to-t from-background via-background/30 to-transparent'
                            }`} />
                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                                <span className={`text-[10px] font-medium uppercase tracking-wider px-3 py-1 mb-3 inline-block ${
                                    isDark ? 'bg-primary/20 text-primary rounded-md backdrop-blur-sm' : 'bg-white/80 text-primary rounded-full backdrop-blur-sm'
                                }`}>
                                    {tip.category}
                                </span>
                                <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">{tip.title}</h1>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── Meta bar ── */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center gap-4 text-xs text-muted-foreground"
                    >
                        <span className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5" />
                            {tip.author || 'Alishba Iqbal'}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-border" />
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(tip.fetched_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-border" />
                        <span className="flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5" />
                            3 min read
                        </span>
                    </motion.div>

                    {/* ── Main Content Card ── */}
                    <motion.article
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className={isDark ? 'architect-card' : 'silk-card'}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-5 h-5 text-primary" />
                            <h2 className="text-lg font-bold text-foreground">The Insight</h2>
                        </div>
                        <p className="text-base md:text-lg leading-relaxed text-foreground/85 mb-6">{tip.content}</p>
                        
                        {/* Expanded description */}
                        <div className={`p-5 ${
                            isDark ? 'bg-card rounded-lg border border-border' : 'bg-muted/30 rounded-2xl'
                        }`}>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                This insight touches on a key aspect of {tip.category.toLowerCase()} development that many developers overlook early in their careers. 
                                Understanding and applying this principle consistently will set your work apart and help you build more reliable, 
                                maintainable software. The difference between good and great code often comes down to these foundational practices.
                            </p>
                        </div>
                    </motion.article>

                    {/* ── Friendly Zone: Why This Matters ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className={isDark ? 'architect-card' : 'silk-card'}
                    >
                        <div className="flex items-center gap-2 mb-5">
                            <Heart className="w-5 h-5 text-primary" />
                            <h2 className="text-lg font-bold text-foreground">{friendly.heading}</h2>
                        </div>
                        <div className="space-y-3">
                            {friendly.points.map((point, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                    <p className="text-sm leading-relaxed text-muted-foreground">{point}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Inspirational Quote ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className={`relative overflow-hidden ${isDark ? 'architect-card' : 'silk-card'}`}
                    >
                        <div className="absolute top-4 right-4 opacity-5">
                            <Quote className="w-24 h-24 text-primary" />
                        </div>
                        <div className="relative z-10 text-center py-4">
                            <blockquote className="text-xl md:text-2xl font-bold tracking-tight text-foreground leading-snug mb-3">
                                "{quote.quote}"
                            </blockquote>
                            <p className="text-sm text-muted-foreground">— {quote.by}</p>
                        </div>
                    </motion.div>

                    {/* ── Browse More Tips ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                        className={`p-8 text-center ${isDark ? 'architect-card' : 'silk-card'}`}
                    >
                        <Lightbulb className="w-8 h-8 text-primary mx-auto mb-3 opacity-50" />
                        <h3 className="text-lg font-bold text-foreground mb-1">Explore More</h3>
                        <p className="text-sm text-muted-foreground mb-5">Discover more insights, best practices, and development tips.</p>
                        <Link to="/tips" className="imperial-btn text-xs">
                            Browse All Tips
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
