import { Response } from "express";

/**
 * ResponseHandler
 * ------------------
 * Classe qui centralise toutes les réponses HTTP pour l'API.
 * Respecte le principe Single Responsibility (gérer uniquement les réponses)
 * et Open/Closed (facile d'ajouter de nouveaux types de réponses sans modifier l'existant)
 */
export class ResponseHandler {
    /**
     * Réponse succès
     * @param res - instance Express Response
     * @param data - données à renvoyer
     * @param message - message optionnel
     */
    static success(res: Response, data: any, message = "Success") {
        return res.status(200).json({
            success: true,
            message,
            data,
        });
    }

    /**
     * Réponse erreur serveur
     * @param res - instance Express Response
     * @param message - message optionnel
     * @param status - code HTTP (par défaut 500)
     */
    static error(res: Response, message = "Internal Server Error", status = 500) {
        return res.status(status).json({
            success: false,
            message,
        });
    }

    /**
     * Réponse Ressource non trouvée
     * @param res - instance Express Response
     * @param message - message optionnel
     */
    static notFound(res: Response, message = "Resource Not Found") {
        return res.status(404).json({
            success: false,
            message,
        });
    }

    /**
     * Réponse requête invalide
     * @param res - instance Express Response
     * @param message - message optionnel
     */
    static badRequest(res: Response, message = "Bad Request") {
        return res.status(400).json({
            success: false,
            message,
        });
    }

    /**
     * Réponse non autorisée
     * @param res - instance Express Response
     * @param message - message optionnel
     */
    static unauthorized(res: Response, message = "Unauthorized") {
        return res.status(401).json({
            success: false,
            message,
        });
    }

    /**
     * Réponse Forbidden
     * @param res - instance Express Response
     * @param message - message optionnel
     */
    static forbidden(res: Response, message = "Forbidden") {
        return res.status(403).json({
            success: false,
            message,
        });
    }

    /**
     * Réponse avec redirection (optionnel)
     * @param res - instance Express Response
     * @param url - URL de redirection
     * @param status - code HTTP (par défaut 302)
     */
    static redirect(res: Response, url: string, status = 302) {
        return res.redirect(status, url);
    }
}
