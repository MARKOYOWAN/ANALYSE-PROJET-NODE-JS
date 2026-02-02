import { ANALYSIS_RULES } from "../src/modules/analysis/model/analysis.rules";
import { AnalysisService } from "../src/modules/analysis/service/analysis.service";

describe("AnalysisService", () => {
  let service: AnalysisService;

  beforeEach(() => {
    service = new AnalysisService();
  });

  it("devrait ajouter le bonus de longueur si > 100 caractères", () => {
    const text = "a".repeat(101); // 101 caractères
    const score = service.analyzeText(text);
    expect(score).toBe(ANALYSIS_RULES.LENGTH_BONUS);
  });

  it("devrait appliquer le malus pour chaque mot interdit", () => {
    const text = "fraude illégal faux fraude";
    const score = service.analyzeText(text);
    const expectedMalus = -ANALYSIS_RULES.FORBIDDEN_WORD_PENALTY * 4;
    // Clamp à MIN_SCORE si négatif
    expect(score).toBe(Math.max(ANALYSIS_RULES.MIN_SCORE, expectedMalus));
  });

  it("devrait combiner bonus et malus correctement", () => {
    const text = "a".repeat(150) + " fraude illégal";
    const score = service.analyzeText(text);
    const expectedScore = 20 - 10 - 10; // bonus longueur + malus
    expect(score).toBe(expectedScore);
  });

  it("devrait clamp le score à MIN_SCORE si négatif", () => {
    const text = "fraude fraude fraude"; // malus = -30
    const score = service.analyzeText(text);
    expect(score).toBe(0); // MIN_SCORE
  });

  it("devrait clamp le score à MAX_SCORE si > 100", () => {
    const text = "a".repeat(200); // bonus longueur seulement = 20
    const score = service.analyzeText(text);
    expect(score).toBeLessThanOrEqual(ANALYSIS_RULES.MAX_SCORE);
  });
});
