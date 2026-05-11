import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, ArrowRight, Loader2, Lightbulb, RefreshCw, Zap, Sparkles, User } from 'lucide-react';
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
    const [refreshing, setRefreshing] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [sortOrder, setSortOrder] = useState<'NEWEST' | 'OLDEST'>('NEWEST');
    const navigate = useNavigate();

    const fetchTips = useCallback(async (isRefresh = false) => {
        if (isRefresh) setRefreshing(true);
        try {
            const data = await getCodingTips();
            setTips(data || []);
            setLastUpdated(new Date());
        } catch (err) {
            console.error('Failed to fetch tips:', err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchTips();
        // Auto-refresh every 5 minutes to pick up newly inserted tips
        const interval = setInterval(() => fetchTips(true), 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [fetchTips]);

    const categories = ['ALL', 'OOP', 'DSA', 'REACT', 'LANGUAGES', ...Array.from(new Set(tips.filter(t => t?.category).map(tip => tip.category.toUpperCase()))).filter(c => !['OOP', 'DSA', 'REACT', 'LANGUAGES'].includes(c))];

    const filteredTips = tips.filter(tip => {
        if (!tip) return false;
        const matchesSearch = (tip.title || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
                             (tip.content || "").toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'ALL' || (tip.category || "").toUpperCase() === selectedCategory;
        return matchesSearch && matchesCategory;
    }).sort((a, b) => {
        const dateA = new Date(a.fetched_at).getTime();
        const dateB = new Date(b.fetched_at).getTime();
        return sortOrder === 'NEWEST' ? dateB - dateA : dateA - dateB;
    });

    return (
        <div className="relative min-h-screen bg-background transition-colors duration-500">
            
            {/* Header */}
            <section className="pt-24 pb-8 px-6 md:px-16 lg:px-24">
                <div className="max-w-6xl mx-auto">
        {!isDark ? (
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">Knowledge Base</p>
                                <span className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Live · Updated Daily
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">Tips & Insights</h1>
                            <div className="flex items-center gap-4">
                                <p className="text-muted-foreground max-w-lg">
                                    Performance tips, algorithm optimizations, and engineering best practices.
                                </p>
                                {lastUpdated && (
                                    <button onClick={() => fetchTips(true)} title="Refresh" className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-primary transition-colors shrink-0">
                                        <RefreshCw className={`w-3 h-3 ${refreshing ? 'animate-spin' : ''}`} />
                                        {refreshing ? 'Refreshing...' : `Updated ${lastUpdated.toLocaleTimeString()}`}
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <div className="flex items-center justify-center gap-2 mb-3">
                                <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase">Knowledge</p>
                                <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-500">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Live
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">Tips</h1>
                            <p className="text-muted-foreground mt-3 max-w-md mx-auto">
                                Performance optimizations & engineering insights, refreshed daily.
                            </p>
                            {lastUpdated && (
                                <button onClick={() => fetchTips(true)} className="mt-3 flex items-center gap-1 text-[10px] text-muted-foreground hover:text-primary transition-colors mx-auto">
                                    <RefreshCw className={`w-3 h-3 ${refreshing ? 'animate-spin' : ''}`} />
                                    {refreshing ? 'Refreshing...' : `Synced ${lastUpdated.toLocaleTimeString()}`}
                                </button>
                            )}
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
                        <div className="flex flex-wrap items-center gap-2">
                            <button
                                onClick={() => setSortOrder(prev => prev === 'NEWEST' ? 'OLDEST' : 'NEWEST')}
                                className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold border transition-all ${
                                    isDark ? 'rounded-md border-primary/20 hover:bg-primary/5' : 'rounded-full border-primary/10 hover:bg-primary/5'
                                }`}
                            >
                                <RefreshCw className={`w-3 h-3 ${sortOrder === 'NEWEST' ? '' : 'rotate-180'} transition-transform`} />
                                {sortOrder === 'NEWEST' ? 'Newest First' : 'Oldest First'}
                            </button>
                            <div className="h-6 w-px bg-border hidden md:block mx-1" />
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
                        <>
                            {/* Featured Tip Hero */}
                            {selectedCategory === 'ALL' && !searchQuery && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    onClick={() => navigate(`/tips/${filteredTips[0].id}`)}
                                    className={`mb-12 p-8 md:p-12 cursor-pointer group relative overflow-hidden transition-all ${
                                        isDark ? 'architect-card' : 'silk-card bg-primary/[0.02]'
                                    }`}
                                >
                                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Zap className="w-32 h-32 text-primary" />
                                    </div>
                                    <div className="relative z-10">
                                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
                                            <Sparkles className="w-3 h-3" /> Featured Tip
                                        </span>
                                        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 max-w-2xl font-['Playfair_Display']">
                                            {filteredTips[0].title}
                                        </h2>
                                        <p className="text-lg text-muted-foreground mb-8 max-w-xl line-clamp-2 italic">
                                            "{filteredTips[0].content}"
                                        </p>
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                                    <User className="w-4 h-4 text-primary" />
                                                </div>
                                                <span className="text-sm font-medium text-foreground">{filteredTips[0].author}</span>
                                            </div>
                                            <span className="text-xs text-muted-foreground flex items-center gap-2">
                                                <Calendar className="w-4 h-4" /> {new Date(filteredTips[0].fetched_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Tips Grid */}
                            {!isDark ? (
                                /* Light: List-style cards */
                                <motion.div 
                                  layout 
                                  className="space-y-4"
                                >
                                    {filteredTips.slice(selectedCategory === 'ALL' && !searchQuery ? 1 : 0).map((tip, index) => (
                                        <motion.div
                                            key={tip.id}
                                            layout
                                            initial={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
                                            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                            transition={{ delay: index * 0.05, duration: 0.6 }}
                                            viewport={{ once: true }}
                                            whileHover={{ x: 10, transition: { duration: 0.2 } }}
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
                                </motion.div>
                            ) : (
                                /* Dark: Grid cards */
                                <motion.div 
                                  layout
                                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
                                >
                                    {filteredTips.slice(selectedCategory === 'ALL' && !searchQuery ? 1 : 0).map((tip, index) => (
                                        <motion.div
                                            key={tip.id}
                                            layout
                                            initial={{ opacity: 0, y: 40, skewY: 2 }}
                                            whileInView={{ opacity: 1, y: 0, skewY: 0 }}
                                            transition={{ 
                                              type: "spring",
                                              damping: 30,
                                              stiffness: 200,
                                              delay: index * 0.04 
                                            }}
                                            viewport={{ once: true }}
                                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
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
                                </motion.div>
                            )}
                        </>
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
                    <Zap className="w-8 h-8 text-primary mx-auto mb-4 opacity-60" />
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 text-foreground">New Tip Every Day</h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        Tips covering performance, algorithms, clean code, and modern JavaScript — automatically updated at midnight UTC.
                    </p>
                    {lastUpdated && (
                        <p className="text-xs text-muted-foreground/50 mt-4">
                            Last synced: {lastUpdated.toLocaleString()}
                        </p>
                    )}
                </div>
            </section>
        </div>
    );
}
