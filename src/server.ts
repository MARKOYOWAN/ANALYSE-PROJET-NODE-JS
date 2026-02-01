import { DBConnection } from "../config/BD/db"; // Fonction pour se connecter à PostgreSQL
import { createApp } from "./app";              // Création de l'application Express

// Définir le port sur lequel l'application va écouter
const PORT = process.env.PORT || 3000;

/**
 * startServer
 * -------------------------
 * Fonction principale pour :
 * 1. Tester la connexion à la base de données PostgreSQL
 * 2. Créer l'application Express
 * 3. Démarrer le serveur sur le port configuré
 */
const startServer = async () => {
    try {
        // Connexion à la base de données
        await DBConnection();
        console.log("Connexion à PostgreSQL réussie.");

        // Création de l'application Express
        const app = createApp();

        // Démarrage du serveur
        app.listen(PORT, () => {
            console.log(`Analyse Text API running on http://localhost:${PORT}`);
        });
    } catch (err: any) {
        console.error("Impossible de démarrer le serveur :", err);
        process.exit(1); // Arrêt de l'application en cas d'erreur critique
    }
};

// Lancer le serveur
startServer();
