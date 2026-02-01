"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const middleware_1 = require("../config/middleware");
const swagger_1 = require("../config/swagger");
const routes_1 = require("../routes");
const errorHandler_1 = require("../config/errorHandler");
// Charger les variables d'environnement
dotenv_1.default.config();
const createApp = () => {
    const app = (0, express_1.default)();
    // Middlewares globaux
    (0, middleware_1.setupMiddlewares)(app);
    // Routes de l'application
    (0, routes_1.setupRoutes)(app);
    // Swagger
    (0, swagger_1.setupSwagger)(app);
    // Middleware de gestion des erreurs (après toutes les routes)
    app.use(errorHandler_1.errorHandler);
    return app;
};
exports.createApp = createApp;
//# sourceMappingURL=app.js.map