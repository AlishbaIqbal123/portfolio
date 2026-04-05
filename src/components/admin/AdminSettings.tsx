import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Settings, User, Save, Loader2, Lock, Key, Activity, Rocket } from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/hooks/useTheme';

export const AdminSettings = () => {
    const { isDark } = useTheme();
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [profile, setProfile] = useState({
        full_name: '',
        email: '',
        bio: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setProfile({
                    full_name: user.user_metadata?.full_name || '',
                    email: user.email || '',
                    bio: user.user_metadata?.bio || ''
                });
            }
            setLoading(false);
        };
        fetchProfile();
    }, []);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const { error } = await supabase.auth.updateUser({
                data: { full_name: profile.full_name, bio: profile.bio }
            });
            if (error) throw error;
            toast.success('Profile updated successfully.');
        } catch (error: any) {
            toast.error('Error: ' + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-20">
            <Loader2 className="animate-spin w-8 h-8 mb-4 text-primary" />
            <p className="text-xs text-muted-foreground">Loading settings...</p>
        </div>
    );

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className={`flex items-center gap-4 p-5 border rounded-lg ${
                isDark ? 'border-border bg-card' : 'bg-white border-border shadow-sm'
            }`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-primary/10' : 'bg-primary/5'}`}>
                    <Settings className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-foreground">Settings</h2>
                    <p className="text-xs text-muted-foreground">Manage your profile and preferences</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-6">
                {/* Profile Form */}
                <div className="lg:col-span-8 space-y-6">
                    <div className={`p-6 border rounded-lg ${
                        isDark ? 'border-border bg-card' : 'bg-white border-border shadow-sm'
                    }`}>
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                            <User className="w-4 h-4 text-primary" />
                            <h3 className="text-sm font-bold text-foreground">User Profile (Auth)</h3>
                        </div>

                        <form onSubmit={handleUpdateProfile} className="space-y-5">
                            <div className="grid md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-muted-foreground">Full Name</label>
                                    <input 
                                        type="text" value={profile.full_name}
                                        onChange={e => setProfile({...profile, full_name: e.target.value})}
                                        className={`w-full h-10 rounded-lg border px-4 text-sm outline-none transition-colors ${
                                            isDark ? 'bg-background border-border focus:border-primary' : 'bg-white border-border focus:border-primary'
                                        }`}
                                        placeholder="Your full name"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-muted-foreground">Email (read-only)</label>
                                    <input 
                                        type="email" disabled value={profile.email}
                                        className={`w-full h-10 rounded-lg border px-4 text-sm outline-none opacity-60 ${
                                            isDark ? 'bg-background border-border' : 'bg-muted border-border'
                                        }`}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end pt-4">
                                <button 
                                    type="submit" disabled={isSaving}
                                    className="px-6 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
                                >
                                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" /> Update Auth Metadata</>}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* SITE CONFIGURATION */}
                    <div className={`p-6 border rounded-lg ${
                        isDark ? 'border-border bg-card' : 'bg-white border-border shadow-sm'
                    }`}>
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                            <Rocket className="w-4 h-4 text-primary" />
                            <h3 className="text-sm font-bold text-foreground">Site Configuration</h3>
                        </div>

                        <SiteConfigForm isDark={isDark} />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-4">
                    <div className={`p-5 border rounded-lg ${
                        isDark ? 'border-border bg-card' : 'bg-white border-border shadow-sm'
                    }`}>
                        <div className="flex items-center gap-2 mb-3">
                            <Key className="w-4 h-4 text-primary" />
                            <h3 className="text-sm font-bold text-foreground">Security</h3>
                        </div>
                        <p className="text-xs text-muted-foreground mb-4">
                            Manage your password and security settings.
                        </p>
                        <button className={`w-full py-2.5 rounded-lg border text-xs font-semibold transition-colors ${
                            isDark ? 'border-border text-foreground hover:bg-primary/5' : 'border-border text-foreground hover:bg-muted'
                        }`}>
                            Reset Password
                        </button>
                    </div>

                    <div className={`p-5 border rounded-lg ${
                        isDark ? 'border-border bg-card' : 'bg-white border-border shadow-sm'
                    }`}>
                        <div className="flex items-center gap-2 mb-3">
                            <Activity className="w-4 h-4 text-primary" />
                            <h3 className="text-sm font-bold text-foreground">System Info</h3>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-muted-foreground">Version</span>
                                <span className="font-medium text-foreground">2.0</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-muted-foreground">Database</span>
                                <span className="font-medium text-green-500">Connected</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-muted-foreground">Status</span>
                                <span className="font-medium text-green-500">Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SiteConfigForm = ({ isDark }: { isDark: boolean }) => {
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [config, setConfig] = useState({
        name: '',
        bio: '',
        tagline: '',
        location: '',
        cgpa: ''
    });

    useEffect(() => {
        const fetchConfig = async () => {
            const { data } = await supabase.from('admin_settings').select('*');
            if (data) {
                const name = data.find((s: any) => s.key === 'name')?.value || '';
                const bio = data.find((s: any) => s.key === 'bio' || s.key === 'site_bio')?.value || '';
                const tagline = data.find((s: any) => s.key === 'tagline' || s.key === 'site_focus')?.value || '';
                const location = data.find((s: any) => s.key === 'location')?.value || '';
                const cgpa = data.find((s: any) => s.key === 'cgpa')?.value || '';
                
                setConfig({ name, bio, tagline, location, cgpa });
            }
            setLoading(false);
        };
        fetchConfig();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            // Upsert all keys
            const updates = [
                { key: 'name', value: config.name },
                { key: 'bio', value: config.bio },
                { key: 'tagline', value: config.tagline },
                { key: 'location', value: config.location },
                { key: 'cgpa', value: config.cgpa },
                { key: 'updated_at', value: new Date().toISOString() } // This key doesn't exist as primary, but we'll use individual updated_ats
            ];

            for (const item of updates.filter(u => u.key !== 'updated_at')) {
                await supabase.from('admin_settings').upsert({ 
                    key: item.key, 
                    value: item.value,
                    updated_at: new Date().toISOString()
                });
            }
            
            toast.success('Site configuration deployed successfully.');
        } catch (error: any) {
            toast.error('Deployment Error: ' + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return (
        <div className="flex items-center gap-3 py-10 opacity-50">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-xs">Fetching configuration...</span>
        </div>
    );

    return (
        <form onSubmit={handleSave} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/60 italic">Display Name</label>
                    <input 
                        type="text" value={config.name}
                        onChange={e => setConfig({...config, name: e.target.value})}
                        className={`w-full h-11 rounded-xl border border-border px-4 text-sm font-medium outline-none transition-all ${
                            isDark ? 'bg-background focus:border-primary/50' : 'bg-slate-50 focus:border-primary/30'
                        }`}
                        placeholder="e.g. Alishba Iqbal"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/60 italic">Domain Focus / Slogan</label>
                    <input 
                        type="text" value={config.tagline}
                        onChange={e => setConfig({...config, tagline: e.target.value})}
                        className={`w-full h-11 rounded-xl border border-border px-4 text-sm font-medium outline-none transition-all ${
                            isDark ? 'bg-background focus:border-primary/50' : 'bg-slate-50 focus:border-primary/30'
                        }`}
                        placeholder="e.g. Full Stack Developer"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/60 italic">Location</label>
                    <input 
                        type="text" value={config.location}
                        onChange={e => setConfig({...config, location: e.target.value})}
                        className={`w-full h-11 rounded-xl border border-border px-4 text-sm font-medium outline-none transition-all ${
                            isDark ? 'bg-background focus:border-primary/50' : 'bg-slate-50 focus:border-primary/30'
                        }`}
                        placeholder="e.g. Faisalabad, Pakistan"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/60 italic">Global CGPA / Stats</label>
                    <input 
                        type="text" value={config.cgpa}
                        onChange={e => setConfig({...config, cgpa: e.target.value})}
                        className={`w-full h-11 rounded-xl border border-border px-4 text-sm font-medium outline-none transition-all ${
                            isDark ? 'bg-background focus:border-primary/50' : 'bg-slate-50 focus:border-primary/30'
                        }`}
                        placeholder="e.g. 3.64 / 4.00"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/60 italic">Core Narrative (Bio)</label>
                    <span className="text-[8px] font-bold text-muted-foreground opacity-40">KEY: bio</span>
                </div>
                <textarea 
                    rows={5} value={config.bio}
                    onChange={e => setConfig({...config, bio: e.target.value})}
                    className={`w-full rounded-xl border border-border p-4 text-sm font-medium outline-none transition-all ${
                        isDark ? 'bg-background focus:border-primary/50 focus:ring-4 focus:ring-primary/5' : 'bg-slate-50 focus:border-primary/30 focus:ring-4 focus:ring-primary/5'
                    }`}
                    placeholder="Provide a high-fidelity summary of your professional journey..."
                />
            </div>

            <div className="flex justify-end pt-4">
                <button 
                    type="submit" disabled={isSaving}
                    className="h-11 px-8 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-all shadow-[0_8px_20px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_12px_28px_rgba(var(--primary-rgb),0.4)] active:scale-95"
                >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Rocket className="w-4 h-4" /> Push Configuration</>}
                </button>
            </div>
        </form>
    );
};
