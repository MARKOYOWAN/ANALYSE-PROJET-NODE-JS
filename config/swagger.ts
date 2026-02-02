import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";


// src/config/swagger.ts
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Analyse Text API",
      version: "1.0.0",
      description: "Documentation API pour Analyse Text",
    },
    // Ajoute les composants ici directement pour être sûr qu'ils sont chargés
    components: {
      schemas: {
        AnalyzeRequest: {
          type: "object",
          properties: {
            text: { type: "string", example: "Ceci est un texte de test" }
          },
          required: ["text"]
        },
        AnalyzeResult: {
          type: "object",
          properties: {
            score: { type: "integer", example: 72 },
            status: { type: "string", example: "ok" }
          }
        }
      }
    },
    servers: [{ url: "http://localhost:3000", description: "Serveur local" }],
  },
  apis: [
    // Utilise des chemins relatifs robustes
    "./src/modules/**/*.ts",
    "./src/routes/*.ts",
    "./dist/modules/**/*.js",
    "./dist/routes/*.js"
  ],
};

const specs = swaggerJSDoc(options);

/**
 * Middleware pour exposer Swagger UI
 */
export const setupSwagger = (app: Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
