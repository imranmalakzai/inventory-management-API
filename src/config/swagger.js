import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

// Fix for ES Modules + Vercel
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
        url: "localhost:5000/api",
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

  // ✅ ABSOLUTE PATH (THIS FIXES VERCEL)
  apis: [path.join(__dirname, "../routes/*.route.js")],
};

export const swaggerSpec = swaggerJSDoc(options);
