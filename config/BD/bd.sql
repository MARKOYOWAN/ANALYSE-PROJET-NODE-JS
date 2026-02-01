-- =================================================================================
-- FICHIER : bd.sql
-- DESCRIPTION :
--   Création de la base de données "analyse_text" (à créer depuis PgAdmin si nécessaire),
--   du schéma, des tables, des triggers et des fonctions associées.
-- =================================================================================

-- ---------------------------------------------------------------------
-- Créer le schéma analyse_text si il n'existe pas
-- ---------------------------------------------------------------------
-- Le schéma permet d'isoler les objets de la base de données
CREATE SCHEMA IF NOT EXISTS analyse_text;

-- Définir le schéma courant pour toutes les commandes suivantes
SET search_path TO analyse_text, public;

-- ---------------------------------------------------------------------
-- Fonction de trigger pour mise à jour automatique du timestamp
-- ---------------------------------------------------------------------
-- Cette fonction met à jour automatiquement les colonnes `updated_on` ou `updated_at`
-- lors d'une modification (UPDATE) d'une ligne dans la table
CREATE OR REPLACE FUNCTION set_updated_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    -- Vérifier que l'opération est un UPDATE
    IF TG_OP = 'UPDATE' THEN
        -- Si la colonne updated_on existe, la mettre à jour
        IF (SELECT to_regclass(quote_ident(TG_TABLE_SCHEMA) || '.' || quote_ident(TG_TABLE_NAME) || '.' || 'updated_on')) IS NOT NULL THEN
            NEW.updated_on = NOW();
        -- Sinon, si la colonne updated_at existe, la mettre à jour
        ELSIF (SELECT to_regclass(quote_ident(TG_TABLE_SCHEMA) || '.' || quote_ident(TG_TABLE_NAME) || '.' || 'updated_at')) IS NOT NULL THEN
            NEW.updated_at = NOW();
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ---------------------------------------------------------------------
-- 3️Table SCORE_TEXT
-- ---------------------------------------------------------------------
-- Table pour stocker les textes et leur score
CREATE TABLE IF NOT EXISTS "SCORE_TEXT" (
    "id" SERIAL PRIMARY KEY,
    "text" TEXT NOT NULL,                  -- Le texte analysé
    "score" INT NOT NULL,                  -- Score attribué au texte
    "created_on" TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP, -- Date de création
    "updated_on" TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP  -- Date de dernière mise à jour
);

-- ---------------------------------------------------------------------
-- 4️Trigger pour mise à jour automatique de SCORE_TEXT
-- ---------------------------------------------------------------------
-- Attache la fonction `set_updated_timestamp` à la table SCORE_TEXT
CREATE TRIGGER trigger_score_text_updated
BEFORE UPDATE ON "SCORE_TEXT"
FOR EACH ROW
EXECUTE FUNCTION set_updated_timestamp();

-- ---------------------------------------------------------------------
-- 5️Exemples d'insertion (optionnel)
-- ---------------------------------------------------------------------
-- INSERT INTO "SCORE_TEXT" (text, score) VALUES
-- ('Exemple de texte 1', 10),
-- ('Exemple de texte 2', 7);

-- ---------------------------------------------------------------------
-- Fin du script
-- --------------------------------------------------------------------------------
-- Notes :
-- - Toutes les modifications automatiques de la colonne updated_on se feront via le trigger
-- - Vous pouvez ajouter d'autres tables en suivant la même logique
-- - Assurez-vous que le schéma 'analyse_text' est sélectionné avant toute création
-- --------------------------------------------------------------------------------
