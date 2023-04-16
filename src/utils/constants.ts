export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Acme',
      version: '1.0.0',
      description:
        'API documentation for my Node.js with Express and TypeScript app.',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
  },
  apis: ['**/*.ts'],
};
