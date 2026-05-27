import { Pool } from "pg";
import { config } from "./env.js";

const pool = new Pool(config.db);

pool.on("connect", async (client) => {
  const db = await client.query("SELECT current_database()");
  console.log("DB:", db.rows[0]);
});

pool.on("error", (err) => {
  console.error("Database Error", err);
});

export default pool;
