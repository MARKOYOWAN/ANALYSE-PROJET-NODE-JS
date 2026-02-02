import pool from "../../../../config/BD/db";
import { HistoryItemDTO } from "../model/history.types";

export class HistoryRepository {
  /**
   * Récupère tout l'historique des analyses avec pagination
   * @param limit Nombre de résultats par page (default 10)
   * @param offset Décalage pour pagination (default 0)
   */
  async findAll(limit = 10, offset = 0): Promise<HistoryItemDTO[]> {
    const query = `
      SELECT id, text, score, created_on
      FROM analyse_text."SCORE_TEXT"
      ORDER BY created_on DESC
      LIMIT $1 OFFSET $2
    `;
    const values = [limit, offset];

    const { rows } = await pool.query(query, values);
    return rows;
  }

  /**
   * Sauvegarde une analyse dans la base
   */
  async save(data: { text: string; score: number }): Promise<HistoryItemDTO> {
    const query = `
      INSERT INTO analyse_text."SCORE_TEXT" (text, score)
      VALUES ($1, $2)
      RETURNING *
    `;
    const values = [data.text, data.score];

    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  /**
   * Récupère le nombre total d'analyses pour la pagination
   */
  async count(): Promise<number> {
    const query = `SELECT COUNT(*) AS total FROM analyse_text."SCORE_TEXT"`;
    const { rows } = await pool.query(query);
    return parseInt(rows[0].total, 10);
  }
}
