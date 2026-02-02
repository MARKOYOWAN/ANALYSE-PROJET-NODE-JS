import { Router } from "express";
 
import { analyzeTextController, getHistoryController } from "../modules/analysis/controller/analyse.controller";

const router = Router();

// POST /api/analyze
router.post("/analyze", analyzeTextController);

// GET /api/history
router.get("/history", getHistoryController);

export default router;
