import { ANALYSIS_RULES } from "../model/analysis.rules";

export class AnalysisService {
  analyzeText(text: string): number {
    let score = 0;

    // Bonus longueur
    if (text.length > ANALYSIS_RULES.MIN_LENGTH_FOR_BONUS) {
      score += ANALYSIS_RULES.LENGTH_BONUS;
    }

    // Malus mots interdits
    const textLower = text.toLowerCase();

    for (const word of ANALYSIS_RULES.FORBIDDEN_WORDS) {
      // Créer une regex globale, insensible à la casse et aux accents combinés
      const regex = new RegExp(word.normalize("NFC"), "gu");
      const normalizedText = textLower.normalize("NFC");

      const matches = normalizedText.match(regex);
      if (matches) {
        score -= ANALYSIS_RULES.FORBIDDEN_WORD_PENALTY * matches.length;
      }
    }

    // Clamp entre MIN_SCORE et MAX_SCORE
    score = Math.max(
      ANALYSIS_RULES.MIN_SCORE,
      Math.min(ANALYSIS_RULES.MAX_SCORE, score)
    );

    return score;
  }
}
