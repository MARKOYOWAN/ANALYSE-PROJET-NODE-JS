"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
/**
 * Global error handler
 */
const errorHandler = (err, _req, res, _next) => {
    console.error("Erreur attrapée :", err);
    let message = "Internal Server Error";
    let status = 500;
    // On vérifie si l'erreur est une instance d'Error (ou AppError)
    if (err instanceof Error) {
        message = err.message;
        // On vérifie si la propriété 'status' existe dans cet objet
        if ("status" in err && typeof err.status === "number") {
            status = err.status;
        }
    }
    res.status(status).json({
        success: false,
        message
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map