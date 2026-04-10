import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Plus, Trash2, Save, X, GraduationCap, Loader2, 
    BookOpen, Calendar, Edit2, AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/hooks/useTheme';
import { ConfirmDeleteModal } from '@/components/ui/ConfirmDeleteModal';

interface Education {
    id: string;
    school: string;
    degree: string;
    duration: string;
    cgpa?: string;
}

export const AdminEducation = () => {
    const { isDark } = useTheme();
    const [education, setEducation] = useState<Education[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingEdu, setEditingEdu] = useState<Partial<Education> | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    useEffect(() => { fetchEducation(); }, []);

    const fetchEducation = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('education')
            .select('*')
            .order('id', { ascending: false });

        if (error) {
            toast.error('Failed to load education data.');
        } else {
            setEducation(data || []);
        }
        setLoading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingEdu?.school || !editingEdu?.degree) {
            toast.error('School and degree are required.');
            return;
        }

        setIsSaving(true);
        try {
            if (editingEdu.id) {
                const { error } = await supabase
                    .from('education')
                    .update(editingEdu)
                    .eq('id', editingEdu.id);
                if (error) throw error;
                toast.success('Education entry updated.');
            } else {
                const { error } = await supabase
                    .from('education')
                    .insert([editingEdu]);
                if (error) throw error;
                toast.success('Education entry added.');
            }
            setEditingEdu(null);
            fetchEducation();
        } catch (error: any) {
            toast.error('Error: ' + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        setIsDeleting(true);
        try {
            const { error } = await supabase.from('education').delete().eq('id', deleteId);
            if (error) {
                toast.error('Failed to delete.');
            } else {
                toast.success('Entry deleted.');
                fetchEducation();
            }
        } finally {
            setIsDeleting(false);
            setDeleteId(null);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-20">
            <Loader2 className="animate-spin w-8 h-8 mb-4 text-primary" />
            <p className="text-xs text-muted-foreground">Loading education data...</p>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header Bar */}
            <div className={`flex flex-col md:flex-row justify-between items-center gap-4 p-5 border rounded-lg ${
                isDark ? 'border-border bg-card' : 'bg-white border-border shadow-sm'
            }`}>
                <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isDark ? 'bg-primary/10' : 'bg-primary/5'
                    }`}>
                        <GraduationCap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-foreground">Education</h2>
                        <p className="text-xs text-muted-foreground">{education.length} entries</p>
                    </div>
                </div>
                <button 
                    onClick={() => setEditingEdu({ school: '', degree: '', duration: '' })}
                    className={`px-5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
                        isDark ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-primary text-white hover:bg-primary/90'
                    }`}
                >
                    <Plus className="w-4 h-4" /> Add Education
                </button>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <AnimatePresence mode="popLayout">
                    {education.map((edu) => (
                        <motion.div 
                            layout key={edu.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-5 rounded-lg border transition-all group ${
                                isDark ? 'bg-card border-border hover:border-primary/30' : 'bg-white border-border hover:border-primary/20 shadow-sm'
                            }`}
                        >
                            <div className="flex justify-between items-start">
                                <div className="space-y-2 flex-1">
                                    <div className="flex items-center gap-3">
                                        <BookOpen className="w-4 h-4 text-primary/50" />
                                        <h3 className="text-base font-bold text-foreground">{edu.school}</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{edu.degree}</p>
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-3 h-3" /> {edu.duration}
                                        </div>
                                        {edu.cgpa && (
                                            <div className="flex items-center gap-2 px-2 py-0.5 rounded-md bg-primary/10 text-primary font-bold">
                                                CGPA: {edu.cgpa}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-1.5">
                                    <button 
                                        onClick={() => setEditingEdu(edu)}
                                        className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                                    >
                                        <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button 
                                        onClick={() => setDeleteId(edu.id)}
                                        className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {education.length === 0 && (
                    <div className="lg:col-span-2 text-center py-16 border border-dashed rounded-lg border-border">
                        <AlertTriangle className="w-8 h-8 mx-auto mb-3 text-muted-foreground/30" />
                        <p className="text-sm text-muted-foreground">No education entries yet.</p>
                    </div>
                )}
            </div>

            {/* Editor Modal */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {editingEdu && (
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                        >
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                className={`w-full max-w-lg rounded-xl border shadow-2xl ${
                                    isDark ? 'bg-card border-border' : 'bg-white border-border'
                                }`}
                            >
                                {/* Modal Header */}
                                <div className={`flex items-center justify-between px-6 py-4 border-b ${
                                    isDark ? 'border-border' : 'border-border'
                                }`}>
                                    <h3 className="text-sm font-bold text-foreground">{editingEdu.id ? 'Edit' : 'Add'} Education</h3>
                                    <button onClick={() => setEditingEdu(null)} className="p-1.5 rounded-md hover:bg-muted transition-colors">
                                        <X className="w-4 h-4 text-muted-foreground" />
                                    </button>
                                </div>

                                {/* Form */}
                                <div className="p-6">
                                    <form onSubmit={handleSave} className="space-y-5">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-muted-foreground">Institution *</label>
                                            <input 
                                                type="text" required value={editingEdu.school}
                                                onChange={e => setEditingEdu({...editingEdu, school: e.target.value})}
                                                className={`w-full h-10 rounded-lg border px-4 text-sm outline-none transition-colors ${
                                                    isDark ? 'bg-background border-border focus:border-primary' : 'bg-white border-border focus:border-primary'
                                                }`}
                                                placeholder="e.g. University of Faisalabad"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-muted-foreground">Degree *</label>
                                            <input 
                                                type="text" required value={editingEdu.degree}
                                                onChange={e => setEditingEdu({...editingEdu, degree: e.target.value})}
                                                className={`w-full h-10 rounded-lg border px-4 text-sm outline-none transition-colors ${
                                                    isDark ? 'bg-background border-border focus:border-primary' : 'bg-white border-border focus:border-primary'
                                                }`}
                                                placeholder="e.g. BS Computer Science"
                                            />
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-medium text-muted-foreground">Duration</label>
                                                <input 
                                                    type="text" value={editingEdu.duration}
                                                    onChange={e => setEditingEdu({...editingEdu, duration: e.target.value})}
                                                    className={`w-full h-10 rounded-lg border px-4 text-sm outline-none transition-colors ${
                                                        isDark ? 'bg-background border-border focus:border-primary' : 'bg-white border-border focus:border-primary'
                                                    }`}
                                                    placeholder="e.g. 2023 - 2027"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-medium text-muted-foreground">CGPA / Marks</label>
                                                <input 
                                                    type="text" value={editingEdu.cgpa || ''}
                                                    onChange={e => setEditingEdu({...editingEdu, cgpa: e.target.value})}
                                                    className={`w-full h-10 rounded-lg border px-4 text-sm outline-none transition-colors ${
                                                        isDark ? 'bg-background border-border focus:border-primary' : 'bg-white border-border focus:border-primary'
                                                    }`}
                                                    placeholder="e.g. 3.8/4.0"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-end gap-3 pt-4 border-t border-border">
                                            <button 
                                                type="button" onClick={() => setEditingEdu(null)}
                                                className="px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button 
                                                type="submit" disabled={isSaving}
                                                className="px-6 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
                                            >
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
                title="Delete Education?"
                description="This will permanently remove this academic record from your profile."
            />
        </div>
    );
};
