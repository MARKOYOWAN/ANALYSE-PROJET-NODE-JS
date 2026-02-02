import { Router } from "express";

import analyzeRoutes from "./analyse.routes";
import hystoryRoutes from "./history.routes";
const router = Router();

/**
 * Routes API (préfixe /api)
 */
/**
 * Routes Analyse controller
 */
router.use("/analyze", analyzeRoutes);

/**
 * Routes History controller
 */
router.use("/history", hystoryRoutes);

// Plus tard :
// router.use("/users", userRoutes);
// router.use("/auth", authRoutes);

export default router;
