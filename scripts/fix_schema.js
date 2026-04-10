import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
dotenv.config();

async function addTitleColumn() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log("Connected to Supabase PostgreSQL.");
    
    await client.query('ALTER TABLE coding_tips ADD COLUMN IF NOT EXISTS title TEXT;');
    console.log("✅ Successfully added 'title' column to 'coding_tips' table.");
    
  } catch (err) {
    console.error("❌ Failed to update schema:", err);
  } finally {
    await client.end();
  }
}

addTitleColumn();
