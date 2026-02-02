import { Router } from "express";

import { getHistoryController } from "../modules/history/controller/history.controller";

const router = Router();


/**
 * GET /api/analysis/history
 * Retourne l'historique des analyses
 */
router.get("/", getHistoryController);

export default router;