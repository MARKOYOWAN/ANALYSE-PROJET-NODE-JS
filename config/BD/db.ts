import { Pool } from "pg";
import dotenv from "dotenv";

// ---------------------------------------------------------------------------
// Charger les variables d'environnement depuis le fichier .env
// ---------------------------------------------------------------------------
dotenv.config();

// ---------------------------------------------------------------------------
// Configuration de la base de données PostgreSQL
// Utilisation d'un Pool pour gérer efficacement les connexions
// ---------------------------------------------------------------------------
const pool: Pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "analyse_text",
});

// ---------------------------------------------------------------------------
// DBConnection
// -------------------------
// Fonction pour tester la connexion à la base de données PostgreSQL
// ---------------------------------------------------------------------------
export const DBConnection = async (): Promise<void> => {
  try {
    const client = await pool.connect();
    console.log("Connexion à PostgreSQL réussie !");
    client.release(); // Libère la connexion
  } catch (err: unknown) {
    console.error("Impossible de se connecter à PostgreSQL :", err);
    process.exit(1); // Stoppe l'application si DB non accessible
  }
};

// ---------------------------------------------------------------------------
// Export du pool pour exécuter des requêtes depuis les repositories
// ---------------------------------------------------------------------------
export default pool;
