import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Restaurant Simulator API',
      version: '1.0.0',
      description: 'API documentation for the Restaurant Simulator backend',
    },
  },
  apis: ['./src/api/**/*.ts'], // Path to the API docs
};

export const swaggerSpec = swaggerJSDoc(options);
export { swaggerUi };