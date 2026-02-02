import { Request, Response } from "express";

import { HistoryRepository } from "../repository/history.repository";
import { AnalysisService } from "../../analysis/service/analyse.service";
import { HistoryService } from "../service/history.service";
import { HistoryResponseDTO } from "../model/history.types";

/**
 * GET /api/history
 * ----------------
 * Retourne l'historique des analyses avec pagination
 * Query params : page (1 par défaut), limit (10 par défaut)
 */

/**
 * @swagger
 * tags:
 *   name: History
 *   description: Historique des analyses
 */

/**
 * @swagger
 * /api/history:
 *   get:
 *     summary: Récupère l'historique des analyses avec pagination
 *     tags: [History]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Numéro de la page
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Nombre d'éléments par page
 *     responses:
 *       200:
 *         description: Historique récupéré
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       text:
 *                         type: string
 *                       score:
 *                         type: number
 *                       created_on:
 *                         type: string
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                     page:
 *                       type: number
 *                     limit:
 *                       type: number
 *                     totalPages:
 *                       type: number
 */
export const getHistoryController = async (
    req: Request,
    res: Response
): Promise<Response<HistoryResponseDTO>> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const historyRepo = new HistoryRepository();
        const analysisService = new AnalysisService();
        const historyService = new HistoryService(historyRepo, analysisService);

        const result = await historyService.getHistory(page, limit);

        return res.status(200).json({
            success: true,
            data: result.data,
            pagination: {
                total: result.total,
                page: result.page,
                limit: result.limit,
                totalPages: Math.ceil(result.total / result.limit),
            },
        });
    } catch (error) {
        console.error("Erreur getHistoryController :", error);
        return res.status(500).json({
            success: false,
            data: [],
            pagination: {
                total: 0,
                page: 1,
                limit: 10,
                totalPages: 0,
            },
        });
    }
};
