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
async function getNewTip() {
  try {
    // Look for JSON relative to this file's directory (scripts/) → ../src/data/
    const localTipsPath = path.join(__dirname, '../src/data/professional_tips.json');

    if (!fs.existsSync(localTipsPath)) {
      console.warn("⚠️ professional_tips.json not found at:", localTipsPath);
      return getHardcodedTip();
    }

    const data = fs.readFileSync(localTipsPath, 'utf8');
    const tips = JSON.parse(data);

    if (!Array.isArray(tips) || tips.length === 0) {
      return getHardcodedTip();
    }

    // Day-of-year index for consistent daily rotation
    const start = new Date(new Date().getFullYear(), 0, 0);
    const diff = Date.now() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayIndex = Math.floor(diff / oneDay) % tips.length;

    console.log(`📚 Selected tip #${dayIndex + 1} of ${tips.length}: "${tips[dayIndex].title}"`);
    return tips[dayIndex];
  } catch (err) {
    console.error("⚠️ Error selecting tip:", err.message);
    return getHardcodedTip();
  }
}

function getHardcodedTip() {
  const fallbacks = [
    { title: "Avoid Nested Loops: Use a Set", content: "Nested loops give O(n²) complexity. Convert the inner array to a Set for O(1) lookups, reducing overall complexity to O(n).", tutorial: "### Bad: O(n²)\n```js\nconst matches = arr1.filter(x => arr2.includes(x));\n```\n### Good: O(n)\n```js\nconst set2 = new Set(arr2);\nconst matches = arr1.filter(x => set2.has(x));\n```\nSet.has() is O(1) vs Array.includes() which is O(n).", category: "Performance", author: "Alishba Iqbal" },
    { title: "Replace for-loop with .map()", content: "Use .map() instead of manually pushing into an empty array inside a for-loop. It is declarative, immutable, and cleaner.", tutorial: "### Bad\n```js\nconst results = [];\nfor (let i = 0; i < items.length; i++) {\n  results.push(items[i].value * 2);\n}\n```\n### Good\n```js\nconst results = items.map(item => item.value * 2);\n```", category: "Clean Code", author: "Alishba Iqbal" },
    { title: "Use a HashMap for O(1) Lookups", content: "Replace O(n) array searches with a pre-built Map for constant-time lookups — critical in large datasets.", tutorial: "```js\nconst userMap = new Map(users.map(u => [u.id, u]));\nfunction getUser(id) { return userMap.get(id); }\n```\nBuild once, query many times.", category: "Data Structures", author: "Alishba Iqbal" },
  ];
  const dayIndex = Math.floor((Date.now() / 86400000)) % fallbacks.length;
  return fallbacks[dayIndex];
}

async function runHeartbeat() {
  console.log("🚀 Starting Supabase Heartbeat...");
  console.log("   Time (UTC):", new Date().toISOString());

  const client = new Client({ connectionString: dbUrl });

  try {
    await client.connect();
    console.log("✅ Connected to database.");

    // Use UTC date for consistent once-per-day check
    const todayUTC = new Date().toISOString().split('T')[0];

    // Check if tip already inserted today
    const checkRes = await client.query(
      "SELECT id FROM coding_tips WHERE DATE(fetched_at AT TIME ZONE 'UTC') = $1::date LIMIT 1",
      [todayUTC]
    );

    if (checkRes.rows.length > 0) {
      console.log("✅ Tip already exists for today (UTC). No new insertion needed.");
      return;
    }

    // Get and insert a fresh tip
    const selectedTip = await getNewTip();
    if (!selectedTip) throw new Error("Could not retrieve a new tip.");

    await client.query(
      "INSERT INTO coding_tips (title, content, tutorial, category, author, fetched_at) VALUES ($1, $2, $3, $4, $5, NOW())",
      [selectedTip.title, selectedTip.content, selectedTip.tutorial || '', selectedTip.category, selectedTip.author]
    );

    console.log(`✨ Successfully inserted: "${selectedTip.title}"`);

    // Keep only the 20 most recent tips
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

    console.log("🏆 Heartbeat completed successfully.");

  } catch (err) {
    console.error("❌ Heartbeat execution failed:", err.message);
    // Re-throw so the GitHub Action marks it as failed
    process.exit(1);
  } finally {
    try { await client.end(); } catch { /* ignore */ }
  }
}

runHeartbeat();
