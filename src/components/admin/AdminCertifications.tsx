import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { supabase } from '@/lib/supabase';
import { uploadProjectImage } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Plus, Trash2, Save, X, Award, Loader2, 
    Calendar, Edit2, AlertTriangle, Hash, Palette, Link2, Upload, ExternalLink, Globe
} from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/hooks/useTheme';
import { ConfirmDeleteModal } from '@/components/ui/ConfirmDeleteModal';

interface Certification {
    id: string;
    name: string;
    issuer: string;
    issue_date: string;
    image_url: string;
    credential_id?: string;
    credential_url?: string;
    details: string;
    accent_color: string;
    icon: string;
    order_index: number;
    location: string;
}

export const AdminCertifications = () => {
    const { isDark } = useTheme();
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingCert, setEditingCert] = useState<Partial<Certification> | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    // File upload refs & state
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => { fetchCertifications(); }, []);

    const fetchCertifications = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('certifications')
            .select('*')
            .order('order_index', { ascending: true });

        if (error) {
            console.error('Fetch error:', error);
            toast.error('Failed to load certifications data.');
        } else {
            setCertifications(data || []);
        }
        setLoading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingCert?.name || !editingCert?.issuer || !editingCert?.issue_date) {
            toast.error('Certification Name, Issuer, and Issue Date are required.');
            return;
        }

        setIsSaving(true);
        try {
            let finalImageUrl = editingCert.image_url || '';

            // Upload image if selected
            if (selectedFile) {
                toast.info('Uploading certificate image...');
                finalImageUrl = await uploadProjectImage(selectedFile);
            }

            const certToSave: any = {
                name: editingCert.name,
                issuer: editingCert.issuer,
                issue_date: editingCert.issue_date,
                image_url: finalImageUrl,
                credential_id: editingCert.credential_id || '',
                credential_url: editingCert.credential_url || '',
                details: editingCert.details || '',
                accent_color: editingCert.accent_color || '#9D4EDD',
                icon: editingCert.icon || '🏆',
                order_index: typeof editingCert.order_index === 'number' ? editingCert.order_index : parseInt(editingCert.order_index as any || '0', 10),
                location: editingCert.location || ''
            };

            if (editingCert.id) {
                const { error } = await supabase
                    .from('certifications')
                    .update(certToSave)
                    .eq('id', editingCert.id);
                if (error) throw error;
                toast.success('Certification updated successfully.');
            } else {
                const { error } = await supabase
                    .from('certifications')
                    .insert([certToSave]);
                if (error) throw error;
                toast.success('Certification added successfully.');
            }
            setEditingCert(null);
            setSelectedFile(null);
            setPreviewUrl(null);
            fetchCertifications();
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
            const { error } = await supabase.from('certifications').delete().eq('id', deleteId);
            if (error) {
                toast.error('Failed to delete.');
            } else {
                toast.success('Entry deleted.');
                fetchCertifications();
            }
        } finally {
            setIsDeleting(false);
            setDeleteId(null);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-20">
            <Loader2 className="animate-spin w-8 h-8 mb-4 text-primary" />
            <p className="text-xs text-muted-foreground">Loading certifications...</p>
        </div>
    );

    return (
        <div className="space-y-6 text-left">
            {/* Header Bar */}
            <div className={`flex flex-col md:flex-row justify-between items-center gap-4 p-5 border rounded-lg ${
                isDark ? 'border-border bg-card' : 'bg-white border-border shadow-sm'
            }`}>
                <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isDark ? 'bg-primary/10' : 'bg-primary/5'
                    }`}>
                        <Award className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-foreground">Certifications</h2>
                        <p className="text-xs text-muted-foreground">{certifications.length} entries</p>
                    </div>
                </div>
                <button 
                    onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl(null);
                        setEditingCert({ 
                            name: '', 
                            issuer: '', 
                            issue_date: '', 
                            image_url: '',
                            credential_id: '',
                            credential_url: '',
                            details: '', 
                            accent_color: '#9D4EDD', 
                            icon: '🏆', 
                            location: '',
                            order_index: certifications.length ? certifications[certifications.length - 1].order_index + 10 : 10 
                        });
                    }}
                    className={`px-5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
                        isDark ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-primary text-white hover:bg-primary/90'
                    }`}
                >
                    <Plus className="w-4 h-4" /> Add Certification
                </button>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <AnimatePresence mode="popLayout">
                    {certifications.map((cert) => (
                        <motion.div 
                            layout key={cert.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-5 rounded-lg border transition-all group relative overflow-hidden flex flex-col md:flex-row gap-4 ${
                                isDark ? 'bg-card border-border hover:border-primary/30' : 'bg-white border-border hover:border-primary/20 shadow-sm'
                            }`}
                        >
                            {/* Color Accent Indicator */}
                            <div 
                                className="absolute top-0 left-0 w-1.5 h-full"
                                style={{ backgroundColor: cert.accent_color }}
                            />

                            {/* Certificate Image Thumbnail */}
                            {cert.image_url ? (
                                <div className="w-full md:w-28 h-20 rounded-md overflow-hidden bg-slate-900 flex-shrink-0 border border-border">
                                    <img 
                                        src={cert.image_url} 
                                        alt={cert.name} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            ) : (
                                <div className="w-full md:w-28 h-20 rounded-md bg-muted flex items-center justify-center flex-shrink-0 border border-dashed border-border text-muted-foreground text-[10px]">
                                    No Image
                                </div>
                            )}

                            <div className="flex justify-between items-start flex-1">
                                <div className="space-y-1.5 flex-1 pr-2">
                                    <div className="flex items-center gap-2.5 flex-wrap">
                                        <span className="text-base select-none">{cert.icon}</span>
                                        <h3 className="text-base font-bold text-foreground leading-tight">{cert.name}</h3>
                                    </div>
                                    <p className="text-xs font-semibold text-muted-foreground">
                                        {cert.issuer} {cert.location ? `• ${cert.location}` : ''}
                                    </p>
                                    
                                    {cert.credential_id && (
                                        <p className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded w-fit select-all">
                                            ID: {cert.credential_id}
                                        </p>
                                    )}

                                    {cert.details && (
                                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{cert.details}</p>
                                    )}

                                    <div className="flex flex-wrap items-center gap-4 text-[10px] text-muted-foreground font-semibold mt-2">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5 text-primary/70" /> {cert.issue_date}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Hash className="w-3 h-3 text-primary/70" /> Order: {cert.order_index}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Palette className="w-3.5 h-3.5" style={{ color: cert.accent_color }} /> 
                                            <span style={{ color: cert.accent_color }}>{cert.accent_color}</span>
                                        </div>
                                        {cert.credential_url && (
                                            <a 
                                                href={cert.credential_url} target="_blank" rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-primary hover:underline"
                                            >
                                                <ExternalLink className="w-3 h-3" /> Verify
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-1.5">
                                    <button 
                                        onClick={() => {
                                            setSelectedFile(null);
                                            setPreviewUrl(null);
                                            setEditingCert(cert);
                                        }}
                                        className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                                    >
                                        <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button 
                                        onClick={() => setDeleteId(cert.id)}
                                        className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {certifications.length === 0 && (
                    <div className="lg:col-span-2 text-center py-16 border border-dashed rounded-lg border-border">
                        <AlertTriangle className="w-8 h-8 mx-auto mb-3 text-muted-foreground/30" />
                        <p className="text-sm text-muted-foreground">No certification entries yet.</p>
                    </div>
                )}
            </div>

            {/* Editor Modal */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {editingCert && (
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                        >
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                className={`w-full max-w-lg rounded-xl border shadow-2xl overflow-y-auto max-h-[90vh] ${
                                    isDark ? 'bg-card border-border' : 'bg-white border-border'
                                }`}
                            >
                                {/* Modal Header */}
                                <div className={`flex items-center justify-between px-6 py-4 border-b ${
                                    isDark ? 'border-border' : 'border-border'
                                }`}>
                                    <h3 className="text-sm font-bold text-foreground">{editingCert.id ? 'Edit' : 'Add'} Certification</h3>
                                    <button onClick={() => setEditingCert(null)} className="p-1.5 rounded-md hover:bg-muted transition-colors">
                                        <X className="w-4 h-4 text-muted-foreground" />
                                    </button>
                                </div>

                                {/* Form */}
                                <div className="p-6">
                                    <form onSubmit={handleSave} className="space-y-5">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-muted-foreground">Certification Name *</label>
                                            <input 
                                                type="text" required value={editingCert.name || ''}
                                                onChange={e => setEditingCert({...editingCert, name: e.target.value})}
                                                className={`w-full h-10 rounded-lg border px-4 text-sm outline-none transition-colors ${
                                                    isDark ? 'bg-background border-border focus:border-primary' : 'bg-white border-border focus:border-primary'
                                                }`}
                                                placeholder="e.g. ReactJS Development, Cybersecurity Simulation"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-medium text-muted-foreground">Issuer *</label>
                                                <input 
                                                    type="text" required value={editingCert.issuer || ''}
                                                    onChange={e => setEditingCert({...editingCert, issuer: e.target.value})}
                                                    className={`w-full h-10 rounded-lg border px-4 text-sm outline-none transition-colors ${
                                                        isDark ? 'bg-background border-border focus:border-primary' : 'bg-white border-border focus:border-primary'
                                                    }`}
                                                    placeholder="e.g. Tkxel, Mastercard, AWS"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-medium text-muted-foreground">Location</label>
                                                <input 
                                                    type="text" value={editingCert.location || ''}
                                                    onChange={e => setEditingCert({...editingCert, location: e.target.value})}
                                                    className={`w-full h-10 rounded-lg border px-4 text-sm outline-none transition-colors ${
                                                        isDark ? 'bg-background border-border focus:border-primary' : 'bg-white border-border focus:border-primary'
                                                    }`}
                                                    placeholder="e.g. Lahore, Pakistan or Remote"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-medium text-muted-foreground">Issue Date *</label>
                                                <input 
                                                    type="text" required value={editingCert.issue_date || ''}
                                                    onChange={e => setEditingCert({...editingCert, issue_date: e.target.value})}
                                                    className={`w-full h-10 rounded-lg border px-4 text-sm outline-none transition-colors ${
                                                        isDark ? 'bg-background border-border focus:border-primary' : 'bg-white border-border focus:border-primary'
                                                    }`}
                                                    placeholder="e.g. Sep 2025, Jan 2026"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-medium text-muted-foreground">Order Index</label>
                                                <input 
                                                    type="number" value={editingCert.order_index ?? 0}
                                                    onChange={e => setEditingCert({...editingCert, order_index: parseInt(e.target.value || '0', 10)})}
                                                    className={`w-full h-10 rounded-lg border px-3 text-sm outline-none transition-colors ${
                                                        isDark ? 'bg-background border-border focus:border-primary' : 'bg-white border-border focus:border-primary'
                                                    }`}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-medium text-muted-foreground">Credential ID</label>
                                                <input 
                                                    type="text" value={editingCert.credential_id || ''}
                                                    onChange={e => setEditingCert({...editingCert, credential_id: e.target.value})}
                                                    className={`w-full h-10 rounded-lg border px-4 text-sm outline-none transition-colors ${
                                                        isDark ? 'bg-background border-border focus:border-primary' : 'bg-white border-border focus:border-primary'
                                                    }`}
                                                    placeholder="e.g. CUI-VEH-BSE-23-010"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-medium text-muted-foreground">Verification URL</label>
                                                <input 
                                                    type="url" value={editingCert.credential_url || ''}
                                                    onChange={e => setEditingCert({...editingCert, credential_url: e.target.value})}
                                                    className={`w-full h-10 rounded-lg border px-4 text-sm outline-none transition-colors ${
                                                        isDark ? 'bg-background border-border focus:border-primary' : 'bg-white border-border focus:border-primary'
                                                    }`}
                                                    placeholder="e.g. https://verify.org/cert-123"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-medium text-muted-foreground">Icon (Emoji)</label>
                                                <input 
                                                    type="text" value={editingCert.icon || ''}
                                                    onChange={e => setEditingCert({...editingCert, icon: e.target.value})}
                                                    className={`w-full h-10 rounded-lg border px-3 text-sm text-center outline-none transition-colors ${
                                                        isDark ? 'bg-background border-border focus:border-primary' : 'bg-white border-border focus:border-primary'
                                                    }`}
                                                    placeholder="e.g. 🏢, 🎓, 💻"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-medium text-muted-foreground">Accent Hex Color</label>
                                                <div className="flex gap-2 items-center">
                                                    <input 
                                                        type="text" value={editingCert.accent_color || ''}
                                                        onChange={e => setEditingCert({...editingCert, accent_color: e.target.value})}
                                                        className={`flex-1 h-10 rounded-lg border px-3 text-sm outline-none transition-colors ${
                                                            isDark ? 'bg-background border-border focus:border-primary' : 'bg-white border-border focus:border-primary'
                                                        }`}
                                                        placeholder="e.g. #9D4EDD"
                                                    />
                                                    <input 
                                                        type="color" 
                                                        value={editingCert.accent_color?.startsWith('#') && editingCert.accent_color.length === 7 ? editingCert.accent_color : '#9D4EDD'}
                                                        onChange={e => setEditingCert({...editingCert, accent_color: e.target.value})}
                                                        className="w-10 h-10 rounded-lg border border-border cursor-pointer p-0 bg-transparent shrink-0 overflow-hidden"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Certificate Image Upload */}
                                        <div className="space-y-2 border border-dashed rounded-lg p-4 border-border">
                                            <label className="text-xs font-medium text-muted-foreground block">Certificate Image</label>
                                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                                <button
                                                    type="button"
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className={`px-4 py-2 border rounded-lg text-xs font-semibold hover:bg-muted flex items-center gap-2 transition-colors ${
                                                        isDark ? 'bg-background border-border' : 'bg-white border-border'
                                                    }`}
                                                >
                                                    <Upload className="w-4 h-4" /> Choose File
                                                </button>
                                                <input 
                                                    type="file" ref={fileInputRef} className="hidden" accept="image/*"
                                                    onChange={handleFileChange}
                                                />
                                                <span className="text-xs text-muted-foreground">
                                                    {selectedFile ? selectedFile.name : (editingCert.image_url ? 'Has existing image' : 'No image selected')}
                                                </span>
                                            </div>
                                            {/* Preview */}
                                            {(previewUrl || editingCert.image_url) && (
                                                <div className="mt-3 w-40 h-24 rounded-md overflow-hidden bg-slate-900 border border-border">
                                                    <img 
                                                        src={previewUrl || editingCert.image_url} 
                                                        alt="Certificate Preview" 
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-muted-foreground">Details Description</label>
                                            <textarea 
                                                rows={3} value={editingCert.details || ''}
                                                onChange={e => setEditingCert({...editingCert, details: e.target.value})}
                                                className={`w-full rounded-lg border p-4 text-sm outline-none transition-colors resize-none ${
                                                    isDark ? 'bg-background border-border focus:border-primary' : 'bg-white border-border focus:border-primary'
                                                }`}
                                                placeholder="e.g. Details about the certification, courses taken, etc..."
                                            />
                                        </div>

                                        <div className="flex justify-end gap-3 pt-4 border-t border-border">
                                            <button 
                                                type="button" onClick={() => setEditingCert(null)}
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
                title="Delete Certification?"
                description="This will permanently remove this certification record from your profile."
            />
        </div>
    );
};
