import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  console.error("Missing DATABASE_URL in environment variables.");
  process.exit(1);
}

const TECH_TIPS = [
  {
    title: "The Power of DRY Physics",
    content: "Don't Repeat Yourself isn't just a rule, it's a structural necessity. When you build modular blocks, your codebase becomes a resilient ecosystem instead of a house of cards.",
    category: "Software Engineering",
    author: "Alishba Iqbal"
  },
  {
    title: "Git Rebase vs Merge",
    content: "Maintaining a clean linear history via rebase allows for high-fidelity debugging. A messy commit history is technical debt that compounds daily.",
    category: "IT Operations",
    author: "Alishba Iqbal"
  },
  {
    title: "Complexity is the Enemy",
    content: "The best system is often the simplest one that works. Over-engineering is a trap where the solution becomes more expensive than the problem it solves.",
    category: "Architecture",
    author: "Alishba Iqbal"
  },
  {
    title: "Mastering the DOM Lifecycle",
    content: "Understanding how the browser paints and reflows code is the difference between a sluggish app and a high-performance experience.",
    category: "Frontend",
    author: "Alishba Iqbal"
  },
  {
    title: "SQL Performance Tuning",
    content: "Indexes are powerful but not free. Strategic indexing of foreign keys and searching columns can turn minutes into milliseconds.",
    category: "Database",
    author: "Alishba Iqbal"
  },
  {
    title: "Micro-Module Separation",
    content: "Separating concerns into micro-modules ensures that a failure in one vector doesn't destabilize the entire system architecture.",
    category: "Software Engineering",
    author: "Alishba Iqbal"
  },
  {
    title: "The Art of Code Review",
    content: "Code reviews are first for knowledge sharing and second for finding bugs. It builds a collective intelligence within the development team.",
    category: "Culture",
    author: "Alishba Iqbal"
  },
  {
    title: "Latency and the Edge",
    content: "Moving logic to the edge reduces round-trip times significantly. In the age of 5G, microsecond precision is the new standard.",
    category: "Networks",
    author: "Alishba Iqbal"
  },
  {
    title: "Functional Purity",
    content: "Pure functions with no side effects are the building blocks of reliable software. They make testing trivial and bugs visible.",
    category: "Computer Science",
    author: "Alishba Iqbal"
  },
  {
    title: "Dependency Injection",
    content: "Decoupling your classes from their dependencies allows for seamless swapping and mocking during tests, ensuring a robust logic layer.",
    category: "Architecture",
    author: "Alishba Iqbal"
  }
];

async function runHeartbeat() {
  console.log("🚀 Starting Supabase Heartbeat (DB Direct)...");

  const client = new Client({ connectionString: dbUrl });
  
  try {
    await client.connect();
    const today = new Date().toISOString().split('T')[0];
    
    // 1. Check if we already added a tip today
    const checkRes = await client.query(
      "SELECT id FROM coding_tips WHERE fetched_at >= $1 LIMIT 1",
      [`${today}T00:00:00.000Z`]
    );

    if (checkRes.rows.length > 0) {
      console.log("✅ Tip already exists for today. Skipping insertion.");
      return;
    }

    // 2. Select a tip
    const start = new Date(new Date().getFullYear(), 0, 0);
    const diff = new Date() - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayIndex = Math.floor(diff / oneDay) % TECH_TIPS.length;
    const selectedTip = TECH_TIPS[dayIndex];
    
    // 3. Insert directly
    await client.query(
      "INSERT INTO coding_tips (title, content, category, author, fetched_at) VALUES ($1, $2, $3, $4, $5)",
      [selectedTip.title, selectedTip.content, selectedTip.category, selectedTip.author, new Date().toISOString()]
    );

    console.log(`✨ Successfully Synchronized: "${selectedTip.title}"`);
    console.log("🏆 Database heartbeat recorded.");

  } catch (err) {
    console.error("❌ Heartbeat error:", err);
  } finally {
    await client.end();
  }
}

runHeartbeat();
