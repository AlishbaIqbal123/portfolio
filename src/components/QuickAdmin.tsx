import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickAdminProps {
    tab: string;
}

export const QuickAdmin = ({ tab }: QuickAdminProps) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            const { data } = await supabase.auth.getSession();
            setIsAdmin(!!data.session);
        };
        checkUser();
    }, []);

    if (!isAdmin) return null;

    return (
        <button 
            onClick={() => navigate('/admin', { state: { activeTab: tab } })}
            className="fixed bottom-4 right-4 md:bottom-10 md:right-10 z-[100] opacity-[0.03] hover:opacity-100 bg-primary/5 hover:bg-primary text-primary/40 hover:text-white p-6 rounded-2xl border border-primary/10 transition-all duration-700 flex items-center gap-4 group scale-75 hover:scale-100 shadow-2xl"
            title="Edit"
        >
            <Edit2 className="w-4 h-4" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-[150px] transition-all duration-700 font-medium text-[10px] tracking-wider whitespace-nowrap">
                Edit {tab}
            </span>
        </button>
    );
};
