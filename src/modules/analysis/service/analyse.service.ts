// ---------------------------------------------------------------------
// AnalysisService
// ------------------
// Service responsable de l'analyse de texte et du calcul du score
// basé sur des règles prédéfinies.
//
// Règles :
// 1. +20 points si le texte dépasse 100 caractères (LENGTH_BONUS)
// 2. -10 points par occurrence de chaque mot interdit
// 3. Score limité entre MIN_SCORE et MAX_SCORE
// ---------------------------------------------------------------------

import { ANALYSIS_RULES } from "../model/analyse.rules";

export class AnalysisService {
  /**
   * analyzeText
   * -----------
   * Calcule le score d'un texte en fonction des règles définies.
   *
   * @param text - Le texte à analyser
   * @returns number - Score final compris entre MIN_SCORE et MAX_SCORE
   *
   * Exemple :
   *  Texte : "Ceci est un texte de test avec fraude et illégal."
   *  Score calculé : 0 (après application des malus et clamp)
   */
  analyzeText(text: string): number {
    let score = 0;

    // -----------------------------
    // Bonus de longueur
    // -----------------------------
    // Si le texte dépasse la longueur minimale, ajouter un bonus
    if (text.length > ANALYSIS_RULES.MIN_LENGTH_FOR_BONUS) {
      score += ANALYSIS_RULES.LENGTH_BONUS;
    }

    // -----------------------------
    // Malus pour mots interdits
    // -----------------------------
    // On parcourt chaque mot interdit et on compte ses occurrences
    // Chaque occurrence applique le malus défini dans FORBIDDEN_WORD_PENALTY
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

    // -----------------------------
    // Clamp du score
    // -----------------------------
    // Assure que le score final reste entre MIN_SCORE et MAX_SCORE
    score = Math.max(
      ANALYSIS_RULES.MIN_SCORE,
      Math.min(ANALYSIS_RULES.MAX_SCORE, score)
    );

    return score;
  }
}
