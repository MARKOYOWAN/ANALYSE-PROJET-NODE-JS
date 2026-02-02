import { Request, Response } from "express";

import { HistoryRepository } from "../../history/repository/history.repository";
import { AnalysisService } from "../service/analyse.service";

/**
 * AnalysisController
 * ------------------
 * Gère l'analyse d'un texte :
 * - validation de l'entrée
 * - calcul du score via AnalysisService
 * - sauvegarde en base via HistoryRepository
 *
 * Route : POST /api/analyze
 */
export const analyzeTextController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { text } = req.body;

    // ✅ Validation des entrées
    if (!text || typeof text !== "string") {
      return res.status(400).json({
        success: false,
        message:
          "Le champ 'text' est obligatoire et doit être une chaîne de caractères",
      });
    }

    // 🧠 Analyse du texte
    const analysisService = new AnalysisService();
    const score = analysisService.analyzeText(text);

    // 💾 Sauvegarde en base
    const historyRepository = new HistoryRepository();
    const savedAnalysis = await historyRepository.save({
      text,
      score,
    });

    // Réponse API standardisée
    return res.status(200).json({
      success: true,
      data: {
        id: savedAnalysis.id,
        text: savedAnalysis.text,
        score: savedAnalysis.score,
      },
    });
  } catch (error) {
    console.error("Erreur analyseTextController :", error);

    return res.status(500).json({
      success: false,
      message: "Erreur interne du serveur",
    });
  }
};
