"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Créer un router dédié pour le health check
const router = (0, express_1.Router)();
/**
 * GET /health
 * Endpoint pour vérifier si le serveur est "up"
 */
router.get("/", (req, res) => {
    res.status(200).json({
        status: "UP",
        message: "Analyse Text API is running",
    });
});
exports.default = router;
//# sourceMappingURL=health.routes.js.map