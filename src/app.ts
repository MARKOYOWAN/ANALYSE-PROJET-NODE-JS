import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { setupSwagger } from "../config/swagger"; 

// ---------------------------------------------------------------------------
// Charger les variables d'environnement depuis le fichier .env
// ---------------------------------------------------------------------------
dotenv.config();

// ---------------------------------------------------------------------------
// createApp - Crée et configure l'application Express
// ---------------------------------------------------------------------------
export const createApp = (): Application => {
    const app = express();

    // -----------------------------------------------------------------------
    // Sécurité et headers HTTP
    // Helmet ajoute des headers HTTP pour protéger l'application
    // -----------------------------------------------------------------------
    app.use(helmet());

    // -----------------------------------------------------------------------
    // CORS - Cross-Origin Resource Sharing
    // Permet de définir les domaines autorisés à accéder à l'API
    // -----------------------------------------------------------------------
    app.use(cors());

    // -----------------------------------------------------------------------
    // Middleware pour parser le corps des requêtes
    // -----------------------------------------------------------------------
    app.use(express.json()); // pour JSON
    app.use(express.urlencoded({ extended: true })); // pour formulaire x-www-form-urlencoded

    // -----------------------------------------------------------------------
    // Limitation de débit (Rate Limiter)
    // Protège contre les attaques DoS en limitant le nombre de requêtes par IP
    // -----------------------------------------------------------------------
    app.use(
        rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // Maximum 100 requêtes par IP par fenêtre de temps
            message: { success: false, message: "Trop de requêtes, réessayez plus tard" },
        })
    );

    // ----------------- Routes -----------------
   // setupRoutes(app);

    // -----------------------------------------------------------------------
    // Swagger - Documentation interactive de l'API
    // Accessible via /api-docs
    // -----------------------------------------------------------------------
    setupSwagger(app);

    // -----------------------------------------------------------------------
    // Middleware de gestion globale des erreurs
    // Tout error renvoyé par l'application passera ici
    // -----------------------------------------------------------------------
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        console.error("Erreur attrapée :", err);

        // Standardisation des réponses d'erreur
        res.status(err.status || 500).json({
            success: false,
            message: err.message || "Internal Server Error",
        });
    });

    return app;
};
