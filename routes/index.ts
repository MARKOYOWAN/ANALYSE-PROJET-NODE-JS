import { Application } from "express";

import healthRoutes from "./health.routes";

/**
 * setupRoutes
 * -------------------
 * Centralise toutes les routes de l'application
 */
export const setupRoutes = (app: Application) => {
    // Routes health
    app.use("/health", healthRoutes);

    // Autres routes ici
    // app.use("/api/texts", textRoutes);

    // 👇 Middleware catch-all 404 pour toutes les routes non définies
    app.use((req, res) => {
        res.status(404).json({
            success: false,
            message: "Endpoint non trouvé",
        });
    });
};
