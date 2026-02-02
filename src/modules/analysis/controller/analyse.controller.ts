import { Request, Response } from "express";

import { HistoryRepository } from "../../history/repository/history.repository";
import { AnalysisService } from "../service/analyse.service";
import { AnalyzeRequest, AnalyzeResult } from "../model/analyse.types";



/**
 * @swagger
 * /api/analyze:
 *   post:
 *     summary: Analyse un texte et retourne le score
 *     tags:
 *       - Analyse
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AnalyzeRequest'
 *     responses:
 *       200:
 *         description: Score calculé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AnalyzeResult'
 *       400:
 *         description: Entrée invalide
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AnalyzeRequest:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *           example: "Ceci est un texte de test"
 *       required:
 *         - text
 *     AnalyzeResult:
 *       type: object
 *       properties:
 *         score:
 *           type: integer
 *           example: 72
 *         status:
 *           type: string
 *           example: "ok"
 */


/**
 * AnalysisController
 * ------------------
 * Gère l'analyse d'un texte :
 * - validation de l'entrée via DTO AnalyzeRequest
 * - calcul du score via AnalysisService
 * - sauvegarde en base via HistoryRepository
 *
 * Route : POST /api/analyze
 */


export const analyzeTextController = async (
  req: Request<object, object, AnalyzeRequest>, // <Params, ResBody, ReqBody>
  res: Response<AnalyzeResult | { score: number; status: "error"; message: string }>
): Promise<Response> => {
  try {
    const { text } = req.body;

    // Validation des entrées
    if (!text || typeof text !== "string") {
      return res.status(400).json({
        score: 0,
        status: "error",
        message: "Le champ 'text' est obligatoire et doit être une chaîne de caractères",
      });
    }

    // Analyse du texte
    const analysisService = new AnalysisService();
    const score = analysisService.analyzeText(text);

    // Sauvegarde en base
    const historyRepository = new HistoryRepository();
    await historyRepository.save({ text, score });

    // Réponse API typée
    return res.status(200).json({
      score,
      status: "ok",
    });
  } catch (error) {
    console.error("Erreur analyseTextController :", error);

    return res.status(500).json({
      score: 0,
      status: "error",
      message: "Erreur interne du serveur",
    });
  }
};
