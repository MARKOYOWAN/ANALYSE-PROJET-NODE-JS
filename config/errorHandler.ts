import { Request, Response, NextFunction } from "express";

/**
 * Interface pour les erreurs personnalisées avec un code HTTP
 */
interface AppError extends Error {
  status?: number;
}

/**
 * Global error handler
 */
export const errorHandler = (
  err: unknown, 
  _req: Request, 
  res: Response, 
  _next: NextFunction
): void => {
  console.error("Erreur attrapée :", err);

  let message = "Internal Server Error";
  let status = 500;

  // On vérifie si l'erreur est une instance d'Error (ou AppError)
  if (err instanceof Error) {
    message = err.message;
    // On vérifie si la propriété 'status' existe dans cet objet
    if ("status" in err && typeof (err as AppError).status === "number") {
      status = (err as AppError).status!;
    }
  }

  res.status(status).json({ 
    success: false, 
    message 
  });
};