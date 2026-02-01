"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import de Supertest pour simuler les requêtes HTTP
const supertest_1 = __importDefault(require("supertest"));
// Import de la fonction createApp qui retourne une instance d'Express configurée
const app_1 = require("../src/app");
// Groupe de tests pour le endpoint /health
describe('Health endpoint', () => {
    // Test spécifique pour vérifier que le serveur est "up"
    it('should return 200 OK', async () => {
        // Crée une instance de l'application Express
        const app = (0, app_1.createApp)();
        // Simule une requête GET sur /health
        const res = await (0, supertest_1.default)(app).get('/health');
        // Vérifie que le status HTTP retourné est bien 200
        expect(res.status).toBe(200);
        // Vérifie que le corps de la réponse contient bien { status: "UP" }
        expect(res.body.status).toBe('UP');
    });
});
//# sourceMappingURL=app.test.js.map