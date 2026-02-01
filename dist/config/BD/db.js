"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConnection = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
// ---------------------------------------------------------------------------
// Charger les variables d'environnement depuis le fichier .env
// ---------------------------------------------------------------------------
dotenv_1.default.config();
// ---------------------------------------------------------------------------
// Configuration de la base de données PostgreSQL
// Utilisation d'un Pool pour gérer efficacement les connexions
// ---------------------------------------------------------------------------
const pool = new pg_1.Pool({
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
const DBConnection = async () => {
    try {
        const client = await pool.connect();
        console.log("Connexion à PostgreSQL réussie !");
        client.release(); // Libère la connexion
    }
    catch (err) {
        console.error("Impossible de se connecter à PostgreSQL :", err);
        process.exit(1); // Stoppe l'application si DB non accessible
    }
};
exports.DBConnection = DBConnection;
// ---------------------------------------------------------------------------
// Export du pool pour exécuter des requêtes depuis les repositories
// ---------------------------------------------------------------------------
exports.default = pool;
//# sourceMappingURL=db.js.map