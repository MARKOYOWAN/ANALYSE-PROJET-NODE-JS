import { Router } from "express";

import { getHistoryController } from "../modules/history/controller/history.controller";

const router = Router();

/**
 * GET /api/analysis/history
 * -------------------------
 * Cette route retourne l'historique des analyses avec **pagination**.
 *
 * Query parameters :
 * - page (optionnel, par défaut 1) : numéro de la page à récupérer
 * - limit (optionnel, par défaut 10) : nombre d'éléments par page
 *
 * Exemple :
 *   /api/analysis/history?page=2&limit=5
 *   - page=2 -> récupération de la 2ᵉ page
 *   - limit=5 -> 5 éléments par page
 *
 * La logique de pagination est gérée dans le controller et le service.
 */
router.get("/", getHistoryController);

export default router;