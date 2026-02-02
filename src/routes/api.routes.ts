import { Router } from "express";

import analyzeRoutes from "./analyze.routes";

const router = Router();

/**
 * Routes API (préfixe /api)
 */
router.use("/", analyzeRoutes);

// Plus tard :
// router.use("/users", userRoutes);
// router.use("/auth", authRoutes);

export default router;
