import express, { Application } from "express";
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
      limit: 100, // Dans les versions récentes d'express-rate-limit, 'max' est devenu 'limit'
      message: { success: false, message: "Trop de requêtes, réessayez plus tard" },
      standardHeaders: true, // Retourne les infos de limite dans les headers `RateLimit-*`
      legacyHeaders: false, // Désactive les headers `X-RateLimit-*`
    })
  );
};