import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Plus, Trash2, Save, X, Loader2, Cpu, AlertTriangle, Edit2
} from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/hooks/useTheme';
import { ConfirmDeleteModal } from '@/components/ui/ConfirmDeleteModal';

interface Skill {
    id?: string;
    name: string;
    logo_url?: string;
    logo_url_dark?: string;
    order_index?: number;
}

interface SkillCategory {
    id: string;
    title: string;
    skills: Skill[];
}

export const AdminSkills = () => {
    const { isDark } = useTheme();
    const [categories, setCategories] = useState<SkillCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingCat, setEditingCat] = useState<Partial<SkillCategory> | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [skillsList, setSkillsList] = useState<Skill[]>([]);

    useEffect(() => { fetchSkills(); }, []);

    const fetchSkills = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('skill_categories')
            .select(`
                id,
                title,
                skills (
                    id,
                    name,
                    logo_url,
                    logo_url_dark,
                    order_index
                )
            `)
            .order('title');

        if (error) {
            toast.error('Failed to load skills.');
        } else {
            // Sort nested skills by order_index
            if (data) {
                data.forEach((category: any) => {
                    if (Array.isArray(category.skills)) {
                        category.skills.sort((a: any, b: any) => (a.order_index || 0) - (b.order_index || 0));
                    }
                });
            }
            setCategories((data as any) || []);
        }
        setLoading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingCat?.title) {
            toast.error('Category name is required.');
            return;
        }

        setIsSaving(true);
        try {
            let catId = editingCat.id;

            // 1. Save or update the category
            if (catId) {
                const { error } = await supabase
                    .from('skill_categories')
                    .update({ title: editingCat.title })
                    .eq('id', catId);
                if (error) throw error;
            } else {
                const { data, error } = await supabase
                    .from('skill_categories')
                    .insert([{ title: editingCat.title }])
                    .select();
                if (error) throw error;
                catId = data[0].id;
            }

            // 2. Clear old skills for this category
            const { error: deleteError } = await supabase
                .from('skills')
                .delete()
                .eq('category_id', catId);
            if (deleteError) throw deleteError;

            // 3. Insert new skills
            const filteredSkills = skillsList
                .filter(s => s.name.trim())
                .map((s, idx) => ({
                    category_id: catId,
                    name: s.name.trim(),
                    logo_url: s.logo_url?.trim() || null,
                    logo_url_dark: s.logo_url_dark?.trim() || null,
                    order_index: idx
                }));

            if (filteredSkills.length > 0) {
                const { error: insertError } = await supabase
                    .from('skills')
                    .insert(filteredSkills);
                if (insertError) throw insertError;
            }

            toast.success('Skill category saved successfully.');
            setEditingCat(null);
            setSkillsList([]);
            fetchSkills();
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
            const { error } = await supabase.from('skill_categories').delete().eq('id', deleteId);
            if (error) {
                toast.error('Failed to delete category.');
            } else {
                toast.success('Category permanently deleted.');
                fetchSkills();
            }
        } finally {
            setIsDeleting(false);
            setDeleteId(null);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-20">
            <Loader2 className="animate-spin w-8 h-8 mb-4 text-primary" />
            <p className="text-xs text-muted-foreground">Loading skills...</p>
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
                        <Cpu className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-foreground">Skills</h2>
                        <p className="text-xs text-muted-foreground">{categories.length} categories</p>
                    </div>
                </div>
                <button 
                    onClick={() => {
                        setEditingCat({ title: '' });
                        setSkillsList([]);
                    }}
                    className={`px-5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
                        isDark ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-primary text-white hover:bg-primary/90'
                    }`}
                >
                    <Plus className="w-4 h-4" /> Add Category
                </button>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence mode="popLayout">
                    {categories.map((cat) => (
                        <motion.div 
                            layout key={cat.id}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`p-5 rounded-lg border transition-all group ${
                                isDark ? 'bg-card border-border hover:border-primary/30' : 'bg-white border-border hover:border-primary/20 shadow-sm'
                            }`}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-sm font-bold text-foreground">{cat.title}</h3>
                                <div className="flex gap-1">
                                    <button onClick={() => {
                                        setEditingCat(cat);
                                        setSkillsList(cat.skills || []);
                                    }}
                                        className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors">
                                        <Edit2 className="w-3 h-3" />
                                    </button>
                                    <button onClick={() => setDeleteId(cat.id)}
                                        className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors">
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {(cat.skills || []).map((skill, i) => (
                                    <span key={i} className={`px-2 py-0.5 text-[10px] rounded-md font-medium ${
                                        isDark ? 'bg-primary/5 text-primary/60' : 'bg-primary/5 text-primary/50'
                                    }`}>{skill.name}</span>
                                ))}
                                {(!cat.skills || cat.skills.length === 0) && (
                                    <span className="text-xs text-muted-foreground/40">No skills added</span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {categories.length === 0 && (
                    <div className="md:col-span-3 text-center py-16 border border-dashed rounded-lg border-border">
                        <AlertTriangle className="w-8 h-8 mx-auto mb-3 text-muted-foreground/30" />
                        <p className="text-sm text-muted-foreground">No skill categories yet.</p>
                    </div>
                )}
            </div>

            {/* Editor Modal */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {editingCat && (
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
                                <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                                    <h3 className="text-sm font-bold text-foreground">{editingCat.id ? 'Edit' : 'Add'} Skill Category</h3>
                                    <button onClick={() => setEditingCat(null)} className="p-1.5 rounded-md hover:bg-muted transition-colors">
                                        <X className="w-4 h-4 text-muted-foreground" />
                                    </button>
                                </div>

                                <div className="p-6">
                                    <form onSubmit={handleSave} className="space-y-5">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-muted-foreground">Category Name *</label>
                                            <input 
                                                type="text" required value={editingCat.title}
                                                onChange={e => setEditingCat({...editingCat, title: e.target.value})}
                                                className={`w-full h-10 rounded-lg border px-4 text-sm outline-none transition-colors ${
                                                    isDark ? 'bg-background border-border focus:border-primary' : 'bg-white border-border focus:border-primary'
                                                }`}
                                                placeholder="e.g. Frontend, Backend, DevOps"
                                            />
                                        </div>
                                        
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <label className="text-xs font-medium text-muted-foreground">Skills List</label>
                                                <button
                                                    type="button"
                                                    onClick={() => setSkillsList([...skillsList, { name: '', logo_url: '', logo_url_dark: '' }])}
                                                    className="px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20 rounded-md text-xs font-bold transition-colors flex items-center gap-1"
                                                >
                                                    <Plus className="w-3 h-3" /> Add Skill
                                                </button>
                                            </div>
                                            
                                            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                                                {skillsList.map((skill, index) => (
                                                    <div key={index} className="flex flex-col gap-2 p-3 border border-border rounded-lg relative bg-background/30">
                                                        <button
                                                            type="button"
                                                            onClick={() => setSkillsList(skillsList.filter((_, i) => i !== index))}
                                                            className="absolute top-2 right-2 text-muted-foreground hover:text-red-500 transition-colors"
                                                            title="Delete Skill"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                        
                                                        <div className="grid grid-cols-1 gap-2 pr-6">
                                                            <input
                                                                type="text"
                                                                value={skill.name}
                                                                onChange={e => {
                                                                    const newList = [...skillsList];
                                                                    newList[index].name = e.target.value;
                                                                    setSkillsList(newList);
                                                                }}
                                                                required
                                                                className={`w-full h-8 rounded-md border px-3 text-xs outline-none transition-colors ${
                                                                    isDark ? 'bg-background border-border focus:border-primary' : 'bg-white border-border focus:border-primary'
                                                                }`}
                                                                placeholder="Skill Name (e.g. React)"
                                                            />
                                                            <input
                                                                type="text"
                                                                value={skill.logo_url || ''}
                                                                onChange={e => {
                                                                    const newList = [...skillsList];
                                                                    newList[index].logo_url = e.target.value;
                                                                    setSkillsList(newList);
                                                                }}
                                                                className={`w-full h-8 rounded-md border px-3 text-xs outline-none transition-colors ${
                                                                    isDark ? 'bg-background border-border focus:border-primary' : 'bg-white border-border focus:border-primary'
                                                                }`}
                                                                placeholder="Logo URL (Optional)"
                                                            />
                                                            <input
                                                                type="text"
                                                                value={skill.logo_url_dark || ''}
                                                                onChange={e => {
                                                                    const newList = [...skillsList];
                                                                    newList[index].logo_url_dark = e.target.value;
                                                                    setSkillsList(newList);
                                                                }}
                                                                className={`w-full h-8 rounded-md border px-3 text-xs outline-none transition-colors ${
                                                                    isDark ? 'bg-background border-border focus:border-primary' : 'bg-white border-border focus:border-primary'
                                                                }`}
                                                                placeholder="Dark Logo URL (Optional)"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                                {skillsList.length === 0 && (
                                                    <p className="text-xs text-muted-foreground/60 text-center py-4">No skills in this category yet. Click "Add Skill" above.</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex justify-end gap-3 pt-4 border-t border-border">
                                            <button type="button" onClick={() => setEditingCat(null)}
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
                title="Delete Category?"
                description="All skills within this category will be removed. This cannot be undone."
            />
        </div>
    );
};
