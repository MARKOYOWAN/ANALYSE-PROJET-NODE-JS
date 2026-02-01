import { Response } from "express";
/**
 * ResponseHandler
 * ------------------
 * Classe qui centralise toutes les réponses HTTP pour l'API.
 * Respecte le principe Single Responsibility (gérer uniquement les réponses)
 * et Open/Closed (facile d'ajouter de nouveaux types de réponses sans modifier l'existant)
 */
export declare class ResponseHandler {
    /**
     * Réponse succès
     * @param res - instance Express Response
     * @param data - données à renvoyer
     * @param message - message optionnel
     */
    static success(res: Response, data: any, message?: string): Response<any, Record<string, any>>;
    /**
     * Réponse erreur serveur
     * @param res - instance Express Response
     * @param message - message optionnel
     * @param status - code HTTP (par défaut 500)
     */
    static error(res: Response, message?: string, status?: number): Response<any, Record<string, any>>;
    /**
     * Réponse Ressource non trouvée
     * @param res - instance Express Response
     * @param message - message optionnel
     */
    static notFound(res: Response, message?: string): Response<any, Record<string, any>>;
    /**
     * Réponse requête invalide
     * @param res - instance Express Response
     * @param message - message optionnel
     */
    static badRequest(res: Response, message?: string): Response<any, Record<string, any>>;
    /**
     * Réponse non autorisée
     * @param res - instance Express Response
     * @param message - message optionnel
     */
    static unauthorized(res: Response, message?: string): Response<any, Record<string, any>>;
    /**
     * Réponse Forbidden
     * @param res - instance Express Response
     * @param message - message optionnel
     */
    static forbidden(res: Response, message?: string): Response<any, Record<string, any>>;
    /**
     * Réponse avec redirection (optionnel)
     * @param res - instance Express Response
     * @param url - URL de redirection
     * @param status - code HTTP (par défaut 302)
     */
    static redirect(res: Response, url: string, status?: number): void;
}
//# sourceMappingURL=responseHandler.d.ts.map