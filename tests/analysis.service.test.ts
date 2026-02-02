import { ANALYSIS_RULES } from "../src/modules/analysis/model/analyse.rules";
import { AnalysisService } from "../src/modules/analysis/service/analyse.service";

describe("AnalysisService", () => {
  let service: AnalysisService;

  // Avant chaque test, on crée une nouvelle instance du service
  beforeEach(() => {
    service = new AnalysisService();
  });

  // Test du bonus de longueur (> 100 caractères)
  it("devrait ajouter le bonus de longueur si > 100 caractères", () => {
    const text = "a".repeat(101); // Crée un texte de 101 caractères
    const score = service.analyzeText(text);
    // On s'attend à ce que le score soit exactement le bonus longueur
    expect(score).toBe(ANALYSIS_RULES.LENGTH_BONUS);
  });

  // Test du malus pour chaque mot interdit
  it("devrait appliquer le malus pour chaque mot interdit", () => {
    const text = "fraude illégal faux fraude"; // 4 mots interdits
    const score = service.analyzeText(text);
    const expectedMalus = -ANALYSIS_RULES.FORBIDDEN_WORD_PENALTY * 4;
    // Si score négatif, clamp à MIN_SCORE (0)
    expect(score).toBe(Math.max(ANALYSIS_RULES.MIN_SCORE, expectedMalus));
  });

  // Test combiné : bonus longueur + malus
  it("devrait combiner bonus et malus correctement", () => {
    const text = "a".repeat(150) + " fraude illégal"; // 150 caractères + 2 mots interdits
    const score = service.analyzeText(text);
    const expectedScore = 20 - 10 - 10; // bonus longueur + malus pour 2 mots
    expect(score).toBe(expectedScore);
  });

  // Test que le score ne descend pas sous MIN_SCORE
  it("devrait clamp le score à MIN_SCORE si négatif", () => {
    const text = "fraude fraude fraude"; // malus total = -30
    const score = service.analyzeText(text);
    expect(score).toBe(0); // MIN_SCORE
  });

  // Test que le score ne dépasse pas MAX_SCORE
  it("devrait clamp le score à MAX_SCORE si > 100", () => {
    const text = "a".repeat(200); // bonus longueur seulement = 20
    const score = service.analyzeText(text);
    expect(score).toBeLessThanOrEqual(ANALYSIS_RULES.MAX_SCORE);
  });
});
