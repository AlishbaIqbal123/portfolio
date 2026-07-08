import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase credentials in env!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function dump() {
  try {
    const { data: projects, error: err1 } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    const { data: experience, error: err2 } = await supabase.from('experience').select('*').order('created_at', { ascending: false });
    const { data: education, error: err3 } = await supabase.from('education').select('*').order('created_at', { ascending: false });

    if (err1) console.error("Error projects:", err1);
    if (err2) console.error("Error experience:", err2);
    if (err3) console.error("Error education:", err3);

    const dumpData = {
      projects: projects || [],
      experience: experience || [],
      education: education || []
    };

    fs.writeFileSync('db_dump.json', JSON.stringify(dumpData, null, 2));
    console.log("Dumped DB data successfully to scratch/db_dump.json");
  } catch (err) {
    console.error("Fatal error:", err);
  }
}

dump();
