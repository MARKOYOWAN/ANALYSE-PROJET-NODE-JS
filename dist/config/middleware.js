"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupMiddlewares = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
/**
 * setupMiddlewares
 * -------------------
 * Configure tous les middlewares globaux
 */
const setupMiddlewares = (app) => {
    // Sécurité HTTP headers
    app.use((0, helmet_1.default)());
    // CORS
    app.use((0, cors_1.default)());
    // Parser JSON et URL-encoded
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    // Rate Limiter
    app.use((0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000, // 15 minutes
        limit: 100, // Dans les versions récentes d'express-rate-limit, 'max' est devenu 'limit'
        message: { success: false, message: "Trop de requêtes, réessayez plus tard" },
        standardHeaders: true, // Retourne les infos de limite dans les headers `RateLimit-*`
        legacyHeaders: false, // Désactive les headers `X-RateLimit-*`
    }));
};
exports.setupMiddlewares = setupMiddlewares;
//# sourceMappingURL=middleware.js.map