import { DBConnection } from "../config/BD/db";
import { createApp } from "./app";

const PORT = process.env.PORT || 3000;

/**
 * startServer
 * -------------------------
 * Fonction principale pour :
 * 1. Tester la connexion à PostgreSQL
 * 2. Créer l'application Express
 * 3. Démarrer le serveur sur le port configuré
 */
const startServer = async (): Promise<void> => {
    try {
        await DBConnection();
        console.log("Connexion à PostgreSQL réussie.");

        const app = createApp();

        app.listen(PORT, () => {
            console.log(`Analyse Text API running on http://localhost:${PORT}`);
        });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        console.error("Impossible de démarrer le serveur :", message);
        process.exit(1);
    }
};

startServer();
