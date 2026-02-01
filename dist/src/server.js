"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/BD/db");
const app_1 = require("./app");
const PORT = process.env.PORT || 3000;
/**
 * startServer
 * -------------------------
 * Fonction principale pour :
 * 1. Tester la connexion à PostgreSQL
 * 2. Créer l'application Express
 * 3. Démarrer le serveur sur le port configuré
 */
const startServer = async () => {
    try {
        await (0, db_1.DBConnection)();
        console.log("Connexion à PostgreSQL réussie.");
        const app = (0, app_1.createApp)();
        app.listen(PORT, () => {
            console.log(`Analyse Text API running on http://localhost:${PORT}`);
        });
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error("Impossible de démarrer le serveur :", message);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map