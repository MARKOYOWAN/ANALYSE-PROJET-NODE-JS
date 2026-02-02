export interface AnalyzeRequest {
  text: string;
}

export interface AnalyzeResult {
  score: number;
  status: "ok";
}
