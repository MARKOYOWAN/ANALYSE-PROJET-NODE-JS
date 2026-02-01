// Import de Supertest pour simuler les requêtes HTTP
import request from 'supertest';
// Import de la fonction createApp qui retourne une instance d'Express configurée
import { createApp } from '../src/app';

// Groupe de tests pour le endpoint /health
describe('Health endpoint', () => {

    // Test spécifique pour vérifier que le serveur est "up"
    it('should return 200 OK', async () => {
        // Crée une instance de l'application Express
        const app = createApp();

        // Simule une requête GET sur /health
        const res = await request(app).get('/health');

        // Vérifie que le status HTTP retourné est bien 200
        expect(res.status).toBe(200);

        // Vérifie que le corps de la réponse contient bien { status: "UP" }
        expect(res.body.status).toBe('UP');
    });
});
