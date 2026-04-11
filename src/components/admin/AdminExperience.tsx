import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Plus, Trash2, Save, X, Activity, Loader2, 
    Briefcase, Calendar, Edit2, MapPin, AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/hooks/useTheme';
import { ConfirmDeleteModal } from '@/components/ui/ConfirmDeleteModal';

interface Experience {
    id: string;
    role: string;
    company: string;
    duration: string;
    description: string;
    location?: string;
    points: string[];
}

export const AdminExperience = () => {
    const { isDark } = useTheme();
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingExp, setEditingExp] = useState<Partial<Experience> | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [pointsText, setPointsText] = useState('');

    useEffect(() => { fetchExperience(); }, []);

    const fetchExperience = async () => {
        setLoading(true);
        // Explicitly name columns to avoid 'date' schema cache errors
        const { data, error } = await supabase
            .from('experience')
            .select('id, role, company, duration, description, location, points, type, link, order_index, created_at')
            .order('id', { ascending: false });

        if (error) {
            console.error('Fetch error:', error);
            toast.error('Failed to load experience data. Ensure database column "duration" exists.');
        } else {
            const normalizedData = (data || []).map((exp: any) => ({
                id: exp.id,
                role: exp.role || '',
                company: exp.company || '',
                duration: exp.duration || '',
                description: typeof exp.description === 'string' ? exp.description : (Array.isArray(exp.description) ? exp.description.join('\n') : ''),
                location: exp.location || '',
                points: Array.isArray(exp.points) ? exp.points : []
            }));
            setExperiences(normalizedData);
        }
        setLoading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingExp?.role || !editingExp?.company) {
            toast.error('Role and Company are required.');
            return;
        }

        const pointsArray = pointsText.split(',').map(s => s.trim()).filter(Boolean);
        setIsSaving(true);
        try {
            // STRICT SANITIZATION: Only send columns that exist in the new schema
            const expToSave: any = {
                role: editingExp.role,
                company: editingExp.company,
                duration: editingExp.duration,
                location: editingExp.location || '',
                description: editingExp.description || '',
                points: pointsArray
            };
            
            if (editingExp.id) {
                const { error } = await supabase.from('experience').update(expToSave).eq('id', editingExp.id);
                if (error) throw error;
                toast.success('Experience listing updated.');
            } else {
                const { error } = await supabase.from('experience').insert([expToSave]);
                if (error) throw error;
                toast.success('Experience record added.');
            }
            setEditingExp(null);
            setPointsText('');
            fetchExperience();
        } catch (error: any) {
            console.error('Save error:', error);
            toast.error('Sync Error: ' + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        setIsDeleting(true);
        try {
            const { error } = await supabase.from('experience').delete().eq('id', deleteId);
            if (error) {
                toast.error('Failed to delete.');
            } else {
                toast.success('Entry deleted.');
                fetchExperience();
            }
        } finally {
            setIsDeleting(false);
            setDeleteId(null);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-20">
            <Loader2 className="animate-spin w-8 h-8 mb-4 text-primary" />
            <p className="text-xs text-muted-foreground">Loading experience...</p>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className={`flex flex-col md:flex-row justify-between items-center gap-4 p-5 border rounded-lg ${
                isDark ? 'border-border bg-card' : 'bg-white border-border shadow-sm'
            }`}>
                <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-primary/10' : 'bg-primary/5'}`}>
                        <Activity className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-foreground">Experience</h2>
                        <p className="text-xs text-muted-foreground">{experiences.length} entries</p>
                    </div>
                </div>
                <button 
                    onClick={() => setEditingExp({ role: '', company: '', duration: '', description: '', points: [], location: '' })}
                    className={`px-5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
                        isDark ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-primary text-white hover:bg-primary/90'
                    }`}
                >
                    <Plus className="w-4 h-4" /> Add Experience
                </button>
            </div>

            {/* Cards */}
            <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                    {experiences.map((exp) => (
                        <motion.div 
                            layout key={exp.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`p-5 rounded-lg border transition-all group ${
                                isDark ? 'bg-card border-border hover:border-primary/30' : 'bg-white border-border hover:border-primary/20 shadow-sm'
                            }`}
                        >
                            <div className="flex flex-col lg:flex-row justify-between gap-4">
                                <div className="space-y-2 flex-1">
                                    <div className="flex items-center gap-3">
                                        <Briefcase className="w-4 h-4 text-primary/40" />
                                        <h3 className="text-base font-bold text-foreground">{exp.role}</h3>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                                        <span>@ {exp.company}</span>
                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {exp.duration}</span>
                                        {exp.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {exp.location}</span>}
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                                    {exp.points?.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 pt-1">
                                            {exp.points.map((point, i) => (
                                                <span key={i} className={`px-2 py-0.5 text-[10px] rounded-md font-medium ${
                                                    isDark ? 'bg-primary/5 text-primary/60' : 'bg-primary/5 text-primary/60'
                                                }`}>{point}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex lg:flex-col gap-1.5">
                                    <button onClick={() => {
                                        setEditingExp(exp);
                                        setPointsText(exp.points?.join(', ') || '');
                                    }}
                                        className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors">
                                        <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button onClick={() => setDeleteId(exp.id)}
                                        className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {experiences.length === 0 && (
                    <div className="text-center py-16 border border-dashed rounded-lg border-border">
                        <AlertTriangle className="w-8 h-8 mx-auto mb-3 text-muted-foreground/30" />
                        <p className="text-sm text-muted-foreground">No experience entries yet.</p>
                    </div>
                )}
            </div>

            {/* Editor Modal */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {editingExp && (
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                        >
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                className={`w-full max-w-2xl rounded-xl border shadow-2xl ${
                                    isDark ? 'bg-card border-border' : 'bg-white border-border'
                                }`}
                            >
                                <div className={`flex items-center justify-between px-6 py-4 border-b border-border`}>
                                    <h3 className="text-sm font-bold text-foreground">{editingExp.id ? 'Edit' : 'Add'} Experience</h3>
                                    <button onClick={() => setEditingExp(null)} className="p-1.5 rounded-md hover:bg-muted transition-colors">
                                        <X className="w-4 h-4 text-muted-foreground" />
                                    </button>
                                </div>

                                <div className="p-6 max-h-[75vh] overflow-y-auto">
                                    <form onSubmit={handleSave} className="space-y-5">
                                        <div className="grid md:grid-cols-2 gap-5">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-medium text-muted-foreground">Role *</label>
                                                <input 
                                                    type="text" required value={editingExp.role}
                                                    onChange={e => setEditingExp({...editingExp, role: e.target.value})}
                                                    className={`w-full h-10 rounded-lg border px-4 text-sm outline-none transition-colors ${
                                                        isDark ? 'bg-background border-border focus:border-primary' : 'bg-white border-border focus:border-primary'
                                                    }`}
                                                    placeholder="e.g. Frontend Developer"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-medium text-muted-foreground">Company *</label>
                                                <input 
                                                    type="text" required value={editingExp.company}
                                                    onChange={e => setEditingExp({...editingExp, company: e.target.value})}
                                                    className={`w-full h-10 rounded-lg border px-4 text-sm outline-none transition-colors ${
                                                        isDark ? 'bg-background border-border focus:border-primary' : 'bg-white border-border focus:border-primary'
                                                    }`}
                                                    placeholder="e.g. TechCorp"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-5">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-medium text-muted-foreground">Duration</label>
                                                <input 
                                                    type="text" value={editingExp.duration}
                                                    onChange={e => setEditingExp({...editingExp, duration: e.target.value})}
                                                    className={`w-full h-10 rounded-lg border px-4 text-sm outline-none transition-colors ${
                                                        isDark ? 'bg-background border-border focus:border-primary' : 'bg-white border-border focus:border-primary'
                                                    }`}
                                                    placeholder="e.g. Jan 2024 - Present"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-medium text-muted-foreground">Location</label>
                                                <input 
                                                    type="text" value={editingExp.location}
                                                    onChange={e => setEditingExp({...editingExp, location: e.target.value})}
                                                    className={`w-full h-10 rounded-lg border px-4 text-sm outline-none transition-colors ${
                                                        isDark ? 'bg-background border-border focus:border-primary' : 'bg-white border-border focus:border-primary'
                                                    }`}
                                                    placeholder="e.g. Remote"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-muted-foreground">Description</label>
                                            <textarea 
                                                rows={3} value={editingExp.description}
                                                onChange={e => setEditingExp({...editingExp, description: e.target.value})}
                                                className={`w-full rounded-lg border p-4 text-sm outline-none transition-colors ${
                                                    isDark ? 'bg-background border-border focus:border-primary' : 'bg-white border-border focus:border-primary'
                                                }`}
                                                placeholder="Brief description of your role..."
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-muted-foreground">Key Skills (comma-separated)</label>
                                            <input 
                                                type="text" value={pointsText}
                                                onChange={e => setPointsText(e.target.value)}
                                                className={`w-full h-10 rounded-lg border px-4 text-sm outline-none transition-colors ${
                                                    isDark ? 'bg-background border-border focus:border-primary' : 'bg-white border-border focus:border-primary'
                                                }`}
                                                placeholder="e.g. React, Node.js, TypeScript"
                                            />
                                        </div>

                                        <div className="flex justify-end gap-3 pt-4 border-t border-border">
                                            <button type="button" onClick={() => setEditingExp(null)}
                                                className="px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted transition-colors">
                                                Cancel
                                            </button>
                                            <button type="submit" disabled={isSaving}
                                                className="px-6 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors">
                                                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" /> Save</>}
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
                title="Delete Experience?"
                description="This will permanently remove this career milestone from your portfolio."
            />
        </div>
    );
};
