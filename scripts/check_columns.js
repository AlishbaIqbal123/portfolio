import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function checkSchema() {
    const { data, error } = await supabase.from('coding_tips').select('*').limit(1);
    if (error) console.error(error);
    else console.log('Current keys in coding_tips:', data.length > 0 ? Object.keys(data[0]) : 'No data');
}
checkSchema();
