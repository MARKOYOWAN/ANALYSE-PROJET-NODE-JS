import pool from "../../../../config/BD/db";
import {
  AnalysisHistory,
  CreateAnalysisHistory
} from "../model/history.types";

/**
 * HistoryRepository
 * -----------------
 * Accès aux données de la table analyse_text.SCORE_TEXT
 */
export class HistoryRepository {

  /**
   * Enregistrer une analyse
   */
  async save(
    data: CreateAnalysisHistory
  ): Promise<AnalysisHistory> {

    const query = `
      INSERT INTO analyse_text."SCORE_TEXT" ("text", "score")
      VALUES ($1, $2)
      RETURNING
        "id",
        "text",
        "score",
        "created_on",
        "updated_on"
    `;

    const values = [data.text, data.score];

    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  /**
   * Récupérer l'historique des analyses
   */
  async findAll(): Promise<AnalysisHistory[]> {

    const query = `
      SELECT
        "id",
        "text",
        "score",
        "created_on",
        "updated_on"
      FROM analyse_text."SCORE_TEXT"
      ORDER BY "created_on" DESC
    `;

    const { rows } = await pool.query(query);
    return rows;
  }
}
