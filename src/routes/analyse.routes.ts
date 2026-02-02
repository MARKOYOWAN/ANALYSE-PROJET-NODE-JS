import { Router } from "express";

import { analyzeTextController } from "../modules/analysis/controller/analyse.controller";

const router = Router();

/**
 * POST /api/analysis
 * Analyse un texte et calcule le score
 */
router.post("/", analyzeTextController);


export default router;