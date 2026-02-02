import { Router, Request, Response } from "express";

// Créer un router dédié pour le health check
const router = Router();

/**
 * GET /health
 * Endpoint pour vérifier si le serveur est "up"
 */
router.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        status: "UP",
        message: "Analyse Text API is running",
    });
});

export default router;
