import express, { Application } from "express";
import dotenv from "dotenv";
import { setupMiddlewares } from "../config/middleware";
import { setupSwagger } from "../config/swagger";
import { setupRoutes } from "../routes";
import { errorHandler } from "../config/errorHandler";

// Charger les variables d'environnement
dotenv.config();

export const createApp = (): Application => {
  const app = express();

  // Middlewares globaux
  setupMiddlewares(app);

  // Routes de l'application
  setupRoutes(app);

  // Swagger
  setupSwagger(app);

  // Middleware de gestion des erreurs (après toutes les routes)
  app.use(errorHandler);

  return app;
};
