import { Request, Response } from "express";

import { HistoryRepository } from "../repository/history.repository";

/**
 * HistoryController
 * -----------------
 * Gère la récupération de l'historique des analyses
 *
 * Route : GET /api/history
 */
export const getHistoryController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const historyRepository = new HistoryRepository();
        const history = await historyRepository.findAll();

        return res.status(200).json({
            success: true,
            data: history,
        });
    } catch (error) {
        console.error("Erreur getHistoryController :", error);

        return res.status(500).json({
            success: false,
            message: "Erreur interne du serveur",
        });
    }
};
