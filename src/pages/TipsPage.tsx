import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, ArrowRight, Loader2, Lightbulb } from 'lucide-react';
import { getCodingTips } from '@/lib/api';
import { useTheme } from '@/hooks/useTheme';

interface Tip {
    id: string;
    title: string;
    content: string;
    category: string;
    author: string;
    fetched_at: string;
}

export function TipsPage() {
    const { isDark } = useTheme();
    const [tips, setTips] = useState<Tip[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchTips() {
            try {
                const data = await getCodingTips();
                setTips(data || []);
            } catch (err) {
                console.error('Failed to fetch tips:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchTips();
    }, []);

    const categories = ['ALL', ...Array.from(new Set(tips.filter(t => t?.category).map(tip => tip.category.toUpperCase())))];

    const filteredTips = tips.filter(tip => {
        if (!tip) return false;
        const matchesSearch = (tip.title || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
                             (tip.content || "").toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'ALL' || (tip.category || "").toUpperCase() === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="relative min-h-screen bg-background transition-colors duration-500">
            
            {/* Header */}
            <section className="pt-24 pb-8 px-6 md:px-16 lg:px-24">
                <div className="max-w-6xl mx-auto">
                    {!isDark ? (
                        <div className="space-y-3">
                            <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">Knowledge Base</p>
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">Tips & Insights</h1>
                            <p className="text-muted-foreground max-w-lg">
                                Coding tips, design thinking, and engineering best practices.
                            </p>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase mb-3">Knowledge</p>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">Tips</h1>
                            <p className="text-muted-foreground mt-3 max-w-md mx-auto">
                                Curated insights from my engineering experience.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Search & Filters */}
            <section className="py-4 px-6 md:px-16 lg:px-24 sticky top-16 z-50">
                <div className="max-w-6xl mx-auto">
                    <div className={`p-4 flex flex-col md:flex-row items-center gap-4 backdrop-blur-xl border transition-all ${
                        isDark ? 'bg-card/80 border-border rounded-xl' : 'bg-white/80 border-border rounded-2xl'
                    }`}>
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input 
                                type="text" 
                                placeholder="Search tips..."
                                value={searchQuery} 
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full h-10 bg-transparent pl-10 text-sm outline-none placeholder:text-muted-foreground"
                            />
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {categories.map(cat => (
                                <button
                                    key={cat} 
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-1.5 text-xs font-medium transition-all ${
                                        isDark ? 'rounded-md' : 'rounded-full'
                                    } ${
                                        selectedCategory === cat 
                                            ? 'bg-primary text-primary-foreground' 
                                            : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-8 px-6 md:px-16 lg:px-24">
                <div className="max-w-6xl mx-auto">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24 gap-4">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                            <span className="text-sm text-muted-foreground">Loading tips...</span>
                        </div>
                    ) : filteredTips.length > 0 ? (
                        !isDark ? (
                            /* Light: List-style cards */
                            <div className="space-y-4">
                                {filteredTips.map((tip, index) => (
                                    <motion.div
                                        key={tip.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.03 }}
                                        viewport={{ once: true }}
                                        onClick={() => navigate(`/tips/${tip.id}`)}
                                        className="silk-card cursor-pointer group flex items-center gap-6"
                                    >
                                        <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center shrink-0">
                                            <Lightbulb className="w-5 h-5 text-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[10px] font-medium text-primary uppercase tracking-wider">{tip.category}</span>
                                                <span className="text-muted-foreground text-[10px]">·</span>
                                                <span className="text-[10px] text-muted-foreground">{new Date(tip.fetched_at).toLocaleDateString()}</span>
                                            </div>
                                            <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                                {tip.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">{tip.content}</p>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            /* Dark: Grid cards */
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredTips.map((tip, index) => (
                                    <motion.div
                                        key={tip.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.03 }}
                                        viewport={{ once: true }}
                                        onClick={() => navigate(`/tips/${tip.id}`)}
                                        className="architect-card cursor-pointer group flex flex-col"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-[10px] font-medium text-primary uppercase tracking-wider bg-primary/5 px-3 py-1 rounded-md">
                                                {tip.category}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(tip.fetched_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                            {tip.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">{tip.content}</p>
                                        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                                            <span className="text-xs text-muted-foreground">Read more</span>
                                            <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )
                    ) : (
                        <div className="py-24 text-center">
                            <Lightbulb className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                            <h2 className="text-xl font-bold text-foreground mb-2">No tips found</h2>
                            <p className="text-muted-foreground">Try adjusting your search or filters.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-16 px-6 md:px-16 lg:px-24">
                <div className={`max-w-4xl mx-auto p-10 md:p-16 text-center ${isDark ? 'architect-card' : 'silk-card'}`}>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 text-foreground">More Coming Soon</h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        New tips and insights are added regularly. Check back for updates.
                    </p>
                </div>
            </section>
        </div>
    );
}
