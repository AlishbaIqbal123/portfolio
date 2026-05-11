
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function seed() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to database for seeding...');

    // Load tips from professional_tips.json
    const tipsPath = path.join(__dirname, '..', 'src', 'data', 'professional_tips.json');
    const tipsData = JSON.parse(fs.readFileSync(tipsPath, 'utf8'));

    // We want to seed at least 2 tips for each of the user's priority categories
    const priorityCategories = ['OOP', 'DSA', 'React', 'Languages'];
    const tipsToSeed = tipsData.filter(tip => 
      priorityCategories.includes(tip.category) || 
      ['Algorithms', 'Data Structures', 'Modern JS'].includes(tip.category)
    );

    console.log(`Found ${tipsToSeed.length} relevant tips to seed.`);

    for (const tip of tipsToSeed) {
      // Check if already exists by title to avoid duplicates
      const exists = await client.query('SELECT id FROM coding_tips WHERE title = $1', [tip.title]);
      
      if (exists.rowCount === 0) {
        await client.query(
          `INSERT INTO coding_tips (title, content, tutorial, category, author, fetched_at)
           VALUES ($1, $2, $3, $4, $5, NOW())`,
          [tip.title, tip.content, tip.tutorial || '', tip.category, tip.author]
        );
        console.log(`Inserted: ${tip.title}`);
      } else {
        console.log(`Skipped (exists): ${tip.title}`);
      }
    }

    console.log('✅ Seeding complete! The Tips page should now be populated with OOP, DSA, and React content.');

  } catch (err) {
    console.error('Error seeding tips:', err);
  } finally {
    await client.end();
  }
}

seed();
