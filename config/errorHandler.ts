import { Request, Response, NextFunction } from "express";

/**
 * Global error handler
 */
export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error("Erreur attrapée :", err);

  const message = err instanceof Error ? err.message : "Internal Server Error";
  const status = (err as any)?.status || 500;

  res.status(status).json({ success: false, message });
};
