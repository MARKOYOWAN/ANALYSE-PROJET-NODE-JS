import { Request, Response } from "express"; 
import { HistoryRepository } from "../../history/repository/history.repository";
import { AnalysisService } from "../service/analysis.service";

/**
 * POST /api/analyze
 */
export const analyzeTextController = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== "string") {
      return res.status(400).json({
        success: false,
        message: "Le champ 'text' est obligatoire et doit être une chaîne de caractères",
      });
    }

    // Instancier le service d'analyse
    const analysisService = new AnalysisService();

    // Calculer le score automatiquement via la classe
    const score = analysisService.analyzeText(text);

    // Sauvegarder dans la base
    const historyRepo = new HistoryRepository();
    const saved = await historyRepo.save({ text, score });

    return res.status(200).json({
      success: true,
      data: {
        text: saved.text,
        score: saved.score,
      },
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur",
    });
  }
};

/**
 * GET /api/history
 */
export const getHistoryController = async (req: Request, res: Response) => {
  try {
    const historyRepo = new HistoryRepository();
    const allHistory = await historyRepo.findAll();

    return res.status(200).json({
      success: true,
      data: allHistory,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur",
    });
  }
};
