import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: './app/.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkProjects() {
    const { data, error } = await supabase
        .from('projects')
        .select('id, title, video_url, is_video_primary');

    if (error) {
        console.error('Error fetching projects:', error);
        return;
    }

    console.log('Projects in DB:');
    data.forEach(p => {
        console.log(`- ${p.title} (${p.id}): video_url="${p.video_url}", is_video_primary=${p.is_video_primary}`);
    });
}

checkProjects();
