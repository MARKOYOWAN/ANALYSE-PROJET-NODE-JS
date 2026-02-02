/**
 * DTO (Data Transfer Object) pour l'entrée de l'API d'analyse
 * ----------------------------------------------------------
 * Représente les données attendues lorsqu'un client envoie un texte
 * à analyser via l'endpoint POST /api/analyze
 */
export interface AnalyzeRequest {
  /**
   * Le texte à analyser
   * Type : string
   * Obligatoire
   */
  text: string;
}

/**
 * DTO pour la réponse de l'API d'analyse
 * --------------------------------------
 * Structure standardisée renvoyée après l'analyse du texte
 */
export interface AnalyzeResult {
  /**
   * Score de conformité du texte
   * - Calculé selon les règles définies dans AnalysisService
   * - Valeur comprise entre MIN_SCORE et MAX_SCORE
   */
  score: number;

  /**
   * Statut de la réponse
   * - "ok" si l'analyse s'est déroulée correctement
   * - On pourra définir "error" pour les erreurs côté serveur ou validation
   */
  status: "ok";
}
