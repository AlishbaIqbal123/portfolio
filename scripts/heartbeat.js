import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  console.error("❌ Missing DATABASE_URL in environment variables.");
  process.exit(1);
}

/**
 * FETCH SOURCE: We use a combination of a curated local JSON 
 * (matching user's specific performance request) and a fallback dynamic source.
 */
async function getNewTip() {
  try {
    // Attempt to load from our new professional tips source
    const localTipsPath = path.join(__dirname, '../src/data/professional_tips.json');
    let tips = [];
    
    if (fs.existsSync(localTipsPath)) {
      const data = fs.readFileSync(localTipsPath, 'utf8');
      tips = JSON.parse(data);
    }

    // Secondary Source: Simulated API or actual external fetch
    // We can fetch from a public gist or raw github file here
    // For now, we pick from our high-quality curated list to ensure "instead of loop use this" content
    
    const start = new Date(new Date().getFullYear(), 0, 0);
    const diff = new Date() - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayIndex = Math.floor(diff / oneDay) % (tips.length || 1);
    
    return tips[dayIndex] || {
      title: "Complexity Optimization",
      content: "Always strive for O(n) complexity over O(n^2). Use Hash Maps for lookups instead of nested loops.",
      category: "Performance",
      author: "System"
    };
  } catch (err) {
    console.error("⚠️ Error selecting tip:", err);
    return null;
  }
}

async function runHeartbeat() {
  console.log("🚀 Starting Supabase Heartbeat (Enhanced Logic)...");

  const client = new Client({ connectionString: dbUrl });
  
  try {
    await client.connect();
    
    // Use UTC for consistent 'once per day' check regardless of server location
    const todayUTC = new Date().toISOString().split('T')[0];
    
    // 1. Check if we already added a tip for today (UTC)
    const checkRes = await client.query(
      "SELECT id FROM coding_tips WHERE fetched_at AT TIME ZONE 'UTC' >= $1::date LIMIT 1",
      [todayUTC]
    );

    if (checkRes.rows.length > 0) {
      console.log("✅ Tip already exists for today (UTC). No new insertion needed.");
      return;
    }

    // 2. Get a fresh tip
    const selectedTip = await getNewTip();
    if (!selectedTip) throw new Error("Could not retrieve a new tip.");

    // 3. Insert with all fields
    await client.query(
      "INSERT INTO coding_tips (title, content, tutorial, category, author, fetched_at) VALUES ($1, $2, $3, $4, $5, NOW())",
      [selectedTip.title, selectedTip.content, selectedTip.tutorial || '', selectedTip.category, selectedTip.author]
    );

    console.log(`✨ Successfully Synchronized: "${selectedTip.title}"`);

    // 4. Cleanup: keep only the 20 most recent tips, delete the rest
    const MAX_TIPS = 20;
    const cleanupRes = await client.query(
      `DELETE FROM coding_tips
       WHERE id NOT IN (
         SELECT id FROM coding_tips
         ORDER BY fetched_at DESC
         LIMIT $1
       )`,
      [MAX_TIPS]
    );
    const deleted = cleanupRes.rowCount ?? 0;
    if (deleted > 0) {
      console.log(`🧹 Cleaned up ${deleted} old tip(s). Keeping latest ${MAX_TIPS}.`);
    }

    console.log("🏆 Database heartbeat recorded successfully.");

  } catch (err) {
    console.error("❌ Heartbeat execution failed:", err.message);
    if (err.message.includes('column "title" does not exist')) {
        console.log("💡 TIP: Run 'node scripts/fix_schema.js' to add the missing title column.");
    }
  } finally {
    await client.end();
  }
}

runHeartbeat();
