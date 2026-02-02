import { AnalysisService } from "../../analysis/service/analyse.service";
import { AnalysisHistory } from "../model/history.types";
import { HistoryRepository } from "../repository/history.repository";

 

export class HistoryService {
  constructor(
    private readonly historyRepository: HistoryRepository,
    private readonly analysisService: AnalysisService
  ) {}

  async analyzeAndSave(text: string): Promise<AnalysisHistory> {
    const score = this.analysisService.analyzeText(text);

    return this.historyRepository.save({
      text,
      score,
    });
  }

  async getHistory(): Promise<AnalysisHistory[]> {
    return this.historyRepository.findAll();
  }
}
