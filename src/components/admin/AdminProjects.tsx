import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { supabase } from '@/lib/supabase';
import { uploadProjectImage, uploadProjectImages } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Plus, Trash2, Edit2, Save, X, Image as ImageIcon,
    Github, ExternalLink, Loader2, Search, AlertTriangle, Globe, Archive,
    Video, PlayCircle, Link2, Upload, FileCode
} from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/hooks/useTheme';
import { SafeImage } from '@/components/ui/SafeImage';
import { ConfirmDeleteModal } from '@/components/ui/ConfirmDeleteModal';

interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    images: string[];
    video_url?: string;
    github_link?: string;
    deployed_link?: string;
    tech_stack: string[];
    category: string;
    is_video_primary?: boolean;
}

export const AdminProjects = () => {
    const { isDark } = useTheme();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [techStackText, setTechStackText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    
    // File upload state
    const mainImageRef = useRef<HTMLInputElement>(null);
    const galleryImagesRef = useRef<HTMLInputElement>(null);
    const [selectedMainFile, setSelectedMainFile] = useState<File | null>(null);
    const [selectedGalleryFiles, setSelectedGalleryFiles] = useState<File[]>([]);

    useEffect(() => { fetchProjects(); }, []);

    const fetchProjects = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('id', { ascending: false });

        if (error) {
            toast.error('Failed to load projects.');
        } else {
            const mappedData = (data || []).map(p => ({
                ...p,
                tech_stack: p.tech_stack || [],
                images: p.images || []
            }));
            setProjects(mappedData);
        }
        setLoading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingProject?.title) {
            toast.error('Project title is required.');
            return;
        }

        setIsSaving(true);
        try {
            let finalImageUrl = editingProject.image || '';
            let finalGalleryUrls = [...(editingProject.images || [])];

            // 1. Upload main image if selected
            if (selectedMainFile) {
                toast.info('Uploading main image...');
                finalImageUrl = await uploadProjectImage(selectedMainFile);
            }

            // 2. Upload gallery images if selected
            if (selectedGalleryFiles.length > 0) {
                toast.info(`Uploading ${selectedGalleryFiles.length} gallery images...`);
                const newGalleryUrls = await uploadProjectImages(selectedGalleryFiles);
                finalGalleryUrls = [...finalGalleryUrls, ...newGalleryUrls];
            }

            const projectToSave = {
                title: editingProject.title,
                description: editingProject.description || '',
                category: editingProject.category || 'web',
                image: finalImageUrl,
                images: finalGalleryUrls,
                tech_stack: techStackText.split(',').map(s => s.trim()).filter(Boolean),
                github_link: editingProject.github_link || '',
                deployed_link: editingProject.deployed_link || '',
                video_url: editingProject.video_url || '',
                is_video_primary: editingProject.is_video_primary || false
            };

            if (editingProject.id) {
                const { error } = await supabase.from('projects').update(projectToSave).eq('id', editingProject.id);
                if (error) throw error;
                toast.success('Project updated.');
            } else {
                const { error } = await supabase.from('projects').insert([projectToSave]);
                if (error) throw error;
                toast.success('Project added.');
            }
            
            // Reset state
            setEditingProject(null);
            setTechStackText('');
            setSelectedMainFile(null);
            setSelectedGalleryFiles([]);
            fetchProjects();
        } catch (error: any) {
            toast.error('Error saving project: ' + error.message);
            console.error('Save error:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        setIsDeleting(true);
        try {
            const { error } = await supabase.from('projects').delete().eq('id', deleteId);
            if (error) {
                toast.error('Failed to delete project.');
            } else {
                toast.success('Project permanently deleted.');
                fetchProjects();
            }
        } catch (err: any) {
            toast.error('Deletion error: ' + err.message);
        } finally {
            setIsDeleting(false);
            setDeleteId(null);
        }
    };

    const filteredProjects = projects.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-20">
            <Loader2 className="animate-spin w-8 h-8 mb-4 text-primary" />
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-black opacity-40 italic">Syncing Projects...</p>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className={`flex flex-col md:flex-row justify-between items-center gap-4 p-5 border rounded-lg ${
                isDark ? 'border-border bg-card' : 'bg-white border-border shadow-sm'
            }`}>
                <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-primary/10' : 'bg-primary/5'}`}>
                        <Archive className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-foreground uppercase tracking-tight">Projects</h2>
                        <p className="text-[10px] text-muted-foreground uppercase font-black italic opacity-60">{projects.length} Total Records</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-56">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                        <input 
                            type="text" placeholder="Search projects..."
                            value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                            className={`w-full pl-9 h-9 rounded-lg border text-xs outline-none transition-colors ${
                                isDark ? 'bg-background border-border focus:border-primary' : 'bg-white border-border focus:border-primary'
                            }`}
                        />
                    </div>
                    <button 
                        onClick={() => {
                            setEditingProject({ 
                                title: '', 
                                description: '', 
                                tech_stack: [], 
                                github_link: '', 
                                deployed_link: '', 
                                image: '', 
                                images: [],
                                video_url: '',
                                category: 'web',
                                is_video_primary: false
                            });
                            setSelectedMainFile(null);
                            setSelectedGalleryFiles([]);
                        }}
                        className={`px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2 whitespace-nowrap transition-all hover:scale-[1.02] active:scale-[0.98] ${
                            isDark ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-primary text-white hover:bg-primary/90'
                        }`}
                    >
                        <Plus className="w-4 h-4" /> Add Project
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.div 
                            layout key={project.id}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`rounded-lg border transition-all group overflow-hidden ${
                                isDark ? 'bg-card border-border hover:border-primary/30' : 'bg-white border-border hover:border-primary/20 shadow-sm'
                            }`}
                        >
                            <div className="flex flex-col lg:flex-row gap-4 p-5">
                                <div className="w-full lg:w-36 aspect-video lg:aspect-square rounded-lg border border-border overflow-hidden shrink-0 relative transition-transform duration-500 group-hover:scale-[1.02]">
                                    {project.image ? (
                                        <SafeImage src={project.image} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-muted">
                                            <ImageIcon className="w-6 h-6 text-muted-foreground/30" />
                                        </div>
                                    )}
                                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                                        {project.is_video_primary && (
                                            <span className="w-6 h-6 bg-primary text-white rounded-md flex items-center justify-center shadow-lg">
                                                <Video className="w-3.5 h-3.5" />
                                            </span>
                                        )}
                                        {project.images.length > 0 && (
                                            <span className="w-6 h-6 bg-black/50 backdrop-blur-md text-white rounded-md flex items-center justify-center text-[10px] font-black">
                                                +{project.images.length}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <span className={`px-2 py-0.5 text-[8px] font-black rounded uppercase tracking-tighter italic border ${
                                                    isDark ? 'bg-primary/10 text-primary border-primary/20' : 'bg-primary/5 text-primary border-primary/10'
                                                }`}>{project.category}</span>
                                            </div>
                                            <h3 className="text-base font-bold text-foreground line-clamp-1 uppercase tracking-tight">{project.title}</h3>
                                        </div>
                                        <div className="flex gap-1.5 translate-y-[-2px]">
                                            <button onClick={() => {
                                                setEditingProject(project);
                                                setTechStackText(project.tech_stack?.join(', ') || '');
                                                setSelectedMainFile(null);
                                                setSelectedGalleryFiles([]);
                                            }}
                                                className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/20">
                                                <Edit2 className="w-3.5 h-3.5" />
                                            </button>
                                            <button onClick={() => setDeleteId(project.id)}
                                                className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors border border-transparent hover:border-red-100">
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">{project.description}</p>
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {(project.tech_stack || []).map((tech, i) => (
                                            <span key={i} className={`px-2 py-0.5 text-[8px] rounded font-black uppercase tracking-tighter border ${
                                                isDark ? 'bg-primary/5 text-primary/60 border-primary/10' : 'bg-primary/5 text-primary/50 border-primary/5'
                                            }`}>{tech}</span>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap gap-4 pt-1 border-t border-border/50 mt-2">
                                        {project.deployed_link && (
                                            <a href={project.deployed_link} target="_blank" rel="noopener noreferrer" 
                                                className="flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter text-primary hover:underline italic">
                                                <Globe className="w-2.5 h-2.5" /> View Live
                                            </a>
                                        )}
                                        {project.github_link && (
                                            <a href={project.github_link} target="_blank" rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter text-muted-foreground hover:text-primary italic">
                                                <Github className="w-2.5 h-2.5" /> Github
                                            </a>
                                        )}
                                        {project.video_url && (
                                            <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter text-muted-foreground/60 italic">
                                                <PlayCircle className="w-2.5 h-2.5" /> Demo Video
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {editingProject && (
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                        >
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                className={`w-full max-w-4xl rounded-xl border shadow-2xl transition-all duration-500 ${
                                    isDark ? 'bg-card border-border shadow-primary/5' : 'bg-white border-border'
                                }`}
                            >
                                <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                                            <Edit2 className="w-4 h-4 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-black uppercase tracking-widest text-foreground">{editingProject.id ? 'Refine' : 'Architect'} Project</h3>
                                            <p className="text-[10px] text-muted-foreground uppercase font-black italic opacity-50">Manual Vault Entry</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setEditingProject(null)} className="p-2 rounded-lg hover:bg-muted transition-colors border border-transparent hover:border-border">
                                        <X className="w-4 h-4 text-muted-foreground" />
                                    </button>
                                </div>

                                <div className="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
                                    <form onSubmit={handleSave} className="space-y-8">
                                        {/* Main Details */}
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-1.5 font-bold">
                                                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-primary italic">Project Identity *</label>
                                                <input 
                                                    type="text" required value={editingProject.title || ''}
                                                    onChange={e => setEditingProject({...editingProject, title: e.target.value})}
                                                    className={`w-full h-11 rounded-lg border px-4 text-sm outline-none transition-all ${
                                                        isDark ? 'bg-background border-border focus:border-primary focus:ring-1 focus:ring-primary/20' : 'bg-white border-border focus:border-primary focus:ring-1 focus:ring-primary/20'
                                                    }`}
                                                    placeholder="e.g. Finance Tracker"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-primary italic">Platform Segment</label>
                                                <select
                                                    value={editingProject.category || 'web'}
                                                    onChange={e => setEditingProject({...editingProject, category: e.target.value})}
                                                    className={`w-full h-11 rounded-lg border px-4 text-sm outline-none font-bold transition-all ${
                                                        isDark ? 'bg-background border-border focus:border-primary' : 'bg-white border-border focus:border-primary'
                                                    }`}
                                                >
                                                    <option value="web">WEB INTERFACE</option>
                                                    <option value="mobile">MOBILE APPLICATION</option>
                                                    <option value="desktop">DESKTOP SYSTEM</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-primary italic">Architecture Overview</label>
                                            <textarea 
                                                rows={3} value={editingProject.description || ''}
                                                onChange={e => setEditingProject({...editingProject, description: e.target.value})}
                                                className={`w-full rounded-lg border p-4 text-sm font-medium outline-none transition-all leading-relaxed ${
                                                    isDark ? 'bg-background border-border focus:border-primary' : 'bg-white border-border focus:border-primary'
                                                }`}
                                                placeholder="Describe the logic and impact..."
                                            />
                                        </div>

                                        {/* Image Upload System */}
                                        <div className="space-y-6 p-6 rounded-xl border border-primary/10 bg-primary/[0.02] relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
                                                <Upload className="w-32 h-32" />
                                            </div>
                                            
                                            <div className="grid md:grid-cols-2 gap-8">
                                                {/* Hero Image Section */}
                                                <div className="space-y-3">
                                                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-primary italic flex items-center gap-2">
                                                        <ImageIcon className="w-3 h-3" /> Hero Asset
                                                    </label>
                                                    <div 
                                                        onClick={() => mainImageRef.current?.click()}
                                                        className={`aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all group relative overflow-hidden ${
                                                            isDark ? 'border-border hover:border-primary/40 bg-background/50' : 'border-border hover:border-primary/40 bg-white'
                                                        }`}
                                                    >
                                                        {selectedMainFile ? (
                                                            <div className="absolute inset-0 bg-primary/10 flex items-center justify-center flex-col p-4 text-center">
                                                                <FileCode className="w-8 h-8 text-primary mb-2" />
                                                                <span className="text-[10px] font-black uppercase tracking-widest line-clamp-1">{selectedMainFile.name}</span>
                                                                <span className="text-[8px] opacity-40 uppercase font-black">Ready for upload</span>
                                                            </div>
                                                        ) : editingProject.image ? (
                                                            <SafeImage src={editingProject.image} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-20 transition-opacity" />
                                                        ) : null}
                                                        
                                                        {!selectedMainFile && (
                                                            <>
                                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                                    <Upload className="w-4 h-4 text-primary" />
                                                                </div>
                                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity">Select Cover Image</span>
                                                            </>
                                                        )}
                                                        <input 
                                                            type="file" ref={mainImageRef} className="hidden" accept="image/*"
                                                            onChange={e => setSelectedMainFile(e.target.files?.[0] || null)}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-1.5 mt-2">
                                                        <span className="text-[8px] font-black uppercase tracking-widest opacity-30 italic">Direct Link (Optional)</span>
                                                        <input 
                                                            type="text" value={editingProject.image || ''}
                                                            onChange={e => setEditingProject({...editingProject, image: e.target.value})}
                                                            className={`w-full h-8 rounded border px-3 text-[10px] outline-none ${
                                                                isDark ? 'bg-background border-border' : 'bg-white border-border'
                                                            }`}
                                                            placeholder="https://... cover image"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Gallery Section */}
                                                <div className="space-y-3">
                                                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-primary italic flex items-center gap-2">
                                                        <Archive className="w-3 h-3" /> Visual Library
                                                    </label>
                                                    <div 
                                                        onClick={() => galleryImagesRef.current?.click()}
                                                        className={`aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all group relative overflow-hidden ${
                                                            isDark ? 'border-border hover:border-primary/40 bg-background/50' : 'border-border hover:border-primary/40 bg-white'
                                                        }`}
                                                    >
                                                        {selectedGalleryFiles.length > 0 ? (
                                                            <div className="absolute inset-0 bg-primary/10 flex items-center justify-center flex-col p-4 text-center">
                                                                <Archive className="w-8 h-8 text-primary mb-2" />
                                                                <span className="text-[10px] font-black uppercase tracking-widest">{selectedGalleryFiles.length} Assets Selected</span>
                                                                <span className="text-[8px] opacity-40 uppercase font-black">Will be appended to gallery</span>
                                                            </div>
                                                        ) : null}

                                                        {selectedGalleryFiles.length === 0 && (
                                                            <>
                                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                                    <Plus className="w-4 h-4 text-primary" />
                                                                </div>
                                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity">Select Multiple Assets</span>
                                                            </>
                                                        )}
                                                        <input 
                                                            type="file" ref={galleryImagesRef} className="hidden" accept="image/*" multiple
                                                            onChange={e => setSelectedGalleryFiles(Array.from(e.target.files || []))}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-1.5 mt-2">
                                                        <span className="text-[8px] font-black uppercase tracking-widest opacity-30 italic">Existing Gallery Records ({editingProject.images?.length || 0})</span>
                                                        <textarea 
                                                            rows={2} value={editingProject.images?.join('\n') || ''}
                                                            onChange={e => setEditingProject({...editingProject, images: e.target.value.split(/[\n,]/).map(s => s.trim()).filter(Boolean)})}
                                                            className={`w-full rounded border p-3 text-[10px] outline-none ${
                                                                isDark ? 'bg-background border-border' : 'bg-white border-border'
                                                            }`}
                                                            placeholder="URLs per line..."
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Deployment & Links */}
                                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 rounded-xl border border-border bg-muted/50">
                                            {[
                                                { label: 'GitHub Link', icon: Github, key: 'github_link', ph: 'https://github.com/...' },
                                                { label: 'Live Interface', icon: Globe, key: 'deployed_link', ph: 'https://project.com' },
                                                { label: 'Video Stream', icon: Video, key: 'video_url', ph: 'Loom or Youtube' },
                                            ].map((link) => (
                                              <div key={link.key} className="space-y-1.5">
                                                  <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                                      <link.icon className="w-3 h-3" /> {link.label}
                                                  </label>
                                                  <input 
                                                      type="url" value={(editingProject as any)[link.key] || ''}
                                                      onChange={e => setEditingProject({...editingProject, [link.key]: e.target.value})}
                                                      className={`w-full h-10 rounded-lg border px-4 text-xs font-bold outline-none transition-all ${
                                                          isDark ? 'bg-background border-border focus:border-primary' : 'bg-white border-border focus:border-primary'
                                                      }`}
                                                      placeholder={link.ph}
                                                  />
                                              </div>
                                            ))}

                                            {/* Extra Links Removed due to Schema Mismatch */}

                                            <div className="flex items-center gap-4 pt-4">
                                                <label className="flex items-center gap-3 cursor-pointer group">
                                                    <div className="relative w-5 h-5">
                                                        <input 
                                                            type="checkbox" checked={editingProject.is_video_primary || false}
                                                            onChange={e => setEditingProject({...editingProject, is_video_primary: e.target.checked})}
                                                            className="peer hidden"
                                                        />
                                                        <div className="w-5 h-5 rounded border-2 border-border peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center">
                                                            <Save className="w-3 h-3 text-white scale-0 peer-checked:scale-100 transition-transform" />
                                                        </div>
                                                    </div>
                                                    <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground group-hover:text-foreground transition-colors italic">Primary Stream Mode</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-primary italic">Tech Stack Integration (comma-separated)</label>
                                            <input 
                                                type="text" value={techStackText}
                                                onChange={e => setTechStackText(e.target.value)}
                                                className={`w-full h-11 rounded-lg border px-4 text-sm font-black outline-none transition-colors ${
                                                    isDark ? 'bg-background border-border focus:border-primary shadow-sm' : 'bg-white border-border focus:border-primary'
                                                }`}
                                                placeholder="REACT, TYPESCRIPT, SUPABASE..."
                                            />
                                        </div>

                                        <div className="flex justify-end gap-4 pt-8 border-t border-border">
                                            <button type="button" onClick={() => setEditingProject(null)}
                                                className="px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
                                                ABORT
                                            </button>
                                            <button type="submit" disabled={isSaving}
                                                className="px-10 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-3 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-all shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]">
                                                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" /> Finalize Record</>}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            , document.body)}

            <ConfirmDeleteModal 
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                isDeleting={isDeleting}
                title="Delete Project?"
                description="This action will permanently remove this project and all its associated data from the portfolio. This cannot be undone."
            />
        </div>
    );
};
