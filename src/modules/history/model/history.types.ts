export interface AnalysisHistory {
  id: number;
  text: string;
  score: number;
}

export interface CreateAnalysisHistory {
  text: string;
  score: number;
}
