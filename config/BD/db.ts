import { Pool } from "pg";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

/**
 * Configuration de la base de données PostgreSQL
 * ---------------------------------------------
 * Utilisation d'un Pool pour gérer les connexions efficacement
 */
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "analyse_text",
});

/**
 * Fonction pour tester la connexion à la base de données
 */
export const DBConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("Connexion à PostgreSQL réussie !");
    client.release();
  } catch (err) {
    console.error("Impossible de se connecter à PostgreSQL :", err);
    process.exit(1); // Stop l'application si DB non accessible
  }
};

export default pool;
