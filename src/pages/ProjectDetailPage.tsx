import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Github, ExternalLink, X, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { SafeImage } from '@/components/ui/SafeImage';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export const ProjectDetailPage = () => {
    const { id } = useParams();
    const { isDark } = useTheme();
    const [project, setProject] = useState<any>(null);
    const [selectedImgIndex, setSelectedImgIndex] = useState<number | null>(null);
    const allProjectImages = project ? [project.image, ...(project.images || [])].filter(Boolean) : [];
    const isMobile = project?.category?.toLowerCase() === 'mobile';

    useEffect(() => {
        const fetchProject = async () => {
            const { data } = await supabase
                .from('projects')
                .select('*')
                .eq('id', id)
                .single();
            if (data) {
                setProject({
                    ...data,
                    tags: data.tech_stack || [],
                    images: data.images || []
                });
            }
        };
        fetchProject();
    }, [id]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedImgIndex === null) return;
            
            if (e.key === 'ArrowRight') {
                setSelectedImgIndex((prev) => (prev !== null && prev < allProjectImages.length - 1 ? prev + 1 : 0));
            } else if (e.key === 'ArrowLeft') {
                setSelectedImgIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : allProjectImages.length - 1));
            } else if (e.key === 'Escape') {
                setSelectedImgIndex(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImgIndex, allProjectImages.length]);

    if (!project) return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">Loading project...</span>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background transition-colors duration-500">
            <div className="pt-24 pb-16 px-6 md:px-16 lg:px-24">
                <div className="max-w-6xl mx-auto">
                    
                    {/* Back link */}
                    <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" /> Back to projects
                    </Link>

                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
                        <div>
                            <span className="text-xs font-medium text-primary uppercase tracking-wider">{project.category}</span>
                            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mt-1">{project.title}</h1>
                        </div>
                        <div className="flex gap-3">
                            {project.github_link && (
                                <a href={project.github_link} target="_blank" rel="noreferrer" className={`w-11 h-11 flex items-center justify-center transition-all ${
                                    isDark ? 'bg-card border border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary/30' : 'bg-muted rounded-xl text-muted-foreground hover:text-primary'
                                }`}>
                                    <Github className="w-5 h-5" />
                                </a>
                            )}
                            {project.deployed_link && (
                                <a href={project.deployed_link} target="_blank" rel="noreferrer" className="imperial-btn text-xs">
                                    View Live <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className={`grid gap-8 ${isMobile ? 'lg:grid-cols-2' : 'lg:grid-cols-3'}`}>
                        
                        {/* Main image + Gallery */}
                        <div className={`${isMobile ? 'lg:col-span-1 border-r border-border/50 pr-8' : 'lg:col-span-2'} space-y-8`}>
                            <div className="relative group">
                                {isMobile && (
                                    <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
                                )}
                                <div 
                                    onClick={() => setSelectedImgIndex(0)}
                                    className={`
                                        relative overflow-hidden cursor-zoom-in transition-all duration-700
                                        ${isMobile 
                                            ? 'max-w-[320px] mx-auto aspect-[9/19] rounded-[2.5rem] border-[8px] border-card shadow-2xl overflow-hidden' 
                                            : `aspect-video ${isDark ? 'architect-card p-0' : 'silk-card p-0'}`
                                        }
                                    `}
                                >
                                    <SafeImage 
                                        src={project.image} 
                                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" 
                                        alt={project.title} 
                                    />
                                    {isMobile && (
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-card rounded-b-2xl z-20" />
                                    )}
                                </div>
                            </div>

                            {/* Gallery */}
                            {project.images.length > 0 && (
                                <div>
                                    <h2 className="text-lg font-bold tracking-tight mb-4 text-foreground uppercase flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        Interface Gallery
                                    </h2>
                                    <div className={`grid gap-4 ${isMobile ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2 md:grid-cols-4'}`}>
                                        {project.images.map((img: string, i: number) => (
                                            <div 
                                                key={i} 
                                                onClick={() => setSelectedImgIndex(i + 1)} 
                                                className={`
                                                    relative overflow-hidden cursor-pointer group transition-all
                                                    ${isMobile 
                                                        ? 'aspect-[9/16] rounded-2xl border border-border/50' 
                                                        : `aspect-square ${isDark ? 'architect-card p-0' : 'silk-card p-0'}`
                                                    }
                                                `}
                                            >
                                                <SafeImage src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={`Screenshot ${i+1}`} />
                                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                                        <ExternalLink className="w-4 h-4 text-white" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <div className={`p-8 ${isDark ? 'architect-card' : 'silk-card'}`}>
                                <h2 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                                    Description
                                </h2>
                                <p className="text-base text-muted-foreground leading-relaxed mb-8 opacity-80">{project.description}</p>
                                
                                <div className="space-y-4">
                                    <h3 className="text-xs font-black tracking-widest text-primary/60 uppercase italic">Technology Stack</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech_stack?.map((tag: string) => (
                                            <span key={tag} className={`text-[10px] font-bold px-3 py-1.5 uppercase tracking-tighter ${
                                                isDark ? 'bg-primary/10 text-primary border border-primary/20 rounded-md' : 'bg-primary/5 text-primary rounded-full border border-primary/10 shadow-sm'
                                            }`}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { k: 'Category', v: project.category?.toUpperCase() || 'Web' },
                                    { k: 'Platform', v: isMobile ? 'iOS / Android' : 'Cross-Platform' },
                                    { k: 'Year', v: new Date(project.created_at).getFullYear() || '2024' },
                                    { k: 'Status', v: 'Production' },
                                ].map((row, i) => (
                                    <div key={i} className={`p-5 text-center transition-all hover:border-primary/30 ${isDark ? 'architect-card group' : 'silk-card'}`}>
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-1 opacity-50">{row.k}</span>
                                        <span className="text-sm font-black text-foreground uppercase italic">{row.v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImgIndex !== null && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[500] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
                    >
                        {/* Close Button */}
                        <button 
                            onClick={() => setSelectedImgIndex(null)}
                            className="absolute top-6 right-6 z-[510] w-12 h-12 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-md border border-white/10"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Navigation Arrows */}
                        {allProjectImages.length > 1 && (
                            <>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedImgIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : allProjectImages.length - 1));
                                    }}
                                    className="absolute left-6 z-[510] w-14 h-14 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-md border border-white/10 group active:scale-95"
                                >
                                    <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
                                </button>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedImgIndex((prev) => (prev !== null && prev < allProjectImages.length - 1 ? prev + 1 : 0));
                                    }}
                                    className="absolute right-6 z-[510] w-14 h-14 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-md border border-white/10 group active:scale-95"
                                >
                                    <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </>
                        )}

                        <div className="relative w-full h-full flex items-center justify-center" onClick={() => setSelectedImgIndex(null)}>
                            <motion.div 
                                key={selectedImgIndex}
                                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="max-w-6xl max-h-[85vh] flex items-center justify-center select-none"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <SafeImage 
                                    src={allProjectImages[selectedImgIndex]} 
                                    className="w-full h-full object-contain shadow-2xl rounded-lg" 
                                    alt="Full view" 
                                />
                            </motion.div>

                            {/* Counter */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-white/60 text-xs font-mono tracking-widest uppercase">
                                {selectedImgIndex + 1} / {allProjectImages.length}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
