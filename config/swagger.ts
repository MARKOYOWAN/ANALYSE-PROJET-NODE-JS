import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Analyse Text API",
      version: "1.0.0",
      description: "Documentation API pour Analyse Text",
    },
  },
  apis: ["./src/routes/*.ts"], // routes avec JSDoc
};

const specs = swaggerJSDoc(options);

export const setupSwagger = (app: Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
