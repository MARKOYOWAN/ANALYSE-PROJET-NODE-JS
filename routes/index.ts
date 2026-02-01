import { Application } from "express";
//import sampleRoutes from "./sample.routes";

/**
 * setupRoutes
 * -------------------
 * Fonction pour centraliser toutes les routes de l'application
 */
export const setupRoutes = (app: Application) => {
    // Toutes les routes liées aux exemples
    //app.use("/api/sample", sampleRoutes);

    // Gestion des routes non trouvées (404)
    app.use("*", (req, res) => {
        res.status(404).json({
            success: false,
            message: "Endpoint non trouvé",
        });
    });
};
