import pg from "pg";
import config from "./env";

const { Pool, Client } = pg;

const pool = new Pool({ connectionString: config.poolUrl });
const client = new Client({ connectionString: config.clientUrl });

const connectPostgres = async () => {
  try {
    await pool.connect();
    console.log("✅ Connected to PostgreSQL via Pool");
  } catch (err) {
    console.error("❌ PostgreSQL Pool Connection Error:", err);
    throw new Error("Failed to connect to PostgreSQL");
  }
};


export { pool, client, connectPostgres };
