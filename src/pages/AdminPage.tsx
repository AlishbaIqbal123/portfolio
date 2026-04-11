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
    Zap,
    Bell,
    Heart,
    Eye,
    EyeOff
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';

import { AdminProjects } from '@/components/admin/AdminProjects';
import { AdminEducation } from '@/components/admin/AdminEducation';
import { AdminExperience } from '@/components/admin/AdminExperience';
import { AdminSkills } from '@/components/admin/AdminSkills';
import { AdminSettings } from '@/components/admin/AdminSettings';
import { AdminThemeProvider, useAdminTheme } from '@/hooks/useAdminTheme';
import '@/admin-themes.css';

const AdminContent = () => {
    const { theme, toggleTheme: toggleAdminTheme } = useAdminTheme();
    const location = useLocation();
    const { isDark, toggleTheme } = useTheme();
    const [activeTab, setActiveTab] = useState((location.state as any)?.activeTab || 'overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showUI, setShowUI] = useState(true);
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
        <div className={`admin-page-container min-h-screen transition-all duration-500 pb-10 pt-20 px-4 md:px-8 theme-${theme}`}>
            {/* Background elements for Doraemon */}
            {/* MOVED CHARACTER LAYER TO THE VERY BOTTOM FOR HIGHEST Z-INDEX BUT WITH TRANSPARENCY */}
            <div className={`max-w-[1700px] mx-auto flex ${theme === 'barbie' ? 'flex-col lg:px-12 gap-8' : 'flex-col lg:flex-row gap-6'} relative z-10`}>
                
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
                    z-[100] lg:block transition-all duration-700
                    ${isSidebarOpen ? "block" : "hidden"}
                    ${theme === 'barbie' ? 'fixed top-0 left-0 w-full' : 'fixed inset-0 lg:relative lg:z-0 w-full lg:w-[280px] p-4 lg:p-0 mt-2'}
                    ${!showUI ? 'opacity-0 -translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'}
                `}>
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`admin-sidebar overflow-hidden transition-all duration-500 ${
                            theme === 'barbie' 
                            ? 'p-2 md:px-8 flex flex-row items-center overflow-x-auto hide-scrollbar justify-between w-full' 
                            : 'p-6 lg:sticky lg:top-28 h-fit flex flex-col lg:max-h-[calc(100vh-8rem)] rounded-[2rem] border shadow-sm backdrop-blur-xl'
                        } ${theme !== 'barbie' && isDark ? 'bg-slate-950/80 border-slate-800' : (theme !== 'barbie' && !isDark ? 'bg-white/80 border-slate-200' : '')}`}
                    >
                        <div className={`${theme === 'barbie' ? 'hidden' : 'mb-8 border-b pb-6 border-slate-800/10'}`}>
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

                        <div className={`${theme === 'barbie' ? 'flex flex-row items-center space-x-2 px-4' : 'space-y-1 overflow-y-auto flex-1 mb-8'}`}>
                            {tabs.map((tab, idx) => (
                                <motion.button
                                    key={tab.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    onClick={() => {
                                        setActiveTab(tab.id);
                                        setIsSidebarOpen(false);
                                    }}
                                    className={`flex items-center gap-3 px-4 py-3 transition-all rounded-xl text-sm font-medium whitespace-nowrap ${
                                        activeTab === tab.id 
                                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105' 
                                        : isDark
                                          ? 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                                          : 'text-slate-500 hover:bg-slate-100/50 hover:text-slate-900'
                                    } ${theme === 'doraemon' ? 'hover:bg-sky-100 w-full text-left' : 'hover:bg-pink-100 px-6'}`}
                                >
                                    <tab.icon className={`w-4 h-4 ${activeTab === tab.id && theme === 'barbie' ? 'animate-pulse' : ''}`} />
                                    {tab.name}
                                </motion.button>
                            ))}
                        </div>
                        
                        <button
                            onClick={handleLogout}
                            className={`flex items-center justify-center gap-3 py-3 rounded-xl border transition-all text-sm font-semibold hover:scale-105 active:scale-95 ${
                                theme === 'barbie' 
                                ? 'px-6 ml-4 bg-transparent text-[#800020] border-[#800020]' 
                                : 'mt-auto ' + (isDark ? 'border-slate-800 text-slate-400 hover:bg-red-950/20 hover:text-red-400' : 'border-slate-200 text-slate-500 hover:bg-red-50 hover:text-red-600')
                            }`}
                        >
                            <Lock className="w-4 h-4" />
                            {theme === 'barbie' ? '' : 'Log out'}
                        </button>
                    </motion.div>
                </aside>

                {/* OPERATIONAL HUB */}
                <main className={`flex-1 min-w-0 transition-all duration-700 relative z-10 ${theme === 'doraemon' ? 'p-4' : 'p-0'} ${!showUI ? 'opacity-10' : 'opacity-100'}`}>
                    <div className={`admin-card border relative overflow-hidden shadow-sm transition-all ${
                        theme === 'doraemon' 
                        ? 'p-8 md:p-12 border-[#0096D9] border-t-[20px] rounded-[4rem]' 
                        : 'p-10 md:p-16 border-pink-100 rounded-[3rem]'
                    } ${isDark ? 'bg-slate-900/80' : 'bg-white'}`}>
                        {/* THE GLOBAL ZEN TOGGLE - ALWAYS VISIBLE */}
                        <div className="fixed top-24 right-10 z-[200] flex gap-4">
                            <button 
                                onClick={() => setShowUI(!showUI)}
                                className={`p-4 rounded-2xl border-2 transition-all shadow-xl hover:scale-110 active:scale-95 ${
                                    theme === 'barbie' 
                                    ? 'bg-pink-500 text-white border-pink-400 shadow-pink-200' 
                                    : 'bg-sky-500 text-white border-sky-400 shadow-sky-200'
                                }`}
                                title={showUI ? "Enter Zen Mode" : "Exit Zen Mode"}
                            >
                                {showUI ? <Eye className="w-6 h-6" /> : <EyeOff className="w-6 h-6" />}
                            </button>
                        </div>
                        
                        <div className={`mb-12 flex flex-col items-center justify-center text-center border-b pb-12 gap-10 relative ${
                            theme === 'doraemon' ? 'border-[#0096D9] border-b-4' : 'border-pink-100/20'
                        }`}>
                            <div className="flex flex-col items-center gap-8 w-full">
                                <div className="relative flex items-center justify-center w-full">
                                    {/* Left Decorator (Doraemon) */}
                                    {theme === 'doraemon' && (
                                        <motion.span 
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            className="absolute right-[calc(50%+160px)] md:right-[calc(50%+220px)] lg:right-[calc(50%+250px)] text-lg md:text-2xl font-black text-[#0096D9]/30 italic tracking-widest uppercase"
                                        >
                                            GADGET
                                        </motion.span>
                                    )}

                                    {/* Perfectly Centered Main Title */}
                                    <h1 className={`text-5xl md:text-8xl font-black tracking-[0.15em] uppercase leading-none z-10 ${
                                        theme === 'doraemon' ? 'text-[#0096D9]' : 'text-pink-600'
                                    }`}>
                                        {currentTabTitle}
                                    </h1>

                                    {/* Right Decorator (Barbie) */}
                                    {theme === 'barbie' && (
                                        <motion.span 
                                            initial={{ x: 20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            className="absolute left-[calc(50%+160px)] md:left-[calc(50%+220px)] lg:left-[calc(50%+250px)] text-3xl md:text-6xl"
                                        >
                                            ✨
                                        </motion.span>
                                    )}
                                </div>
                                
                                <div className="flex flex-wrap items-center justify-center gap-4">
                                    <button 
                                        onClick={toggleAdminTheme}
                                        className={`flex items-center gap-3 px-6 h-12 border rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 ${theme === 'doraemon' ? 'bg-sky-500 border-sky-400 text-white shadow-[0_6px_0_#0369a1]' : 'bg-pink-600 border-pink-400 text-white shadow-[0_6px_0_#9d174d]'}`}
                                    >
                                        {theme === 'doraemon' ? <Bell className="w-5 h-5 fill-yellow-400 text-yellow-400" /> : <Heart className="w-5 h-5 fill-white text-white" />}
                                        {theme === 'doraemon' ? "Doraemon Sync" : "Imperial Barbie"}
                                    </button>
                                    <button 
                                        onClick={toggleTheme}
                                        className={`flex items-center gap-3 px-6 h-12 border rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 ${isDark ? 'bg-slate-800 border-slate-700 text-primary shadow-[0_6px_0_#0f172a]' : 'bg-white border-slate-200 text-slate-700 shadow-[0_6px_0_#e2e8f0]'}`}
                                    >
                                        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                                        {isDark ? "Light Ops" : "Dark Ops"}
                                    </button>
                                </div>
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

export const AdminPage = () => {
    return (
        <AdminThemeProvider>
            <AdminContent />
        </AdminThemeProvider>
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
