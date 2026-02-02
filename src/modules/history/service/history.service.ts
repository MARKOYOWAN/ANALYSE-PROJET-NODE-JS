import { AnalysisHistory } from "../model/history.types";
import { HistoryRepository } from "../repository/history.repository";
import { AnalysisService } from "../../analysis/service/analyse.service";

export class HistoryService {
  constructor(
    private readonly historyRepository: HistoryRepository,
    private readonly analysisService: AnalysisService
  ) {}

  /**
   * Analyse un texte et sauvegarde le résultat
   */
  async analyzeAndSave(text: string): Promise<AnalysisHistory> {
    const score = this.analysisService.analyzeText(text);
    return this.historyRepository.save({ text, score });
  }

  /**
   * Récupère l'historique avec pagination
   * @param page Numéro de page (1 par défaut)
   * @param limit Nombre d'éléments par page (10 par défaut)
   */
  async getHistory(
    page = 1,
    limit = 10
  ): Promise<{ data: AnalysisHistory[]; total: number; page: number; limit: number }> {
    const offset = (page - 1) * limit;
    const data = await this.historyRepository.findAll(limit, offset);
    const total = await this.historyRepository.count();

    return { data, total, page, limit };
  }
}
