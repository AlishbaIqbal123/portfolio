import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, 
    Briefcase, 
    Settings, 
    Loader2,
    GraduationCap,
    Code2,
    Terminal as TerminalIcon,
    Activity,
    Lock,
    Command,
    Sun,
    Moon,
    X,
    Cpu,
    Database,
    Radiation,
    Rocket,
    Check,
    Zap
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';

import { AdminProjects } from '@/components/admin/AdminProjects';
import { AdminEducation } from '@/components/admin/AdminEducation';
import { AdminExperience } from '@/components/admin/AdminExperience';
import { AdminSkills } from '@/components/admin/AdminSkills';
import { AdminSettings } from '@/components/admin/AdminSettings';

export const AdminPage = () => {
    const location = useLocation();
    const { isDark, toggleTheme } = useTheme();
    const [activeTab, setActiveTab] = useState((location.state as any)?.activeTab || 'overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) toast.error('Logout failed. Please try again.');
        else {
            toast.success('Logged out successfully.');
            navigate('/login');
        }
    };

    const tabs = [
        { id: 'overview', name: 'Dashboard', icon: LayoutDashboard },
        { id: 'projects', name: 'Projects', icon: Briefcase },
        { id: 'experience', name: 'Experience', icon: Activity },
        { id: 'education', name: 'Education', icon: GraduationCap },
        { id: 'skills', name: 'Skills', icon: Code2 },
        { id: 'settings', name: 'Settings', icon: Settings },
    ];

    const currentTabTitle = tabs.find(t => t.id === activeTab)?.name || 'Admin';

    return (
        <div className={`admin-theme min-h-screen transition-colors duration-500 font-sans pb-10 pt-20 px-4 md:px-8 ${isDark ? 'bg-slate-950 text-slate-200' : 'bg-slate-50 text-slate-900'}`}>
            
            <div className="max-w-[1700px] mx-auto flex flex-col lg:flex-row gap-6 relative z-10">
                
                {/* SIDEBAR TRIGGER */}
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className={`lg:hidden flex items-center justify-between p-4 border rounded-xl mb-4 transition-all ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}
                >
                    <div className="flex items-center gap-4">
                        {isSidebarOpen ? <X className="w-6 h-6" /> : <LayoutDashboard className="w-6 h-6" />}
                        <span className="font-semibold text-sm">Navigation</span>
                    </div>
                </button>

                {/* PRODUCTIVITY SIDEBAR */}
                <aside className={`
                    fixed inset-0 z-[100] lg:relative lg:z-0 lg:block transition-all duration-300
                    ${isSidebarOpen ? "block" : "hidden"}
                    w-full lg:w-[280px] ${isDark ? 'bg-slate-950/95 lg:bg-transparent' : 'bg-slate-50/95 lg:bg-transparent'} p-4 lg:p-0
                `}>
                    <div className={`border p-6 lg:sticky lg:top-28 h-fit flex flex-col lg:max-h-[calc(100vh-8rem)] shadow-sm transition-all rounded-3xl ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
                        <div className="mb-8 border-b pb-6 border-slate-800/10">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                                    <Command className="w-5 h-5" />
                                </div>
                                <div>
                                    <h1 className="text-sm font-bold tracking-tight">Console</h1>
                                    <p className="text-[10px] opacity-40 uppercase tracking-widest font-bold">Manager v6.0</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1 overflow-y-auto flex-1 mb-8">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        setActiveTab(tab.id);
                                        setIsSidebarOpen(false);
                                    }}
                                    className={`flex items-center gap-3 px-4 py-3 transition-all w-full text-left rounded-xl text-sm font-medium ${
                                        activeTab === tab.id 
                                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                                        : isDark
                                          ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                                          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                                    }`}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    {tab.name}
                                </button>
                            ))}
                        </div>
                        
                        <button
                            onClick={handleLogout}
                            className={`flex items-center justify-center gap-3 py-3 rounded-xl border transition-all text-sm font-semibold ${isDark ? 'border-slate-800 text-slate-400 hover:bg-red-950/20 hover:text-red-400' : 'border-slate-200 text-slate-500 hover:bg-red-50 hover:text-red-600'}`}
                        >
                            <Lock className="w-4 h-4" />
                            Log out
                        </button>
                    </div>
                </aside>

                {/* OPERATIONAL HUB */}
                <main className="flex-1 min-w-0">
                    <div className={`border p-8 md:p-12 min-h-[80vh] relative overflow-hidden shadow-sm transition-all rounded-3xl ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
                        
                        <div className={`mb-12 flex flex-col md:flex-row items-center justify-between border-b pb-8 gap-6 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                            <div className="flex items-center gap-4">
                                <span className={`text-2xl font-bold tracking-tight ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{currentTabTitle}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={toggleTheme}
                                    className={`flex items-center gap-3 px-4 h-10 border rounded-xl text-xs font-semibold transition-all hover:scale-105 active:scale-95 ${isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-white border-slate-200 text-slate-700 shadow-sm'}`}
                                >
                                    {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                    {isDark ? "Light" : "Dark"}
                                </button>
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="relative z-10"
                            >
                                {activeTab === 'overview' && <OverviewTab setActiveTab={setActiveTab} />}
                                {activeTab === 'projects' && <AdminProjects />}
                                {activeTab === 'experience' && <AdminExperience />}
                                {activeTab === 'education' && <AdminEducation />}
                                {activeTab === 'skills' && <AdminSkills />}
                                {activeTab === 'settings' && <AdminSettings />}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>
            </div>
        </div>
    );
};

const OverviewTab = ({ setActiveTab }: { setActiveTab: (id: string) => void }) => {
    const { isDark } = useTheme();
    const [stats, setStats] = useState({ projects: 0, experiences: 0, skills: 0, webCount: 0, mobileCount: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            const { count: pCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });
            const { count: eCount } = await supabase.from('experience').select('*', { count: 'exact', head: true });
            const { count: sCount } = await supabase.from('skill_categories').select('*', { count: 'exact', head: true });
            
            const { count: wCount } = await supabase.from('projects').select('*', { count: 'exact', head: true }).eq('category', 'web');
            const { count: mCount } = await supabase.from('projects').select('*', { count: 'exact', head: true }).eq('category', 'mobile');

            setStats({ 
                projects: pCount || 0, 
                experiences: eCount || 0, 
                skills: sCount || 0,
                webCount: wCount || 0,
                mobileCount: mCount || 0
            });
        };
        fetchStats();
    }, []);

    const cards = [
        { label: 'Projects', count: stats.projects, tab: 'projects', icon: Rocket, color: 'text-blue-500' },
        { label: 'Work Experience', count: stats.experiences, tab: 'experience', icon: Activity, color: 'text-amber-500' },
        { label: 'Skill Sets', count: stats.skills, tab: 'skills', icon: Code2, color: 'text-emerald-500' },
        { label: 'Total Assets', count: stats.projects + stats.experiences, tab: 'overview', icon: Zap, color: 'text-indigo-500' },
    ];

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((stat, i) => (
                    <motion.button
                        key={i}
                        whileHover={{ y: -4 }}
                        onClick={() => setActiveTab(stat.tab)}
                        className={`p-8 border text-left transition-all rounded-3xl ${isDark ? 'bg-slate-900 border-slate-800 hover:border-primary/50' : 'bg-white border-slate-100 hover:border-primary/50 shadow-sm'}`}
                    >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-6 ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
                            <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
                            <h3 className="text-4xl font-bold tracking-tight">{stat.count}</h3>
                        </div>
                    </motion.button>
                ))}
            </div>

            <div className="grid lg:grid-cols-12 gap-6">
                <div className={`lg:col-span-8 p-10 border rounded-3xl ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <div className="flex items-center gap-4 mb-10">
                        <Database className="w-5 h-5 text-primary" />
                        <h3 className="text-lg font-bold tracking-tight">Project Distribution</h3>
                    </div>
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm font-medium">
                                <span className="text-slate-500">Web Applications</span>
                                <span>{stats.webCount} ({Math.round((stats.webCount / (stats.projects || 1)) * 100)}%)</span>
                            </div>
                            <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(stats.webCount / (stats.projects || 1)) * 100}%` }}
                                    className="h-full bg-primary" 
                                />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm font-medium">
                                <span className="text-slate-500">Mobile Applications</span>
                                <span>{stats.mobileCount} ({Math.round((stats.mobileCount / (stats.projects || 1)) * 100)}%)</span>
                            </div>
                            <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(stats.mobileCount / (stats.projects || 1)) * 100}%` }}
                                    className="h-full bg-primary opacity-80" 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`lg:col-span-4 p-10 border flex flex-col justify-center items-center text-center gap-6 rounded-3xl ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${isDark ? 'bg-slate-800' : 'bg-green-50'}`}>
                        <Check className="w-8 h-8 text-green-500" />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold tracking-tight mb-2">System Status</h4>
                        <p className="text-sm font-medium text-slate-500 leading-relaxed">
                            Database connection stable.<br/>
                            All nodes synchronized.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
