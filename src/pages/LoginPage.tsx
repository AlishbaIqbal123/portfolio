import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Lock, Mail, Loader2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';

export const LoginPage = () => {
    const { isDark } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            toast.success('Logged in successfully.');
            navigate('/admin');
        } catch (error: any) {
            toast.error('Login failed: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background transition-colors duration-500 px-6">
            <div className="w-full max-w-md">
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={isDark ? 'architect-card' : 'silk-card'}
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4 ${
                            isDark ? 'bg-primary/10' : 'bg-primary'
                        }`}>
                            <Lock className={`w-6 h-6 ${isDark ? 'text-primary' : 'text-primary-foreground'}`} />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">Admin Login</h1>
                        <p className="text-sm text-muted-foreground mt-1">Sign in to manage your portfolio</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="text-xs text-muted-foreground block mb-1.5">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input 
                                    type="email" required value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className={`w-full h-11 pl-10 pr-4 border outline-none text-sm transition-colors ${
                                        isDark 
                                            ? 'bg-card border-border focus:border-primary rounded-lg text-foreground' 
                                            : 'bg-white border-border focus:border-primary rounded-xl text-foreground'
                                    }`}
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs text-muted-foreground block mb-1.5">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input 
                                    type="password" required value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className={`w-full h-11 pl-10 pr-4 border outline-none text-sm transition-colors ${
                                        isDark 
                                            ? 'bg-card border-border focus:border-primary rounded-lg text-foreground' 
                                            : 'bg-white border-border focus:border-primary rounded-xl text-foreground'
                                    }`}
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" disabled={isLoading}
                            className="imperial-btn w-full py-3 justify-center mt-2"
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <>Sign In <ArrowRight className="w-4 h-4" /></>
                            )}
                        </button>
                    </form>

                    <p className="text-[10px] text-center text-muted-foreground mt-6">
                        Authorized access only.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};
