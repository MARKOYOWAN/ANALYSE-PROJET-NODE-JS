/**
 * ANALYSIS_RULES
 * -------------------
 * Objet de configuration centralisé pour les règles de calcul du score
 * d'analyse de texte. 
 * 
 * Ces règles sont utilisées par le service AnalysisService pour :
 * 1. Ajouter des bonus si le texte est suffisamment long
 * 2. Appliquer des malus pour certains mots interdits
 * 3. Bornes minimum et maximum du score
 */
export const ANALYSIS_RULES = {
  // -----------------------------
  // Bonus de longueur
  // -----------------------------
  // Longueur minimale d'un texte pour obtenir un bonus de score
  MIN_LENGTH_FOR_BONUS: 100,  // nombre de caractères
  // Points à ajouter si le texte dépasse la longueur minimale
  LENGTH_BONUS: 20,           // points

  // -----------------------------
  // Malus pour mots interdits
  // -----------------------------
  // Points à retirer pour chaque occurrence d'un mot interdit
  FORBIDDEN_WORD_PENALTY: 10,  
  // Liste des mots interdits déclenchant un malus
  FORBIDDEN_WORDS: ["fraude", "illégal", "faux"],

  // -----------------------------
  // Score minimum et maximum
  // -----------------------------
  // Score maximum possible après application de toutes les règles
  MAX_SCORE: 100,  
  // Score minimum possible après application de toutes les règles
  MIN_SCORE: 0
};