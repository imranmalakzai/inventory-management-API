import swaggerJSDoc from "swagger-jsdoc";
import { HOSTED_URI } from "../config/env.js";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Inventory Management API",
      version: "1.0.0",
      description: "API documentation for Inventory System",
    },
    servers: [
      {
        url: `${HOSTED_URI}/api`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Swagger reads comments here
};

export const swaggerSpec = swaggerJSDoc(options);
