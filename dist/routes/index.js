"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRoutes = void 0;
const health_routes_1 = __importDefault(require("./health.routes"));
/**
 * setupRoutes
 * -------------------
 * Centralise toutes les routes de l'application
 */
const setupRoutes = (app) => {
    // Routes health
    app.use("/health", health_routes_1.default);
    // Autres routes ici
    // app.use("/api/texts", textRoutes);
    // 👇 Middleware catch-all 404 pour toutes les routes non définies
    app.use((req, res) => {
        res.status(404).json({
            success: false,
            message: "Endpoint non trouvé",
        });
    });
};
exports.setupRoutes = setupRoutes;
//# sourceMappingURL=index.js.map