import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const dbUrl = process.env.DATABASE_URL;

async function checkTips() {
  const client = new Client({ connectionString: dbUrl });
  try {
    await client.connect();
    const res = await client.query("SELECT * FROM coding_tips ORDER BY fetched_at DESC LIMIT 5");
    console.log("Latest tips in DB:", JSON.stringify(res.rows, null, 2));
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.end();
  }
}

checkTips();
