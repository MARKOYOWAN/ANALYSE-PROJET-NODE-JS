import express, { Application } from "express";
import dotenv from "dotenv";

import { setupMiddlewares } from "../config/middleware";
import { setupSwagger } from "../config/swagger";
import { errorHandler } from "../config/errorHandler";

import { setupRoutes } from "./routes";

// Charger les variables d'environnement
dotenv.config();

export const createApp = (): Application => {
  const app = express();

  // Middlewares globaux
  setupMiddlewares(app);

  // Swagger
  setupSwagger(app);

  // Routes de l'application
  setupRoutes(app);


  // Middleware de gestion des erreurs (après toutes les routes)
  app.use(errorHandler);

  return app;
};
