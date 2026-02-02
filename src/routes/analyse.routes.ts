import { Router } from "express";
import { getHistoryController } from "../modules/history/controller/history.controller";

const router = Router();

// GET /api/history
router.get("/history", getHistoryController);

export default router;
