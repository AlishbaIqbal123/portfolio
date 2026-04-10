import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Project = {
    id: string;
    title: string;
    description: string;
    image: string;
    video_url?: string;
    github_link?: string;
    deployed_link?: string;
    tech_stack: string[];
    category: 'web' | 'mobile' | 'desktop';
    is_video_primary: boolean;
    created_at: string;
};

export type Article = {
    id: string;
    title: string;
    content: string;
    url?: string;
    excerpt?: string;
    published_at: string;
    is_active: boolean;
};


export type CodingTip = {
    id: string;
    content: string;
    category: string;
    author: string;
    fetched_at: string;
};
