import { AnalysisService } from "../../analysis/service/analyse.service";
import { HistoryItemDTO } from "../model/history.types";
import { HistoryRepository } from "../repository/history.repository";

/**
 * HistoryService
 * --------------
 * Gestion de l'historique des analyses avec logique métier
 */
export class HistoryService {
  constructor(
    private readonly historyRepository: HistoryRepository,
    private readonly analysisService: AnalysisService
  ) { }

  /**
   * Analyse un texte et sauvegarde le résultat
   */
  async analyzeAndSave(text: string): Promise<HistoryItemDTO> {
    const score = this.analysisService.analyzeText(text);
    return this.historyRepository.save({ text, score });
  }

  /**
   * Récupère l'historique avec pagination
   * @param page Page actuelle
   * @param limit Nombre d'éléments par page
   */
  async getHistory(page = 1, limit = 10): Promise<{
    data: HistoryItemDTO[];
    total: number;
    page: number;
    limit: number;
  }> {
    const offset = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.historyRepository.findAll(limit, offset),
      this.historyRepository.count(),
    ]);

    return { data, total, page, limit };
  }
}
