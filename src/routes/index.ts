import { Application } from "express";

import healthRoutes from "./health.routes"; 
import apiRoutes from "./api.routes";

/**
 * setupRoutes
 * -------------------
 * Centralise toutes les routes de l'application
 */
export const setupRoutes = (app: Application) => {
  // Healthcheck (hors API)
  app.use("/health", healthRoutes);

  // API globale
  app.use("/api", apiRoutes);

  // 404 global
  app.use((_req, res) => {
    res.status(404).json({
      success: false,
      message: "Endpoint non trouvé",
    });
  });
};
