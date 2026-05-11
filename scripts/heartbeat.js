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
  console.error("   → Go to: GitHub repo → Settings → Secrets and variables → Actions → New secret");
  console.error("   → Name: DATABASE_URL");
  console.error("   → Value: your Supabase PostgreSQL connection string (from Supabase → Settings → Database → URI)");
  // Exit 0 so the job shows as warning, not hard failure — makes debugging easier
  process.exit(0);
}

/**
 * Professional curated tips — matches professional_tips.json
 * Selecting by day-of-year ensures a different tip each day.
 */
async function getNewTip(currentTips = []) {
  try {
    const localTipsPath = path.join(__dirname, '../src/data/professional_tips.json');

    if (!fs.existsSync(localTipsPath)) {
      console.warn("⚠️ professional_tips.json not found at:", localTipsPath);
      return getHardcodedTip();
    }

    const data = fs.readFileSync(localTipsPath, 'utf8');
    const allTips = JSON.parse(data);

    if (!Array.isArray(allTips) || allTips.length === 0) {
      return getHardcodedTip();
    }

    // Smart Selection: Prioritize under-represented categories
    const categoryCounts = {};
    currentTips.forEach(tip => {
      categoryCounts[tip.category] = (categoryCounts[tip.category] || 0) + 1;
    });

    // Get all available categories from the full library
    const allCategories = [...new Set(allTips.map(t => t.category))];
    
    // Find categories that are missing or have the fewest entries in the current set
    const categoryFrequencies = allCategories.map(cat => ({
      category: cat,
      count: categoryCounts[cat] || 0
    })).sort((a, b) => a.count - b.count);

    const minCount = categoryFrequencies[0].count;
    const priorityCategories = categoryFrequencies
      .filter(f => f.count === minCount)
      .map(f => f.category);

    // Filter library tips for these priority categories
    let pool = allTips.filter(t => priorityCategories.includes(t.category));
    
    // Also ensure we don't pick the exact same tip as the most recent ones
    const recentTitles = currentTips.slice(0, 15).map(t => t.title);
    pool = pool.filter(t => !recentTitles.includes(t.title));

    // Fallback if priority pool is empty
    if (pool.length === 0) {
      pool = allTips.filter(t => !recentTitles.includes(t.title));
    }
    if (pool.length === 0) pool = allTips;

    // Random selection from the pool for variety
    const selected = pool[Math.floor(Math.random() * pool.length)];
    
    console.log(`🎯 Category Priority: ${priorityCategories.join(', ')} (count: ${minCount})`);
    console.log(`✨ Selected Tip: "${selected.title}" [${selected.category}]`);
    
    return selected;
  } catch (err) {
    console.error("⚠️ Error selecting tip:", err.message);
    return getHardcodedTip();
  }
}

function getHardcodedTip() {
  const fallbacks = [
    { title: "Avoid Nested Loops: Use a Set", content: "Nested loops give O(n²) complexity. Convert the inner array to a Set for O(1) lookups, reducing overall complexity to O(n).", tutorial: "### Bad: O(n²)\n```js\nconst matches = arr1.filter(x => arr2.includes(x));\n```\n### Good: O(n)\n```js\nconst set2 = new Set(arr2);\nconst matches = arr1.filter(x => set2.has(x));\n```\nSet.has() is O(1) vs Array.includes() which is O(n).", category: "Performance", author: "Alishba Iqbal" },
    { title: "Replace for-loop with .map()", content: "Use .map() instead of manually pushing into an empty array inside a for-loop. It is declarative, immutable, and cleaner.", tutorial: "### Bad\n```js\nconst results = [];\nfor (let i = 0; i < items.length; i++) {\n  results.push(items[i].value * 2);\n}\n```\n### Good\n```js\nconst results = items.map(item => item.value * 2);\n```", category: "Clean Code", author: "Alishba Iqbal" },
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

async function runHeartbeat() {
  console.log("🚀 Starting Supabase Heartbeat...");
  console.log("   Time (UTC):", new Date().toISOString());

  const client = new Client({ connectionString: dbUrl });

  try {
    await client.connect();
    console.log("✅ Connected to database.");

    // Fetch current tips to inform selection and handle rotation
    const currentRes = await client.query(
      "SELECT title, category, fetched_at FROM coding_tips ORDER BY fetched_at DESC LIMIT 50"
    );
    const currentTips = currentRes.rows;

    // Get a fresh tip using the smart selection logic
    const selectedTip = await getNewTip(currentTips);
    if (!selectedTip) throw new Error("Could not retrieve a new tip.");

    // Insert the new tip
    await client.query(
      "INSERT INTO coding_tips (title, content, tutorial, category, author, fetched_at) VALUES ($1, $2, $3, $4, $5, NOW())",
      [selectedTip.title, selectedTip.content, selectedTip.tutorial || '', selectedTip.category, selectedTip.author]
    );

    console.log(`✅ Successfully inserted: "${selectedTip.title}"`);

    // Perfection Retention: Keep the 30 newest tips OVERALL, 
    // BUT also ensure we never delete the "last remaining" tip of any category.
    // This guarantees "each category has a tip" as requested.
    const MAX_TIPS = 30;
    const cleanupRes = await client.query(
      `WITH LatestPerCategory AS (
         SELECT id, ROW_NUMBER() OVER(PARTITION BY category ORDER BY fetched_at DESC) as rank
         FROM coding_tips
       ),
       NewestOverall AS (
         SELECT id FROM coding_tips 
         ORDER BY fetched_at DESC 
         LIMIT $1
       )
       DELETE FROM coding_tips
       WHERE id NOT IN (SELECT id FROM NewestOverall)
       AND id NOT IN (SELECT id FROM LatestPerCategory WHERE rank = 1)`,
      [MAX_TIPS]
    );
    
    const deleted = cleanupRes.rowCount ?? 0;
    if (deleted > 0) {
      console.log(`🧹 Cleaned up ${deleted} old tip(s). Keeping latest ${MAX_TIPS}.`);
    }

    console.log("🏆 Heartbeat completed successfully.");

  } catch (err) {
    console.error("❌ Heartbeat execution failed:", err.message);
    process.exit(1);
  } finally {
    try { await client.end(); } catch { /* ignore */ }
  }
}

runHeartbeat();
