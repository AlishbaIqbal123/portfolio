import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Settings, User, Save, Loader2, Lock, Key, Activity } from 'lucide-react';
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
                <div className="lg:col-span-8">
                    <div className={`p-6 border rounded-lg ${
                        isDark ? 'border-border bg-card' : 'bg-white border-border shadow-sm'
                    }`}>
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                            <User className="w-4 h-4 text-primary" />
                            <h3 className="text-sm font-bold text-foreground">Profile</h3>
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

                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-muted-foreground">Bio</label>
                                <textarea 
                                    rows={3} value={profile.bio}
                                    onChange={e => setProfile({...profile, bio: e.target.value})}
                                    className={`w-full rounded-lg border p-4 text-sm outline-none transition-colors ${
                                        isDark ? 'bg-background border-border focus:border-primary' : 'bg-white border-border focus:border-primary'
                                    }`}
                                    placeholder="Tell your story..."
                                />
                            </div>

                            <div className="flex justify-end pt-4 border-t border-border">
                                <button 
                                    type="submit" disabled={isSaving}
                                    className="px-6 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
                                >
                                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" /> Save Profile</>}
                                </button>
                            </div>
                        </form>
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
