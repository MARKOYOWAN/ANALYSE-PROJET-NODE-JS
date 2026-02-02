 

export interface CreateAnalysisHistory {
  text: string;
  score: number;
}


/**
 * DTO pour les paramètres de requête de l'historique
 */
export interface HistoryQueryDTO {
  /**
   * Page à récupérer (1 par défaut)
   */
  page?: number;

  /**
   * Nombre d'éléments par page (10 par défaut)
   */
  limit?: number;
}


/**
 * DTO pour un élément d'historique
 */
export interface HistoryItemDTO {
  id: number;          // ID de l'analyse
  text: string;        // Texte analysé
  score: number;       // Score calculé
  created_on: string;  // Date de création
}



/**
 * DTO pour la réponse paginée de l'historique
 */
export interface HistoryResponseDTO {
  success: boolean;         // Statut de la requête
  data: HistoryItemDTO[];   // Liste des analyses
  pagination: {
    total: number;          // Nombre total d'analyses
    page: number;           // Page actuelle
    limit: number;          // Limite par page
    totalPages: number;     // Nombre total de pages
  };
}
