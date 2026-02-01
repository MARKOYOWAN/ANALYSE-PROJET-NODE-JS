import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

/**
 * setupMiddlewares
 * -------------------
 * Configure tous les middlewares globaux
 */
export const setupMiddlewares = (app: Application): void => {
  // Sécurité HTTP headers
  app.use(helmet());

  // CORS
  app.use(cors());

  // Parser JSON et URL-encoded
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Rate Limiter
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Max 100 requêtes par IP
      message: { success: false, message: "Trop de requêtes, réessayez plus tard" },
    })
  );
};
